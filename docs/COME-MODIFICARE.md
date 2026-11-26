# Come modificare il sito

Il sito è fatto di file di testo. Ogni modifica segue sempre lo stesso percorso:

**modifica → pull request → merge → pubblicazione automatica (circa 1 minuto e mezzo).**

Non c'è un'area riservata e non servono password per il sito: serve solo l'accesso al repository su GitHub.

## Dove si cambia cosa

| Cosa | File |
| --- | --- |
| Telefoni, orari, P.IVA, REA, PEC, e-mail, social | `src/lib/company.ts` |
| Staff e fornitori (nome, ruolo, foto) | `src/data/team.ts` + foto in `public/staff/` e `public/fornitori/` |
| Testi della home (italiano e inglese) | `src/App.tsx` (cerca il testo da cambiare con la ricerca di GitHub) |
| Altre pagine (I nostri classici, Ricorrenze) | `src/components/INostriClassiciPage.tsx`, `src/components/RicorrenzePage.tsx` |
| Titoli e descrizioni che compaiono su Google | `src/lib/seo.ts` |
| Privacy e Cookie | `src/components/PrivacyPolicyPage.tsx`, `src/components/CookiePolicyPage.tsx` (dopo ogni modifica fai rileggere a un professionista) |

## Come fare una modifica semplice (un orario, un numero, un testo)

1. Su GitHub apri il file e premi l'icona della matita.
2. Cambia **solo il testo tra gli apici**. Non toccare virgole, parentesi e apici attorno: una virgola sbagliata può rompere la pagina.
3. Premi *Commit changes* e scegli *Create a new branch for this commit and start a pull request*.
4. Apri la pull request e controlla la lista dei file modificati: deve esserci solo quello che volevi.
5. Premi *Merge pull request* e poi *Confirm merge*.
6. Su Cloudflare (*Workers & Pages → lamagiostra → Deployments*) aspetta "Ready" in verde, poi guarda il sito dal telefono.

## Foto

- Le foto sono in `public/`, formato `.webp`. Le foto di staff e fornitori sono verticali (rapporto 2:3, ad esempio 667×1000 pixel).
- Per sostituire una foto, carica il nuovo file **con lo stesso nome** nella stessa cartella. Per aggiungerne una, caricala e aggiungi una riga in `src/data/team.ts`.
- Per le **persone** serve il consenso scritto (`docs/liberatoria-foto-staff.md`). Se qualcuno lo ritira, togli la sua riga da `team.ts` e cancella il file della foto.

## Se qualcosa va storto

- **Il sito è rotto dopo una modifica**: su GitHub apri la pull request che l'ha causato e premi *Revert*. Si crea una nuova pull request che annulla la modifica: uniscila. In alternativa, su Cloudflare nel menu (…) delle pubblicazioni precedenti cerca la voce per tornare a una versione vecchia.
- **Non so cosa ho rotto**: non insistere con altre modifiche. Annulla l'ultima (*Revert*) e chiedi aiuto.

## Pagine già pronte (dal 26 novembre 2026)

`npm run build` non si limita più a preparare il programma: alla fine (`strumenti/prerender.mjs`) scrive dentro ogni pagina il testo già disegnato. Così chi non esegue JavaScript (alcuni motori di ricerca, ChatGPT, Perplexity, le anteprime dei link) legge orari, prodotti, fornitori e allergeni; nel browser il sito riprende vita da solo.
- Se il build si ferma con "prerender: … è quasi vuota" o "manca <div id="root"></div>", una pagina non si disegna: non pubblicare, cercare l'errore.
- Nel codice delle pagine non leggere `window` o `document` mentre la pagina si disegna: solo dentro `useEffect` o nei clic (durante il build non esistono).
- Cose che dipendono dalla data (cesti di Natale visibili fino a…, certificati bio scaduti) vengono fotografate al momento del build: dopo la scadenza il browser corregge da solo, ma conviene una pubblicazione qualsiasi per aggiornare anche il testo per Google.

## Cosa non toccare

- `wrangler.jsonc` (collegamento con Cloudflare) e `public/_headers` (sicurezza), salvo indicazione di chi sa farlo.
- I record DNS su Cloudflare e i nameserver su Squarespace.
- La variabile `VITE_SITE_URL` su Cloudflare.

## Se apri una nuova sessione con Claude (o con uno sviluppatore)

Digli di leggere prima `README.md`, `docs/PUBBLICAZIONE.md` e questo file: ogni sessione parte da zero e non ricorda le precedenti.
