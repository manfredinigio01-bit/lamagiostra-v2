# La Magiostra – sito web

Sito vetrina di **La Magiostra**, negozio di alimentari e gastronomia vegetariana e vegana a Cremona (dal 1987).
Costruito con Vite + React + TypeScript + Tailwind. **Nessun database**: le pagine sono file statici. L'unico codice lato server è un piccolo programma Cloudflare (`worker/`) che risponde solo a `/api/*` e legge l'ultimo post Facebook del menu e della cassetta; la sua chiave (`FB_TOKEN`) è salvata solo su Cloudflare. Se il programma non funziona, il resto del sito non ne risente.

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

- Nessun database e nessuna area riservata. L'unico segreto (`FB_TOKEN`) sta su Cloudflare, mai nel codice.
- Intestazioni di sicurezza e CSP in `public/_headers`.
- Nessun cookie e nessun tracciamento pubblicitario. Unico script esterno: le statistiche di Cloudflare Web Analytics (senza cookie), solo sul sito ufficiale.
- Il repository è **pubblico**: non inserire mai chiavi, password o dati personali nei file.

## Copie di sicurezza

Copia completa (codice, storia, sito compilato, documentazione) nel Google Drive di Giovanni, cartella `La Magiostra/software/01-Sito-lamagiostra.it`, con la regola delle versioni descritta in `00-LEGGIMI-PRIMA.pdf`.
