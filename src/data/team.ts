// Staff e fornitori mostrati sul sito, nell'ordine di visualizzazione.
// Ogni persona e ogni produttore ha una pagina di approfondimento: /staff/<slug> e /fornitori/<slug>.
//
// Per aggiungere una persona o un produttore: metti la foto in public/staff/ (o public/fornitori/)
// e aggiungi una voce qui sotto. "slug" è la parte finale dell'indirizzo: minuscole, senza spazi
// né accenti (es. 'cascina-marasco').
//
// I campi facoltativi compaiono sul sito solo se compilati. Le persone hanno solo la descrizione,
// e senza descrizione la loro scheda non si apre (nessuna pagina /staff/<slug>);
// i fornitori anche dettagli e link.
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
  /** Presentazione di 2–4 frasi: è l'unico testo della pagina della persona.
   *  Per andare a capo tra un paragrafo e l'altro usa una riga vuota (\n\n). */
  descrizione?: Testo;
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
  /** Breve nota sotto il nome nella griglia, es. "Pane". */
  nota?: Testo;
}

export const staff: StaffMember[] = [
  { slug: 'chiara', name: 'Chiara', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/chiara-aquilino.webp' , descrizione: { it: "Crede in questo progetto da quando aveva 25 anni. Nel 1987, quando il negozio è nato, era socia lavoratrice della Cooperativa Iris; dal 1995 ne è la titolare.\n\nNegli anni lo ha fatto crescere e cambiare, fino alla cucina aperta nel 2018, senza perdere l'idea da cui tutto è partito.", en: "She has believed in this project since she was 25. In 1987, when the shop opened, she was a working member of the Iris Cooperative; since 1995 she has been its owner.\n\nOver the years she has helped it grow and change, up to the kitchen opened in 2018, without losing the idea it all started from." } },
  { slug: 'giovanni', name: 'Giovanni', role: 'Bottega e cucina', role_en: 'Shop and kitchen', photo: '/staff/giovanni-manfredini.webp' , descrizione: { it: "La nuova generazione della Magiostra. Cuoco, lavora tra bottega e cucina.\n\nÈ entrato da poco in azienda con idee e progetti nuovi e con la voglia di farla crescere senza perdere ciò che la rende speciale.", en: "The new generation of La Magiostra. A cook, he works between the shop and the kitchen.\n\nHe joined the business recently, with fresh ideas and projects and the wish to help it grow without losing what makes it special." } },
  { slug: 'fiore', name: 'Fiore', role: 'Bottega', role_en: 'Shop', photo: '/staff/fiore.webp' , descrizione: { it: "Da sei anni è uno dei volti che incontrate entrando in bottega. Tra banco, clienti e consigli sui prodotti, è ormai una presenza immancabile della Magiostra.\n\nSe non sapete cosa scegliere, chiedete pure a lei.", en: "For six years she has been one of the faces you meet when you walk into the shop. Between the counter, customers and advice on products, she is now a fixture at La Magiostra.\n\nIf you're not sure what to choose, just ask her." } },
  { slug: 'mabel', name: 'Mabel', role: 'Bottega', role_en: 'Shop', photo: '/staff/mabel-kodua.webp' , descrizione: { it: "Una delle presenze più giovani della nostra squadra. Ci dà una mano in bottega, tra banco, prodotti e clienti, imparando ogni giorno qualcosa di nuovo.", en: "One of the youngest members of our team. She helps out in the shop, between the counter, products and customers, learning something new every day." } },
  { slug: 'laura', name: 'Laura', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/laura-tallarini.webp' , descrizione: { it: "«La Talla», come la chiamano tutti, è la nostra chef. Nel 2018 ha contribuito a progettare e a realizzare Magiostra Cucina.\n\nSpecializzata in cucina naturale vegetale, ricette crudiste e alimenti fermentati, ha frequentato gli anni accademici di 1° e 2° livello della Scuola di Cucina Naturale di Lumen, a San Pietro in Cerro, e della Scuola di Cucina Crudista Vegan dello Shaolin State of Harmony di Milano.", en: "\"La Talla\", as everyone calls her, is our chef. In 2018 she helped design and set up Magiostra Cucina.\n\nSpecialising in natural plant-based cooking, raw recipes and fermented foods, she completed the 1st and 2nd level academic years of the Natural Cooking School at Lumen, in San Pietro in Cerro, and of the Vegan Raw Food School at Shaolin State of Harmony in Milan." } },
  { slug: 'nicola', name: 'Nicola', role: 'Cucina', role_en: 'Kitchen', photo: '/staff/nicola-paolini.webp' , descrizione: { it: "Giovane, curioso e pieno di idee. Dopo l'alberghiero e tre anni di esperienza ai fornelli ha incontrato La Magiostra e ha deciso di unirsi al nostro progetto, con tanta voglia di fare e di crescere.\n\nOggi lavora nella nostra cucina.", en: "Young, curious and full of ideas. After catering school and three years at the stove he came across La Magiostra and decided to join our project, eager to work and to grow.\n\nToday he works in our kitchen." } },
  { slug: 'piergiorgio', name: 'Piergiorgio', role: 'Bottega', role_en: 'Shop', photo: '/staff/piergiorgio-manfredini.webp' },
];

export const fornitori: Fornitore[] = [
  { slug: 'arete', name: 'Areté Cooperativa Sociale' },
  { slug: 'noi-e-la-natura', name: 'Az. Agr. Noi e la Natura', nota: { it: 'Carne bianca', en: 'White meat' } },
  { slug: 'bio-pan', name: 'Bio-Pan', photo: '/fornitori/bio-pan.webp' },
  { slug: 'cascina-marasco', name: 'Cascina Marasco, coop. agricola sociale' },
  { slug: 'moronara', name: 'Az. Agr. Moronara' },
  { slug: 'forno-astori', name: 'Forno Astori' },
  { slug: 'nuova-olearia-scaligera', name: 'Nuova Olearia Scaligera' },
  { slug: 'officina-naturae', name: 'Officina Naturae', nota: { it: 'Cosmetica e detergenza naturale', en: 'Natural cosmetics and cleaning products' } },
  { slug: 'monastero-negri', name: 'Azienda Monastero di Negri Alberto, soc. agricola', nota: { it: 'Uova', en: 'Eggs' } },
  { slug: 'allegri-daniele', name: 'Allegri Daniele', nota: { it: 'Pane', en: 'Bread' } },
  { slug: 'mulino-sobrino', name: 'Mulino Sobrino' },
  { slug: 'luna-nel-pozzo', name: 'La Luna nel Pozzo dei F.lli Forti' },
  { slug: 'mediterranea', name: 'Mediterranea Srl' },
  { slug: 'iris', name: 'Iris', nota: { it: 'Passate di pomodoro', en: 'Tomato passata' } },
  { slug: 'columbro', name: 'Columbro', nota: { it: 'Pasta', en: 'Pasta' } },
  { slug: 'binomio-lab', name: 'Binomio Lab' },
  { slug: 'fattorie-san-lorenzo', name: 'Fattorie San Lorenzo', nota: { it: 'Carne rossa', en: 'Red meat' } },
  { slug: 'maghenzani', name: 'Maghenzani', nota: { it: 'Frutta e verdura', en: 'Fruit and vegetables' } },
  { slug: 'michelangelo-terrazzino', name: 'Michelangelo Terrazzino', nota: { it: 'Olio d’oliva', en: 'Olive oil' } },
];

/** Una persona ha la pagina di approfondimento solo se ha una descrizione. */
export function haScheda(m: StaffMember): boolean {
  return Boolean(m.descrizione);
}

/** Campi suggeriti per i fornitori, mostrati come promemoria solo sul sito di prova quando i dettagli sono vuoti. */
export const SUGGERIMENTI_FORNITORI: Testo[] = [
  { it: 'Dove si trova', en: 'Where they are' },
  { it: 'Cosa ci porta', en: 'What they supply' },
  { it: 'Come lavora', en: 'How they work' },
  { it: 'Quando lo trovi in bottega', en: 'When you find it in the shop' },
];
