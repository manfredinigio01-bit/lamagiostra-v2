import { ExternalLink, Leaf, MessageCircle } from 'lucide-react';
import type { Fornitore } from '../data/team';
import { SUGGERIMENTI_FORNITORI } from '../data/team';
import { whatsappLink } from '../lib/company';
import { pathFor } from '../lib/routes';
import DettaglioLayout from './DettaglioLayout';

interface Props {
  language: string;
  fornitore: Fornitore;
  onBack: () => void;
}

export default function ProduttorePage({ language, fornitore, onBack }: Props) {
  const it = language === 'it';
  const whatsapp = whatsappLink(language, {
    it: `Ciao! Vorrei sapere quali prodotti di ${fornitore.name} avete in bottega.`,
    en: `Hi! I would like to know which ${fornitore.name} products you have in the shop.`,
  });

  return (
    <DettaglioLayout
      language={language}
      backHref={pathFor('fornitori')}
      backLabel={it ? 'Torna ai fornitori' : 'Back to suppliers'}
      onBack={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onBack();
      }}
      media={
        <div className="rounded-2xl overflow-hidden aspect-square bg-emerald-50 shadow-md">
          {fornitore.photo ? (
            <img src={fornitore.photo} alt={fornitore.name} decoding="async" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
              <Leaf className="w-20 h-20 text-emerald-300" />
            </div>
          )}
        </div>
      }
      kicker={it ? 'I nostri fornitori' : 'Our suppliers'}
      title={fornitore.name}
      descrizione={fornitore.descrizione}
      dettagli={fornitore.dettagli}
      suggerimenti={SUGGERIMENTI_FORNITORI}
    >
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          {it ? 'Chiedi cosa c’è in bottega' : 'Ask what’s in the shop'}
        </a>
        {fornitore.link && (
          <a
            href={fornitore.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800 px-5 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            {fornitore.link.label}
          </a>
        )}
      </div>
    </DettaglioLayout>
  );
}
