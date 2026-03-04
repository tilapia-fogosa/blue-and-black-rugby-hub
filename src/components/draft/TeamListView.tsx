import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Athlete } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Configuração das equipes por categoria
const TEAMS_CONFIG: Record<string, string[]> = {
    'Masc': ['Panema', 'Guarás', 'Tatus'],
    'Feminino': ['Harpias', 'Jaguatiricas'],
    'Juvenil Masc': ['Queixadas', 'Quatis']
};

interface TeamListViewProps {
    categoryFilter: string;
}

export const TeamListView = ({ categoryFilter }: TeamListViewProps) => {
    const activeTeamNames = TEAMS_CONFIG[categoryFilter] || [];
    const [teams, setTeams] = useState<Record<string, Athlete[]>>({});
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

            const newTeams: Record<string, Athlete[]> = {};
            activeTeamNames.forEach(t => {
                newTeams[t] = [];
            });

            (data as any[]).forEach((ath: any) => {
                const team = ath.draft_team;
                if (!team || team === 'Pool' || !activeTeamNames.includes(team)) return;

                if (newTeams[team]) {
                    newTeams[team].push(ath);
                }
            });

            // Sort by position alphabetically
            Object.keys(newTeams).forEach(team => {
                newTeams[team].sort((a, b) => {
                    const posA = a.position || '';
                    const posB = b.position || '';
                    return posA.localeCompare(posB);
                });
            });

            setTeams(newTeams);
            setLoading(false);
        };

        fetchAthletes();
    }, [categoryFilter]);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-rugby-red w-8 h-8" /></div>;

    const FORWARDS_POSITIONS = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'];

    return (
        <div className="flex-1 w-full overflow-y-auto pr-2 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeTeamNames.map((teamName) => {
                    const teamAthletes = teams[teamName] || [];

                    return (
                        <div key={teamName} className="bg-white text-black border border-gray-200 rounded-lg overflow-hidden shadow-md print:shadow-none print:border-gray-800">
                            <div className="bg-gray-100 border-b border-gray-200 p-3 text-center">
                                <h3 className="font-bold text-lg uppercase tracking-wide">{teamName}</h3>
                                <p className="text-xs text-gray-500">{teamAthletes.length} Atletas</p>
                            </div>

                            {teamAthletes.length > 0 ? (
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-gray-50 border-b border-gray-200 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-2 font-medium">Atleta</th>
                                            <th className="px-4 py-2 font-medium text-right">Posição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamAthletes.map((athlete, index) => {
                                            const isForward = FORWARDS_POSITIONS.includes(athlete.position);
                                            return (
                                                <tr key={athlete.id} className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="px-4 py-2 font-medium text-gray-800 uppercase text-xs">
                                                        {athlete.name}
                                                    </td>
                                                    <td className="px-4 py-2 text-right">
                                                        <Badge variant="outline" className={`${isForward ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-blue-600 border-blue-200 bg-blue-50'} text-[10px] uppercase px-1.5 py-0`}>
                                                            {athlete.position}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-sm">Nenhum atleta neste time</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
