// Cesti di Natale già pronti, mostrati nella pagina Ricorrenze.
// Le foto stanno in public/cesti/. Prezzi IVA inclusa.
//
// La sezione si nasconde da sola dopo la data "visibileFinoA" (formato AAAA-MM-GG):
// per il prossimo Natale basta cambiare anno, cesti e data.

import type { Testo } from './team';

export interface Cesto {
  slug: string;
  nome: string;
  prezzo: number;
  foto: string;
  descrizione: Testo;
  prodotti: string[];
}

export const CESTI_NATALE = {
  anno: 2026,
  visibileFinoA: '2026-12-31',
  intro: {
    it: 'Da anni ricerchiamo e selezioniamo i migliori produttori. Ogni anno cerchiamo di trasferire questa cura nella selezione dei prodotti anche nei cesti natalizi.',
    en: 'For years we have been seeking out and selecting the best producers. Every year we try to bring the same care in choosing products to our Christmas baskets.',
  },
  cesti: [
    {
      slug: 'assaggiami',
      nome: 'Assaggiami',
      prezzo: 25,
      foto: '/cesti/assaggiami.webp',
      descrizione: {
        it: 'Il cesto per scoprire la nostra bottega: tutto per un piatto di casa, pasta e lenticchie al pomodoro, e un finale dolce con fichi caramellati e mandorle pralinate. Piccolo nel prezzo, scelto con la stessa attenzione dei nostri cesti più grandi.',
        en: 'The basket to discover our shop: everything for a home-cooked dish of pasta and lentils in tomato sauce, and a sweet finish with caramelised figs and praline almonds. Small in price, chosen with the same care as our larger baskets.',
      },
      prodotti: [
        'Bucatini di semola',
        'Farina di grano tenero tipo 0',
        'Lenticchie',
        'Salsa di pomodoro',
        'Fichi caramellati (120 g)',
        'Mandorle pralinate',
        'Succo di mela limpido',
      ],
    },
    {
      slug: 'la-bottega',
      nome: 'La Bottega',
      prezzo: 50,
      foto: '/cesti/la-bottega.webp',
      descrizione: {
        it: 'Il cesto per chi ama cucinare: riso e porcini secchi per un risotto delle feste, tagliolini all’uovo per un secondo primo e un fine pasto goloso con amaretti, cioccolato fondente e composta di albicocche.',
        en: 'The basket for those who love to cook: rice and dried porcini for a festive risotto, egg tagliolini for another first course, and a treat to finish with amaretti, dark chocolate and apricot compote.',
      },
      prodotti: [
        'Olio extravergine d’oliva (500 ml)',
        'Riso Rosa Marchetti',
        'Tagliolini all’uovo',
        'Funghi porcini secchi',
        'Composta di albicocche',
        'Fichi caramellati (120 g)',
        'Amaretti morbidi',
        'Cioccolato fondente 70%',
      ],
    },
    {
      slug: 'la-dispensa',
      nome: 'La Dispensa',
      prezzo: 75,
      foto: '/cesti/la-dispensa.webp',
      descrizione: {
        it: 'Il cesto per chi riceve ospiti: pane carasau e acciughe per l’aperitivo, le lenticchie di Capodanno, riso e tagliolini per i pranzi in famiglia, e torrone e paste di mandorla per il dolce. Accompagna tutte le feste, dal primo brindisi all’ultimo.',
        en: "The basket for those who entertain: carasau bread and anchovies for aperitivo, New Year's lentils, rice and tagliolini for family lunches, and nougat and almond pastries for dessert. It sees you through the holidays, from the first toast to the last.",
      },
      prodotti: [
        'Olio extravergine d’oliva (500 ml)',
        'Riso Rosa Marchetti',
        'Tagliolini all’uovo',
        'Pane carasau',
        'Lenticchie',
        'Salsa di pomodoro',
        'Filetti di acciughe',
        'Composta di frutti di bosco',
        'Fichi caramellati (120 g)',
        'Torrone a stecca',
        'Paste di mandorla',
        'Mandorle pralinate',
        'Succo di mela limpido',
      ],
    },
    {
      slug: 'la-magiostra',
      nome: 'La Magiostra',
      prezzo: 100,
      foto: '/cesti/la-magiostra.webp',
      descrizione: {
        it: 'La nostra proposta più ricca, per un regalo importante: le lasagne per il pranzo di Natale, riso e porcini per un risotto, una tavola dei dolci con torrone, paste di mandorla e amaretti, fino alla tisana della sera per chiudere le feste con calma.',
        en: 'Our richest basket, for a special gift: lasagne for Christmas lunch, rice and porcini for a risotto, a dessert table with nougat, almond pastries and amaretti, and an evening herbal tea to end the holidays calmly.',
      },
      prodotti: [
        'Olio extravergine d’oliva (750 ml)',
        'Riso Rosa Marchetti',
        'Tagliolini all’uovo',
        'Lasagne',
        'Pane carasau',
        'Lenticchie',
        'Funghi porcini secchi',
        'Salsa di pomodoro',
        'Filetti di acciughe',
        'Composta di frutti di bosco',
        'Composta di albicocche',
        'Fichi caramellati (120 g)',
        'Torrone a stecca',
        'Paste di mandorla',
        'Amaretti morbidi',
        'Tisana biologica',
        'Succo di mela limpido',
      ],
    },
  ] as Cesto[],
};

/** La sezione dei cesti di Natale è visibile fino alla fine del giorno indicato. */
export function cestiNataleVisibili(oggi = new Date()): boolean {
  return oggi <= new Date(`${CESTI_NATALE.visibileFinoA}T23:59:59`);
}
