import { IS_PROVA } from '../lib/ambiente';

/** Fascia ben visibile in cima al sito di prova, così nessuno lo scambia per quello vero. */
export default function BannerProva() {
  if (!IS_PROVA) return null;
  return (
    <div role="note" className="bg-amber-300 text-stone-900 text-center text-sm font-semibold px-4 py-2">
      Versione di prova · il sito vero è{' '}
      <a href="https://www.lamagiostra.it" className="underline underline-offset-2">
        www.lamagiostra.it
      </a>
    </div>
  );
}
