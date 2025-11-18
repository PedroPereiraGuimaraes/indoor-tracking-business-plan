import React from "react";
import { Edit3, Cpu, FileText, MessageCircle, Send } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white font-sans py-12">
      {/* Timeline Process */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2"></div>

          {/* Step 1: Input */}
          <div className="relative flex flex-col md:flex-row items-center mb-24 group">
            <div className="w-full md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl text-charcoal font-bold text-xl mb-4 shadow-sm md:hidden">
                1
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-3">
                Preencha com seus dados
              </h4>
              <p className="text-gray-500 leading-relaxed">
                Inicie fornecendo as informações fundamentais da sua startup.
                Focamos nos dados que realmente importam.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-charcoal rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center text-white text-sm font-bold z-10">
              1
            </div>

            {/* Card Visual 1 */}
            <div className="w-full md:w-1/2 md:pl-16">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto md:mx-0">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-auto text-[10px] text-gray-400 font-medium">
                    Formulário
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Nome da Startup
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-charcoal font-medium">
                      EcoLogística Solutions
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                      Missão
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-gray-500">
                      Reduzir a pegada de carbono no transporte urbano através
                      de...
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="bg-imperial text-charcoal text-[10px] font-bold px-3 py-1 rounded-full">
                    Enviar Dados
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: AI Processing */}
          <div className="relative flex flex-col md:flex-row-reverse items-center mb-24 group">
            <div className="w-full md:w-1/2 md:pl-16 mb-8 md:mb-0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl text-charcoal font-bold text-xl mb-4 shadow-sm md:hidden">
                2
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-3">
                Processamento e Estruturação
              </h4>
              <p className="text-gray-500 leading-relaxed">
                Nosso modelo treinado fara todo o processo e estruturará seu
                plano de negócios, aplicando metodologias de mercado.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-imperial rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center text-charcoal text-sm font-bold z-10">
              2
            </div>

            {/* Card Visual 2 */}
            <div className="w-full md:w-1/2 md:pr-16 text-right">
              <div className="bg-charcoal p-5 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto md:ml-auto md:mr-0 text-left">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-600 pb-2">
                  <Cpu size={14} className="text-imperial" />
                  <span className="text-[10px] text-gray-300 font-mono">
                    AI_Processor_v2.5
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[10px]">
                  <div className="flex gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-gray-300">
                      Analisando setor de logística...
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-gray-300">
                      Calculando TAM, SAM e SOM...
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-gray-300">
                      Gerando Análise SWOT...
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-imperial animate-pulse">●</span>
                    <span className="text-white font-bold">
                      Escrevendo estratégia...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Delivery */}
          <div className="relative flex flex-col md:flex-row items-center mb-24 group">
            <div className="w-full md:w-1/2 md:pr-16 md:text-right mb-8 md:mb-0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl text-charcoal font-bold text-xl mb-4 shadow-sm md:hidden">
                3
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-3">
                Entrega Profissional
              </h4>
              <p className="text-gray-500 leading-relaxed">
                Sera gerado uma entrega profissional em PDF formatado, com
                linguagem corporativa pronta para investidores.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-charcoal rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center text-white text-sm font-bold z-10">
              3
            </div>

            {/* Card Visual 3 */}
            <div className="w-full md:w-1/2 md:pl-16">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto md:mx-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-imperial text-charcoal text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                  PDF
                </div>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 text-charcoal">
                    <FileText size={20} />
                  </div>
                  <div className="text-xs font-bold text-charcoal uppercase tracking-wide">
                    Plano de Negócios
                  </div>
                  <div className="text-[10px] text-gray-400">
                    EcoLogística Solutions.pdf
                  </div>
                </div>

                <div className="space-y-2 px-4 opacity-50">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-5/6 bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-1.5 w-4/5 bg-gray-200 rounded-full"></div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
                  <span className="text-[10px] text-imperial font-bold cursor-pointer hover:underline">
                    Clique para baixar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Contact/Support */}
          <div className="relative flex flex-col md:flex-row-reverse items-center group">
            <div className="w-full md:w-1/2 md:pl-16 mb-8 md:mb-0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl text-charcoal font-bold text-xl mb-4 shadow-sm md:hidden">
                4
              </div>
              <h4 className="text-2xl font-bold text-charcoal mb-3">
                Consultoria e Explicação
              </h4>
              <p className="text-gray-500 leading-relaxed">
                Ficou alguma dúvida? Após seu plano ser gerado, nossa equipe
                entrará em contato para explicar cada detalhe do seu plano de
                negócios.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-imperial rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center text-charcoal text-sm font-bold z-10">
              4
            </div>

            {/* Card Visual 4 - Simple Chat */}
            <div className="w-full md:w-1/2 md:pr-16 text-right">
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto md:ml-auto md:mr-0 overflow-hidden text-left">
                {/* Header */}
                <div className="bg-charcoal px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-charcoal">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">
                      Indoor Business Plan Consultor
                    </div>
                    <div className="text-green-400 text-[8px] font-bold uppercase tracking-wider">
                      Online Agora
                    </div>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-4 bg-gray-50 space-y-3">
                  <div className="bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-100 max-w-[90%]">
                    <p className="text-xs text-gray-600">
                      Olá! Vi que seu plano foi gerado. Ficou com alguma dúvida?
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-100 max-w-[90%]">
                    <p className="text-xs text-gray-600">
                      Estamos à disposição para ajudar! 🚀
                    </p>
                  </div>
                </div>

                {/* Input Area (Fake) */}
                <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                  <div className="h-8 bg-gray-100 rounded-full w-full flex items-center px-3">
                    <span className="text-[10px] text-gray-400">
                      Digite sua mensagem...
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-imperial rounded-full flex items-center justify-center text-charcoal shadow-sm">
                    <Send size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
