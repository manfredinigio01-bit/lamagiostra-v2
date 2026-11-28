import { useEffect } from 'react';
import { COMPANY } from './company.ts';
import { pathFor, PAGE_PATHS, type Page, type StaticPage } from './routes.ts';
import { fornitori, staff } from '../data/team.ts';
import { RACCONTI, txt, type Racconto } from '../data/racconti.ts';
import { IS_PROVA } from './ambiente.ts';

// (Il ?. serve perché questo file viene letto anche durante il build, fuori dal browser.)
const SITE_URL = (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') ?? '';

interface Meta {
  title: string;
  description: string;
  noindex?: boolean;
}

const META: Record<Exclude<Page, 'persona' | 'produttore' | 'racconto'>, { it: Meta; en: Meta }> = {
  home: {
    it: {
      title: 'La Magiostra – Alimentari biologici e gastronomia vegetariana e vegana a Cremona',
      description:
        'Bottega a Cremona dal 1987: prodotti biologici certificati di piccoli produttori, frutta e verdura fresca e gastronomia vegetariana e vegana. Via Grado 1.',
    },
    en: {
      title: 'La Magiostra – Organic grocery and vegetarian & vegan deli in Cremona',
      description:
        'A shop in Cremona since 1987: certified organic products from small producers, fresh fruit and vegetables, and a vegetarian and vegan deli. Via Grado 1.',
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
        'Torte vegane su ordinazione, cesti di Natale con spedizione in tutta Italia, gift card: le idee di La Magiostra per le tue ricorrenze a Cremona.',
    },
    en: {
      title: 'Celebrations: vegan cakes, gift baskets and gift cards – La Magiostra, Cremona',
      description:
        'Vegan birthday cakes to order, Christmas gift baskets shipped all over Italy, gift cards: made by La Magiostra in Cremona.',
    },
  },
  racconti: {
    it: {
      title: 'Racconti dalla bottega: storie, ricette e foto – La Magiostra, Cremona',
      description: 'Storie, ricette e foto dalla cucina e dal banco di La Magiostra: i nostri piatti vegetariani e vegani, i produttori e la vita in bottega.',
    },
    en: {
      title: 'Stories from the shop: stories, recipes and photos – La Magiostra, Cremona',
      description: 'Stories, recipes and photos from the kitchen and counter of La Magiostra: our vegetarian and vegan dishes, our producers and life in the shop.',
    },
  },
  fornitori: {
    it: {
      title: 'I nostri fornitori biologici – La Magiostra, Cremona',
      description:
        'I produttori con cui lavoriamo ogni giorno, molti certificati biologici: per ognuno l’organismo di controllo che lo certifica. Piccole aziende scelte per la qualità della materia prima.',
    },
    en: {
      title: 'Our organic suppliers – La Magiostra, Cremona',
      description: 'The producers we work with every day, many of them certified organic, with the control body for each one. Small farms and businesses chosen for the quality of their raw materials.',
    },
  },
  staff: {
    it: {
      title: 'Il nostro team – La Magiostra, Cremona',
      description: 'Le persone che lavorano ogni giorno in bottega e in cucina a La Magiostra.',
    },
    en: {
      title: 'Our team – La Magiostra, Cremona',
      description: 'The people who work every day in the shop and kitchen at La Magiostra.',
    },
  },
  dove: {
    it: {
      title: 'Come arrivare – La Magiostra, Via Grado 1, Cremona',
      description: 'Dove trovarci: La Magiostra, Via Grado 1, 26100 Cremona. Orari di apertura, mappa e contatti per arrivare in bottega.',
    },
    en: {
      title: 'Find us – La Magiostra, Via Grado 1, Cremona',
      description: 'Where to find us: La Magiostra, Via Grado 1, 26100 Cremona. Opening hours, map and contacts.',
    },
  },
  magiostra: {
    it: {
      title: 'Cosa vuol dire magiostra? – La Magiostra, Cremona',
      description: 'Magiostra in dialetto vuol dire fragola. Da dove viene la parola e perché la nostra bottega di Cremona si chiama così.',
    },
    en: {
      title: 'What does magiostra mean? – La Magiostra, Cremona',
      description: 'In the local dialect, magiostra means strawberry. Where the word comes from and why our Cremona shop bears its name.',
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

/** Titolo e descrizione di una pagina di approfondimento (persona o produttore). */
export interface DetailMeta {
  path: string;
  it: Meta;
  en: Meta;
}

type Persona = (typeof staff)[number];
type Fornitore = (typeof fornitori)[number];

export function metaPersona(member: Persona, path: string): DetailMeta {
  return {
    path,
    it: { title: `${member.name} – Il nostro team – La Magiostra`, description: member.descrizione?.it ?? `${member.name}, ${member.role.toLowerCase()} a La Magiostra, Cremona.` },
    en: { title: `${member.name} – Our team – La Magiostra`, description: member.descrizione?.en ?? `${member.name}, ${member.role_en.toLowerCase()} at La Magiostra, Cremona.` },
  };
}

export function metaFornitore(fornitore: Fornitore, path: string): DetailMeta {
  return {
    path,
    it: { title: `${fornitore.name} – I nostri fornitori – La Magiostra`, description: fornitore.descrizione?.it ?? `${fornitore.name}, uno dei produttori che riforniscono La Magiostra a Cremona.` },
    en: { title: `${fornitore.name} – Our suppliers – La Magiostra`, description: fornitore.descrizione?.en ?? `${fornitore.name}, one of the producers supplying La Magiostra in Cremona.` },
  };
}

export function metaRacconto(r: Racconto, path: string): DetailMeta {
  return {
    path,
    it: { title: `${txt(r.titolo, 'it')} – Racconti – La Magiostra`, description: txt(r.sommario, 'it') },
    en: { title: `${txt(r.titolo, 'en')} – Stories – La Magiostra`, description: txt(r.sommario, 'en') },
  };
}

/**
 * Titolo e descrizione (in italiano) di un indirizzo, per il build: così ogni pagina
 * ha già nel file i suoi dati giusti, anche per chi non esegue JavaScript
 * (anteprime di WhatsApp e Facebook, alcuni motori di ricerca).
 */
export function metaPerPercorso(path: string): Meta | undefined {
  const pagina = (Object.keys(PAGE_PATHS) as StaticPage[]).find((k) => PAGE_PATHS[k] === path);
  if (pagina) return META[pagina].it;
  const m = /^\/(staff|fornitori|racconti)\/([^/]+)$/.exec(path);
  if (!m) return undefined;
  if (m[1] === 'racconti') {
    const r = RACCONTI.find((x) => x.slug === m[2]);
    return r ? metaRacconto(r, path).it : undefined;
  }
  if (m[1] === 'staff') {
    const member = staff.find((s) => s.slug === m[2]);
    return member ? metaPersona(member, path).it : undefined;
  }
  const fornitore = fornitori.find((f) => f.slug === m[2]);
  return fornitore ? metaFornitore(fornitore, path).it : undefined;
}

/** Aggiorna titolo, descrizione, lingua della pagina e indicazioni per i motori di ricerca. */
export function usePageMeta(page: Page, language: string, detail?: DetailMeta) {
  useEffect(() => {
    const lang = language === 'en' ? 'en' : 'it';
    const isDetail = page === 'persona' || page === 'produttore' || page === 'racconto';
    const meta = isDetail ? (detail ? detail[lang] : META['not-found'][lang]) : META[page][lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    metaTag('description', meta.description);
    metaTag('robots', meta.noindex || IS_PROVA ? 'noindex, nofollow' : 'index, follow');
    metaTag('og:title', meta.title, true);
    metaTag('og:description', meta.description, true);
    metaTag('og:locale', lang === 'it' ? 'it_IT' : 'en_GB', true);
    metaTag('og:site_name', COMPANY.brand, true);
    const path = isDetail ? detail?.path : page === 'not-found' ? undefined : pathFor(page as StaticPage);
    if (SITE_URL && path) {
      const url = SITE_URL + path;
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
  }, [page, language, detail]);
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
        'Negozio di alimentari a Cremona dal 1987 con prodotti biologici certificati di piccoli produttori, frutta e verdura fresca, pane e gastronomia vegetariana e vegana.',
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
      sameAs: [COMPANY.instagram, COMPANY.facebook, ...(COMPANY.whatsappChannel ? [COMPANY.whatsappChannel] : [])],
      // Posizione esatta (dalla scheda Google) e link alla mappa: aiutano Google a collegare sito e scheda.
      geo: { '@type': 'GeoCoordinates', latitude: 45.1404052, longitude: 10.0123068 },
      hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJ6y2C-3T-gEcRgxb6bMDfLvE',
      areaServed: { '@type': 'City', name: 'Cremona' },
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
