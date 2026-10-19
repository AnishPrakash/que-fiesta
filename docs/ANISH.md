# Anish — Día de Muertos

**Group topic:** Fiestas del mundo hispano (Festivals of the Hispanic world)
**My subtopic:** Día de Muertos, México, 1–2 November
**My part of the website:** the *Día de Muertos* chapter (research, writing, 25 Spanish words, reflection, interactive stage) **and** Backend API architecture + Vercel deployment

---

## 1. What I made

| Part | Where it is on the site | Files I own |
|---|---|---|
| Día de Muertos chapter | Chapter "Día de Muertos" (the fifth festival on the calendar) | `lib/content.js` (the `muertos` entry) |
| Interactive stage | The illustration beside the chapter text | `public/js/stages/muertos.js` |
| Backend API architecture + Vercel deployment | Runs behind every section | `api/festivals.js`<br>`api/next.js`<br>`api/status.js`<br>`lib/http.js`<br>`server.js` (local dev server)<br>`vercel.json`<br>`package.json`<br>`scripts/check-content.js` |

## 2. My research: Día de Muertos

**Quick facts**
- **Dónde** (Where): All of Mexico, and Mexican communities abroad
- **Cuándo** (When): 1 Nov (children); 2 Nov (adults)
- **Raíces** (Roots): Mesoamerican ancestor rites + Catholic All Souls
- **UNESCO**: Intangible Cultural Heritage, 2008
- **Lema** (motto): *"Nadie muere mientras se le recuerde"*, No one is truly gone while they are remembered

**What my chapter covers**
- **La historia** (The story)
- **La ofrenda** (The altar)
- **Cómo se vive** (How it is lived)
- **La Catrina** (The elegant skeleton)
- **Los guías** (The guides)
- **¿Sabías que…?** (Did you know?)

