// GET /api/festivals          → all five chapters (content, palette, vocabulary)
// GET /api/festivals?id=muertos → one chapter
import { festivals, team } from '../lib/content.js';
import { nextOccurrence } from '../lib/dates.js';
import { send, methodNotAllowed } from '../lib/http.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  const url = new URL(req.url, 'http://x');
  const id = url.searchParams.get('id');

  const withDates = festivals.map((f) => ({ ...f, next: nextOccurrence(f.id) }));

  if (id) {
    const one = withDates.find((f) => f.id === id);
    if (!one) return send(res, 404, { error: `No festival called "${id}".` });
    return send(res, 200, one, { 'Cache-Control': 'public, s-maxage=3600' });
  }
  send(res, 200, { team, festivals: withDates }, { 'Cache-Control': 'public, s-maxage=3600' });
}
