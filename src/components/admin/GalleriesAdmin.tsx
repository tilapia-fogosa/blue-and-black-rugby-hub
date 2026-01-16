import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Gallery } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const GalleriesAdmin = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Jogos',
        cover_image_url: '',
    });

    const { data: galleries, isLoading } = useQuery({
        queryKey: ['admin-galleries'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('galleries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as Gallery[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            if (editingGallery) {
                const { error } = await supabase
                    .from('galleries')
                    .update(data)
                    .eq('id', editingGallery.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('galleries')
                    .insert([data]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-galleries'] });
            toast.success(editingGallery ? 'Galeria atualizada!' : 'Galeria criada!');
            handleCloseDialog();
        },
        onError: (error) => {
            toast.error('Erro ao salvar galeria: ' + error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('galleries')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-galleries'] });
            toast.success('Galeria excluída!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir galeria: ' + error.message);
        },
    });

    const handleOpenDialog = (gallery?: Gallery) => {
        if (gallery) {
            setEditingGallery(gallery);
            setFormData({
                title: gallery.title,
                description: gallery.description || '',
                category: gallery.category,
                cover_image_url: gallery.cover_image_url || '',
            });
        } else {
            setEditingGallery(null);
            setFormData({
                title: '',
                description: '',
                category: 'Jogos',
                cover_image_url: '',
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingGallery(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir esta galeria? Todas as imagens associadas também serão excluídas.')) {
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
                    <span className="text-2xl font-bold">Gerenciar Galerias</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white shadow-lg font-bold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar Galeria
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-rugby-blue-dark">
                                    {editingGallery ? 'Editar Galeria' : 'Nova Galeria'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Título *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Categoria *</Label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Jogos">Jogos</SelectItem>
                                                <SelectItem value="Treinos">Treinos</SelectItem>
                                                <SelectItem value="Vitórias">Vitórias</SelectItem>
                                                <SelectItem value="Equipe">Equipe</SelectItem>
                                                <SelectItem value="Eventos">Eventos</SelectItem>
                                                <SelectItem value="Troféus">Troféus</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="cover_image_url">URL da Imagem de Capa</Label>
                                        <Input
                                            id="cover_image_url"
                                            type="url"
                                            value={formData.cover_image_url}
                                            onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                                            placeholder="https://exemplo.com/imagem.jpg"
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
                                <TableHead className="font-bold">Título</TableHead>
                                <TableHead className="font-bold">Categoria</TableHead>
                                <TableHead className="font-bold">Descrição</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {galleries?.map((gallery) => (
                                <TableRow key={gallery.id} className="hover:bg-rugby-cream/50">
                                    <TableCell className="font-medium">{gallery.title}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-rugby-blue-primary/10 text-rugby-blue-dark">
                                            {gallery.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{gallery.description || '-'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenDialog(gallery)}
                                                className="hover:bg-rugby-blue-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(gallery.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {galleries?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                        Nenhuma galeria cadastrada
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

export default GalleriesAdmin;
