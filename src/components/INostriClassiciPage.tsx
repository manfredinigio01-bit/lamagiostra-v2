import { whatsappLink } from '../lib/company';
import InstagramPost from './InstagramPost';
import AllergeniTabella from './AllergeniTabella';
import { useState } from 'react';
import { ShoppingBasket, Clock, Star, Utensils, CalendarDays, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  language: string;
}

const classiciHero = [
  {
    nome: 'Frutta e Verdura di stagione',
    nome_en: 'Seasonal fruit and vegetables',
    desc: 'Frutta e verdura fresca di stagione, scelta ogni giorno con cura tra i prodotti dei nostri fornitori di fiducia.',
    desc_en: 'Fresh seasonal fruit and vegetables, carefully chosen every day from the products of our trusted suppliers.',
    img: '/bancone_frutta_e_verdura.webp',
    tag: 'Ogni giorno',
    tag_en: 'Every day',
    tagColore: 'bg-emerald-700',
  },
  {
    nome: 'Gastronomia vegetariana o vegana',
    nome_en: 'Vegetarian or vegan deli',
    desc: 'Il nostro banco gastronomia è il cuore della bottega. Piatti pronti preparati ogni giorno con ingredienti freschi e selezionati.',
    desc_en: 'Our deli counter is the heart of the shop. Ready-made dishes prepared every day with fresh, carefully selected ingredients.',
    img: '/banco_gastronomia.webp',
    tag: 'Martedì - Sabato',
    tag_en: 'Tuesday - Saturday',
    tagColore: 'bg-emerald-600',
  },
];

const classici = [
  {
    nome: 'Pane fresco ogni giorno',
    nome_en: 'Fresh bread every day',
    desc: 'Quattro diversi fornai locali consegnano il pane ogni mattina offrendovi un\'ampia selezione: pane integrale, pane di farro, pane di grano saraceno, pane di avena, pane con semi di lino e semi misti, pane ai grani antichi.',
    desc_en: 'Four different local bakers deliver bread every morning, offering a wide choice: wholemeal, spelt, buckwheat, oat, flaxseed and mixed-seed, and ancient-grain bread.',
    img: '/foto_pane.webp',
    tag: 'Ogni mattina',
    tag_en: 'Every morning',
    tagColore: 'bg-amber-700',
  },
  {
    nome: 'Cassetta del Venerdì',
    nome_en: 'The Friday Box',
    desc: 'Ogni venerdì una cassetta di frutta e verdura: 6 tipi di verdura e 2 varietà di frutta. Prodotti di stagione scelti da produttori locali di fiducia, al prezzo di 20€. Prenotala entro mercoledì sera.',
    desc_en: 'Every Friday a box of fruit and vegetables: 6 kinds of vegetables and 2 varieties of fruit. Seasonal products chosen from trusted local producers, for €20. Order it by Wednesday evening.',
    img: '/cassetta.webp',
    tag: 'Ogni venerdì',
    tag_en: 'Every Friday',
    tagColore: 'bg-orange-700',
  },
  {
    nome: 'Tavolini per il pranzo',
    nome_en: 'Lunch tables',
    desc: 'Vieni a pranzare da noi! I nostri tavolini sono disponibili per gustare in tranquillità i piatti caldi o freddi del banco gastronomia.',
    desc_en: 'Come and have lunch with us! Our tables are available to enjoy the hot or cold dishes from the deli counter in peace.',
    img: '/tavoli_pranzo_mobile.webp',
    tag: 'Martedì - Sabato',
    tag_en: 'Tuesday - Saturday',
    tagColore: 'bg-blue-600',
  },
];

