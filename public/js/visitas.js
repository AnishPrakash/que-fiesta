// Libro de visitas (Tanmay).
// Visitors send a postcard: name, favourite fiesta, message. Stored through
// /api/guestbook and shown as stamped postcards on a wall.
import { $, api, escapeHtml, toast } from './util.js';
import { icon } from './icons.js';

function haceCuanto(iso) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso)) / 1000));
  if (s < 60) return 'hace un momento';
  const m = Math.round(s / 60);
  if (m < 60) return `hace ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return d === 1 ? 'ayer' : `hace ${d} días`;
}

export function mountVisitas(festivals) {
  const form = $('#visitasForm');
  const wall = $('#postales');
  const select = $('#vFiesta');
  const msg = $('#vMsg');
  const counter = $('#vCount');
  const errorEl = $('#vError');
  const byId = Object.fromEntries(festivals.map((f) => [f.id, f]));

  select.innerHTML = '<option value="">Elige una…</option>' + festivals.map((f) => `<option value="${f.id}">${escapeHtml(f.name)}</option>`).join('');
  msg.addEventListener('input', () => (counter.textContent = `${msg.value.length} / 240`));

  const postcard = (e, isNew = false) => {
    const f = byId[e.fiesta];
    const r = ((e.name.length * 7 + e.message.length) % 7) - 3;
    return `<article class="postal${isNew ? ' is-new' : ''}"${e.team ? ' data-team' : ''} style="--r:${r}deg">
      <div class="postal__stamp" style="--c:${f?.palette.accent || '#F2177E'}" title="${escapeHtml(f?.name || '')}">${icon(e.fiesta, { ink: '#1A1140', fill: '#FFF4E2', alt: e.fiesta === 'tomatina' ? '#E3271B' : '#FFF4E2' })}</div>
      <p class="postal__msg">${escapeHtml(e.message)}</p>
      <p class="postal__from">${escapeHtml(e.name)}</p>
      <p class="postal__meta">${e.team ? 'Del equipo. ' : ''}Me encanta: ${escapeHtml(f?.name || '—')}, ${haceCuanto(e.at)}</p>
    </article>`;
  };

  async function load() {
    try {
      const { entries } = await api('guestbook');
      wall.innerHTML = entries.length
        ? entries.map((e) => postcard(e)).join('')
        : '<p class="visitas__empty">El buzón está vacío. Be the first to send a postcard!</p>';
    } catch {
      wall.innerHTML = '<p class="visitas__empty">Couldn’t load the postcards right now.</p>';
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    errorEl.textContent = '';
    const data = Object.fromEntries(new FormData(form));
    if ((data.name || '').trim().length < 2) return showError('Escribe tu nombre — at least 2 letters.', '#vName');
    if (!data.fiesta) return showError('Elige una fiesta from the list.', '#vFiesta');
    if ((data.message || '').trim().length < 3) return showError('Escribe un mensaje — at least 3 characters.', '#vMsg');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    try {
      const { entry } = await api('guestbook', { method: 'POST', body: data });
      $('.visitas__empty', wall)?.remove();
      wall.querySelectorAll('.postal[data-team]').forEach((n) => n.remove());
      wall.insertAdjacentHTML('afterbegin', postcard(entry, true));
      form.reset();
      counter.textContent = '0 / 240';
      toast('¡Postal enviada! Postcard sent.');
    } catch (e) {
      showError(e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar postal';
    }
  });

  function showError(text, focusSel) {
    errorEl.textContent = text;
    if (focusSel) $(focusSel)?.focus();
  }

  load();
}
