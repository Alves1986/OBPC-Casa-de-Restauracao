
import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { MinistryCategory } from '../types';

const AgendaSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  // Define date range: hoje até 30 dias
  const now = useMemo(() => new Date(), []);
  const nextMonth = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);

  const { occurrences, ministries, loading, error } = useEvents(now, nextMonth);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return occurrences;
    const ministry = ministries.find(m => m.category === filter);
    if (!ministry) return occurrences;
    return occurrences.filter(occ => occ.ministry_id === ministry.id);
  }, [occurrences, filter, ministries]);

  const displayEvents = filteredEvents.slice(0, 6);

  if (loading) {
    return (
      <section id="agenda" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Carregando agenda da Casa...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="agenda" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 font-bold">Erro ao carregar agenda. Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="agenda" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-church-blue mb-4">Agenda da Casa</h2>
            <p className="text-slate-600 text-lg">
              Fique por dentro de tudo o que acontece em nossa comunidade. Filtre pelos ministérios e planeje sua semana.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold transition ${filter === 'all' ? 'bg-church-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Todos
            </button>
            {Object.values(MinistryCategory).map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${filter === cat ? 'bg-church-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {displayEvents.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-xl font-medium">Nenhum evento programado para os próximos dias.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event, idx) => {
              const min = ministries.find(m => m.id === event.ministry_id);
              const dateStr = event.start_time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
              const timeStr = event.start_time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={`${event.id}-${idx}`} className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: event.color || min?.color || '#002B5B' }}
                    >
                      <CalendarIcon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      {min?.name || 'Geral'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-church-blue mb-2 group-hover:text-church-gold transition-colors capitalize">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock size={18} className="text-church-gold" />
                      <span className="font-semibold">{dateStr} às {timeStr}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <MapPin size={18} className="text-church-gold" />
                      <span className="font-medium">Templo Principal</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="text-church-blue font-bold text-lg hover:underline underline-offset-8 decoration-church-gold decoration-4">
            Ver agenda completa do ano →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
