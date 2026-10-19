// Shared helpers used by every module.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const rand = (a, b) => a + Math.random() * (b - a);
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export async function api(path, options = {}) {
  const res = await fetch(`/api/${path}`, {
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

let toastTimer;
export function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-on'), 2800);
}

export const monthsEs = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const monthsEsLong = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const d = (iso) => new Date(iso + 'T00:00:00Z');

// "6–9 feb", "24 jun", "1–2 nov"
export function shortRange(next) {
  const s = d(next.start), e = d(next.end);
  const sm = monthsEs[s.getUTCMonth()];
  if (next.start === next.end) return { day: `${s.getUTCDate()}`, month: sm };
  if (s.getUTCMonth() === e.getUTCMonth()) return { day: `${s.getUTCDate()}–${e.getUTCDate()}`, month: sm };
  return { day: `${s.getUTCDate()}`, month: sm };
}

export function longDateEs(iso) {
  const x = d(iso);
  return `${x.getUTCDate()} de ${monthsEsLong[x.getUTCMonth()]} de ${x.getUTCFullYear()}`;
}

export function daysPhrase(n) {
  if (n === 0) return '¡Es hoy!';
  if (n === 1) return 'Falta 1 día';
  return `Faltan ${n} días`;
}

// Run a callback only while an element is on screen (pauses animation loops).
export function whileVisible(elem, onChange, rootMargin = '100px') {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => onChange(e.isIntersecting)), { rootMargin });
  io.observe(elem);
  return io;
}

// ───── Speech: reads Spanish words aloud with the right regional voice ─────
let soundOn = true;
try { soundOn = localStorage.getItem('qf-sound') !== 'off'; } catch {}
export const isSoundOn = () => soundOn;
export function setSound(on) {
  soundOn = on;
  try { localStorage.setItem('qf-sound', on ? 'on' : 'off'); } catch {}
}

let voices = [];
if ('speechSynthesis' in window) {
  const load = () => (voices = speechSynthesis.getVoices());
  load();
  speechSynthesis.addEventListener?.('voiceschanged', load);
}

export function speak(text, lang = 'es-ES') {
  if (!soundOn || !('speechSynthesis' in window)) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  u.voice =
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.replace('_', '-').startsWith(lang.slice(0, 5))) ||
    voices.find((v) => v.lang.startsWith('es')) ||
    null;
  speechSynthesis.speak(u);
  return true;
}
