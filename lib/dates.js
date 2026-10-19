// Works out when each festival next happens, so the site can show live countdowns.
// All maths is done on calendar dates in UTC to avoid timezone surprises.

const DAY = 86_400_000;

function utc(y, m, d) {
  return new Date(Date.UTC(y, m, d));
}

// Anonymous Gregorian algorithm (Meeus/Jones/Butcher) for Easter Sunday.
export function easter(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month, day);
}

function lastWeekdayOfMonth(year, month, weekday) {
  const last = utc(year, month + 1, 0);
  const diff = (last.getUTCDay() - weekday + 7) % 7;
  return utc(year, month, last.getUTCDate() - diff);
}

// Each rule returns { start, end } for a given year.
const rules = {
  // Saturday to Tuesday before Ash Wednesday (Easter − 46 days)
  carnaval: (y) => {
    const e = easter(y).getTime();
    return { start: new Date(e - 50 * DAY), end: new Date(e - 47 * DAY) };
  },
  fallas: (y) => ({ start: utc(y, 2, 15), end: utc(y, 2, 19) }),
  'inti-raymi': (y) => ({ start: utc(y, 5, 24), end: utc(y, 5, 24) }),
  // last Wednesday of August
  tomatina: (y) => {
    const d = lastWeekdayOfMonth(y, 7, 3);
    return { start: d, end: d };
  },
  muertos: (y) => ({ start: utc(y, 10, 1), end: utc(y, 10, 2) }),
};

export function nextOccurrence(id, now = new Date()) {
  const today = utc(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  for (const y of [today.getUTCFullYear(), today.getUTCFullYear() + 1]) {
    const { start, end } = rules[id](y);
    if (end >= today) {
      const happening = start <= today;
      const days = happening ? 0 : Math.round((start - today) / DAY);
      return {
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10),
        daysUntil: days,
        happeningNow: happening,
      };
    }
  }
  return null;
}

export function dayOfYear(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return Math.round((d - utc(d.getUTCFullYear(), 0, 1)) / DAY) + 1;
}

export const festivalIds = Object.keys(rules);
