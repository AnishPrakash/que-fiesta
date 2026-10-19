# How to run ¡Qué Fiesta! locally, then deploy it on Vercel

The project has **zero npm dependencies**. There is nothing to `npm install`: you only need Node.js.

```
que-fiesta/
├── api/              ← backend: one Vercel serverless function per file
│   ├── festivals.js    GET  all chapters
│   ├── next.js         GET  live countdowns to each festival
│   ├── guestbook.js    GET/POST  libro de visitas
│   ├── tomatoes.js     GET/POST  shared tomato counter
│   ├── quiz.js         GET/POST  Lotería quiz + leaderboard
│   └── status.js       GET  health check
├── lib/              ← shared code (content, storage, dates, HTTP helpers)
├── public/           ← frontend: index.html, css/, js/, fonts/
├── scripts/check-content.js   ← proves every member has exactly 25 Spanish words
├── server.js         ← local dev server (acts like Vercel on your laptop)
├── vercel.json
└── package.json
```

---

## Part 1: Test it on your own computer

### 1. Install Node.js (once)
Download the **LTS** version from <https://nodejs.org>, install it, then check in a terminal:

```bash
node -v      # must print v18 or higher
```

### 2. Start the site
Unzip the project, open a terminal **inside the `que-fiesta` folder**, and run:

```bash
npm run dev
```

You should see:

```
  ¡Qué Fiesta! is running →  http://localhost:3000
  Storage: in-memory (guestbook, scores and tomatoes reset when you stop the server)
```

Open **http://localhost:3000** in Chrome, Edge or Safari. Stop the server with `Ctrl + C`.

> ⚠️ Don't double-click `public/index.html`. Opened as a file, the page can't reach the API and the chapters won't load. Always use `npm run dev`.

**Port 3000 already in use?** Pick another port:

| System | Command |
|---|---|
| macOS / Linux | `PORT=4000 npm run dev` |
| Windows PowerShell | `$env:PORT=4000; npm run dev` |
| Windows CMD | `set PORT=4000 && npm run dev` |

### 3. Check the Spanish word count

```bash
npm run check
```

Every member should show `✔ … 25 Spanish words`. If someone edits their chapter, run this again.

### 4. Click through this test checklist

| ✓ | What to test | What should happen |
|---|---|---|
| ☐ | Move the mouse across the top of the page | The papel picado flags swing; confetti is visible through the cut-out title |
| ☐ | Hover a dotted Spanish word | An English tooltip appears; a bean drops on that chapter's 5 × 5 tabla |
| ☐ | Tap/click a Spanish word with **Voz** on | The word is spoken in Spanish (needs a browser with Spanish voices: Chrome, Edge or Safari) |
| ☐ | La rueda del año: drag the wheel, use ←/→, click the chips | The wheel spins and snaps; the countdown updates |
| ☐ | Carnaval: move the mouse, click the stage | The Marimonda's eyes follow you; confetti bursts |
| ☐ | Las Fallas: "¡Que empiece la cremà!" | The falla burns to ashes; "Plantar otra falla" rebuilds it |
| ☐ | Las Fallas: "Escuchar la mascletà" | A rising series of booms (turn your volume down first) |
| ☐ | Inti Raymi: scroll slowly through the chapter | The sun rises, the sky turns gold, the three stages light up |
| ☐ | La Tomatina: click the wall | Tomatoes fly and splat; the counter goes up; the hoses clean the wall |
| ☐ | Día de Muertos: light all 7 velas | A marigold petal path appears with a message |
| ☐ | La Gran Lotería: type a name and play | 10 cards → a graded score → your name on "Los mejores" |
| ☐ | Libro de visitas: submit empty, then send a real postcard | A validation message, then a new postcard on the wall |
| ☐ | Resize the window to phone width (or use DevTools device mode) | Everything stacks into one column with no sideways scrolling |

You can also open the API directly in the browser:
- <http://localhost:3000/api/status>
- <http://localhost:3000/api/next>
- <http://localhost:3000/api/festivals>

