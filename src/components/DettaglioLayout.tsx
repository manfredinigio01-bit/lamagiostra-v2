import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Dettaglio, Testo } from '../data/team';
import { IS_PROVA } from '../lib/ambiente';

interface Props {
  language: string;
  backHref: string;
  backLabel: string;
  onBack: (e: React.MouseEvent) => void;
  media: ReactNode;
  kicker: string;
  title: string;
  descrizione?: Testo;
  dettagli?: Dettaglio[];
  suggerimenti: Testo[];
  children?: ReactNode;
}

/** Riquadro "da completare": compare solo sul sito di prova, mai su quello vero. */
function DaCompletare({ children }: { children: ReactNode }) {
  if (!IS_PROVA) return null;
  return (
    <div className="border-2 border-dashed border-amber-400 bg-amber-50 text-amber-900 rounded-xl p-4 text-sm">
      <p className="font-semibold mb-1">Da completare (visibile solo nella versione di prova)</p>
      {children}
    </div>
  );
}

/** Struttura comune delle pagine di approfondimento di persone e produttori. */
export default function DettaglioLayout({
  language,
  backHref,
  backLabel,
  onBack,
  media,
  kicker,
  title,
  descrizione,
  dettagli,
  suggerimenti,
  children,
}: Props) {
  const it = language === 'it';
  const paragrafi = descrizione ? (it ? descrizione.it : descrizione.en).split(/\n\s*\n/).filter(Boolean) : [];
  const righe = dettagli ?? [];

  return (
    <div className="bg-stone-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <a
          href={backHref}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-emerald-800 font-semibold text-sm hover:text-emerald-950 mb-6 sm:mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </a>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-2 w-full max-w-sm mx-auto md:mx-0">{media}</div>

          <div className="md:col-span-3 space-y-6">
            <header>
              <p className="text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-2">{kicker}</p>
              <h1 className="text-3xl sm:text-5xl font-bold text-emerald-950 leading-tight">{title}</h1>
            </header>

            {paragrafi.length > 0 ? (
              <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
                {paragrafi.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <DaCompletare>
                <p>Una breve presentazione di 2–4 frasi, in italiano e in inglese.</p>
              </DaCompletare>
            )}

            {righe.length > 0 ? (
              <dl className="divide-y divide-stone-200 border-y border-stone-200">
                {righe.map((d, i) => (
                  <div key={i} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-semibold text-emerald-900">{it ? d.etichetta.it : d.etichetta.en}</dt>
                    <dd className="text-stone-700 sm:col-span-2 mt-1 sm:mt-0">{it ? d.valore.it : d.valore.en}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <DaCompletare>
                <p className="mb-1">Informazioni utili ai clienti, per esempio:</p>
                <ul className="list-disc list-inside">
                  {suggerimenti.map((s, i) => (
                    <li key={i}>{s.it}</li>
                  ))}
                </ul>
              </DaCompletare>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
