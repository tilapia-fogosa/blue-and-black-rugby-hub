
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Campeonato Regional",
      date: "2024-08-15",
      time: "14:00",
      location: "Estádio Municipal",
      type: "Jogo",
      opponent: "Lions RFC"
    },
    {
      id: 2,
      title: "Treino Aberto",
      date: "2024-08-20",
      time: "18:00",
      location: "Campo de Treino",
      type: "Treino",
      description: "Venha conhecer nosso time"
    },
    {
      id: 3,
      title: "Final do Campeonato",
      date: "2024-09-01",
      time: "16:00",
      location: "Arena Central",
      type: "Final",
      opponent: "Wolves United"
    },
    {
      id: 4,
      title: "Evento de Arrecadação",
      date: "2024-09-10",
      time: "19:00",
      location: "Clube Social",
      type: "Social",
      description: "Jantar beneficente"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Jogo':
        return 'border-l-rugby-blue-primary bg-rugby-blue-primary/5';
      case 'Final':
        return 'border-l-red-500 bg-red-50';
      case 'Treino':
        return 'border-l-green-500 bg-green-50';
      case 'Social':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Próximos Eventos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Não perca nenhum momento importante do nosso calendário
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {events.map((event) => (
              <Card 
                key={event.id}
                className={`border-l-4 ${getEventColor(event.type)} hover:shadow-lg transition-shadow duration-300`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-rugby-blue-dark mb-2">
                        {event.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(event.date)} às {event.time}</span>
                      </div>
                      <p className="text-gray-500">{event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'Jogo' ? 'bg-rugby-blue-primary text-white' :
                      event.type === 'Final' ? 'bg-red-500 text-white' :
                      event.type === 'Treino' ? 'bg-green-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.opponent && (
                    <p className="text-rugby-blue-dark font-semibold">
                      vs {event.opponent}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-gray-600 mt-2">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
