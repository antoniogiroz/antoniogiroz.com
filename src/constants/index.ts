import type { Lang } from '../i18n/ui';

type Say = Record<Lang, string>;

/** Rings of the stack orbit: the closer to the avatar, the more I use it */
export type Ring = 'core' | 'tools' | 'ship';

export interface Tech {
  id: string;
  /** Full-color logo, shown when the tool is picked */
  icon: string;
  /** One-color logo, shown in the orbit */
  mono: string;
  title: string;
  ring: Ring;
  mood: 'smile' | 'grin' | 'wink' | 'surprise' | 'tongue';
  say: Say;
}

export const techIcons: Tech[] = [
  { id: 'vue', icon: 'logos:vue', mono: 'simple-icons:vuedotjs', title: 'Vue', ring: 'core', mood: 'grin', say: { es: 'Mi casa. Llevo años con él y no me canso.', en: 'My home. Years with it and I am not tired of it.' } },
  { id: 'typescript', icon: 'logos:typescript-icon', mono: 'simple-icons:typescript', title: 'TypeScript', ring: 'core', mood: 'wink', say: { es: 'Sin tipos no salgo de casa.', en: "I don't leave home without types." } },
  { id: 'swift', icon: 'logos:swift', mono: 'simple-icons:swift', title: 'Swift', ring: 'core', mood: 'grin', say: { es: 'Con él hago mis apps de iPhone y Mac.', en: 'I build my iPhone and Mac apps with it.' } },
  { id: 'nuxt', icon: 'logos:nuxt-icon', mono: 'simple-icons:nuxt', title: 'Nuxt', ring: 'core', mood: 'smile', say: { es: 'Vue con todo lo que necesita una app de verdad.', en: 'Vue with everything a real app needs.' } },
  { id: 'astro', icon: 'logos:astro-icon', mono: 'simple-icons:astro', title: 'Astro', ring: 'core', mood: 'smile', say: { es: 'Esta web está hecha con Astro.', en: 'This site is built with Astro.' } },
  { id: 'vite', icon: 'logos:vitejs', mono: 'simple-icons:vite', title: 'Vite', ring: 'tools', mood: 'surprise', say: { es: 'Arranca antes de que parpadee.', en: 'Starts before I can blink.' } },
  { id: 'vitest', icon: 'logos:vitest', mono: 'simple-icons:vitest', title: 'Vitest', ring: 'tools', mood: 'grin', say: { es: 'Tests en verde, cara feliz.', en: 'Green tests, happy face.' } },
  { id: 'playwright', icon: 'logos:playwright', mono: 'simple-icons:playwright', title: 'Playwright', ring: 'tools', mood: 'tongue', say: { es: 'Clic, clic, test. Así no rompo nada.', en: 'Click, click, test. That is how I break nothing.' } },
  { id: 'tanstack', icon: 'logos:react-query-icon', mono: 'simple-icons:tanstack', title: 'TanStack Query', ring: 'tools', mood: 'smile', say: { es: 'Datos del servidor, sin dramas de caché.', en: 'Server data without cache drama.' } },
  { id: 'graphql', icon: 'logos:graphql', mono: 'simple-icons:graphql', title: 'GraphQL', ring: 'tools', mood: 'wink', say: { es: 'Pide solo lo que necesitas.', en: 'Ask only for what you need.' } },
  { id: 'figma', icon: 'logos:figma', mono: 'simple-icons:figma', title: 'Figma', ring: 'ship', mood: 'smile', say: { es: 'Donde empiezan las ideas.', en: 'Where ideas start.' } },
  { id: 'tailwind', icon: 'logos:tailwindcss-icon', mono: 'simple-icons:tailwindcss', title: 'Tailwind CSS', ring: 'ship', mood: 'surprise', say: { es: 'Del diseño al estilo en minutos.', en: 'From design to style in minutes.' } },
  { id: 'cloudflare', icon: 'logos:cloudflare-icon', mono: 'simple-icons:cloudflare', title: 'Cloudflare', ring: 'ship', mood: 'smile', say: { es: 'Rápido en todo el mundo.', en: 'Fast everywhere.' } },
  { id: 'vercel', icon: 'logos:vercel-icon', mono: 'simple-icons:vercel', title: 'Vercel', ring: 'ship', mood: 'wink', say: { es: 'Aquí vive esta web.', en: 'This site lives here.' } },
];

/** For work first, then for chatting */
export const socials = [
  { name: 'GitHub', href: 'https://github.com/antoniogiroz', icon: 'ri:github-line', handle: 'antoniogiroz' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/antoniogiroz', icon: 'ri:linkedin-box-line', handle: 'antoniogiroz' },
  { name: 'Bluesky', href: 'https://bsky.app/profile/antoniogiroz.com', icon: 'ri:bluesky-line', handle: '@antoniogiroz.com' },
  { name: 'X', href: 'https://x.com/antoniogiroz', icon: 'ri:twitter-x-line', handle: '@antoniogiroz' },
] as const;

export const BLUESKY = socials[2].href;
export const REPO = 'https://github.com/antoniogiroz/antoniogiroz.com';
