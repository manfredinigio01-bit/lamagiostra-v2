// Percorsi del sito. Ogni pagina ha un indirizzo vero (es. /fornitori), così
// funzionano i link condivisi, il pulsante "indietro" e i motori di ricerca.
import { fornitori, haScheda, staff } from '../data/team';

export type Page =
  | 'home'
  | 'classici'
  | 'ricorrenze'
  | 'fornitori'
  | 'staff'
  | 'privacy'
  | 'cookie'
  | 'persona'
  | 'produttore'
  | 'not-found';

/** Pagine con un indirizzo fisso (le pagine di approfondimento hanno un indirizzo per persona/azienda). */
export type StaticPage = Exclude<Page, 'not-found' | 'persona' | 'produttore'>;

export const PAGE_PATHS: Record<StaticPage, string> = {
  home: '/',
  classici: '/i-nostri-classici',
  ricorrenze: '/ricorrenze',
  fornitori: '/fornitori',
  staff: '/staff',
  privacy: '/privacy',
  cookie: '/cookie',
};

/** Pagine fisse da inserire nella sitemap. */
export const PUBLIC_PAGES: StaticPage[] = ['home', 'classici', 'ricorrenze', 'fornitori', 'staff', 'privacy', 'cookie'];

export function pathFor(page: StaticPage): string {
  return PAGE_PATHS[page];
}

export const personaPath = (slug: string) => `/staff/${slug}`;
export const produttorePath = (slug: string) => `/fornitori/${slug}`;

/** Tutti gli indirizzi pubblici, pagine di approfondimento comprese (per la sitemap). */
export function allPublicPaths(): string[] {
  return [
    ...PUBLIC_PAGES.map(pathFor),
    ...fornitori.map((f) => produttorePath(f.slug)),
    ...staff.filter(haScheda).map((s) => personaPath(s.slug)),
  ];
}

function clean(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

const DETTAGLIO = /^\/(staff|fornitori)\/([^/]+)$/;

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
    return fornitori.some((f) => f.slug === slug) ? 'produttore' : 'not-found';
  }
  const entry = (Object.entries(PAGE_PATHS) as [StaticPage, string][]).find(([, p]) => p === path);
  return entry ? entry[0] : 'not-found';
}
