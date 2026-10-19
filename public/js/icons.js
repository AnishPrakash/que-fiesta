// Small original SVG emblems for each festival (wheel markers, Lotería cards, stamps).
// viewBox 0 0 100 100. `ink` = outline/detail colour, `fill` = main colour.

export function icon(id, { ink = '#1A1140', fill = '#FFF4E2', alt = '#F2177E' } = {}) {
  const wrap = (inner) => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${inner}</svg>`;
  switch (id) {
    case 'carnaval': // Marimonda mask
      return wrap(`
        <ellipse cx="20" cy="48" rx="16" ry="25" transform="rotate(-18 20 48)" fill="${alt}" stroke="${ink}" stroke-width="4"/>
        <ellipse cx="80" cy="48" rx="16" ry="25" transform="rotate(18 80 48)" fill="${alt}" stroke="${ink}" stroke-width="4"/>
        <path d="M50 14c20 0 28 14 28 32s-10 30-28 30-28-12-28-30 8-32 28-32z" fill="${fill}" stroke="${ink}" stroke-width="4"/>
        <path d="M22 40 50 14 78 40Z" fill="${alt}" opacity=".55"/>
        <circle cx="39" cy="42" r="8" fill="#fff" stroke="${ink}" stroke-width="3"/><circle cx="61" cy="42" r="8" fill="#fff" stroke="${ink}" stroke-width="3"/>
        <circle cx="40" cy="43" r="3.5" fill="${ink}"/><circle cx="62" cy="43" r="3.5" fill="${ink}"/>
        <path d="M50 50c0 14 2 24 10 34" fill="none" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>
        <path d="M50 50c0 14 2 24 10 34" fill="none" stroke="${fill}" stroke-width="6" stroke-linecap="round" stroke-dasharray="5 5"/>`);
    case 'fallas': // flame
      return wrap(`
        <path d="M50 6c6 18 26 26 26 50a26 26 0 0 1-52 0c0-14 8-20 12-30 3 10 8 14 12 14-4-12-2-24 2-34z" fill="${alt}" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M50 46c4 10 14 14 14 26a14 14 0 0 1-28 0c0-8 6-12 8-18 2 5 4 6 6 6-2-5-1-10 0-14z" fill="${fill}"/>`);
    case 'inti-raymi': { // Inca sun
      let rays = '';
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 50 + Math.cos(a) * 28, y1 = 50 + Math.sin(a) * 28;
        const x2 = 50 + Math.cos(a) * (i % 2 ? 40 : 46), y2 = 50 + Math.sin(a) * (i % 2 ? 40 : 46);
        rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${alt}" stroke-width="${i % 2 ? 5 : 7}" stroke-linecap="round"/>`;
      }
      return wrap(`${rays}
        <circle cx="50" cy="50" r="26" fill="${alt}" stroke="${ink}" stroke-width="4"/>
        <path d="M40 44h6M54 44h6" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
        <path d="M50 46v9h-3" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
        <path d="M42 61q8 6 16 0" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`);
    }
    case 'tomatina': // tomato
      return wrap(`
        <path d="M50 26c22 0 38 14 38 34S72 92 50 92 12 80 12 60s16-34 38-34z" fill="${alt}" stroke="${ink}" stroke-width="4"/>
        <path d="M30 46c4-8 10-12 16-13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
        <path d="M50 30 40 18l10 5 4-13 3 13 12-4-9 10 12 4-14 1-4 8-4-8-14-1z" fill="#2F8F3A" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`);
    case 'muertos': // calavera with marigold eyes
      return wrap(`
        <path d="M50 10c22 0 36 15 36 34 0 12-6 20-12 24v12c0 4-3 6-6 6H32c-3 0-6-2-6-6V68c-6-4-12-12-12-24C14 25 28 10 50 10z" fill="${fill}" stroke="${ink}" stroke-width="4"/>
        <circle cx="36" cy="46" r="10" fill="${alt}" stroke="${ink}" stroke-width="3"/><circle cx="64" cy="46" r="10" fill="${alt}" stroke="${ink}" stroke-width="3"/>
        <circle cx="36" cy="46" r="3.5" fill="${ink}"/><circle cx="64" cy="46" r="3.5" fill="${ink}"/>
        <path d="M50 56l-5 9h10z" fill="${ink}"/>
        <path d="M36 76v8M44 76v9M52 76v9M60 76v8" stroke="${ink}" stroke-width="3"/>
        <path d="M40 22q10-6 20 0" fill="none" stroke="${alt}" stroke-width="4" stroke-linecap="round"/>`);
    default:
      return wrap(`<circle cx="50" cy="50" r="40" fill="${alt}"/>`);
  }
}
