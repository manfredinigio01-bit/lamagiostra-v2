import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Phone, Smartphone, Store } from 'lucide-react';
import { COMPANY } from '../lib/company';

interface Props {
  language: string;
  /** Classi del pulsante, uguali a quelle del vecchio link "Chiama". */
  className: string;
  /** Testo del pulsante (predefinito: "Chiama"). */
  children?: ReactNode;
}

/** Pulsante "Chiama" che apre una tendina con le due scelte: cellulare e negozio (fisso). */
export default function ChiamaMenu({ language, className, children }: Props) {
  const it = language === 'it';
  const [aperto, setAperto] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  // Si chiude cliccando fuori o premendo Esc.
  useEffect(() => {
    if (!aperto) return;
    const fuori = (e: MouseEvent | TouchEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setAperto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAperto(false);
    document.addEventListener('mousedown', fuori);
    document.addEventListener('touchstart', fuori);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', fuori);
      document.removeEventListener('touchstart', fuori);
      document.removeEventListener('keydown', esc);
    };
  }, [aperto]);

  const voci = [
    { href: `tel:${COMPANY.mobile.tel}`, icona: Smartphone, etichetta: it ? 'Cellulare' : 'Mobile', numero: COMPANY.mobile.display },
    { href: `tel:${COMPANY.landline.tel}`, icona: Store, etichetta: it ? 'Negozio (fisso)' : 'Shop (landline)', numero: COMPANY.landline.display },
  ];

  return (
    <div ref={box} className="relative inline-flex flex-col">
      <button
        type="button"
        onClick={() => setAperto((a) => !a)}
        aria-expanded={aperto}
        aria-controls={id}
        className={className}
      >
        <Phone className="w-5 h-5" />
        {children ?? (it ? 'Chiama' : 'Call')}
      </button>
      {aperto && (
        <div
          id={id}
          className="absolute left-0 right-0 sm:right-auto top-full mt-2 z-30 min-w-60 bg-white rounded-xl shadow-xl border border-stone-200 p-1.5 text-left"
        >
          {voci.map((v) => (
            <a
              key={v.href}
              href={v.href}
              onClick={() => setAperto(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-800 hover:bg-emerald-50"
            >
              <v.icona className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-stone-500 font-medium">{v.etichetta}</span>
                <span className="font-semibold whitespace-nowrap">{v.numero}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
