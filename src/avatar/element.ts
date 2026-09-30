import { EXPRESSIONS, render, type AvatarState, type Background, type Expression, type Shape } from './engine';

/**
 * <pixel-avatar> — the live pixel avatar.
 *
 * Attributes:
 * - expr: base expression (default "normal")
 * - shape: square | rounded | circle | none
 * - bg: brand | none
 * - airpods: show AirPods Pro
 * - follow: eyes follow the pointer
 * - sleepy: sleep between 01:00 and 07:00 in Madrid (click to wake up)
 * - greeting: first text for the speech bubble
 * - lines: JSON array of texts for clicks on the avatar
 *
 * Any element with `data-mood="smile"` (and optional `data-say="…"`) makes
 * every avatar on the page react on hover and focus.
 */

const BRAND: Background = { pattern: 'radial', a: '#5fd0dc', b: '#4bc0cd' };
const NONE: Background = { pattern: 'none', a: '#000000' };

/** The page theme: set on <html> by the theme toggle, or the system setting */
export function isDark() {
  const theme = document.documentElement.dataset.theme;
  return theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
}

const backgroundFor = (attr: string | null) => (attr === 'none' ? NONE : BRAND);
const FUN: Expression[] = ['grin', 'wink', 'tongue', 'smile'];
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isExpr = (v: string | null | undefined): v is Expression => !!v && (EXPRESSIONS as string[]).includes(v);

const pointer = { x: 0, t: -1e9 };
if (typeof window !== 'undefined') {
  addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.t = performance.now();
  }, { passive: true });
}

export function madridHour() {
  const h = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Europe/Madrid' }).format(new Date());
  return Number(h);
}
export function madridTime() {
  return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date());
}

interface Mood {
  expr: Expression;
  say?: string;
  until: number;
}

/** Every avatar on the page. Only one of them talks at a time: the one you can see. */
const avatars = new Set<PixelAvatar>();

/**
 * The avatar that says a line: a visible one with a speech bubble, preferring
 * the one in the page (bigger) over the one in the header.
 */
function speaker() {
  const talking = [...avatars].filter((a) => a.canSpeak());
  const inHeader = (a: PixelAvatar) => !!a.closest('.site-header, [data-docked]');
  return talking.find((a) => !inHeader(a)) ?? talking.find(inHeader) ?? null;
}

/** Screen readers hear what the avatar says after a click, once, from one place */
function announce(text?: string) {
  const live = document.getElementById('avatar-live');
  if (live && text) live.textContent = text;
}

export class PixelAvatar extends HTMLElement {
  private canvas!: HTMLCanvasElement;
  private bubble: HTMLElement | null = null;
  private raf = 0;
  private visible = false;
  private key = '';
  private mood: Mood | null = null;
  private awake = false;
  private lineIndex = 0;
  private clicks = 0;
  private io?: IntersectionObserver;
  private sayTimer = 0;
  /** Sunglasses are a short gesture when the day comes, not a permanent state */
  private shadesUntil = 0;
  private t = { nextBlink: 0, blinkAt: -1e9, blink2: -1e9, nextGlint: 0, glintAt: -1e9, nextGlance: 0, glanceUntil: 0, glanceDir: 0 };

  static get observedAttributes() {
    return ['expr', 'shape', 'bg', 'airpods'];
  }

