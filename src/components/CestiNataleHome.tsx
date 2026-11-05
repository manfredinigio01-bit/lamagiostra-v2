import { Gift, MessageCircle } from 'lucide-react';
import { CESTI_NATALE, PANETTONI_NATALE, cestiNataleVisibili } from '../data/cesti';
import { pathFor } from '../lib/routes';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
  /** Apre la pagina Ricorrenze alla sezione indicata (cesti o panettoni). */
  onOpen: (sezione: 'cesti-natale' | 'panettoni-natale') => void;
}

/**
 * Riquadro temporaneo in home per i cesti e i panettoni di Natale.
 * Sparisce da solo con la sezione dei cesti (data "visibileFinoA" in src/data/cesti.ts).
 */
export default function CestiNataleHome({ language, onOpen }: Props) {
  if (!cestiNataleVisibili()) return null;
  const it = language === 'it';
  const cesti = CESTI_NATALE.cesti;
  const prezzi = cesti.map((c) => c.prezzo);
  const da = Math.min(...prezzi);
  const a = Math.max(...prezzi);
  const href = `${pathFor('ricorrenze')}#cesti-natale`;
  const hrefPanettoni = `${pathFor('ricorrenze')}#panettoni-natale`;

  return (
    <section className="bg-white py-10 sm:py-14" aria-labelledby="cesti-home-titolo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream border border-emerald-900/10 rounded-2xl p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-emerald-800 text-sm font-semibold tracking-wider uppercase mb-3">
              <Gift className="w-4 h-4" aria-hidden="true" />
              {it ? `Natale ${CESTI_NATALE.anno}` : `Christmas ${CESTI_NATALE.anno}`}
            </p>
            <h2 id="cesti-home-titolo" className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">
              {it ? 'Cesti regalo e panettoni di Natale' : 'Christmas gift baskets and panettoni'}
            </h2>
            <p className="text-stone-700 text-lg mb-6">
              {it
                ? `${cesti.length} cesti pronti, da ${da} a ${a} €, con i prodotti dei nostri produttori. Oppure lo componiamo insieme a te. Per privati e aziende.`
                : `${cesti.length} ready-made baskets, from €${da} to €${a}, with products from our producers. Or we build one with you. For individuals and companies.`}
            </p>
            <p className="text-stone-700 mb-6 border-t border-emerald-900/10 pt-4">
              {it ? 'In bottega anche i panettoni di ' : 'In the shop, also panettoni by '}
              {PANETTONI_NATALE.produttore}
              {it ? ': classico, all’albicocca senza lattosio e vegano al cioccolato. ' : ': classic, lactose-free apricot and vegan chocolate. '}
              <a
                href={hrefPanettoni}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen('panettoni-natale');
                }}
                className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
              >
                {it ? 'Vedi i panettoni' : 'See the panettoni'}
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen('cesti-natale');
                }}
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
              >
                {it ? 'Scopri i cesti' : 'See the baskets'}
              </a>
              <a
                href={whatsappLink(language, {
                  it: 'Ciao! Vorrei informazioni sui cesti di Natale.',
                  en: 'Hi! I would like some information about your Christmas baskets.',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800 px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {it ? 'Chiedi su WhatsApp' : 'Ask on WhatsApp'}
              </a>
            </div>
          </div>
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onOpen('cesti-natale');
            }}
            className="grid grid-cols-2 gap-3"
            aria-label={it ? 'Guarda i cesti di Natale' : 'See the Christmas baskets'}
          >
            {cesti.map((c) => (
              <figure key={c.slug} className="relative overflow-hidden rounded-xl bg-stone-200">
                <img src={c.foto} alt="" loading="lazy" decoding="async" className="w-full aspect-4/3 object-cover" />
                <figcaption className="absolute bottom-2 left-2 bg-white/90 text-stone-800 text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-1 rounded-md whitespace-nowrap">
                  {c.nome} · {c.prezzo} €
                </figcaption>
              </figure>
            ))}
          </a>
        </div>
      </div>
    </section>
  );
}
