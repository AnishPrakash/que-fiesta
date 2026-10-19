// Local development server — no dependencies, no Vercel CLI needed.
//   node server.js        → http://localhost:3000
// It serves /public as static files and sends /api/<name> to api/<name>.js,
// exactly the way Vercel does in production.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');
const PORT = Number(process.env.PORT) || 3000;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const handlers = new Map();
async function loadHandler(name) {
  if (!/^[a-z0-9-]+$/.test(name)) return null;
  const file = path.join(root, 'api', `${name}.js`);
  if (!existsSync(file)) return null;
  if (!handlers.has(name)) handlers.set(name, (await import(pathToFileURL(file).href)).default);
  return handlers.get(name);
}

async function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath);
  if (rel.endsWith('/')) rel += 'index.html';
  let file = path.normalize(path.join(publicDir, rel));
  if (!file.startsWith(publicDir)) return notFound(res);
  try {
    let s = await stat(file).catch(() => null);
    if (!s && !path.extname(file)) {
      file += '.html'; // cleanUrls, like vercel.json
      s = await stat(file).catch(() => null);
    }
    if (!s || s.isDirectory()) return notFound(res);
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    notFound(res);
  }
}

async function notFound(res) {
  const page = path.join(publicDir, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(existsSync(page) ? await readFile(page) : 'Not found');
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
  const started = Date.now();
  res.on('finish', () => {
    if (pathname.startsWith('/api/')) console.log(`${req.method} ${pathname} → ${res.statusCode} (${Date.now() - started}ms)`);
  });

  if (pathname.startsWith('/api/')) {
    const handler = await loadHandler(pathname.slice(5).replace(/\/$/, ''));
    if (!handler) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'No such API route.' }));
    }
    try {
      return await handler(req, res);
    } catch (err) {
      console.error(err);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Server error' }));
    }
  }
  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`\n  ¡Qué Fiesta! is running →  http://localhost:${PORT}\n`);
  console.log(
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
      ? '  Storage: Upstash Redis (persistent)\n'
      : '  Storage: in-memory (guestbook, scores and tomatoes reset when you stop the server)\n'
  );
});
