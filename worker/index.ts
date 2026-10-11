// Piccolo programma che gira su Cloudflare accanto al sito.
// - /api/instagram: restituisce l'ultimo post del menu e della cassetta, letti dall'API
//   ufficiale di Instagram. È il server a parlare con Instagram, non il browser dei
//   visitatori: nessun cookie o tracciamento di Meta sul sito.
// - Tutto il resto: i file del sito, come prima.
//
// Configurazione su Cloudflare (Settings → Variables and secrets):
// - IG_TOKEN (segreto): token di accesso a lungo termine dell'account Instagram professionale.
// - Facoltativo, spazio KV "IG" (binding): conserva il token rinnovato e l'ultima risposta valida.
//   Senza KV funziona lo stesso, ma il token va rinnovato a mano ogni 60 giorni.

import { esempio, scegliPost, type PostInstagram, type Risposta } from './instagram';

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  IG_TOKEN?: string;
  IG?: KV;
  AMBIENTE?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

const CACHE_SECONDI = 60 * 60; // un'ora
const API = 'https://graph.instagram.com';

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
  return scegliPost(json.data ?? []);
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

async function apiInstagram(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const cache = (caches as unknown as { default: Cache }).default;
  const chiave = new Request(new URL('/api/instagram', request.url).toString());
  const inCache = await cache.match(chiave);
  if (inCache) return inCache;

  let risposta: Risposta | null = null;
  try {
    risposta = await leggiInstagram(env);
    if (risposta && env.IG) ctx.waitUntil(env.IG.put('ultima', JSON.stringify(risposta)));
  } catch {
    // Instagram non risponde: usa l'ultima risposta valida, se c'è.
    const ultima = await env.IG?.get('ultima');
    if (ultima) risposta = JSON.parse(ultima) as Risposta;
  }

  if (!risposta) {
    // Non collegato (o nessun dato): sul sito di prova un esempio, sul sito vero il testo fisso.
    risposta = env.AMBIENTE === 'prova' ? esempio() : { menu: null, cassetta: null };
  }

  const res = json(risposta, CACHE_SECONDI);
  ctx.waitUntil(cache.put(chiave, res.clone()));
  return res;
}

/** Ogni giorno: rinnova il token (vale 60 giorni) e lo salva nello spazio KV, se configurato. */
async function rinnovaToken(env: Env): Promise<void> {
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
    if (pathname === '/api/instagram') {
      if (request.method !== 'GET' && request.method !== 'HEAD') return new Response(null, { status: 405 });
      return apiInstagram(request, env, ctx);
    }
    if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },

  async scheduled(_event: unknown, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(rinnovaToken(env));
  },
};
