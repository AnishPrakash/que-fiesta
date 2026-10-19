# Sravan — Las Fallas

**Group topic:** Fiestas del mundo hispano (Festivals of the Hispanic world)
**My subtopic:** Las Fallas, Valencia, España, 15–19 March
**My part of the website:** the *Las Fallas* chapter (research, writing, 25 Spanish words, reflection, interactive stage) **and** La Rueda del Año — the calendar wheel

---

## 1. What I made

| Part | Where it is on the site | Files I own |
|---|---|---|
| Las Fallas chapter | Chapter "Las Fallas" (the second festival on the calendar) | `lib/content.js` (the `fallas` entry) |
| Interactive stage | The illustration beside the chapter text | `public/js/stages/fallas.js` |
| La Rueda del Año — the calendar wheel | Section "La rueda del año", right under the hero | `public/js/rueda.js`<br>the rueda block in `public/index.html`<br>`lib/dates.js` (festival date maths, shared with the backend) |

## 2. My research: Las Fallas

**Quick facts**
- **Dónde** (Where): Valencia, on the Mediterranean coast of Spain
- **Cuándo** (When): 15–19 March; mascletàs daily from 1 March
- **Por qué** (Why): Feast of San José, patron of carpenters (19 March)
- **UNESCO**: Intangible Cultural Heritage, November 2016
- **Lema** (motto): *"Del cartón a la ceniza en una noche"*, From cardboard to ashes in one night

**What my chapter covers**
- **La historia** (The story)
- **Cómo se vive** (How it is lived)
- **Los ninots** (The figures)
- **La cremà** (The burning)
- **La comida** (The food)
- **¿Sabías que…?** (Did you know?)

