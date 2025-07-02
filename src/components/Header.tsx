
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rugby-blue-dark/95 backdrop-blur-sm border-b border-rugby-blue-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/a1c2761f-e2d9-48db-a3bb-2ffe727deb81.png" 
              alt="Rugby Team Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-bold text-white">Eagles Rugby</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Eventos
            </button>
            <button 
              onClick={() => scrollToSection('history')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              História
            </button>
            <button 
              onClick={() => scrollToSection('athletes')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Atletas
            </button>
            <button 
              onClick={() => scrollToSection('sponsors')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Patrocinadores
            </button>
            <button 
              onClick={() => scrollToSection('shop')}
              className="text-white hover:text-rugby-blue-primary transition-colors"
            >
              Loja
            </button>
            <Button 
              onClick={() => scrollToSection('join')}
              className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white"
            >
              Inscreva-se
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-rugby-blue-dark border-t border-rugby-blue-primary/20">
            <div className="py-4 space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Galeria
              </button>
              <button 
                onClick={() => scrollToSection('events')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Eventos
              </button>
              <button 
                onClick={() => scrollToSection('history')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                História
              </button>
              <button 
                onClick={() => scrollToSection('athletes')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Atletas
              </button>
              <button 
                onClick={() => scrollToSection('sponsors')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Patrocinadores
              </button>
              <button 
                onClick={() => scrollToSection('shop')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-rugby-blue-primary/20"
              >
                Loja
              </button>
              <Button 
                onClick={() => scrollToSection('join')}
                className="mx-4 mt-2 bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white w-full"
              >
                Inscreva-se
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
