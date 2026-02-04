
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { RegistrationForm } from '@/components/taca/RegistrationForm';

const TacaPeVermelho = () => {
    return (
        <div className="min-h-screen bg-rugby-black">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background - placeholder until we upload a real image */}
                <div className="absolute inset-0 bg-gradient-to-br from-rugby-red/80 via-rugby-black/90 to-rugby-black z-0"></div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="animate-fade-in space-y-6">
                        <span className="inline-block px-4 py-1 bg-rugby-red/20 border border-rugby-red rounded-full text-rugby-cream text-sm font-semibold tracking-wider mb-4">
                            TEMPADA 2024
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                            TAÇA <span className="text-rugby-red">PÉ VERMELHO</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                            O maior campeonato de rugby do interior. Mostre sua força, garra e paixão pelo esporte.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-6 pt-8">
                            <div className="flex items-center gap-2 text-white">
                                <Calendar className="w-6 h-6 text-rugby-red" />
                                <span>15 de Agosto</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <MapPin className="w-6 h-6 text-rugby-red" />
                                <span>Estádio Municipal</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Trophy className="w-6 h-6 text-rugby-red" />
                                <span>Premiação Exclusiva</span>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button
                                size="lg"
                                className="bg-rugby-red hover:bg-rugby-red/90 text-white text-lg px-8 py-6 h-auto transition-all transform hover:scale-105"
                                onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Inscreva-se Agora
                            </Button>
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
                            A Taça Pé Vermelho é mais do que um torneio, é a celebração do rugby no interior.
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

                    <div className="bg-rugby-blue-dark/30 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">Premiação</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-yellow-500/20 rounded-lg">
                                    <Trophy className="w-8 h-8 text-yellow-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">1º Lugar</h4>
                                    <p className="text-gray-400">Troféu Taça Pé Vermelho + Medalhas de Ouro + Kit de Equipamentos</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-400/20 rounded-lg">
                                    <Trophy className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">2º Lugar</h4>
                                    <p className="text-gray-400">Medalhas de Prata + Troféu de Vice-Campeão</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-700/20 rounded-lg">
                                    <Trophy className="w-8 h-8 text-orange-700" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">3º Lugar</h4>
                                    <p className="text-gray-400">Medalhas de Bronze</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="inscricao" className="py-20 bg-rugby-blue-dark/10">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Inscrição de Atleta</h2>
                        <p className="text-gray-300">Garanta sua vaga no time para a Taça Pé Vermelho.</p>
                    </div>
                    {/* Form will go here */}
                    <div className="max-w-2xl mx-auto bg-rugby-black/50 p-8 rounded-2xl border border-white/10">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TacaPeVermelho;
