import { Check, Gift, MessageCircle, ShoppingBasket } from 'lucide-react';
import { CESTI_NATALE, cestiNataleVisibili } from '../data/cesti';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
}

/** Cesti di Natale già pronti (foto, prezzo, prodotti) e il cesto composto in bottega. */
export default function CestiNatale({ language }: Props) {
  const it = language === 'it';

  return (
    <>
      {cestiNataleVisibili() && (
        <section id="cesti-natale" className="mt-12 sm:mt-20 scroll-mt-24" aria-labelledby="cesti-natale-titolo">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-red-700 text-sm font-semibold tracking-widest uppercase mb-2">
              {it ? `Natale ${CESTI_NATALE.anno}` : `Christmas ${CESTI_NATALE.anno}`}
            </p>
            <h2 id="cesti-natale-titolo" className="text-2xl sm:text-4xl font-bold text-stone-800 mb-4">
              {it ? 'I nostri cesti già pronti' : 'Our ready-made baskets'}
            </h2>
            <p className="text-stone-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {it ? CESTI_NATALE.intro.it : CESTI_NATALE.intro.en}
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {CESTI_NATALE.cesti.map((c) => (
              <article
                key={c.slug}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] md:aspect-[4/5] bg-stone-100 overflow-hidden">
                  <img
                    src={c.foto}
                    alt={it ? `Cesto di Natale ${c.nome}` : `${c.nome} Christmas basket`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-emerald-900">{c.nome}</h3>
                    <p className="text-2xl font-bold text-red-700 whitespace-nowrap">{c.prezzo} €</p>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{it ? c.descrizione.it : c.descrizione.en}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    {it ? `Cosa contiene · ${c.prodotti.length} prodotti` : `What's inside · ${c.prodotti.length} products`}
                  </p>
                  <ul className="space-y-1 text-sm text-stone-700 mb-5">
                    {c.prodotti.map((p) => (
                      <li key={p} className="flex gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(language, {
                      it: `Ciao! Vorrei ordinare il cesto di Natale «${c.nome}» (${c.prezzo} €). Quantità: `,
                      en: `Hi! I would like to order the «${c.nome}» Christmas basket (€${c.prezzo}). Quantity: `,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {it ? 'Ordina su WhatsApp' : 'Order on WhatsApp'}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 flex gap-3">
            <Gift className="w-6 h-6 text-red-700 flex-shrink-0" aria-hidden="true" />
            <ul className="space-y-1 text-sm sm:text-base text-stone-700">
              {CESTI_NATALE.condizioni.map((t, i) => (
                <li key={i}>{it ? t.it : t.en}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mt-10 sm:mt-14 bg-white border-2 border-emerald-200 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <ShoppingBasket className="w-7 h-7 text-emerald-700" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-2">
            {it ? 'Oppure componi il tuo cesto in bottega' : 'Or build your own basket in the shop'}
          </h2>
          <p className="text-stone-600 leading-relaxed">
            {it
              ? 'Passa in negozio e scegli tu i prodotti dagli scaffali, sul momento: componiamo insieme il cesto a tuo piacimento, con la quantità e il budget che preferisci, e lo confezioniamo per il regalo.'
              : 'Come to the shop and pick the products from our shelves yourself: we put the basket together with you, with the amount and budget you prefer, and wrap it as a gift.'}
          </p>
        </div>
      </section>
    </>
  );
}
