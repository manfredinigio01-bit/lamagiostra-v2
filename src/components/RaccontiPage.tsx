import { useState } from 'react';
import { raccontiVisibili, raccontoPath, type TipoRacconto } from '../data/racconti';
import { IS_PROVA } from '../lib/ambiente';
import { TIPI, dataLeggibile } from '../lib/racconti-ui';

interface Props {
  language: string;
  onOpen: (url: string) => void;
}

type Filtro = 'tutti' | TipoRacconto;

const PLURALI: Record<TipoRacconto, { it: string; en: string }> = {
  racconto: { it: 'Racconti', en: 'Stories' },
  ricetta: { it: 'Ricette', en: 'Recipes' },
  foto: { it: 'Foto', en: 'Photos' },
};

/** Elenco dei racconti: storie, ricette e foto dalla bottega. */
export default function RaccontiPage({ language, onOpen }: Props) {
  const it = language === 'it';
  const tutti = raccontiVisibili(IS_PROVA);
  const [filtro, setFiltro] = useState<Filtro>('tutti');
  const tipiPresenti = (Object.keys(TIPI) as TipoRacconto[]).filter((t) => tutti.some((r) => r.tipo === t));
  const lista = filtro === 'tutti' ? tutti : tutti.filter((r) => r.tipo === filtro);

  const filtri: { id: Filtro; label: string }[] = [
    { id: 'tutti', label: it ? 'Tutti' : 'All' },
    ...tipiPresenti.map((t) => ({ id: t as Filtro, label: it ? PLURALI[t].it : PLURALI[t].en })),
  ];

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <p className="text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-3">
          {it ? 'Dalla cucina e dal banco' : 'From the kitchen and the counter'}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-emerald-950 mb-4">{it ? 'Racconti dalla bottega' : 'Stories from the shop'}</h1>
        <p className="text-lg text-stone-600 max-w-2xl mb-8">
          {it
            ? 'Storie, ricette e foto di quello che facciamo ogni giorno: i piatti, le persone e i produttori.'
            : 'Stories, recipes and photos of what we do every day: the dishes, the people and the producers.'}
        </p>

        {tipiPresenti.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label={it ? 'Filtra per tipo' : 'Filter by type'}>
            {filtri.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filtro === f.id}
                onClick={() => setFiltro(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  filtro === f.id ? 'bg-emerald-700 border-emerald-700 text-white' : 'bg-white border-stone-300 text-stone-700 hover:border-emerald-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((r) => {
            const tipo = TIPI[r.tipo];
            const Icona = tipo.icona;
            const href = raccontoPath(r.slug);
            return (
              <a
                key={r.slug}
                href={href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onOpen(href);
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-4/3 bg-emerald-50 overflow-hidden">
                  {r.copertina ? (
                    <img src={r.copertina} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                      <Icona className="w-16 h-16 text-emerald-300" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
                    <Icona className="w-4 h-4" aria-hidden="true" />
                    {it ? tipo.it : tipo.en}
                    <span className="text-stone-400 normal-case tracking-normal font-normal">· {dataLeggibile(r.data, language)}</span>
                    {r.bozza && <span className="ml-auto bg-amber-100 text-amber-800 px-2 py-0.5 rounded normal-case tracking-normal">{it ? 'Bozza' : 'Draft'}</span>}
                  </p>
                  <h2 className="text-xl font-bold text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors">{it ? r.titolo.it : r.titolo.en}</h2>
                  <p className="text-stone-600">{it ? r.sommario.it : r.sommario.en}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
