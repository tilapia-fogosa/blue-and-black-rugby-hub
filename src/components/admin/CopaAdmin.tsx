
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

export const CopaAdmin = () => {
    const { toast } = useToast();
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const { data: registrations, isLoading, refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        }
    });

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('athlete_registrations')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Send Approval Email if status is approved
            if (newStatus === 'approved') {
                const registration = registrations?.find(r => r.id === id);
                if (registration) {
                    try {
                        const { data, error: emailError } = await supabase.functions.invoke('resend-email', {
                            body: {
                                to: registration.email,
                                type: 'approval',
                                athleteName: registration.name
                            }
                        });

                        if (emailError) console.error('Email Edge Function Error:', emailError);
                        else console.log('Approval email sent:', data);
                    } catch (err) {
                        console.error('Email Fetch Error:', err);
                    }
                }
            }

            toast({
                title: "Status atualizado",
                description: `A inscrição foi marcada como ${newStatus === 'approved' ? 'Aprovada' : newStatus === 'pending' ? 'Pendente' : 'Cancelada'}.`,
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
            case 'approved': return <Badge className="bg-green-600 hover:bg-green-700">Aprovado</Badge>;
            case 'pending': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendente</Badge>;
            case 'rejected': return <Badge className="bg-red-500 hover:bg-red-600">Rejeitado</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-rugby-red" /></div>;

    return (
        <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-rugby-black text-white flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold">Inscrições Copa 2026</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">Gerencie os atletas inscritos e confirme pagamentos.</p>
                </div>
                <div className="w-[200px]">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Filtrar por Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-rugby-black border-white/20 text-white">
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                            <SelectItem value="approved">Aprovados</SelectItem>
                            <SelectItem value="rejected">Rejeitados</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="font-bold whitespace-nowrap">Data</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">Atleta</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">CPF / Nasc.</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">Categoria / Time</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">Posição</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">Comprovante</TableHead>
                                <TableHead className="font-bold whitespace-nowrap">Status</TableHead>
                                <TableHead className="font-bold text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRegistrations?.map((reg) => (
                                <TableRow key={reg.id} className="hover:bg-gray-50/50">
                                    <TableCell className="whitespace-nowrap text-xs text-gray-500">
                                        {new Date(reg.created_at).toLocaleDateString('pt-BR')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-rugby-blue-dark">{reg.name}</span>
                                            <span className="text-xs text-gray-500">{reg.email}</span>
                                            <span className="text-xs text-gray-500">{reg.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{reg.cpf}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(reg.birth_date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="font-medium">{reg.category}</span>
                                            <span className="text-xs text-gray-400 italic">
                                                {reg.origin_team || 'Sem time'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal">
                                            {reg.preferred_position}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {reg.payment_proof_url && (
                                            <Button variant="outline" size="sm" asChild className="h-8 gap-1.5 border-rugby-blue-dark/20 hover:bg-rugby-blue-dark hover:text-white transition-colors">
                                                <a href={reg.payment_proof_url} target="_blank" rel="noopener noreferrer">
                                                    <FileText className="w-4 h-4" />
                                                    Ver Docs
                                                </a>
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(reg.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {reg.status === 'pending' ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700 h-9 w-9 p-0 shadow-sm"
                                                        onClick={() => handleStatusChange(reg.id, 'approved')}
                                                        title="Aprovar Cadastro"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="h-9 w-9 p-0 shadow-sm"
                                                        onClick={() => handleStatusChange(reg.id, 'rejected')}
                                                        title="Rejeitar Cadastro"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 text-xs text-gray-500 hover:text-rugby-red"
                                                    onClick={() => handleStatusChange(reg.id, 'pending')}
                                                >
                                                    Resetar
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredRegistrations?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-12 text-gray-400 italic">
                                        Nenhuma inscrição encontrada para o filtro selecionado.
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
