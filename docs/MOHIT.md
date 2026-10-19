# Mohit — Inti Raymi

**Group topic:** Fiestas del mundo hispano (Festivals of the Hispanic world)
**My subtopic:** Inti Raymi, Cusco, Perú, 24 June
**My part of the website:** the *Inti Raymi* chapter (research, writing, 25 Spanish words, reflection, interactive stage) **and** La Gran Lotería — the quiz and leaderboard

---

## 1. What I made

| Part | Where it is on the site | Files I own |
|---|---|---|
| Inti Raymi chapter | Chapter "Inti Raymi" (the third festival on the calendar) | `lib/content.js` (the `inti-raymi` entry) |
| Interactive stage | The illustration beside the chapter text | `public/js/stages/inti.js` |
| La Gran Lotería — the quiz and leaderboard | Section "La Gran Lotería" | `public/js/loteria.js`<br>`api/quiz.js`<br>the quiz pool at the bottom of `lib/content.js`<br>the loteria block in `public/index.html` |

## 2. My research: Inti Raymi

**Quick facts**
- **Dónde** (Where): Cusco, Peru — Qorikancha, Plaza de Armas, Sacsayhuamán
- **Cuándo** (When): 24 June, near the southern winter solstice
- **Desde** (Since): Inca era; revived as a reenactment in 1944
- **Elenco** (Cast): More than 800 performers in traditional dress
- **Lema** (motto): *"El día en que vuelve el sol"*, The day the sun comes back

**What my chapter covers**
- **La historia** (The story)
- **El renacimiento** (The revival)
- **Los tres escenarios** (The three stages)
- **El fuego sagrado** (The sacred fire)
- **La comida** (The food)
- **¿Sabías que…?** (Did you know?)

