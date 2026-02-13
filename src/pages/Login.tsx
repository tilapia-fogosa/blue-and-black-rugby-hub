import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                toast({
                    title: 'Login realizado com sucesso!',
                    description: 'Bem-vindo ao painel administrativo.',
                });
                navigate('/admin');
            }
        } catch (error: any) {
            toast({
                title: 'Erro ao fazer login',
                description: error.message || 'Credenciais inválidas. Tente novamente.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rugby-black via-rugby-blue-dark to-rugby-black flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-rugby-red/20">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto w-16 h-16 bg-rugby-red rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rugby-red to-rugby-blue-dark bg-clip-text text-transparent">
                            Painel Administrativo
                        </CardTitle>
                        <CardDescription className="text-lg text-rugby-blue-dark font-semibold mt-2">
                            Pé Vermelho Rugby
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-rugby-black font-semibold">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="border-rugby-blue-dark/30 focus:border-rugby-red"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-rugby-black font-semibold">
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="border-rugby-blue-dark/30 focus:border-rugby-red"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rugby-red to-rugby-blue-dark hover:from-rugby-red/90 hover:to-rugby-blue-dark/90 text-white font-bold py-6 shadow-lg transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
