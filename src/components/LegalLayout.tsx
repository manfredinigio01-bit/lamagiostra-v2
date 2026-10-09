import type { ReactNode } from 'react';

export function LegalLayout({ title, subtitle, updated, children }: { title: string; subtitle: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-2">{title}</h1>
          <p className="text-stone-500 text-sm mb-8">{subtitle}</p>
          {children}
          <p className="text-stone-500 text-xs border-t border-stone-100 pt-6">{updated}</p>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-emerald-800 mb-3">{title}</h2>
      <div className="space-y-3 text-stone-700 leading-relaxed">{children}</div>
    </section>
  );
}
