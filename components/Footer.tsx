
import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-church-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-church-gold p-2 rounded-full">
                 <span className="font-bold text-church-blue text-xl">OBPC</span>
              </div>
              <h2 className="text-2xl font-bold">Casa de Restauração</h2>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Uma igreja que ama a Deus, ama as pessoas e serve ao próximo com excelência e alegria. Venha nos visitar em Telêmaco Borba.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-church-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-church-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-church-gold transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-church-gold font-bold uppercase tracking-widest text-xs mb-6">Navegação</h3>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white">Início</a></li>
                <li><a href="#agenda" className="hover:text-white">Agenda</a></li>
                <li><a href="#ministerios" className="hover:text-white">Ministérios</a></li>
                <li><a href="#esperar" className="hover:text-white">O que esperar?</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-church-gold font-bold uppercase tracking-widest text-xs mb-6">Recursos</h3>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white">Pedidos de Oração</a></li>
                <li><a href="#" className="hover:text-white">Dízimos e Ofertas</a></li>
                <li><a href="#" className="hover:text-white">Área do Membro</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-church-gold font-bold uppercase tracking-widest text-xs mb-6">Onde Estamos</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-church-gold shrink-0" />
                <address className="not-italic text-slate-400 leading-relaxed">
                  Rua Exemplo de Endereço, 123<br />
                  Centro, Telêmaco Borba - PR<br />
                  CEP: 84261-000
                </address>
              </div>
              <div className="flex gap-4">
                <Phone className="text-church-gold shrink-0" />
                <span className="text-slate-400">(42) 3272-0000</span>
              </div>
              <div className="flex gap-4">
                <Mail className="text-church-gold shrink-0" />
                <span className="text-slate-400">contato@obpcrestauracao.com.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
          <p>© 2024 OBPC Casa de Restauração. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Termos</a>
            <p className="flex items-center gap-1">Feito com <span className="text-red-500">♥</span> em TB</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
