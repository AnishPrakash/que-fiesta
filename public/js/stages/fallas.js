// Las Fallas stage (Sravan).
// A satirical falla — "El rey del móvil", a king who can't look up from his
// phone. Press the button for la cremà: a particle fire burns the monument down
// to ashes. The second button plays a synthesised mascletà (sound).
import { $, rand, reducedMotion, isSoundOn, toast, escapeHtml } from '../util.js';

export function mount(stage, f, chapter) {
  const p = f.palette;
  let stars = '';
  for (let i = 0; i < 46; i++) stars += `<circle cx="${rand(0, 600).toFixed(0)}" cy="${rand(0, 330).toFixed(0)}" r="${rand(0.8, 2.2).toFixed(1)}" fill="#fff" opacity="${rand(0.3, 0.9).toFixed(2)}"/>`;

  stage.classList.add('stage-fallas');
  stage.innerHTML = `
  <svg viewBox="0 0 600 600" role="img" aria-label="Illustration of a falla monument called El rey del móvil, a giant crowned figure staring at his phone">
    <defs>
      <linearGradient id="fNight" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#070C22"/><stop offset="1" stop-color="${p.soft}"/></linearGradient>
      <radialGradient id="fGlow" cx=".5" cy="1" r=".7"><stop offset="0" stop-color="${p.accent}" stop-opacity=".55"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="600" height="600" fill="url(#fNight)"/>
    ${stars}
    <rect id="fireGlow" width="600" height="600" fill="url(#fGlow)" opacity="0"/>
    <!-- Valencia rooftops -->
    <path d="M0 470V420h40v-30h50v40h30v-60h20l10-20 10 20h20v70h40v-40h60v-20h10v-14a20 20 0 0 1 40 0v14h10v20h40v50h40v-70h30l15-24 15 24v70h50v-30h50v60h20v30z" fill="#0A1230"/>
    <g fill="${p.accent2}" opacity=".6"><rect x="58" y="430" width="6" height="8"/><rect x="138" y="400" width="6" height="8"/><rect x="250" y="420" width="6" height="8"/><rect x="455" y="410" width="6" height="8"/><rect x="520" y="440" width="6" height="8"/></g>
    <rect y="540" width="600" height="60" fill="#080D20"/>

    <g id="fallaArt">
      <!-- pedestal -->
      <path d="M160 545H440L408 468H192Z" fill="${p.accent3}" stroke="${p.ink === '#FFF1DE' ? '#1a0f08' : p.ink}" stroke-width="5"/>
      <path d="M175 520H425" stroke="${p.accent}" stroke-width="10"/>
      <path d="M185 494H415" stroke="${p.accent2}" stroke-width="8"/>
      <rect x="220" y="500" width="160" height="30" rx="4" fill="#fff" stroke="#1a0f08" stroke-width="3"/>
      <text x="300" y="522" text-anchor="middle" font-family="Shrikhand, serif" font-size="19" fill="#1a0f08">El rey del móvil</text>
      <!-- little ninots: a tourist taking a selfie, and a pigeon -->
      <g stroke="#1a0f08" stroke-width="3">
        <rect x="196" y="420" width="30" height="48" rx="10" fill="#4FC3F7"/>
        <circle cx="211" cy="406" r="16" fill="#FFD7B0"/>
        <path d="M200 398q11-14 22 0" fill="#FF7043"/>
        <path d="M226 428l26-36" stroke-width="4"/><rect x="246" y="380" width="12" height="18" rx="2" fill="#263238"/>
        <ellipse cx="392" cy="452" rx="20" ry="14" fill="#B0BEC5"/><circle cx="406" cy="440" r="9" fill="#B0BEC5"/>
        <path d="M413 440l8 3-8 3z" fill="#FFB300"/>
      </g>
      <!-- the king -->
      <g stroke="#1a0f08" stroke-width="5" stroke-linejoin="round">
        <path d="M216 468C206 400 226 330 300 326C374 330 394 400 384 468Z" fill="${p.accent}"/>
        <path d="M300 330V468" stroke-width="3"/>
        <circle cx="300" cy="370" r="5" fill="${p.accent2}"/><circle cx="300" cy="400" r="5" fill="${p.accent2}"/><circle cx="300" cy="430" r="5" fill="${p.accent2}"/>
        <path d="M232 360C200 380 200 420 236 432" fill="none" stroke-width="22"/>
        <path d="M232 360C200 380 200 420 236 432" fill="none" stroke="${p.accent}" stroke-width="13"/>
        <path d="M368 360C392 372 392 392 360 400" fill="none" stroke-width="22"/>
        <path d="M368 360C392 372 392 392 360 400" fill="none" stroke="${p.accent}" stroke-width="13"/>
        <rect x="326" y="346" width="44" height="72" rx="7" fill="#1a0f08" transform="rotate(-14 348 382)"/>
        <rect x="332" y="354" width="32" height="54" rx="3" fill="#4DD0E1" stroke="none" transform="rotate(-14 348 382)"/>
        <circle cx="340" cy="398" r="11" fill="#FFD7B0"/>
        <circle cx="300" cy="232" r="88" fill="#FFD7B0"/>
        <path d="M228 180C250 150 350 150 372 180" fill="none" stroke-width="4"/>
        <path d="M214 160 236 102 268 142 300 88 332 142 364 102 386 160Z" fill="${p.accent2}"/>
        <circle cx="300" cy="118" r="8" fill="${p.accent}"/><circle cx="246" cy="132" r="6" fill="#4DD0E1"/><circle cx="354" cy="132" r="6" fill="#4DD0E1"/>
        <path d="M250 222q16-10 32 2M318 224q16-12 32-2" fill="none" stroke-width="5"/>
        <path d="M252 236q14 8 28 0M320 236q14 8 28 0" fill="none" stroke-width="4"/>
        <ellipse cx="300" cy="262" rx="24" ry="30" fill="#FF8A65"/>
        <path d="M252 292q48 26 96 0q-10 30-48 30t-48-30Z" fill="#6D4C41"/>
        <path d="M282 306q18 10 36 0" fill="#E57373" stroke-width="3"/>
        <circle cx="236" cy="268" r="10" fill="#FF8A80" stroke="none" opacity=".7"/><circle cx="364" cy="268" r="10" fill="#FF8A80" stroke="none" opacity=".7"/>
      </g>
    </g>
    <path id="ashPile" d="M180 545C200 500 240 488 300 486C360 488 400 500 420 545Z" fill="#2E2A33"/>
  </svg>
  <canvas class="fire-canvas" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></canvas>
  <div class="stage__hint"><span lang="es">${escapeHtml(f.interaction.es)}</span><em>${escapeHtml(f.interaction.en)}</em></div>`;

  const controls = chapter.querySelector('.stage__controls');
  controls.innerHTML = `
    <button class="btn btn--ink" type="button" id="cremaBtn">¡Que empiece la cremà!</button>
    <button class="btn" type="button" id="mascletaBtn" style="color:inherit">Escuchar la mascletà <span aria-hidden="true">🔊</span><span class="visually-hidden">(plays sound)</span></button>
    <p class="stage__stat" id="cremaStat" aria-live="polite"></p>`;

  const fire = makeFire($('.fire-canvas', stage));
  const btn = $('#cremaBtn', controls);
  const stat = $('#cremaStat', controls);
  const glow = $('#fireGlow', stage);
  let state = 'standing', burns = 0;

  btn.addEventListener('click', () => {
    if (state === 'standing') {
      state = 'burning';
      btn.disabled = true;
      stage.classList.add('falla-burning');
      glow.style.transition = 'opacity 1s';
      glow.style.opacity = '1';
      fire.start();
      if (!reducedMotion()) stage.classList.add('is-shaking');
      setTimeout(() => stage.classList.remove('is-shaking'), 900);
      setTimeout(() => {
        stage.classList.add('falla-ash');
        fire.calm();
        glow.style.opacity = '.35';
        burns += 1;
        stat.innerHTML = `Fallas quemadas: <b>${burns}</b>. Months of work, gone in seconds.`;
        state = 'ash';
        btn.disabled = false;
        btn.textContent = 'Plantar otra falla';
        toast('¡La falla ha ardido! Hasta el año que viene.');
      }, 4300);
    } else if (state === 'ash') {
      fire.stop();
      glow.style.opacity = '0';
      stage.classList.remove('falla-burning', 'falla-ash');
      const art = $('#fallaArt', stage);
      art.animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      btn.textContent = '¡Que empiece la cremà!';
      state = 'standing';
    }
  });

  $('#mascletaBtn', controls).addEventListener('click', () => {
    if (!isSoundOn()) return toast('Turn on “Voz” in the top bar to hear the mascletà.');
    mascleta(stage);
  });
}

