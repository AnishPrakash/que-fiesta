// Tiny key-value store.
// • If Upstash Redis credentials are present (UPSTASH_REDIS_REST_URL/TOKEN, or the
//   KV_REST_API_URL/TOKEN names that Vercel's Upstash integration creates), data is
//   kept in Redis and survives deploys.
// • Otherwise it falls back to memory: perfect for local testing, but on Vercel the
//   data resets whenever the serverless function goes cold.

const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const persistent = Boolean(URL_ && TOKEN);
const PREFIX = 'quefiesta:';

async function redis(command) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error(`Redis error ${r.status}`);
  const json = await r.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

// ---------- in-memory fallback ----------
const mem = globalThis.__queFiestaMem || (globalThis.__queFiestaMem = {
  lists: new Map(),
  counters: new Map(),
  zsets: new Map(),
});

export async function listPush(key, value, maxLen = 200) {
  key = PREFIX + key;
  const str = JSON.stringify(value);
  if (persistent) {
    await redis(['LPUSH', key, str]);
    await redis(['LTRIM', key, 0, maxLen - 1]);
    return;
  }
  const list = mem.lists.get(key) || [];
  list.unshift(str);
  mem.lists.set(key, list.slice(0, maxLen));
}

export async function listRange(key, count = 50) {
  key = PREFIX + key;
  const raw = persistent
    ? await redis(['LRANGE', key, 0, count - 1])
    : (mem.lists.get(key) || []).slice(0, count);
  return raw.map((s) => {
    try { return JSON.parse(s); } catch { return null; }
  }).filter(Boolean);
}

export async function incrBy(key, n) {
  key = PREFIX + key;
  if (persistent) return Number(await redis(['INCRBY', key, n]));
  const v = (mem.counters.get(key) || 0) + n;
  mem.counters.set(key, v);
  return v;
}

export async function getCounter(key) {
  key = PREFIX + key;
  if (persistent) return Number((await redis(['GET', key])) || 0);
  return mem.counters.get(key) || 0;
}

export async function zAdd(key, score, member) {
  key = PREFIX + key;
  const str = JSON.stringify(member);
  if (persistent) {
    await redis(['ZADD', key, score, str]);
    // keep only the best 100 entries
    await redis(['ZREMRANGEBYRANK', key, 0, -101]);
    return;
  }
  const set = mem.zsets.get(key) || [];
  set.push({ score, str });
  set.sort((a, b) => b.score - a.score);
  mem.zsets.set(key, set.slice(0, 100));
}

export async function zTop(key, count = 10) {
  key = PREFIX + key;
  if (persistent) {
    const flat = await redis(['ZRANGE', key, 0, count - 1, 'REV', 'WITHSCORES']);
    const out = [];
    for (let i = 0; i < flat.length; i += 2) {
      try { out.push({ ...JSON.parse(flat[i]), rank: Number(flat[i + 1]) }); } catch {}
    }
    return out;
  }
  return (mem.zsets.get(key) || []).slice(0, count).map(({ score, str }) => ({ ...JSON.parse(str), rank: score }));
}
