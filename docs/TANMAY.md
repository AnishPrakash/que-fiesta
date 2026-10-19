# Tanmay — La Tomatina

**Group topic:** Fiestas del mundo hispano (Festivals of the Hispanic world)
**My subtopic:** La Tomatina, Buñol, España, Last Wednesday of August
**My part of the website:** the *La Tomatina* chapter (research, writing, 25 Spanish words, reflection, interactive stage) **and** Libro de visitas (guestbook) + the live tomato counter

---

## 1. What I made

| Part | Where it is on the site | Files I own |
|---|---|---|
| La Tomatina chapter | Chapter "La Tomatina" (the fourth festival on the calendar) | `lib/content.js` (the `tomatina` entry) |
| Interactive stage | The illustration beside the chapter text | `public/js/stages/tomatina.js` |
| Libro de visitas (guestbook) + the live tomato counter | Section "Libro de visitas" + the counter in La Tomatina | `public/js/visitas.js`<br>`api/guestbook.js`<br>`api/tomatoes.js`<br>`lib/store.js` (the shared storage layer)<br>the visitas block in `public/index.html` |

## 2. My research: La Tomatina

**Quick facts**
- **Dónde** (Where): Buñol, a town of about 9,000 people near Valencia
- **Cuándo** (When): Last Wednesday of August, for one hour
- **Desde** (Since): 1945; official again after the 1957 protest
- **Cifras** (Numbers): ~20,000 ticket holders; up to ~145 tonnes of tomatoes
- **Lema** (motto): *"Nadie sale limpio de Buñol"*, Nobody leaves Buñol clean

**What my chapter covers**
- **La historia** (The story)
- **Cómo se vive** (How it is lived)
- **Las reglas** (The rules)
- **Los números** (The numbers)
- **La comida** (The food)
- **¿Sabías que…?** (Did you know?)