**Sources I used**
- [Fallas — Wikipedia](https://en.wikipedia.org/wiki/Fallas)
- [Fallas de San José — Spain.info (official tourism site of Spain)](https://www.spain.info/en/calendar/fallas-san-jose/)

All text in the chapter was written in our own words from these sources (nothing copy-pasted), and every drawing is an original SVG illustration.

## 3. How my interactive stage works

**"El rey del móvil": a falla you can burn.** An original satirical falla: a crowned king who can't look up from his phone, standing on a painted pedestal with smaller ninots (a tourist taking a selfie, a pigeon), in front of a night-time Valencia skyline.
- **La cremà button:** adds a CSS class that runs a 4.2-second "charring" keyframe animation on the monument (it darkens, sepia-burns, then collapses into itself). At the same time a `<canvas>` **particle system** emits flames (radial gradients drawn with `globalCompositeOperation = 'lighter'` so overlapping flames glow), sparks and grey smoke. The stage shakes, a fire glow lights up the sky, and an ash pile grows. Afterwards the button becomes "Plantar otra falla" and rebuilds it.
- **Escuchar la mascletà:** a mascletà synthesised live with the **Web Audio API**. Each "boom" is a burst of filtered white noise plus a falling sine-wave thump, scheduled closer and closer together (each gap is 90% of the last) until a 26-blast *terremoto* finale. No audio files are used.

## 4. How La Rueda del Año works

**La Rueda del Año (`rueda.js`)** is the circular calendar under the hero.
- The wheel is drawn in SVG from scratch: 12 month arcs (calculated with SVG arc paths), a tick for every day of the year, coloured bands showing how long each festival lasts, a dashed "hoy" (today) marker, and a marker for each of the five festivals placed at the angle of its real date (`(dayOfYear − 1) / 365 × 360°`).
- **Three ways to spin it:** click a marker or a festival chip, use ←/→ on the keyboard, or **drag** the wheel. Dragging uses `atan2` to turn pointer position into an angle, and on release the wheel snaps to the nearest festival. The wheel always takes the shortest way round, and the icons counter-rotate so they stay upright.
- The centre and the side panel show a **live countdown** from `/api/next`, which works out real dates on the server, including the moving ones: Carnaval depends on Easter (computed with the Meeus/Jones/Butcher algorithm), and La Tomatina is "the last Wednesday of August".

## 5. My 25 Spanish words

These are used **inside the sentences** of my chapter, not as a separate list. On the site each one has a dotted underline. Hovering or tapping it shows the English meaning, says the word aloud with a es-ES voice, and drops a bean on my 5 × 5 Lotería board (*tabla*). Fill all 25 and the site shouts *¡Lotería!*

| # | Español | English | Where I used it |
|---|---|---|---|
| 1 | **fuego** | fire | Intro |
| 2 | **carpinteros** | carpenters | La historia |
| 3 | **primavera** | spring | La historia |
| 4 | **madera** | wood | La historia |
| 5 | **ayuntamiento** | city hall | Cómo se vive |
| 6 | **pólvora** | gunpowder | Cómo se vive |
| 7 | **ruido** | noise | Cómo se vive |
| 8 | **traje** | dress | Cómo se vive |
| 9 | **flores** | flowers | Cómo se vive |
| 10 | **manto** | cloak | Cómo se vive |
| 11 | **noche** | night | Cómo se vive |
| 12 | **barrio** | neighbourhood | Los ninots |
| 13 | **artistas** | artists | Los ninots |
| 14 | **cartón** | cardboard | Los ninots |
| 15 | **broma** | joke | Los ninots |
| 16 | **museo** | museum | Los ninots |
| 17 | **bomberos** | firefighters | La cremà |
| 18 | **plaza** | square | La cremà |
| 19 | **cenizas** | ashes | La cremà |
| 20 | **humo** | smoke | La cremà |
| 21 | **buñuelos** | fritters | La comida |
| 22 | **calabaza** | pumpkin | La comida |
| 23 | **arroz** | rice | La comida |
| 24 | **conejo** | rabbit | La comida |
| 25 | **pollo** | chicken | La comida |

**Other-language words in my chapter (not counted in the 25):** *parots* (Valencian: wooden candle stands); *mascletà* (Valencian: daytime firecracker show); *plantà* (Valencian: setting-up of the fallas); *ninots* (Valencian: figures, puppets); *indultat* (Valencian: pardoned (ninot)). They are styled differently on the site and labelled with their language, because many Fallas words are Valencian, not Spanish.

Run `npm run check` in the project folder to verify the count automatically.

## 6. Mi reflexión (my personal paragraph)

> What surprised me most is that people spend a whole year and a lot of money building something they know will be burned in one night. At first it sounded like a waste. The more I read, the more it felt like a lesson: the joy is in making it together as a barrio, not in keeping it. While building the calendar wheel and the cremà animation I kept picturing the falleros watching their work disappear. I also learned that Spain is not just one language — Valencian is everywhere in this festival — and I liked how a funny sculpture can say things about politics that would be hard to say out loud.

> ✏️ **Before submitting:** this paragraph is a draft. The personal-reflection marks are for what *you* learned and felt, so rewrite it in your own voice and add one real detail from your own experience. Edit the `reflection` field of the `fallas` entry in `lib/content.js`, and the site updates automatically.

## 7. How to demo my part (2 minutes)

1. Drag the wheel in a circle, let go, and it snaps to a festival. Use the arrow keys too.
2. Explain why Carnaval moves every year (Easter − 50 days) and show it in `lib/dates.js`.
3. Scroll to Las Fallas and press "¡Que empiece la cremà!" to burn the falla, then rebuild it.
4. Turn on Voz and play the mascletà (warn the class first, it is loud).

## 8. How this meets the marking scheme

| Criterion | Where it shows |
|---|---|
| Effort & contribution (6) | A full researched chapter, an original interactive illustration, and a site-wide feature (La Rueda del Año — the calendar wheel) |
| Creativity & originality (5) | Original SVG artwork and an interaction designed around the festival itself |
| Spanish used naturally (4) | Exactly 25 Spanish words inside real sentences, with meanings, pronunciation and a vocabulary game |
| Research depth (3) | History, how it's celebrated, food, numbers and facts, with sources listed in the chapter |
| Personal reflection (2) | "Mi reflexión", signed with my name |
