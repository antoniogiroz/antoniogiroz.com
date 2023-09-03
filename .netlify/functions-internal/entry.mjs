import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_0b58e584.mjs';
import './chunks/astro_0d67f4ea.mjs';
import './chunks/pages/image-endpoint_afa55d04.mjs';

const _page0  = () => import('./chunks/image-endpoint_07d965f5.mjs');
const _page1  = () => import('./chunks/index_2ccb553c.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@3.0.7/node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
