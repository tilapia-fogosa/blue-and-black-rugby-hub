import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CopaPeVermelho = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-rugby-black">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] bg-rugby-black py-12 md:py-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="grid md:grid-cols-2 gap-8 items-center min-h-[80vh]">
                        {/* Left Column - Content */}
                        <div className="animate-fade-in space-y-6 order-2 md:order-1">
                            <span className="inline-block px-4 py-1 bg-rugby-red/20 border border-rugby-red rounded-full text-rugby-cream text-sm font-semibold tracking-wider mb-4">
                                TEMPORADA 2026
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                                COPA <span className="text-rugby-red">PÉ VERMELHO</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300">
                                O maior campeonato de rugby do interior. Mostre sua força, garra e paixão pelo esporte.
                            </p>

                            <div className="flex flex-col gap-4 pt-4">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-6 h-6 text-rugby-red" />
                                    <span>07 de Março de 2026</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin className="w-6 h-6 text-rugby-red" />
                                    <span>Campo do Ginásio de Esportes Lagoão - Apucarana PR</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    size="lg"
                                    className="bg-rugby-red hover:bg-rugby-red/90 text-white text-lg px-8 py-6 h-auto transition-all transform hover:scale-105"
                                    onClick={() => navigate('/cadastro-atleta')}
                                >
                                    Inscreva-se Agora
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="order-1 md:order-2 flex items-center justify-center">
                            <img
                                src="/copa-pe-vermelho-hero.jpg"
                                alt="Copa Pé Vermelho de Rugby"
                                className="w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-rugby-black container px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Sobre o <span className="text-rugby-red">Campeonato</span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            A Copa Pé Vermelho é mais do que um torneio, é a celebração do rugby no interior.
                            Este campeonato foi pensado para juntar a galera, equilibrar os times e garantir jogos bons do começo ao fim.
                            A inscrição é individual, ou seja: cada atleta se inscreve por conta própria, independente do clube/time de origem.
                        </p>

                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h4 className="text-white font-bold text-lg mb-2">Formato do Torneio</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>3 ou 4 times (dependendo do número de inscritos)</li>
                                    <li>Formato 10-a-side (10 jogadores por equipe)</li>
                                    <li>Partidas com 2 tempos de 15 minutos</li>
                                    <li>Modelo todos contra todos</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-2">Inscrição Individual</h4>
                                <p>
                                    Não existe "time inscrito". O campeonato é montado a partir dos atletas inscritos para:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 mt-1">
                                    <li>Misturar jogadores de diferentes origens</li>
                                    <li>Equilibrar força dos times</li>
                                    <li>Deixar o evento mais justo e competitivo</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-2">Montagem dos Times: Escolha do Capitão</h4>
                                <p>
                                    No dia do campeonato, os times serão formados através de uma <strong>Escolha do Capitão</strong>.
                                    Serão definidos capitães que selecionarão os atletas por rodadas, montando suas equipes com base nas posições
                                    para garantir equilíbrio.
                                </p>
                                <p className="mt-2 text-sm italic text-gray-400 border-l-2 border-rugby-red pl-3">
                                    A Escolha do Capitão é um sistema onde os líderes de cada time selecionam seus jogadores um a um dentre todos os inscritos, similar ao "draft" de ligas americanas ou a famosa "pelada" de rua, garantindo que as panelas sejam quebradas e o nível técnico seja distribuído.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-bold text-lg mb-2">Regras de Equilíbrio</h4>
                                <p>
                                    Para evitar desbalanceamento, cada equipe deverá respeitar um mínimo obrigatório de atletas por posição (ex: mínimo de 5 primeiras linhas por time).
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-rugby-red rounded-full"></div>
                                <span>Disputa na modalidade XV</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-rugby-red rounded-full"></div>
                                <span>Categorias Masculino e Feminino</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-rugby-red rounded-full"></div>
                                <span>Terceiro tempo tradicional após os jogos</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer Logos */}
            <footer className="py-12 bg-rugby-black border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest font-semibold text-center">Parceiros & Clubes</p>
                    <div className="flex justify-center items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                        <img
                            src="/logos-footer.png"
                            alt="Logos Parceiros"
                            className="max-w-full h-auto max-h-32"
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CopaPeVermelho;
