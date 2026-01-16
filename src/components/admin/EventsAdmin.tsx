import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/integrations/supabase/types';
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

const EventsAdmin = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        type: 'Jogo',
        opponent: '',
        description: '',
    });

    // Fetch events
    const { data: events, isLoading } = useQuery({
        queryKey: ['admin-events'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            return data as Event[];
        },
    });

    // Create/Update mutation
    const saveMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            if (editingEvent) {
                const { error } = await supabase
                    .from('events')
                    .update(data)
                    .eq('id', editingEvent.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('events')
                    .insert([data]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-events'] });
            queryClient.invalidateQueries({ queryKey: ['events'] });
            toast.success(editingEvent ? 'Evento atualizado!' : 'Evento criado!');
            handleCloseDialog();
        },
        onError: (error) => {
            toast.error('Erro ao salvar evento: ' + error.message);
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-events'] });
            queryClient.invalidateQueries({ queryKey: ['events'] });
            toast.success('Evento excluído!');
        },
        onError: (error) => {
            toast.error('Erro ao excluir evento: ' + error.message);
        },
    });

    const handleOpenDialog = (event?: Event) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                date: event.date,
                time: event.time || '',
                location: event.location,
                type: event.type,
                opponent: event.opponent || '',
                description: event.description || '',
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                date: '',
                time: '',
                location: '',
                type: 'Jogo',
                opponent: '',
                description: '',
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingEvent(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
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
                    <span className="text-2xl font-bold">Gerenciar Eventos</span>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white shadow-lg font-bold"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar Evento
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-rugby-blue-dark">
                                    {editingEvent ? 'Editar Evento' : 'Novo Evento'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <Label htmlFor="title">Título *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="date">Data *</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="time">Horário</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="location">Local *</Label>
                                        <Input
                                            id="location"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="type">Tipo *</Label>
                                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Jogo">Jogo</SelectItem>
                                                <SelectItem value="Treino">Treino</SelectItem>
                                                <SelectItem value="Final">Final</SelectItem>
                                                <SelectItem value="Social">Social</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-2">
                                        <Label htmlFor="opponent">Oponente</Label>
                                        <Input
                                            id="opponent"
                                            value={formData.opponent}
                                            onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                                            placeholder="Deixe em branco se não houver oponente"
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
                                <TableHead className="font-bold">Data</TableHead>
                                <TableHead className="font-bold">Local</TableHead>
                                <TableHead className="font-bold">Tipo</TableHead>
                                <TableHead className="font-bold">Oponente</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events?.map((event) => (
                                <TableRow key={event.id} className="hover:bg-rugby-cream/50">
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{new Date(event.date).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.type === 'Jogo' ? 'bg-blue-100 text-blue-800' :
                                            event.type === 'Final' ? 'bg-red-100 text-red-800' :
                                                event.type === 'Treino' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>{event.opponent || '-'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleOpenDialog(event)}
                                                className="hover:bg-rugby-blue-primary/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(event.id)}
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {events?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        Nenhum evento cadastrado
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

export default EventsAdmin;
