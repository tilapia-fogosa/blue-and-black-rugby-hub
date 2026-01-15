
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Event } from '@/integrations/supabase/types';

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Adjust for timezone offset if necessary, or treat as UTC
    // For simplicity, we'll assume the date string is YYYY-MM-DD
    // and we want to display it correctly in local time or just parse the components
    const [year, month, day] = dateString.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);

    return localDate.toLocaleDateString('pt-BR', {
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

  if (isLoading) {
    return (
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p>Carregando eventos...</p>
        </div>
      </section>
    );
  }

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
            {events?.map((event) => (
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
                        <span>{formatDate(event.date)} {event.time ? `às ${event.time.slice(0, 5)}` : ''}</span>
                      </div>
                      <p className="text-gray-500">{event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.type === 'Jogo' ? 'bg-rugby-blue-primary text-white' :
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
            {events?.length === 0 && (
              <p className="text-center text-gray-500">Nenhum evento agendado no momento.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
