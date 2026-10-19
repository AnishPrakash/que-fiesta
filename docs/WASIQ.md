# Wasiq — Carnaval de Barranquilla

**Group topic:** Fiestas del mundo hispano (Festivals of the Hispanic world)
**My subtopic:** Carnaval de Barranquilla, Barranquilla, Colombia, Saturday to Tuesday before Ash Wednesday
**My part of the website:** the *Carnaval de Barranquilla* chapter (research, writing, 25 Spanish words, reflection, interactive stage) **and** Papel picado garland + cut-paper hero

---

## 1. What I made

| Part | Where it is on the site | Files I own |
|---|---|---|
| Carnaval de Barranquilla chapter | Chapter "Carnaval de Barranquilla" (the first festival on the calendar) | `lib/content.js` (the `carnaval` entry) |
| Interactive stage | The illustration beside the chapter text | `public/js/stages/carnaval.js` |
| Papel picado garland + cut-paper hero | Top of the page and above the footer | `public/js/garland.js`<br>`public/js/hero.js`<br>the hero block in `public/index.html` |

## 2. My research: Carnaval de Barranquilla

**Quick facts**
- **Dónde** (Where): Barranquilla, on the Caribbean coast of Colombia
- **Cuándo** (When): Four days before Ash Wednesday (6–9 Feb 2027)
- **Desde** (Since): 19th century; first Batalla de Flores in 1903
- **UNESCO**: Masterpiece of Intangible Heritage, 2003
- **Lema** (motto): *"Quien lo vive es quien lo goza"*, Those who live it are those who enjoy it

**What my chapter covers**
- **La historia** (The story)
- **Cómo se vive** (How it is lived)
- **Los personajes** (The characters)
- **La música** (The music)
- **La comida** (The food)
- **¿Sabías que…?** (Did you know?)

**Sources I used**
- [Barranquilla Carnival — Wikipedia](https://en.wikipedia.org/wiki/Barranquilla_Carnival)
- [Batalla de Flores cumple 120 años — Radio Nacional de Colombia](https://radionacional.co/cultura/ferias-y-fiestas/carnaval-de-barranquilla-batalla-de-flores-cumple-120-anos)

All text in the chapter was written in our own words from these sources (nothing copy-pasted), and every drawing is an original SVG illustration.

## 3. How my interactive stage works

**The Marimonda stage.** A hand-drawn SVG Marimonda (the long-nosed carnival mask) on a sunburst of the carnival's red, green, blue and yellow.
- **Eyes that follow you:** on every pointer move, the code measures the vector from each eye's centre to the cursor (converted into SVG units), caps it at 17 units, and moves the pupil along it with a `translate`.
- **Confetti on click:** each click creates 34 small `<span>` pieces at the click point and animates them with the Web Animations API (`element.animate`). They fly outwards, fall with "gravity" (a three-keyframe path), spin and fade, then delete themselves.
- **Character tabs:** an accessible ARIA tablist (Marimonda, Torito, Garabato, Congo) that swaps the description underneath.

## 4. How Papel picado garland works

**The site's signature: papel picado.**
- **Garland (`garland.js`):** a string of cut-paper flags across the top of the hero and the footer. Each flag is an SVG `<mask>`: a white flag shape with a fringed (zig-zag) bottom, minus black "cut" shapes (flowers, nested diamonds, eight-point stars, little suns, calavera eyes). The flags hang from a curved string (quadratic Bézier swags), and each one swings on a **damped spring**. Moving the pointer near the string gives nearby flags an impulse proportional to the pointer's speed, and a gentle "breeze" sine wave keeps them moving. The animation pauses when the garland is off-screen (IntersectionObserver) and is switched off for users who prefer reduced motion.
- **Cut-paper hero (`hero.js`):** the title "¡Qué fiesta!" is not text on a banner. It is **cut out of** the banner. The pink paper is an SVG path with a fringed bottom edge, and the letters, a diamond lace row, corner rosettes and leaf sprigs are holes in its mask. Behind it, a `<canvas>` drops confetti and marigold petals that you see *through* the letters. The banner also tilts slightly toward the pointer and drops in on load with a spring animation.

## 5. My 25 Spanish words

These are used **inside the sentences** of my chapter, not as a separate list. On the site each one has a dotted underline. Hovering or tapping it shows the English meaning, says the word aloud with a es-CO voice, and drops a bean on my 5 × 5 Lotería board (*tabla*). Fill all 25 and the site shouts *¡Lotería!*

| # | Español | English | Where I used it |
|---|---|---|---|
| 1 | **calle** | street | Intro |
| 2 | **fiesta** | party | Intro |
| 3 | **carnaval** | carnival | La historia |
| 4 | **batalla** | battle | La historia |
| 5 | **flores** | flowers | La historia |
| 6 | **paz** | peace | La historia |
| 7 | **reina** | queen | Cómo se vive |
| 8 | **bando** | decree | Cómo se vive |
| 9 | **comparsas** | dance troupes | Cómo se vive |
| 10 | **viudas** | widows | Cómo se vive |
| 11 | **disfraz** | costume | Los personajes |
| 12 | **máscara** | mask | Los personajes |
| 13 | **toro** | bull | Los personajes |
| 14 | **muerte** | death | Los personajes |
| 15 | **vida** | life | Los personajes |
| 16 | **cumbia** | cumbia, Colombia's signature rhythm | La música |
| 17 | **tambores** | drums | La música |
| 18 | **bailar** | dance | La música |
| 19 | **arepa** | corn cake | La comida |
| 20 | **huevo** | egg | La comida |
| 21 | **agua** | water | La comida |
| 22 | **coco** | coconut | La comida |
| 23 | **cerveza** | beer | La comida |
| 24 | **rey** | king | ¿Sabías que? |
| 25 | **alegría** | joy | ¿Sabías que? |

Run `npm run check` in the project folder to verify the count automatically.

## 6. Mi reflexión (my personal paragraph)

> Before this project I thought carnival meant Brazil. Researching Barranquilla showed me a celebration built by people who were enslaved and pushed aside, who used masks and jokes to laugh at the people in power. The Marimonda stayed with me most: a costume that is basically a protest you can dance in. Making the papel picado garland and the cut-paper title for our site made me notice how much craft goes into decorations that only last a few days. I felt that the motto is true even through a screen — you understand a fiesta by joining in, not by reading about it.

> ✏️ **Before submitting:** this paragraph is a draft. The personal-reflection marks are for what *you* learned and felt, so rewrite it in your own voice and add one real detail from your own experience. Edit the `reflection` field of the `carnaval` entry in `lib/content.js`, and the site updates automatically.

## 7. How to demo my part (2 minutes)

1. Open the site, move the mouse quickly across the garland, and the flags swing.
2. Point out that the title letters are holes: the confetti is visible through them.
3. Scroll to Carnaval. Move the mouse and the Marimonda watches you. Click to throw confetti, then switch the character tabs.
4. Hover your Spanish words and watch beans drop on your tabla.

## 8. How this meets the marking scheme

| Criterion | Where it shows |
|---|---|
| Effort & contribution (6) | A full researched chapter, an original interactive illustration, and a site-wide feature (Papel picado garland + cut-paper hero) |
| Creativity & originality (5) | Original SVG artwork and an interaction designed around the festival itself |
| Spanish used naturally (4) | Exactly 25 Spanish words inside real sentences, with meanings, pronunciation and a vocabulary game |
| Research depth (3) | History, how it's celebrated, food, numbers and facts, with sources listed in the chapter |
| Personal reflection (2) | "Mi reflexión", signed with my name |
