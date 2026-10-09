import { Users, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { pathFor, type Page } from '../lib/routes';
import { whatsappLink } from '../lib/company';

interface Props {
  language: string;
  page: Page;
  onNavigate: (page: Page, anchor?: string) => void;
  onLanguageChange: (lang: string) => void;
}

type NavPage = Exclude<Page, 'not-found'>;

export default function Header({ language, page, onNavigate, onLanguageChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const it = language === 'it';

  const activeSection = (p: NavPage) => page === p;

  const navLinkClass = (p: NavPage) =>
    `relative font-medium transition-colors hover:text-emerald-700 after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-0.5 after:rounded-full ${
      activeSection(p) ? 'text-emerald-800 after:bg-emerald-700' : 'text-stone-600 after:bg-transparent'
    }`;

  const mobileLinkClass = (p: NavPage) =>
    `block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
      activeSection(p) ? 'bg-emerald-100 text-emerald-900' : 'text-stone-700 hover:bg-stone-100'
    }`;

  const langClass = (active: boolean) =>
    `px-3 py-1 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:bg-stone-100'
    }`;

  // Link veri (<a href>): funzionano con clic centrale, "copia indirizzo" e per i motori di ricerca.
  function go(e: React.MouseEvent, p: NavPage, anchor?: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(p, anchor);
    setMobileOpen(false);
  }

  const labels: Record<'classici' | 'ricorrenze' | 'fornitori', string> = {
    classici: it ? 'I Nostri Classici' : 'Our Classics',
    ricorrenze: it ? 'Ricorrenze' : 'Special Occasions',
    fornitori: it ? 'Fornitori' : 'Suppliers',
  };
  const navItems: NavPage[] = ['home', 'classici', 'ricorrenze', 'fornitori'];
  const labelFor = (p: NavPage) => (p === 'home' ? 'Home' : labels[p as keyof typeof labels]);

  return (
    <header className="bg-cream text-stone-800 sticky top-0 z-50 border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <a href={pathFor('home')} onClick={(e) => go(e, 'home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-10 sm:h-12">
              <img
                src="/logo_magiostra_transparent.webp"
                alt="La Magiostra"
                fetchPriority="high"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <p className="font-display text-lg sm:text-2xl font-bold leading-tight text-emerald-900">La Magiostra</p>
              <p className="text-stone-500 text-xs sm:text-sm">
                {it ? 'Negozio di alimentari dal 1987' : 'Grocery store since 1987'}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 items-center" aria-label={it ? 'Menu principale' : 'Main menu'}>
              {navItems.map((p) => (
                <a
                  key={p}
                  href={pathFor(p)}
                  onClick={(e) => go(e, p)}
                  aria-current={page === p ? 'page' : undefined}
                  className={navLinkClass(p)}
                >
                  {labelFor(p)}
                </a>
              ))}
              <a
                href={`${pathFor('home')}#contact`}
                onClick={(e) => go(e, 'home', 'contact')}
                className="font-medium text-stone-600 hover:text-emerald-700 transition-colors"
              >
                {it ? 'Contatti' : 'Contact'}
              </a>
            </nav>

            <div className="hidden md:flex gap-1 items-center">
              <a
                href={pathFor('staff')}
                onClick={(e) => go(e, 'staff')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors text-sm font-medium ${
                  activeSection('staff') ? 'bg-emerald-100 text-emerald-900' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Staff</span>
              </a>
              <button onClick={() => onLanguageChange('it')} aria-pressed={language === 'it'} className={langClass(language === 'it')}>
                IT
              </button>
              <button onClick={() => onLanguageChange('en')} aria-pressed={language === 'en'} className={langClass(language === 'en')}>
                EN
              </button>
            </div>

            <a
              href={whatsappLink(language)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {it ? 'Ordina' : 'Order'}
            </a>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-emerald-900/10 px-4 py-4 space-y-1">
          {navItems.map((p) => (
            <a key={p} href={pathFor(p)} onClick={(e) => go(e, p)} className={mobileLinkClass(p)}>
              {labelFor(p)}
            </a>
          ))}
          <a href={pathFor('staff')} onClick={(e) => go(e, 'staff')} className={mobileLinkClass('staff')}>
            Staff
          </a>
          <a
            href={`${pathFor('home')}#contact`}
            onClick={(e) => go(e, 'home', 'contact')}
            className="block px-4 py-3 rounded-lg transition-colors font-medium text-stone-700 hover:bg-stone-100"
          >
            {it ? 'Contatti' : 'Contact'}
          </a>
          <div className="flex gap-2 px-4 pt-3">
            <button
              onClick={() => { onLanguageChange('it'); setMobileOpen(false); }}
              aria-pressed={language === 'it'}
              className={langClass(language === 'it')}
            >
              IT
            </button>
            <button
              onClick={() => { onLanguageChange('en'); setMobileOpen(false); }}
              aria-pressed={language === 'en'}
              className={langClass(language === 'en')}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
