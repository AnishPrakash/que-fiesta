// GET /api/status → quick health check (handy after deploying).
import { persistent } from '../lib/store.js';
import { send } from '../lib/http.js';

export default function handler(req, res) {
  send(res, 200, {
    ok: true,
    storage: persistent ? 'upstash-redis (persistent)' : 'memory (resets when the function sleeps)',
    time: new Date().toISOString(),
  });
}
