import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { allPublicPaths } from './src/lib/routes';

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
    // Dopo la copia di public/: nel sito di prova aggiunge il noindex alle intestazioni.
    closeBundle() {
      if (!prova) return;
      const file = resolve(outDir, '_headers');
      if (!existsSync(file)) return;
      const headers = readFileSync(file, 'utf8');
      if (headers.includes('X-Robots-Tag')) return;
      writeFileSync(file, headers.replace(/^\/\*\n/m, '/*\n  X-Robots-Tag: noindex, nofollow\n'));
    },
  };
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
