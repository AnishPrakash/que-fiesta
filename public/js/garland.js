// Papel picado garland (Wasiq).
// A string of cut-paper flags drawn in SVG. Each flag has its own cut pattern
// (made with an SVG <mask>) and swings on a damped spring when the pointer
// moves across the string — like real tissue paper in a breeze.
import { reducedMotion, whileVisible } from './util.js';

const COLORS = ['#F2177E', '#FFA51F', '#17B6A7', '#2DB24A', '#7B2FBE', '#E8361E', '#FFD23F'];
let uid = 0;

function flagShape(w, h) {
  // straight top, scalloped/fringed bottom
  const teeth = 6;
  const tw = w / teeth;
  let d = `M${-w / 2} 0 H${w / 2} V${h - 10}`;
  for (let i = teeth; i > 0; i--) {
    const x1 = -w / 2 + i * tw;
    d += ` L${(x1 - tw / 2).toFixed(1)} ${h} L${(x1 - tw).toFixed(1)} ${h - 10}`;
  }
  return d + ' Z';
}

function cutPattern(variant, w, h) {
  const cx = 0, cy = h * 0.46;
  const s = w / 56; // scale against a 56px flag
  const c = (x, y, r) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * s).toFixed(1)}"/>`;
  const diamond = (x, y, r) => `<path d="M${x} ${y - r * s}L${x + r * s * 0.7} ${y}L${x} ${y + r * s}L${x - r * s * 0.7} ${y}Z"/>`;
  let out = '';
  // row of tiny diamonds under the fold
  for (let i = -2; i <= 2; i++) out += diamond(i * 10 * s, 15 * s, 3);
  switch (variant % 5) {
    case 0: // flower
      out += c(cx, cy, 5);
      for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; out += c(cx + Math.cos(a) * 11 * s, cy + Math.sin(a) * 11 * s, 4.2); }
      break;
    case 1: // nested diamonds
      out += `<path fill-rule="evenodd" d="M0 ${cy - 17 * s}L${13 * s} ${cy}L0 ${cy + 17 * s}L${-13 * s} ${cy}Z M0 ${cy - 9 * s}L${7 * s} ${cy}L0 ${cy + 9 * s}L${-7 * s} ${cy}Z"/>`;
      out += c(-17 * s, cy, 2.5) + c(17 * s, cy, 2.5);
      break;
    case 2: { // eight-point star
      let p = '';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2 - Math.PI / 2; const r = (i % 2 ? 7 : 16) * s; p += `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`; }
      out += `<path d="${p}Z"/>`;
      break;
    }
    case 3: // little sun
      out += c(cx, cy, 7);
      for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; out += diamond(cx + Math.cos(a) * 14 * s, cy + Math.sin(a) * 14 * s, 3); }
      break;
    default: // calavera eyes + teeth
      out += c(-7 * s, cy - 3 * s, 5) + c(7 * s, cy - 3 * s, 5) + diamond(0, cy + 6 * s, 3);
      for (let i = -2; i <= 2; i++) out += `<rect x="${(i * 5 * s - 1.5 * s).toFixed(1)}" y="${(cy + 12 * s).toFixed(1)}" width="${(3 * s).toFixed(1)}" height="${(5 * s).toFixed(1)}"/>`;
  }
  // dots along the fringe
  for (let i = -2; i <= 2; i++) out += c(i * 9.3 * s, h - 18 * s, 1.8);
  return out;
}

export function mountGarland(container, { spacing = 74, flagW = 56, flagH = 72, sag = 26 } = {}) {
  const flags = [];
  let W = 0, H = 0;

  function build() {
    W = container.clientWidth;
    H = container.clientHeight;
    if (!W) return;
    const small = W < 600;
    const fw = small ? flagW * 0.72 : flagW, fh = small ? flagH * 0.72 : flagH, gap = small ? spacing * 0.72 : spacing;
    // the string is a few gentle swags between anchor points
    const swags = Math.max(1, Math.round(W / 520));
    const swagW = W / swags;
    const yAt = (x) => {
      const local = (x % swagW) / swagW; // 0..1 within a swag
      return 10 + sag * 4 * local * (1 - local);
    };
    let path = 'M0 10';
    for (let i = 0; i < swags; i++) path += ` Q${(i + 0.5) * swagW} ${10 + sag * 2} ${(i + 1) * swagW} 10`;

    const count = Math.floor(W / gap);
    const offset = (W - (count - 1) * gap) / 2;
    let defs = '', body = '';
    flags.length = 0;
    for (let i = 0; i < count; i++) {
      const x = offset + i * gap;
      const y = yAt(x) - 2;
      const id = `fm${uid++}`;
      const color = COLORS[(i * 3) % COLORS.length];
      defs += `<mask id="${id}" maskUnits="userSpaceOnUse" x="${-fw}" y="-4" width="${fw * 2}" height="${fh + 8}"><path d="${flagShape(fw, fh)}" fill="#fff"/><g fill="#000">${cutPattern(i, fw, fh)}</g></mask>`;
      body += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><g class="flag-swing"><rect x="${-fw / 2}" y="0" width="${fw}" height="${fh}" fill="${color}" mask="url(#${id})"/><rect x="${-fw / 2}" y="-1" width="${fw}" height="6" fill="#000" opacity=".18"/></g></g>`;
      flags.push({ x, angle: (Math.random() - 0.5) * 6, vel: 0, phase: Math.random() * 6.28 });
    }
    container.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>${defs}</defs><path d="${path}" fill="none" stroke="#FFF4E2" stroke-opacity=".75" stroke-width="2"/>${body}</svg>`;
    const swings = container.querySelectorAll('.flag-swing');
    flags.forEach((f, i) => (f.el = swings[i]));
    render();
  }

  function render() {
    for (const f of flags) f.el?.setAttribute('transform', `rotate(${f.angle.toFixed(2)})`);
  }

  // pointer gives the flags a push
  let lastX = null, lastT = 0;
  function onMove(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    if (lastX !== null && y < rect.height + 140) {
      const vx = (x - lastX) / Math.max(16, now - lastT); // px per ms
      const reach = 110;
      for (const f of flags) {
        const dist = Math.abs(f.x - x);
        if (dist < reach) f.vel += vx * 10 * (1 - dist / reach);
      }
      start();
    }
    lastX = x;
    lastT = now;
  }

  let running = false, visible = true, raf;
  function tick(t) {
    let energy = 0;
    for (const f of flags) {
      const breeze = Math.sin(t / 1400 + f.phase) * 0.6;
      f.vel += (-0.045 * (f.angle - breeze) - 0.075 * f.vel);
      f.vel = Math.max(-6, Math.min(6, f.vel));
      f.angle = Math.max(-38, Math.min(38, f.angle + f.vel));
      energy += Math.abs(f.vel);
    }
    render();
    if (visible) raf = requestAnimationFrame(tick);
    else running = false;
  }
  function start() {
    if (running || reducedMotion() || !visible) return;
    running = true;
    raf = requestAnimationFrame(tick);
  }

  build();
  let resizeT;
  addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(build, 150); });
  if (!reducedMotion()) {
    addEventListener('pointermove', onMove, { passive: true });
    whileVisible(container, (v) => { visible = v; if (v) start(); });
  }
}
