import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { i as server_default, j as deserializeManifest } from './chunks/astro.991e6f77.mjs';
import { _ as _page0 } from './chunks/pages/all.76be9c60.mjs';
/* empty css                                 */import 'os';
import 'fs';
import 'url';
import 'path';

const pageMap = new Map([["src/pages/index.astro", _page0],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["/_astro/index.beab5aa2.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["/Users/agil/dev/projects/antoniogiroz.com/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/sora-latin-ext-600-normal.d04f3761.woff2","/_astro/sora-latin-ext-400-normal.db65cdf3.woff2","/_astro/sora-latin-600-normal.fe5ef3d7.woff2","/_astro/sora-latin-400-normal.3fc0e572.woff2","/_astro/sora-all-400-normal.625d3e27.woff","/_astro/sora-all-600-normal.c9edc629.woff","/_astro/index.beab5aa2.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/site.webmanifest","/images/antonio-giroz.jpg","/images/antonio-giroz.png","/images/antonio-giroz.webp"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
