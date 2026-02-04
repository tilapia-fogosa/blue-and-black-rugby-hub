
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, X, Eye, FileText } from 'lucide-react';

export const TacaAdmin = () => {
    const { toast } = useToast();
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const { data: registrations, isLoading, refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('championship_registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        }
    });

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('championship_registrations')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            toast({
                title: "Status atualizado",
                description: `A inscrição foi marcada como ${newStatus}.`,
            });
            refetch();
        } catch (error: any) {
            toast({
                title: "Erro ao atualizar",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const filteredRegistrations = registrations?.filter(reg =>
        filterStatus === 'all' ? true : reg.status === filterStatus
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <Badge className="bg-green-500">Inscrito</Badge>;
            case 'pending': return <Badge className="bg-yellow-500">Pendente</Badge>;
            case 'cancelled': return <Badge className="bg-red-500">Cancelado</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inscrições - Taça Pé Vermelho</CardTitle>
                <div className="w-[200px]">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filtrar por Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                            <SelectItem value="approved">Inscritos</SelectItem>
                            <SelectItem value="cancelled">Cancelados</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Posição</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Comprovante</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRegistrations?.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{reg.name}</span>
                                        <span className="text-xs text-gray-500">{reg.email}</span>
                                        <span className="text-xs text-gray-500">{reg.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{reg.position}</TableCell>
                                <TableCell>{reg.city}</TableCell>
                                <TableCell>
                                    {reg.payment_proof_url && (
                                        <Button variant="ghost" size="sm" asChild>
                                            <a href={reg.payment_proof_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                Ver
                                            </a>
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>{getStatusBadge(reg.status)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {reg.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                                                    onClick={() => handleStatusChange(reg.id, 'approved')}
                                                    title="Aprovar Pagamento"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleStatusChange(reg.id, 'cancelled')}
                                                    title="Rejeitar/Cancelar"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </>
                                        )}
                                        {reg.status !== 'pending' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-xs"
                                                onClick={() => handleStatusChange(reg.id, 'pending')}
                                            >
                                                Alterar
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredRegistrations?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    Nenhuma inscrição encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
