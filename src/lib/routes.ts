// Percorsi del sito. Ogni pagina ha un indirizzo vero (es. /fornitori), così
// funzionano i link condivisi, il pulsante "indietro" e i motori di ricerca.

export type Page =
  | 'home'
  | 'classici'
  | 'ricorrenze'
  | 'fornitori'
  | 'staff'
  | 'privacy'
  | 'cookie'
  | 'not-found';

export const PAGE_PATHS: Record<Exclude<Page, 'not-found'>, string> = {
  home: '/',
  classici: '/i-nostri-classici',
  ricorrenze: '/ricorrenze',
  fornitori: '/fornitori',
  staff: '/staff',
  privacy: '/privacy',
  cookie: '/cookie',
};

/** Pagine da inserire nella sitemap. */
export const PUBLIC_PAGES: Exclude<Page, 'not-found'>[] = [
  'home',
  'classici',
  'ricorrenze',
  'fornitori',
  'staff',
  'privacy',
  'cookie',
];

export function pathFor(page: Exclude<Page, 'not-found'>): string {
  return PAGE_PATHS[page];
}

export function pageFromPath(pathname: string): Page {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const entry = (Object.entries(PAGE_PATHS) as [Exclude<Page, 'not-found'>, string][]).find(([, p]) => p === clean);
  return entry ? entry[0] : 'not-found';
}
