/** Small pixel drawings for SVG: each one is a list of [x, y] cells. */
export type Cells = (readonly [number, number])[];

const cells = (rows: string[]): Cells => rows.flatMap((row, y) => [...row].flatMap((c, x) => (c === '#' ? [[x, y] as const] : [])));

/** 9 × 4 bird, two frames of flapping */
export const bird = {
  up: cells(['##.....##', '..#...#..', '...#.#...', '....#....']),
  down: cells(['.........', '....#....', '..##.##..', '##.....##']),
};

/** 13 × 8 flying saucer: d = dome, b = body, l = lights, s = shadow */
const UFO = ['....ddddd....', '...ddddddd...', '.bbbbbbbbbbb.', 'bblbbblbbblbb', 'sbbbbbbbbbbbs', '..sssssssss..', '.............', '.............'];
export const ufo: (readonly [number, number, string])[] = UFO.flatMap((row, y) =>
  [...row].flatMap((c, x) => (c === '.' ? [] : [[x, y, { d: 'dome', b: 'body', l: 'light', s: 'shade' }[c] ?? 'body'] as const])),
);

/*
 * App icons: 11 × 11 pixel drawings on a squircle, from the same workshop as the avatar.
 * Each letter is a color; dots are empty.
 */
type Icon = { bg: string; cells: (readonly [number, number, string])[] };
const icon = (bg: string, colors: Record<string, string>, rows: string[]): Icon => ({
  bg,
  cells: rows.flatMap((row, y) => [...row].flatMap((c, x) => (colors[c] ? [[x, y, colors[c]] as const] : []))),
});

export const appIcons: Record<'palette' | 'glyph' | 'dumbbell', Icon> = {
  palette: icon('linear-gradient(160deg, #ffe6a8, #f2b33d)', { c: '#4bc0cd', n: '#2b4764', p: '#f07167', w: '#ffffff' }, [
    'ccc.www.ppp',
    'ccc.www.ppp',
    'ccc.www.ppp',
    '...........',
    'nnn.ccc.www',
    'nnn.ccc.www',
    'nnn.ccc.www',
    '...........',
    'ppp.nnn.ccc',
    'ppp.nnn.ccc',
    'ppp.nnn.ccc',
  ]),
  glyph: icon('linear-gradient(160deg, #3d6a93, #1f3550)', { s: '#a6eef5', h: '#ffffff' }, [
    '.....h.....',
    '.....s.....',
    '....sss....',
    'sssssssssss',
    '.sssssssss.',
    '..sssssss..',
    '...sssss...',
    '..sss.sss..',
    '..ss...ss..',
    '.ss.....ss.',
    '...........',
  ]),
  dumbbell: icon('linear-gradient(160deg, #6fe0b0, #1f9d6c)', { w: '#ffffff', g: '#d4f7e6' }, [
    '...........',
    '...........',
    '.ww.....ww.',
    '.ww.....ww.',
    'wwwgggggwww',
    'wwwgggggwww',
    '.ww.....ww.',
    '.ww.....ww.',
    '...........',
    '...........',
    '...........',
  ]),
};

/** 13 × 6 bat, two frames of flapping (the night version of the bird) */
export const bat = {
  up: cells(['#...........#', '##.........##', '.###.#.#.###.', '..#########..', '.....###.....', '......#......']),
  down: cells(['.............', '.....#.#.....', '..#########..', '.###.###.###.', '##....#....##', '#...........#']),
};
