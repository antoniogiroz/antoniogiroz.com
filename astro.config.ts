import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import unocss from 'unocss/astro';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        logos: [
          'typescript-icon',
          'vue',
          'nextjs-icon',
          'astro-icon',
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
          'netlify-icon',
          'vercel-icon',
          'arc',
          'wordpress-icon-alt',
        ],
        ri: ['twitter-x-line', 'github-line', 'linkedin-box-line'],
        emojione: ['waving-hand'],
      },
    }),
  ],
});
