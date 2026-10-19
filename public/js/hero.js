// Hero (Wasiq): the title is literally cut out of a sheet of papel picado.
// Letters and decorations are holes in an SVG mask; behind them a canvas of
// falling confetti and marigold petals shows through.
import { $, reducedMotion, whileVisible, rand, pick } from './util.js';

const PAPER = { left: 20, right: 980, top: 26, bottom: 586, tooth: 40, depth: 30 };

function paperPath() {
  const { left, right, top, bottom, tooth, depth } = PAPER;
  let d = `M${left} ${top} H${right} V${bottom - depth}`;
  for (let x = right; x > left; x -= tooth) d += ` L${x - tooth / 2} ${bottom} L${x - tooth} ${bottom - depth}`;
  return d + ' Z';
}

function cutouts() {
  const { left, right, tooth, bottom, depth } = PAPER;
  const shapes = [];
  const diamond = (x, y, r) => `<path d="M${x} ${y - r}L${x + r * 0.7} ${y}L${x} ${y + r}L${x - r * 0.7} ${y}Z"/>`;
  const circle = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
  // diamond lace under the fold
  for (let x = left + 40; x < right - 20; x += 32) shapes.push(diamond(x, 74, 9));
  // tiny dots between the diamonds
  for (let x = left + 56; x < right - 30; x += 32) shapes.push(circle(x, 74, 2.6));
  // a row of holes riding just above each fringe tooth
  for (let x = right - tooth / 2; x > left; x -= tooth) shapes.push(circle(x, bottom - depth - 16, 6));
  for (let x = right - tooth; x > left + 10; x -= tooth) shapes.push(diamond(x, bottom - depth - 34, 5));
  // corner rosettes: a ring of petals around a centre hole
  const rosette = (cx, cy, R) => {
    let s = circle(cx, cy, R * 0.32);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      s += `<ellipse cx="${(cx + Math.cos(a) * R * 0.72).toFixed(1)}" cy="${(cy + Math.sin(a) * R * 0.72).toFixed(1)}" rx="${R * 0.22}" ry="${R * 0.12}" transform="rotate(${(a * 180) / Math.PI} ${(cx + Math.cos(a) * R * 0.72).toFixed(1)} ${(cy + Math.sin(a) * R * 0.72).toFixed(1)})"/>`;
    }
    return s;
  };
  shapes.push(rosette(118, 190, 52), rosette(882, 190, 52));
  // leaf sprigs beside the second line
  const sprig = (cx, cy, dir) => {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const y = cy - 36 + i * 24;
      s += `<ellipse cx="${cx + dir * (i % 2 ? 10 : -10)}" cy="${y}" rx="13" ry="5.5" transform="rotate(${dir * (i % 2 ? 35 : -35)} ${cx + dir * (i % 2 ? 10 : -10)} ${y})"/>`;
    }
    return s;
  };
  shapes.push(sprig(56, 420, 1), sprig(944, 420, -1));
  return shapes.join('');
}

function drawBanner() {
  $('#bannerPaper').setAttribute('d', paperPath());
  $('#bannerShade').setAttribute('d', paperPath());
  $('#maskShapes').innerHTML = cutouts();
  // faint fold creases: real papel picado is folded before it is cut
  $('#bannerFolds').innerHTML = [260, 500, 740].map((x) => `<line x1="${x}" y1="30" x2="${x}" y2="560"/>`).join('') + `<line x1="20" y1="330" x2="980" y2="330" stroke-opacity=".5"/>`;
  // the top strip folded over the string
  $('#bannerFold').innerHTML = `<rect x="${PAPER.left}" y="18" width="${PAPER.right - PAPER.left}" height="14" rx="2"/>`;
}

function confetti(canvas) {
  const ctx = canvas.getContext('2d');
  const colors = ['#F2177E', '#FFA51F', '#17B6A7', '#2DB24A', '#FFD23F', '#E8361E', '#B57BFF', '#FFF4E2'];
  let W, H, dpr, bits = [];

  function size() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(220, (W * H) / 7000));
    bits = Array.from({ length: n }, () => make(true));
  }
  function make(anywhere) {
    return {
      x: rand(0, W), y: anywhere ? rand(0, H) : rand(-40, -10),
      w: rand(6, 13), h: rand(8, 18), r: rand(0, 6.28), vr: rand(-0.04, 0.04),
      vy: rand(0.35, 1.1), sway: rand(0.4, 1.4), phase: rand(0, 6.28), flip: rand(0, 6.28),
      color: pick(colors), kind: pick(['rect', 'rect', 'petal', 'petal', 'dot', 'tri']),
    };
  }
  function draw(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.r);
    ctx.scale(1, Math.cos(b.flip));
    ctx.fillStyle = b.color;
    ctx.beginPath();
    if (b.kind === 'rect') ctx.rect(-b.w / 2, -b.h / 4, b.w, b.h / 2);
    else if (b.kind === 'petal') ctx.ellipse(0, 0, b.w * 0.45, b.h * 0.5, 0, 0, Math.PI * 2);
    else if (b.kind === 'dot') ctx.arc(0, 0, b.w * 0.35, 0, Math.PI * 2);
    else { ctx.moveTo(0, -b.h / 2); ctx.lineTo(b.w / 2, b.h / 2); ctx.lineTo(-b.w / 2, b.h / 2); ctx.closePath(); }
    ctx.fill();
    ctx.restore();
  }
  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    for (const b of bits) {
      b.y += b.vy;
      b.x += Math.sin(t / 900 + b.phase) * b.sway * 0.5;
      b.r += b.vr;
      b.flip += 0.03;
      if (b.y > H + 20) Object.assign(b, make(false));
      draw(b);
    }
  }

  size();
  let resizeT;
  addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(size, 150); });

  if (reducedMotion()) { frame(0); return; }
  let raf, on = true;
  const loop = (t) => { frame(t); if (on) raf = requestAnimationFrame(loop); };
  whileVisible(canvas, (v) => { on = v; cancelAnimationFrame(raf); if (v) raf = requestAnimationFrame(loop); });
}

function tilt(hero, wrap) {
  if (reducedMotion()) return;
  let idle;
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const k = (e.clientX - r.left) / r.width - 0.5;
    wrap.style.setProperty('--tilt', `${(k * 3.2).toFixed(2)}deg`);
    clearTimeout(idle);
    idle = setTimeout(() => wrap.style.setProperty('--tilt', '0deg'), 1400);
  });
}

export function mountHero() {
  drawBanner();
  const wrap = $('#bannerWrap');
  (document.fonts?.ready || Promise.resolve()).then(() => wrap.classList.add('is-ready'));
  confetti($('#confeti'));
  tilt($('.hero'), wrap);
}
