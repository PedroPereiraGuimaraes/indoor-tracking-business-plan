import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content */}
          <div className="lg:col-span-7 text-left animate-fade-in-up">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-imperial uppercase border border-imperial rounded-full">
              IA + Estratégia
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-sans text-charcoal leading-tight mb-8">
              Seu Plano de <br />
              <span className="relative z-10">
                Negócios
                <span className="absolute bottom-2 left-0 w-full h-3 bg-imperial/30 -z-10 rounded-sm"></span>
              </span>
              em minutos.
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl font-light">
              Preencha os dados essenciais da sua startup e deixe nossa Inteligência Artificial estruturar o documento completo para investidores.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/criar">
                <Button variant="primary" className="text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  COMEÇAR AGORA <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/como-funciona">
                <Button variant="ghost" className="text-lg">
                  Como funciona?
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual abstract element */}
          <div className="hidden lg:block lg:col-span-5">
             <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute w-3/4 h-3/4 border border-gray-100 rounded-full animate-pulse"></div>
                <div className="absolute w-1/2 h-1/2 bg-gray-50 rounded-full"></div>
                
                {/* Mockup Card */}
                <div className="relative bg-white p-8 shadow-2xl rounded-2xl max-w-xs w-full border border-gray-100 transform -rotate-3 hover:rotate-0 transition-transform duration-700 cursor-default">
                  <div className="flex justify-between items-center mb-6">
                     <div className="h-8 w-8 rounded-lg bg-charcoal"></div>
                     <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-full bg-gray-100 mb-3 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-gray-100 mb-3 rounded-full"></div>
                  <div className="h-4 w-4/5 bg-gray-100 mb-8 rounded-full"></div>
                  <div className="flex justify-end">
                    <div className="h-8 w-24 bg-imperial rounded-lg"></div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;