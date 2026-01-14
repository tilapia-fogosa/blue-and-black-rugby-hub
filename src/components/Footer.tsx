
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-rugby-black text-rugby-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/3ccbf6a2-80d3-4f25-8554-4182b7193971.png" 
                alt="Maringa Rugby Logo" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-xl font-bold">Maringa Rugby Club</h3>
            </div>
            <p className="text-rugby-gray mb-4 max-w-md">
              Desde 1985 promovendo os valores do rugby: força, união, tradição e espírito de equipe. 
              Junte-se à nossa família Maringa Rugby.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-rugby-gray hover:text-rugby-red transition-colors">
                Facebook
              </a>
              <a href="#" className="text-rugby-gray hover:text-rugby-red transition-colors">
                Instagram
              </a>
              <a href="#" className="text-rugby-gray hover:text-rugby-red transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-rugby-gray hover:text-rugby-red transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-rugby-gray hover:text-rugby-red transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-rugby-gray hover:text-rugby-red transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-rugby-gray hover:text-rugby-red transition-colors">
                  História
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-rugby-gray hover:text-rugby-red transition-colors">
                  Junte-se
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-rugby-gray">
              <p>📍 Rua do Rugby, 123 - Centro</p>
              <p>📞 (44) 9999-8888</p>
              <p>✉️ contato@maringarugby.com.br</p>
            </div>
          </div>
        </div>

        <div className="border-t border-rugby-gray/30 mt-8 pt-8 text-center">
          <p className="text-rugby-gray">
            © 2024 Maringa Rugby Club. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
