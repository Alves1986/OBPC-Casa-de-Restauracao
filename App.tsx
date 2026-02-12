import React, { useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AgendaSection from './components/AgendaSection';
import ExpectationSection from './components/ExpectationSection';
import Footer from './components/Footer';
import { isSupabaseConfigured } from './lib/supabase';

// Otimização: Componente de Loading Skeleton para a Agenda
const AgendaSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
    <div className="h-12 w-48 bg-slate-200 rounded-lg mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-3xl" />)}
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Smooth scroll para âncoras internas
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen selection:bg-church-gold selection:text-church-blue">
      {/* Diagnóstico Visível de Configuração */}
      {!isSupabaseConfigured && (
        <div className="bg-red-600 text-white p-2 text-center text-xs font-bold sticky top-0 z-[100] animate-bounce">
          CONFIGURAÇÃO SUPABASE AUSENTE - VERIFIQUE AS VARIÁVEIS VITE_ NO PAINEL DE CONTROLE
        </div>
      )}

      {/* Camada de Acessibilidade: Skip to Content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-church-gold text-church-blue px-4 py-2 rounded-md font-bold z-[100]">
        Pular para o conteúdo
      </a>

      <Header />
      
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        <Hero />
        
        {/* Banner de Engajamento Rápido */}
        <div className="bg-church-blue border-y border-church-gold/20 py-4 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee hover:pause px-4">
            <span className="text-church-gold font-bold mx-8">PRÓXIMO CULTO: DOMINGO 19H</span>
            <span className="text-white font-medium mx-8">•</span>
            <span className="text-church-gold font-bold mx-8">JUBRAC: SÁBADO 19:30H</span>
            <span className="text-white font-medium mx-8">•</span>
            <span className="text-church-gold font-bold mx-8">ESCOLA BÍBLICA: DOMINGO 09H</span>
          </div>
        </div>

        <Suspense fallback={<AgendaSkeleton />}>
          <AgendaSection />
        </Suspense>
        
        {/* Seção Transmídia (Foco no Digital) */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-church-off-white skew-x-12 translate-x-1/2 -z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-church-blue mb-8 leading-tight">
                  A Igreja fora das <span className="text-church-gold italic underline decoration-church-gold/30">quatro paredes.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-6 bg-church-off-white rounded-2xl border-l-4 border-church-gold shadow-sm">
                    <div className="bg-church-blue p-3 rounded-xl text-white h-fit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-church-blue text-lg">Cultos Online</h4>
                      <p className="text-slate-600">Transmissão em alta definição todos os domingos às 19h no YouTube e Facebook.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 hover:bg-church-off-white transition-colors rounded-2xl">
                    <div className="bg-church-gold/20 p-3 rounded-xl text-church-gold h-fit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-church-blue text-lg">Devocionais Diários</h4>
                      <p className="text-slate-600">Receba uma palavra de esperança diretamente no seu WhatsApp todas as manhãs.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" 
                    title="OBPC Live Stream" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-church-gold text-church-blue px-6 py-4 rounded-2xl font-black shadow-xl animate-bounce">
                  AO VIVO AGORA
                </div>
              </div>
            </div>
          </div>
        </section>

        <ExpectationSection />
      </main>

      <Footer />

      {/* Botão de Ação Flutuante (Floating Action Button) Otimizado */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button 
          aria-label="Contribuir com Dízimos e Ofertas"
          className="bg-church-gold text-church-blue p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </button>
        <button 
          aria-label="Abrir suporte via WhatsApp"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .pause { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

export default App;