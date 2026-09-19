import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Až bude známá finální doména, přepište ji sem (nebo nastavte proměnnou SITE_URL v Cloudflare).
const site = process.env.SITE_URL || 'https://klub-komensky-web.pages.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
