import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DraftBoard } from '@/components/draft/DraftBoard';
import { CompleteTeamsView } from '@/components/draft/CompleteTeamsView';
import { TeamListView } from '@/components/draft/TeamListView';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, LayoutDashboard, List, LayoutGrid } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute'; // Ensure authentication

const DraftPage = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('Masc');
    const [viewMode, setViewMode] = useState<'board' | 'complete' | 'list'>('board');

    const renderView = () => {
        if (viewMode === 'board') return <DraftBoard categoryFilter={category} />;
        if (viewMode === 'complete') return <CompleteTeamsView categoryFilter={category} />;
        if (viewMode === 'list') return <TeamListView categoryFilter={category} />;
    };

    return (
        <div className="min-h-screen bg-rugby-black p-4 md:p-6 font-primary text-white bg-[url('/subtle-pattern.png')] flex flex-col">
            <div className="max-w-[1800px] w-full mx-auto flex-1 flex flex-col min-h-0">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin')}
                            className="text-white border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                        </Button>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <div className="p-2 bg-rugby-red rounded-lg">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            Draft de Jogadores
                        </h1>
                    </div>

                    {/* View Switcher */}
                    <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('board')}
                            className={`${viewMode === 'board' ? 'bg-rugby-red text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                        >
                            <LayoutDashboard className="w-4 h-4 mr-2" /> Board
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('complete')}
                            className={`${viewMode === 'complete' ? 'bg-rugby-red text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                        >
                            <LayoutGrid className="w-4 h-4 mr-2" /> Completo
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className={`${viewMode === 'list' ? 'bg-rugby-red text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                        >
                            <List className="w-4 h-4 mr-2" /> Listas
                        </Button>
                    </div>
                </div>

                <Tabs value={category} onValueChange={setCategory} className="flex-1 flex flex-col min-h-0">
                    <TabsList className="bg-white/5 border border-white/10 w-fit mb-4">
                        <TabsTrigger value="Masc" className="data-[state=active]:bg-rugby-blue-dark">Adulto Masculino</TabsTrigger>
                        <TabsTrigger value="Feminino" className="data-[state=active]:bg-rugby-red">Feminino</TabsTrigger>
                        <TabsTrigger value="Juvenil Masc" className="data-[state=active]:bg-green-600">Juvenil Masculino</TabsTrigger>
                    </TabsList>

                    <div className="flex-1 flex flex-col min-h-0 relative">
                        {renderView()}
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default DraftPage;
