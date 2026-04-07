# loc_ guide

An opinionated city guide. Not a list of everything — a short list of things worth your time, written by someone who spent enough time in each city to have opinions.

Currently covering **Barcelona** and **Istanbul**.

Each city page includes field notes on places (food, coffee, bars, culture), walking routes with a timeline format, a local lexicon, and the unwritten rules for navigating the city like a person rather than a tourist.

---

## Stack

- **Astro** — static site generator
- **React** — interactive components (SpotGrid, SpotModal, StickyNav)
- **TypeScript** — throughout
- Content stored as JSON in `src/content/cities/`

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build locally |

## Adding a City

1. Add `src/content/cities/{slug}.json` following the schema in `src/content.config.ts`
2. Add processed images to `public/images/{slug}/`
3. Source photos go in `src/pics/{slug}/` — use scripts in `scripts/` to convert to WebP
