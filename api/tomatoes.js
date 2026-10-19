// Global La Tomatina counter — every tomato thrown by every visitor.
// GET  /api/tomatoes          → { total }
// POST /api/tomatoes { count } → adds 1–50 tomatoes, returns new total
import { incrBy, getCounter } from '../lib/store.js';
import { send, methodNotAllowed, readJson, rateLimit, handleError, httpError } from '../lib/http.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return send(res, 200, { total: await getCounter('tomatoes') });
    }
    if (req.method === 'POST') {
      rateLimit(req, 'tomatoes', { max: 40, windowMs: 60_000 });
      const { count } = await readJson(req);
      const n = Math.floor(Number(count));
      if (!Number.isFinite(n) || n < 1) throw httpError(400, 'count must be a positive number.');
      const total = await incrBy('tomatoes', Math.min(n, 50));
      return send(res, 200, { total });
    }
    methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    handleError(res, err);
  }
}
