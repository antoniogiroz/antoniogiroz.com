/**
 * Pixel avatar engine.
 *
 * The avatar is a 48 × 48 grid. Expressions and accessories are small pixel
 * patches on top of it. Shapes are vector masks applied at output size, so the
 * pixels stay crisp and the edges stay smooth.
 */
import pixels from './data/pixels.json';
import expressions from './data/expressions.json';

export const GRID = 48;

type RGBA = [number, number, number, number];
type Grid = (RGBA | null)[][];

export type Expression = keyof typeof expressions.expr;
export type Shape = 'square' | 'rounded' | 'circle' | 'none';
export type Pattern = 'solid' | 'dither' | 'radial' | 'none';

export interface Background {
  pattern: Pattern;
  a: string;
  b?: string;
}

export interface AvatarState {
  expr: Expression;
  shape: Shape;
  bg: Background;
  airpods: boolean;
  blink: boolean;
  /** -1 left, 0 center, 1 right */
  look: number;
  /** Glint position over the glasses; below -50 means no glint */
  glint: number;
  /** Sunglasses: the same frame with dark lenses */
  shades?: boolean;
}

export const EXPRESSIONS = Object.keys(expressions.expr) as Expression[];

interface ExpressionDef {
  eyes?: string;
  eyeL?: string;
  eyeR?: string;
  mouth?: [number, number, string][];
  blush?: number;
  zzz?: boolean;
}

const parse = (hex: string): RGBA => {
  let h = hex.replace('#', '');
  if (h.length === 6) h += 'ff';
  return [0, 2, 4, 6].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGBA;
};

const PALETTE = pixels.pal.map(parse);
const BASE: Grid = pixels.rows.map((row) => row.map((v) => (v < 0 ? null : PALETTE[v])));
const COLORS: Record<string, RGBA> = Object.fromEntries(
  Object.entries(expressions.colors).map(([k, v]) => [k, parse(v)]),
);
const EYES = expressions.eyes as unknown as Record<string, [number, string][]>;
const EXPR = expressions.expr as unknown as Record<string, ExpressionDef>;
const AIRPODS = expressions.accessories.airpods.ops as unknown as [number, number, string][];

const BLUSH: RGBA = [240, 110, 100, 255];
const WHITE: RGBA = [255, 255, 255, 255];
const Z_BIG = ['#####', '...#.', '..#..', '.#...', '#####'];
const Z_SMALL = ['####', '..#.', '.#..', '####'];
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const mix = (c: RGBA, t: RGBA, a: number): RGBA => [
  Math.round(c[0] * (1 - a) + t[0] * a),
  Math.round(c[1] * (1 - a) + t[1] * a),
  Math.round(c[2] * (1 - a) + t[2] * a),
  c[3],
];

function paint(g: Grid, ops: [number, number, string][]) {
  for (const [y, x, str] of ops) {
    for (let i = 0; i < str.length; i++) if (str[i] !== '.') g[y][x + i] = COLORS[str[i]];
  }
}

function faceGrid(s: AvatarState): Grid {
  const g = BASE.map((row) => row.slice());
  const d = EXPR[s.expr] ?? EXPR.normal;
  const eye = (kind: string, x0: number) => {
    for (const [y, str] of EYES[kind]) for (let i = 0; i < str.length; i++) g[y][x0 + i] = COLORS[str[i]];
  };
  for (const [kind, x0] of [
    [d.eyeL ?? d.eyes, 17],
    [d.eyeR ?? d.eyes, 27],
  ] as [string | undefined, number][]) {
    if (kind === 'closed' || kind === 'happy') {
      eye(kind, x0);
      continue;
    }
    if (s.blink) {
      eye('closed', x0);
      continue;
    }
    if (kind) eye(kind, x0);
    else if (s.look) {
      const row = s.look < 0 ? 'IPWW' : 'WWIP';
      for (let i = 0; i < 4; i++) g[18][x0 + i] = COLORS[row[i]];
    }
  }
  if (d.mouth) paint(g, d.mouth);
  if (d.blush) {
    for (const y of [22, 23]) {
      for (const x of [15, 16, 17, 30, 31, 32]) {
        const c = g[y][x];
        if (c) g[y][x] = mix(c, BLUSH, d.blush);
      }
    }
  }
  if (s.shades) sunglasses(g);
  if (s.airpods) paint(g, AIRPODS);
  return g;
}

