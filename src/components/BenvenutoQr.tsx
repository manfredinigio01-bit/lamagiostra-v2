import { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, MessageCircle, X } from 'lucide-react';
import { COMPANY } from '../lib/company';

// Popup di benvenuto per chi arriva dal QR code stampato (volantini, cartoncini in negozio).
// Il QR porta a www.lamagiostra.it/?qr=1: solo in quel caso si apre il popup con i social.
// Chi arriva da Google o scrivendo l'indirizzo non lo vede mai.
const PARAMETRO = 'qr';

export default function BenvenutoQr({ language }: { language: string }) {
  const [aperto, setAperto] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const it = language === 'it';

  // All'apertura: se c'è ?qr=1 mostra il popup e toglie il parametro dall'indirizzo,
  // così ricaricando o condividendo la pagina il popup non ricompare.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(PARAMETRO)) return;
    url.searchParams.delete(PARAMETRO);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    setAperto(true);
  }, []);

  useEffect(() => {
    if (!aperto) return;
    boxRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAperto(false);
    };
    const overflowPrima = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflowPrima;
      document.removeEventListener('keydown', onKey);
    };
  }, [aperto]);

  if (!aperto) return null;

  const link = [
    {
      href: COMPANY.instagram,
      icona: Instagram,
      testo: 'Instagram',
      sotto: it ? 'Piatti del giorno e vita di bottega' : 'Daily dishes and shop life',
    },
    {
      href: COMPANY.facebook,
      icona: Facebook,
      testo: 'Facebook',
      sotto: it ? 'Menu, eventi e novità' : 'Menu, events and news',
    },
    ...(COMPANY.whatsappChannel
      ? [
          {
            href: COMPANY.whatsappChannel,
            icona: MessageCircle,
            testo: it ? 'Canale WhatsApp' : 'WhatsApp channel',
            sotto: it ? 'Il menu e la cassetta ogni settimana' : 'The menu and veg box every week',
          },
        ]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setAperto(false);
      }}
    >
      <div
        ref={boxRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="benvenuto-qr-titolo"
        className="relative w-full max-w-sm rounded-2xl bg-cream p-6 pt-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={() => setAperto(false)}
          aria-label={it ? 'Chiudi' : 'Close'}
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-stone-600 hover:bg-stone-200 hover:text-stone-900"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        <h2 id="benvenuto-qr-titolo" className="mb-2 pr-8 text-2xl font-bold text-emerald-950">
          {it ? 'Benvenuto da La Magiostra!' : 'Welcome to La Magiostra!'}
        </h2>
        <p className="mb-5 text-stone-700">
          {it
            ? 'Seguici sui social per il menu della settimana, la cassetta del venerdì e le novità dalla bottega.'
            : 'Follow us for the weekly menu, the Friday veg box and news from the shop.'}
        </p>

        <ul className="space-y-3">
          {link.map(({ href, icona: Icona, testo, sotto }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center gap-4 rounded-xl bg-emerald-700 px-4 py-3 text-white transition-colors hover:bg-emerald-800"
              >
                <Icona className="h-7 w-7 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-semibold leading-tight">{testo}</span>
                  <span className="block text-sm text-emerald-50">{sotto}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setAperto(false)}
          className="mx-auto mt-5 block min-h-11 px-4 font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
        >
          {it ? 'Continua sul sito' : 'Continue to the website'}
        </button>
      </div>
    </div>
  );
}
