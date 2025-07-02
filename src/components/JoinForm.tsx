
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    position: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Inscrição Enviada!",
      description: "Entraremos em contato em breve para agendar uma avaliação.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      experience: '',
      position: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="join" className="py-20 bg-gradient-to-br from-rugby-blue-dark to-rugby-blue-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Junte-se ao Eagles
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Faça parte da nossa família e construa uma história de sucesso conosco
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-rugby-blue-dark text-center">
                Formulário de Inscrição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-rugby-blue-dark font-semibold">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-rugby-blue-dark font-semibold">
                      Idade *
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Sua idade"
                      min="16"
                      max="50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-rugby-blue-dark font-semibold">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-rugby-blue-dark font-semibold">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-rugby-blue-dark font-semibold">
                      Experiência no Rugby
                    </Label>
                    <Select onValueChange={(value) => handleChange('experience', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione sua experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="profissional">Profissional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-rugby-blue-dark font-semibold">
                      Posição Preferida
                    </Label>
                    <Select onValueChange={(value) => handleChange('position', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma posição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pilar">Pilar</SelectItem>
                        <SelectItem value="talonador">Talonador</SelectItem>
                        <SelectItem value="segunda-linha">Segunda Linha</SelectItem>
                        <SelectItem value="terceira-linha">Terceira Linha</SelectItem>
                        <SelectItem value="meio-scrum">Meio-Scrum</SelectItem>
                        <SelectItem value="abertura">Abertura</SelectItem>
                        <SelectItem value="centro">Centro</SelectItem>
                        <SelectItem value="asa">Asa</SelectItem>
                        <SelectItem value="zagueiro">Zagueiro</SelectItem>
                        <SelectItem value="nao-sei">Não sei ainda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-rugby-blue-dark font-semibold">
                    Conte-nos sobre você
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="mt-1"
                    placeholder="Por que você quer fazer parte do Eagles Rugby? Conte sobre sua motivação, objetivos e experiência esportiva..."
                    rows={4}
                  />
                </div>

                <div className="text-center pt-4">
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white px-12 py-4 text-lg font-semibold"
                  >
                    Enviar Inscrição
                  </Button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-4">
                  * Campos obrigatórios. Seus dados serão mantidos em sigilo e utilizados apenas para contato.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
