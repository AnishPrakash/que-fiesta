// npm run check → verifies every chapter uses exactly 25 different Spanish words.
import { festivals } from '../lib/content.js';

const re = /\[\[([^|\]]+)\|([^|\]]+)(?:\|([a-z]{2}))?\]\]/g;
let ok = true;
for (const f of festivals) {
  const text = [f.intro, ...f.sections.map((s) => s.body), f.didYouKnow].join(' ');
  const es = new Map();
  const other = [];
  for (const m of text.matchAll(re)) {
    if (m[3]) other.push(`${m[1]} (${m[3]})`);
    else if (!es.has(m[1].toLowerCase())) es.set(m[1].toLowerCase(), m[2]);
  }
  const good = es.size === 25;
  ok &&= good;
  console.log(`${good ? '✔' : '✘'} ${f.author.padEnd(7)} ${f.name.padEnd(26)} ${es.size} Spanish words` + (other.length ? `  (+ ${other.length} other-language: ${other.join(', ')})` : ''));
  if (!good || process.argv.includes('-v')) console.log('   ', [...es.keys()].join(', '));
}
process.exit(ok ? 0 : 1);
