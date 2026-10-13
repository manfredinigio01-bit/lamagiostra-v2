// Allergeni dei piatti sempre presenti in gastronomia.
//
// I 14 allergeni da dichiarare sono quelli dell'Allegato II del Reg. UE 1169/2011 (elenco qui sotto).
// Per ogni piatto scrivi le chiavi degli allergeni che contiene, es. allergeni: ['sesamo', 'frutta-a-guscio'].
//   - allergeni: []          → il piatto non contiene nessuno dei 14 allergeni
//   - allergeni non scritto  → non ancora verificato: sul sito vero il piatto NON compare,
//                              sul sito di prova compare come "da completare".
// "tracce" è facoltativo: possibili contaminazioni (es. stesso laboratorio), se volete indicarle.
//
// Controlla sempre sulla ricetta e sulle etichette degli ingredienti (tahina, pane, spezie, brodi…):
// meglio un piatto in meno in tabella che un allergene sbagliato.

import type { Testo } from './team';

export const ALLERGENI = {
  glutine: { it: 'Glutine', en: 'Gluten' },
  crostacei: { it: 'Crostacei', en: 'Crustaceans' },
  uova: { it: 'Uova', en: 'Eggs' },
  pesce: { it: 'Pesce', en: 'Fish' },
  arachidi: { it: 'Arachidi', en: 'Peanuts' },
  soia: { it: 'Soia', en: 'Soy' },
  latte: { it: 'Latte', en: 'Milk' },
  'frutta-a-guscio': { it: 'Frutta a guscio', en: 'Tree nuts' },
  sedano: { it: 'Sedano', en: 'Celery' },
  senape: { it: 'Senape', en: 'Mustard' },
  sesamo: { it: 'Sesamo', en: 'Sesame' },
  solfiti: { it: 'Solfiti', en: 'Sulphites' },
  lupini: { it: 'Lupini', en: 'Lupin' },
  molluschi: { it: 'Molluschi', en: 'Molluscs' },
} satisfies Record<string, Testo>;

export type Allergene = keyof typeof ALLERGENI;

/** Allergeni usati nel nostro laboratorio: compaiono in alcuni piatti, non in tutti. */
export const ALLERGENI_LABORATORIO: Allergene[] = [
  'glutine',
  'soia',
  'senape',
  'sesamo',
  'sedano',
  'frutta-a-guscio',
  'arachidi',
];

export interface PiattoFisso {
  nome: Testo;
  /** Non scritto = non ancora verificato (il piatto non compare sul sito vero). */
  allergeni?: Allergene[];
  tracce?: Allergene[];
  vegano?: boolean;
}

export const piattiFissi: PiattoFisso[] = [
  { nome: { it: 'Hummus di ceci', en: 'Chickpea hummus' } },
  { nome: { it: 'Farinata di ceci', en: 'Chickpea farinata' } },
  { nome: { it: 'Budino di miglio', en: 'Millet pudding' } },
];

/** Il piatto ha gli allergeni verificati e può comparire sul sito vero. */
export const verificato = (p: PiattoFisso) => Array.isArray(p.allergeni);
