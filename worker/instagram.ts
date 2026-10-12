// Riconosce, tra gli ultimi post di Instagram, quello del menu della settimana e quello
// della cassetta del venerdì, in base alla frase con cui inizia il testo del post.
//
// Per cambiare le frasi riconosciute basta modificare gli elenchi qui sotto: il confronto
// ignora maiuscole, accenti, emoji e punteggiatura, quindi "🥕 MENÙ della settimana!" va bene.

export const FRASI_MENU = [
  'la proposta della gastronomia',
  'le proposte della gastronomia',
  'la proposte della gastronomia',
  'menu della settimana',
  'il menu della settimana',
]; // i post iniziano con "La PROPOSTE della GASTRONOMIA"
export const FRASI_CASSETTA = ['cassetta del venerdi', 'la cassetta del venerdi', 'cassetta della settimana'];

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
  /** true se i contenuti sono di esempio (solo sul sito di prova, senza collegamento a Instagram). */
  esempio?: boolean;
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

export function iniziaCon(caption: string | undefined, frasi: string[]): boolean {
  if (!caption) return false;
  const inizio = normalizza(caption.slice(0, 200));
  return frasi.some((f) => inizio.startsWith(normalizza(f)));
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

/** I post arrivano da Instagram dal più recente: prende il primo che corrisponde per ciascun tipo. */
export function scegliPost(posts: PostInstagram[]): Risposta {
  const menu = posts.find((p) => iniziaCon(p.caption, FRASI_MENU));
  const cassetta = posts.find((p) => iniziaCon(p.caption, FRASI_CASSETTA));
  return { menu: menu ? versoSito(menu) : null, cassetta: cassetta ? versoSito(cassetta) : null };
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
  };
}
