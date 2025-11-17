import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-gray-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-imperial p-1 rounded text-charcoal">
                <BarChart3 size={20} />
              </div>
              <span className="text-white font-bold text-lg">Indoor Tracking</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Potencialize sua startup com planos de negócios gerados por Inteligência Artificial de ponta.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-imperial transition-colors">Home</Link></li>
              <li><Link to="/como-funciona" className="hover:text-imperial transition-colors">Como Funciona</Link></li>
              <li><Link to="/criar" className="hover:text-imperial transition-colors">Criar Plano</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-imperial transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-imperial transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-imperial transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-imperial transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-imperial transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-imperial transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Indoor Tracking. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;