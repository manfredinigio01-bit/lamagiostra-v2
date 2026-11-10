// Percorsi del sito. Ogni pagina ha un indirizzo vero (es. /fornitori), così
// funzionano i link condivisi, il pulsante "indietro" e i motori di ricerca.
import { fornitori, haScheda, staff, type Fornitore } from '../data/team';
import { IS_PROVA } from './ambiente';
import { raccontiPubblicati, raccontiVisibili, raccontoPath } from '../data/racconti';

export { raccontoPath };

/** Un produttore ha la pagina di approfondimento quando ha una descrizione.
 *  Sul sito di prova si aprono tutti, per vedere dove vanno i contenuti. */
export function fornitoreApribile(f: Fornitore): boolean {
  return Boolean(f.descrizione) || IS_PROVA;
}

export type Page =
  | 'home'
  | 'classici'
  | 'ricorrenze'
  | 'racconti'
  | 'fornitori'
  | 'staff'
  | 'dove'
  | 'magiostra'
  | 'privacy'
  | 'cookie'
  | 'persona'
  | 'produttore'
  | 'racconto'
  | 'not-found';

/** Pagine con un indirizzo fisso (le pagine di approfondimento hanno un indirizzo per persona/azienda). */
export type StaticPage = Exclude<Page, 'not-found' | 'persona' | 'produttore' | 'racconto'>;

export const PAGE_PATHS: Record<StaticPage, string> = {
  home: '/',
  classici: '/i-nostri-classici',
  ricorrenze: '/ricorrenze',
  racconti: '/racconti',
  fornitori: '/fornitori',
  staff: '/staff',
  dove: '/come-arrivare',
  magiostra: '/magiostra',
  privacy: '/privacy',
  cookie: '/cookie',
};

/** La sezione Racconti si mostra quando c'è almeno un racconto (sul sito di prova anche le bozze). */
export function raccontiAttivi(prova = IS_PROVA): boolean {
  return raccontiVisibili(prova).length > 0;
}

/** Pagine fisse da inserire nella sitemap. "Racconti" solo quando c'è almeno un racconto pubblicato. */
export const PUBLIC_PAGES: StaticPage[] = [
  'home',
  'classici',
  'ricorrenze',
  ...(raccontiPubblicati().length > 0 ? (['racconti'] as StaticPage[]) : []),
  'fornitori',
  'staff',
  'dove',
  'magiostra',
  'privacy',
  'cookie',
];

export function pathFor(page: StaticPage): string {
  return PAGE_PATHS[page];
}

export const personaPath = (slug: string) => `/staff/${slug}`;
export const produttorePath = (slug: string) => `/fornitori/${slug}`;

/** Tutti gli indirizzi pubblici, pagine di approfondimento comprese (per la sitemap). */
export function allPublicPaths(): string[] {
  return [
    ...PUBLIC_PAGES.map(pathFor),
    ...fornitori.filter((f) => Boolean(f.descrizione)).map((f) => produttorePath(f.slug)),
    ...staff.filter(haScheda).map((s) => personaPath(s.slug)),
    ...raccontiPubblicati().map((r) => raccontoPath(r.slug)),
  ];
}

function clean(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

const DETTAGLIO = /^\/(staff|fornitori|racconti)\/([^/]+)$/;

/** La parte finale dell'indirizzo di una pagina di approfondimento (es. "chiara"), se c'è. */
export function slugFromPath(pathname: string): string | undefined {
  const m = clean(pathname).match(DETTAGLIO);
  return m ? decodeURIComponent(m[2]) : undefined;
}

export function pageFromPath(pathname: string): Page {
  const path = clean(pathname);
  const m = path.match(DETTAGLIO);
  if (m) {
    const slug = decodeURIComponent(m[2]);
    if (m[1] === 'staff') return staff.some((s) => s.slug === slug && haScheda(s)) ? 'persona' : 'not-found';
    if (m[1] === 'racconti') return raccontiVisibili(IS_PROVA).some((r) => r.slug === slug) ? 'racconto' : 'not-found';
    return fornitori.some((f) => f.slug === slug && fornitoreApribile(f)) ? 'produttore' : 'not-found';
  }
  const entry = (Object.entries(PAGE_PATHS) as [StaticPage, string][]).find(([, p]) => p === path);
  if (entry?.[0] === 'racconti' && !raccontiAttivi()) return 'not-found';
  return entry ? entry[0] : 'not-found';
}
