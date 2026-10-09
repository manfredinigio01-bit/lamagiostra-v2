import { COMPANY } from '../lib/company';
import { pathFor, type Page } from '../lib/routes';

interface Props {
  language: string;
  tagline: string;
  onNavigate: (page: Page) => void;
}

export default function Footer({ language, tagline, onNavigate }: Props) {
  const it = language === 'it';

  function go(e: React.MouseEvent, p: 'privacy' | 'cookie') {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(p);
  }

  return (
    <footer className="bg-emerald-900 text-emerald-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <img src="/logo_magiostra_transparent.webp" alt="" className="h-9 w-auto object-contain brightness-0 invert opacity-90" />
            <span className="font-display font-bold text-xl text-white">{COMPANY.brand}</span>
          </div>
          <p className="text-sm">{tagline}</p>
          <div className="text-xs text-emerald-200 space-y-0.5">
            <p>
              {COMPANY.legalName} — P.IVA {COMPANY.vatNumber}
              {COMPANY.reaNumber ? ` — REA ${COMPANY.reaNumber}` : ''}
            </p>
            <p>
              {COMPANY.street}, {COMPANY.postalCode} {COMPANY.city} ({COMPANY.province}) —{' '}
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors underline">
                {COMPANY.email}
              </a>
            </p>
            {COMPANY.pec && <p>PEC: {COMPANY.pec}</p>}
          </div>
          <div className="flex items-center gap-4 text-xs text-emerald-200">
            <a href={pathFor('privacy')} onClick={(e) => go(e, 'privacy')} className="hover:text-white transition-colors underline">
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href={pathFor('cookie')} onClick={(e) => go(e, 'cookie')} className="hover:text-white transition-colors underline">
              Cookie Policy
            </a>
          </div>
          <p className="text-xs text-emerald-300">
            &copy; {new Date().getFullYear()} {COMPANY.brand}. {it ? 'Tutti i diritti riservati.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
