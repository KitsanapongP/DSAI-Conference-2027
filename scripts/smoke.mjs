import assert from 'node:assert/strict';

const input = process.argv[2];
if (!input) throw new Error('Usage: npm run smoke -- https://your-confirmed-domain (or local HTTP URL)');
const base = new URL(input);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash) {
  throw new Error('Pass an HTTP(S) origin without credentials, path, query or fragment.');
}
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
if (!local && base.protocol !== 'https:') throw new Error('Remote smoke checks require HTTPS with valid certificate verification.');
async function get(route, expected = 200) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000), redirect: 'follow' });
  assert.equal(response.status, expected, route);
  assert.equal(new URL(response.url).origin, base.origin, `Unexpected redirect origin: ${route}`);
  return response;
}
const home = await (await get('/')).text();
assert.match(home, /DSAI/);
for (const route of ['/dsai2027/conference-topics/', '/submissions/registration/', '/program/', '/venues/']) {
  assert.match(await (await get(route)).text(), /DSAI/);
}
for (const asset of new Set([...home.matchAll(/(?:href|src)="([^"?#]+)"/g)].map(m => m[1]).filter(p => p.startsWith('/_next/static/') || p.startsWith('/images/')))) {
  const response = await get(asset);
  assert(!response.headers.get('content-type')?.includes('text/html'), `Asset returned HTML: ${asset}`);
  await response.arrayBuffer();
}
await get('/this-page-must-not-exist-release-check/', 404);
console.log(`Smoke passed: ${base.origin} (pages, static assets, images and 404).`);
