
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Image, Trophy, Clock, Handshake } from 'lucide-react';
import EventsAdmin from '@/components/admin/EventsAdmin';
import AthletesAdmin from '@/components/admin/AthletesAdmin';
import GalleriesAdmin from '@/components/admin/GalleriesAdmin';
import SponsorsAdmin from '@/components/admin/SponsorsAdmin';
import HistoryAdmin from '@/components/admin/HistoryAdmin';
import { CopaAdmin } from "@/components/admin/CopaAdmin";

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rugby-cream via-white to-rugby-cream/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rugby-black via-rugby-blue-dark to-rugby-black text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-gray-200 shadow-inner rounded-xl p-1 gap-1 h-auto">
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
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
