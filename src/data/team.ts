// Staff e fornitori mostrati sul sito, nell'ordine di visualizzazione.
// Ogni persona e ogni produttore ha una pagina di approfondimento: /staff/<slug> e /fornitori/<slug>.
//
// Per aggiungere una persona o un produttore: metti la foto in public/staff/ (o public/fornitori/)
// e aggiungi una voce qui sotto. "slug" è la parte finale dell'indirizzo: minuscole, senza spazi
// né accenti (es. 'cascina-marasco').
//
// I campi facoltativi (descrizione, dettagli, link) compaiono sul sito solo se compilati.
// Sul sito di prova (v3) i campi vuoti sono segnalati come "da completare".

/** Un testo nelle due lingue del sito. */
export interface Testo {
  it: string;
  en: string;
}

/** Una riga di informazioni nella pagina di approfondimento, es. "Dove si trova" → "Cremona". */
export interface Dettaglio {
  etichetta: Testo;
  valore: Testo;
}

export interface StaffMember {
  slug: string;
  name: string;
  role: string;
  role_en: string;
  photo: string;
  /** Presentazione di 2–4 frasi. Per andare a capo tra un paragrafo e l'altro usa una riga vuota (\n\n). */
  descrizione?: Testo;
  dettagli?: Dettaglio[];
}

export interface Fornitore {
  slug: string;
  name: string;
  /** Facoltativa: senza foto le pagine mostrano un'icona al posto dell'immagine. */
  photo?: string;
  /** Presentazione dell'azienda. Per andare a capo tra un paragrafo e l'altro usa una riga vuota (\n\n). */
  descrizione?: Testo;
  dettagli?: Dettaglio[];
  /** Sito o pagina social del produttore. */
  link?: { url: string; label: string };
}

export const staff: StaffMember[] = [
  { slug: 'chiara', name: 'Chiara', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/chiara-aquilino.webp' },
  { slug: 'giovanni', name: 'Giovanni', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/giovanni-manfredini.webp' },
  { slug: 'fiore', name: 'Fiore', role: 'Bottega', role_en: 'Shop', photo: '/staff/fiore.webp' },
  { slug: 'mabel', name: 'Mabel', role: 'Bottega', role_en: 'Shop', photo: '/staff/mabel-kodua.webp' },
  { slug: 'laura', name: 'Laura', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/laura-tallarini.webp' },
  { slug: 'nicola', name: 'Nicola', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/nicola-paolini.webp' },
  { slug: 'piergiorgio', name: 'Piergiorgio', role: 'Bottega', role_en: 'Shop', photo: '/staff/piergiorgio-manfredini.webp' },
];

export const fornitori: Fornitore[] = [
  { slug: 'luna-nel-pozzo', name: 'Luna nel Pozzo' },
  { slug: 'bio-pan', name: 'Bio-Pan', photo: '/fornitori/bio-pan.webp' },
  { slug: 'cascina-marasco', name: 'Cascina Marasco' },
  { slug: 'daniele', name: 'Daniele' },
];

/** Campi suggeriti, mostrati come promemoria solo sul sito di prova quando i dettagli sono vuoti. */
export const SUGGERIMENTI_STAFF: Testo[] = [
  { it: 'Di cosa si occupa', en: 'What they do' },
  { it: 'Chiedetegli di…', en: 'Ask them about…' },
  { it: 'Il piatto o prodotto preferito', en: 'Favourite dish or product' },
];

export const SUGGERIMENTI_FORNITORI: Testo[] = [
  { it: 'Dove si trova', en: 'Where they are' },
  { it: 'Cosa ci porta', en: 'What they supply' },
  { it: 'Come lavora', en: 'How they work' },
  { it: 'Quando lo trovi in bottega', en: 'When you find it in the shop' },
];
