import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    unocss({
      injectReset: true
    }),
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