export default function INostriClassiciPage({ language }: Props) {
  const [sabatoAperto, setSabatoAperto] = useState(false);
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
              ? 'Il banco gastronomia cambia ogni settimana, seguendo la stagione e quello che porta il territorio, ad eccezione di alcuni piatti classici che ci contraddistinguono, disponibili ogni giorno.'
              : 'Our deli counter changes every week, following the season and what the land brings, except for a few classic dishes that define us, available every day.'}
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
                    ? 'Ogni giorno nuove proposte di gastronomia vegetariana e vegana, secondo stagionalità e disponibilità di materie prime.'
                    : 'New vegetarian and vegan dishes every day, following the seasons and the availability of ingredients.'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
                  {language === 'it' ? 'Martedì — Sabato' : 'Tuesday — Saturday'}
                </div>
                <h3 className="font-bold text-emerald-800 text-lg mb-2">
                  {language === 'it' ? 'Proposta del pranzo' : 'Lunch of the day'}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {language === 'it'
                    ? 'Da martedì a sabato, a pranzo, un menù diverso: piatti caldi e freddi dal banco gastronomia, da mangiare qui o portare in ufficio e a casa.'
                    : 'From Tuesday to Saturday, a different lunch menu: hot and cold dishes from the deli counter, to eat here or take to the office or home.'}
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
                  {language === 'it' ? 'Il menu del sabato' : 'The Saturday menu'}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {language === 'it'
                    ? 'Ogni sabato è possibile ordinare un menu completo e bilanciato, dall\'antipasto al dolce, pensato da noi apposta per il weekend.'
                    : 'Every Saturday you can order a complete, balanced menu, from starter to dessert, designed by us especially for the weekend.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSabatoAperto((a) => !a)}
                  aria-expanded={sabatoAperto}
                  aria-controls="menu-sabato"
                  className="mt-4 inline-flex items-center gap-1.5 text-amber-800 font-semibold text-sm hover:underline"
                >
                  {sabatoAperto
                    ? language === 'it' ? 'Chiudi il menu di sabato' : 'Close the Saturday menu'
                    : language === 'it' ? 'Vedi il menu di sabato' : 'See the Saturday menu'}
                  {sabatoAperto ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {sabatoAperto && (
            <div id="menu-sabato" className="mb-8 scroll-mt-24">
              <InstagramPost
                tipo="sabato"
                language={language}
                titolo={language === 'it' ? 'Il menu di questo sabato' : "This Saturday's menu"}
                riserva={
                  language === 'it'
                    ? 'Il menu del sabato lo pubblichiamo ogni settimana su Facebook e Instagram: scrivici su WhatsApp per ordinarlo.'
                    : 'We post the Saturday menu every week on Facebook and Instagram: message us on WhatsApp to order it.'
                }
              />
            </div>
          )}

          <div id="questa-settimana" className="grid md:grid-cols-2 gap-6 mb-8 scroll-mt-24">
            <InstagramPost
              tipo="menu"
              language={language}
              titolo={language === 'it' ? 'Il menu di questa settimana' : "This week's menu"}
              riserva={
                language === 'it'
                  ? 'Il menu cambia ogni settimana: lo pubblichiamo ogni volta su Facebook, Instagram e WhatsApp.'
                  : 'The menu changes every week: we post it each time on Facebook, Instagram and WhatsApp.'
              }
            />
            <InstagramPost
              tipo="cassetta"
              language={language}
              titolo={language === 'it' ? 'Nella cassetta di questa settimana' : "In this week's Friday box"}
              riserva={
                language === 'it'
                  ? 'Il contenuto della cassetta del venerdì cambia ogni settimana: lo pubblichiamo su Facebook e Instagram.'
                  : 'The contents of the Friday box change every week: we post them on Facebook and Instagram.'
              }
            />
          </div>

          <p className="-mt-4 mb-8 text-sm text-stone-500">
            {language === 'it' ? 'Allergie o intolleranze? ' : 'Allergies or intolerances? '}
            <a href="#allergeni" className="text-emerald-700 font-semibold hover:underline">
              {language === 'it' ? 'Leggi gli allergeni ↓' : 'Read about allergens ↓'}
            </a>
          </p>

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
                    alt={language === 'it' ? c.nome : c.nome_en}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  <span className={`absolute top-4 left-4 ${c.tagColore} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow`}>
                    {language === 'it' ? c.tag : c.tag_en}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 drop-shadow">{language === 'it' ? c.nome : c.nome_en}</h3>
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">{language === 'it' ? c.desc : c.desc_en}</p>
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
                    alt={language === 'it' ? c.nome : c.nome_en}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${c.tagColore} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                    {language === 'it' ? c.tag : c.tag_en}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">{language === 'it' ? c.nome : c.nome_en}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{language === 'it' ? c.desc : c.desc_en}</p>
                  {c.img === '/cassetta.webp' && (
                    <a href="#questa-settimana" className="mt-3 inline-block text-emerald-700 font-semibold text-sm hover:underline">
                      {language === 'it' ? 'Cosa c’è questa settimana ↑' : 'What’s in it this week ↑'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AllergeniTabella language={language} />

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
            href={whatsappLink(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-800 transition shadow-lg text-sm sm:text-base"
          >
            {language === 'it' ? 'Ordina su WhatsApp' : 'Order on WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
}
