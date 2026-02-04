
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
    city: z.string().min(3, 'Cidade obrigatória'),
    position: z.string().min(1, 'Selecione uma posição'),
});

const POSITIONS = [
    '1 - Pilar Esquerdo', '2 - Hooker', '3 - Pilar Direito',
    '4 - Segunda Linha', '5 - Segunda Linha',
    '6 - Asa', '7 - Asa', '8 - Oitavo',
    '9 - Meio-Scrum', '10 - Abertura',
    '11 - Ponta Esquerda', '12 - Primeiro Centro',
    '13 - Segundo Centro', '14 - Ponta Direita',
    '15 - Fullback'
];

export const RegistrationForm = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '', email: '', phone: '', city: '', position: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!file) {
            toast({
                title: "Comprovante necessário",
                description: "Por favor, anexe o comprovante de pagamento.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Upload file
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { data: fileData, error: fileError } = await supabase.storage
                .from('payment-proofs')
                .upload(fileName, file);

            if (fileError) throw fileError;

            const publicUrl = supabase.storage
                .from('payment-proofs')
                .getPublicUrl(fileName).data.publicUrl;

            // 2. Insert record
            const { error: dbError } = await supabase
                .from('championship_registrations')
                .insert({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    city: values.city,
                    position: values.position,
                    payment_proof_url: publicUrl,
                    status: 'pending'
                });

            if (dbError) throw dbError;

            toast({
                title: "Inscrição realizada!",
                description: "Sua inscrição foi enviada para análise. Entraremos em contato.",
            });

            form.reset();
            setFile(null);

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Erro ao inscrever",
                description: error.message || "Tente novamente mais tarde.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                    <Input
                        {...form.register('name')}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Seu nome"
                    />
                    {form.formState.errors.name && <p className="text-red-400 text-sm">{form.formState.errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                        {...form.register('email')}
                        type="email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="seu@email.com"
                    />
                    {form.formState.errors.email && <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Telefone / WhatsApp</Label>
                    <Input
                        {...form.register('phone')}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="(00) 00000-0000"
                    />
                    {form.formState.errors.phone && <p className="text-red-400 text-sm">{form.formState.errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">Cidade</Label>
                    <Input
                        {...form.register('city')}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Sua cidade"
                    />
                    {form.formState.errors.city && <p className="text-red-400 text-sm">{form.formState.errors.city.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="position" className="text-gray-300">Posição Preferida</Label>
                <Select onValueChange={(val) => form.setValue('position', val)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Selecione sua posição" />
                    </SelectTrigger>
                    <SelectContent>
                        {POSITIONS.map(pos => (
                            <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {form.formState.errors.position && <p className="text-red-400 text-sm">{form.formState.errors.position.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-gray-300">Comprovante de Pagamento (PIX)</Label>
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white w-full h-24 border-dashed"
                        onClick={() => document.getElementById('payment-proof')?.click()}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="w-6 h-6" />
                            <span>{file ? file.name : "Clique para fazer upload da imagem/PDF"}</span>
                        </div>
                    </Button>
                    <input
                        id="payment-proof"
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-rugby-red hover:bg-rugby-red/90 text-white py-6 text-lg font-bold"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Enviando..." : "Confirmar Inscrição"}
            </Button>
        </form>
    );
};
