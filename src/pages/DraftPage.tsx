import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DraftBoard } from '@/components/draft/DraftBoard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute'; // Ensure authentication

const DraftPage = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('Masc');

    return (
        <div className="min-h-screen bg-rugby-black p-4 md:p-6 font-primary text-white bg-[url('/subtle-pattern.png')]">
            <div className="max-w-[1800px] mx-auto h-full flex flex-col">
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
                </div>

                <Tabs value={category} onValueChange={setCategory} className="flex-1 flex flex-col">
                    <TabsList className="bg-white/5 border border-white/10 w-fit mb-4">
                        <TabsTrigger value="Masc" className="data-[state=active]:bg-rugby-blue-dark">Adulto Masculino</TabsTrigger>
                        <TabsTrigger value="Feminino" className="data-[state=active]:bg-rugby-red">Feminino</TabsTrigger>
                        <TabsTrigger value="Juvenil Masc" className="data-[state=active]:bg-green-600">Juvenil Masculino</TabsTrigger>
                    </TabsList>

                    <TabsContent value="Masc" className="flex-1 mt-0">
                        <DraftBoard categoryFilter="Masc" />
                    </TabsContent>
                    <TabsContent value="Feminino" className="flex-1 mt-0">
                        <DraftBoard categoryFilter="Feminino" />
                    </TabsContent>
                    <TabsContent value="Juvenil Masc" className="flex-1 mt-0">
                        <DraftBoard categoryFilter="Juvenil Masc" />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DraftPage;
