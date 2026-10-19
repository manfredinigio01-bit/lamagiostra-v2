import { ArrowLeft } from 'lucide-react';
import { pathFor } from '../lib/routes';

interface Props {
  language: string;
  onHome: () => void;
}

/** Fragola disegnata a mano (semplice, senza immagini esterne). */
function Fragola({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <path d="M60 30c-26 0-48 14-48 38 0 30 28 62 48 66 20-4 48-36 48-66 0-24-22-38-48-38z" fill="#d6453d" />
      <path d="M60 30c-26 0-48 14-48 38 0 6 1 12 4 18 4-28 22-44 44-46z" fill="#e8665c" opacity="0.7" />
      {[
        [38, 58], [60, 54], [82, 58], [30, 80], [50, 76], [70, 76], [90, 80],
        [40, 98], [60, 96], [80, 98], [50, 116], [70, 116],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.6" ry="4" fill="#f6d27a" transform={`rotate(${(x - 60) / 2} ${x} ${y})`} />
      ))}
      <path d="M60 34c-6-10-18-14-30-10 8 2 14 6 18 12-10-2-20 2-26 10 12-4 26-2 38-2 12 0 26-2 38 2-6-8-16-12-26-10 4-6 10-10 18-12-12-4-24 0-30 10z" fill="#3f7d4a" />
      <path d="M58 32c0-10 2-18 8-24" stroke="#3f7d4a" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function MagiostraPage({ language, onHome }: Props) {
  const it = language === 'it';

  return (
    <div className="bg-cream min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <a
          href={pathFor('home')}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onHome();
          }}
          className="inline-flex items-center gap-2 text-emerald-800 font-semibold text-sm hover:text-emerald-950 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {it ? 'Torna alla home' : 'Back to home'}
        </a>

        <p className="text-emerald-700 text-sm font-semibold tracking-widest uppercase mb-6">
          {it ? 'Hai trovato il nostro segreto' : 'You found our secret'}
        </p>

        <article className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
            <Fragola className="w-24 sm:w-32 flex-shrink-0 mx-auto sm:mx-0" />
            <div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-emerald-950 leading-none mb-2">
                magiostra
              </h1>
              <p className="text-stone-500 italic mb-5">
                {it ? 's.f., dialetto cremonese e lombardo' : 'noun (f.), Cremonese and Lombard dialect'}
              </p>
              <p className="text-2xl sm:text-3xl text-stone-800">
                = <strong className="text-red-700">{it ? 'fragola' : 'strawberry'}</strong> 🍓
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
            <p>
              {it
                ? 'Nel dialetto di Cremona, come in buona parte della Lombardia, la fragola si chiama magiostra. È da qui che viene il nome della nostra bottega.'
                : 'In the dialect of Cremona, as in much of Lombardy, the strawberry is called magiostra. That is where our shop gets its name.'}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-emerald-900 pt-2">
              {it ? 'Da dove viene la parola?' : 'Where does the word come from?'}
            </h2>
            <p>
              {it
                ? 'Nessuno lo sa con certezza. La spiegazione più popolare la lega al mese di maggio, in dialetto «magg», quando maturano le prime fragole. I linguisti però pensano più probabilmente a una parola gallica, *majoþa, la stessa radice da cui vengono il catalano maduixa e l’occitano majofa.'
                : 'Nobody knows for sure. The popular explanation links it to the month of May («magg» in dialect), when the first strawberries ripen. Linguists, however, more likely trace it to a Gaulish word, *majoþa, the same root behind Catalan maduixa and Occitan majofa.'}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
