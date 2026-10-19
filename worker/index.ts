// Piccolo programma che gira su Cloudflare accanto al sito.
// - /api/social (e il vecchio /api/instagram): l'ultimo post del menu e della cassetta, letti
//   dall'API ufficiale di Meta. È il server a parlare con Meta, non il browser dei visitatori:
//   nessun cookie o tracciamento di Meta sul sito.
// - Tutto il resto: i file del sito, come prima.
//
// Configurazione su Cloudflare (Settings → Variables and secrets). Basta UNA delle due fonti:
// - Facebook (consigliata): FB_PAGE_ID (l'ID numerico della pagina, in wrangler.jsonc) e
//   FB_TOKEN (segreto, token di accesso della pagina: quello ottenuto da un token utente
//   a lungo termine non scade).
// - Instagram: IG_TOKEN (segreto), token a lungo termine dell'account professionale (60 giorni).
// - Facoltativo, spazio KV "IG" (binding): conserva l'ultima risposta valida e il token Instagram
//   rinnovato ogni giorno.

import { esempio, scegliPost, type PostInstagram, type Risposta } from './instagram';

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  FB_PAGE_ID?: string;
  FB_TOKEN?: string;
  IG_TOKEN?: string;
  IG?: KV;
  AMBIENTE?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

const CACHE_SECONDI = 60 * 60; // un'ora
const API = 'https://graph.instagram.com';
// Le versioni dell'API di Facebook restano valide circa due anni: se un giorno smette di
// funzionare, la prima cosa da provare è aggiornare questo numero.
const FB_API = 'https://graph.facebook.com/v26.0';

interface PostFacebook {
  id: string;
  message?: string;
  permalink_url?: string;
  created_time: string;
}

async function leggiFacebook(env: Env): Promise<Risposta | null> {
  if (!env.FB_PAGE_ID || !env.FB_TOKEN) return null;
  const url = `${FB_API}/${encodeURIComponent(env.FB_PAGE_ID)}/posts?fields=id,message,permalink_url,created_time&limit=30&access_token=${encodeURIComponent(env.FB_TOKEN)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    // Il messaggio di errore di Facebook (mai il token) aiuta a capire cosa non va.
    let dettaglio = '';
    try {
      const e = (await res.json()) as { error?: { message?: string; code?: number } };
      dettaglio = e.error ? ` (${e.error.code}: ${e.error.message})` : '';
    } catch {
      /* risposta non JSON */
    }
    throw new Error(`Facebook ha risposto ${res.status}${dettaglio}`);
  }
  const json = (await res.json()) as { data?: PostFacebook[] };
  const posts: PostInstagram[] = (json.data ?? []).map((p) => ({
    id: p.id,
    caption: p.message,
    permalink: p.permalink_url ?? `https://www.facebook.com/${p.id}`,
    timestamp: p.created_time,
  }));
  return { ...scegliPost(posts), fonte: 'facebook' };
}

async function token(env: Env): Promise<string | undefined> {
  return (await env.IG?.get('token')) || env.IG_TOKEN || undefined;
}

async function leggiInstagram(env: Env): Promise<Risposta | null> {
  const t = await token(env);
  if (!t) return null;
  const url = `${API}/me/media?fields=id,caption,permalink,timestamp&limit=30&access_token=${encodeURIComponent(t)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Instagram ha risposto ${res.status}`);
  const json = (await res.json()) as { data?: PostInstagram[] };
  return { ...scegliPost(json.data ?? []), fonte: 'instagram' };
}

/** Facebook se configurato, altrimenti Instagram. */
async function leggiPost(env: Env): Promise<Risposta | null> {
  return (await leggiFacebook(env)) ?? (await leggiInstagram(env));
}

function json(body: unknown, maxAge: number): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${maxAge}`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function apiSocial(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const cache = (caches as unknown as { default: Cache }).default;
  const chiave = new Request(new URL('/api/social', request.url).toString());
  const inCache = await cache.match(chiave);
  if (inCache) return inCache;

  let risposta: Risposta | null = null;
  let diagnosi = '';
  try {
    risposta = await leggiPost(env);
    if (!risposta) diagnosi = `non configurato: FB_PAGE_ID ${env.FB_PAGE_ID ? 'presente' : 'mancante'}, FB_TOKEN ${env.FB_TOKEN ? 'presente' : 'mancante'}`;
    if (risposta && env.IG) ctx.waitUntil(env.IG.put('ultima', JSON.stringify(risposta)));
  } catch (e) {
    diagnosi = e instanceof Error ? e.message : 'errore sconosciuto';
    // Meta non risponde: usa l'ultima risposta valida, se c'è.
    const ultima = await env.IG?.get('ultima');
    if (ultima) risposta = JSON.parse(ultima) as Risposta;
  }

  if (!risposta) {
    // Non collegato (o nessun dato): sul sito di prova un esempio, sul sito vero il testo fisso.
    risposta = env.AMBIENTE === 'prova' ? esempio() : { menu: null, cassetta: null, sabato: null };
  }
  // Solo sul sito di prova: perché non ci sono post veri (aiuta a configurare il collegamento).
  if (env.AMBIENTE === 'prova' && diagnosi) risposta = { ...risposta, diagnosi };

  // Post veri: un'ora. Esempio o nessun post: un minuto, così un collegamento nuovo si vede subito.
  const veri = !risposta.esempio && (risposta.menu || risposta.cassetta || risposta.sabato);
  const res = json(risposta, veri ? CACHE_SECONDI : 60);
  ctx.waitUntil(cache.put(chiave, res.clone()));
  return res;
}

/** Ogni giorno: rinnova il token (vale 60 giorni) e lo salva nello spazio KV, se configurato. */
async function rinnovaToken(env: Env): Promise<void> {
  if (env.FB_TOKEN) return; // il token della pagina Facebook non scade
  const t = await token(env);
  if (!t || !env.IG) return;
  const res = await fetch(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(t)}`);
  if (!res.ok) return;
  const { access_token } = (await res.json()) as { access_token?: string };
  if (access_token) await env.IG.put('token', access_token);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/social' || pathname === '/api/instagram') {
      if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 });
      return apiSocial(request, env, ctx);
    }
    if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },

  async scheduled(_event: unknown, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(rinnovaToken(env));
  },
};
