// ¡Qué Fiesta! — entry point.
// Loads the chapters from our API, renders them, then wakes up each module.
import { $, $$, api, escapeHtml, shortRange, isSoundOn, setSound } from './util.js';
import { collectVocab, renderRich, renderTabla, initWords } from './text.js';
import { mountHero } from './hero.js';
import { mountGarland } from './garland.js';
import { mountRueda } from './rueda.js';
import { mountLoteria } from './loteria.js';
import { mountVisitas } from './visitas.js';
import * as carnaval from './stages/carnaval.js';
import * as fallas from './stages/fallas.js';
import * as inti from './stages/inti.js';
import * as tomatina from './stages/tomatina.js';
import * as muertos from './stages/muertos.js';

const stages = { carnaval, fallas, 'inti-raymi': inti, tomatina, muertos };

function chapterHtml(f, i) {
  const p = f.palette;
  const date = shortRange(f.next);
  const len = Math.max(...f.name.split(' ').map((w) => w.length));
  const style = `--bg:${p.bg};--ink:${p.ink};--accent:${p.accent};--accent2:${p.accent2};--accent3:${p.accent3};--soft:${p.soft};--len:${len}`;
  return `
  <section class="fiesta" id="f-${f.id}" data-id="${f.id}" data-side="${i % 2 ? 'left' : 'right'}" style="${style}" aria-labelledby="t-${f.id}">
    <div class="fiesta__grid">
      <header class="fiesta__top">
        <p class="fiesta__date" aria-label="${escapeHtml(f.dateLabel)}">${date.day}<span>${date.month}</span></p>
        <div class="fiesta__titles">
          <p class="fiesta__place"><b>${escapeHtml(f.place)}</b><br>Capítulo de ${escapeHtml(f.author)}</p>
          <h2 id="t-${f.id}">${escapeHtml(f.name)}</h2>
          <p class="fiesta__en">${escapeHtml(f.nameEn)}</p>
          <blockquote class="lema"><p lang="es">“${escapeHtml(f.motto.es)}”</p><p>${escapeHtml(f.motto.en)}</p></blockquote>
        </div>
      </header>

      <div class="fiesta__stage-col">
        <div class="fiesta__stage" data-stage="${f.id}"></div>
        <div class="stage__controls"></div>
      </div>

      <div class="fiesta__main">
        <p class="fiesta__intro">${renderRich(f.intro, f.id)}</p>
        <dl class="fiesta__facts">
          ${f.facts.map((x) => `<div><dt lang="es">${escapeHtml(x.k)}<small>${escapeHtml(x.en)}</small></dt><dd>${escapeHtml(x.v)}</dd></div>`).join('')}
        </dl>
        ${f.sections.map((s) => `
          <article class="fiesta__section">
            <h3><span lang="es">${escapeHtml(s.title)}</span><small>${escapeHtml(s.en)}</small></h3>
            <p>${renderRich(s.body, f.id)}</p>
          </article>`).join('')}
        <aside class="fiesta__know"><h4 lang="es">¿Sabías que…?</h4><p>${renderRich(f.didYouKnow, f.id)}</p></aside>
      </div>

      <div class="fiesta__bottom">
        ${renderTabla(f)}
        <div>
          <figure class="reflexion">
            <h3><span lang="es">Mi reflexión</span><small>What I learned and how I felt</small></h3>
            <p>${escapeHtml(f.reflection)}</p>
            <figcaption>— ${escapeHtml(f.author)}</figcaption>
          </figure>
          <details class="fuentes">
            <summary>Fuentes <span>(sources)</span></summary>
            <ul>${f.sources.map((s) => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.title)}</a></li>`).join('')}</ul>
          </details>
        </div>
      </div>
    </div>
  </section>`;
}

function heroCount(upcoming) {
  const n = upcoming[0];
  const article = /^(La|Las|El|Los) /.test(n.name) ? '' : 'el ';
  $('#heroCount').innerHTML = n.happeningNow
    ? `<strong>¡Hoy!</strong> ${escapeHtml(n.name)} is happening right now. <a href="#f-${n.id}">Ir al capítulo</a>`
    : `Faltan <strong>${n.daysUntil} ${n.daysUntil === 1 ? 'día' : 'días'}</strong> para ${article}<a href="#f-${n.id}">${escapeHtml(n.name)}</a>, the next fiesta on our calendar.`;
}

function navThemes() {
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('is-solid', scrollY > 40), { passive: true });
  nav.classList.toggle('is-solid', scrollY > 40);

  const themes = [
    ...$$('.fiesta').map((s) => [s, s.style.getPropertyValue('--bg'), s.style.getPropertyValue('--ink'), s.style.getPropertyValue('--accent')]),
    [$('.hero'), '#1A1140', '#FFF4E2', '#F2177E'],
    [$('.rueda'), '#1A1140', '#FFF4E2', '#F2177E'],
    [$('.loteria'), '#F2177E', '#1A1140', '#1A1140'],
    [$('.visitas'), '#17B6A7', '#1A1140', '#1A1140'],
    [$('.equipo'), '#1A1140', '#FFF4E2', '#F2177E'],
  ];
  const links = $$('.nav__links a');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const t = themes.find(([el]) => el === e.target);
      nav.style.setProperty('--nav-bg', t[1]);
      nav.style.setProperty('--nav-ink', t[2]);
      nav.style.setProperty('--nav-accent', t[3]);
      const id = e.target.classList.contains('fiesta') ? 'fiestas' : e.target.id;
      links.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === `#${id}`));
    }
  }, { rootMargin: '-56px 0px -92% 0px' });
  themes.forEach(([el]) => el && io.observe(el));
}

function soundToggle() {
  const b = $('#soundToggle');
  const sync = () => b.setAttribute('aria-pressed', isSoundOn());
  sync();
  b.addEventListener('click', () => { setSound(!isSoundOn()); sync(); });
}

async function boot() {
  mountHero();
  mountGarland($('#guirnalda'));
  soundToggle();

  let data, next;
  try {
    [data, next] = await Promise.all([api('festivals'), api('next')]);
  } catch (e) {
    $('#loading').innerHTML = `The festivals couldn’t load (${escapeHtml(e.message)}).<br><small>Running locally? Start the site with <code>npm run dev</code> instead of opening the HTML file directly.</small>`;
    $('#heroCount').textContent = '';
    return;
  }
  const { festivals, team } = data;
  festivals.forEach(collectVocab);

  $('#fiestas').innerHTML = festivals.map(chapterHtml).join('');
  for (const f of festivals) {
    const chapter = $(`#f-${f.id}`);
    try { stages[f.id]?.mount($('.fiesta__stage', chapter), f, chapter); }
    catch (err) { console.error(`Stage ${f.id} failed`, err); }
  }
  initWords(Object.fromEntries(festivals.map((f) => [f.id, f.locale])));
  heroCount(next.upcoming);
  mountRueda({ festivals, upcoming: next.upcoming, today: next.today });
  mountLoteria(festivals);
  mountVisitas(festivals);
  mountGarland($('#guirnalda2'));

  const byId = Object.fromEntries(festivals.map((f) => [f.id, f]));
  $('#equipoList').innerHTML = team.map((m) => {
    const f = byId[m.fiesta];
    return `<li style="--c:${f.palette.accent}"><a href="#f-${f.id}"><span class="equipo__name">${escapeHtml(m.name)}</span><span class="equipo__fiesta">${escapeHtml(f.name)}</span><span class="equipo__also">${escapeHtml(m.alsoBuilt)}</span></a></li>`;
  }).join('');

  navThemes();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

boot();
