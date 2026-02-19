
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Image, Trophy, Clock, Handshake, LogOut, BarChart } from 'lucide-react';
import EventsAdmin from '@/components/admin/EventsAdmin';
import AthletesAdmin from '@/components/admin/AthletesAdmin';
import GalleriesAdmin from '@/components/admin/GalleriesAdmin';
import SponsorsAdmin from '@/components/admin/SponsorsAdmin';
import HistoryAdmin from '@/components/admin/HistoryAdmin';
import { CopaAdmin } from "@/components/admin/CopaAdmin";
import { CopaStatistics } from "@/components/admin/CopaStatistics";
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logout realizado com sucesso',
        description: 'Você foi desconectado do painel administrativo.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Erro ao fazer logout',
        description: 'Ocorreu um erro ao tentar sair.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rugby-cream via-white to-rugby-cream/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rugby-black via-rugby-blue-dark to-rugby-black text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-rugby-red rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-rugby-cream bg-clip-text text-transparent">
                  Painel Administrativo
                </h1>
                <p className="text-rugby-red font-semibold text-lg">Pé Vermelho Rugby</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin/draft')}
                className="bg-rugby-red hover:bg-rugby-red/90 text-white font-bold shadow-lg transition-transform hover:scale-105"
              >
                <Users className="w-4 h-4 mr-2" />
                Draft de Times
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-transparent border-rugby-red text-rugby-red hover:bg-rugby-red hover:text-white transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-gray-200 shadow-inner rounded-xl p-1 gap-1 h-auto">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-rugby-blue-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            <TabsTrigger
              value="athletes"
              className="data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-rugby-blue-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Atletas</span>
            </TabsTrigger>
            <TabsTrigger
              value="galleries"
              className="data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-rugby-blue-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Galerias</span>
            </TabsTrigger>
            <TabsTrigger
              value="sponsors"
              className="data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-rugby-blue-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Handshake className="w-4 h-4" />
              <span className="hidden sm:inline">Parceiros</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-rugby-blue-dark data-[state=active]:text-white text-rugby-blue-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">História</span>
            </TabsTrigger>
            <TabsTrigger
              value="copa"
              className="data-[state=active]:bg-rugby-red data-[state=active]:text-white text-rugby-red font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Copa Pé Vermelho</span>
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-rugby-red data-[state=active]:text-white text-rugby-red font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 py-3"
            >
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">Totalizadores</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6 animate-fade-in">
            <EventsAdmin />
          </TabsContent>

          <TabsContent value="athletes" className="mt-6 animate-fade-in">
            <AthletesAdmin />
          </TabsContent>

          <TabsContent value="galleries" className="mt-6 animate-fade-in">
            <GalleriesAdmin />
          </TabsContent>

          <TabsContent value="sponsors" className="mt-6 animate-fade-in">
            <SponsorsAdmin />
          </TabsContent>

          <TabsContent value="history" className="mt-6 animate-fade-in">
            <HistoryAdmin />
          </TabsContent>

          <TabsContent value="copa" className="mt-6 animate-fade-in">
            <CopaAdmin />
          </TabsContent>

          <TabsContent value="statistics" className="mt-6 animate-fade-in">
            <CopaStatistics />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
};

export default Admin;
