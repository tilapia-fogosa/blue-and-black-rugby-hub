
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const Athletes = () => {
  const notableAthletes = [
    {
      id: 1,
      name: "Carlos Silva",
      position: "Capitão - Centro",
      achievements: "3x Campeão Nacional, Seleção Brasileira",
      years: "2010-2024",
      description: "Líder exemplar e um dos maiores pontuadores da história do clube."
    },
    {
      id: 2,
      name: "Roberto Santos",
      position: "Pilar - Forward",
      achievements: "Campeão Sul-Americano, Melhor Jogador 2018",
      years: "2015-2023",
      description: "Força imparável no scrum e referência técnica na posição."
    },
    {
      id: 3,
      name: "Miguel Torres",
      position: "Meio-Scrum",
      achievements: "2x Campeão Regional, Artilheiro 2020",
      years: "2018-2024",
      description: "Estrategista do time com visão de jogo excepcional."
    },
    {
      id: 4,
      name: "André Costa",
      position: "Asa - Back",
      achievements: "Velocista do Ano, Seleção Juvenil",
      years: "2020-2024",
      description: "Jovem promessa com velocidade e agilidade impressionantes."
    }
  ];

  return (
    <section id="athletes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Atletas Notáveis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os heróis que marcaram a história do Eagles Rugby
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notableAthletes.map((athlete) => (
            <Card 
              key={athlete.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rugby-blue-primary to-rugby-blue-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-rugby-blue-dark mb-2">
                  {athlete.name}
                </h3>
                
                <p className="text-rugby-blue-primary font-semibold mb-2">
                  {athlete.position}
                </p>
                
                <p className="text-sm text-gray-600 mb-3">
                  {athlete.years}
                </p>
                
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm font-semibold text-rugby-blue-dark mb-2">
                    Conquistas:
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    {athlete.achievements}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {athlete.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Athletes;
