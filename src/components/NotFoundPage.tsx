import { pathFor, type Page } from '../lib/routes';

interface Props {
  language: string;
  onNavigate: (page: Page) => void;
}

export default function NotFoundPage({ language, onNavigate }: Props) {
  const it = language === 'it';
  return (
    <div className="min-h-[60vh] bg-stone-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="text-emerald-600 font-semibold tracking-widest uppercase text-sm mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-4">
          {it ? 'Questa pagina non esiste' : 'This page does not exist'}
        </h1>
        <p className="text-stone-600 mb-8">
          {it
            ? 'Il link potrebbe essere errato o la pagina spostata. Torna alla home per trovare quello che cerchi.'
            : 'The link may be wrong or the page may have moved. Go back to the home page to find what you are looking for.'}
        </p>
        <a
          href={pathFor('home')}
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          className="inline-flex bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {it ? 'Torna alla home' : 'Back to home'}
        </a>
      </div>
    </div>
  );
}
