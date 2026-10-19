// Libro de visitas (guestbook)
// GET  /api/guestbook → latest 40 postcards
// POST /api/guestbook { name, fiesta, message } → adds a postcard
import { festivals, teamPostcards } from '../lib/content.js';
import { listPush, listRange, persistent } from '../lib/store.js';
import { send, methodNotAllowed, readJson, cleanText, rateLimit, httpError, handleError } from '../lib/http.js';

const validFiestas = new Set(festivals.map((f) => f.id));

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const entries = await listRange('guestbook', 40);
      // until real visitors write, show the team's own postcards
      const shown = entries.length ? entries : teamPostcards.map((e) => ({ ...e, team: true }));
      return send(res, 200, { entries: shown, persistent });
    }
    if (req.method === 'POST') {
      rateLimit(req, 'guestbook', { max: 5, windowMs: 60_000 });
      const body = await readJson(req);
      if (body.website) throw httpError(400, 'Rejected.'); // honeypot field bots fill in
      const name = cleanText(body.name, 30);
      const message = cleanText(body.message, 240);
      const fiesta = validFiestas.has(body.fiesta) ? body.fiesta : null;
      if (name.length < 2) throw httpError(400, 'Escribe tu nombre (at least 2 letters).');
      if (message.length < 3) throw httpError(400, 'Escribe un mensaje (at least 3 characters).');
      if (!fiesta) throw httpError(400, 'Elige una fiesta from the list.');
      const entry = { name, fiesta, message, at: new Date().toISOString() };
      await listPush('guestbook', entry, 200);
      return send(res, 201, { ok: true, entry });
    }
    methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    handleError(res, err);
  }
}
