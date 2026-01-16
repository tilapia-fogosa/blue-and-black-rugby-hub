import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Athlete } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AthletesAdmin = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        achievements: '',
        years: '',
        description: '',
        photo_url: '',
        active: true,
    });

    const { data: athletes, isLoading } = useQuery({
        queryKey: ['admin-athletes'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('athletes')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return data as Athlete[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            if (editingAthlete) {
                const { error } = await supabase
                    .from('athletes')
                    .update(data)
                    .eq('id', editingAthlete.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('athletes')
                    .insert([data]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-athletes'] });
            queryClient.invalidateQueries({ queryKey: ['athletes'] });
            toast.success(editingAthlete ? 'Atleta atualizado!' : 'Atleta criado!');
            handleCloseDialog();
        },
        onError: (error) => {
            toast.error('Erro ao salvar atleta: ' + error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('athletes')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-athletes'] });
            queryClient.invalidateQueries({ queryKey: ['athletes'] });
            toast.success('Atleta excluído!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir atleta: ' + error.message);
        },
    });

    const handleOpenDialog = (athlete?: Athlete) => {
        if (athlete) {
            setEditingAthlete(athlete);
            setFormData({
                name: athlete.name,
                position: athlete.position,
                achievements: athlete.achievements || '',
                years: athlete.years || '',
                description: athlete.description || '',
                photo_url: athlete.photo_url || '',
                active: athlete.active,
            });
        } else {
            setEditingAthlete(null);
            setFormData({
                name: '',
                position: '',
                achievements: '',
                years: '',
                description: '',
                photo_url: '',
                active: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingAthlete(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir este atleta?')) {
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
                    <span className="text-2xl font-bold">Gerenciar Atletas</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white shadow-lg font-bold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar Atleta
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-rugby-blue-dark">
                                    {editingAthlete ? 'Editar Atleta' : 'Novo Atleta'}
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

                                    <div className="col-span-2">
                                        <Label htmlFor="position">Posição *</Label>
                                        <Input
                                            id="position"
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                            placeholder="Ex: Capitão - Centro"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="years">Anos</Label>
                                        <Input
                                            id="years"
                                            value={formData.years}
                                            onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                                            placeholder="Ex: 2010-2024"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="active"
                                            checked={formData.active}
                                            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                                        />
                                        <Label htmlFor="active">Atleta Ativo</Label>
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="achievements">Conquistas</Label>
                                        <Textarea
                                            id="achievements"
                                            value={formData.achievements}
                                            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                            placeholder="Ex: 3x Campeão Nacional, Seleção Brasileira"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="photo_url">URL da Foto</Label>
                                        <Input
                                            id="photo_url"
                                            type="url"
                                            value={formData.photo_url}
                                            onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                                            placeholder="https://exemplo.com/foto.jpg"
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
                                <TableHead className="font-bold">Posição</TableHead>
                                <TableHead className="font-bold">Anos</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {athletes?.map((athlete) => (
                                <TableRow key={athlete.id} className="hover:bg-rugby-cream/50">
                                    <TableCell className="font-medium">{athlete.name}</TableCell>
                                    <TableCell>{athlete.position}</TableCell>
                                    <TableCell>{athlete.years || '-'}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${athlete.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {athlete.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenDialog(athlete)}
                                                className="hover:bg-rugby-blue-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(athlete.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {athletes?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                        Nenhum atleta cadastrado
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

export default AthletesAdmin;