  connectedCallback() {
    this.canvas = this.querySelector('canvas') ?? this.appendChild(document.createElement('canvas'));
    this.bubble = this.querySelector('[data-bubble]');
    const now = performance.now();
    Object.assign(this.t, {
      nextBlink: now + 600 + Math.random() * 2400,
      nextGlint: now + 1800 + Math.random() * 3000,
      nextGlance: now + 3000 + Math.random() * 4000,
    });
    this.io = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.start();
    });
    this.io.observe(this);
    avatars.add(this);
    this.addEventListener('click', this.onClick);
    document.addEventListener('avatar:mood', this.onMood as EventListener);
    document.addEventListener('visibilitychange', this.onVisibility);
    document.addEventListener('theme:change', this.onTheme as EventListener);
    if (this.isSleeping()) this.say(this.getAttribute('sleep-say')?.replace('{time}', madridTime()) ?? 'Zzz…');
    else if (this.hasAttribute('greeting')) {
      const touch = matchMedia('(hover: none)').matches && this.getAttribute('greeting-touch');
      this.say(touch || this.getAttribute('greeting') || '', 4200);
    }
    this.dataset.ready = '';
    this.frame(now);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.raf);
    this.io?.disconnect();
    avatars.delete(this);
    this.removeEventListener('click', this.onClick);
    document.removeEventListener('avatar:mood', this.onMood as EventListener);
    document.removeEventListener('visibilitychange', this.onVisibility);
    document.removeEventListener('theme:change', this.onTheme as EventListener);
  }

  attributeChangedCallback() {
    this.key = '';
  }

  /** Has a bubble, is on screen and is not in the middle of a flight */
  canSpeak() {
    return !!this.bubble && this.visible && this.getClientRects().length > 0 && !this.closest('[data-flying]');
  }

  private isSleeping() {
    if (!this.hasAttribute('sleepy') || this.awake) return false;
    const h = madridHour();
    return h >= 1 && h < 7;
  }

  private baseExpr(): Expression {
    if (this.isSleeping()) return 'sleep';
    const e = this.getAttribute('expr');
    return isExpr(e) ? e : 'normal';
  }

  private onVisibility = () => {
    if (document.visibilityState === 'visible') this.start();
  };

  private onTheme = (e: CustomEvent<{ theme: string }>) => {
    this.key = '';
    if (!this.isSleeping()) {
      const dark = e.detail?.theme === 'dark';
      // The day comes: sunglasses on for a moment, then off, so the eyes are back
      this.shadesUntil = dark ? 0 : performance.now() + 3500;
      const say = speaker() === this ? (this.getAttribute(dark ? 'night-say' : 'day-say') ?? undefined) : undefined;
      this.setMood(dark ? 'wink' : 'grin', 1800, say);
    }
    // Draw now: a view transition takes its snapshot before the next animation frame
    cancelAnimationFrame(this.raf);
    this.frame(performance.now());
  };

  private onMood = (e: CustomEvent<{ expr?: string; say?: string; ms?: number }>) => {
    const { expr, say, ms = 1600 } = e.detail ?? {};
    if (this.isSleeping()) return;
    if (!expr) {
      this.mood = null;
      this.key = '';
      if (this.bubble) delete this.bubble.dataset.show;
      this.start();
      return;
    }
    if (!isExpr(expr)) return;
    this.mood = { expr, say, until: performance.now() + ms };
    if (say && speaker() === this) this.say(say, ms + 400);
    this.start();
  };

  private onClick = () => {
    if (this.isSleeping()) {
      this.awake = true;
      this.setMood('surprise', 900, this.getAttribute('wake-say') ?? '¡Uy!');
      return;
    }
    let lines: string[] = [];
    try {
      lines = JSON.parse(this.getAttribute('lines') ?? '[]');
    } catch {
      lines = [];
    }
    this.clicks++;
    // The last line promises AirPods; the next click keeps the promise
    if (lines.length && this.clicks === lines.length + 1 && !this.hasAttribute('airpods')) {
      this.setAttribute('airpods', '');
      const line = this.getAttribute('airpods-say') ?? undefined;
      this.setMood('grin', 2000, line);
      announce(line);
      return;
    }
    const expr = FUN[Math.floor(Math.random() * FUN.length)];
    const line = lines.length ? lines[this.lineIndex++ % lines.length] : undefined;
    this.setMood(expr, 1800, line);
    announce(line);
  };

  setMood(expr: Expression, ms: number, say?: string) {
    this.mood = { expr, say, until: performance.now() + ms };
    if (say) this.say(say, ms + 600);
    this.start();
  }

  say(text: string, ms = 0) {
    if (!this.bubble || !text) return;
    this.bubble.textContent = text;
    this.bubble.dataset.show = '';
    clearTimeout(this.sayTimer);
    if (ms) this.sayTimer = window.setTimeout(() => this.bubble && delete this.bubble.dataset.show, ms);
  }

  private start() {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  private frame(now: number) {
    const t = this.t;
    const calm = reduceMotion();
    if (!calm) {
      if (now > t.nextBlink) {
        t.blinkAt = now;
        t.blink2 = Math.random() < 0.25 ? now + 260 : -1e9;
        t.nextBlink = now + 2400 + Math.random() * 3600;
      }
      if (now > t.nextGlint) {
        t.glintAt = now;
        t.nextGlint = now + 5000 + Math.random() * 5000;
      }
      if (now > t.nextGlance) {
        t.glanceDir = Math.random() < 0.5 ? -1 : 1;
        t.glanceUntil = now + 700 + Math.random() * 600;
        t.nextGlance = now + 4000 + Math.random() * 6000;
      }
    }
    if (this.mood && now > this.mood.until) this.mood = null;
    if (this.shadesUntil && now > this.shadesUntil) this.shadesUntil = 0;

    const blink = now - t.blinkAt < 120 || (now - t.blink2 >= 0 && now - t.blink2 < 120);
    const gt = now - t.glintAt;
    const glint = gt >= 0 && gt < 650 ? Math.floor((gt / 650) * 16) - 2 : -99;
    let look = now < t.glanceUntil ? t.glanceDir : 0;
    if (this.hasAttribute('follow') && now - pointer.t < 4000) {
      const r = this.canvas.getBoundingClientRect();
      const dx = pointer.x - (r.left + r.width / 2);
      look = Math.abs(dx) < r.width * 0.12 ? 0 : Math.sign(dx);
    }

    const bg = backgroundFor(this.getAttribute('bg'));
    const state: AvatarState = {
      expr: this.mood?.expr ?? this.baseExpr(),
      shape: (this.getAttribute('shape') as Shape) || 'rounded',
      bg,
      airpods: this.hasAttribute('airpods'),
      blink,
      look,
      glint,
      // Sunglasses in the light theme
      shades: now < this.shadesUntil && (this.mood?.expr ?? this.baseExpr()) !== 'sleep',
    };
    const size = Math.round((this.canvas.clientWidth || 96) * (devicePixelRatio || 1));
    const key = JSON.stringify(state) + size;
    if (key !== this.key) {
      this.key = key;
      render(this.canvas, state, size);
      this.dataset.expr = state.expr;
    }
    if (this.visible && document.visibilityState === 'visible') {
      this.raf = requestAnimationFrame((ts) => this.frame(ts));
    }
  }
}

/** Page-wide reactions: hover or focus anything with data-mood. */
function wireMoods() {
  let leaveTimer = 0;
  const send = (detail: { expr?: string; say?: string; ms?: number }) =>
    document.dispatchEvent(new CustomEvent('avatar:mood', { detail }));
  const enter = (e: Event) => {
    const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-mood]');
    if (!el) return;
    clearTimeout(leaveTimer);
    send({ expr: el.dataset.mood, say: el.dataset.say, ms: 60_000 });
  };
  const leave = (e: Event) => {
    const el = (e.target as Element | null)?.closest?.('[data-mood]');
    if (!el) return;
    clearTimeout(leaveTimer);
    leaveTimer = window.setTimeout(() => send({}), 250);
  };
  document.addEventListener('pointerover', enter);
  document.addEventListener('focusin', enter);
  document.addEventListener('pointerout', leave);
  document.addEventListener('focusout', leave);
}

if (typeof customElements !== 'undefined' && !customElements.get('pixel-avatar')) {
  customElements.define('pixel-avatar', PixelAvatar);
  wireMoods();
}
