# Sito di prova v3

Il sito vero (`www.lamagiostra.it`) si pubblica dal ramo `main`.
Il sito di prova si pubblica dal ramo **`v3`** su `lamagiostra-v3.<account>.workers.dev`.

## Come si lavora
1. Ogni modifica si fa prima sul ramo `v3` e si guarda sul sito di prova (telefono compreso).
2. Quello che piace si porta su `main` con una pull request dedicata (una per argomento, così si può scegliere).
3. Quello che non piace resta su `v3` o si toglie: il sito vero non cambia.

## Cosa ha di diverso il sito di prova (automatico, stesso codice)
- Fascia gialla "Versione di prova" in cima alle pagine.
- `X-Robots-Tag: noindex` e meta robots `noindex`: Google non lo indicizza.
- Niente sitemap. Il canonical resta su `www.lamagiostra.it`.

Tutto dipende dalla variabile di build `VITE_AMBIENTE=prova`, impostata solo sul progetto Cloudflare `lamagiostra-v3`. Unire `v3` in `main` quindi non porta la fascia né il noindex sul sito vero.

## Impostazione su Cloudflare (una volta sola)
Progetto **`lamagiostra-v3`**, collegato al repository `lamagiostra-v2`:
- Ramo di produzione: `v3`
- Comando di build: `npm run build`
- Comando di pubblicazione: `npx wrangler deploy --env v3`
- Variabile di build: `VITE_AMBIENTE` = `prova`

Sul progetto `lamagiostra-v2` conviene disattivare le build dei rami non di produzione, così le modifiche a `v3` non lo toccano.
