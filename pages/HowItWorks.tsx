import React from 'react';
import { FileText, Cpu, Download } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Timeline Container */}
      <div className="relative max-w-4xl w-full">
        
        {/* Vertical Line (Center on desktop, Left on mobile) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2"></div>

        {/* Step 1 */}
        <div className="relative flex flex-col md:flex-row items-center mb-16 md:mb-24 group">
          {/* Content (Left on Desktop) */}
          <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right">
            <h3 className="text-2xl font-bold text-charcoal mb-2">1. Dados Básicos</h3>
            <p className="text-gray-500 leading-relaxed">
              Preencha o formulário com a visão, missão e mercado da sua startup.
            </p>
          </div>
          
          {/* Node */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-imperial rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <FileText size={24} className="text-charcoal" />
          </div>

          {/* Spacer (Right on Desktop) */}
          <div className="hidden md:block md:w-1/2"></div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col md:flex-row items-center mb-16 md:mb-24 group">
           {/* Spacer (Left on Desktop) */}
           <div className="hidden md:block md:w-1/2"></div>

           {/* Node */}
           <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-charcoal rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Cpu size={24} className="text-charcoal" />
          </div>

          {/* Content (Right on Desktop) */}
          <div className="w-full md:w-1/2 pl-20 md:pl-16 text-left">
            <h3 className="text-2xl font-bold text-charcoal mb-2">2. Processamento IA</h3>
            <p className="text-gray-500 leading-relaxed">
              O Gemini 2.5 analisa seus inputs, estrutura estratégias e cria projeções financeiras automaticamente.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col md:flex-row items-center group">
          {/* Content (Left on Desktop) */}
          <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right">
            <h3 className="text-2xl font-bold text-charcoal mb-2">3. Plano Completo</h3>
            <p className="text-gray-500 leading-relaxed">
              Receba seu Plano de Negócios profissional pronto para download em PDF e apresentação.
            </p>
          </div>
          
          {/* Node */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-green-500 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Download size={24} className="text-charcoal" />
          </div>

          {/* Spacer (Right on Desktop) */}
          <div className="hidden md:block md:w-1/2"></div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;