// ── particle fire ──
function makeFire(canvas) {
  const ctx = canvas.getContext('2d');
  let parts = [], mode = 'off', raf, W, H;
  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  function emit() {
    const n = mode === 'burn' ? 9 : mode === 'calm' ? 2 : 0;
    for (let i = 0; i < n; i++) {
      parts.push({ x: W * rand(0.3, 0.7), y: H * rand(0.62, 0.9), vx: rand(-0.6, 0.6), vy: rand(-3.6, -1.6), life: 1, size: rand(10, 34) * (W / 600), kind: 'flame' });
    }
    if (mode !== 'off' && Math.random() < (mode === 'burn' ? 0.5 : 0.25)) parts.push({ x: W * rand(0.35, 0.65), y: H * rand(0.5, 0.8), vx: rand(-0.3, 0.3), vy: rand(-1, -0.5), life: 1, size: rand(20, 50) * (W / 600), kind: 'smoke' });
    if (mode === 'burn' && Math.random() < 0.6) parts.push({ x: W * rand(0.3, 0.7), y: H * rand(0.4, 0.85), vx: rand(-2, 2), vy: rand(-5, -2), life: 1, size: 2.2, kind: 'spark' });
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    emit();
    for (const q of parts) {
      q.x += q.vx; q.y += q.vy;
      q.life -= q.kind === 'smoke' ? 0.006 : q.kind === 'spark' ? 0.02 : 0.025;
      if (q.kind === 'flame') q.size *= 0.985;
      if (q.kind === 'smoke') q.size *= 1.01;
    }
    parts = parts.filter((q) => q.life > 0 && q.y > -60);
    ctx.globalCompositeOperation = 'source-over';
    for (const q of parts) if (q.kind === 'smoke') { ctx.fillStyle = `rgba(60,60,70,${q.life * 0.25})`; ctx.beginPath(); ctx.arc(q.x, q.y, q.size, 0, 7); ctx.fill(); }
    ctx.globalCompositeOperation = 'lighter';
    for (const q of parts) {
      if (q.kind === 'smoke') continue;
      const l = q.life;
      const color = l > 0.75 ? `255,240,180` : l > 0.45 ? `255,160,40` : `230,60,20`;
      const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.size);
      g.addColorStop(0, `rgba(${color},${Math.min(1, l * 0.9)})`);
      g.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(q.x, q.y, q.size, 0, 7); ctx.fill();
    }
    if (mode !== 'off' || parts.length) raf = requestAnimationFrame(frame);
  }
  return {
    start() { size(); mode = 'burn'; cancelAnimationFrame(raf); if (reducedMotion()) return; raf = requestAnimationFrame(frame); },
    calm() { mode = 'calm'; },
    stop() { mode = 'off'; },
  };
}

// ── a synthesised mascletà: booms that accelerate into a roaring finale ──
let audioCtx;
function mascleta(stage) {
  audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
  const ctx = audioCtx;
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);
  const noise = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);

  function boom(t, strength) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = rand(700, 2400);
    const g = ctx.createGain();
    g.gain.setValueAtTime(strength, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    src.connect(lp).connect(g).connect(master);
    src.start(t);
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.3);
    og.gain.setValueAtTime(strength * 0.9, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(og).connect(master);
    osc.start(t);
    osc.stop(t + 0.4);
  }
  let t = ctx.currentTime + 0.05, gap = 0.42;
  while (gap > 0.05) { boom(t, 0.5); t += gap; gap *= 0.9; }
  for (let i = 0; i < 26; i++) { boom(t, 0.9); t += 0.045; } // the terremoto (earthquake) finale
  if (!reducedMotion()) {
    stage.classList.add('is-shaking');
    setTimeout(() => stage.classList.remove('is-shaking'), (t - ctx.currentTime) * 1000);
  }
}
