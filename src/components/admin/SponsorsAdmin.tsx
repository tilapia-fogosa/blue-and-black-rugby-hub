import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sponsor } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SponsorsAdmin = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        logo_url: '',
        website_url: '',
        tier: 'Apoiador',
    });

    const { data: sponsors, isLoading } = useQuery({
        queryKey: ['admin-sponsors'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('sponsors')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return data as Sponsor[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            if (editingSponsor) {
                const { error } = await supabase
                    .from('sponsors')
                    .update(data)
                    .eq('id', editingSponsor.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('sponsors')
                    .insert([data]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-sponsors'] });
            toast.success(editingSponsor ? 'Patrocinador atualizado!' : 'Patrocinador criado!');
            handleCloseDialog();
        },
        onError: (error) => {
            toast.error('Erro ao salvar patrocinador: ' + error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('sponsors')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-sponsors'] });
            toast.success('Patrocinador excluído!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir patrocinador: ' + error.message);
        },
    });

    const handleOpenDialog = (sponsor?: Sponsor) => {
        if (sponsor) {
            setEditingSponsor(sponsor);
            setFormData({
                name: sponsor.name,
                category: sponsor.category,
                logo_url: sponsor.logo_url || '',
                website_url: sponsor.website_url || '',
                tier: sponsor.tier || 'Apoiador',
            });
        } else {
            setEditingSponsor(null);
            setFormData({
                name: '',
                category: '',
                logo_url: '',
                website_url: '',
                tier: 'Apoiador',
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingSponsor(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir este patrocinador?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-rugby-blue-primary" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-rugby-blue-primary/10 to-rugby-blue-dark/10">
                <CardTitle className="flex items-center justify-between text-rugby-blue-dark">
                    <span className="text-2xl font-bold">Gerenciar Patrocinadores</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white shadow-lg font-bold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar Patrocinador
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-rugby-blue-dark">
                                    {editingSponsor ? 'Editar Patrocinador' : 'Novo Patrocinador'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Label htmlFor="name">Nome *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Categoria *</Label>
                                        <Input
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="Ex: Equipamentos Esportivos"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="tier">Nível</Label>
                                        <Select value={formData.tier} onValueChange={(value) => setFormData({ ...formData, tier: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Principal">Principal</SelectItem>
                                                <SelectItem value="Premium">Premium</SelectItem>
                                                <SelectItem value="Apoiador">Apoiador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="logo_url">URL do Logo</Label>
                                        <Input
                                            id="logo_url"
                                            type="url"
                                            value={formData.logo_url}
                                            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                            placeholder="https://exemplo.com/logo.png"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="website_url">URL do Website</Label>
                                        <Input
                                            id="website_url"
                                            type="url"
                                            value={formData.website_url}
                                            onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                            placeholder="https://exemplo.com"
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={saveMutation.isPending}
                                        className="bg-rugby-blue-dark hover:bg-rugby-black text-white font-bold"
                                    >
                                        {saveMutation.isPending ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Salvando...
                                            </>
                                        ) : (
                                            'Salvar'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="rounded-lg border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-rugby-blue-primary/5">
                                <TableHead className="font-bold">Nome</TableHead>
                                <TableHead className="font-bold">Categoria</TableHead>
                                <TableHead className="font-bold">Nível</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sponsors?.map((sponsor) => (
                                <TableRow key={sponsor.id} className="hover:bg-rugby-cream/50">
                                    <TableCell className="font-medium">{sponsor.name}</TableCell>
                                    <TableCell>{sponsor.category}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${sponsor.tier === 'Principal' ? 'bg-yellow-100 text-yellow-800' :
                                            sponsor.tier === 'Premium' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {sponsor.tier}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenDialog(sponsor)}
                                                className="hover:bg-rugby-blue-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(sponsor.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {sponsors?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        Nenhum patrocinador cadastrado
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default SponsorsAdmin;
