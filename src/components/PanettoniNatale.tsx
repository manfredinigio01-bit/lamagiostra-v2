import { MessageCircle } from 'lucide-react';
import { CESTI_NATALE, PANETTONI_NATALE, cestiNataleVisibili } from '../data/cesti';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
}

/** Panettoni di Natale in bottega (pagina Ricorrenze). Sparisce insieme ai cesti di Natale. */
export default function PanettoniNatale({ language }: Props) {
  if (!cestiNataleVisibili()) return null;
  const it = language === 'it';
  const { produttore, panettoni } = PANETTONI_NATALE;

  return (
    <section id="panettoni-natale" className="mt-12 sm:mt-20 scroll-mt-24" aria-labelledby="panettoni-natale-titolo">
      <p className="text-emerald-800 text-sm font-semibold tracking-wider uppercase mb-2">
        {it ? `Natale ${CESTI_NATALE.anno}` : `Christmas ${CESTI_NATALE.anno}`}
      </p>
      <h2 id="panettoni-natale-titolo" className="text-2xl sm:text-4xl font-bold text-stone-800 mb-4">
        {it ? 'I panettoni di Natale' : 'Christmas panettoni'}
      </h2>
      <p className="text-stone-700 text-lg mb-8 max-w-3xl">
        {it
          ? `In bottega trovi i panettoni di ${produttore}, in tre versioni.`
          : `In the shop you will find ${produttore}'s panettoni, in three versions.`}
      </p>
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {panettoni.map((p) => (
          <article key={p.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs flex flex-col">
            {p.foto && <img src={p.foto} alt={it ? p.nome.it : p.nome.en} loading="lazy" decoding="async" className="w-full aspect-4/3 object-cover" />}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-emerald-900 mb-1">{it ? p.nome.it : p.nome.en}</h3>
              <p className="text-stone-600">{it ? p.descrizione.it : p.descrizione.en}</p>
              {p.prezzo !== undefined && <p className="mt-3 text-emerald-800 font-bold">{p.prezzo} €</p>}
            </div>
          </article>
        ))}
      </div>
      <a
        href={whatsappLink(language, {
          it: 'Ciao! Vorrei tenere da parte un panettone: ',
          en: 'Hi! I would like to reserve a panettone: ',
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {it ? 'Chiedi o prenota su WhatsApp' : 'Ask or reserve on WhatsApp'}
      </a>
    </section>
  );
}
