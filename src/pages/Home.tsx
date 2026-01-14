import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rugby-black via-rugby-black to-rugby-red/20"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-rugby-cream rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-rugby-cream rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-rugby-cream rounded-full"></div>
      </div>

      <div className="relative z-10 text-center text-rugby-cream px-4 max-w-4xl mx-auto animate-fade-in">
        {/* Logo grande */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/3ccbf6a2-80d3-4f25-8554-4182b7193971.png" 
            alt="Maringa Rugby Logo" 
            className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain mx-auto drop-shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          MARINGA
          <span className="block text-rugby-red font-black drop-shadow-lg">RUGBY CLUB</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-rugby-gray max-w-2xl mx-auto leading-relaxed">
          Força, tradição e espírito de equipe. Junte-se à família Maringa Rugby e faça parte da nossa história.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-rugby-red hover:bg-rugby-red/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
            <Link to="/join">Junte-se ao Time</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2 border-rugby-cream text-rugby-cream hover:bg-rugby-cream hover:text-rugby-black px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
            <Link to="/gallery">Ver Galeria</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
