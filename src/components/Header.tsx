
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Galeria', path: '/gallery' },
    { label: 'Eventos', path: '/events' },
    { label: 'História', path: '/history' },
    { label: 'Atletas', path: '/athletes' },
    { label: 'Patrocinadores', path: '/sponsors' },
    { label: 'Loja', path: '/shop' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rugby-blue-dark/95 backdrop-blur-sm border-b border-rugby-blue-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/a1c2761f-e2d9-48db-a3bb-2ffe727deb81.png" 
              alt="Maringa Rugby Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-bold text-white">Maringa Rugby</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path) 
                    ? 'text-rugby-blue-primary font-semibold' 
                    : 'text-white hover:text-rugby-blue-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white">
              <Link to="/join">Inscreva-se</Link>
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 transition-colors ${
                    isActive(item.path)
                      ? 'text-rugby-blue-primary font-semibold bg-rugby-blue-primary/20'
                      : 'text-white hover:bg-rugby-blue-primary/20'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mx-4 mt-2 bg-rugby-blue-primary hover:bg-rugby-blue-primary/90 text-white w-full">
                <Link to="/join" onClick={() => setIsMenuOpen(false)}>Inscreva-se</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
