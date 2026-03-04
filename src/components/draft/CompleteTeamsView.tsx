import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Athlete } from '@/integrations/supabase/types';
import { Loader2, Shield, Zap, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

// Configuração das equipes por categoria
const TEAMS_CONFIG: Record<string, string[]> = {
    'Masc': ['Panema', 'Guarás', 'Tatus'],
    'Feminino': ['Harpias', 'Jaguatiricas'],
    'Juvenil Masc': ['Queixadas', 'Quatis']
};

const COACHES_CONFIG: Record<string, string> = {
    'Panema': 'Davi',
    'Guarás': 'Peri',
    'Tatus': 'Ector',
    'Harpias': 'Maga',
    'Jaguatiricas': 'Vivian',
    'Queixadas': 'Jaime',
    'Quatis': 'Léo Bonfim'
};

interface CompleteTeamsViewProps {
    categoryFilter: string;
}

export const CompleteTeamsView = ({ categoryFilter }: CompleteTeamsViewProps) => {
    const activeTeamNames = TEAMS_CONFIG[categoryFilter] || [];
    const [teams, setTeams] = useState<Record<string, { forwards: Athlete[]; backs: Athlete[] }>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAthletes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('*')
                .eq('category', categoryFilter)
                .neq('status', 'rejected');

            if (error) {
                console.error('Error fetching athletes:', error);
                setLoading(false);
                return;
            }

            const FORWARDS_POSITIONS = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'];

            const newTeams: Record<string, { forwards: Athlete[]; backs: Athlete[] }> = {};
            activeTeamNames.forEach(t => {
                newTeams[t] = { forwards: [], backs: [] };
            });

            (data as any[]).forEach((ath: any) => {
                const team = ath.draft_team;
                if (!team || team === 'Pool' || !activeTeamNames.includes(team)) return;

                const isForward = FORWARDS_POSITIONS.includes(ath.preferred_position);

                if (newTeams[team]) {
                    if (isForward) {
                        newTeams[team].forwards.push(ath);
                    } else {
                        newTeams[team].backs.push(ath);
                    }
                }
            });

            setTeams(newTeams);
            setLoading(false);
        };

        fetchAthletes();
    }, [categoryFilter]);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-rugby-red w-8 h-8" /></div>;

    const renderAthleteCard = (athlete: Athlete, isForward: boolean) => (
        <Card key={athlete.id} className="relative overflow-hidden border w-full aspect-[3/4] border-white/10 bg-gray-900 shadow-md rounded-md group">
            <div className="absolute inset-0 bg-gray-800">
                {athlete.athlete_photo_url ? (
                    <img
                        src={athlete.athlete_photo_url}
                        alt={athlete.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 ${athlete.athlete_photo_url ? 'hidden' : ''}`}>
                    <User className="w-8 h-8 text-gray-500 opacity-50" />
                </div>
            </div>

            {/* Badge */}
            <div className="absolute top-1 left-1">
                <Badge className={`${isForward ? 'bg-orange-600' : 'bg-blue-600'} text-white border-0 text-[8px] font-bold px-1 py-0 h-4 shadow-sm z-10 relative`}>
                    {athlete.position ? athlete.position.substring(0, 3).toUpperCase() : ''}
                </Badge>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 pb-1 px-1 text-center z-10">
                <p className="text-white font-bold text-[10px] leading-tight truncate uppercase tracking-tight">
                    {athlete.name}
                </p>
            </div>
        </Card>
    );

    return (
        <div className="flex-1 w-full overflow-y-auto pr-2 pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {activeTeamNames.map((teamName) => {
                    const teamData = teams[teamName] || { forwards: [], backs: [] };
                    const totalPlayers = teamData.forwards.length + teamData.backs.length;

                    return (
                        <div key={teamName} className="bg-gray-900/60 border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-lg">
                            {/* Team Header */}
                            <div className="bg-black/60 border-b border-white/10 p-4 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-rugby-red/20 via-transparent to-rugby-blue/20 opacity-30"></div>
                                <h2 className="text-2xl font-black text-white tracking-widest uppercase relative z-10">{teamName}</h2>
                                {COACHES_CONFIG[teamName] && (
                                    <p className="text-sm text-gray-400 font-medium tracking-wide mt-1 relative z-10">
                                        Treinador: <span className="text-white">{COACHES_CONFIG[teamName]}</span>
                                    </p>
                                )}
                                <div className="absolute top-4 right-4 bg-white/10 px-2 py-1 rounded text-xs text-white font-bold backdrop-blur-sm">
                                    {totalPlayers} Atletas
                                </div>
                            </div>

                            {/* Team Content */}
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

                                {/* Forwards Section */}
                                <div className="bg-orange-950/20 border border-orange-500/20 rounded-lg p-3 flex flex-col">
                                    <h3 className="flex items-center justify-center gap-2 text-orange-400 font-bold uppercase text-sm mb-3 pb-2 border-b border-orange-500/20">
                                        <Shield className="w-4 h-4" /> Forwards ({teamData.forwards.length})
                                    </h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 flex-1 content-start">
                                        {teamData.forwards.map(athlete => renderAthleteCard(athlete, true))}
                                    </div>
                                    {teamData.forwards.length === 0 && (
                                        <div className="flex-1 flex items-center justify-center text-orange-500/30 text-xs text-center py-4">Nenhum Forward</div>
                                    )}
                                </div>

                                {/* Backs Section */}
                                <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-3 flex flex-col">
                                    <h3 className="flex items-center justify-center gap-2 text-blue-400 font-bold uppercase text-sm mb-3 pb-2 border-b border-blue-500/20">
                                        <Zap className="w-4 h-4" /> Backs ({teamData.backs.length})
                                    </h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 flex-1 content-start">
                                        {teamData.backs.map(athlete => renderAthleteCard(athlete, false))}
                                    </div>
                                    {teamData.backs.length === 0 && (
                                        <div className="flex-1 flex items-center justify-center text-blue-500/30 text-xs text-center py-4">Nenhum Back</div>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
