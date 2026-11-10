// Racconti dalla bottega: storie, ricette e foto, come un piccolo blog.
//
// COME AGGIUNGERE UN RACCONTO
// 1. Metti le foto in public/racconti/ (formato .webp o .jpg, lato lungo ~1600 px).
// 2. Copia uno dei racconti qui sotto e cambia i campi. Lo "slug" diventa l'indirizzo:
//    slug 'farinata-di-ceci' → www.lamagiostra.it/racconti/farinata-di-ceci
// 3. "bozza: true" = si vede solo sul sito di prova (v3). Toglilo per pubblicarlo.
//
// La voce "Racconti" compare nel menu del sito ufficiale solo quando c'è almeno
// un racconto pubblicato (senza "bozza").
// Il testo va diviso in paragrafi con una riga vuota (\n\n).

import type { Testo } from './team';

export type TipoRacconto = 'racconto' | 'ricetta' | 'foto';

export interface FotoRacconto {
  src: string;
  didascalia?: Testo;
}

export interface Ricetta {
  /** Es. { it: '4 persone', en: '4 people' } */
  porzioni?: Testo;
  /** Es. { it: '40 minuti', en: '40 minutes' } */
  tempo?: Testo;
  ingredienti: Testo[];
  passaggi: Testo[];
}

export interface Racconto {
  slug: string;
  tipo: TipoRacconto;
  /** Data di pubblicazione, formato AAAA-MM-GG. */
  data: string;
  titolo: Testo;
  /** Una o due frasi: compaiono nella lista e nell'anteprima su Google e WhatsApp. */
  sommario: Testo;
  /** Foto principale. */
  copertina?: string;
  /** Il racconto, diviso in paragrafi con \n\n. */
  testo?: Testo;
  /** Altre foto, mostrate in galleria sotto il testo. */
  foto?: FotoRacconto[];
  /** Solo per le ricette. */
  ricetta?: Ricetta;
  /** true = visibile solo sul sito di prova. */
  bozza?: boolean;
}

export const RACCONTI: Racconto[] = [
  {
    slug: 'esempio-racconto',
    tipo: 'racconto',
    data: '2026-11-10',
    bozza: true,
    titolo: { it: '[Esempio] Una mattina al banco della gastronomia', en: '[Example] A morning at the deli counter' },
    sommario: {
      it: 'Esempio di racconto: qui vanno una o due frasi che fanno venire voglia di leggere.',
      en: 'Example story: one or two sentences that make people want to read on.',
    },
    copertina: '/banco_gastronomia.webp',
    testo: {
      it: 'Questo è un racconto di esempio, visibile solo sul sito di prova: serve a vedere come appare la pagina.\n\nQui va il testo vero: cosa è successo, chi c’era, cosa abbiamo cucinato e perché. Ogni riga vuota inizia un nuovo paragrafo.',
      en: 'This is an example story, visible only on the test site: it shows how the page looks.\n\nThe real text goes here: what happened, who was there, what we cooked and why. Each empty line starts a new paragraph.',
    },
    foto: [
      { src: '/foto_pane.webp', didascalia: { it: '[Didascalia della foto]', en: '[Photo caption]' } },
      { src: '/bancone_frutta_e_verdura.webp', didascalia: { it: '[Didascalia della foto]', en: '[Photo caption]' } },
    ],
  },
  {
    slug: 'esempio-ricetta',
    tipo: 'ricetta',
    data: '2026-11-09',
    bozza: true,
    titolo: { it: '[Esempio] Titolo della ricetta', en: '[Example] Recipe title' },
    sommario: {
      it: 'Esempio di ricetta: due righe per raccontare il piatto e quando lo facciamo.',
      en: 'Example recipe: two lines about the dish and when we make it.',
    },
    copertina: '/catering_fuori_porta.webp',
    testo: {
      it: 'Qui va la storia del piatto: da dove arriva la ricetta, quali ingredienti usiamo e da quali produttori.',
      en: 'The story of the dish goes here: where the recipe comes from, which ingredients we use and from which producers.',
    },
    ricetta: {
      porzioni: { it: '4 persone', en: '4 people' },
      tempo: { it: '[tempo]', en: '[time]' },
      ingredienti: [
        { it: '[quantità] [ingrediente]', en: '[amount] [ingredient]' },
        { it: '[quantità] [ingrediente]', en: '[amount] [ingredient]' },
      ],
      passaggi: [
        { it: '[Primo passaggio]', en: '[First step]' },
        { it: '[Secondo passaggio]', en: '[Second step]' },
      ],
    },
  },
];

export const raccontoPath = (slug: string) => `/racconti/${slug}`;

/** Racconti pubblicati (senza bozza), dal più recente. */
export function raccontiPubblicati(): Racconto[] {
  return RACCONTI.filter((r) => !r.bozza).sort((a, b) => b.data.localeCompare(a.data));
}

/** Racconti da mostrare: sul sito di prova anche le bozze. */
export function raccontiVisibili(prova: boolean): Racconto[] {
  return (prova ? [...RACCONTI] : raccontiPubblicati()).sort((a, b) => b.data.localeCompare(a.data));
}
