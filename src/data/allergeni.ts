// Allergeni usati nel laboratorio della gastronomia, mostrati in forma generale nella pagina
// "I nostri classici" (sezione Allergeni). Per i dettagli di ogni piatto i clienti ci scrivono.
//
// I 14 allergeni da dichiarare sono quelli dell'Allegato II del Reg. UE 1169/2011 (elenco qui sotto).
// Per cambiare quelli mostrati sul sito basta modificare ALLERGENI_LABORATORIO.

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
