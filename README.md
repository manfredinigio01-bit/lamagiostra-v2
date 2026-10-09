# La Magiostra – sito web

Sito vetrina di **La Magiostra**, negozio di alimentari e gastronomia vegetariana e vegana a Cremona (dal 1987).
Costruito con Vite + React + TypeScript + Tailwind. **Nessun database e nessun server**: il sito è fatto solo di file statici, quindi non ha password da custodire né servizi che possano andare in pausa.

## Dove si modificano le cose

| Cosa | File |
| --- | --- |
| Staff e fornitori (nome, ruolo, foto) | [`src/data/team.ts`](src/data/team.ts) + foto in `public/staff/` e `public/fornitori/` |
| P.IVA, REA, telefoni, orari, social | [`src/lib/company.ts`](src/lib/company.ts) |
| Testi della home | `src/App.tsx` |
| Titoli e descrizioni per Google | `src/lib/seo.ts` |

## Per chi sviluppa

```bash
npm install
npm run dev            # sviluppo
npm run typecheck && npm run lint
npm run build          # produzione, cartella dist/
```

## Pubblicazione

Vedi [`docs/PUBBLICAZIONE.md`](docs/PUBBLICAZIONE.md) (hosting, dominio, visibilità, sicurezza) e [`docs/COME-MODIFICARE.md`](docs/COME-MODIFICARE.md) (guida alle modifiche). La variabile `VITE_SITE_URL` (vedi `.env.example`) è già impostata su Cloudflare: serve per sitemap, indirizzi canonici e anteprime social.

## Sicurezza in breve

- Sito statico: nessun database, nessuna password, nessuna API da attaccare.
- Intestazioni di sicurezza e CSP in `public/_headers`.
- Nessun cookie, nessun tracciamento, nessuno script o contenuto di terzi.
