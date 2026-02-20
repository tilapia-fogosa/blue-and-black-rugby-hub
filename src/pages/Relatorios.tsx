import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, TrendingUp, Trophy } from 'lucide-react';

interface RegistrationStats {
    total: number;
}

interface ModalityStats {
    masculino: RegistrationStats;
    masculinoJuvenil: RegistrationStats;
    feminino: RegistrationStats;
}

const Relatorios = () => {
    const { data: registrations, isLoading } = useQuery({
        queryKey: ['relatorios-public-stats'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('category, origin_team')
                .eq('status', 'approved');

            if (error) throw error;
            return data;
        }
    });

    const calculateStats = () => {
        if (!registrations) {
            return {
                stats: {
                    masculino: { total: 0 },
                    masculinoJuvenil: { total: 0 },
                    feminino: { total: 0 },
                },
                teams: {} as Record<string, number>
            };
        }

        const stats: ModalityStats = {
            masculino: { total: 0 },
            masculinoJuvenil: { total: 0 },
            feminino: { total: 0 },
        };

        const teams: Record<string, number> = {};

        registrations.forEach((reg) => {
            // Determine modality
            if (reg.category === 'Masc') {
                stats.masculino.total++;
            } else if (reg.category === 'Juvenil Masc') {
                stats.masculinoJuvenil.total++;
            } else if (reg.category === 'Feminino') {
                stats.feminino.total++;
            }

            // Count by origin team
            const rawTeamName = reg.origin_team || '';

            const mapToMainTeam = (name: string): string => {
                const input = name.toLowerCase().trim();
                if (!input || input === 'nenhum' || input === 'nao' || input === 'não') {
                    return 'Sem time / Avulso';
                }

                // Substring matches for the 5 main teams
                if (input.includes('maringa') || input.includes('maringá')) return 'Maringá';
                if (input.includes('londrina') || input.includes('pé vermelho') || input.includes('pe vermelho') || input.includes('alrc')) return 'Londrina';
                if (input.includes('sarandi')) return 'Sarandi';
                if (input.includes('assis')) return 'Assis';
                if (input.includes('apucarana')) return 'Apucarana';

                // Original string if it doesn't match the 5 main teams
                return name.trim();
            };

            const normalizedTeamName = mapToMainTeam(rawTeamName);

            teams[normalizedTeamName] = (teams[normalizedTeamName] || 0) + 1;
        });

        return { stats, teams };
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-rugby-black flex justify-center items-center">
                <Loader2 className="animate-spin text-rugby-red w-12 h-12" />
            </div>
        );
    }

    const { stats, teams } = calculateStats();
    const totalAthletes = stats.masculino.total + stats.masculinoJuvenil.total + stats.feminino.total;

    // Sort teams by desc count
    const sortedTeams = Object.entries(teams).sort((a, b) => b[1] - a[1]);

    const ModalityCard = ({
        title,
        total,
        color
    }: {
        title: string;
        total: number;
        color: string;
    }) => (
        <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className={`${color} text-white`}>
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                    <span>{title}</span>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white text-lg px-3 py-1 border-0">
                        {total}
                    </Badge>
                </CardTitle>
            </CardHeader>
        </Card>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 bg-rugby-black">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Relatórios da Copa
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Estatísticas em tempo real das inscrições da Copa Pé Vermelho.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Total Overview */}
                    <Card className="border-0 shadow-2xl bg-gradient-to-r from-rugby-red via-rugby-blue-dark to-rugby-black text-white overflow-hidden">
                        <CardContent className="p-8 sm:p-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-20 w-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                                        <TrendingUp className="w-10 h-10 text-rugby-cream" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{totalAthletes}</h2>
                                        <p className="text-white/80 text-lg sm:text-xl font-medium mt-1">Total de Atletas Aprovados</p>
                                    </div>
                                </div>
                                <Users className="w-24 h-24 text-white/10 hidden sm:block" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Modality Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ModalityCard
                            title="Masculino Adulto"
                            total={stats.masculino.total}
                            color="bg-gradient-to-br from-blue-600 to-blue-900"
                        />
                        <ModalityCard
                            title="Feminino Adulto"
                            total={stats.feminino.total}
                            color="bg-gradient-to-br from-purple-600 to-purple-900"
                        />
                        <ModalityCard
                            title="Masculino Juvenil"
                            total={stats.masculinoJuvenil.total}
                            color="bg-gradient-to-br from-rugby-red to-red-900"
                        />
                    </div>

                    {/* Teams Breakdown */}
                    <Card className="border-0 shadow-xl bg-gray-900 border-white/10">
                        <CardHeader className="border-b border-white/10 pb-6">
                            <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-rugby-red" />
                                Inscrições por Time de Origem
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sortedTeams.map(([team, count], index) => (
                                    <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <span className="font-semibold text-gray-200 truncate pr-4" title={team}>
                                            {team}
                                        </span>
                                        <Badge className="bg-rugby-red text-white hover:bg-rugby-red/90 px-3 py-1 text-base">
                                            {count}
                                        </Badge>
                                    </div>
                                ))}
                                {sortedTeams.length === 0 && (
                                    <div className="col-span-full text-center py-8 text-gray-400">
                                        Nenhum time registrado até o momento.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;
