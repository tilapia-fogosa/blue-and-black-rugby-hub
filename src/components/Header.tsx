
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
    { label: 'Taça Pé Vermelho', path: '/taca-pe-vermelho' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-rugby-black/95 backdrop-blur-sm border-b border-rugby-red/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/3ccbf6a2-80d3-4f25-8554-4182b7193971.png"
              alt="Pé Vermelho Rugby Logo"
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-xl font-bold text-rugby-cream">Pé Vermelho Rugby</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${isActive(item.path)
                    ? 'text-rugby-red font-semibold'
                    : 'text-rugby-cream hover:text-rugby-red'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-rugby-red hover:bg-rugby-red/90 text-white">
              <Link to="/join">Inscreva-se</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-rugby-cream"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-rugby-black border-t border-rugby-red/20">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 transition-colors ${isActive(item.path)
                      ? 'text-rugby-red font-semibold bg-rugby-red/20'
                      : 'text-rugby-cream hover:bg-rugby-red/20'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mx-4 mt-2 bg-rugby-red hover:bg-rugby-red/90 text-white w-full">
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
