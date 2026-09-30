# antoniogiroz.com

Personal site of Antonio Giroz. Built with Astro 7, in Spanish (`/`) and English (`/en`).

## Commands

| Command        | Action                                        |
| :------------- | :-------------------------------------------- |
| `pnpm install` | Install dependencies                          |
| `pnpm dev`     | Start the dev server at `localhost:4321`      |
| `pnpm build`   | Build the static site                         |
| `pnpm check`   | Type-check the project                        |

## Structure

- `src/avatar/` — the live pixel avatar. `engine.ts` draws the 48 × 48 grid; `element.ts` defines `<pixel-avatar>`.
- `src/avatar/data/` — the avatar pixels and the expression patches.
- `src/i18n/ui.ts` — all interface texts in both languages.
- `src/views/` — page content, shared by the Spanish and English routes in `src/pages/`.
- `src/content/` — blog posts (`blog/es`, `blog/en`), apps (`projects.yaml`) and the `/uses` page (`uses.yaml`).

## The avatar

Add `data-mood` to any element to make the avatar react on hover and focus:

```html
<a href="/uses" data-mood="grin" data-say="My gear">Uses</a>
```

Moods: `smile`, `grin`, `wink`, `surprise`, `tongue`, `sleep`. Every avatar changes its face, but only one says the line: the one you can see (the one in the page first, then the one in the header). Sections with `data-narrate` get one line when they come into view.

Between 01:00 and 07:00 (Madrid time) the hero avatar sleeps; a click wakes it up. On the home page it flies into the header when you scroll past it, and the sun in the hero follows the time in Madrid.

## Design rule

Antonio is made of pixels, the world is soft and the interface is glass:

- Pixels: the avatar, its speech bubble, the creatures in the sky and the app icons.
- Soft: sky, hills and light, never behind a headline.
- Glass: what floats (the header).
- Nothing empty in production: a section exists when it has content.

## Avatar studio

`/avatar/` (`public/avatar/`) is a private tool to change the avatar and export it (PNG, SVG, GIF, sticker pack). It is not linked from the site and asks search engines not to index it.

## Hidden sections

`src/config.ts` switches sections on and off. Apps and the blog are off until there is something to show.

## Blog

Posts with `draft: true` show only in `pnpm dev`. Posts in both languages share a `translationKey`, so the language switch links to the translation.
