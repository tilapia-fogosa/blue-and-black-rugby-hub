
import { Card, CardContent } from '@/components/ui/card';

const History = () => {
  const milestones = [
    {
      year: "1985",
      title: "Fundação do Clube",
      description: "Eagles Rugby Club foi fundado por um grupo de entusiastas do rugby, com o objetivo de promover o esporte na região."
    },
    {
      year: "1992",
      title: "Primeiro Campeonato",
      description: "Conquistamos nosso primeiro título regional, marcando o início de uma trajetória vitoriosa."
    },
    {
      year: "2001",
      title: "Nova Sede",
      description: "Inauguração de nossa sede própria com campo oficial e instalações modernas para treinamento."
    },
    {
      year: "2010",
      title: "Campeonato Nacional",
      description: "Histórica conquista do campeonato nacional, elevando o clube ao patamar de elite do rugby brasileiro."
    },
    {
      year: "2018",
      title: "Centro de Formação",
      description: "Criação do centro de formação de novos talentos, investindo no futuro do rugby."
    },
    {
      year: "2023",
      title: "40 Anos de Tradição",
      description: "Celebramos quase quatro décadas de história, com mais de 15 títulos conquistados."
    }
  ];

  return (
    <section id="history" className="py-20 bg-gradient-to-br from-rugby-blue-dark to-rugby-blue-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossa História
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Décadas de tradição, paixão e conquistas no rugby
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/30 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 z-10 ${
                    index % 2 === 0 ? 'md:translate-x-1/2' : 'md:-translate-x-1/2'
                  }`}></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white animate-fade-in">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl font-bold text-rugby-blue-primary bg-white px-3 py-1 rounded-lg">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                        <p className="text-gray-200 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
