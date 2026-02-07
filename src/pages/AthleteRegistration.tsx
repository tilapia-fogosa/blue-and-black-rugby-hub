import AthleteRegistrationForm from '@/components/AthleteRegistrationForm';

const AthleteRegistration = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-rugby-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Cadastro de Atleta
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Preencha o formulário abaixo para realizar seu cadastro oficial no Pé Vermelho Rugby.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mb-10 space-y-6">
                    <div className="bg-rugby-black/40 border-l-4 border-rugby-red p-6 backdrop-blur-sm shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="bg-rugby-red w-2 h-6 inline-block"></span>
                            Regras para Inscrição
                        </h2>

                        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            <p>
                                As inscrições têm um valor de <strong className="text-white">R$ 20,00</strong> por atleta para arcar com custos de alimentação, arbitragem e estrutura do torneio.
                            </p>

                            <div className="bg-white/5 p-4 rounded-md border border-white/10">
                                <p className="text-sm font-semibold text-rugby-red mb-2 uppercase tracking-wider">Dados para Pagamento (PIX)</p>
                                <p className="text-lg font-mono text-white select-all">CNPJ: 00.000.000/0000-00</p>
                                <p className="text-xs text-gray-500 mt-1">Conta: Pé Vermelho Rugby</p>
                            </div>

                            <ul className="space-y-2 list-disc list-inside text-sm">
                                <li>O pagamento é feito via <strong className="text-white">PIX</strong> para a conta do Pé Vermelho.</li>
                                <li>O comprovante deve ser anexado no final do formulário de cadastro.</li>
                                <li>Seu cadastro será aprovado por um membro da comissão do torneio.</li>
                                <li>A confirmação será enviada para o atleta via <strong className="text-white">e-mail</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <AthleteRegistrationForm />

                {/* Footer Logos */}
                <div className="mt-20 pt-12 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest font-semibold">Parceiros & Clubes</p>
                    <div className="flex justify-center items-center opacity-80">
                        <img
                            src="/logos-footer.png"
                            alt="Logos Parceiros"
                            className="max-w-full h-auto max-h-32"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteRegistration;