**Sources I used**
- [Indigenous festivity dedicated to the dead — UNESCO](https://ich.unesco.org/en/lists?RL=00054)
- [Day of the Dead — Wikipedia](https://en.wikipedia.org/wiki/Day_of_the_Dead)
- [La Calavera Catrina — Wikipedia](https://en.wikipedia.org/wiki/La_Calavera_Catrina)

All text in the chapter was written in our own words from these sources (nothing copy-pasted), and every drawing is an original SVG illustration.

## 3. How my interactive stage works

**Build an ofrenda and light the way home.** An SVG altar in three tiers (gold, lilac, turquoise, with white lace edges) under an arch of cempasúchil, with a papel picado strip across the top. On it: two photo frames, *pan de muerto* with its crossed "bones", a glass of water, a bowl of salt, four decorated sugar skulls, a copal burner with drifting smoke, and marigold bunches.
- **Seven velas:** each candle is an accessible button (`role="button"`, `aria-pressed`, works with Enter/Space). Lighting one shows a flickering flame (a CSS keyframe that scales and tilts it) and a warm glow.
- **When all seven are lit:** a path of marigold petals appears on the floor leading to the altar, and a message says *"Las almas ya encontraron el camino a casa"*. This mirrors the real tradition, where petals guide the souls home.
- **Petal trail:** moving the pointer over the altar drops falling cempasúchil petals (a small canvas particle system that only runs while petals exist).

## 4. How Backend API architecture works

**The backend and how the site is put together.**
- **One content source:** all five chapters, the vocabulary, the quiz and the team postcards live in `lib/content.js`. `GET /api/festivals` serves them to the frontend, so each teammate edits their chapter in one place.
- **API routes (Vercel serverless functions in `/api`):** `festivals`, `next` (live countdowns), `guestbook`, `tomatoes`, `quiz`, `status`. All of them use plain Node `(req, res)` handlers and **zero npm dependencies**, so the exact same files run on Vercel and on the local `server.js`.
- **Shared helpers (`lib/http.js`):** JSON responses, safe body parsing with a size limit, text cleaning, a simple rate limiter and consistent error messages.
- **Local dev server (`server.js`):** about 100 lines of Node that serve `/public` and route `/api/<name>` to `api/<name>.js`, including Vercel-style clean URLs and the 404 page. That means `npm run dev` works with no install step.
- **Content check (`npm run check`):** a script that proves every member's chapter uses **exactly 25 different Spanish words**, and lists the Quechua, Valencian and Nahuatl words, which are not counted.
- **Deployment:** `vercel.json` (output folder, clean URLs, caching and security headers), with optional Upstash Redis so the guestbook, scores and tomatoes survive redeploys. See `DEPLOY.md`.

## 5. My 25 Spanish words

These are used **inside the sentences** of my chapter, not as a separate list. On the site each one has a dotted underline. Hovering or tapping it shows the English meaning, says the word aloud with a es-MX voice, and drops a bean on my 5 × 5 Lotería board (*tabla*). Fill all 25 and the site shouts *¡Lotería!*

| # | Español | English | Where I used it |
|---|---|---|---|
| 1 | **flores** | flowers | Intro |
| 2 | **música** | music | Intro |
| 3 | **fiesta** | celebration | Intro |
| 4 | **niños** | children | La historia |
| 5 | **angelitos** | little angels | La historia |
| 6 | **ofrenda** | altar of offerings | La ofrenda |
| 7 | **velas** | Candles | La ofrenda |
| 8 | **cempasúchil** | Mexican marigold (from Nahuatl, "twenty flowers") | La ofrenda |
| 9 | **agua** | water | La ofrenda |
| 10 | **sal** | salt | La ofrenda |
| 11 | **copal** | resin incense | La ofrenda |
| 12 | **comida** | food | La ofrenda |
| 13 | **pan** | bread | La ofrenda |
| 14 | **calaveras** | skulls | La ofrenda |
| 15 | **papel** | paper | La ofrenda |
| 16 | **picado** | perforated | La ofrenda |
| 17 | **vida** | life | La ofrenda |
| 18 | **familia** | family | Cómo se vive |
| 19 | **cementerio** | cemetery | Cómo se vive |
| 20 | **tumbas** | graves | Cómo se vive |
| 21 | **noche** | night | Cómo se vive |
| 22 | **versos** | verses | Cómo se vive |
| 23 | **huesos** | bones | La Catrina |
| 24 | **muerte** | death | La Catrina |
| 25 | **perro** | dog | Los guías |

**Other-language words in my chapter (not counted in the 25):** *xoloitzcuintle* (Nahuatl: Mexico's ancient hairless dog). They are styled differently on the site and labelled with their language, because Día de Muertos has Nahuatl roots.

Run `npm run check` in the project folder to verify the count automatically.

## 6. Mi reflexión (my personal paragraph)

> I always thought of death as something families avoid talking about. Día de Muertos showed me another way: Mexican families talk to their dead, cook their favourite dishes and even joke about them. Researching the ofrenda, I liked that every object has a reason — water for thirst, salt to purify, marigolds to show the path home. It reminded me that many cultures, including ours in India, remember their ancestors with photos, lamps and food, so the festival felt less foreign than I expected. Building the interactive ofrenda, where visitors light the candles themselves, was the part I enjoyed most, and designing the backend for the whole site taught me how five separate chapters could share one set of APIs.

> ✏️ **Before submitting:** this paragraph is a draft. The personal-reflection marks are for what *you* learned and felt, so rewrite it in your own voice and add one real detail from your own experience. Edit the `reflection` field of the `muertos` entry in `lib/content.js`, and the site updates automatically.

## 7. How to demo my part (2 minutes)

1. Light the seven velas one by one, and the petal path appears.
2. Hover the Spanish words; point out cempasúchil and copal (Spanish words from Nahuatl).
3. Show `npm run check` in the terminal proving 25 words for everyone.
4. Open `/api/next` and `/api/status` in the browser to show the backend working.

## 8. How this meets the marking scheme

| Criterion | Where it shows |
|---|---|
| Effort & contribution (6) | A full researched chapter, an original interactive illustration, and a site-wide feature (Backend API architecture + Vercel deployment) |
| Creativity & originality (5) | Original SVG artwork and an interaction designed around the festival itself |
| Spanish used naturally (4) | Exactly 25 Spanish words inside real sentences, with meanings, pronunciation and a vocabulary game |
| Research depth (3) | History, how it's celebrated, food, numbers and facts, with sources listed in the chapter |
| Personal reflection (2) | "Mi reflexión", signed with my name |
