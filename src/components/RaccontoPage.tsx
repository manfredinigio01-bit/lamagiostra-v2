import { useEffect } from 'react';
import { ArrowLeft, Clock, GraduationCap, MessageCircle, Users } from 'lucide-react';
import { isGruppo, txt, type Racconto, type Riga } from '../data/racconti';
import { pathFor } from '../lib/routes';
import { whatsappLink, COMPANY } from '../lib/company';
import { TIPI, dataLeggibile } from '../lib/racconti-ui';

interface Props {
  language: string;
  racconto: Racconto;
  onBack: () => void;
}

const paragrafi = (testo: string) => testo.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const soloRighe = (righe: Riga[]) => righe.filter((r) => !isGruppo(r)) as Exclude<Riga, { gruppo: unknown }>[];

/** Dati per Google: le ricette come "Recipe" (possono comparire con la foto nei risultati), il resto come articolo. */
function useDatiStrutturati(r: Racconto) {
  useEffect(() => {
    if (r.bozza) return;
    const origine = window.location.origin;
    const base = {
      '@context': 'https://schema.org',
      name: txt(r.titolo, 'it'),
      headline: txt(r.titolo, 'it'),
      description: txt(r.sommario, 'it'),
      image: r.copertina ? [origine + r.copertina] : undefined,
      datePublished: r.data,
      author: { '@type': 'Organization', name: COMPANY.brand },
      url: origine + window.location.pathname,
    };
    const dati = r.ricetta
      ? {
          ...base,
          '@type': 'Recipe',
          recipeCategory: r.corso,
          recipeYield: r.ricetta.porzioni ? txt(r.ricetta.porzioni, 'it') : undefined,
          recipeIngredient: soloRighe(r.ricetta.ingredienti).map((i) => txt(i, 'it')),
          recipeInstructions: soloRighe(r.ricetta.passaggi).map((p) => ({ '@type': 'HowToStep', text: txt(p, 'it') })),
        }
      : { ...base, '@type': 'BlogPosting' };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'ld-racconto';
    el.textContent = JSON.stringify(dati);
    document.head.appendChild(el);
    return () => el.remove();
  }, [r]);
}

