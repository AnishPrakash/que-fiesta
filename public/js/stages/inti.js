// Inti Raymi stage (Mohit).
// Scroll-linked sunrise: as you read down the chapter, the Inca sun climbs
// over the Andes and the sky turns from night to gold. The three stages of the
// ceremony underneath light up in order.
import { $, $$, clamp, rand, reducedMotion, escapeHtml } from '../util.js';

const SKY = [
  { top: [26, 11, 46], bottom: [61, 20, 80] },   // night
  { top: [90, 42, 110], bottom: [242, 100, 25] }, // dawn
  { top: [255, 179, 71], bottom: [255, 226, 154] }, // day
];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c) => `rgb(${c.join(',')})`;

export function mount(stage, f, chapter) {
  const p = f.palette;
  let stars = '';
  for (let i = 0; i < 60; i++) stars += `<circle cx="${rand(0, 600).toFixed(0)}" cy="${rand(0, 330).toFixed(0)}" r="${rand(0.7, 2).toFixed(1)}" fill="#fff"/>`;
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * 360;
    rays += i % 2
      ? `<path d="M0 -78 Q 8 -96 0 -112 Q -8 -128 0 -142" transform="rotate(${a})" fill="none" stroke="${p.accent}" stroke-width="7" stroke-linecap="round"/>`
      : `<path d="M-11 -76 L0 -150 L11 -76Z" transform="rotate(${a})" fill="${p.accent}"/>`;
  }
  // Sacsayhuamán zigzag walls: three terraces of fitted stones
  let walls = '';
  [0, 1, 2].forEach((row) => {
    const y = 520 + row * 34;
    let d = `M0 ${y + 34}`;
    for (let x = 0; x <= 600; x += 60) d += ` L${x} ${y + (x / 60) % 2 * 14} `;
    d += `L600 ${y + 34}Z`;
    walls += `<path d="${d}" fill="${['#7A3B26', '#6A3020', '#5A2719'][row]}" stroke="#3a170d" stroke-width="2"/>`;
    for (let x = 0; x < 600; x += rand(26, 44)) walls += `<path d="M${x.toFixed(0)} ${y + 12} q 6 10 0 22" fill="none" stroke="#3a170d" stroke-width="1.5" opacity=".7"/>`;
  });
  // tiny crowd on the esplanade
  let crowd = '';
  for (let i = 0; i < 70; i++) {
    const x = rand(20, 580), y = rand(498, 516);
    crowd += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="3" fill="${['#2a0d0d', '#F26419', '#2A9D8F', '#F7B500'][i % 4]}"/>`;
  }

  stage.innerHTML = `
  <svg viewBox="0 0 600 640" role="img" aria-label="Illustration of the Inca sun rising over the Andes above the stone walls of Sacsayhuamán">
    <defs>
      <linearGradient id="iSky" x1="0" x2="0" y1="0" y2="1">
        <stop id="iSkyTop" offset="0" stop-color="#1a0b2e"/><stop id="iSkyBot" offset="1" stop-color="#3d1450"/>
      </linearGradient>
      <radialGradient id="iHalo"><stop offset="0" stop-color="${p.accent}" stop-opacity=".6"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="600" height="640" fill="url(#iSky)"/>
    <g id="iStars">${stars}</g>
    <g id="iSun" transform="translate(300 560)">
      <circle r="210" fill="url(#iHalo)"/>
      <g class="inti-rays">${rays}</g>
      <circle r="72" fill="${p.accent}" stroke="#7a3b00" stroke-width="5"/>
      <circle r="58" fill="none" stroke="#7a3b00" stroke-width="2" stroke-dasharray="4 6"/>
      <path d="M-34 -14h20M14 -14h20" stroke="#7a3b00" stroke-width="7" stroke-linecap="round"/>
      <path d="M-34 -24q10-8 20 0M14 -24q10-8 20 0" fill="none" stroke="#7a3b00" stroke-width="3"/>
      <path d="M0 -8v22h-8" fill="none" stroke="#7a3b00" stroke-width="5" stroke-linecap="round"/>
      <path d="M-20 30q20 14 40 0" fill="none" stroke="#7a3b00" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-38" cy="12" r="7" fill="${p.accent3}" opacity=".6"/><circle cx="38" cy="12" r="7" fill="${p.accent3}" opacity=".6"/>
    </g>
    <path d="M0 420 L70 330 L120 370 L200 250 L260 330 L320 270 L400 360 L470 280 L540 350 L600 300 V640 H0Z" fill="#5B1A3C" id="iFar"/>
    <path d="M200 250 L222 280 L210 282 L232 300 L190 290Z M470 280 L488 302 L478 304 L494 318 L458 308Z" fill="#fff" opacity=".85"/>
    <path d="M0 470 L90 390 L160 430 L240 360 L330 440 L420 380 L500 430 L600 370 V640 H0Z" fill="#3F1230" id="iMid"/>
    <path d="M0 500 Q150 470 300 495 T600 490 V640 H0Z" fill="#2A0D20"/>
    ${crowd}
    ${walls}
  </svg>
  <div class="stage__hint"><span lang="es">${escapeHtml(f.interaction.es)}</span><em>${escapeHtml(f.interaction.en)}</em></div>`;

  const controls = chapter.querySelector('.stage__controls');
  controls.innerHTML = `
    <div style="width:100%">
      <p class="stage__stat">Amanecer <b id="iPct">0%</b></p>
      <ol class="inti-steps" aria-label="The three stages of the ceremony, in order">
        <li><div><b>Qorikancha</b><span>Morning: the Inca greets the sun at the Temple of the Sun.</span></div></li>
        <li><div><b>Plaza de Armas</b><span>Midday: the procession meets the city; coca leaves are exchanged.</span></div></li>
        <li><div><b>Sacsayhuamán</b><span>Afternoon: offerings of chicha and the sacred fire at the fortress.</span></div></li>
      </ol>
    </div>`;

  const sun = $('#iSun', stage), starsG = $('#iStars', stage), top = $('#iSkyTop', stage), bot = $('#iSkyBot', stage);
  const rayG = $('.inti-rays', stage);
  const steps = $$('.inti-steps li', controls);
  const pct = $('#iPct', controls);

  let last = -1, ticking = false;
  function update() {
    ticking = false;
    const r = chapter.getBoundingClientRect();
    const prog = clamp((innerHeight * 0.75 - r.top) / (r.height * 0.75), 0, 1);
    if (Math.abs(prog - last) < 0.002) return;
    last = prog;
    const k = prog < 0.5 ? prog / 0.5 : (prog - 0.5) / 0.5;
    const [a, b] = prog < 0.5 ? [SKY[0], SKY[1]] : [SKY[1], SKY[2]];
    top.setAttribute('stop-color', rgb(mix(a.top, b.top, k)));
    bot.setAttribute('stop-color', rgb(mix(a.bottom, b.bottom, k)));
    starsG.setAttribute('opacity', Math.max(0, 1 - prog * 2.2).toFixed(2));
    const y = 560 - prog * 400;
    sun.setAttribute('transform', `translate(300 ${y.toFixed(1)})`);
    pct.textContent = `${Math.round(prog * 100)}%`;
    steps.forEach((li, i) => li.classList.toggle('is-on', prog >= [0.12, 0.42, 0.72][i]));
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();

  if (!reducedMotion()) {
    let angle = 0;
    const spin = () => { angle = (angle + 0.08) % 360; rayG.setAttribute('transform', `rotate(${angle.toFixed(2)})`); requestAnimationFrame(spin); };
    requestAnimationFrame(spin);
  }
}
