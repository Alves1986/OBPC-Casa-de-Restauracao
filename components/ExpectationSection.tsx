
import React from 'react';
import { ShieldCheck, Shirt, Car, Heart } from 'lucide-react';

const ExpectationSection: React.FC = () => {
  const items = [
    {
      icon: <Car className="text-church-gold" size={32} />,
      title: 'Estacionamento',
      desc: 'Temos espaço amplo e seguro para o seu veículo, com recepção na porta.'
    },
    {
      icon: <Shirt className="text-church-gold" size={32} />,
      title: 'O que vestir?',
      desc: 'Venha como se sentir confortável. Não exigimos roupas formais, o importante é sua presença.'
    },
    {
      icon: <Heart className="text-church-gold" size={32} />,
      title: 'Kids & Teens',
      desc: 'Temos salas preparadas com atividades específicas para cada faixa etária durante os cultos.'
    },
    {
      icon: <ShieldCheck className="text-church-gold" size={32} />,
      title: 'Segurança',
      desc: 'Protocolos de cuidado e uma equipe pronta para auxiliar em qualquer necessidade.'
    }
  ];

  return (
    <section id="esperar" className="py-24 bg-church-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-blue mb-4">O que esperar?</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Sabemos que visitar um lugar novo pode gerar dúvidas. Queremos que você se sinta em casa desde o primeiro passo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-church-blue mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpectationSection;