---

## Part 2: Deploy on Vercel (free)

### Option A: GitHub + Vercel dashboard (recommended)

**1. Put the project on GitHub**

Create an empty repository on <https://github.com/new> (e.g. `que-fiesta`), then in the project folder:

```bash
git init
git add .
git commit -m "¡Qué Fiesta! — Spanish DA II & III"
git branch -M main
git remote add origin https://github.com/<your-username>/que-fiesta.git
git push -u origin main
```

**2. Import it into Vercel**

1. Go to <https://vercel.com> and sign in with GitHub.
2. Click **Add New… → Project** and **Import** the `que-fiesta` repository.
3. On the configuration screen:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (leave it)
   - **Build Command:** leave empty
   - **Output Directory:** `public` (already set by `vercel.json`)
4. Click **Deploy**. After about a minute you get a link like `https://que-fiesta-xxxx.vercel.app`.

From now on, every `git push` to `main` redeploys the site automatically.

### Option B: Vercel CLI (no GitHub needed)

```bash
npm install -g vercel
vercel login
vercel          # first time: answer the questions (defaults are fine), creates a preview URL
vercel --prod   # publishes to your production URL
```

### Test locally exactly like Vercel (optional)
With the CLI installed, `vercel dev` runs the real Vercel environment on your laptop. `npm run dev` is enough for normal testing.

---

## Part 3: Make the guestbook, scores and tomatoes permanent (recommended)

Out of the box, the site stores postcards, quiz scores and the tomato counter **in memory**. Locally they last until you stop the server. On Vercel they reset whenever the serverless function goes to sleep (after a few minutes with no visitors). For the class demo you'll want them to persist, which takes a free Redis database:

1. In your Vercel project, open the **Storage** tab (or **Integrations → Marketplace**).
2. Choose **Upstash → Redis** (free plan), create a database, and **connect it to this project**.
3. Vercel adds the environment variables automatically (`KV_REST_API_URL` / `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`). The code accepts either pair, so you don't need to change anything.
4. Go to **Deployments → ⋯ → Redeploy** so the new variables take effect.
5. Open `https://<your-site>.vercel.app/api/status`. It should say `"storage": "upstash-redis (persistent)"`.

To use the same database locally, copy those two variables into your terminal before `npm run dev`:

```bash
# macOS / Linux
export UPSTASH_REDIS_REST_URL="https://…upstash.io"
export UPSTASH_REDIS_REST_TOKEN="…"
npm run dev
```

---

## After deploying: 60-second check

1. Open the site on your phone **and** your laptop.
2. Throw a tomato on one device and refresh on the other; the counter should be shared.
3. Send a test postcard and play one Lotería round.
4. `…/api/status` returns `"ok": true`.
5. Share the link with your teacher. 🎉

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "The festivals couldn't load" | You opened the HTML file directly. Run `npm run dev` and use `http://localhost:3000`. |
| `npm run dev` says `fetch is not defined` or shows a syntax error | Your Node.js is too old. Install the LTS version (18+). |
| `EADDRINUSE` | Port 3000 is busy. Use another port (see Part 1). |
| Words aren't spoken aloud | Check the **Voz** button is on. Some browsers (e.g. Firefox on Linux) have no Spanish voice; use Chrome, Edge or Safari. |
| `/api/...` returns 404 on Vercel | The `api/` folder must be at the project root (next to `vercel.json`), not inside `public/`. |
| Guestbook/scores disappear on Vercel | That's the in-memory fallback. Connect Upstash Redis (Part 3). |
| `429 Too many requests` | The anti-spam rate limit; wait a minute. |

## Editing content

Every chapter lives in **`lib/content.js`**. To change your text, reflection or words:
1. Edit your festival's entry (keep the `[[palabra|meaning]]` format for Spanish words).
2. Run `npm run check` and make sure you still have exactly 25.
3. Refresh the browser (locally), or `git push` (on Vercel).
