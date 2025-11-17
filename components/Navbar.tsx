import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  // Cleaner nav link
  const linkClass = (path: string) => 
    `text-sm font-medium transition-colors ${isActive(path) ? 'text-charcoal font-bold' : 'text-gray-500 hover:text-charcoal'}`;

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                 <div className="absolute inset-0 bg-charcoal rounded-lg transform group-hover:rotate-12 transition-transform duration-300"></div>
                 <div className="absolute w-2 h-2 bg-imperial rounded-full"></div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-charcoal font-heading font-bold text-lg tracking-tight leading-none">INDOOR</span>
                <span className="text-gray-400 font-sans text-[10px] tracking-widest uppercase leading-none">Tracking</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Clean Links Only, No Buttons */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className={linkClass('/')}>Home</Link>
              <Link to="/como-funciona" className={linkClass('/como-funciona')}>Processo</Link>
              <Link to="/criar" className={linkClass('/criar')}>Criar Plano</Link>
              <Link to="/contato" className={linkClass('/contato')}>Contato</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-charcoal focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" className="block text-charcoal hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/como-funciona" className="block text-charcoal hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Processo</Link>
            <Link to="/criar" className="block text-charcoal hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Criar Plano</Link>
            <Link to="/contato" className="block text-charcoal hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Contato</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;