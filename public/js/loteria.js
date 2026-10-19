// La Gran Lotería (Mohit).
// A quiz dressed as the Mexican Lotería game: the caller draws a card, you
// pick an answer. Ten cards (two per chapter) come from /api/quiz without the
// answers; the server grades them and keeps a top-10 leaderboard.
import { $, api, escapeHtml, toast } from './util.js';
import { icon } from './icons.js';

const verdict = (score, of) => {
  if (score === of) return ['¡Lotería!', 'A perfect board. You could be the caller.'];
  if (score >= of * 0.7) return ['¡Muy bien!', 'You clearly read the chapters.'];
  if (score >= of * 0.4) return ['¡Buen intento!', 'Not bad — scroll back up and try again.'];
  return ['¡Sigue practicando!', 'Hover the Spanish words in each chapter, then play again.'];
};

// a stable "Lotería number" (1–54) for each card
const cardNumber = (id) => ([...id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 54) + 1;

export function mountLoteria(festivals) {
  const root = $('#loteriaGame');
  const board = $('#leaderboard');
  const byId = Object.fromEntries(festivals.map((f) => [f.id, f]));
  let cards = [], answers = {}, i = 0, name = '';

  async function loadBoard() {
    try {
      const { board: rows } = await api('quiz?board=1');
      board.innerHTML = rows.length
        ? rows.map((r) => `<li>${escapeHtml(r.name)} <span>— ${r.score}/${r.of}</span></li>`).join('')
        : '<li class="muted">Nadie todavía. ¡Sé el primero!</li>';
    } catch {
      board.innerHTML = '<li class="muted">Leaderboard unavailable.</li>';
    }
  }

  async function start() {
    name = $('#loteriaName')?.value.trim() || name;
    root.innerHTML = '<p class="lq__progress">Barajando las cartas…</p>';
    try {
      ({ cards } = await api('quiz'));
    } catch (e) {
      root.innerHTML = `<p>Couldn't reach the caller: ${escapeHtml(e.message)}</p><button class="btn btn--ink" type="button" data-act="retry">Reintentar</button>`;
      return;
    }
    answers = {};
    i = 0;
    showCard();
  }

  function showCard() {
    const c = cards[i];
    const f = byId[c.fiesta];
    root.innerHTML = `
      <div class="lgame">
        <div class="lcard is-drawn" style="--c:${f.palette.accent}" aria-hidden="true">
          <span class="lcard__n">N.º ${cardNumber(c.id)}</span>
          <div class="lcard__art">${icon(c.fiesta, { ink: '#1A1140', fill: '#FFF4E2', alt: c.fiesta === 'tomatina' ? '#E3271B' : '#FFF4E2' })}</div>
          <span class="lcard__name" lang="es">${escapeHtml(c.card)}</span>
        </div>
        <div class="lq">
          <p class="lq__progress">Carta ${i + 1} de ${cards.length} — from ${escapeHtml(f.author)}'s chapter, ${escapeHtml(f.name)}</p>
          <h3 class="lq__question" id="lqQ">${escapeHtml(c.question)}</h3>
          <div class="lq__options" role="group" aria-labelledby="lqQ">
            ${c.options.map((o) => `<button type="button" data-o="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}
          </div>
        </div>
      </div>`;
    root.querySelector('.lq__options button')?.focus({ preventScroll: true });
  }

  async function finish() {
    root.innerHTML = '<p class="lq__progress">El cantor está revisando tu tabla…</p>';
    try {
      const res = await api('quiz', { method: 'POST', body: { name, answers } });
      const [title, line] = verdict(res.score, res.of);
      root.innerHTML = `
        <div class="lresult">
          <h3>${title}</h3>
          <p class="lresult__score">${res.score} / ${res.of}</p>
          <p>${line}${res.saved ? ' Your score is on the board.' : ' Add your name next time to join the leaderboard.'}</p>
          <ol>${res.results.map((r) => {
            const c = cards.find((x) => x.id === r.id);
            return `<li class="${r.isCorrect ? '' : 'is-wrong'}"><b>${r.isCorrect ? '✓' : '✗'} ${escapeHtml(c.card)}: ${escapeHtml(r.correct)}</b>${escapeHtml(r.explain)}</li>`;
          }).join('')}</ol>
          <button class="btn btn--ink" type="button" data-act="again">Jugar otra vez</button>
        </div>`;
      if (res.score === res.of) toast('¡Lotería! 10 de 10.');
      loadBoard();
    } catch (e) {
      root.innerHTML = `<p>Something went wrong: ${escapeHtml(e.message)}</p><button class="btn btn--ink" type="button" data-act="again">Jugar otra vez</button>`;
    }
  }

  root.addEventListener('click', (e) => {
    if (e.target.closest('#loteriaStart') || e.target.closest('[data-act="again"]') || e.target.closest('[data-act="retry"]')) return start();
    const opt = e.target.closest('.lq__options button');
    if (!opt || opt.disabled) return;
    root.querySelectorAll('.lq__options button').forEach((b) => (b.disabled = true));
    opt.classList.add('is-picked');
    answers[cards[i].id] = opt.dataset.o;
    setTimeout(() => {
      i += 1;
      if (i < cards.length) showCard();
      else finish();
    }, 380);
  });

  // idle state: the start form beside a fanned deck, one card per chapter
  const startForm = root.querySelector('.loteria__start');
  const deckCards = [
    ['carnaval', 'La Máscara'], ['fallas', 'La Falla'], ['inti-raymi', 'El Sol'], ['tomatina', 'El Tomate'], ['muertos', 'La Calavera'],
  ];
  const idle = document.createElement('div');
  idle.className = 'lidle';
  idle.innerHTML = `<div class="ldeck" aria-hidden="true">${deckCards.map(([id, name], k) => `
      <div class="lcard" style="--c:${byId[id].palette.accent};--a:${(k - 2) * 9}deg">
        <span class="lcard__n">N.º ${cardNumber(id)}</span>
        <div class="lcard__art">${icon(id, { ink: '#1A1140', fill: '#FFF4E2', alt: id === 'tomatina' ? '#E3271B' : '#FFF4E2' })}</div>
        <span class="lcard__name">${name}</span>
      </div>`).join('')}</div>`;
  idle.prepend(startForm);
  root.appendChild(idle);

  loadBoard();
}
