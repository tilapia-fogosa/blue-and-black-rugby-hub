
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Plus, Save } from 'lucide-react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('gallery');

  // Mock data - in a real app, this would come from a database
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, title: 'Time em ação', category: 'Jogos', url: 'https://example.com/image1.jpg' },
    { id: 2, title: 'Treinamento', category: 'Treinos', url: 'https://example.com/image2.jpg' },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'Campeonato Regional', date: '2024-08-15', location: 'Estádio Municipal', type: 'Jogo' },
    { id: 2, title: 'Treino Aberto', date: '2024-08-20', location: 'Campo de Treino', type: 'Treino' },
  ]);

  const [athletes, setAthletes] = useState([
    { id: 1, name: 'Carlos Silva', position: 'Capitão - Centro', achievements: '3x Campeão Nacional' },
    { id: 2, name: 'Roberto Santos', position: 'Pilar - Forward', achievements: 'Campeão Sul-Americano' },
  ]);

  const [historyItems, setHistoryItems] = useState([
    { id: 1, year: '1985', title: 'Fundação do Clube', description: 'Eagles Rugby Club foi fundado...' },
    { id: 2, year: '1992', title: 'Primeiro Campeonato', description: 'Conquistamos nosso primeiro título...' },
  ]);

  return (
    <div className="min-h-screen bg-rugby-cream">
      {/* Header */}
      <div className="bg-rugby-black text-rugby-cream p-6">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/3ccbf6a2-80d3-4f25-8554-4182b7193971.png" 
              alt="Maringa Rugby Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-rugby-red">Maringa Rugby Club</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-rugby-gray/30">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">Galeria</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">Eventos</TabsTrigger>
            <TabsTrigger value="athletes" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">Atletas</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">História</TabsTrigger>
          </TabsList>

          {/* Galeria */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="border-rugby-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-rugby-black">
                  Gerenciar Galeria
                  <Button className="bg-rugby-red hover:bg-rugby-red/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Foto
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-rugby-gray/30">
                      <TableHead className="text-rugby-black">Título</TableHead>
                      <TableHead className="text-rugby-black">Categoria</TableHead>
                      <TableHead className="text-rugby-black">URL</TableHead>
                      <TableHead className="text-rugby-black">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {galleryItems.map((item) => (
                      <TableRow key={item.id} className="border-rugby-gray/30">
                        <TableCell className="text-rugby-black">{item.title}</TableCell>
                        <TableCell className="text-rugby-black">{item.category}</TableCell>
                        <TableCell className="max-w-xs truncate text-rugby-black">{item.url}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-rugby-gray hover:bg-rugby-gray/20">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-rugby-red hover:bg-rugby-red/90">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eventos */}
          <TabsContent value="events" className="space-y-6">
            <Card className="border-rugby-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-rugby-black">
                  Gerenciar Eventos
                  <Button className="bg-rugby-red hover:bg-rugby-red/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-rugby-gray/30">
                      <TableHead className="text-rugby-black">Título</TableHead>
                      <TableHead className="text-rugby-black">Data</TableHead>
                      <TableHead className="text-rugby-black">Local</TableHead>
                      <TableHead className="text-rugby-black">Tipo</TableHead>
                      <TableHead className="text-rugby-black">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id} className="border-rugby-gray/30">
                        <TableCell className="text-rugby-black">{event.title}</TableCell>
                        <TableCell className="text-rugby-black">{event.date}</TableCell>
                        <TableCell className="text-rugby-black">{event.location}</TableCell>
                        <TableCell className="text-rugby-black">{event.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-rugby-gray hover:bg-rugby-gray/20">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-rugby-red hover:bg-rugby-red/90">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Atletas */}
          <TabsContent value="athletes" className="space-y-6">
            <Card className="border-rugby-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-rugby-black">
                  Gerenciar Atletas
                  <Button className="bg-rugby-red hover:bg-rugby-red/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Atleta
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-rugby-gray/30">
                      <TableHead className="text-rugby-black">Nome</TableHead>
                      <TableHead className="text-rugby-black">Posição</TableHead>
                      <TableHead className="text-rugby-black">Conquistas</TableHead>
                      <TableHead className="text-rugby-black">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {athletes.map((athlete) => (
                      <TableRow key={athlete.id} className="border-rugby-gray/30">
                        <TableCell className="text-rugby-black">{athlete.name}</TableCell>
                        <TableCell className="text-rugby-black">{athlete.position}</TableCell>
                        <TableCell className="max-w-xs truncate text-rugby-black">{athlete.achievements}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-rugby-gray hover:bg-rugby-gray/20">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-rugby-red hover:bg-rugby-red/90">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* História */}
          <TabsContent value="history" className="space-y-6">
            <Card className="border-rugby-gray/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-rugby-black">
                  Gerenciar História
                  <Button className="bg-rugby-red hover:bg-rugby-red/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Marco
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-rugby-gray/30">
                      <TableHead className="text-rugby-black">Ano</TableHead>
                      <TableHead className="text-rugby-black">Título</TableHead>
                      <TableHead className="text-rugby-black">Descrição</TableHead>
                      <TableHead className="text-rugby-black">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.map((item) => (
                      <TableRow key={item.id} className="border-rugby-gray/30">
                        <TableCell className="text-rugby-black">{item.year}</TableCell>
                        <TableCell className="text-rugby-black">{item.title}</TableCell>
                        <TableCell className="max-w-xs truncate text-rugby-black">{item.description}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-rugby-gray hover:bg-rugby-gray/20">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-rugby-red hover:bg-rugby-red/90">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
