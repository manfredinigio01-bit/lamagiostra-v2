import { useEffect } from 'react';
import { COMPANY } from './company';
import { pathFor, type Page } from './routes';

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') ?? '';

interface Meta {
  title: string;
  description: string;
  noindex?: boolean;
}

const META: Record<Page, { it: Meta; en: Meta }> = {
  home: {
    it: {
      title: 'La Magiostra – Alimentari e gastronomia vegetariana e vegana a Cremona',
      description:
        'Dal 1987 a Cremona: frutta e verdura fresca, pane, prodotti selezionati e gastronomia vegetariana e vegana fatta in casa. Via Grado 1. Vieni a trovarci o ordina su WhatsApp.',
    },
    en: {
      title: 'La Magiostra – Grocery and vegetarian & vegan deli in Cremona',
      description:
        'Since 1987 in Cremona: fresh fruit and vegetables, bread, selected products and homemade vegetarian and vegan food. Via Grado 1. Visit us or order on WhatsApp.',
    },
  },
  classici: {
    it: {
      title: 'I nostri classici – La Magiostra, Cremona',
      description:
        'Farinata di ceci, hummus, budini di miglio, frutta e verdura di stagione, pane fresco e la cassetta del venerdì: i prodotti che trovi ogni giorno da La Magiostra.',
    },
    en: {
      title: 'Our classics – La Magiostra, Cremona',
      description:
        'Chickpea farinata, hummus, millet puddings, seasonal fruit and vegetables, fresh bread and the Friday box: what you find every day at La Magiostra.',
    },
  },
  ricorrenze: {
    it: {
      title: 'Ricorrenze: torte vegane, cesti regalo e gift card – La Magiostra, Cremona',
      description:
        'Torte di compleanno vegane su ordinazione, cesti e pacchi regalo, gift card: le idee de La Magiostra per le tue ricorrenze a Cremona.',
    },
    en: {
      title: 'Special occasions: vegan cakes, gift baskets and gift cards – La Magiostra, Cremona',
      description:
        'Vegan birthday cakes to order, gift baskets and hampers, gift cards: La Magiostra ideas for your special occasions in Cremona.',
    },
  },
  fornitori: {
    it: {
      title: 'I nostri fornitori – La Magiostra, Cremona',
      description:
        'I produttori con cui lavoriamo ogni giorno: piccole aziende selezionate con cura per qualità della materia prima e rispetto della terra.',
    },
    en: {
      title: 'Our suppliers – La Magiostra, Cremona',
      description: 'The producers we work with every day: small farms and businesses chosen for the quality of their raw materials.',
    },
  },
  staff: {
    it: {
      title: 'Il nostro team – La Magiostra, Cremona',
      description: 'Le persone che ogni giorno rendono La Magiostra un posto speciale.',
    },
    en: {
      title: 'Our team – La Magiostra, Cremona',
      description: 'The people who make La Magiostra a special place every day.',
    },
  },
  privacy: {
    it: { title: 'Informativa privacy – La Magiostra', description: 'Informativa sul trattamento dei dati personali (GDPR) di La Magiostra, Cremona.' },
    en: { title: 'Privacy policy – La Magiostra', description: 'Privacy policy (GDPR) of La Magiostra, Cremona.' },
  },
  cookie: {
    it: { title: 'Cookie policy – La Magiostra', description: 'Informazioni sull\'uso di cookie e strumenti simili sul sito di La Magiostra.' },
    en: { title: 'Cookie policy – La Magiostra', description: 'Information about cookies and similar tools on the La Magiostra website.' },
  },
  'not-found': {
    it: { title: 'Pagina non trovata – La Magiostra', description: 'La pagina che cerchi non esiste.', noindex: true },
    en: { title: 'Page not found – La Magiostra', description: 'The page you are looking for does not exist.', noindex: true },
  },
};

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function metaTag(name: string, content: string, property = false) {
  const key = property ? 'property' : 'name';
  setMeta(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(key, name);
      return m;
    },
    'content',
    content,
  );
}

/** Aggiorna titolo, descrizione, lingua della pagina e indicazioni per i motori di ricerca. */
export function usePageMeta(page: Page, language: string) {
  useEffect(() => {
    const lang = language === 'en' ? 'en' : 'it';
    const meta = META[page][lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    metaTag('description', meta.description);
    metaTag('robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    metaTag('og:title', meta.title, true);
    metaTag('og:description', meta.description, true);
    metaTag('og:locale', lang === 'it' ? 'it_IT' : 'en_GB', true);
    metaTag('og:site_name', COMPANY.brand, true);
    if (SITE_URL && page !== 'not-found') {
      const url = SITE_URL + pathFor(page);
      metaTag('og:url', url, true);
      setMeta(
        'link[rel="canonical"]',
        () => {
          const l = document.createElement('link');
          l.setAttribute('rel', 'canonical');
          return l;
        },
        'href',
        url,
      );
    }
  }, [page, language]);
}

/** Dati strutturati (schema.org) per Google: nome, indirizzo, telefono e orari dell'attività. */
export function useStructuredData() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'GroceryStore',
      name: COMPANY.brand,
      legalName: COMPANY.legalName,
      description:
        'Negozio di alimentari a Cremona dal 1987 con frutta e verdura fresca, pane, prodotti selezionati e gastronomia vegetariana e vegana.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.street,
        postalCode: COMPANY.postalCode,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.province,
        addressCountry: 'IT',
      },
      telephone: COMPANY.mobile.tel,
      email: COMPANY.email,
      foundingDate: String(COMPANY.foundedYear),
      ...(SITE_URL ? { url: SITE_URL, image: `${SITE_URL}/og-image.jpg` } : {}),
      sameAs: [COMPANY.instagram, COMPANY.facebook],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '14:30' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '17:00', closes: '19:30' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:30', closes: '14:30' },
      ],
    };
    let el = document.getElementById('ld-json');
    if (!el) {
      el = document.createElement('script');
      el.id = 'ld-json';
      el.setAttribute('type', 'application/ld+json');
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, []);
}
