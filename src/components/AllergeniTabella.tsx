import { Info, MessageCircle } from 'lucide-react';
import { ALLERGENI, ALLERGENI_LABORATORIO } from '../data/allergeni';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
}

/** Allergeni usati in laboratorio, in forma generale, con l'invito a chiedere. */
export default function AllergeniTabella({ language }: Props) {
  const it = language === 'it';

  return (
    <section id="allergeni" className="mt-10 sm:mt-16 scroll-mt-24" aria-labelledby="allergeni-titolo">
      <div className="flex items-center gap-3 mb-3">
        <Info className="w-7 h-7 text-emerald-600" />
        <h2 id="allergeni-titolo" className="text-xl sm:text-3xl font-bold text-emerald-800">
          {it ? 'Allergeni' : 'Allergens'}
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          {it
            ? 'I piatti della gastronomia cambiano ogni settimana. Per conoscere gli allergeni di ogni preparazione chiedete al banco o scriveteci su WhatsApp prima di ordinare: vi rispondiamo con la ricetta alla mano.'
            : 'Our deli dishes change every week. To find out the allergens in each dish, ask at the counter or message us on WhatsApp before ordering: we will check the recipe for you.'}
        </p>

        <div>
          <h3 className="font-bold text-emerald-900 mb-2">
            {it ? 'Gli allergeni che usiamo in laboratorio' : 'Allergens we use in our kitchen'}
          </h3>
          <p className="text-stone-600 text-sm mb-3">
            {it
              ? 'Ingredienti che contengono questi allergeni (e loro derivati) sono sempre presenti in bottega. Cambiano da piatto a piatto: meglio chiedere sempre.'
              : 'Ingredients containing these allergens (and their derivatives) are always present in the shop. They vary from dish to dish: always best to ask.'}
          </p>
          <ul className="flex flex-wrap gap-2">
            {ALLERGENI_LABORATORIO.map((k) => (
              <li key={k} className="bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium px-3 py-1 rounded-full">
                {it ? ALLERGENI[k].it : ALLERGENI[k].en}
              </li>
            ))}
          </ul>
        </div>

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