export default function RaccontoPage({ language, racconto: r, onBack }: Props) {
  const it = language === 'it';
  const tipo = TIPI[r.tipo];
  const Icona = tipo.icona;
  const t = (x: Parameters<typeof txt>[0]) => txt(x, language);
  useDatiStrutturati(r);

  const whatsapp = whatsappLink(language, {
    it: `Ciao! Ho letto «${txt(r.titolo, 'it')}» sul sito e vorrei qualche informazione.`,
    en: `Hi! I read “${txt(r.titolo, 'en')}” on your website and I'd like some information.`,
  });

  // Numerazione dei passaggi che riparte dopo ogni titoletto di gruppo.
  let numero = 0;
  const passaggi = r.ricetta?.passaggi.map((p) => {
    if (isGruppo(p)) {
      numero = 0;
      return { gruppo: t(p.gruppo) };
    }
    numero += 1;
    return { numero, testo: t(p) };
  });

  return (
    <article className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <a
          href={pathFor('racconti')}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:text-emerald-950 mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {it ? 'Tutti i racconti' : 'All stories'}
        </a>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-3">
          <Icona className="w-4 h-4" aria-hidden="true" />
          {it ? tipo.it : tipo.en}
          <span className="text-stone-500 normal-case tracking-normal font-normal">· {dataLeggibile(r.data, language)}</span>
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-emerald-950 mb-4 leading-tight">{t(r.titolo)}</h1>
        <p className="text-lg sm:text-xl text-stone-600 mb-6">{t(r.sommario)}</p>

        {(r.corso || r.ricetta?.porzioni || r.ricetta?.tempo) && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 text-stone-700">
            {r.corso && (
              <p className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                {it ? `Dal nostro corso «${r.corso}»` : `From our cooking class “${r.corso}”`}
              </p>
            )}
            {r.ricetta?.porzioni && (
              <p className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                {t(r.ricetta.porzioni)}
              </p>
            )}
            {r.ricetta?.tempo && (
              <p className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                {t(r.ricetta.tempo)}
              </p>
            )}
          </div>
        )}

        {r.copertina && (
          <img src={r.copertina} alt={t(r.titolo)} decoding="async" className="w-full rounded-2xl mb-8 aspect-4/3 object-cover bg-stone-200" />
        )}

        {r.testo && (
          <div className="space-y-5 text-lg leading-relaxed text-stone-800 mb-10">
            {paragrafi(t(r.testo)).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {r.ricetta && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-10 grid md:grid-cols-[2fr_3fr] gap-8">
            <div>
              <h2 className="text-xl font-bold text-emerald-900 mb-4">{it ? 'Ingredienti' : 'Ingredients'}</h2>
              <ul className="space-y-2 text-stone-800">
                {r.ricetta.ingredienti.map((ing, i) =>
                  isGruppo(ing) ? (
                    <li key={i} className="pt-3 first:pt-0 font-semibold text-emerald-900">
                      {t(ing.gruppo)}
                    </li>
                  ) : (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" aria-hidden="true" />
                      {t(ing)}
                    </li>
                  ),
                )}
              </ul>
              {r.ricetta.strumenti && r.ricetta.strumenti.length > 0 && (
                <>
                  <h2 className="text-lg font-bold text-emerald-900 mt-8 mb-3">{it ? 'Strumenti' : 'Equipment'}</h2>
                  <p className="text-stone-700">{r.ricetta.strumenti.map((s) => t(s)).join(' · ')}</p>
                </>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-900 mb-4">{it ? 'Preparazione' : 'Method'}</h2>
              {passaggi && passaggi.length > 0 ? (
                <ol className="space-y-4 text-stone-800">
                  {passaggi.map((p, i) =>
                    'gruppo' in p ? (
                      <li key={i} className="pt-3 first:pt-0 font-semibold text-emerald-900 list-none">
                        {p.gruppo}
                      </li>
                    ) : (
                      <li key={i} className="flex gap-3">
                        <span className="w-7 h-7 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center shrink-0">
                          {p.numero}
                        </span>
                        <span className="pt-0.5">{p.testo}</span>
                      </li>
                    ),
                  )}
                </ol>
              ) : (
                <p className="text-stone-600">{it ? 'Il procedimento lo spieghiamo al corso: chiedici in bottega.' : 'We explain the method in class: ask us in the shop.'}</p>
              )}
              {r.ricetta.note && (
                <p className="mt-6 bg-emerald-50 border border-emerald-900/10 rounded-xl p-4 text-stone-800">
                  <span className="font-semibold text-emerald-900">{it ? 'Consiglio: ' : 'Tip: '}</span>
                  {t(r.ricetta.note)}
                </p>
              )}
            </div>
          </div>
        )}

        {r.foto && r.foto.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {r.foto.map((f, i) => (
              <figure key={i}>
                <img src={f.src} alt={f.didascalia ? t(f.didascalia) : ''} loading="lazy" decoding="async" className="w-full aspect-4/3 object-cover rounded-xl bg-stone-200" />
                {f.didascalia && <figcaption className="text-sm text-stone-600 mt-2">{t(f.didascalia)}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {!it && <p className="text-sm text-stone-500 mb-8">This recipe is currently available in Italian only.</p>}

        <div className="border-t border-emerald-900/10 pt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <p className="text-stone-700">{it ? 'Ti è venuta voglia di assaggiare? Passa in bottega o scrivici.' : 'Feel like tasting it? Drop by the shop or message us.'}</p>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors shrink-0"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            {it ? 'Scrivici su WhatsApp' : 'Message us on WhatsApp'}
          </a>
        </div>
      </div>
    </article>
  );
}
