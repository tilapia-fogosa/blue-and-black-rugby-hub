
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Athlete } from '@/integrations/supabase/types';

const Athletes = () => {
  const { data: athletes, isLoading } = useQuery({
    queryKey: ['athletes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('athletes')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Athlete[];
    },
  });

  if (isLoading) {
    return (
      <section id="athletes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Carregando atletas...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="athletes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rugby-blue-dark mb-4">
            Atletas Notáveis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os heróis que marcaram a história do Pé Vermelho Rugby
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {athletes?.map((athlete) => (
            <Card
              key={athlete.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-0 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rugby-blue-primary to-rugby-blue-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  {athlete.photo_url ? (
                    <img src={athlete.photo_url} alt={athlete.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
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
          {athletes?.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              <p>Nenhum atleta encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Athletes;
