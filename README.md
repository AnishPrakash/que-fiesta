# ¡Qué Fiesta! — Un año de fiestas hispanas

Spanish Digital Assignments II & III: *Creative Exploration of the Hispanic World*.
**Topic: Festivals.** Five festivals, one calendar year, one member each.

| Member | Festival | Also built |
|---|---|---|
| Wasiq | Carnaval de Barranquilla 🇨🇴 | Papel picado garland + cut-paper hero |
| Sravan | Las Fallas 🇪🇸 | La Rueda del Año (calendar wheel) |
| Mohit | Inti Raymi 🇵🇪 | La Gran Lotería (quiz + leaderboard) |
| Tanmay | La Tomatina 🇪🇸 | Libro de visitas + live tomato counter |
| Anish | Día de Muertos 🇲🇽 | Backend API + Vercel deployment |

## Run it

```bash
npm run dev      # → http://localhost:3000   (no npm install needed)
npm run check    # verifies 25 Spanish words per member
```

Full local-testing and Vercel instructions: **[docs/DEPLOY.md](docs/DEPLOY.md)**.
What each member did and how: **[docs/](docs/)** (`ANISH.md`, `TANMAY.md`, `WASIQ.md`, `SRAVAN.md`, `MOHIT.md`).

## Stack
Vanilla HTML/CSS/JS frontend with original SVG illustrations, canvas particle effects and the Web Audio and Web Speech APIs. Node serverless functions on Vercel, with optional Upstash Redis for persistence. Self-hosted fonts (Shrikhand + Recursive). Zero dependencies.
