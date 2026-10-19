import { Banknote, CreditCard, Landmark, Smartphone, Ticket, Wallet } from 'lucide-react';

interface Props {
  language: string;
  /** Spazio sotto il riquadro e simili. */
  className?: string;
  /** 'cream' in home (come le schede vicine), 'white' nelle pagine con sfondo chiaro. */
  sfondo?: 'cream' | 'white';
}

/** Metodi di pagamento accettati in bottega. Per cambiarli basta modificare l'elenco qui sotto. */
const METODI = [
  { icona: Banknote, it: 'Contanti', en: 'Cash' },
  { icona: CreditCard, it: 'Carte e bancomat', en: 'Card payments' },
  { icona: Smartphone, it: 'Satispay', en: 'Satispay' },
  { icona: Ticket, it: 'Buoni pasto Satispay ed Edenred', en: 'Satispay and Edenred meal vouchers' },
  { icona: Landmark, it: 'Bonifico istantaneo', en: 'Instant bank transfer' },
];

export default function Pagamenti({ language, className = '', sfondo = 'cream' }: Props) {
  const it = language === 'it';
  return (
    <section
      className={`${sfondo === 'white' ? 'bg-white border-stone-200 shadow-xs sm:p-8' : 'bg-cream border-emerald-900/10'} border rounded-2xl p-6 ${className}`} aria-labelledby="pagamenti-titolo">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="w-6 h-6 text-emerald-700" aria-hidden="true" />
        <h3 id="pagamenti-titolo" className="text-lg font-bold text-emerald-900">
          {it ? 'Come puoi pagare' : 'How you can pay'}
        </h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {METODI.map((m) => (
          <li
            key={m.it}
            className="inline-flex items-center gap-2 bg-white border border-emerald-900/10 rounded-full px-3 py-1.5 text-sm text-stone-700"
          >
            <m.icona className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            {it ? m.it : m.en}
          </li>
        ))}
      </ul>
    </section>
  );
}
