import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fornitori } from './src/data/team';
import { allPublicPaths, produttorePath } from './src/lib/routes';
import { metaPerPercorso } from './src/lib/seo';

// Se in .env (o nelle variabili del hosting) c'è VITE_SITE_URL, ad esempio
// https://www.lamagiostra.it, il build genera sitemap.xml, robots.txt con la sitemap
// e le anteprime social (Open Graph) con indirizzi completi.
//
// Con VITE_AMBIENTE=prova (sito di prova v3) il build:
//  - aggiunge "X-Robots-Tag: noindex" a tutte le pagine (Google non lo indicizza)
//  - non genera la sitemap e non la indica in robots.txt
// Il canonical resta su www.lamagiostra.it, così l'eventuale contenuto duplicato punta al sito vero.
function seoFiles(siteUrl: string, prova: boolean): Plugin {
  let outDir = 'dist';
  return {
    name: 'seo-files',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml() {
      if (!siteUrl) return [];
      return [
        { tag: 'meta', attrs: { property: 'og:url', content: siteUrl + '/' }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/og-image.jpg` }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` }, injectTo: 'head' },
        { tag: 'link', attrs: { rel: 'canonical', href: siteUrl + '/' }, injectTo: 'head' },
      ];
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl && !prova ? [`Sitemap: ${siteUrl}/sitemap.xml`] : [])].join('\n') + '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (siteUrl && !prova) {
        const urls = allPublicPaths().map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
      }
    },
    // Dopo la copia di public/:
    //  - una copia di index.html per ogni pagina vera (es. staff/chiara.html) e un 404.html:
    //    Cloudflare risponde "200" alle pagine vere e "404 non trovata" a tutto il resto
    //    (in wrangler.jsonc: not_found_handling = "404-page"); il sito mostra comunque la sua pagina.
    //  - nel sito di prova aggiunge il noindex alle intestazioni.
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      if (existsSync(index)) {
        const html = readFileSync(index, 'utf8');
        // Sul sito di prova si aprono anche le schede dei fornitori senza descrizione.
        const pagine = new Set([...allPublicPaths(), ...(prova ? fornitori.map((f) => produttorePath(f.slug)) : [])]);
        for (const path of pagine) {
          if (path === '/') continue;
          const file = resolve(outDir, `${path.slice(1)}.html`);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, conMetaDellaPagina(html, path, siteUrl));
        }
        const nonTrovata = html.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />');
        writeFileSync(resolve(outDir, '404.html'), nonTrovata);
      }
      if (!prova) return;
      const file = resolve(outDir, '_headers');
      if (!existsSync(file)) return;
      const headers = readFileSync(file, 'utf8');
      if (headers.includes('X-Robots-Tag')) return;
      writeFileSync(file, headers.replace(/^\/\*\n/m, '/*\n  X-Robots-Tag: noindex, nofollow\n'));
    },
  };
}

const attr = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Mette nel file della pagina titolo, descrizione, og e canonical giusti
// (senza, ogni pagina dichiarerebbe a Google di essere una copia della home).
function conMetaDellaPagina(html: string, path: string, siteUrl: string): string {
  const meta = metaPerPercorso(path);
  let out = html;
  if (meta) {
    out = out
      .replace(/<title>[^<]*<\/title>/, `<title>${attr(meta.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${attr(meta.description)}"`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${attr(meta.title)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${attr(meta.description)}"`);
  }
  if (siteUrl) {
    out = out
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${siteUrl}${path}"`)
      .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${siteUrl}${path}"`);
  }
  return out;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');
  const prova = env.VITE_AMBIENTE === 'prova';
  return {
    plugins: [react(), seoFiles(siteUrl, prova)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
