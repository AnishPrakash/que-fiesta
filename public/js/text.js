// Vocabulary engine.
//  • Turns [[palabra|meaning]] markup into hover/tap tooltip words.
//  • Remembers which words a visitor has "found" and marks them on the
//    chapter's 5 × 5 Lotería board (the tabla) with a bean.
//  • Tapping a word (or its board cell) speaks it with a regional voice.
import { $, $$, escapeHtml, speak, isSoundOn, toast } from './util.js';

const RE = /\[\[([^|\]]+)\|([^|\]]+)(?:\|([a-z]{2}))?\]\]/g;
const LANG_NAMES = { qu: 'Quechua', va: 'Valencian', na: 'Nahuatl' };

// fiestaId -> [{ word, en }] in order of first appearance (exactly 25 per chapter)
export const vocab = {};

let found = {};
try { found = JSON.parse(localStorage.getItem('qf-found') || '{}'); } catch {}
const save = () => { try { localStorage.setItem('qf-found', JSON.stringify(found)); } catch {} };

export function collectVocab(f) {
  const text = [f.intro, ...f.sections.map((s) => s.body), f.didYouKnow].join(' ');
  const seen = new Map();
  for (const m of text.matchAll(RE)) {
    if (m[3]) continue;
    const key = m[1].toLowerCase();
    if (!seen.has(key)) seen.set(key, { word: key, en: m[2] });
  }
  vocab[f.id] = [...seen.values()];
  found[f.id] ||= [];
  return vocab[f.id];
}

// Markup → HTML. Text outside the markup is escaped.
export function renderRich(str, fiestaId) {
  let out = '';
  let last = 0;
  for (const m of str.matchAll(RE)) {
    out += escapeHtml(str.slice(last, m.index));
    const [, word, en, lang] = m;
    if (lang) {
      out += `<span class="pal pal--other" tabindex="0"><span lang="${lang === 'va' ? 'ca' : lang}">${escapeHtml(word)}</span><span class="pal__en" role="tooltip">${escapeHtml(en)}<span class="pal__lang">${LANG_NAMES[lang]}, not Spanish</span></span></span>`;
    } else {
      const key = word.toLowerCase();
      const isFound = found[fiestaId]?.includes(key) ? ' is-found' : '';
      out += `<span class="pal${isFound}" tabindex="0" data-f="${fiestaId}" data-w="${escapeHtml(key)}"><span lang="es">${escapeHtml(word)}</span><span class="pal__en" role="tooltip">${escapeHtml(en)}</span></span>`;
    }
    last = m.index + m[0].length;
  }
  return out + escapeHtml(str.slice(last));
}

export function renderTabla(f) {
  const words = vocab[f.id];
  const cells = words
    .map((w, i) => {
      const isFound = found[f.id].includes(w.word) ? ' is-found' : '';
      return `<button type="button" class="tcell${isFound}" data-f="${f.id}" data-w="${escapeHtml(w.word)}" style="--r:${(i * 37) % 50 - 25}deg" aria-label="${escapeHtml(w.word)}: ${escapeHtml(w.en)}${isFound ? ' (found)' : ''}">
        <span class="tcell__n">${i + 1}</span>
        <span class="tcell__w" lang="es">${escapeHtml(w.word)}</span>
        <span class="tcell__en">${escapeHtml(w.en)}</span>
      </button>`;
    })
    .join('');
  return `<aside class="tabla" data-f="${f.id}" aria-labelledby="tabla-${f.id}">
    <div class="tabla__head">
      <h3 id="tabla-${f.id}">La tabla de ${escapeHtml(f.author)}<small>${escapeHtml(f.author)}'s 25 Spanish words, in the order they appear</small></h3>
      <p class="tabla__count" aria-live="polite"><b>${found[f.id].length}</b> / 25 encontradas</p>
    </div>
    <div class="tabla__board">${cells}</div>
    <p class="tabla__hint">Every word you hover or tap in the chapter drops a bean on its card. Fill all 25 and shout <span lang="es">¡Lotería!</span> Tap a card to hear it.</p>
  </aside>`;
}

function markFound(fid, word) {
  if (!vocab[fid] || found[fid].includes(word)) return;
  found[fid].push(word);
  save();
  $$(`.pal[data-f="${fid}"][data-w="${CSS.escape(word)}"]`).forEach((p) => p.classList.add('is-found'));
  const cell = $(`.tcell[data-f="${fid}"][data-w="${CSS.escape(word)}"]`);
  if (cell) {
    cell.classList.add('is-found');
    cell.setAttribute('aria-label', cell.getAttribute('aria-label') + ' (found)');
  }
  const tabla = $(`.tabla[data-f="${fid}"]`);
  if (tabla) {
    $('.tabla__count b', tabla).textContent = found[fid].length;
    if (found[fid].length === vocab[fid].length) {
      tabla.classList.add('is-complete');
      toast('¡Lotería! You found all 25 words in this chapter.');
      document.dispatchEvent(new CustomEvent('qf:loteria', { detail: { fid } }));
    }
  }
}

// keep tooltips inside the viewport
function nudgeTooltip(pal) {
  const tip = $('.pal__en', pal);
  if (!tip) return;
  tip.style.setProperty('--shift', '0px');
  const r = tip.getBoundingClientRect();
  const pad = 10;
  let shift = 0;
  if (r.left < pad) shift = pad - r.left;
  else if (r.right > innerWidth - pad) shift = innerWidth - pad - r.right;
  tip.style.setProperty('--shift', `${shift}px`);
}

export function initWords(locales) {
  let hoverTimer;
  let open;

  const close = () => { open?.classList.remove('is-open'); open = null; };

  document.addEventListener('pointerover', (e) => {
    const pal = e.target.closest('.pal');
    if (!pal) return;
    nudgeTooltip(pal);
    clearTimeout(hoverTimer);
    if (pal.dataset.w) hoverTimer = setTimeout(() => markFound(pal.dataset.f, pal.dataset.w), 350);
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest('.pal')) clearTimeout(hoverTimer);
  });
  document.addEventListener('focusin', (e) => {
    const pal = e.target.closest?.('.pal');
    if (pal) {
      nudgeTooltip(pal);
      if (pal.dataset.w) markFound(pal.dataset.f, pal.dataset.w);
    }
  });

  const say = (fid, word, elem) => {
    const ok = speak(word, locales[fid] || 'es-ES');
    if (ok && elem) {
      elem.classList.remove('is-speaking');
      void elem.offsetWidth;
      elem.classList.add('is-speaking');
    }
    if (!ok && isSoundOn() && !('speechSynthesis' in window)) toast('Your browser cannot speak words aloud.');
  };

  document.addEventListener('click', (e) => {
    const pal = e.target.closest('.pal');
    const cell = e.target.closest('.tcell');
    if (pal) {
      if (open && open !== pal) close();
      pal.classList.add('is-open');
      open = pal;
      nudgeTooltip(pal);
      if (pal.dataset.w) {
        markFound(pal.dataset.f, pal.dataset.w);
        say(pal.dataset.f, pal.dataset.w, pal);
      }
      return;
    }
    if (cell) return say(cell.dataset.f, cell.dataset.w, cell);
    close();
  });
  document.addEventListener('keydown', (e) => {
    const pal = e.target.closest?.('.pal');
    if (pal && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      pal.click();
    }
    if (e.key === 'Escape') close();
  });
}
