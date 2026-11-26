// Ultimo passo di "npm run build": mette dentro ogni pagina del sito (dist/**/*.html, 404 compresa)
// l'HTML già disegnato da React, così chi non esegue JavaScript legge subito i testi
// (motori di ricerca, assistenti come ChatGPT e Perplexity, anteprime dei link).
// Nel browser React lo "riattiva" senza ridisegnarlo (hydrateRoot in src/main.tsx).
//
// Si appoggia al pacchetto preparato da "vite build --ssr src/entry-server.tsx --outDir dist-ssr",
// che dopo l'uso viene cancellato. Se una pagina non si disegna, il build si ferma con un errore:
// meglio nessuna pubblicazione che una pagina vuota.
import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = resolve('dist');
const SSR = resolve('dist-ssr');
const { render } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href);

function pagine(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return pagine(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

const VUOTO = '<div id="root"></div>';
let fatte = 0;
for (const file of pagine(DIST)) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  // index.html -> "/", staff/chiara.html -> "/staff/chiara", 404.html -> una pagina che non esiste
  const percorso = rel === 'index.html' ? '/' : rel === '404.html' ? '/pagina-non-trovata' : '/' + rel.replace(/\.html$/, '');
  const html = readFileSync(file, 'utf8');
  if (!html.includes(VUOTO)) throw new Error(`prerender: in ${rel} manca ${VUOTO}`);
  const corpo = render(percorso);
  if (corpo.length < 500) throw new Error(`prerender: ${rel} (${percorso}) è quasi vuota (${corpo.length} caratteri)`);
  writeFileSync(file, html.replace(VUOTO, `<div id="root">${corpo}</div>`));
  fatte++;
}
rmSync(SSR, { recursive: true, force: true });
console.log(`prerender: ${fatte} pagine pronte anche senza JavaScript`);
