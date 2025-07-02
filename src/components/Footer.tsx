
const Footer = () => {
  return (
    <footer className="bg-rugby-blue-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/a1c2761f-e2d9-48db-a3bb-2ffe727deb81.png" 
                alt="Rugby Team Logo" 
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold">Eagles Rugby Club</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Desde 1985 promovendo os valores do rugby: força, união, tradição e espírito de equipe. 
              Junte-se à nossa família Eagles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#history" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                  História
                </a>
              </li>
              <li>
                <a href="#join" className="text-gray-300 hover:text-rugby-blue-primary transition-colors">
                  Junte-se
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 Rua do Rugby, 123 - Centro</p>
              <p>📞 (11) 9999-8888</p>
              <p>✉️ contato@eaglesrugby.com.br</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Eagles Rugby Club. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
