import { useState } from 'react';
import CestiNatale from './CestiNatale';
import ChiamaMenu from './ChiamaMenu';
import { whatsappLink } from '../lib/company';
import { Gift, Cake, Package, CreditCard } from 'lucide-react';

interface Props {
  language: string;
}

const serviziSpeciali = [
  {
    icon: Cake,
    titolo: 'Torte di compleanno vegane',
    titolo_en: 'Vegan birthday cakes',
    desc: 'Torte vegane fatte a mano nel nostro laboratorio, per compleanni e occasioni speciali, da ordinare almeno 48 ore prima.',
    desc_en: 'Vegan cakes handmade in our kitchen, for birthdays and special occasions, to be ordered at least 48 hours ahead.',
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
    titolo: 'Cesti e confezioni regalo',
    titolo_en: 'Gift baskets and boxes',
    desc: 'Cesti regalo confezionati con i nostri prodotti: conserve, miele, pasta artigianale, dolci e altro ancora, preparati in base alle tue esigenze.',
    desc_en: 'Gift baskets made up with our products: preserves, honey, artisan pasta, sweets and more, put together to suit your needs.',
    dettagli: [
      'Composizione personalizzata in base al budget',
      'Prodotti artigianali selezionati dalla bottega',
      'Confezione curata e personalizzabile',
      'Per compleanni, feste e regali aziendali',
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
    desc: 'Se non sai cosa regalare scegli una gift card, utilizzabile su spesa e gastronomia, dell\'importo che decidi tu.',
    desc_en: 'Not sure what to give? Choose a gift card, for any amount you decide, to use on groceries and our deli.',
    dettagli: [
      'Importo libero a scelta del donatore',
      'Valida per tutti i prodotti e servizi in bottega',
      'Utilizzabile anche per ordinazioni personalizzate',
      'Senza scadenza di occasione: va bene tutto l\'anno',
      'Contattaci per acquistarla o riceverla digitalmente',
    ],
    colore: 'bg-emerald-50 border-emerald-300',
    iconColore: 'text-emerald-700',
    accent: 'bg-emerald-700',
  },
];

const WHATSAPP_RICORRENZE = {
  it: 'Ciao! Vorrei informazioni su una torta, un cesto regalo o una gift card.',
  en: 'Hi! I would like information about a cake, gift basket or gift card.',
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
            {language === 'it' ? 'Su ordinazione' : 'Made to order'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {language === 'it' ? 'Ricorrenze' : 'Celebrations'}
          </h1>
          <p className="text-emerald-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {language === 'it'
              ? 'Torte, cesti regalo e gift card per compleanni, feste e regali.'
              : 'Cakes, gift baskets and gift cards for birthdays, parties and presents.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {serviziSpeciali.map((servizio, i) => {
            const Icon = servizio.icon;
            const isExpanded = expandedServizio === i;
            return (
              <div
                key={i}
                className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${servizio.colore} ${isExpanded ? 'shadow-xl' : 'shadow-xs'}`}
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

        <CestiNatale language={language} />

        <div className="mt-10 sm:mt-16 bg-emerald-700 rounded-2xl p-6 sm:p-10 text-white text-center">
          <Gift className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-emerald-300" />
          <h2 className="text-xl sm:text-3xl font-bold mb-3">
            {language === 'it' ? 'Hai in mente una festa o un regalo?' : 'Planning a party or a gift?'}
          </h2>
          <p className="text-emerald-200 mb-7 max-w-xl mx-auto">
            {language === 'it'
              ? 'Scrivici con un po\' di anticipo.'
              : 'Message us a little in advance.'}
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
            <ChiamaMenu
              language={language}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-950 transition text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
