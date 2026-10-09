import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PAGE_PATHS, PUBLIC_PAGES } from './src/lib/routes';

// Se in .env (o nelle variabili del hosting) c'è VITE_SITE_URL, ad esempio
// https://www.lamagiostra.it, il build genera sitemap.xml, robots.txt con la sitemap
// e le anteprime social (Open Graph) con indirizzi completi.
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
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
      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : [])].join('\n') + '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (siteUrl) {
        const urls = PUBLIC_PAGES.map((p) => `  <url><loc>${siteUrl}${PAGE_PATHS[p] === '/' ? '/' : PAGE_PATHS[p]}</loc></url>`).join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');
  return {
    plugins: [react(), seoFiles(siteUrl)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
