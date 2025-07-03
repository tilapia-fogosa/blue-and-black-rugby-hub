
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-rugby-blue-dark text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/a1c2761f-e2d9-48db-a3bb-2ffe727deb81.png" 
              alt="Maringa Rugby Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold">Painel Administrativo</h1>
              <p className="text-rugby-blue-primary">Maringa Rugby Club</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="athletes">Atletas</TabsTrigger>
            <TabsTrigger value="history">História</TabsTrigger>
          </TabsList>

          {/* Galeria */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gerenciar Galeria
                  <Button className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Foto
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {galleryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.url}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gerenciar Eventos
                  <Button className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gerenciar Atletas
                  <Button className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Atleta
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Posição</TableHead>
                      <TableHead>Conquistas</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {athletes.map((athlete) => (
                      <TableRow key={athlete.id}>
                        <TableCell>{athlete.name}</TableCell>
                        <TableCell>{athlete.position}</TableCell>
                        <TableCell className="max-w-xs truncate">{athlete.achievements}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gerenciar História
                  <Button className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Marco
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ano</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.year}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
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
