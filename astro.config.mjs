import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import Unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    Unocss({
      theme: {
        colors: {
          theme: {
            50: '#F3F9FA',
            100: '#E6F3F5',
            200: '#CBE7EC',
            300: '#ABDBE2',
            400: '#84CED7',
            500: '#4BC0CD',
            600: '#43ABB7',
            700: '#3A949E',
            800: '#2F7981',
            900: '#21555B',
          },
        },
      },
      shortcuts: [
        {
          'link-icon': 'text-gray-500 hover:text-theme-500',
          'link-icon': 'text-gray-500 hover:text-theme-500',
        },
      ],
    }),
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
