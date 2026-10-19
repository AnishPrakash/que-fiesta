// Small helpers shared by every API route.
// They only use plain Node APIs (res.statusCode / res.setHeader / res.end),
// so the same handlers run unchanged on Vercel and on our local server.js.

export function send(res, status, data, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', extraHeaders['Cache-Control'] || 'no-store');
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}

export function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  send(res, 405, { error: `Method not allowed. Use ${allowed.join(' or ')}.` });
}

// Vercel pre-parses JSON bodies into req.body; locally we read the stream.
export async function readJson(req, limitBytes = 8_000) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') return safeParse(req.body);
    if (Buffer.isBuffer(req.body)) return safeParse(req.body.toString('utf8'));
    return req.body;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limitBytes) throw httpError(413, 'Request body too large.');
    chunks.push(chunk);
  }
  return safeParse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw httpError(400, 'Body must be valid JSON.');
  }
}

export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Strip control characters, collapse whitespace, cap length.
export function cleanText(value, max) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

// Best-effort per-instance rate limiter (serverless instances are short-lived,
// so this only stops quick bursts — good enough for a class project).
const hits = new Map();
export function rateLimit(req, key, { max = 10, windowMs = 60_000 } = {}) {
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'local';
  const id = `${key}:${ip}`;
  const now = Date.now();
  const entry = hits.get(id) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(id, entry);
  if (hits.size > 5000) hits.clear();
  if (entry.count > max) throw httpError(429, 'Too many requests — espera un momento.');
}

export function handleError(res, err) {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  send(res, status, { error: status >= 500 ? 'Something went wrong on the server.' : err.message });
}
