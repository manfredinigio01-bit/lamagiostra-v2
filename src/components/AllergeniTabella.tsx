import { Info, MessageCircle } from 'lucide-react';
import { ALLERGENI, piattiFissi, verificato } from '../data/allergeni';
import { IS_PROVA } from '../lib/ambiente';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
}

/** Allergeni dei piatti sempre presenti, più l'avviso per i piatti della settimana. */
export default function AllergeniTabella({ language }: Props) {
  const it = language === 'it';
  const piatti = piattiFissi.filter((p) => IS_PROVA || verificato(p));
  const elenco = (chiavi: (keyof typeof ALLERGENI)[]) =>
    chiavi.map((k) => (it ? ALLERGENI[k].it : ALLERGENI[k].en)).join(', ');

  return (
    <section id="allergeni" className="mt-10 sm:mt-16 scroll-mt-24" aria-labelledby="allergeni-titolo">
      <div className="flex items-center gap-3 mb-3">
        <Info className="w-7 h-7 text-emerald-600" />
        <h2 id="allergeni-titolo" className="text-xl sm:text-3xl font-bold text-emerald-800">
          {it ? 'Allergeni' : 'Allergens'}
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          {it
            ? 'I piatti della gastronomia cambiano ogni settimana. Per conoscere gli allergeni di ogni preparazione chiedete al banco o scriveteci su WhatsApp prima di ordinare: vi rispondiamo con la ricetta alla mano. Tutti i piatti sono preparati nel nostro laboratorio, dove si lavorano anche ingredienti che contengono allergeni.'
            : 'Our deli dishes change every week. To find out the allergens in each dish, ask at the counter or message us on WhatsApp before ordering: we will check the recipe for you. All dishes are made in our kitchen, where ingredients containing allergens are also used.'}
        </p>

        {piatti.length > 0 && (
          <div>
            <h3 className="font-bold text-emerald-900 mb-3">
              {it ? 'I piatti sempre presenti' : 'Dishes always available'}
            </h3>
            <dl className="divide-y divide-stone-200 border-y border-stone-200">
              {piatti.map((p, i) => (
                <div key={i} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="font-semibold text-stone-800">{it ? p.nome.it : p.nome.en}</dt>
                  <dd className="text-stone-700 sm:col-span-2 mt-1 sm:mt-0 text-sm sm:text-base">
                    {!verificato(p) ? (
                      <span className="inline-block border border-dashed border-amber-400 bg-amber-50 text-amber-900 rounded px-2 py-0.5 text-xs font-semibold">
                        Da completare: allergeni da verificare sulla ricetta (visibile solo nella versione di prova)
                      </span>
                    ) : p.allergeni!.length === 0 ? (
                      it ? 'Nessuno dei 14 allergeni' : 'None of the 14 allergens'
                    ) : (
                      <>
                        <span className="font-medium">{it ? 'Contiene: ' : 'Contains: '}</span>
                        {elenco(p.allergeni!)}
                      </>
                    )}
                    {verificato(p) && p.tracce && p.tracce.length > 0 && (
                      <span className="block text-stone-500 text-sm mt-1">
                        {it ? 'Può contenere tracce di: ' : 'May contain traces of: '}
                        {elenco(p.tracce)}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <a
          href={whatsappLink(language, {
            it: 'Ciao! Vorrei sapere gli allergeni di questo piatto: ',
            en: 'Hi! I would like to know the allergens in this dish: ',
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors text-sm sm:text-base"
        >
          <MessageCircle className="w-5 h-5" />
          {it ? 'Chiedi gli allergeni su WhatsApp' : 'Ask about allergens on WhatsApp'}
        </a>
      </div>
    </section>
  );
}
