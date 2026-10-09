import { useState, useEffect, useCallback } from 'react';
import { ShoppingBasket, Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, ChefHat } from 'lucide-react';
import OptimizedImage from './components/OptimizedImage';
import Header from './components/Header';
import StaffPage from './components/StaffPage';
import RicorrenzePage from './components/RicorrenzePage';
import INostriClassiciPage from './components/INostriClassiciPage';
import FornitoriPage from './components/FornitoriPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import CookiePolicyPage from './components/CookiePolicyPage';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import { COMPANY, whatsappLink } from './lib/company';
import { pageFromPath, pathFor, type Page } from './lib/routes';
import { usePageMeta, useStructuredData } from './lib/seo';

const translations = {
  it: {
    home: 'Home',
    about: 'Chi Siamo',
    products: 'Prodotti',
    gallery: 'Galleria',
    contact: 'Contatti',
    welcome: 'Benvenuti a La Magiostra',
    tagline: 'Dal 1987, portiamo nel vostro territorio i migliori prodotti selezionati, frutta e verdura fresca di stagione, e deliziose preparazioni vegetariane e vegane.',
    getInTouch: 'Contattaci',
    ourStory: 'La Nostra Storia',
    storyText1: 'La Magiostra nasce nel 1987 come spaccio agricolo della Cooperativa Iris di cui Chiara era socia lavoratrice. Nel 1995 Iris decide di cedere il negozio e Chiara inizia l\'avventura da titolare.',
    storyText2: 'Negli anni novanta è stato il primo punto vendita a Cremona che si occupava di agricoltura naturale e di cultura contadina, di sana alimentazione e di benessere delle persone e dell\'ambiente. Chiara porta sui suoi scaffali i prodotti di piccoli produttori locali con cui ha un rapporto diretto. Prodotti freschi e di alta qualità ricchi di sostanze nutrienti. Frutta, verdura e pane arrivano in negozio tutte le mattine.',
    storyText3: 'Nel 2018 Chiara inizia una nuova scommessa, trasformare i prodotti proposti nel negozio in piatti sani e di qualità. La Magiostra diventa così in poco tempo un punto di riferimento a Cremona per chi vuole gustare una cucina vegetariana e vegana. Disponibilità, ascolto e attenzione per il cliente, sono alcuni dei punti di forza riconosciuti da chi da anni entra in negozio.',
    communityFirst: 'Comunità al Centro',
    communityDesc: 'Al servizio di Cremona dal 1987',
    qualityFocus: 'Impegno di Qualità',
    qualityDesc: 'Fornitori selezionati con cura',
    organic: 'Qualità e Selezione',
    organicDesc: 'Prodotti selezionati con cura',
    freshDaily: 'Fresco Ogni Giorno',
    freshDesc: 'Piatti pronti fatti in casa',
    whatWe: 'Cosa Offriamo',
    whatWeDesc: 'Dalla frutta e verdura fresca di stagione ai piatti vegetariani e vegani fatti in casa, abbiamo tutto ciò che serve per uno stile di vita sano e sostenibile.',
    organicProducts: 'Pane fresco',
    organicProductsDesc: 'Un\'ampia selezione di prodotti di qualità, dalle basi di cucina agli articoli speciali. Collaboriamo con fornitori di fiducia che condividono il nostro impegno per la qualità e la sostenibilità.',
    gastronomy: 'Gastronomia e Piatti Pronti',
    gastronomyDesc: 'Al banco della gastronomia troverete ogni giorno i nostri grandi classici: farinata di ceci, hummus di ceci, budini di miglio e insalata russa. Ogni giorno condividiamo su Facebook, Instagram e WhatsApp le proposte della settimana. Il venerdì pubblichiamo la nostra cassetta di frutta e verdura, il sabato un menù speciale.',
    freshProduce: 'Frutta e Verdura Fresca',
    freshProduceDesc: 'Frutta e verdura di stagione, scelte con cura da produttori locali di fiducia. Ogni articolo deve rispettare i nostri standard di freschezza e sapore.',
    visitUs: 'Visita o Contattaci',
    visitUsDesc: 'Ci piacerebbe sentire da te. Vieni nel nostro negozio o contattaci.',
    location: 'Indirizzo',
    phone: 'Telefono',
    email: 'Email',
    hours: 'Orari di Apertura',
    orderNow: 'Ordina Ora su WhatsApp',
    tuesdayFriday: 'Martedì - Venerdì:',
    saturday: 'Sabato:',
    closedSunday: 'Domenica e Lunedì: Chiuso',
    pioneering: 'Negozio di alimentari a Cremona dal 1987',
    mobile: 'Mobile / WhatsApp:',
    landline: 'Telefono Fisso:',
    followUs: 'Seguici sui Social',
    galleryTitle: 'Il Nostro Negozio',
    galleryDesc: 'Uno sguardo alla nostra bottega, al banco gastronomia, alla frutta e verdura fresca e ai nostri tavolini.',
    galleryTavolini: 'I Nostri Tavolini',
    galleryGastronomia: 'Banco Gastronomia',
    galleryCassetta: 'La Cassetta del Venerdì',
    galleryFrutta: 'Frutta e Verdura',
    galleryEsterno: 'Il Negozio',
    cassettaLabel: 'Ogni Venerdì',
    cookingCourses: 'Corsi di Cucina in Bottega',
    cookingCoursesDesc: 'Impara a cucinare direttamente nella nostra bottega con Chiara e il nostro staff. Corsi pratici e conviviali dedicati alla cucina vegetariana e vegana, con ingredienti freschi selezionati da noi. Un\'esperienza unica da condividere con amici e familiari.',
    catering: 'Catering Fuori Porta',
    cateringDesc: 'Portiamo la nostra cucina dove vuoi tu. Organizziamo piccoli catering per eventi privati, aziendali e ricorrenze speciali. Menu su misura con i nostri piatti vegetariani e vegani, preparati con cura e passione per ogni occasione.',
  },
  en: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    gallery: 'Gallery',
    contact: 'Contact',
    welcome: 'Welcome to La Magiostra',
    tagline: 'Since 1987, we bring you the finest carefully selected products, fresh seasonal produce, and delicious vegetarian and vegan meals.',
    getInTouch: 'Get in Touch',
    ourStory: 'Our Story',
    storyText1: 'La Magiostra was born in 1987 as an agricultural outlet of the Iris Cooperative, where Chiara was a working member. In 1995, Iris decided to sell the store and Chiara began her adventure as owner.',
    storyText2: 'In the 1990s, it was the first retail point in Cremona dedicated to natural agriculture and rural culture, healthy eating, and well-being for people and the environment. Chiara sources products from small local producers with whom she has direct relationships. Fresh, high-quality products rich in nutrients. Fruits, vegetables, and bread arrive at the store every morning.',
    storyText3: 'In 2018, Chiara started a new challenge, transforming the products offered in the store into healthy and quality dishes. La Magiostra quickly became a reference point in Cremona for those who want to enjoy vegetarian and vegan cuisine. Availability, listening, and attention to customers are some of the strengths recognized by those who have been coming to the store for years.',
    communityFirst: 'Community First',
    communityDesc: 'Serving Cremona since 1987',
    qualityFocus: 'Quality Focus',
    qualityDesc: 'Carefully selected suppliers',
    organic: 'Quality & Selection',
    organicDesc: 'Carefully selected products',
    freshDaily: 'Fresh Daily',
    freshDesc: 'Homemade ready meals',
    whatWe: 'What We Offer',
    whatWeDesc: 'From fresh seasonal produce to homemade vegetarian and vegan ready meals, we have everything you need for a healthy and sustainable lifestyle.',
    organicProducts: 'Selected Products',
    organicProductsDesc: 'A comprehensive selection of quality products, from staple items to specialty goods. We partner with trusted suppliers who share our commitment to quality and sustainability.',
    gastronomy: 'Gastronomia & Ready Meals',
    gastronomyDesc: 'At the deli counter you will find our signature classics every day: chickpea farinata, chickpea hummus, millet puddings and Russian salad. Every day we share the week\'s specials on Facebook, Instagram and WhatsApp. On Fridays we publish our seasonal fruit and vegetable box, on Saturdays a special menu.',
    freshProduce: 'Fresh Produce',
    freshProduceDesc: 'Seasonal fruit and vegetables, carefully chosen from trusted local producers. Every item has to meet our standards for freshness and flavor.',
    visitUs: 'Visit Us or Get in Touch',
    visitUsDesc: 'We would love to hear from you. Come by our store or contact us.',
    location: 'Location',
    phone: 'Phone',
    email: 'Email',
    hours: 'Opening Hours',
    orderNow: 'Order Now on WhatsApp',
    tuesdayFriday: 'Tuesday - Friday:',
    saturday: 'Saturday:',
    closedSunday: 'Sunday & Monday: Closed',
    pioneering: 'Grocery store in Cremona since 1987',
    mobile: 'Mobile / WhatsApp:',
    landline: 'Landline:',
    followUs: 'Follow Us',
    galleryTitle: 'Our Shop',
    galleryDesc: 'A glimpse into our store, the deli counter, fresh fruit and vegetables, and our dining tables.',
    galleryTavolini: 'Our Tables',
    galleryGastronomia: 'Deli Counter',
    galleryCassetta: 'Friday Box',
    galleryFrutta: 'Fruit & Vegetables',
    galleryEsterno: 'The Shop',
    cassettaLabel: 'Every Friday',
    cookingCourses: 'Cooking Courses in Store',
    cookingCoursesDesc: 'Learn to cook directly in our store with Chiara and our staff. Hands-on and convivial courses dedicated to vegetarian and vegan cuisine, using fresh ingredients selected by us. A unique experience to share with friends and family.',
    catering: 'Outside Catering',
    cateringDesc: 'We bring our kitchen to you. We organise small catering events for private, corporate and special occasions. Bespoke menus with our vegetarian and vegan dishes, prepared with care and passion for every event.',
  }
};

