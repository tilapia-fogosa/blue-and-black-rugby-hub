import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Definindo o tipo baseado no banco de dados e requisitos
type Athlete = {
    id: string;
    name: string;
    category: string;
    athlete_photo_url: string | null;
    draft_position_group: string | null;
    status: string;
};

const Elenco = () => {
    // Estado para a aba ativa
    const [activeTab, setActiveTab] = useState('todos');

    // Fetch dos atletas aprovados
    const { data: athletes, isLoading, error } = useQuery({
        queryKey: ['approved-athletes'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('id, name, category, athlete_photo_url, draft_position_group, status')
                .eq('status', 'approved')
                .order('name');

            if (error) {
                console.error("Erro ao buscar elenco:", error);
                throw error;
            }
            return data as Athlete[];
        }
    });

    // Função para abreviar o nome (Primeiro e Último)
    const formatName = (fullName: string) => {
        if (!fullName) return '';
        const parts = fullName.trim().split(' ');
        if (parts.length === 1) return parts[0];
        return `${parts[0]} ${parts[parts.length - 1]}`;
    };

    // Componente interno do Card do Atleta
    const AthleteCard = ({ athlete, showPosition }: { athlete: Athlete, showPosition: boolean }) => {
        // Determina a posição de exibição ou 'Indefinido'
        const displayPosition = athlete.draft_position_group === 'Forward' ? 'Forward'
            : athlete.draft_position_group === 'Back' ? 'Linha'
                : 'Indefinido';

        return (
            <div className="group relative rounded-xl overflow-hidden bg-rugby-black/40 border border-white/10 p-4 transition-all duration-300 hover:bg-white/5 hover:border-rugby-red hover:-translate-y-1 hover:shadow-lg hover:shadow-rugby-red/20 flex flex-col items-center text-center gap-3">
                {/* Avatar / Foto */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-rugby-red transition-colors duration-300">
                    {athlete.athlete_photo_url ? (
                        <img
                            src={athlete.athlete_photo_url}
                            alt={`Foto de ${athlete.name}`}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500">
                            <User size={32} />
                        </div>
                    )}
                </div>

                {/* Info Text */}
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-rugby-red transition-colors duration-300">
                        {formatName(athlete.name)}
                    </h3>

                    {/* Position Text (Conditionally shown for Masc) */}
                    {showPosition && (
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-1 inline-block">
                            {displayPosition}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-rugby-black flex flex-col items-center justify-center pt-20">
                <Loader2 className="h-10 w-10 text-rugby-red animate-spin mb-4" />
                <p className="text-gray-400">Carregando elenco...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-rugby-black flex flex-col items-center justify-center pt-20 text-center px-4">
                <div className="text-red-500 mb-4 text-5xl">⚠️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Erro ao carregar o elenco</h2>
                <p className="text-gray-400">Não foi possível buscar a lista de atletas no momento.</p>
            </div>
        );
    }

    // Filtros e Agrupamentos
    const allAthletes = athletes || [];

    // Categorias
    const masculinos = allAthletes.filter(a => a.category === 'Masc');
    const femininos = allAthletes.filter(a => a.category === 'Feminino');
    const juvenis = allAthletes.filter(a => a.category?.includes('Juvenil'));

    // Grupos Masc
    const mForwards = masculinos.filter(a => a.draft_position_group === 'Forward');
    const mLinhas = masculinos.filter(a => a.draft_position_group === 'Back');
    const mIndefinidos = masculinos.filter(a => a.draft_position_group !== 'Forward' && a.draft_position_group !== 'Back');

    return (
        <div className="min-h-screen pt-24 pb-20 bg-rugby-black relative overflow-hidden">
            {/* Background Blur Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rugby-red/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase group">
                        Elenco <span className="text-rugby-red">Pé Vermelho</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Conheça o esquadrão completo aprovado para a temporada.
                    </p>
                </div>

                <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full h-auto flex flex-wrap justify-center gap-1 w-full max-w-3xl">
                            <TabsTrigger
                                value="todos"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-red data-[state=active]:text-white text-gray-400 transition-all hover:text-white"
                            >
                                Todos
                            </TabsTrigger>
                            <TabsTrigger
                                value="masculino"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-red data-[state=active]:text-white text-gray-400 transition-all hover:text-white"
                            >
                                Masculino Adulto
                            </TabsTrigger>
                            <TabsTrigger
                                value="feminino"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-red data-[state=active]:text-white text-gray-400 transition-all hover:text-white"
                            >
                                Feminino Adulto
                            </TabsTrigger>
                            <TabsTrigger
                                value="juvenil"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-rugby-red data-[state=active]:text-white text-gray-400 transition-all hover:text-white"
                            >
                                Juvenil
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* TODOS */}
                    <TabsContent value="todos" className="mt-0">
                        {allAthletes.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">Nenhum atleta aprovado encontrado.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {allAthletes.map(athlete => (
                                    <AthleteCard
                                        key={athlete.id}
                                        athlete={athlete}
                                        // rules say mask shows pos, others don't. Since it's 'todos', let's show position only if it's Masc.
                                        showPosition={athlete.category === 'Masc'}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* MASCULINO */}
                    <TabsContent value="masculino" className="mt-0 space-y-12">
                        {masculinos.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">Nenhum atleta masculino adulto aprovado.</p>
                        ) : (
                            <>
                                {mForwards.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                                            Forwards
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                            {mForwards.map(athlete => (
                                                <AthleteCard key={athlete.id} athlete={athlete} showPosition={true} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {mLinhas.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                            <span className="w-2 h-6 bg-rugby-red rounded-full"></span>
                                            Linhas (Backs)
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                            {mLinhas.map(athlete => (
                                                <AthleteCard key={athlete.id} athlete={athlete} showPosition={true} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {mIndefinidos.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-300 mb-6 flex items-center gap-3">
                                            <span className="w-2 h-6 bg-gray-500 rounded-full"></span>
                                            Indefinidos / Outros
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                            {mIndefinidos.map(athlete => (
                                                <AthleteCard key={athlete.id} athlete={athlete} showPosition={true} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </TabsContent>

                    {/* FEMININO */}
                    <TabsContent value="feminino" className="mt-0">
                        {femininos.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">Nenhum atleta feminino aprovado.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {femininos.map(athlete => (
                                    <AthleteCard key={athlete.id} athlete={athlete} showPosition={false} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* JUVENIL */}
                    <TabsContent value="juvenil" className="mt-0">
                        {juvenis.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">Nenhum atleta juvenil aprovado.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {juvenis.map(athlete => (
                                    <AthleteCard key={athlete.id} athlete={athlete} showPosition={false} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
};

export default Elenco;
