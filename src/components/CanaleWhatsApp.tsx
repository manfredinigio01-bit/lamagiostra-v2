import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../lib/company';

/** Invito a seguire il canale WhatsApp. Non mostra niente finché COMPANY.whatsappChannel è vuoto. */
export default function CanaleWhatsApp({ language }: { language: string }) {
  if (!COMPANY.whatsappChannel) return null;
  const it = language === 'it';
  return (
    <a
      href={COMPANY.whatsappChannel}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-2xl border border-emerald-700/30 bg-emerald-50 p-5 hover:bg-emerald-100 transition-colors"
    >
      <MessageCircle className="w-8 h-8 text-emerald-700 shrink-0" aria-hidden="true" />
      <span>
        <span className="block font-bold text-emerald-900">
          {it ? 'Il menu e la cassetta su WhatsApp' : 'Menu and veg box on WhatsApp'}
        </span>
        <span className="block text-sm text-stone-700">
          {it
            ? 'Segui il nostro canale e attiva la campanella: ogni settimana ti arriva il menu, la cassetta del venerdì e le novità della bottega.'
            : 'Follow our channel and turn on notifications: every week you get the menu, the Friday veg box and news from the shop.'}
        </span>
      </span>
    </a>
  );
}