function scrollToHashOrTop() {
  // aspetta che la nuova pagina sia disegnata, poi scorre
  window.setTimeout(() => {
    const id = window.location.hash.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, 0);
}

function App() {
  const [language, setLanguage] = useState('it');
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const t = translations[language as keyof typeof translations];

  usePageMeta(page, language);
  useStructuredData();

  // Vai a una pagina cambiando l'indirizzo nella barra (senza ricaricare il sito).
  const navigate = useCallback((target: Page, anchor?: string) => {
    if (target === 'not-found') return;
    const url = pathFor(target) + (anchor ? `#${anchor}` : '');
    if (url !== window.location.pathname + window.location.hash) {
      window.history.pushState({}, '', url);
    }
    setPage(target);
    scrollToHashOrTop();
  }, []);

  // Pulsanti "indietro/avanti" del browser
  useEffect(() => {
    const onPop = () => {
      setPage(pageFromPath(window.location.pathname));
      scrollToHashOrTop();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Apertura diretta di un indirizzo con #contatti ecc.
  useEffect(() => {
    if (window.location.hash) scrollToHashOrTop();
  }, []);

  const whatsappHref = whatsappLink(language);

  function renderPage() {
    switch (page) {
      case 'staff':
        return <StaffPage language={language} />;
      case 'ricorrenze':
        return <RicorrenzePage language={language} />;
      case 'classici':
        return <INostriClassiciPage language={language} />;
      case 'fornitori':
        return <FornitoriPage language={language} />;
      case 'privacy':
        return <PrivacyPolicyPage language={language} />;
      case 'cookie':
        return <CookiePolicyPage language={language} />;
      case 'not-found':
        return <NotFoundPage language={language} onNavigate={navigate} />;
      default:
        return (
          <>
            <section id="home" className="bg-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                <div>
                  <p className="text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-4">
                    {language === 'it' ? 'Dal 1987 · Cremona' : 'Since 1987 · Cremona'}
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-950 mb-5 leading-[1.1]">
                    {t.welcome}
                  </h1>
                  <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-xl">
                    {t.tagline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {t.orderNow}
                    </a>
                    <a
                      href={`tel:${COMPANY.mobile.tel}`}
                      className="inline-flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800 px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {language === 'it' ? 'Chiama' : 'Call'}
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 text-emerald-800 px-4 py-3.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                    >
                      {t.getInTouch}
                    </a>
                  </div>
                </div>
                <picture>
                  <source media="(min-width: 768px)" srcSet="/tavoli_pranzo.webp" type="image/webp" />
                  <img
                    src="/tavoli_pranzo_mobile.webp"
                    alt={language === 'it' ? 'I tavolini della bottega La Magiostra' : 'The tables at La Magiostra'}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full aspect-[4/3] lg:aspect-[5/4] object-cover rounded-2xl bg-stone-200"
                  />
                </picture>
              </div>
            </section>

            <section aria-label={language === 'it' ? 'Informazioni utili' : 'Useful information'} className="bg-emerald-900 text-emerald-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid sm:grid-cols-3 gap-5 sm:gap-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-emerald-300 flex-shrink-0" />
                  <a href={COMPANY.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <span className="block font-semibold text-white">{t.location}</span>
                    Via Grado 1, 26100 Cremona
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-emerald-300 flex-shrink-0" />
                  <div>
                    <span className="block font-semibold text-white">{t.hours}</span>
                    {language === 'it' ? 'Mar–Ven' : 'Tue–Fri'} {COMPANY.hours.tueFri}
                    <br />
                    {language === 'it' ? 'Sab' : 'Sat'} {COMPANY.hours.sat}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChefHat className="w-5 h-5 mt-1 text-emerald-300 flex-shrink-0" />
                  <div>
                    <span className="block font-semibold text-white">
                      {language === 'it' ? 'Pranzo in bottega' : 'Lunch in store'}
                    </span>
                    {language === 'it' ? 'Martedì – Sabato · 12:00–14:00' : 'Tue – Sat · 12:00–14:00'}
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="py-14 sm:py-20 bg-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-5 gap-8 md:gap-14 items-start">
                  <div className="md:col-span-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-6">{t.ourStory}</h2>
                    <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">{t.storyText1}</p>
                    <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">{t.storyText2}</p>
                    <p className="text-stone-700 text-base sm:text-lg leading-relaxed">{t.storyText3}</p>
                  </div>
                  <figure className="md:col-span-2 w-full max-w-sm mx-auto md:mx-0 md:ml-auto">
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                      <OptimizedImage
                        src="/foto_chiara_il_boss.webp"
                        alt={language === 'it' ? 'Chiara, titolare de La Magiostra' : 'Chiara, owner of La Magiostra'}
                        className="absolute inset-0 w-full h-full"
                        style={{ objectPosition: '50% 30%' }}
                      />
                    </div>
                    <figcaption className="mt-3">
                      <span className="font-display font-bold text-lg text-emerald-900">Chiara</span>
                      <span className="block text-stone-500 text-sm">
                        {language === 'it' ? 'Titolare de La Magiostra' : 'Owner of La Magiostra'}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </section>

            <section id="gallery" className="py-14 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-8 sm:mb-12">{t.galleryTitle}</h2>
                <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:col-span-2">
                    <OptimizedImage src="/foto_nego_2.webp" alt={t.galleryEsterno} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 text-white font-semibold text-lg drop-shadow">{t.galleryEsterno}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80">
                    <OptimizedImage src="/banco_gastronomia.webp" alt={t.galleryGastronomia} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 text-white font-semibold text-lg drop-shadow">{t.galleryGastronomia}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80">
                    <OptimizedImage src="/bancone_frutta_e_verdura.webp" alt={t.galleryFrutta} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 text-white font-semibold text-lg drop-shadow">{t.galleryFrutta}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:col-span-2">
                    <OptimizedImage src="/tavoli_pranzo_mobile.webp" alt={t.galleryTavolini} className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-emerald-950/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
                      <p className="text-emerald-200 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
                        {language === 'it' ? 'Martedì – Sabato · 12:00–14:00' : 'Tue – Sat · 12:00–14:00'}
                      </p>
                      <p className="font-display text-white font-bold text-2xl sm:text-3xl leading-tight drop-shadow mb-2">
                        {language === 'it' ? 'Fermati a pranzare da noi!' : 'Stay for lunch with us!'}
                      </p>
                      <p className="text-emerald-50 text-sm sm:text-base leading-relaxed drop-shadow max-w-md">
                        {language === 'it'
                          ? 'I nostri tavolini ti aspettano. Gusta i piatti caldi del banco gastronomia comodamente seduto in bottega.'
                          : 'Our tables are waiting for you. Enjoy warm dishes from the deli counter, comfortably seated in store.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="products" className="py-14 sm:py-20 bg-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-4">{t.whatWe}</h2>
                <p className="text-stone-600 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl">{t.whatWeDesc}</p>
                <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
                  <a
                    href={pathFor('classici')}
                    onClick={(e) => { e.preventDefault(); navigate('classici'); }}
                    className="block bg-white rounded-2xl border border-emerald-900/10 overflow-hidden hover:border-emerald-700/40 transition-colors"
                  >
                    <OptimizedImage src="/banco_gastronomia.webp" alt={language === 'it' ? 'I Nostri Classici' : 'Our Classics'} className="w-full h-56 sm:h-72" />
                    <div className="p-5">
                      <h3 className="flex items-center gap-2 text-xl font-bold text-emerald-900 mb-2">
                        <ShoppingBasket className="w-5 h-5 text-emerald-700" />
                        {language === 'it' ? 'I Nostri Classici' : 'Our Classics'}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-3">
                        {language === 'it'
                          ? 'Frutta e verdura fresca, gastronomia vegetariana e vegana, pane artigianale ogni mattina e la cassetta del venerdì. Scopri tutto ciò che trovi ogni giorno in bottega.'
                          : 'Fresh fruit and vegetables, vegetarian and vegan deli, artisan bread every morning and the Friday box. Discover everything you find daily in our store.'}
                      </p>
                      <span className="text-emerald-700 font-semibold text-sm">
                        {language === 'it' ? 'Scopri di più →' : 'Learn more →'}
                      </span>
                    </div>
                  </a>

                  <div className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden">
                    <OptimizedImage src="/corso_cucina.webp" alt={t.cookingCourses} className="w-full h-56 sm:h-72" />
                    <div className="p-5">
                      <h3 className="flex items-center gap-2 text-xl font-bold text-emerald-900 mb-2">
                        <ChefHat className="w-5 h-5 text-emerald-700" />
                        {t.cookingCourses}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{t.cookingCoursesDesc}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-emerald-900/10 overflow-hidden">
                    <OptimizedImage src="/catering_fuori_porta.webp" alt={t.catering} className="w-full h-56 sm:h-72" />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-emerald-900 mb-2">{t.catering}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{t.cateringDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="py-14 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-3">{t.visitUs}</h2>
                  <p className="text-stone-600 text-base sm:text-lg">{t.visitUsDesc}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  <div className="bg-cream border border-emerald-900/10 p-6 rounded-2xl">
                    <MapPin className="w-6 h-6 mb-3 text-emerald-700" />
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">{t.location}</h3>
                    <a
                      href={COMPANY.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-emerald-800 transition-colors underline decoration-emerald-300 underline-offset-2"
                    >
                      La Magiostra<br />Via Grado 1<br />26100 Cremona, Italy
                    </a>
                  </div>
                  <div className="bg-cream border border-emerald-900/10 p-6 rounded-2xl">
                    <Phone className="w-6 h-6 mb-3 text-emerald-700" />
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">{t.phone}</h3>
                    <p className="text-stone-500 text-sm font-semibold">{t.mobile}</p>
                    <a href={`tel:${COMPANY.mobile.tel}`} className="text-stone-700 hover:text-emerald-800 transition-colors block mb-2">{COMPANY.mobile.display}</a>
                    <p className="text-stone-500 text-sm font-semibold">{t.landline}</p>
                    <a href={`tel:${COMPANY.landline.tel}`} className="text-stone-700 hover:text-emerald-800 transition-colors block">{COMPANY.landline.display}</a>
                  </div>
                  <div className="bg-cream border border-emerald-900/10 p-6 rounded-2xl">
                    <Mail className="w-6 h-6 mb-3 text-emerald-700" />
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">{t.email}</h3>
                    <a href={`mailto:${COMPANY.email}`} className="text-stone-700 hover:text-emerald-800 transition-colors break-all">{COMPANY.email}</a>
                  </div>
                  <div className="bg-cream border border-emerald-900/10 p-6 rounded-2xl">
                    <Clock className="w-6 h-6 mb-3 text-emerald-700" />
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">{t.hours}</h3>
                    <div className="space-y-1 text-stone-700 text-sm">
                      <p><span className="font-semibold">{t.tuesdayFriday}</span> {COMPANY.hours.tueFri}</p>
                      <p><span className="font-semibold">{t.saturday}</span> {COMPANY.hours.sat}</p>
                      <p>{t.closedSunday}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.orderNow}
                  </a>
                  <a
                    href={`tel:${COMPANY.mobile.tel}`}
                    className="inline-flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800 px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {language === 'it' ? 'Chiama' : 'Call'}
                  </a>
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <span className="text-stone-500 text-sm font-semibold">{t.followUs}</span>
                    <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-emerald-700 hover:text-emerald-900 transition-colors">
                      <Instagram className="w-7 h-7" />
                    </a>
                    <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-emerald-700 hover:text-emerald-900 transition-colors">
                      <Facebook className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-emerald-900 focus:px-4 focus:py-2 focus:rounded-lg">
        {language === 'it' ? 'Vai al contenuto' : 'Skip to content'}
      </a>
      <Header
        language={language}
        page={page}
        onNavigate={navigate}
        onLanguageChange={setLanguage}
      />
      <main id="main">{renderPage()}</main>
      <Footer language={language} tagline={t.pioneering} onNavigate={navigate} />
    </div>
  );
}

export default App;
