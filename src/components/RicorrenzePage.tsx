import { useState } from 'react';
import { COMPANY, whatsappLink } from '../lib/company';
import { Gift, Cake, Package, CreditCard, Sparkles, Phone } from 'lucide-react';

interface Props {
  language: string;
}

const serviziSpeciali = [
  {
    icon: Cake,
    titolo: 'Torte di Compleanno Vegane',
    titolo_en: 'Vegan Birthday Cakes',
    desc: 'Ogni torta racconta una storia. Le nostre torte vegane, preparate a mano nel nostro laboratorio, rendono speciale ogni compleanno e ogni festa. Prenotala almeno 48 ore in anticipo.',
    desc_en: 'Every cake tells a story. Our vegan cakes, handmade in our workshop, make every birthday and every party special. Order at least 48 hours in advance.',
    dettagli: [
      'Impasti 100% vegetali',
      'Decorazioni personalizzate su richiesta',
      'Creme, ganache e glasse vegane',
      'Disponibile in vari gusti: cioccolato, limone, frutta, spezie',
      'Su ordinazione con almeno 48 ore di anticipo',
    ],
    colore: 'bg-amber-50 border-amber-300',
    iconColore: 'text-amber-600',
    accent: 'bg-amber-600',
  },
  {
    icon: Package,
    titolo: 'Cesti e Pacchi Regalo',
    titolo_en: 'Gift Baskets & Hampers',
    desc: 'Regala qualcosa di autentico e artigianale. Componiamo cesti e pacchi regalo personalizzati con i migliori prodotti della nostra bottega: conserve, mieli, pasta artigianale, dolci e molto altro.',
    desc_en: 'Give something authentic and handcrafted. We put together personalised gift baskets and hampers with the best products from our shop: preserves, honey, artisan pasta, sweets and much more.',
    dettagli: [
      'Composizione personalizzata in base al budget',
      'Prodotti artigianali selezionati dalla bottega',
      'Confezione curata e personalizzabile',
      'Ideali per compleanni e occasioni speciali',
      'Consegna a domicilio su richiesta nell\'area locale',
    ],
    colore: 'bg-red-50 border-red-300',
    iconColore: 'text-red-700',
    accent: 'bg-red-700',
  },
  {
    icon: CreditCard,
    titolo: 'Gift Card',
    titolo_en: 'Gift Cards',
    desc: 'Non sai cosa regalare? La gift card de La Magiostra è il regalo perfetto per chi ama il buon cibo artigianale. Spendibile in bottega su tutti i nostri prodotti e servizi.',
    desc_en: 'Not sure what to give? The La Magiostra gift card is the perfect gift for anyone who loves good artisan food. Redeemable in the shop on all our products and services.',
    dettagli: [
      'Importo libero a scelta del donatore',
      'Valida per tutti i prodotti e servizi in bottega',
      'Utilizzabile anche per ordinazioni personalizzate',
      'Perfetta per ogni occasione speciale',
      'Contattaci per acquistarla o riceverla digitalmente',
    ],
    colore: 'bg-emerald-50 border-emerald-300',
    iconColore: 'text-emerald-700',
    accent: 'bg-emerald-700',
  },
];

const WHATSAPP_RICORRENZE = {
  it: 'Ciao! Vorrei informazioni su una ricorrenza (torta, cesto regalo o gift card).',
  en: 'Hi! I would like information about a special occasion (cake, gift basket or gift card).',
};

export default function RicorrenzePage({ language }: Props) {
  const [expandedServizio, setExpandedServizio] = useState<number | null>(null);
  const whatsappHref = whatsappLink(language, WHATSAPP_RICORRENZE);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="relative bg-emerald-700 text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/tavoli_pranzo_mobile.webp')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-emerald-500/30 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-semibold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            {language === 'it' ? 'Ogni occasione è speciale' : 'Every occasion is special'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {language === 'it' ? 'Ricorrenze' : 'Special Occasions'}
          </h1>
          <p className="text-emerald-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {language === 'it'
              ? 'Per ogni ricorrenza abbiamo qualcosa di speciale. Dolci artigianali, cesti personalizzati, preparazioni su ordinazione e molto altro.'
              : 'For every celebration we have something special. Artisan sweets, personalized baskets, made-to-order preparations and much more.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl sm:text-3xl font-bold text-stone-800">
              {language === 'it' ? 'Servizi Speciali' : 'Special Services'}
            </h2>
          </div>
          <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto">
            {language === 'it'
              ? 'Disponibili tutto l\'anno per ogni occasione'
              : 'Available all year round for every occasion'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {serviziSpeciali.map((servizio, i) => {
            const Icon = servizio.icon;
            const isExpanded = expandedServizio === i;
            return (
              <div
                key={i}
                className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${servizio.colore} ${isExpanded ? 'shadow-xl' : 'shadow-sm'}`}
                onClick={() => setExpandedServizio(isExpanded ? null : i)}
              >
                <div className={`${servizio.accent} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {language === 'it' ? servizio.titolo : servizio.titolo_en}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {language === 'it' ? servizio.desc : servizio.desc_en}
                  </p>
                  {isExpanded && (
                    <div className="mt-2">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-800 transition text-sm"
                      >
                        {language === 'it' ? 'Contattaci su WhatsApp' : 'Contact us on WhatsApp'}
                      </a>
                    </div>
                  )}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedServizio(isExpanded ? null : i);
                    }}
                    className={`flex items-center gap-1 text-xs font-semibold mt-3 ${isExpanded ? 'text-stone-600' : 'text-emerald-700'}`}
                  >
                    {isExpanded
                      ? (language === 'it' ? 'Chiudi' : 'Close')
                      : (language === 'it' ? 'Scopri di più' : 'Learn more')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-16 bg-emerald-700 rounded-2xl p-6 sm:p-10 text-white text-center">
          <Gift className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-emerald-300" />
          <h2 className="text-xl sm:text-3xl font-bold mb-3">
            {language === 'it' ? 'Hai un evento speciale in mente?' : 'Have a special event in mind?'}
          </h2>
          <p className="text-emerald-200 mb-7 max-w-xl mx-auto">
            {language === 'it'
              ? 'Contattaci con anticipo per organizzare insieme la tua ricorrenza. Siamo felici di personalizzare ogni preparazione per te.'
              : 'Contact us in advance to plan your special occasion together. We are happy to customize every preparation for you.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-50 transition shadow-lg text-sm sm:text-base"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${COMPANY.mobile.tel}`}
              className="inline-flex items-center justify-center gap-2 bg-emerald-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-950 transition text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              {COMPANY.mobile.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
