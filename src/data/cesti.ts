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
    it: 'Da anni cerchiamo, assaggiamo e selezioniamo piccoli produttori, molti con certificazione biologica o biodinamica: realtà che difficilmente trovate sugli scaffali della grande distribuzione. La stessa cura che mettiamo ogni giorno in bottega è racchiusa in un cesto per il vostro Natale. Quattro proposte, quattro fasce di prezzo, un’unica cura nella selezione.',
    en: 'For years we have been seeking out, tasting and selecting small producers, many of them certified organic or biodynamic: the kind you rarely find on supermarket shelves. The same care we put into the shop every day goes into a basket for your Christmas. Four baskets, four price ranges, the same care in every choice.',
  },
  condizioni: [
    { it: 'Prezzi IVA inclusa.', en: 'Prices include VAT.' },
    {
      it: 'Gli allergeni sono indicati sull’etichetta di ogni prodotto. Per esigenze vegetariane o vegane contattaci: ti aiutiamo a scegliere.',
      en: 'Allergens are listed on the label of each product. For vegetarian or vegan needs, contact us: we will help you choose.',
    },
  ] as Testo[],
  cesti: [
    {
      slug: 'assaggiami',
      nome: 'Assaggiami',
      prezzo: 25,
      foto: '/cesti/assaggiami.webp',
      descrizione: {
        it: 'Un primo assaggio della nostra bottega: pasta, farina, lenticchie e salsa di pomodoro per la tavola di tutti i giorni, più fichi caramellati e mandorle pralinate per chiudere con dolcezza.',
        en: 'A first taste of our shop: pasta, flour, lentils and tomato sauce for everyday meals, plus caramelised figs and praline almonds for a sweet finish.',
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
        it: 'Il cesto per chi ama cucinare. Olio extravergine, riso, tagliolini all’uovo e funghi porcini secchi per un piatto di stagione, e per il dolce composta di albicocche, fichi caramellati, amaretti morbidi e cioccolato fondente.',
        en: 'The basket for those who love to cook. Extra virgin olive oil, rice, egg tagliolini and dried porcini for a seasonal dish, and for dessert apricot compote, caramelised figs, soft amaretti and dark chocolate.',
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
        it: 'Una dispensa completa per le feste. Olio, riso, tagliolini all’uovo, lenticchie e salsa di pomodoro per la cucina di casa, pane carasau e filetti di acciughe per l’aperitivo, e a chiudere composta di frutti di bosco, torrone, paste di mandorla e mandorle pralinate.',
        en: 'A full pantry for the holidays. Oil, rice, egg tagliolini, lentils and tomato sauce for home cooking, carasau bread and anchovy fillets for aperitivo, and to finish berry compote, nougat, almond pastries and praline almonds.',
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
        it: 'La nostra proposta più ricca, con diciassette prodotti scelti: dalle lasagne ai porcini secchi, due composte, torrone, paste di mandorla e amaretti, fino alla tisana biologica per concludere.',
        en: 'Our richest basket, with seventeen chosen products: from lasagne to dried porcini, two compotes, nougat, almond pastries and amaretti, finishing with an organic herbal tea.',
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
