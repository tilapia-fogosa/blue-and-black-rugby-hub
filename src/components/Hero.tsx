
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rugby-blue-dark via-rugby-blue-primary to-rugby-blue-dark"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          PÉ VERMELHO
          <span className="block text-rugby-blue-primary">RUGBY</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Força, tradição e espírito de equipe. Junte-se à família Pé Vermelho Rugby e faça parte da nossa história.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('join')}
            className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200"
          >
            Junte-se ao Time
          </Button>
          <Button 
            onClick={() => scrollToSection('gallery')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-rugby-blue-dark px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200"
          >
            Ver Galeria
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
