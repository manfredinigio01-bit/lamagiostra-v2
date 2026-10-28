import { useState } from 'react';
import { Star } from 'lucide-react';
import { COMPANY } from '../lib/company';

interface Props {
  language: string;
  className?: string;
}

/**
 * Invito a lasciare una recensione su Google. Le stelle sono un invito visivo:
 * qualsiasi stella si tocchi, si apre il modulo delle recensioni di Google,
 * dove si sceglie il voto e si scrive il commento. Il sito non salva nulla.
 */
export default function Recensioni({ language, className = '' }: Props) {
  const it = language === 'it';
  const [accese, setAccese] = useState(0);
  const link = { href: COMPANY.googleReviewUrl, target: '_blank', rel: 'noopener noreferrer' } as const;

  return (
    <section
      className={`bg-cream border border-emerald-900/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 ${className}`}
      aria-labelledby="recensioni-titolo"
    >
      <div className="flex-1">
        <h3 id="recensioni-titolo" className="text-xl font-bold text-emerald-900 mb-1.5">
          {it ? 'Ti siamo piaciuti? Lasciaci una recensione' : 'Did you enjoy it? Leave us a review'}
        </h3>
        <p className="text-stone-700">
          {it
            ? 'Bastano due righe su Google: aiutano altre persone a scoprire la bottega, e a noi fa sempre piacere leggervi.'
            : 'A couple of lines on Google help other people discover the shop, and we always enjoy reading them.'}
        </p>
      </div>
      <div className="flex flex-col items-start md:items-center gap-3">
        <div className="flex gap-1" onMouseLeave={() => setAccese(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <a
              key={n}
              {...link}
              onMouseEnter={() => setAccese(n)}
              onFocus={() => setAccese(n)}
              onBlur={() => setAccese(0)}
              aria-label={it ? `${n} ${n === 1 ? 'stella' : 'stelle'}: scrivi una recensione su Google` : `${n} star${n === 1 ? '' : 's'}: write a review on Google`}
              className="p-1 rounded-md focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              <Star
                className={`w-8 h-8 transition-colors ${n <= accese ? 'fill-amber-400 text-amber-500' : 'fill-transparent text-amber-500'}`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <a
          {...link}
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
        >
          {it ? 'Scrivi una recensione su Google' : 'Write a review on Google'}
        </a>
      </div>
    </section>
  );
}