/* Sunglasses: every pixel inside the frame of each lens becomes dark glass */
const FRAME = new Set(['#000000', '#1f1b18', '#171717', '#3f3f3f', '#2d2d2d', '#4c4c4c', '#585858', '#584940', '#604c40']);
const GLASS = ['#1b2831', '#203039', '#253843', '#2b404c', '#314856'].map(parse);
const GLARE = parse('#7aa0b3');
const hex = (c: RGBA) => '#' + c.slice(0, 3).map((v) => v.toString(16).padStart(2, '0')).join('');

function sunglasses(g: Grid) {
  for (const x0 of [14, 26]) {
    for (let y = 16; y <= 20; y++) {
      for (let x = x0; x <= x0 + 7; x++) {
        const c = g[y][x];
        if (c && !FRAME.has(hex(c))) g[y][x] = GLASS[y - 16];
      }
    }
    // A small reflection in the top corner of each lens
    g[16][x0 + 6] = GLARE;
    g[17][x0 + 5] = GLARE;
  }
}

function bgColor(bg: Background, A: RGBA, B: RGBA, x: number, y: number): RGBA {
  switch (bg.pattern) {
    case 'dither':
      return (BAYER[y & 3][x & 3] + 0.5) / 16 < y / (GRID - 1) ? B : A;
    case 'radial': {
      const d = Math.hypot(x + 0.5 - GRID / 2, y + 0.5 - GRID * 0.42) / (GRID * 0.62);
      return (BAYER[y & 3][x & 3] + 0.5) / 16 < d ? B : A;
    }
    default:
      return A;
  }
}

function blend(buf: Uint8ClampedArray, i: number, c: RGBA, extra = 1) {
  const a = (c[3] / 255) * extra;
  if (a <= 0) return;
  const da = buf[i + 3] / 255;
  const oa = a + da * (1 - a);
  for (let k = 0; k < 3; k++) buf[i + k] = (c[k] * a + buf[i + k] * da * (1 - a)) / oa;
  buf[i + 3] = oa * 255;
}

/** The 48 × 48 pixel content, without any shape mask. */
export function compose(s: AvatarState): ImageData {
  const buf = new Uint8ClampedArray(GRID * GRID * 4);
  if (s.bg.pattern !== 'none') {
    const A = parse(s.bg.a);
    const B = parse(s.bg.b ?? s.bg.a);
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const c = bgColor(s.bg, A, B, x, y);
        buf.set([c[0], c[1], c[2], 255], (y * GRID + x) * 4);
      }
    }
  }
  const g = faceGrid(s);
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
    const c = g[y][x];
    if (c) blend(buf, (y * GRID + x) * 4, c);
  }
  if (s.glint > -50) {
    for (let y = 16; y <= 20; y++) {
      for (const [x0, x1] of [
        [13, 21],
        [26, 34],
      ]) {
        for (let x = x0; x <= x1; x++) {
          const d = x - x0 + (20 - y) - s.glint;
          if (d === 0 || d === 1) blend(buf, (y * GRID + x) * 4, WHITE, 0.55);
        }
      }
    }
  }
  if (EXPR[s.expr]?.zzz) {
    for (const [z, zx, zy] of [
      [Z_BIG, 40, 2],
      [Z_SMALL, 35, 9],
    ] as [string[], number, number][]) {
      z.forEach((row, j) =>
        [...row].forEach((ch, k) => {
          if (ch === '#') blend(buf, ((zy + j) * GRID + zx + k) * 4, WHITE, 0.92);
        }),
      );
    }
  }
  return new ImageData(buf, GRID, GRID);
}

function superellipse(ctx: CanvasRenderingContext2D, W: number, n = 5, steps = 180) {
  const r = W / 2;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = r + r * Math.sign(c) * Math.abs(c) ** (2 / n);
    const y = r + r * Math.sign(s) * Math.abs(s) ** (2 / n);
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
}

const scratch = typeof document !== 'undefined' ? document.createElement('canvas') : null;

/** Draw the avatar into `canvas` at `size` device pixels. */
export function render(canvas: HTMLCanvasElement, s: AvatarState, size: number) {
  const W = Math.max(GRID, Math.round(size));
  if (canvas.width !== W || canvas.height !== W) {
    canvas.width = W;
    canvas.height = W;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx || !scratch) return;
  scratch.width = GRID;
  scratch.height = GRID;
  scratch.getContext('2d')?.putImageData(compose(s), 0, 0);

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, W, W);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(scratch, 0, 0, W, W);
  if (s.shape === 'square' || s.shape === 'none') return;
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  if (s.shape === 'circle') ctx.arc(W / 2, W / 2, W / 2, 0, Math.PI * 2);
  else superellipse(ctx, W);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}
