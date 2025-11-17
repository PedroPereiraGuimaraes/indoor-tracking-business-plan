import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';

const Contact: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="bg-charcoal text-white rounded-2xl p-8 md:p-10 shadow-xl flex flex-col justify-start h-full">
            <h2 className="text-2xl font-bold mb-8 border-b border-gray-600 pb-4">Canais de Atendimento</h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-imperial/20 rounded-full flex items-center justify-center text-imperial flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Email</p>
                  <p className="font-medium text-lg break-all">contato@indoortracking.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-imperial/20 rounded-full flex items-center justify-center text-imperial flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Telefone</p>
                  <p className="font-medium text-lg">+55 (11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-imperial/20 rounded-full flex items-center justify-center text-imperial flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Endereço</p>
                  <p className="font-medium text-lg">Av. Paulista, 1000 - SP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-100 h-full">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-bold text-charcoal mb-6">Envie uma mensagem</h2>
              <Input label="Seu Nome" placeholder="Nome completo" />
              <Input label="Email" type="email" placeholder="seu@email.com" />
              <Input label="Assunto" placeholder="Como podemos ajudar?" />
              <TextArea label="Mensagem" placeholder="Escreva sua mensagem aqui..." rows={4} />
              
              <Button fullWidth className="mt-4 text-lg" variant="primary">
                Enviar Mensagem <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;