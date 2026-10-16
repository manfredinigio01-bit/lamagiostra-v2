import type { ReactNode } from 'react';

// Trasforma i numeri di telefono scritti nei post (es. "320.2254238", "0372 21415", "+39 320 225 4238")
// in link puliti: tel:+39… oppure WhatsApp se poco prima c'è scritto "whatsapp".
// I prezzi ("€ 2,50") e le quantità ("600g") non vengono toccati: servono 9–11 cifre che iniziano con 3 o 0.

const NUMERO = /(?:\+39[\s.-]?)?(?:3\d{2}|0\d{1,3})(?:[\s./-]?\d){5,8}/g;

/** Solo le cifre, con il prefisso italiano: "320.2254238" → "393202254238". */
export function numeroPulito(testo: string): string | null {
  let cifre = testo.replace(/\D/g, '');
  if (cifre.startsWith('39') && cifre.length >= 11) cifre = cifre.slice(2);
  if (cifre.length < 9 || cifre.length > 11) return null;
  if (!/^[03]/.test(cifre)) return null;
  return `39${cifre}`;
}

export function conLinkTelefono(testo: string): ReactNode[] {
  const parti: ReactNode[] = [];
  let ultimo = 0;
  for (const m of testo.matchAll(NUMERO)) {
    const inizio = m.index ?? 0;
    const pulito = numeroPulito(m[0]);
    if (!pulito) continue;
    parti.push(testo.slice(ultimo, inizio));
    const prima = testo.slice(Math.max(0, inizio - 25), inizio).toLowerCase();
    const whatsapp = pulito.startsWith('393') && prima.includes('whatsapp');
    parti.push(
      <a
        key={inizio}
        href={whatsapp ? `https://wa.me/${pulito}` : `tel:+${pulito}`}
        {...(whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-emerald-700 font-semibold underline"
      >
        {m[0]}
      </a>,
    );
    ultimo = inizio + m[0].length;
  }
  parti.push(testo.slice(ultimo));
  return parti;
}
