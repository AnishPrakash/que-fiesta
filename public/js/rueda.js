// La Rueda del Año (Sravan).
// A circular calendar: 12 months around the rim, each festival placed on its
// real date. Drag, click or use ←/→ and the wheel turns that festival to the
// pointer, while the centre counts the days until it arrives.
import { $, $$, monthsEsLong, daysPhrase, longDateEs, escapeHtml, reducedMotion } from './util.js';
import { icon } from './icons.js';

const R_OUT = 300, R_MONTH_IN = 232, R_MARK = 186, R_CENTER = 140;
const pt = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [r * Math.sin(a), -r * Math.cos(a)];
};
const f1 = (n) => n.toFixed(1);

function arc(r1, r2, a1, a2) {
  const [x1, y1] = pt(r2, a1), [x2, y2] = pt(r2, a2), [x3, y3] = pt(r1, a2), [x4, y4] = pt(r1, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M${f1(x1)} ${f1(y1)} A${r2} ${r2} 0 ${large} 1 ${f1(x2)} ${f1(y2)} L${f1(x3)} ${f1(y3)} A${r1} ${r1} 0 ${large} 0 ${f1(x4)} ${f1(y4)}Z`;
}

const dayAngle = (doy, len) => ((doy - 1) / len) * 360;

export function mountRueda({ festivals, upcoming, today }) {
  const dial = $('#dial');
  const panel = $('#ruedaPanel');
  const year = Number(today.slice(0, 4));
  const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const len = isLeap(year) ? 366 : 365;
  const monthStart = [];
  let acc = 1;
  for (let m = 0; m < 12; m++) {
    monthStart.push(acc);
    acc += new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
  }
  const doyOf = (iso) => {
    const d = new Date(iso + 'T00:00:00Z');
    return Math.round((d - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000) + 1;
  };

  // festivals in calendar order with their angle
  const byId = Object.fromEntries(upcoming.map((u) => [u.id, u]));
  const list = festivals
    .map((f) => ({ ...f, up: byId[f.id], angle: dayAngle(doyOf(byId[f.id].start), len), endAngle: dayAngle(doyOf(byId[f.id].end), len) }))
    .sort((a, b) => a.angle - b.angle);

  // ── draw ──
  let months = '';
  for (let m = 0; m < 12; m++) {
    const a1 = dayAngle(monthStart[m], len);
    const a2 = m === 11 ? 360 : dayAngle(monthStart[m + 1], len);
    months += `<path d="${arc(R_MONTH_IN, R_OUT, a1, a2)}" fill="${m % 2 ? '#2E2168' : '#382A7A'}"/>`;
    const mid = (a1 + a2) / 2;
    const [tx, ty] = pt(266, mid);
    const flip = mid > 90 && mid < 270 ? 180 : 0;
    months += `<text class="dial-month" x="${f1(tx)}" y="${f1(ty)}" text-anchor="middle" dominant-baseline="central" transform="rotate(${f1(mid + flip)} ${f1(tx)} ${f1(ty)})">${monthsEsLong[m]}</text>`;
  }
  let ticks = '';
  for (let d = 1; d <= len; d++) {
    const isMonth = monthStart.includes(d);
    const a = dayAngle(d, len);
    const [x1, y1] = pt(R_MONTH_IN - 2, a), [x2, y2] = pt(R_MONTH_IN - (isMonth ? 18 : d % 7 === 1 ? 9 : 5), a);
    ticks += `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#FFF4E2" stroke-opacity="${isMonth ? 0.9 : 0.3}" stroke-width="${isMonth ? 2.5 : 1}"/>`;
  }
  let bands = '', markers = '';
  for (const f of list) {
    const span = Math.max(1.2, f.endAngle - f.angle + 360 / len);
    bands += `<path d="${arc(R_MONTH_IN - 2, R_MONTH_IN + 10, f.angle - 0.6, f.angle + span)}" fill="${f.palette.accent}"/>`;
    const [mx, my] = pt(R_MARK, f.angle);
    const [lx, ly] = pt(R_MONTH_IN - 20, f.angle);
    markers += `<line x1="${f1(lx)}" y1="${f1(ly)}" x2="${f1(mx)}" y2="${f1(my)}" stroke="${f.palette.accent}" stroke-width="3"/>
      <g class="dial-marker" data-id="${f.id}" transform="translate(${f1(mx)} ${f1(my)})" role="button" tabindex="-1" aria-label="${escapeHtml(f.name)}">
        <circle class="halo" r="32" fill="${f.palette.accent}"/>
        <g class="dial-marker__face"><circle r="30" fill="${f.palette.accent}" stroke="#1A1140" stroke-width="4"/>
          <svg x="-20" y="-20" width="40" height="40" viewBox="0 0 100 100">${icon(f.id, { ink: '#1A1140', fill: '#FFF4E2', alt: f.id === 'tomatina' ? '#E3271B' : '#FFF4E2' }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
        </g>
      </g>`;
  }
  const todayA = dayAngle(doyOf(today), len);
  const [hx, hy] = pt(R_OUT + 2, todayA), [hx2, hy2] = pt(R_MONTH_IN - 24, todayA), [htx, hty] = pt(R_MONTH_IN - 36, todayA);
  const todayMark = `<line x1="${f1(hx)}" y1="${f1(hy)}" x2="${f1(hx2)}" y2="${f1(hy2)}" stroke="#FFF4E2" stroke-width="3" stroke-dasharray="4 4"/>
    <g class="dial-today" transform="translate(${f1(htx)} ${f1(hty)})"><text text-anchor="middle" dominant-baseline="central" font-weight="800" font-size="15" fill="#FFF4E2">hoy</text></g>`;

  dial.innerHTML = `
    <circle r="${R_OUT + 14}" fill="none" stroke="#FFF4E2" stroke-opacity=".18" stroke-width="2" stroke-dasharray="2 8"/>
    <g id="dialRing">
      <circle r="${R_OUT}" fill="#22175A"/>
      ${months}${ticks}${bands}${todayMark}${markers}
    </g>
    <circle r="${R_CENTER}" fill="#1A1140" stroke="#FFF4E2" stroke-opacity=".25" stroke-width="2"/>
    <circle r="${R_CENTER - 14}" fill="none" stroke="#FFF4E2" stroke-opacity=".2" stroke-dasharray="3 7"/>
    <text class="dial-center-day" id="dialDays" text-anchor="middle" y="14">–</text>
    <text class="dial-center-label" id="dialLabel" text-anchor="middle" y="54">días</text>
    <text class="dial-center-label" id="dialYear" text-anchor="middle" y="-64" font-size="15">${year}</text>`;

  const ring = $('#dialRing');
  ring.style.transformOrigin = '0px 0px';
  const faces = $$('.dial-marker', dial);
  let rotation = 0;
  let current = 0;

  function setRotation(deg, animate = true) {
    rotation = deg;
    ring.classList.toggle('is-dragging', !animate);
    ring.style.transform = `rotate(${deg}deg)`;
    // keep icons and "hoy" upright
    faces.forEach((g) => { const face = g.querySelector('.dial-marker__face'); face.style.transformBox = 'fill-box'; face.style.transformOrigin = 'center'; face.style.transform = `rotate(${-deg}deg)`; face.style.transition = animate ? 'transform 1.1s cubic-bezier(.34,1.56,.64,1)' : 'none'; });
    const t = $('.dial-today text', dial);
    t.style.transformBox = 'fill-box';
    t.style.transformOrigin = 'center';
    t.style.transform = `rotate(${-deg}deg)`;
    t.style.transition = animate ? 'transform 1.1s cubic-bezier(.34,1.56,.64,1)' : 'none';
  }

  function select(i, animate = true) {
    current = (i + list.length) % list.length;
    const f = list[current];
    let target = -f.angle;
    while (target - rotation > 180) target -= 360;
    while (target - rotation < -180) target += 360;
    setRotation(target, animate && !reducedMotion());

    faces.forEach((g) => g.classList.toggle('is-active', g.dataset.id === f.id));
    $('#dialDays').textContent = f.up.happeningNow ? '¡hoy!' : f.up.daysUntil;
    $('#dialLabel').textContent = f.up.happeningNow ? 'está pasando' : f.up.daysUntil === 1 ? 'día' : 'días';

    panel.style.setProperty('--rp', f.palette.accent);
    panel.innerHTML = `
      <p class="rp-when">${escapeHtml(f.dateLabel)} <span lang="en">(${escapeHtml(f.dateLabelEn)})</span></p>
      <h3>${escapeHtml(f.name)}</h3>
      <p class="rp-place">${escapeHtml(f.place)}</p>
      <p class="rp-days">${f.up.happeningNow ? '¡Es hoy!' : `${f.up.daysUntil} días`}<small>${f.up.happeningNow ? 'Happening right now' : `${daysPhrase(f.up.daysUntil)} — next on ${longDateEs(f.up.start)}`}</small></p>
      <p class="rp-by">Capítulo de <strong>${escapeHtml(f.author)}</strong></p>
      <a class="btn btn--ink" href="#f-${f.id}">Ir al capítulo</a>
      <ul class="rp-list" aria-label="Choose a festival">
        ${list.map((x, j) => `<li><button type="button" data-i="${j}" style="--c:${x.palette.accent}" aria-pressed="${j === current}">${escapeHtml(x.name)}</button></li>`).join('')}
      </ul>`;
  }

  panel.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]');
    if (b) select(Number(b.dataset.i));
  });
  dial.addEventListener('click', (e) => {
    const m = e.target.closest('.dial-marker');
    if (m && !dragMoved) select(list.findIndex((f) => f.id === m.dataset.id));
  });
  dial.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select(current + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select(current - 1); }
  });

  // ── drag to spin ──
  let dragging = false, dragMoved = false, startAngle = 0, startRot = 0;
  const angleOf = (e) => {
    const r = dial.getBoundingClientRect();
    return (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
  };
  dial.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragMoved = false;
    startAngle = angleOf(e);
    startRot = rotation;
    dial.setPointerCapture(e.pointerId);
  });
  dial.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    let delta = angleOf(e) - startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    if (Math.abs(delta) > 2) dragMoved = true;
    if (dragMoved) setRotation(startRot + delta, false);
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    if (!dragMoved) return;
    // snap to the festival closest to the pointer
    let best = 0, bestDist = 1e9;
    list.forEach((f, i) => {
      const d = Math.abs((((f.angle + rotation) % 360) + 540) % 360 - 180);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    select(best);
    setTimeout(() => (dragMoved = false), 0);
  };
  dial.addEventListener('pointerup', end);
  dial.addEventListener('pointercancel', end);

  // start on the next festival to come
  select(list.findIndex((f) => f.id === upcoming[0].id), false);
  return { select: (id) => select(list.findIndex((f) => f.id === id)) };
}
