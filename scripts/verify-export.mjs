import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('apps/web/out');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
async function isFile(file) {
  try { return (await stat(file)).isFile(); } catch { return false; }
}
const files = (await walk(root)).filter(file => file.endsWith('.html'));
if (!files.length || !await isFile(path.join(root, '404.html'))) throw new Error('Missing static export or 404 page');
const missing = [];
let count = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    count++;
    const target = path.join(root, decodeURIComponent(url));
    if (!await isFile(target) && !await isFile(path.join(target, 'index.html'))) {
      missing.push(`${path.relative(root, file)} -> ${url}`);
    }
  }
}
if (missing.length) throw new Error(`Broken exported references:\n${missing.join('\n')}`);
console.log(`Static export verified: ${files.length} HTML files, ${count} local references.`);
