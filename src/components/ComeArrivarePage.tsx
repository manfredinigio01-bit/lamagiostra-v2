import { Bike, Car, Clock, Footprints, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Testo } from '../data/team';
import { IS_PROVA } from '../lib/ambiente';
import { COMPANY, whatsappLink } from '../lib/company';

interface Props {
  language: string;
}

const indirizzo = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;
const query = encodeURIComponent(`La Magiostra, ${indirizzo}`);
const APPLE_MAPS = `https://maps.apple.com/?q=${query}`;
const GOOGLE_NAVIGATORE = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

// Indicazioni pratiche: compaiono sul sito vero solo quando il testo è scritto.
// Sul sito di prova le voci vuote sono segnalate come "da completare".
const INDICAZIONI: { icona: ReactNode; titolo: Testo; testo?: Testo; suggerimento: string }[] = [
  {
    icona: <Car className="w-6 h-6 text-emerald-700" />,
    titolo: { it: 'In auto e parcheggio', en: 'By car and parking' },
    testo: {
      it: 'Si trova parcheggio in zona, vicino a piazza Castello o nelle vie intorno alla bottega: al massimo 3–4 minuti a piedi.',
      en: 'You can find parking nearby, around Piazza Castello or in the streets around the shop: 3–4 minutes on foot at most.',
    },
    suggerimento: 'Dove si parcheggia più facilmente.',
  },
  {
    icona: <Footprints className="w-6 h-6 text-emerald-700" />,
    titolo: { it: 'A piedi', en: 'On foot' },
    testo: {
      it: 'Dal centro di Cremona ci si arriva facilmente a piedi.',
      en: 'The shop is an easy walk from the centre of Cremona.',
    },
    suggerimento: 'Quanto dista dal centro.',
  },
  {
    icona: <Bike className="w-6 h-6 text-emerald-700" />,
    titolo: { it: 'In bicicletta', en: 'By bike' },
    testo: {
      it: 'Facile da raggiungere in bici dal centro. Davanti alla bottega potete legare la bici alla ringhiera.',
      en: 'Easy to reach by bike from the centre. You can lock your bike to the railing in front of the shop.',
    },
    suggerimento: 'Dove si può lasciare la bici.',
  },
];

export default function ComeArrivarePage({ language }: Props) {
  const it = language === 'it';
  const voci = INDICAZIONI.filter((v) => v.testo || IS_PROVA);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-200 text-sm font-semibold tracking-widest uppercase mb-3">
            {it ? 'Vieni a trovarci' : 'Come and visit us'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{it ? 'Come arrivare' : 'How to find us'}</h1>
          <p className="text-emerald-100 text-lg">{indirizzo}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-emerald-700" />
              <h2 className="font-bold text-emerald-900 text-xl">{it ? 'Indirizzo' : 'Address'}</h2>
            </div>
            <address className="not-italic text-stone-700 text-lg leading-relaxed mb-6">
              {COMPANY.brand}
              <br />
              {COMPANY.street}
              <br />
              {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province})
            </address>
            <div className="flex flex-col gap-3">
              <a
                href={GOOGLE_NAVIGATORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                {it ? 'Portami qui (Google Maps)' : 'Directions (Google Maps)'}
              </a>
              <a
                href={APPLE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800 px-5 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                {it ? 'Apri in Mappe di Apple' : 'Open in Apple Maps'}
              </a>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-emerald-700" />
              <h2 className="font-bold text-emerald-900 text-xl">{it ? 'Orari' : 'Opening hours'}</h2>
            </div>
            <dl className="text-stone-700 space-y-2 mb-6">
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">{it ? 'Martedì – Venerdì' : 'Tuesday – Friday'}</dt>
                <dd className="text-right">
                  {COMPANY.hours.tueFri.split(' / ').map((f) => (
                    <span key={f} className="block whitespace-nowrap">
                      {f.replace('-', '–')}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-semibold">{it ? 'Sabato' : 'Saturday'}</dt>
                <dd className="text-right whitespace-nowrap">{COMPANY.hours.sat.replace('-', '–')}</dd>
              </div>
              <div className="flex justify-between gap-4 text-stone-500">
                <dt className="font-semibold">{it ? 'Domenica e lunedì' : 'Sunday and Monday'}</dt>
                <dd className="text-right">{it ? 'Chiuso' : 'Closed'}</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${COMPANY.landline.tel}`}
                className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                {COMPANY.landline.display}
              </a>
              <a
                href={whatsappLink(language, {
                  it: 'Ciao! Vorrei un’informazione per venire in bottega: ',
                  en: 'Hi! I have a question about visiting the shop: ',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:underline"
              >
                <MessageCircle className="w-5 h-5" />
                {it ? 'Scrivici su WhatsApp' : 'Message us on WhatsApp'}
              </a>
            </div>
          </section>
        </div>

        {voci.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {voci.map((v, i) => (
              <section key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  {v.icona}
                  <h2 className="font-bold text-emerald-900">{it ? v.titolo.it : v.titolo.en}</h2>
                </div>
                {v.testo ? (
                  <p className="text-stone-700 leading-relaxed">{it ? v.testo.it : v.testo.en}</p>
                ) : (
                  <div className="border-2 border-dashed border-amber-400 bg-amber-50 text-amber-900 rounded-xl p-3 text-sm">
                    <p className="font-semibold mb-1">Da completare (visibile solo nella versione di prova)</p>
                    <p>{v.suggerimento}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
