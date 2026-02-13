import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, TrendingUp } from 'lucide-react';

// Position groupings
const FORWARDS = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'];
const BACKS = ['Meio-Scrum', 'Abertura', 'Centro', 'Ponta', 'Fullback'];

interface RegistrationStats {
    total: number;
    forwards: number;
    backs: number;
    undefined: number;
}

interface ModalityStats {
    masculinoAdulto: RegistrationStats;
    masculinoJuvenil: RegistrationStats;
    femininoAdulto: RegistrationStats;
}

export const CopaStatistics = () => {
    const { data: registrations, isLoading } = useQuery({
        queryKey: ['registrations-stats'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('*')
                .eq('status', 'approved'); // Only count approved registrations

            if (error) throw error;
            return data;
        }
    });

    const calculateStats = (): ModalityStats => {
        if (!registrations) {
            return {
                masculinoAdulto: { total: 0, forwards: 0, backs: 0, undefined: 0 },
                masculinoJuvenil: { total: 0, forwards: 0, backs: 0, undefined: 0 },
                femininoAdulto: { total: 0, forwards: 0, backs: 0, undefined: 0 },
            };
        }

        const stats: ModalityStats = {
            masculinoAdulto: { total: 0, forwards: 0, backs: 0, undefined: 0 },
            masculinoJuvenil: { total: 0, forwards: 0, backs: 0, undefined: 0 },
            femininoAdulto: { total: 0, forwards: 0, backs: 0, undefined: 0 },
        };

        registrations.forEach((reg) => {
            let modalityStats: RegistrationStats;

            // Determine modality
            if (reg.category === 'Masc') {
                modalityStats = stats.masculinoAdulto;
            } else if (reg.category === 'Juvenil Masc') {
                modalityStats = stats.masculinoJuvenil;
            } else if (reg.category === 'Feminino') {
                modalityStats = stats.femininoAdulto;
            } else {
                return; // Skip unknown categories
            }

            modalityStats.total++;

            // Categorize by position
            if (FORWARDS.includes(reg.preferred_position)) {
                modalityStats.forwards++;
            } else if (BACKS.includes(reg.preferred_position)) {
                modalityStats.backs++;
            } else {
                modalityStats.undefined++;
            }
        });

        return stats;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-rugby-red w-8 h-8" />
            </div>
        );
    }

    const stats = calculateStats();
    const totalAthletes = stats.masculinoAdulto.total + stats.masculinoJuvenil.total + stats.femininoAdulto.total;

    const ModalityCard = ({
        title,
        stats,
        color
    }: {
        title: string;
        stats: RegistrationStats;
        color: string;
    }) => (
        <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className={`${color} text-white pb-3`}>
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                    <span>{title}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white text-lg px-3 py-1">
                        {stats.total}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-blue-900">Forwards</span>
                    <Badge className="bg-rugby-blue-dark hover:bg-rugby-blue-dark/90 text-white">
                        {stats.forwards}
                    </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold text-green-700">Backs</span>
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        {stats.backs}
                    </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-600">Indefinido</span>
                    <Badge variant="outline" className="text-gray-600 border-gray-400">
                        {stats.undefined}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Total Overview */}
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-rugby-red via-rugby-blue-dark to-rugby-black text-white overflow-hidden">
                <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">{totalAthletes}</h2>
                                <p className="text-white/80 text-lg">Atletas Aprovados</p>
                            </div>
                        </div>
                        <Users className="w-16 h-16 text-white/30" />
                    </div>
                </CardContent>
            </Card>

            {/* Modality Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModalityCard
                    title="Masculino Adulto"
                    stats={stats.masculinoAdulto}
                    color="bg-gradient-to-br from-rugby-blue-dark to-blue-900"
                />
                <ModalityCard
                    title="Masculino Juvenil"
                    stats={stats.masculinoJuvenil}
                    color="bg-gradient-to-br from-rugby-red to-red-900"
                />
                <ModalityCard
                    title="Feminino Adulto"
                    stats={stats.femininoAdulto}
                    color="bg-gradient-to-br from-purple-600 to-purple-900"
                />
            </div>

            {/* Position Breakdown Legend */}
            <Card className="border-0 shadow-md bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-lg text-rugby-black">Legenda de Posições</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="font-semibold text-rugby-blue-dark mb-1">Forwards:</p>
                        <p className="text-sm text-gray-600">{FORWARDS.join(', ')}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-green-700 mb-1">Backs:</p>
                        <p className="text-sm text-gray-600">{BACKS.join(', ')}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600 mb-1">Indefinido:</p>
                        <p className="text-sm text-gray-600">Não sei ainda</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
