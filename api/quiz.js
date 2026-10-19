// La Gran Lotería — the quiz.
// GET  /api/quiz                 → 10 random cards (questions WITHOUT answers)
// GET  /api/quiz?board=1         → top 10 scores
// POST /api/quiz { name, answers: { [id]: "chosen option text" } } → graded result
// Answers stay on the server, so nobody can read them from the page source.
import { quiz } from '../lib/content.js';
import { zAdd, zTop } from '../lib/store.js';
import { send, methodNotAllowed, readJson, cleanText, rateLimit, handleError, httpError } from '../lib/http.js';

const byId = new Map(quiz.map((q) => [q.id, q]));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://x');
      if (url.searchParams.get('board')) {
        return send(res, 200, { board: await zTop('quiz', 10) });
      }
      // two cards per festival so every teammate's chapter is represented
      const perFest = {};
      for (const q of shuffle(quiz)) (perFest[q.fiesta] ||= []).push(q);
      const picked = shuffle(Object.values(perFest).flatMap((list) => list.slice(0, 2)));
      // options[0] is the right answer in content.js, so shuffle before sending
      const cards = picked.map(({ id, fiesta, card, question, options }) => ({ id, fiesta, card, question, options: shuffle(options) }));
      return send(res, 200, { cards });
    }

    if (req.method === 'POST') {
      rateLimit(req, 'quiz', { max: 8, windowMs: 60_000 });
      const body = await readJson(req);
      const answers = body.answers && typeof body.answers === 'object' ? body.answers : null;
      if (!answers) throw httpError(400, 'Send your answers as { answers: { id: "option text" } }.');

      const results = [];
      for (const [id, choice] of Object.entries(answers).slice(0, 20)) {
        const q = byId.get(id);
        if (!q) continue;
        const chosen = String(choice);
        results.push({ id, chosen, correct: q.options[0], isCorrect: chosen === q.options[0], explain: q.explain });
      }
      if (!results.length) throw httpError(400, 'None of those answers match a card.');
      const score = results.filter((r) => r.isCorrect).length;

      const name = cleanText(body.name, 24);
      let saved = false;
      if (name.length >= 2) {
        await zAdd('quiz', score * 1000 + results.length, { name, score, of: results.length, at: Date.now() });
        saved = true;
      }
      return send(res, 200, { score, of: results.length, results, saved });
    }
    methodNotAllowed(res, ['GET', 'POST']);
  } catch (err) {
    handleError(res, err);
  }
}
