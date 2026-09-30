import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://antoniogiroz.com',
  // Every page is prerendered; the Vercel adapter still handles deployment
  output: 'static',
  adapter: vercel(),
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  // Astro 7 defaults to 'jsx', which removes spaces between text and inline tags
  compressHTML: true,
  integrations: [
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        logos: [
          'vue',
          'typescript-icon',
          'swift',
          'nuxt-icon',
          'astro-icon',
          'vitejs',
          'vitest',
          'playwright',
          'react-query-icon',
          'graphql',
          'figma',
          'tailwindcss-icon',
          'cloudflare-icon',
          'vercel-icon',
        ],
        'simple-icons': [
          'vuedotjs',
          'typescript',
          'swift',
          'nuxt',
          'astro',
          'vite',
          'vitest',
          'playwright',
          'tanstack',
          'graphql',
          'figma',
          'tailwindcss',
          'cloudflare',
          'vercel',
        ],
        ri: ['bluesky-line', 'twitter-x-line', 'github-line', 'linkedin-box-line', 'menu-line', 'close-line'],
      },
    }),
  ],
});
