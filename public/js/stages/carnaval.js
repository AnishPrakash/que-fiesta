// Carnaval de Barranquilla stage (Wasiq).
// A hand-drawn Marimonda whose eyes follow your pointer. Click the stage to
// throw confetti; the tabs underneath introduce the four classic characters.
import { $, $$, rand, pick, reducedMotion, whileVisible, escapeHtml } from '../util.js';

export function mount(stage, f, chapter) {
  const p = f.palette;
  let rays = '';
  const cols = [p.accent, p.accent2, p.accent3, p.bg];
  for (let i = 0; i < 16; i++) {
    const a1 = (-170 + i * (160 / 16)) * Math.PI / 180, a2 = (-170 + (i + 1) * (160 / 16)) * Math.PI / 180;
    rays += `<path d="M300 640 L${300 + Math.cos(a1) * 900} ${640 + Math.sin(a1) * 900} L${300 + Math.cos(a2) * 900} ${640 + Math.sin(a2) * 900}Z" fill="${cols[i % 4]}" opacity="${i % 4 === 3 ? 0 : 0.22}"/>`;
  }
  let dots = '';
  for (let i = 0; i < 40; i++) {
    const x = rand(10, 590).toFixed(0), y = rand(10, 540).toFixed(0);
    dots += `<rect x="${x}" y="${y}" width="8" height="12" rx="2" fill="${pick(cols.slice(0, 3))}" transform="rotate(${rand(0, 180).toFixed(0)} ${x} ${y})" opacity=".75"/>`;
  }

  stage.classList.add('stage-carnaval');
  stage.innerHTML = `
  <svg viewBox="0 0 600 560" role="img" aria-label="Illustration of a Marimonda, the long-nosed mask of the Barranquilla carnival">
    <defs>
      <clipPath id="mHood"><path d="M300 70C420 70 470 170 470 270C470 380 400 450 300 450C200 450 130 380 130 270C130 170 180 70 300 70Z"/></clipPath>
    </defs>
    <rect width="600" height="560" fill="${p.soft}"/>
    ${rays}${dots}
    <!-- ears -->
    <g stroke="${p.ink}" stroke-width="8">
      <ellipse cx="148" cy="250" rx="86" ry="136" transform="rotate(-22 148 250)" fill="${p.accent}"/>
      <ellipse cx="452" cy="250" rx="86" ry="136" transform="rotate(22 452 250)" fill="${p.accent}"/>
    </g>
    <ellipse cx="150" cy="255" rx="48" ry="92" transform="rotate(-22 150 255)" fill="${p.accent3}"/>
    <ellipse cx="450" cy="255" rx="48" ry="92" transform="rotate(22 450 255)" fill="${p.accent3}"/>
    <!-- hood with patchwork -->
    <path d="M300 70C420 70 470 170 470 270C470 380 400 450 300 450C200 450 130 380 130 270C130 170 180 70 300 70Z" fill="${p.accent2}"/>
    <g clip-path="url(#mHood)">
      <path d="M130 60 300 200 470 60Z" fill="${p.accent}"/>
      <path d="M130 200 220 330 130 460Z" fill="${p.bg}"/>
      <path d="M470 200 380 330 470 460Z" fill="${p.bg}"/>
      <path d="M200 460 300 330 400 460Z" fill="${p.accent3}"/>
      <path d="M130 60 300 200 470 60" fill="none" stroke="${p.ink}" stroke-width="4" stroke-dasharray="10 8"/>
      <circle cx="170" cy="150" r="8" fill="${p.bg}"/><circle cx="430" cy="150" r="8" fill="${p.bg}"/>
      <circle cx="300" cy="120" r="10" fill="${p.bg}"/>
    </g>
    <path d="M300 70C420 70 470 170 470 270C470 380 400 450 300 450C200 450 130 380 130 270C130 170 180 70 300 70Z" fill="none" stroke="${p.ink}" stroke-width="8"/>
    <!-- pompom -->
    <circle cx="300" cy="62" r="24" fill="${p.accent3}" stroke="${p.ink}" stroke-width="6"/>
    <!-- eyes -->
    <g stroke="${p.ink}" stroke-width="8" fill="#fff">
      <circle cx="245" cy="240" r="40"/><circle cx="355" cy="240" r="40"/>
    </g>
    <g class="marimonda-pupil" id="pupilL"><circle cx="245" cy="240" r="16" fill="${p.ink}"/><circle cx="250" cy="234" r="5" fill="#fff"/></g>
    <g class="marimonda-pupil" id="pupilR"><circle cx="355" cy="240" r="16" fill="${p.ink}"/><circle cx="360" cy="234" r="5" fill="#fff"/></g>
    <!-- mouth -->
    <circle cx="232" cy="370" r="15" fill="${p.ink}"/><circle cx="232" cy="370" r="7" fill="${p.accent}"/>
    <!-- the famous trunk-nose -->
    <g fill="none" stroke-linecap="round">
      <path d="M300 280C300 360 292 430 340 492C362 520 402 516 398 486" stroke="${p.ink}" stroke-width="54"/>
      <path d="M300 280C300 360 292 430 340 492C362 520 402 516 398 486" stroke="${p.bg}" stroke-width="38"/>
      <path d="M300 280C300 360 292 430 340 492C362 520 402 516 398 486" stroke="${p.accent}" stroke-width="38" stroke-dasharray="18 18"/>
    </g>
    <!-- ruff collar -->
    <path d="M150 470 L180 520 L210 470 L240 520 L270 470 L300 520 L330 470 L360 520 L390 470 L420 520 L450 470" fill="none" stroke="${p.ink}" stroke-width="6" stroke-linejoin="round"/>
  </svg>
  <div class="stage__hint"><span lang="es">${escapeHtml(f.interaction.es)}</span><em>${escapeHtml(f.interaction.en)}</em></div>`;

  // controls: character tabs
  const controls = chapter.querySelector('.stage__controls');
  controls.innerHTML = `
    <div style="width:100%">
      <div class="chars" role="tablist" aria-label="Carnival characters">
        ${f.characters.map((c, i) => `<button type="button" role="tab" id="char-${i}" aria-selected="${i === 0}" aria-controls="charDesc" data-i="${i}">${escapeHtml(c.name)}</button>`).join('')}
      </div>
      <p class="chars__desc" id="charDesc" role="tabpanel" aria-labelledby="char-0">${escapeHtml(f.characters[0].en)}</p>
    </div>`;
  const desc = $('#charDesc', controls);
  controls.addEventListener('click', (e) => {
    const b = e.target.closest('[role="tab"]');
    if (!b) return;
    $$('[role="tab"]', controls).forEach((t) => t.setAttribute('aria-selected', t === b));
    desc.textContent = f.characters[b.dataset.i].en;
    desc.setAttribute('aria-labelledby', b.id);
  });

  // eyes follow the pointer
  const svg = $('svg', stage);
  const pupils = [[$('#pupilL', stage), 245, 240], [$('#pupilR', stage), 355, 240]];
  let visible = false;
  whileVisible(stage, (v) => (visible = v));
  addEventListener('pointermove', (e) => {
    if (!visible) return;
    const r = svg.getBoundingClientRect();
    const sx = 600 / r.width;
    for (const [el, cx, cy] of pupils) {
      const dx = (e.clientX - r.left) * sx - cx;
      const dy = (e.clientY - r.top) * sx - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(17, d / 12);
      el.setAttribute('transform', `translate(${((dx / d) * k).toFixed(1)} ${((dy / d) * k).toFixed(1)})`);
    }
  }, { passive: true });

  // confetti on click
  const colors = [p.accent, p.accent2, p.accent3, '#fff', p.ink];
  stage.addEventListener('click', (e) => {
    const r = stage.getBoundingClientRect();
    burst(stage, e.clientX - r.left, e.clientY - r.top, colors);
  });
}

function burst(stage, x, y, colors) {
  const n = reducedMotion() ? 0 : 34;
  for (let i = 0; i < n; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti-bit';
    bit.style.left = `${x}px`;
    bit.style.top = `${y}px`;
    bit.style.background = pick(colors);
    if (Math.random() < 0.35) bit.style.borderRadius = '50%';
    stage.appendChild(bit);
    const a = rand(0, Math.PI * 2), v = rand(60, 210);
    const dx = Math.cos(a) * v, dy = Math.sin(a) * v - 80;
    bit.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rand(-360, 360)}deg) scale(1)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx * 1.3}px, ${dy + 260}px) rotate(${rand(-720, 720)}deg) scale(.6)`, opacity: 0 },
      ],
      { duration: rand(900, 1500), easing: 'cubic-bezier(.2,.7,.4,1)' }
    ).onfinish = () => bit.remove();
  }
}
