import { ArrowRight, BadgeCheck, Leaf, Package } from 'lucide-react';
import { bioValido, fornitori, type Fornitore } from '../data/team';
import { fornitoreApribile, produttorePath } from '../lib/routes';

interface Props {
  language: string;
  onOpen: (path: string) => void;
}

export default function FornitoriPage({ language, onOpen }: Props) {
  const it = language === 'it';

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="relative bg-emerald-700 text-white py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bancone_frutta_e_verdura.webp')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Package className="w-4 h-4" />
            {it ? 'Produttori locali' : 'Local producers'}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            {it ? 'I Nostri Fornitori' : 'Our Suppliers'}
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {it
              ? 'Collaboriamo con produttori selezionati che condividono i nostri valori di qualità, sostenibilità e rispetto per la terra.'
              : 'We work with selected producers who share our values of quality, sustainability and respect for the land.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="max-w-3xl mx-auto bg-white border border-emerald-900/10 rounded-2xl p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-emerald-900 mb-2">
            <BadgeCheck className="w-6 h-6 text-emerald-700 shrink-0" aria-hidden="true" />
            {it ? 'Prodotti biologici certificati' : 'Certified organic products'}
          </h2>
          <p className="text-stone-700 leading-relaxed">
            {it
              ? `La maggior parte dei nostri produttori è certificata biologica. Sotto il loro nome trovi l’organismo di controllo che li certifica, verificato nel registro europeo dei certificati biologici (per ora ${fornitori.filter((f) => bioValido(f)).length} produttori su ${fornitori.length}). Il negozio non ha una propria certificazione: i prodotti biologici sono certificati dai produttori, e i loro certificati te li mostriamo volentieri in bottega.`
              : `Most of our producers are certified organic. Under their name you will find the control body that certifies them, checked in the EU register of organic certificates (so far ${fornitori.filter((f) => bioValido(f)).length} of ${fornitori.length} producers). The shop itself is not certified: organic products are certified by the producers, and we are happy to show you their certificates in the shop.`}
          </p>
          <p className="text-stone-700 leading-relaxed mt-3">
            {it
              ? 'Anche i produttori senza certificazione li scegliamo con la stessa cura: li conosciamo di persona, siamo andati a vedere come lavorano nei loro campi e laboratori, e sappiamo che cercano materie prime di alto livello. Per alcuni non certificarsi è una scelta: la certificazione porta vincoli che per un piccolo produttore pesano sulla quantità e sul modo di lavorare. Oggi il biologico si trova in quasi ogni supermercato e da solo non basta a dire la qualità: per noi conta sapere chi fa il prodotto e come lo fa.'
              : 'We choose the producers without certification with the same care: we know them personally, we have visited their fields and workshops, and we know they look for top-quality raw materials. For some, not being certified is a choice: certification brings constraints that weigh on how much and how a small producer can work. Today organic products are in almost every supermarket, and the label alone is not enough to tell quality: what matters to us is knowing who makes a product and how.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Griglia elenco={fornitori} it={it} onOpen={onOpen} />
      </section>
    </div>
  );
}

function Griglia({ elenco, it, onOpen }: { elenco: Fornitore[]; it: boolean; onOpen: (path: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
      {elenco.map((f) =>
        fornitoreApribile(f) ? (
          <a
            key={f.slug}
            href={produttorePath(f.slug)}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              onOpen(produttorePath(f.slug));
            }}
            className="group block bg-white rounded-2xl shadow-xs hover:shadow-md border border-stone-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <Scheda f={f} it={it} apribile />
          </a>
        ) : (
          <div key={f.slug} className="bg-white rounded-2xl shadow-xs border border-stone-100 overflow-hidden">
            <Scheda f={f} it={it} apribile={false} />
          </div>
        ),
      )}
    </div>
  );
}

/** Foto (o icona) e nome; "Scopri di più" solo se la scheda si apre. */
function Scheda({ f, it, apribile }: { f: Fornitore; it: boolean; apribile: boolean }) {
  return (
    <>
      <div className="aspect-square overflow-hidden bg-stone-100">
        {f.photo ? (
          <img
            src={f.photo}
            alt={f.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-emerald-50" aria-hidden="true">
            <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-300" />
          </div>
        )}
      </div>
      <div className="p-3 text-center">
        <p className="font-semibold text-stone-800 text-sm leading-tight">{f.name}</p>
        {f.nota && <p className="mt-1 text-stone-500 text-xs">{it ? f.nota.it : f.nota.en}</p>}
        {f.bio && bioValido(f) && (
          <p
            className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full"
            title={`${it ? 'Certificato' : 'Certificate'} ${f.bio.certificato} – ${f.bio.intestatario}`}
          >
            <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
            {it ? 'Bio' : 'Organic'} · {f.bio.ente} {f.bio.codiceEnte}
          </p>
        )}
        {apribile && (
          <p className="mt-1 inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
            {it ? 'Scopri di più' : 'Learn more'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </p>
        )}
      </div>
    </>
  );
}
