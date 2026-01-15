
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HistoryMilestone } from '@/integrations/supabase/types';

const History = () => {
  const { data: milestones, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .order('year', { ascending: true });

      if (error) throw error;
      return data as HistoryMilestone[];
    },
  });

  if (isLoading) {
    return (
      <section id="history" className="py-20 bg-gradient-to-br from-rugby-blue-dark to-rugby-blue-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <p>Carregando história...</p>
        </div>
      </section>
    );
  }

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
              {milestones?.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 z-10 ${index % 2 === 0 ? 'md:translate-x-1/2' : 'md:-translate-x-1/2'
                    }`}></div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
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
              {milestones?.length === 0 && (
                <div className="text-center text-white">
                  <p>Nenhum marco histórico encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
