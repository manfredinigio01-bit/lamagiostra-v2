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

/** Certificato biologico UE del produttore, come risulta nel registro pubblico europeo TRACES. */
export interface CertificatoBio {
  /** Organismo di controllo, es. 'ICEA'. */
  ente: string;
  /** Codice dell'organismo di controllo, es. 'IT-BIO-006'. */
  codiceEnte: string;
  /** Numero del certificato (si può cercare nel registro TRACES). */
  certificato: string;
  /** Ragione sociale come scritta sul certificato. */
  intestatario: string;
  /** Data di scadenza del certificato, AAAA-MM-GG. */
  scadenza: string;
}

export interface Fornitore {
  slug: string;
  name: string;
  /** Certificazione biologica del produttore (lasciare vuoto se non certificato o non verificato). */
  bio?: CertificatoBio;
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
  { slug: 'noi-e-la-natura', name: 'Az. Agr. Noi e la Natura', nota: { it: 'Carne bianca', en: 'White meat' }, bio: { ente: 'ICEA', codiceEnte: 'IT-BIO-006', certificato: 'IT-BIO-006.380-0114593.2026.002', intestatario: 'Az. Agr. Noi e la Natura di Bertoletti Antonio', scadenza: '2029-06-30' } },
  { slug: 'bio-pan', name: 'Bio-Pan' , bio: { ente: 'CODEX', codiceEnte: 'IT-BIO-002', certificato: 'IT-BIO-002.380-0041558.2026.003', intestatario: 'Bio-Pan S.r.l. unipersonale', scadenza: '2029-09-23' } },
  { slug: 'cascina-marasco', name: 'Cascina Marasco, coop. agricola sociale' },
  { slug: 'moronara', name: 'Az. Agr. Moronara' , bio: { ente: 'ICEA', codiceEnte: 'IT-BIO-006', certificato: 'IT-BIO-006.380-0015537.2026.001', intestatario: 'Moronara Az. Agr. di Lodigiani Leonardo', scadenza: '2029-06-08' } },
  { slug: 'forno-astori', name: 'Forno Astori' },
  { slug: 'nuova-olearia-scaligera', name: 'Nuova Olearia Scaligera' , bio: { ente: 'ICEA', codiceEnte: 'IT-BIO-006', certificato: 'IT-BIO-006.380-0038309.2025.001', intestatario: 'Nuova Olearia Scaligera S.r.l.', scadenza: '2028-10-03' } },
  { slug: 'officina-naturae', name: 'Officina Naturae', nota: { it: 'Cosmetica e detergenza naturale', en: 'Natural cosmetics and cleaning products' } },
  { slug: 'monastero-negri', name: 'Azienda Monastero di Negri Alberto, soc. agricola', nota: { it: 'Uova', en: 'Eggs' }, bio: { ente: 'ICEA', codiceEnte: 'IT-BIO-006', certificato: 'IT-BIO-006.380-0005040.2026.002', intestatario: 'Azienda Monastero di Negri Alberto e C. S.a.s. – Società agricola', scadenza: '2029-08-03' } },
  { slug: 'allegri-daniele', name: 'Allegri Daniele', nota: { it: 'Pane', en: 'Bread' } },
  { slug: 'mulino-sobrino', name: 'Mulino Sobrino' , bio: { ente: 'ICEA', codiceEnte: 'IT-BIO-006', certificato: 'IT-BIO-006.380-0029945.2024.002', intestatario: 'Mulino Sobrino S.n.c. di Renzo Sobrino e C.', scadenza: '2027-09-02' } },
  { slug: 'luna-nel-pozzo', name: 'La Luna nel Pozzo dei F.lli Forti' , bio: { ente: 'QCertificazioni', codiceEnte: 'IT-BIO-014', certificato: 'IT-BIO-014.380-0106186.2025.001', intestatario: 'La Luna nel Pozzo dei F.lli Forti S.a.s.', scadenza: '2028-09-16' } },
  { slug: 'mediterranea', name: 'Mediterranea Srl' },
  { slug: 'iris', name: 'Iris', nota: { it: 'Passate di pomodoro', en: 'Tomato passata' }, bio: { ente: 'Bioagricert', codiceEnte: 'IT-BIO-007', certificato: 'IT-BIO-007.380-0048351.2026.002', intestatario: 'Iris Soc. Coop. Agricola', scadenza: '2029-07-20' } },
  { slug: 'columbro', name: 'Columbro', nota: { it: 'Pasta', en: 'Pasta' }, bio: { ente: 'CCPB', codiceEnte: 'IT-BIO-009', certificato: 'IT-BIO-009.380-0003188.2026.002', intestatario: 'Pasta Iris S.r.l.', scadenza: '2029-09-11' } },
  { slug: 'binomio-lab', name: 'Binomio Lab' },
  { slug: 'fattorie-san-lorenzo', name: 'Fattorie San Lorenzo', nota: { it: 'Carne rossa', en: 'Red meat' }, bio: { ente: 'Bioagricert', codiceEnte: 'IT-BIO-007', certificato: 'IT-BIO-007.380-0063696.2026.003', intestatario: 'Fattorie San Lorenzo S.r.l. Società agricola', scadenza: '2027-02-12' } },
  { slug: 'maghenzani', name: 'Maghenzani', nota: { it: 'Frutta e verdura', en: 'Fruit and vegetables' } },
  { slug: 'michelangelo-terrazzino', name: 'Michelangelo Terrazzino', nota: { it: 'Olio d’oliva', en: 'Olive oil' }, bio: { ente: 'Suolo e Salute', codiceEnte: 'IT-BIO-004', certificato: 'IT-BIO-004.380-0007646.2025.003', intestatario: 'Azienda agricola Bio Terrazzino di Terrazzino Michelangelo', scadenza: '2028-09-28' } },
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

/** true se il produttore ha un certificato biologico ancora valido oggi. */
export function bioValido(f: Fornitore, oggi = new Date()): boolean {
  return Boolean(f.bio && new Date(`${f.bio.scadenza}T23:59:59`) >= oggi);
}
