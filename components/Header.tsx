
import React, { useState } from 'react';
import { Menu, X, PlayCircle, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-church-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-church-gold p-2 rounded-full">
               <span className="font-bold text-church-blue text-xl">OBPC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Casa de Restauração</h1>
              <p className="text-[10px] tracking-widest uppercase text-church-gold">Telêmaco Borba - PR</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-church-gold font-semibold transition">Início</a>
            <a href="#agenda" className="hover:text-church-gold font-semibold transition">Agenda</a>
            <a href="#ministerios" className="hover:text-church-gold font-semibold transition">Ministérios</a>
            <a href="#esperar" className="hover:text-church-gold font-semibold transition">O que esperar?</a>
            <button className="bg-church-gold text-church-blue px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
              AO VIVO
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-church-blue border-t border-church-gold/20 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a href="#" className="block py-3 text-lg font-bold border-b border-church-gold/10" onClick={() => setIsOpen(false)}>Início</a>
            <a href="#agenda" className="block py-3 text-lg font-bold border-b border-church-gold/10" onClick={() => setIsOpen(false)}>Agenda</a>
            <a href="#ministerios" className="block py-3 text-lg font-bold border-b border-church-gold/10" onClick={() => setIsOpen(false)}>Ministérios</a>
            <a href="#esperar" className="block py-3 text-lg font-bold border-b border-church-gold/10" onClick={() => setIsOpen(false)}>O que esperar?</a>
            <button className="w-full bg-church-gold text-church-blue py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2">
              <PlayCircle size={24} /> ASSISTIR AO VIVO
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
