// La Tomatina stage (Tanmay).
// A whitewashed Buñol wall. Click anywhere to throw a tomato — it flies in an
// arc and splats. Every throw is added to one global counter on our server
// (/api/tomatoes), so the number is shared by everyone who visits the site.
import { $, rand, api, reducedMotion, escapeHtml } from '../util.js';

export function mount(stage, f, chapter) {
  const p = f.palette;
  let cobbles = '';
  for (let row = 0; row < 4; row++) {
    for (let x = -20 + (row % 2) * 22; x < 620; x += 44) cobbles += `<ellipse cx="${x}" cy="${500 + row * 18}" rx="20" ry="8" fill="${row % 2 ? '#c9bba8' : '#d8ccbb'}" stroke="#a89880" stroke-width="1.5"/>`;
  }
  let tiles = '';
  for (let x = 0; x < 600; x += 30) tiles += `<rect x="${x}" y="70" width="30" height="30" fill="#fff" stroke="${p.accent3}" stroke-width="1.5"/><path d="M${x + 15} 74l11 11-11 11-11-11z" fill="${p.accent3}"/><circle cx="${x + 15}" cy="85" r="3" fill="#FFD23F"/>`;

  stage.classList.add('stage-tomatina');
  stage.innerHTML = `
  <svg viewBox="0 0 600 560" role="img" aria-label="Illustration of a whitewashed street wall in Buñol with a green door and a balcony covered in plastic">
    <rect width="600" height="560" fill="#FBF7EF"/>
    <path d="M0 0H600V480H0Z" fill="#FFFDF8"/>
    <path d="M40 210c30-10 40 20 80 6M420 160c20 10 40-6 70 4M200 400c40-12 60 10 110 0" stroke="#efe6d6" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${tiles}
    <!-- balcony with protective plastic -->
    <rect x="360" y="150" width="170" height="130" fill="#2b1a12" opacity=".08"/>
    <rect x="378" y="160" width="134" height="110" rx="4" fill="#5d7f9a"/>
    <path d="M378 160h134v110H378z" fill="#cfe3f0" opacity=".55"/>
    <path d="M345 270h200v14H345z" fill="#3b2a20"/>
    <g stroke="#3b2a20" stroke-width="4">${Array.from({ length: 11 }, (_, i) => `<line x1="${350 + i * 19}" y1="284" x2="${350 + i * 19}" y2="340"/>`).join('')}<line x1="345" y1="340" x2="545" y2="340"/></g>
    <path d="M340 150 Q360 260 350 345 L540 345 Q530 260 550 150Z" fill="#e8f1f8" opacity=".42" stroke="#b8c9d6" stroke-width="2"/>
    <!-- green door -->
    <path d="M70 480V250a60 60 0 0 1 120 0v230z" fill="${p.accent2}" stroke="#1d5a24" stroke-width="5"/>
    <path d="M130 200v280" stroke="#1d5a24" stroke-width="4"/>
    <circle cx="118" cy="370" r="6" fill="#FFD23F"/><circle cx="142" cy="370" r="6" fill="#FFD23F"/>
    <!-- street sign -->
    <rect x="240" y="180" width="96" height="40" rx="4" fill="#fff" stroke="${p.accent3}" stroke-width="3"/>
    <text x="288" y="198" text-anchor="middle" font-size="11" font-weight="700" fill="${p.accent3}" font-family="Recursive, sans-serif">Calle del</text>
    <text x="288" y="213" text-anchor="middle" font-size="14" fill="${p.accent3}" font-family="Shrikhand, serif">Cristo</text>
    <!-- the palo jabón: a soapy pole with a jamón tied to the top -->
    <g>
      <rect x="560" y="120" width="12" height="362" fill="#a0703d" stroke="#5a3a1a" stroke-width="2"/>
      <path d="M560 190h12M560 270h12M560 350h12M560 430h12" stroke="#fff" stroke-width="3" opacity=".55"/>
      <path d="M572 120H524" stroke="#5a3a1a" stroke-width="5" stroke-linecap="round"/>
      <path d="M530 120v10" stroke="#5a3a1a" stroke-width="2"/>
      <path d="M526 128h8v10h-8z" fill="#3b2414"/>
      <path d="M528 138c-2 10 4 16 2 24-8 6-20 18-20 34 0 14 10 22 20 22s20-8 20-22c0-18-10-28-18-34-2-8 2-14 0-24z" fill="#8E1F1A" stroke="#4a1210" stroke-width="2.5"/>
      <path d="M512 196c0 12 8 19 18 19" fill="none" stroke="#F6D7B0" stroke-width="5" stroke-linecap="round"/>
      <path d="M522 176c4-4 10-4 14 0" fill="none" stroke="#C0392B" stroke-width="3" stroke-linecap="round"/>
    </g>
    <!-- geranium pot by the door -->
    <g transform="translate(222 432)"><path d="M-18 0h36l-6 40h-24z" fill="#C0602F" stroke="#7a3a1a" stroke-width="2"/><circle cx="-10" cy="-8" r="9" fill="${p.accent}"/><circle cx="6" cy="-14" r="9" fill="#ff6b5b"/><circle cx="12" cy="-2" r="8" fill="${p.accent}"/><path d="M-14 0l-6-10M0 0v-12M14 0l6-8" stroke="${p.accent2}" stroke-width="3"/></g>
    <rect y="480" width="600" height="80" fill="#e4d9c8"/>
    ${cobbles}
  </svg>
  <canvas class="splats" aria-hidden="true"></canvas>
  <canvas class="flying" aria-hidden="true"></canvas>
  <div class="stage__hint"><span lang="es">${escapeHtml(f.interaction.es)}</span><em>Click the wall — or use the button below</em></div>`;

  const controls = chapter.querySelector('.stage__controls');
  controls.innerHTML = `
    <button class="btn btn--ink" type="button" id="tThrow">Lanzar un tomate</button>
    <button class="btn" type="button" id="tClean" style="color:inherit">Limpiar con las mangueras</button>
    <p class="stage__stat" aria-live="polite">Entre todos: <b id="tTotal">…</b> tomates.<br>Tú: <b id="tMine">0</b></p>`;

  const splatC = $('.splats', stage), flyC = $('.flying', stage);
  const sctx = splatC.getContext('2d'), fctx = flyC.getContext('2d');
  let W = 0, H = 0, dpr = 1;
  function size() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = stage.clientWidth; H = stage.clientHeight;
    for (const c of [splatC, flyC]) { c.width = W * dpr; c.height = H * dpr; c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0); }
  }
  size();
  new ResizeObserver(size).observe(stage);

  // ── server counter (batched) ──
  let total = 0, mine = 0, pending = 0;
  const totalEl = $('#tTotal', controls), mineEl = $('#tMine', controls);
  const fmt = (n) => n.toLocaleString('es-ES');
  api('tomatoes').then((d) => { total = d.total; totalEl.textContent = fmt(total); }).catch(() => (totalEl.textContent = '—'));
  async function flush() {
    if (!pending) return;
    const n = pending;
    pending = 0;
    try { const d = await api('tomatoes', { method: 'POST', body: { count: n } }); total = d.total; totalEl.textContent = fmt(total); }
    catch { pending += n; }
  }
  setInterval(flush, 2500);
  addEventListener('pagehide', () => {
    if (pending && navigator.sendBeacon) navigator.sendBeacon('/api/tomatoes', new Blob([JSON.stringify({ count: pending })], { type: 'application/json' }));
  });

  // ── throwing ──
  const flying = [];
  let raf = null;
  function throwAt(x, y) {
    mine += 1; pending += 1; total += 1;
    mineEl.textContent = mine;
    totalEl.textContent = fmt(total);
    if (reducedMotion()) return splat(x, y);
    flying.push({ sx: rand(W * 0.1, W * 0.9), sy: H + 30, x, y, t0: performance.now(), dur: rand(320, 460), spin: rand(-6, 6) });
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function frame(now) {
    fctx.clearRect(0, 0, W, H);
    for (let i = flying.length - 1; i >= 0; i--) {
      const t = flying[i];
      const k = Math.min(1, (now - t.t0) / t.dur);
      const px = t.sx + (t.x - t.sx) * k;
      const py = t.sy + (t.y - t.sy) * k - Math.sin(k * Math.PI) * H * 0.25;
      const r = (W / 600) * (26 - 12 * k);
      fctx.save();
      fctx.translate(px, py);
      fctx.rotate(t.spin * k);
      fctx.fillStyle = p.accent;
      fctx.beginPath(); fctx.arc(0, 0, r, 0, 7); fctx.fill();
      fctx.fillStyle = 'rgba(255,255,255,.45)';
      fctx.beginPath(); fctx.ellipse(-r * 0.35, -r * 0.35, r * 0.28, r * 0.16, -0.6, 0, 7); fctx.fill();
      fctx.fillStyle = p.accent2;
      fctx.beginPath(); for (let j = 0; j < 5; j++) { const a = (j / 5) * Math.PI * 2; fctx.lineTo(Math.cos(a) * r * 0.45, -r * 0.8 + Math.sin(a) * r * 0.25); } fctx.fill();
      fctx.restore();
      if (k >= 1) { splat(t.x, t.y); flying.splice(i, 1); }
    }
    raf = flying.length ? requestAnimationFrame(frame) : null;
  }
  function splat(x, y) {
    const s = (W / 600) * rand(0.8, 1.35);
    const R = 38 * s;
    // blob
    const blob = (radius, color, jitter) => {
      sctx.fillStyle = color;
      sctx.beginPath();
      const n = 22;
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rr = radius * (i % 2 ? rand(0.55, 0.85) : rand(0.9, 1.35 + jitter));
        sctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      sctx.closePath();
      sctx.fill();
    };
    blob(R, '#A3140C', 0.35);
    blob(R * 0.78, p.accent, 0.1);
    blob(R * 0.4, '#F0553F', 0);
    // drips running down the wall
    sctx.strokeStyle = '#B8170E';
    sctx.lineCap = 'round';
    for (let i = 0; i < Math.floor(rand(1, 4)); i++) {
      const dx = x + rand(-R * 0.6, R * 0.6), len = rand(20, 70) * s;
      sctx.lineWidth = rand(4, 8) * s;
      sctx.beginPath(); sctx.moveTo(dx, y); sctx.lineTo(dx, y + len); sctx.stroke();
      sctx.fillStyle = '#B8170E';
      sctx.beginPath(); sctx.arc(dx, y + len, sctx.lineWidth * 0.75, 0, 7); sctx.fill();
    }
    // flung droplets
    sctx.fillStyle = p.accent;
    for (let i = 0; i < 12; i++) {
      const a = rand(0, Math.PI * 2), d = rand(R * 1.2, R * 2.4);
      sctx.beginPath(); sctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, rand(2, 6) * s, 0, 7); sctx.fill();
    }
    // seeds
    sctx.fillStyle = '#F7E08B';
    for (let i = 0; i < 9; i++) {
      const a = rand(0, Math.PI * 2), d = rand(0, R * 0.7);
      sctx.beginPath(); sctx.ellipse(x + Math.cos(a) * d, y + Math.sin(a) * d, 3 * s, 1.8 * s, a, 0, 7); sctx.fill();
    }
  }

  stage.addEventListener('click', (e) => {
    const r = stage.getBoundingClientRect();
    throwAt(e.clientX - r.left, e.clientY - r.top);
  });
  $('#tThrow', controls).addEventListener('click', () => throwAt(rand(W * 0.1, W * 0.9), rand(H * 0.1, H * 0.75)));
  $('#tClean', controls).addEventListener('click', () => {
    if (reducedMotion()) return sctx.clearRect(0, 0, W, H);
    // the firefighters' hoses wash the wall from top to bottom
    let y = 0;
    const wash = () => {
      sctx.save();
      sctx.globalCompositeOperation = 'destination-out';
      sctx.fillStyle = 'rgba(0,0,0,1)';
      sctx.fillRect(0, 0, W, y);
      sctx.globalCompositeOperation = 'source-atop';
      sctx.fillStyle = 'rgba(160,200,230,.35)';
      for (let i = 0; i < 18; i++) sctx.fillRect(rand(0, W), y, rand(2, 5), rand(20, 60));
      sctx.restore();
      y += H / 40;
      if (y < H + 60) requestAnimationFrame(wash);
      else sctx.clearRect(0, 0, W, H);
    };
    requestAnimationFrame(wash);
  });
}
