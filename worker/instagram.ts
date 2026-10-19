// Riconosce, tra gli ultimi post della pagina Facebook (o di Instagram), quello del menu della settimana e quello
// della cassetta del venerdì, in base a una frase che compare nelle prime righe del post.
// Se più post corrispondono, vince il più recente per data (anche se Facebook ne ha fissato uno in alto).
//
// Per cambiare le frasi riconosciute basta modificare gli elenchi qui sotto: il confronto
// ignora maiuscole, accenti, emoji e punteggiatura, quindi "🥕 MENÙ della settimana!" va bene.

export const FRASI_MENU = [
  'proposte della gastronomia',
  'proposta della gastronomia',
  'menu della settimana',
]; // i post iniziano con "Le PROPOSTE della GASTRONOMIA di Martedì… / di Giovedì…"
export const FRASI_CASSETTA = ['cassetta del venerdi', 'cassetta della settimana'];
/** Menu del sabato: mostrato solo aprendo la scheda "Il menu del sabato" (pagina I nostri classici). */
export const FRASI_SABATO = ['menu del sabato', 'pranzo del sabato', 'proposte del sabato', 'proposta del sabato', 'menu sabato'];

/** Quante righe (non vuote) all'inizio del post vengono controllate. */
const RIGHE_CONTROLLATE = 3;

export interface PostInstagram {
  id: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

export interface PostSito {
  testo: string;
  link: string;
  data: string;
}

export interface Risposta {
  menu: PostSito | null;
  cassetta: PostSito | null;
  sabato?: PostSito | null;
  /** Da dove arrivano i post: la pagina Facebook (consigliato) o l'account Instagram. */
  fonte?: 'facebook' | 'instagram';
  /** true se i contenuti sono di esempio (solo sul sito di prova, senza collegamento a Instagram). */
  esempio?: boolean;
  /** Solo sul sito di prova: perché non ci sono post veri. */
  diagnosi?: string;
}

/** Minuscole, senza accenti, emoji e punteggiatura, spazi singoli. */
export function normalizza(testo: string): string {
  return testo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** true se una delle frasi compare nelle prime righe del post (titolo, data, emoji su righe separate…). */
export function iniziaCon(caption: string | undefined, frasi: string[]): boolean {
  if (!caption) return false;
  const inizio = normalizza(
    caption
      .replace(/\r\n/g, '\n')
      .split('\n')
      .filter((r) => normalizza(r) !== '')
      .slice(0, RIGHE_CONTROLLATE)
      .join(' '),
  );
  return frasi.some((f) => inizio.includes(normalizza(f)));
}

/** Toglie gli hashtag in fondo al testo e le righe vuote in eccesso. Il testo resta quello pubblicato. */
export function pulisciTesto(caption: string): string {
  const righe = caption.replace(/\r\n/g, '\n').split('\n');
  while (righe.length && /^\s*(#[\p{L}\p{N}_]+\s*)*$/u.test(righe[righe.length - 1])) righe.pop();
  return righe.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function versoSito(p: PostInstagram): PostSito {
  return { testo: pulisciTesto(p.caption ?? ''), link: p.permalink, data: p.timestamp };
}

/** Il post più recente (per data di pubblicazione) tra quelli che corrispondono alle frasi. */
function piuRecente(posts: PostInstagram[], frasi: string[]): PostInstagram | undefined {
  return posts
    .filter((p) => iniziaCon(p.caption, frasi))
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))[0];
}

/** Post del sabato: una frase del sabato, oppure "proposte della gastronomia" insieme a "sabato" nelle prime righe. */
export function eSabato(caption: string | undefined): boolean {
  return iniziaCon(caption, FRASI_SABATO) || (iniziaCon(caption, FRASI_MENU) && iniziaCon(caption, ['sabato']) && !iniziaCon(caption, ['venerdi', 'giovedi', 'mercoledi', 'martedi']));
}

/** Sceglie menu, cassetta e menu del sabato più recenti, senza fidarsi dell'ordine in cui arrivano i post. */
export function scegliPost(posts: PostInstagram[]): Risposta {
  const sabati = posts.filter((p) => eSabato(p.caption));
  const altri = posts.filter((p) => !eSabato(p.caption));
  // Un post del menu che nomina la cassetta (o viceversa) non deve finire nel riquadro sbagliato.
  const menu = piuRecente(altri.filter((p) => !iniziaCon(p.caption, FRASI_CASSETTA)), FRASI_MENU);
  const cassetta = piuRecente(altri.filter((p) => !iniziaCon(p.caption, FRASI_MENU)), FRASI_CASSETTA);
  const sabato = sabati.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))[0];
  return {
    menu: menu ? versoSito(menu) : null,
    cassetta: cassetta ? versoSito(cassetta) : null,
    sabato: sabato ? versoSito(sabato) : null,
  };
}

/** Contenuti di esempio per vedere l'aspetto sul sito di prova prima del collegamento a Instagram. */
export function esempio(): Risposta {
  const oggi = new Date().toISOString();
  return {
    esempio: true,
    menu: {
      testo:
        'La proposta della gastronomia\n\nTESTO DI ESEMPIO: qui comparirà il testo del vostro ultimo post che inizia con "La proposta della gastronomia".\n\nOgni riga del post resta su una riga, come su Instagram.',
      link: 'https://www.instagram.com/lamagiostra/',
      data: oggi,
    },
    cassetta: {
      testo:
        'Cassetta del venerdì\n\nTESTO DI ESEMPIO: qui comparirà il testo del vostro ultimo post che inizia con "Cassetta del venerdì".',
      link: 'https://www.instagram.com/lamagiostra/',
      data: oggi,
    },
    sabato: {
      testo: 'Il menu del sabato\n\nTESTO DI ESEMPIO: qui comparirà il vostro ultimo post con "menu del sabato" nelle prime righe.',
      link: 'https://www.facebook.com/LaMagiostra',
      data: oggi,
    },
  };
}
