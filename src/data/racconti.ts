// Racconti dalla bottega: storie, ricette e foto, come un piccolo blog.
//
// COME AGGIUNGERE UN RACCONTO
// 1. Metti le foto in public/racconti/ (formato .webp o .jpg, lato lungo ~1600 px).
// 2. Copia uno dei racconti (le ricette dei corsi sono in ricette-corsi.ts) e cambia i campi. Lo "slug" diventa l'indirizzo:
//    slug 'farinata-di-ceci' → www.lamagiostra.it/racconti/farinata-di-ceci
// 3. "bozza: true" = si vede solo sul sito di prova (v3). Toglilo per pubblicarlo.
//
// La voce "Racconti" compare nel menu del sito ufficiale solo quando c'è almeno
// un racconto pubblicato (senza "bozza").
// Il testo va diviso in paragrafi con una riga vuota (\n\n).

import { RICETTE_CORSI } from './ricette-corsi';

/**
 * Un testo del racconto: una stringa (solo italiano) oppure { it, en }.
 * Sul sito in inglese, se manca "en", si mostra l'italiano.
 */
export type Txt = string | { it: string; en?: string };

/** Riga di ingredienti o di passaggi: un testo, oppure un titoletto di gruppo (es. "Per la salsa"). */
export type Riga = Txt | { gruppo: Txt };

export type TipoRacconto = 'racconto' | 'ricetta' | 'foto';

export interface FotoRacconto {
  src: string;
  didascalia?: Txt;
}

export interface Ricetta {
  /** Es. '4 persone' */
  porzioni?: Txt;
  /** Es. '40 minuti' */
  tempo?: Txt;
  ingredienti: Riga[];
  passaggi: Riga[];
  /** Strumenti che servono (facoltativo). */
  strumenti?: Txt[];
  /** Consigli, varianti, conservazione (facoltativo). */
  note?: Txt;
}

export interface Racconto {
  slug: string;
  tipo: TipoRacconto;
  /** Data di pubblicazione, formato AAAA-MM-GG. */
  data: string;
  titolo: Txt;
  /** Una o due frasi: compaiono nella lista e nell'anteprima su Google e WhatsApp. */
  sommario: Txt;
  /** Da quale corso di cucina viene (facoltativo). Es. 'I legumi – inverno' */
  corso?: string;
  /** Foto principale. */
  copertina?: string;
  /** Il racconto, diviso in paragrafi con \n\n. */
  testo?: Txt;
  /** Altre foto, mostrate in galleria sotto il testo. */
  foto?: FotoRacconto[];
  /** Solo per le ricette. */
  ricetta?: Ricetta;
  /** true = visibile solo sul sito di prova. */
  bozza?: boolean;
}

/** Il testo nella lingua giusta (italiano se manca l'inglese). */
export function txt(x: Txt, language: string): string {
  if (typeof x === 'string') return x;
  return language === 'it' ? x.it : (x.en ?? x.it);
}

export const isGruppo = (r: Riga): r is { gruppo: Txt } => typeof r === 'object' && 'gruppo' in r;

export const RACCONTI: Racconto[] = [...RICETTE_CORSI];

export const raccontoPath = (slug: string) => `/racconti/${slug}`;

/** Racconti pubblicati (senza bozza), dal più recente. */
export function raccontiPubblicati(): Racconto[] {
  return RACCONTI.filter((r) => !r.bozza).sort((a, b) => b.data.localeCompare(a.data));
}

/** Racconti da mostrare: sul sito di prova anche le bozze. */
export function raccontiVisibili(prova: boolean): Racconto[] {
  return (prova ? [...RACCONTI] : raccontiPubblicati()).sort((a, b) => b.data.localeCompare(a.data));
}
