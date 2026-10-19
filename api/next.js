// GET /api/next → every festival's next date, sorted by how soon it starts.
import { festivals } from '../lib/content.js';
import { nextOccurrence, dayOfYear } from '../lib/dates.js';
import { send, methodNotAllowed } from '../lib/http.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  const now = new Date();
  const list = festivals
    .map((f) => {
      const next = nextOccurrence(f.id, now);
      return {
        id: f.id,
        name: f.name,
        place: f.place,
        author: f.author,
        color: f.palette.accent,
        ...next,
        dayOfYear: dayOfYear(next.start),
      };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil);

  send(res, 200, { today: now.toISOString().slice(0, 10), upcoming: list }, { 'Cache-Control': 'public, s-maxage=600' });
}
