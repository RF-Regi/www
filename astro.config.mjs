import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeEmailObfuscate from './src/utils/rehype-email-obfuscate.mjs';

export default defineConfig({
  site: 'https://rfregi.no',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    // unified-prosessoren (ikke Sätteri) fordi den støtter rehype-plugins:
    // rehypeEmailObfuscate stripper mailto:-lenker i ALL markdown —
    // også innhold skrevet i CMS-en — og obfuskerer dem mot scrapere.
    processor: unified({ rehypePlugins: [rehypeEmailObfuscate] }),
  },
});
