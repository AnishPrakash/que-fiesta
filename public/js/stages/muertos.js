// Día de Muertos stage (Anish).
// An ofrenda in three tiers under an arch of cempasúchil. Light all seven
// velas and a path of marigold petals appears to guide the souls home.
// Moving the pointer over the altar drops a trail of falling petals.
import { $, $$, rand, reducedMotion, whileVisible, toast, escapeHtml } from '../util.js';

const CANDLES = [
  [214, 290], [386, 290],
  [150, 380], [450, 380],
  [96, 470], [300, 470], [504, 470],
];

export function mount(stage, f, chapter) {
  const p = f.palette;
  // papel picado strip across the top
  let flags = '';
  const fcol = [p.accent2, p.accent, p.accent3, '#B57BFF', p.accent2, p.accent, p.accent3, '#B57BFF'];
  for (let i = 0; i < 8; i++) {
    const x = 6 + i * 74;
    flags += `<g transform="translate(${x} 18)"><path d="M0 0h66v54l-5.5 8-5.5-8-5.5 8-5.5-8-5.5 8-5.5-8-5.5 8-5.5-8-5.5 8-5.5-8-5.5 8L0 54z" fill="${fcol[i]}"/>
      <g fill="#170622"><circle cx="33" cy="26" r="8"/><circle cx="18" cy="14" r="3"/><circle cx="48" cy="14" r="3"/><circle cx="18" cy="40" r="3"/><circle cx="48" cy="40" r="3"/><path d="M33 4l4 5-4 5-4-5z"/></g></g>`;
  }
  // marigold arch
  let arch = '';
  for (let i = 0; i <= 26; i++) {
    const t = i / 26;
    const a = Math.PI * (1 - t);
    const x = 300 + Math.cos(a) * 168, y = 380 - Math.sin(a) * 250;
    arch += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i % 3 ? 15 : 19}" fill="${i % 2 ? p.accent : '#FFB940'}" stroke="#C85F00" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#C85F00" opacity=".6"/>`;
  }
  // petal path on the floor
  let petals = '';
  for (let i = 0; i < 50; i++) {
    const t = i / 50;
    const x = 300 + Math.sin(t * 9) * 40 * (1 - t) + rand(-14, 14), y = 620 - t * 60 + rand(-4, 4);
    petals += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rand(4, 8).toFixed(1)}" ry="${rand(2, 4).toFixed(1)}" fill="${i % 3 ? p.accent : '#FFB940'}" transform="rotate(${rand(0, 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }
  const lace = (x1, x2, y) => {
    let d = `M${x1} ${y}`;
    for (let x = x1; x < x2; x += 20) d += ` q10 14 20 0`;
    return `<path d="${d}" fill="none" stroke="#fff" stroke-width="3"/>`;
  };
  const skull = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0-22c13 0 20 9 20 19 0 7-4 11-7 13v6H-13v-6c-3-2-7-6-7-13 0-10 7-19 20-19z" fill="#FFF7EE" stroke="#4a2a3a" stroke-width="2"/><circle cx="-7" cy="-3" r="5" fill="${c}"/><circle cx="7" cy="-3" r="5" fill="${c}"/><path d="M0 3l-3 5h6z" fill="#4a2a3a"/><path d="M-8-15q8-5 16 0" stroke="${p.accent3}" stroke-width="2.5" fill="none"/><path d="M-6 13v4M-2 13v4M2 13v4M6 13v4" stroke="#4a2a3a" stroke-width="1.5"/></g>`;
  const frame = (x, y, tone) => `<g transform="translate(${x} ${y})"><rect x="-26" y="-34" width="52" height="64" rx="3" fill="#8B5A2B" stroke="#3b2414" stroke-width="3"/><rect x="-19" y="-27" width="38" height="50" fill="${tone}"/><circle cx="0" cy="-8" r="9" fill="#5b4636"/><path d="M-15 23c0-14 7-20 15-20s15 6 15 20z" fill="#5b4636"/></g>`;

  const candles = CANDLES.map(([x, y], i) => `
    <g class="vela-btn" role="button" tabindex="0" aria-pressed="false" aria-label="Vela ${i + 1} — unlit candle" data-i="${i}" transform="translate(${x} ${y})">
      <circle class="glow" cx="0" cy="-58" r="46" fill="url(#mGlow)"/>
      <rect class="wax" x="-9" y="-46" width="18" height="46" rx="3" fill="#FFF2DC" stroke="#4a2a3a" stroke-width="1.5"/>
      <path d="M-9 -38h18" stroke="${p.accent2}" stroke-width="3"/>
      <line x1="0" y1="-46" x2="0" y2="-52" stroke="#2a1a1a" stroke-width="2"/>
      <path class="flame" d="M0 -74c5 8 9 12 9 18a9 9 0 0 1-18 0c0-6 4-10 9-18z" fill="${p.accent}"/>
      <rect x="-20" y="-80" width="40" height="80" fill="transparent"/>
    </g>`).join('');

  stage.classList.add('stage-muertos');
  stage.innerHTML = `
  <svg viewBox="0 0 600 640" role="img" aria-label="Illustration of an ofrenda: a three-tier altar with photos, marigolds, pan de muerto, sugar skulls and candles">
    <defs>
      <radialGradient id="mGlow"><stop offset="0" stop-color="#FFD27A" stop-opacity=".9"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>
      <linearGradient id="mWall" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#170622"/><stop offset="1" stop-color="${p.soft}"/></linearGradient>
    </defs>
    <rect width="600" height="640" fill="url(#mWall)"/>
    <path d="M0 14 Q300 30 600 14" stroke="#FFEFDF" stroke-width="2" fill="none" opacity=".6"/>
    ${flags}
    ${arch}
    <!-- tiers -->
    <rect x="190" y="290" width="220" height="90" fill="${p.accent2}"/>
    <rect x="130" y="380" width="340" height="90" fill="#E8D5F5"/>
    <rect x="70" y="470" width="460" height="100" fill="${p.accent3}"/>
    ${lace(190, 410, 296)}${lace(130, 470, 386)}${lace(70, 530, 476)}
    <g opacity=".35" fill="#fff"><circle cx="230" cy="340" r="6"/><circle cx="370" cy="340" r="6"/><circle cx="170" cy="430" r="6"/><circle cx="430" cy="430" r="6"/><circle cx="110" cy="525" r="6"/><circle cx="490" cy="525" r="6"/></g>
    <!-- photos on the top tier -->
    ${frame(258, 255, '#d9b98c')}${frame(342, 255, '#c9a77a')}
    <!-- second tier: pan de muerto, water, salt, sugar skulls -->
    <g transform="translate(220 380)"><path d="M-36 0c0-24 16-36 36-36s36 12 36 36z" fill="#D9883B" stroke="#7a3f12" stroke-width="2"/><path d="M-22-18c8 6 36 6 44 0M0-36v28" stroke="#F4C27A" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-36" r="6" fill="#F4C27A"/></g>
    <g transform="translate(300 380)"><path d="M-14-44h28l-3 44h-22z" fill="#BFE7F7" opacity=".85" stroke="#fff" stroke-width="2"/><path d="M-12-26h24l-2 26h-20z" fill="#5BC0EB"/></g>
    <g transform="translate(372 380)"><path d="M-22-6h44q-4 6-22 6t-22-6z" fill="#8a4b2a"/><path d="M-18-6q18-18 36 0z" fill="#fff"/></g>
    ${skull(170, 360, p.accent2)}${skull(430, 360, p.accent3)}
    <!-- bottom tier: copal burner, marigold bunches, more skulls -->
    <g transform="translate(200 470)"><path d="M-22-22h44l-8 22h-28z" fill="#a0522d" stroke="#5a2a10" stroke-width="2"/><path class="copal-smoke" d="M0-26c-10-14 10-22 0-38s10-24 0-40" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round" opacity=".5"/></g>
    <g transform="translate(400 470)">${[-18, 0, 18].map((dx) => `<line x1="${dx * 0.4}" y1="0" x2="${dx}" y2="-40" stroke="#3b7a2a" stroke-width="3"/><circle cx="${dx}" cy="-44" r="12" fill="${p.accent}" stroke="#C85F00" stroke-width="2"/>`).join('')}</g>
    ${skull(250, 545, p.accent2)}${skull(350, 545, p.accent)}
    <g class="ofrenda-path">${petals}</g>
    ${candles}
  </svg>
  <canvas class="petal-canvas" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></canvas>
  <div class="stage__hint"><span lang="es">${escapeHtml(f.interaction.es)}</span><em>Click or tap each candle</em></div>`;

  const controls = chapter.querySelector('.stage__controls');
  controls.innerHTML = `
    <button class="btn btn--ink" type="button" id="mAll">Encender todas</button>
    <button class="btn" type="button" id="mNone" style="color:inherit">Apagar</button>
    <p class="stage__stat" aria-live="polite">Velas encendidas: <b id="mCount">0</b> / 7</p>`;

  const velas = $$('.vela-btn', stage);
  const count = $('#mCount', controls);
  let complete = false;
  function setLit(v, on) {
    v.classList.toggle('is-lit', on);
    v.setAttribute('aria-pressed', on);
    v.setAttribute('aria-label', `Vela ${Number(v.dataset.i) + 1} — ${on ? 'lit' : 'unlit'} candle`);
  }
  function refresh() {
    const n = velas.filter((v) => v.classList.contains('is-lit')).length;
    count.textContent = n;
    const done = n === velas.length;
    stage.classList.toggle('is-complete', done);
    if (done && !complete) toast('Las almas ya encontraron el camino a casa. The souls have found their way home.');
    complete = done;
  }
  velas.forEach((v) => {
    const toggle = (e) => { e.stopPropagation(); setLit(v, !v.classList.contains('is-lit')); refresh(); };
    v.addEventListener('click', toggle);
    v.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } });
  });
  $('#mAll', controls).addEventListener('click', () => {
    velas.forEach((v, i) => setTimeout(() => { setLit(v, true); refresh(); }, reducedMotion() ? 0 : i * 180));
  });
  $('#mNone', controls).addEventListener('click', () => { velas.forEach((v) => setLit(v, false)); refresh(); });

  // copal smoke drifts
  if (!reducedMotion()) {
    $('.copal-smoke', stage).animate([{ transform: 'translateY(0)', opacity: 0.5 }, { transform: 'translateY(-12px)', opacity: 0.15 }], { duration: 2600, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
    petalTrail(stage, p);
  }
}

function petalTrail(stage, p) {
  const canvas = $('.petal-canvas', stage);
  const ctx = canvas.getContext('2d');
  let W, H, petals = [], raf = null, visible = false;
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = stage.clientWidth; H = stage.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  new ResizeObserver(size).observe(stage);
  whileVisible(stage, (v) => (visible = v));
  stage.addEventListener('pointermove', (e) => {
    if (!visible || petals.length > 140) return;
    const r = stage.getBoundingClientRect();
    for (let i = 0; i < 2; i++) petals.push({ x: e.clientX - r.left + rand(-6, 6), y: e.clientY - r.top, vx: rand(-0.6, 0.6), vy: rand(0.4, 1.4), r: rand(0, 6), vr: rand(-0.08, 0.08), life: 1, c: Math.random() < 0.6 ? p.accent : '#FFB940' });
    if (!raf) raf = requestAnimationFrame(tick);
  });
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const q of petals) {
      q.x += q.vx + Math.sin(q.y / 20) * 0.4; q.y += q.vy; q.r += q.vr; q.life -= 0.008;
      ctx.save(); ctx.globalAlpha = Math.max(0, q.life); ctx.translate(q.x, q.y); ctx.rotate(q.r);
      ctx.fillStyle = q.c; ctx.beginPath(); ctx.ellipse(0, 0, 6, 3, 0, 0, 7); ctx.fill(); ctx.restore();
    }
    petals = petals.filter((q) => q.life > 0 && q.y < H + 10);
    raf = petals.length ? requestAnimationFrame(tick) : null;
  }
}