**Sources I used**
- [Inti Raymi — Wikipedia](https://en.wikipedia.org/wiki/Inti_Raymi)
- [La verdadera historia del Inti Raymi — Infobae (2026)](https://www.infobae.com/peru/2026/06/17/la-verdadera-historia-del-inti-raymi-como-era-la-ceremonia-en-tiempos-de-los-incas/)

All text in the chapter was written in our own words from these sources (nothing copy-pasted), and every drawing is an original SVG illustration.

## 3. How my interactive stage works

**A scroll-linked sunrise over the Andes.** An SVG scene: layered mountain ranges with snow caps, the zig-zag stone terraces of Sacsayhuamán, a crowd on the esplanade, stars, and an Inca sun with a face and alternating straight and wavy rays.
- **How the sunrise works:** on scroll (throttled with `requestAnimationFrame`) the code measures how far the reader is through the chapter, a number from 0 to 1. That number moves the sun up from behind the mountains, fades the stars out, and blends the sky gradient between three colour keyframes (night → dawn → day) using linear RGB interpolation.
- The rays rotate slowly all the time (turned off for reduced-motion users).
- Under the stage, the three acts of the ceremony (Qorikancha → Plaza de Armas → Sacsayhuamán) light up one by one as the sun rises, and an "Amanecer %" counter shows the progress.

## 4. How La Gran Lotería works

**La Gran Lotería** is the class quiz, dressed as the Mexican Lotería card game.
- **Frontend (`loteria.js`):** the idle screen shows a fanned deck of five Lotería cards, one per chapter. "Barajar y jugar" fetches 10 cards. Each card shows a Lotería-style illustration (from `icons.js`), a card number and a Spanish card name (*La Máscara*, *El Sol*, *La Calavera*…), with four answer buttons. The score screen shows ✓/✗ for every card with the correct answer and a short explanation, and a Spanish verdict (*¡Lotería!*, *¡Muy bien!*, *¡Buen intento!*, *¡Sigue practicando!*).
- **Backend (`api/quiz.js`):** `GET /api/quiz` picks **two random cards from each of the five chapters** and **shuffles the options**, but never sends the answers. `POST /api/quiz` grades the answers on the server, so nobody can find them in the page source. If the player gave a name, the score is saved to a top-10 leaderboard (a Redis sorted set, or memory locally). `GET /api/quiz?board=1` returns the leaderboard.
- Mohit wrote the 20-card question pool after reading all five chapters, so the quiz tests every teammate's vocabulary and research.

## 5. My 25 Spanish words

These are used **inside the sentences** of my chapter, not as a separate list. On the site each one has a dotted underline. Hovering or tapping it shows the English meaning, says the word aloud with a es-PE voice, and drops a bean on my 5 × 5 Lotería board (*tabla*). Fill all 25 and the site shouts *¡Lotería!*

| # | Español | English | Where I used it |
|---|---|---|---|
| 1 | **sol** | sun | Intro |
| 2 | **montañas** | mountains | Intro |
| 3 | **solsticio** | solstice | La historia |
| 4 | **invierno** | winter | La historia |
| 5 | **tierra** | Earth | La historia |
| 6 | **cosecha** | harvest | La historia |
| 7 | **año** | year | La historia |
| 8 | **conquista** | conquest | La historia |
| 9 | **actores** | actors | El renacimiento |
| 10 | **colores** | colours | El renacimiento |
| 11 | **templo** | temple | Los tres escenarios |
| 12 | **oro** | gold | Los tres escenarios |
| 13 | **plaza** | square | Los tres escenarios |
| 14 | **hojas** | leaves | Los tres escenarios |
| 15 | **fortaleza** | fortress | Los tres escenarios |
| 16 | **piedra** | stone | Los tres escenarios |
| 17 | **chicha** | corn beer | Los tres escenarios |
| 18 | **fuego** | fire | El fuego sagrado |
| 19 | **espejo** | mirror | El fuego sagrado |
| 20 | **flautas** | flutes | El fuego sagrado |
| 21 | **tambores** | drums | El fuego sagrado |
| 22 | **cielo** | sky | El fuego sagrado |
| 23 | **maíz** | corn | La comida |
| 24 | **papas** | potatoes | La comida |
| 25 | **mesa** | table | La comida |

**Other-language words in my chapter (not counted in the 25):** *Inti* (Quechua: sun); *Raymi* (Quechua: festival); *Tawantinsuyu* (Quechua: the Inca empire, "the four regions together"); *Qorikancha* (Quechua: "golden enclosure", the Temple of the Sun); *Sapa Inca* (Quechua: "the only Inca", the emperor); *Pachamama* (Quechua: Mother Earth). They are styled differently on the site and labelled with their language, because Inti Raymi is a Quechua festival.

Run `npm run check` in the project folder to verify the count automatically.

## 6. Mi reflexión (my personal paragraph)

> I chose Inti Raymi because I wanted to know how a festival that was banned for four hundred years could come back. It survived because someone wrote it down — Garcilaso's chronicles became the script for the 1944 revival. That made me think about how fragile a culture is when one power tries to erase another. I was also surprised that the Spanish-speaking world includes millions of people whose first language is Quechua. Writing the Lotería quiz made me reread all five chapters to make fair questions, so I probably learned more vocabulary than anyone in the group. Watching the sun rise in our scroll animation, I understood why an empire would celebrate the day the light starts to return.

> ✏️ **Before submitting:** this paragraph is a draft. The personal-reflection marks are for what *you* learned and felt, so rewrite it in your own voice and add one real detail from your own experience. Edit the `reflection` field of the `inti-raymi` entry in `lib/content.js`, and the site updates automatically.

## 7. How to demo my part (2 minutes)

1. Scroll slowly through Inti Raymi: the sun rises, the sky turns gold, and the three stages light up.
2. Point out the Quechua words (dotted in a different style). They are marked as Quechua and are not counted in the 25 Spanish words.
3. Play the Lotería with a name, show the graded results, then show your name on "Los mejores".
4. Open DevTools → Network to show that the answers are not in the GET response.

## 8. How this meets the marking scheme

| Criterion | Where it shows |
|---|---|
| Effort & contribution (6) | A full researched chapter, an original interactive illustration, and a site-wide feature (La Gran Lotería — the quiz and leaderboard) |
| Creativity & originality (5) | Original SVG artwork and an interaction designed around the festival itself |
| Spanish used naturally (4) | Exactly 25 Spanish words inside real sentences, with meanings, pronunciation and a vocabulary game |
| Research depth (3) | History, how it's celebrated, food, numbers and facts, with sources listed in the chapter |
| Personal reflection (2) | "Mi reflexión", signed with my name |
