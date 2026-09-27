import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  // Astro 7 defaults to 'jsx', which removes spaces between text and inline tags
  compressHTML: true,
  integrations: [
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        logos: [
          'typescript-icon',
          'vue',
          'nuxt-icon',
          'astro-icon',
          'webcomponents',
          'lit-icon',
          'react-query-icon',
          'supabase-icon',
          'graphql',
          'figma',
          'vitejs',
          'vitest',
          'testing-library',
          'playwright',
          'tailwindcss-icon',
          'postcss',
          'cloudflare-icon',
          'netlify-icon',
          'vercel-icon',
          'arc',
          'wordpress-icon-alt',
          'swift',
          'ios'
        ],
        ri: ['bluesky-line', 'twitter-x-line', 'github-line', 'linkedin-box-line'],
        emojione: ['waving-hand'],
      },
    }),
  ],
});
