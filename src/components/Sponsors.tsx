
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Sponsors = () => {
  const sponsors = [
    { id: 1, name: "SportTech", category: "Equipamentos Esportivos" },
    { id: 2, name: "FitNutrition", category: "Suplementos" },
    { id: 3, name: "Banco Regional", category: "Serviços Financeiros" },
    { id: 4, name: "Clínica Vida", category: "Saúde e Medicina Esportiva" },
  ];

  const benefits = [
    {
      tier: "Patrocinador Principal",
      price: "R$ 50.000/ano",
      benefits: [
        "Logo na camisa oficial do time",
        "Naming rights do estádio",
        "Presença em todos os materiais de marketing",
        "Camarote VIP para jogos",
        "Eventos exclusivos com atletas"
      ]
    },
    {
      tier: "Patrocinador Premium",
      price: "R$ 25.000/ano",
      benefits: [
        "Logo no uniforme de treino",
        "Presença no site oficial",
        "Ingressos para jogos importantes",
        "Menção em redes sociais",
        "Participação em eventos do clube"
      ]
    },
    {
      tier: "Apoiador",
      price: "R$ 10.000/ano",
      benefits: [
        "Logo no material promocional",
        "Presença no site",
        "Ingressos para jogos",
        "Newsletter mensal",
        "Certificado de apoio"
      ]
    }
  ];

  return (
    <section id="sponsors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Nossos Patrocinadores
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Empresas que acreditam no nosso projeto e fazem parte da nossa família
          </p>
        </div>

        {/* Current Sponsors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-rugby-blue-dark mb-8">
            Parceiros Atuais
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rugby-blue-primary to-rugby-blue-dark rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {sponsor.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-bold text-rugby-blue-dark">{sponsor.name}</h4>
                  <p className="text-sm text-gray-600">{sponsor.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sponsorship Plans */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-rugby-blue-dark mb-8">
            Seja um Patrocinador
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Junte-se a nós e faça parte de uma história de sucesso. Oferecemos diversas modalidades de patrocínio que se adequam ao seu negócio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((plan, index) => (
              <Card 
                key={plan.tier}
                className={`relative ${
                  index === 1 ? 'ring-2 ring-rugby-blue-primary transform scale-105' : ''
                } hover:shadow-xl transition-all duration-300`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-rugby-blue-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-rugby-blue-dark mb-2">{plan.tier}</h4>
                  <p className="text-2xl font-bold text-rugby-blue-primary mb-4">{plan.price}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      index === 1 
                        ? 'bg-rugby-blue-primary hover:bg-rugby-blue-primary/90' 
                        : 'bg-rugby-blue-dark hover:bg-rugby-blue-dark/90'
                    } text-white`}
                  >
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white px-8 py-4 text-lg"
            >
              Entre em Contato
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