**Sources I used**
- [La Tomatina — Wikipedia](https://en.wikipedia.org/wiki/La_Tomatina)
- [Thousands join Spain’s La Tomatina — Al Jazeera (2026)](https://www.aljazeera.com/amp/gallery/2026/8/26/photos-thousands-join-spains-la-tomatina-festival-for-epic-tomato-battle)

All text in the chapter was written in our own words from these sources (nothing copy-pasted), and every drawing is an original SVG illustration.

## 3. How my interactive stage works

**Throw tomatoes at a Buñol wall.** An SVG street scene: a whitewashed wall with a blue azulejo tile band, a green door, a "Calle del Cristo" sign (the real main street of the fight), a balcony covered in protective plastic, a geranium pot, cobblestones, and the *palo jabón* with a jamón tied to the top.
- **Two canvases:** one for tomatoes in flight (redrawn every frame) and one for splats (drawn once and kept, so hundreds of splats cost nothing).
- **The throw:** each click launches a tomato from a random point below the wall. It travels in a parabolic arc (straight-line motion plus `sin(πt)` lift), shrinks as it "flies away", spins, and splats on arrival.
- **The splat:** procedurally generated, so every one is different: three layered jagged blobs (dark, bright, light), 1–3 drips running down the wall with a drop at the end, flung droplets and yellow seeds.
- **"Limpiar con las mangueras":** the firefighters' hoses wash the wall from top to bottom, using `destination-out` compositing with water streaks.
- **A shared counter:** every throw counts toward one global number that all visitors share. Throws are batched and sent to `POST /api/tomatoes` every 2.5 seconds (and with `navigator.sendBeacon` when the page closes), so the server isn't hit on every click.

## 4. How Libro de visitas (guestbook) works

**Libro de visitas (guestbook)**: visitors send the team a postcard.
- **Frontend (`visitas.js`):** a form (name, favourite fiesta, message with a live 0/240 counter) with friendly bilingual validation messages next to the fields and a hidden *honeypot* field that catches spam bots. Messages appear as tilted postcards with lined paper, a stamp in the festival's colour and a Spanish timestamp (*hace 5 min*, *ayer*…). New postcards drop in with an animation.
- **Backend (`api/guestbook.js`):** `GET` returns the newest 40 postcards. `POST` validates everything on the server too: name 2–30 characters, message 3–240, fiesta must be one of the five, control characters stripped, and a rate limit of 5 posts per minute per visitor. Until real visitors write, the wall shows the five team postcards (written in Spanish) from `lib/content.js`.
- **Storage (`lib/store.js`):** one small module used by the guestbook, tomatoes and quiz. If Upstash Redis credentials are set (on Vercel), data is saved in Redis through its REST API (no npm packages needed). Otherwise it uses memory for local testing.

## 5. My 25 Spanish words

These are used **inside the sentences** of my chapter, not as a separate list. On the site each one has a dotted underline. Hovering or tapping it shows the English meaning, says the word aloud with a es-ES voice, and drops a bean on my 5 × 5 Lotería board (*tabla*). Fill all 25 and the site shouts *¡Lotería!*

| # | Español | English | Where I used it |
|---|---|---|---|
| 1 | **tomates** | tomatoes | Intro |
| 2 | **gigantes** | giants | La historia |
| 3 | **cabezudos** | big-headed figures | La historia |
| 4 | **desfile** | parade | La historia |
| 5 | **entierro** | burial | La historia |
| 6 | **ataúd** | coffin | La historia |
| 7 | **pueblo** | town | La historia |
| 8 | **fiesta** | festival | La historia |
| 9 | **palo** | pole | Cómo se vive |
| 10 | **jabón** | soap | Cómo se vive |
| 11 | **jamón** | ham | Cómo se vive |
| 12 | **camiones** | Trucks | Cómo se vive |
| 13 | **hora** | hour | Cómo se vive |
| 14 | **bomberos** | firefighters | Cómo se vive |
| 15 | **mangueras** | hoses | Cómo se vive |
| 16 | **camiseta** | T-shirt | Las reglas |
| 17 | **gafas** | goggles | Las reglas |
| 18 | **ventanas** | windows | Las reglas |
| 19 | **vecinos** | neighbours | Las reglas |
| 20 | **habitantes** | inhabitants | Los números |
| 21 | **leña** | firewood | La comida |
| 22 | **gazpacho** | cold tomato soup | La comida |
| 23 | **pepino** | cucumber | La comida |
| 24 | **pan** | bread | La comida |
| 25 | **aceite** | oil | La comida |

Run `npm run check` in the project folder to verify the count automatically.

## 6. Mi reflexión (my personal paragraph)

> I picked La Tomatina because it sounded like the most fun festival in the world, and it is — but I didn't expect it to have a history of protest. The mock burial of the tomato in 1957 showed me that the people of Buñol fought to keep their fiesta when the government said no. I also had mixed feelings about throwing away so much food, and that made me read more about how the event is organised. Coding the tomato-throwing wall and the live counter that every visitor shares was my favourite part; it felt like a tiny online Buñol. I learned that a festival doesn't need to be ancient or religious to become part of who a town is.

> ✏️ **Before submitting:** this paragraph is a draft. The personal-reflection marks are for what *you* learned and felt, so rewrite it in your own voice and add one real detail from your own experience. Edit the `reflection` field of the `tomatina` entry in `lib/content.js`, and the site updates automatically.

## 7. How to demo my part (2 minutes)

1. Click the wall a few times and show the splats, then "Limpiar con las mangueras".
2. Open the site in a second browser tab and throw there: the shared counter goes up for both.
3. Submit the guestbook empty to show the validation, then send a real postcard in Spanish.
4. Explain the honeypot and the server-side checks (never trust the browser).

## 8. How this meets the marking scheme

| Criterion | Where it shows |
|---|---|
| Effort & contribution (6) | A full researched chapter, an original interactive illustration, and a site-wide feature (Libro de visitas (guestbook) + the live tomato counter) |
| Creativity & originality (5) | Original SVG artwork and an interaction designed around the festival itself |
| Spanish used naturally (4) | Exactly 25 Spanish words inside real sentences, with meanings, pronunciation and a vocabulary game |
| Research depth (3) | History, how it's celebrated, food, numbers and facts, with sources listed in the chapter |
| Personal reflection (2) | "Mi reflexión", signed with my name |
