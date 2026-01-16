import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HistoryMilestone } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const HistoryAdmin = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingHistory, setEditingHistory] = useState<HistoryMilestone | null>(null);
    const [formData, setFormData] = useState({
        year: '',
        title: '',
        description: '',
    });

    const { data: historyItems, isLoading } = useQuery({
        queryKey: ['admin-history'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('history')
                .select('*')
                .order('year', { ascending: false });

            if (error) throw error;
            return data as HistoryMilestone[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            if (editingHistory) {
                const { error } = await supabase
                    .from('history')
                    .update(data)
                    .eq('id', editingHistory.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('history')
                    .insert([data]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-history'] });
            toast.success(editingHistory ? 'Marco histórico atualizado!' : 'Marco histórico criado!');
            handleCloseDialog();
        },
        onError: (error) => {
            toast.error('Erro ao salvar marco histórico: ' + error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('history')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-history'] });
            toast.success('Marco histórico excluído!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir marco histórico: ' + error.message);
        },
    });

    const handleOpenDialog = (history?: HistoryMilestone) => {
        if (history) {
            setEditingHistory(history);
            setFormData({
                year: history.year,
                title: history.title,
                description: history.description,
            });
        } else {
            setEditingHistory(null);
            setFormData({
                year: '',
                title: '',
                description: '',
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingHistory(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir este marco histórico?')) {
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
                    <span className="text-2xl font-bold">Gerenciar História</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white shadow-lg font-bold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar Marco
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-rugby-blue-dark">
                                    {editingHistory ? 'Editar Marco Histórico' : 'Novo Marco Histórico'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="year">Ano *</Label>
                                        <Input
                                            id="year"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            placeholder="Ex: 1985"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="title">Título *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Ex: Fundação do Clube"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Descrição *</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={4}
                                            required
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
                                <TableHead className="font-bold">Ano</TableHead>
                                <TableHead className="font-bold">Título</TableHead>
                                <TableHead className="font-bold">Descrição</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyItems?.map((item) => (
                                <TableRow key={item.id} className="hover:bg-rugby-cream/50">
                                    <TableCell className="font-bold text-rugby-blue-primary">{item.year}</TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="max-w-md truncate">{item.description}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenDialog(item)}
                                                className="hover:bg-rugby-blue-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {historyItems?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        Nenhum marco histórico cadastrado
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

export default HistoryAdmin;
