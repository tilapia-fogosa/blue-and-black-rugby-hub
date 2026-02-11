import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatCPF, validateCPF } from '@/lib/utils';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const AthleteRegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        origin_team: '',
        preferred_position: '',
        birth_date: '',
        cpf: '',
        category: '',
        experience: '',
    });
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const [athletePhoto, setAthletePhoto] = useState<File | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (field: string, value: string) => {
        if (field === 'cpf') {
            value = formatCPF(value);
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const handleAthletePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAthletePhoto(e.target.files[0]);
        }
    };

    const calculateCategory = (birthDate: string, gender: 'Masc' | 'Fem') => {
        if (!birthDate) return '';
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        if (age < 19) {
            return gender === 'Masc' ? 'Juvenil Masc' : 'Juvenil Fem';
        }
        return gender === 'Masc' ? 'Masc' : 'Feminino'; // Adulto
    };

    // Update category when birth date changes if we had a gender field, 
    // but looking at requirements "Category" is a selection or derived?
    // User asked for "Categoria (Masc, Feminino, Juvenil Masc, Juvenil Fem)"
    // Let's make it a selection for simplicity as auto-derivation might be complex without explicit gender field separate from category.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCPF(formData.cpf)) {
            toast({
                title: "CPF Inválido",
                description: "Por favor, verifique o CPF digitado.",
                variant: "destructive"
            });
            return;
        }

        if (!paymentProof) {
            toast({
                title: "Comprovante Obrigatório",
                description: "Por favor, anexe o comprovante de pagamento.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            // 1. Check duplicate CPF
            const { data: existingAthlete } = await supabase
                .from('athlete_registrations')
                .select('id')
                .eq('cpf', formData.cpf)
                .maybeSingle();

            if (existingAthlete) {
                throw new Error("Este CPF já possui um cadastro.");
            }

            // 2. Upload Files
            // Payment Proof
            const proofExt = paymentProof.name.split('.').pop();
            const proofPath = `proof_${formData.cpf}_${Date.now()}.${proofExt}`;

            const { error: uploadProofError } = await supabase.storage
                .from('payment-proofs')
                .upload(proofPath, paymentProof);

            if (uploadProofError) throw uploadProofError;

            const { data: { publicUrl: proofUrl } } = supabase.storage
                .from('payment-proofs')
                .getPublicUrl(proofPath);

            // Athlete Photo (Optional but requested as field)
            let athletePhotoUrl = null;
            if (athletePhoto) {
                const photoExt = athletePhoto.name.split('.').pop();
                const photoPath = `photo_${formData.cpf}_${Date.now()}.${photoExt}`;

                const { error: uploadPhotoError } = await supabase.storage
                    .from('payment-proofs') // Using same bucket or maybe 'athlete-photos' if exists? Assuming same for now or 'athlete-photos'
                    .upload(photoPath, athletePhoto);

                // NOTE: If 'athlete-photos' bucket doesn't exist, this will fail. 
                // I will use 'payment-proofs' for now as I know it exists, or risking 'athlete-photos' if I could verify.
                // Let's stick to 'payment-proofs' to be safe or try to use a specific bucket if the user has one.
                // Given the context, I'll use 'payment-proofs' to ensure success, but ideally should be separate.

                if (uploadPhotoError) {
                    console.error("Error uploading photo:", uploadPhotoError);
                    // treat as non-fatal? or throw? requested as field, let's throw.
                    throw uploadPhotoError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('payment-proofs')
                    .getPublicUrl(photoPath);
                athletePhotoUrl = publicUrl;
            }

            // 3. Insert Record
            const { error: insertError } = await supabase
                .from('athlete_registrations')
                .insert({
                    ...formData,
                    payment_proof_url: proofUrl,
                    athlete_photo_url: athletePhotoUrl,
                    experience_time: formData.experience,
                    status: 'pending'
                });

            if (insertError) throw insertError;

            // 4. Send Confirmation Email via Edge Function
            try {
                const { data, error: emailError } = await supabase.functions.invoke('resend-email', {
                    body: {
                        to: formData.email,
                        type: 'registration',
                        athleteName: formData.name
                    }
                });

                if (emailError) {
                    console.error('Edge Function Error:', emailError);
                } else {
                    console.log('Email sent successfully:', data);
                }
            } catch (err) {
                console.error('Fetch Error:', err);
            }

            setShowSuccessModal(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                origin_team: '',
                preferred_position: '',
                birth_date: '',
                cpf: '',
                category: '',
                experience: '',
            });
            setPaymentProof(null);
            setAthletePhoto(null);

        } catch (error: any) {
            console.error('Error registering:', error);
            toast({
                title: "Erro no cadastro",
                description: error.message || "Ocorreu um erro ao processar sua inscrição.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="max-w-3xl mx-auto bg-rugby-black/50 backdrop-blur-sm shadow-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-2xl text-white text-center">
                        Ficha de Inscrição de Atleta
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ... (keep form content as is) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name" className="text-gray-300">Nome Completo *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor="cpf" className="text-gray-300">CPF *</Label>
                                <Input
                                    id="cpf"
                                    value={formData.cpf}
                                    onChange={(e) => handleChange('cpf', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="000.000.000-00"
                                    maxLength={14}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="birth_date" className="text-gray-300">Data de Nascimento *</Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={formData.birth_date}
                                    onChange={(e) => handleChange('birth_date', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" className="text-gray-300">Categoria *</Label>
                                <Select onValueChange={(value) => handleChange('category', value)} value={formData.category}>
                                    <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-rugby-black border-white/10 text-white">
                                        <SelectItem value="Masc">Masculino Adulto</SelectItem>
                                        <SelectItem value="Feminino">Feminino Adulto</SelectItem>
                                        <SelectItem value="Juvenil Masc">Juvenil Masculino</SelectItem>
                                        <SelectItem value="Juvenil Fem">Juvenil Feminino</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email" className="text-gray-300">E-mail *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-gray-300">WhatsApp / Telefone *</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="origin_team" className="text-gray-300">Time de Origem</Label>
                                <Input
                                    id="origin_team"
                                    value={formData.origin_team}
                                    onChange={(e) => handleChange('origin_team', e.target.value)}
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="Time anterior ou 'Nenhum'"
                                />
                            </div>
                            <div>
                                <Label htmlFor="preferred_position" className="text-gray-300">Posição Preferida *</Label>
                                <Select onValueChange={(value) => handleChange('preferred_position', value)} value={formData.preferred_position}>
                                    <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Selecione a posição" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-rugby-black border-white/10 text-white">
                                        <SelectItem value="Pilar">Pilar</SelectItem>
                                        <SelectItem value="Talonador">Talonador</SelectItem>
                                        <SelectItem value="Segunda Linha">Segunda Linha</SelectItem>
                                        <SelectItem value="Asa">Asa</SelectItem>
                                        <SelectItem value="Oitavo">Oitavo</SelectItem>
                                        <SelectItem value="Meio-Scrum">Meio-Scrum</SelectItem>
                                        <SelectItem value="Abertura">Abertura</SelectItem>
                                        <SelectItem value="Centro">Centro</SelectItem>
                                        <SelectItem value="Ponta">Ponta</SelectItem>
                                        <SelectItem value="Fullback">Fullback</SelectItem>
                                        <SelectItem value="Nao sei">Não sei ainda</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="proof" className="text-gray-300">Comprovante de Pagamento *</Label>
                            <div className="mt-1 flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-24 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-gray-400"
                                    onClick={() => document.getElementById('payment-proof')?.click()}
                                >
                                    {paymentProof ? (
                                        <span className="text-green-500 font-medium flex items-center gap-2">
                                            <Upload className="w-4 h-4" /> {paymentProof.name}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 flex flex-col items-center gap-2">
                                            <Upload className="w-6 h-6" /> Clique para fazer upload
                                        </span>
                                    )}
                                </Button>
                                <Input
                                    id="payment-proof"
                                    type="file"
                                    accept="image/*,application/pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Formatos aceitos: Imagem (JPG, PNG) ou PDF.</p>
                        </div>

                        {/* New Fields: Athlete Photo and Experience */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="athlete_photo" className="text-gray-300">Foto do Atleta *</Label>
                                <div className="mt-1 flex items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-gray-400"
                                        onClick={() => document.getElementById('athlete-photo')?.click()}
                                    >
                                        {athletePhoto ? (
                                            <span className="text-green-500 font-medium flex items-center gap-2">
                                                <Upload className="w-4 h-4" /> {athletePhoto.name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 flex items-center gap-2">
                                                <Upload className="w-4 h-4" /> Escolher Foto
                                            </span>
                                        )}
                                    </Button>
                                    <Input
                                        id="athlete-photo"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAthletePhotoChange}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Foto de rosto para identificação.</p>
                            </div>
                            <div>
                                <Label htmlFor="experience" className="text-gray-300">Pratica rugby há quanto tempo? *</Label>
                                <Input
                                    id="experience"
                                    value={formData.experience}
                                    onChange={(e) => handleChange('experience', e.target.value)}
                                    required
                                    className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                    placeholder="Ex: 2 anos, 6 meses, Iniciante..."
                                />
                            </div>
                        </div>

                        <div className="pt-4 text-center">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full md:w-auto px-12 bg-rugby-red hover:bg-rugby-red/90 text-white"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                                    </>
                                ) : (
                                    "Enviar Inscrição"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md bg-rugby-black border-rugby-red/20 text-white">
                    <DialogHeader className="flex flex-col items-center gap-4 text-center">
                        <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                        </div>
                        <DialogTitle className="text-2xl font-bold">Inscrição Recebida!</DialogTitle>
                        <DialogDescription className="text-gray-300 text-base">
                            Sua ficha de inscrição para a **Copa Pé Vermelho 2026** foi enviada para análise.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-3 mt-2">
                        <p className="text-sm text-gray-200 font-bold">
                            Próximos passos:
                        </p>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            <li>Analisaremos seu cadastro e comprovante em até **7 dias úteis**.</li>
                            <li>Você receberá uma confirmação oficial no seu **e-mail**.</li>
                            <li>Fique atento à sua caixa de entrada e também ao spam.</li>
                        </ul>
                    </div>

                    <DialogFooter className="sm:justify-center mt-4">
                        <Button
                            type="button"
                            className="bg-rugby-red hover:bg-rugby-red/90 text-white px-8 font-bold"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Entendi, obrigado!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AthleteRegistrationForm;
