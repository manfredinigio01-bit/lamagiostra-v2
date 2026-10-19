import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Facebook, Instagram } from 'lucide-react';
import { COMPANY } from '../lib/company';
import { conLinkTelefono } from '../lib/telefoni';

interface PostSito {
  testo: string;
  link: string;
  data: string;
}

interface Risposta {
  menu: PostSito | null;
  cassetta: PostSito | null;
  sabato?: PostSito | null;
  esempio?: boolean;
  fonte?: 'facebook' | 'instagram';
}

// Una sola richiesta per pagina anche se il riquadro compare più volte.
let richiesta: Promise<Risposta | null> | null = null;
function caricaPost(): Promise<Risposta | null> {
  if (!richiesta) {
    richiesta = fetch('/api/social', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? (r.json() as Promise<Risposta>) : null))
      .catch(() => null);
  }
  return richiesta;
}

interface Props {
  tipo: 'menu' | 'cassetta' | 'sabato';
  language: string;
  titolo: string;
  /** Testo mostrato se Instagram non è collegato o non c'è ancora un post. */
  riserva: string;
}

/** L'ultimo post (Facebook o Instagram) del menu o della cassetta, aggiornato da solo. */
export default function InstagramPost({ tipo, language, titolo, riserva }: Props) {
  const it = language === 'it';
  const [stato, setStato] = useState<'carica' | 'pronto'>('carica');
  const [post, setPost] = useState<PostSito | null>(null);
  const [esempio, setEsempio] = useState(false);
  const [fonte, setFonte] = useState<'facebook' | 'instagram'>('facebook');
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    let attivo = true;
    caricaPost().then((r) => {
      if (!attivo) return;
      setPost(r?.[tipo] ?? null);
      setEsempio(Boolean(r?.esempio));
      if (r?.fonte) setFonte(r.fonte);
      setStato('pronto');
    });
    return () => {
      attivo = false;
    };
  }, [tipo]);

  // Sul telefono i post lunghi (come il menu) si accorciano a 10 righe, con "Mostra tutto".
  const lungo = Boolean(post && (post.testo.split('\n').length > 10 || post.testo.length > 450));

  const data = post
    ? new Date(post.data).toLocaleDateString(it ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long' })
    : '';

  return (
    <section className="bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-6 sm:p-7" aria-live="polite">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-bold text-emerald-900 text-lg sm:text-xl">{titolo}</h3>
        {fonte === 'instagram' ? (
          <Instagram className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" aria-hidden="true" />
        ) : (
          <Facebook className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" aria-hidden="true" />
        )}
      </div>

      {stato === 'carica' ? (
        <div className="space-y-2" aria-hidden="true">
          <div className="h-3 bg-stone-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-stone-200 rounded animate-pulse w-full" />
          <div className="h-3 bg-stone-200 rounded animate-pulse w-2/3" />
        </div>
      ) : post ? (
        <>
          {esempio && (
            <p className="mb-3 inline-block bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-1 rounded">
              Esempio: Facebook non ancora collegato
            </p>
          )}
          <p
            id={`post-${tipo}`}
            className={`text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line ${
              lungo && !aperto ? 'line-clamp-[10] sm:line-clamp-none' : ''
            }`}
          >
            {conLinkTelefono(post.testo)}
          </p>
          {lungo && (
            <button
              type="button"
              onClick={() => setAperto((a) => !a)}
              aria-expanded={aperto}
              aria-controls={`post-${tipo}`}
              className="sm:hidden mt-2 inline-flex items-center gap-1 text-emerald-700 font-semibold text-sm"
            >
              {aperto ? (it ? 'Mostra meno' : 'Show less') : it ? 'Mostra tutto' : 'Show all'}
              {aperto ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          <p className="mt-4 text-sm text-stone-500">
            {it ? 'Pubblicato il' : 'Posted on'} {data} ·{' '}
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">
              {fonte === 'instagram'
                ? it ? 'Apri su Instagram' : 'Open on Instagram'
                : it ? 'Apri su Facebook' : 'Open on Facebook'}
            </a>
          </p>
        </>
      ) : (
        <>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{riserva}</p>
          <a
            href={COMPANY.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:underline"
          >
            <Facebook className="w-4 h-4" aria-hidden="true" />
            {it ? 'Seguici su Facebook' : 'Follow us on Facebook'}
          </a>
        </>
      )}
    </section>
  );
}
