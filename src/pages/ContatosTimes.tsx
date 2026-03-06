import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Shield, Zap, User, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the local interface based on table projection
interface ContactAthlete {
    id: string;
    name: string;
    phone: string;
    draft_team: string;
    preferred_position: string | null;
    athlete_photo_url: string | null;
    category: string;
}

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

const FORWARDS_POSITIONS = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'];

export default function ContatosTimes() {
    const [category, setCategory] = useState('Masc');
    const [teams, setTeams] = useState<Record<string, { forwards: ContactAthlete[]; backs: ContactAthlete[] }>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAthletes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('id, name, phone, draft_team, preferred_position, athlete_photo_url, category')
                .eq('category', category)
                .neq('status', 'rejected')
                .not('draft_team', 'is', null)
                .neq('draft_team', 'Pool');

            if (error) {
                console.error('Error fetching athletes:', error);
                setLoading(false);
                return;
            }

            const activeTeamNames = TEAMS_CONFIG[category] || [];
            const newTeams: Record<string, { forwards: ContactAthlete[]; backs: ContactAthlete[] }> = {};
            activeTeamNames.forEach(t => {
                newTeams[t] = { forwards: [], backs: [] };
            });

            (data as ContactAthlete[]).forEach(ath => {
                const team = ath.draft_team;
                if (!team || !activeTeamNames.includes(team)) return;

                const isForward = FORWARDS_POSITIONS.includes(ath.preferred_position || '');

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
    }, [category]);

    const formatWhatsAppLink = (phone: string) => {
        if (!phone) return '';
        const cleanPhone = phone.replace(/\D/g, '');
        // Default to Brazil country code if not present and has appropriate length
        const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
        return `https://wa.me/${fullPhone}`;
    };

    const renderAthleteCard = (athlete: ContactAthlete, isForward: boolean) => (
        <Card key={athlete.id} className="relative overflow-hidden border bg-gray-900 border-white/10 shadow-md rounded-md flex p-3 gap-3 items-center group hover:bg-white/5 transition-colors">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/20 bg-gray-800 relative">
                {athlete.athlete_photo_url ? (
                    <img
                        src={athlete.athlete_photo_url}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center bg-gray-800 ${athlete.athlete_photo_url ? 'hidden' : ''}`}>
                    <User className="w-6 h-6 text-gray-500 opacity-50" />
                </div>

                {/* Position Badge overlaying photo */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <Badge className={`${isForward ? 'bg-orange-600' : 'bg-blue-600'} text-white border-0 text-[9px] font-bold px-1.5 py-0 h-4 shadow-sm relative`}>
                        {athlete.preferred_position ? athlete.preferred_position.substring(0, 3).toUpperCase() : ''}
                    </Badge>
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate uppercase">
                    {athlete.name}
                </p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">
                    {athlete.phone || 'Sem telefone'}
                </p>
            </div>

            <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 p-0 shrink-0 shadow-lg shadow-green-900/20"
                disabled={!athlete.phone}
                onClick={() => {
                    if (athlete.phone) {
                        window.open(formatWhatsAppLink(athlete.phone), '_blank');
                    }
                }}
            >
                <MessageCircle className="w-5 h-5" />
            </Button>
        </Card>
    );

    return (
        <div className="min-h-screen bg-rugby-black pt-24 pb-8 px-4 md:px-6 font-primary text-white bg-[url('/subtle-pattern.png')] flex flex-col">
            <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase group">
                        Contatos <span className="text-rugby-red">Pé Vermelho</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Lista de todos os times e o contato de WhatsApp de cada atleta.
                    </p>
                </div>

                <Tabs value={category} onValueChange={setCategory} className="flex-1 flex flex-col">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full h-auto flex flex-wrap justify-center gap-1 w-full max-w-2xl">
                            <TabsTrigger value="Masc" className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-gray-400 transition-all hover:text-white">Masculino Adulto</TabsTrigger>
                            <TabsTrigger value="Feminino" className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-red data-[state=active]:text-white text-gray-400 transition-all hover:text-white">Feminino</TabsTrigger>
                            <TabsTrigger value="Juvenil Masc" className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-400 transition-all hover:text-white">Juvenil Masculino</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 flex flex-col">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="animate-spin text-rugby-red w-12 h-12" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {(TEAMS_CONFIG[category] || []).map((teamName) => {
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
                                            <div className="p-4 grid grid-cols-1 gap-6 flex-1">

                                                {/* Forwards Section */}
                                                <div className="bg-orange-950/20 border border-orange-500/20 rounded-lg p-3 flex flex-col">
                                                    <h3 className="flex items-center gap-2 text-orange-400 font-bold uppercase text-sm mb-4 pb-2 border-b border-orange-500/20">
                                                        <Shield className="w-4 h-4" /> Forwards ({teamData.forwards.length})
                                                    </h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 content-start">
                                                        {teamData.forwards.map(athlete => renderAthleteCard(athlete, true))}
                                                    </div>
                                                    {teamData.forwards.length === 0 && (
                                                        <div className="flex-1 flex items-center justify-center text-orange-500/30 text-xs text-center py-4">Nenhum Forward</div>
                                                    )}
                                                </div>

                                                {/* Backs Section */}
                                                <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-3 flex flex-col">
                                                    <h3 className="flex items-center gap-2 text-blue-400 font-bold uppercase text-sm mb-4 pb-2 border-b border-blue-500/20">
                                                        <Zap className="w-4 h-4" /> Backs ({teamData.backs.length})
                                                    </h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 content-start">
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
                        )}
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
