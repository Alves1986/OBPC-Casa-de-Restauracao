
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/122/1920/1080" 
          alt="Church background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B5B] via-[#002B5B]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl text-white">
          <span className="inline-block bg-church-gold/20 border border-church-gold text-church-gold font-bold px-4 py-1 rounded-full text-sm mb-6 animate-pulse">
            UM LUGAR PARA VOCÊ PERTENCER
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Sua <span className="text-church-gold">Restauração</span> Começa Aqui.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed">
            Seja bem-vindo à OBPC Casa de Restauração. Somos uma família apaixonada por Jesus em Telêmaco Borba, dedicados a amar pessoas e servir nossa cidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-church-gold text-church-blue px-8 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-white transition-colors group shadow-xl">
              PLANEJE SUA VISITA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white hover:text-church-blue transition-all">
              <MapPin /> COMO CHEGAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
