import { Package } from 'lucide-react';
import { fornitori } from '../data/team';

interface Props {
  language: string;
}

export default function FornitoriPage({ language }: Props) {
  const it = language === 'it';

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="relative bg-emerald-700 text-white py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bancone_frutta_e_verdura.webp')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Package className="w-4 h-4" />
            {it ? 'Produttori locali' : 'Local producers'}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            {it ? 'I Nostri Fornitori' : 'Our Suppliers'}
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {it
              ? 'Collaboriamo con produttori selezionati che condividono i nostri valori di qualità, sostenibilità e rispetto per la terra.'
              : 'We work with selected producers who share our values of quality, sustainability and respect for the land.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {fornitori.map((f) => (
            <div
              key={f.name}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md border border-stone-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-stone-100">
                <img
                  src={f.photo}
                  alt={f.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <p className="font-semibold text-stone-800 text-sm leading-tight">{f.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
