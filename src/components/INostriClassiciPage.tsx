import { COMPANY } from '../lib/company';
import { ShoppingBasket, Clock, Star, Utensils, CalendarDays, RefreshCw } from 'lucide-react';

interface Props {
  language: string;
}

const classiciHero = [
  {
    nome: 'Frutta e Verdura di stagione',
    desc: 'Frutta e verdura fresca di stagione, scelta ogni giorno con cura tra i prodotti dei nostri fornitori di fiducia.',
    img: '/bancone_frutta_e_verdura.webp',
    tag: 'Ogni giorno',
    tagColore: 'bg-green-600',
  },
  {
    nome: 'Gastronomia vegetariana o vegana',
    desc: 'Il nostro banco gastronomia è il cuore della bottega. Piatti pronti preparati ogni giorno con ingredienti freschi e selezionati.',
    img: '/banco_gastronomia.webp',
    tag: 'Martedì - Sabato',
    tagColore: 'bg-emerald-600',
  },
];

const classici = [
  {
    nome: 'Pane fresco di forno',
    desc: 'Quattro fornitori locali diversi consegnano ogni mattina. Integrale, di farro, con semi, al grano antico — ogni giorno una selezione fresca.',
    img: '/foto_pane.webp',
    tag: 'Ogni mattina',
    tagColore: 'bg-amber-500',
  },
  {
    nome: 'Cassetta del Venerdì',
    desc: 'Ogni venerdì una cassetta di frutta e verdura: 6 tipi di verdura e 2 varietà di frutta. Prodotti di stagione scelti da produttori locali di fiducia, al prezzo di 20€. Prenotala entro mercoledì sera.',
    img: '/cassetta.webp',
    tag: 'Ogni venerdì',
    tagColore: 'bg-orange-500',
  },
  {
    nome: 'Tavolini per il pranzo',
    desc: 'Vieni a pranzare da noi! I nostri tavolini sono disponibili per gustare in tranquillità i piatti caldi o freddi del banco gastronomia.',
    img: '/tavoli_pranzo_mobile.webp',
    tag: 'Martedì - Sabato',
    tagColore: 'bg-blue-600',
  },
];

export default function INostriClassiciPage({ language }: Props) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="relative bg-emerald-700 text-white py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/banco_gastronomia.webp')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-emerald-500/30 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-semibold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            {language === 'it' ? 'La tradizione della bottega' : 'The store tradition'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {language === 'it' ? 'I Nostri Classici' : 'Our Classics'}
          </h1>
          <p className="text-emerald-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {language === 'it'
              ? 'I prodotti e le preparazioni che non mancano mai. La nostra proposta settimanale e i grandi classici che ci caratterizzano da sempre.'
              : 'The products and preparations that are always available. Our weekly offer and the great classics that have defined us since day one.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-7 h-7 text-emerald-600" />
            <h2 className="text-xl sm:text-3xl font-bold text-emerald-800">
              {language === 'it' ? 'La proposta della settimana' : 'This week\'s offer'}
            </h2>
          </div>
          <p className="text-stone-500 text-base mb-8 max-w-2xl">
            {language === 'it'
              ? 'La nostra gastronomia cambia ogni settimana, seguendo la stagione e quello che ci porta il territorio. Rimangono sempre i piatti classici che ci contraddistinguono, affiancati da nuove preparazioni ogni volta diverse.'
              : 'Our deli changes every week, following the season and local availability. The classic dishes that define us are always there, alongside new preparations each time.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 flex flex-col gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-800 text-lg mb-2">
                  {language === 'it' ? 'I piatti cambiano ogni settimana' : 'Dishes change every week'}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {language === 'it'
                    ? 'Ogni settimana prepariamo nuove proposte di gastronomia vegetariana e vegana, sempre diverse, sempre di stagione. Non troverai mai lo stesso menu due settimane di fila.'
                    : 'Every week we prepare new vegetarian and vegan dishes, always different, always seasonal. You\'ll never find the same menu two weeks in a row.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
                  {language === 'it' ? 'Martedì — Venerdì' : 'Tuesday — Friday'}
                </div>
                <h3 className="font-bold text-emerald-800 text-lg mb-2">
                  {language === 'it' ? 'Proposta del pranzo' : 'Lunch of the day'}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {language === 'it'
                    ? 'Ogni giorno a pranzo una proposta diversa: un piatto caldo o freddo dal banco gastronomia, da mangiare ai nostri tavolini o da portare a casa.'
                    : 'Every day at lunch, a different dish: hot or cold from the deli counter, to enjoy at our tables or take away.'}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-7 flex flex-col gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
                  {language === 'it' ? 'Ogni sabato' : 'Every Saturday'}
                </div>
                <h3 className="font-bold text-emerald-800 text-lg mb-2">
                  {language === 'it' ? 'Menu speciale del sabato' : 'Saturday special menu'}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {language === 'it'
                    ? 'Il sabato è il giorno speciale della settimana: proponiamo un menu dedicato, con preparazioni più elaborate e una selezione più ricca rispetto ai giorni feriali.'
                    : 'Saturday is the special day of the week: we offer a dedicated menu, with more elaborate preparations and a richer selection than on weekdays.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <Star className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-emerald-800 text-sm leading-relaxed">
              {language === 'it'
                ? 'Accanto alle proposte variabili, trovi sempre i nostri classici: il banco frutta e verdura fresca, il pane dei fornitori locali, l\'hummus, la farinata di ceci e le preparazioni che ci identificano da sempre.'
                : 'Alongside the rotating dishes, you\'ll always find our classics: the fresh fruit and vegetable counter, local bakery bread, hummus, chickpea farinata, and the preparations that have always defined us.'}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-7 h-7 text-emerald-600" />
            <h2 className="text-xl sm:text-3xl font-bold text-emerald-800">
              {language === 'it' ? 'I classici della bottega' : 'Store classics'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-7 mb-7">
            {classiciHero.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group border border-stone-100">
                <div className="relative h-72 sm:h-[28rem] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.nome}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  <span className={`absolute top-4 left-4 ${c.tagColore} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow`}>
                    {c.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 drop-shadow">{c.nome}</h3>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-7">
            {classici.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-stone-100">
                <div className="relative h-52 sm:h-64 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.nome}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${c.tagColore} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                    {c.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">{c.nome}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 bg-stone-100 rounded-2xl p-6 sm:p-10 text-center border border-stone-200">
          <ShoppingBasket className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3">
            {language === 'it' ? 'Prenota i tuoi prodotti' : 'Reserve your products'}
          </h2>
          <p className="text-stone-600 mb-6 sm:mb-7 max-w-lg mx-auto text-sm sm:text-base">
            {language === 'it'
              ? 'Contattaci su WhatsApp per ordinare i tuoi prodotti preferiti o prenotare la cassetta del venerdì.'
              : 'Contact us on WhatsApp to order your favourite products or pre-book the Friday box.'}
          </p>
          <a
            href={`https://wa.me/${COMPANY.mobile.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-500 transition shadow-lg text-sm sm:text-base"
          >
            {language === 'it' ? 'Ordina su WhatsApp' : 'Order on WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
}
