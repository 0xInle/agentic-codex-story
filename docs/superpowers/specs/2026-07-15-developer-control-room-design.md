# Developer Control Room Visual Refinement

## Purpose

Transform the current functional HTML-like shell into a local, accessible developer-control-room experience without changing product scope, content ownership, routes, or local-only capability boundaries.

## Visual system

- Canvas: near-black background with a subtle static grid and no remote assets.
- Surfaces: navy panels, raised translucent panels, 1px cool borders, measured cyan and purple accents.
- Typography: system sans for reading and local monospace stack for commands, files, statuses, and diagrams.
- Status: text and icon/shape accompany color; cyan is active process, purple is coordination, green is verified, amber is approval, red is risk.
- Motion: short transitions only for interaction and active-scene emphasis; reduced-motion mode removes nonessential movement.

## Layout

- App shell has a constrained reading width and a sticky translucent chapter bar.
- Chapter navigation renders compact, wrapping or horizontally scrollable pills; it must never become an unspaced link stream.
- Every scene is a bordered operational surface with eyebrow, title, thesis, state marker, and content region.
- Hero is a responsive two-column command-center: narrative/CTA column plus Context → Agent → Tools → Verify process card.
- Evolution is a timeline and comparison surface with text labels, ordering, and non-color status indicators.

## Delivery order

1. Establish shared layout, surfaces, navigation, focus, and spacing rules.
2. Refine Hero and Evolution as visual reference scenes.
3. Apply the shared language to remaining scene families without changing their content contracts.
4. Verify laptop/mobile layout, keyboard focus, reduced motion, browser rendering, and no console errors.

## Constraints

- JavaScript and React/Vite only; no TypeScript, backend, remote fonts, runtime network dependency, or production API calls.
- Product content remains in `src/content`; speaker notes remain outside JSX.
- The existing routes and local deterministic simulation remain intact.
- Existing semantic headings, links, buttons, and reduced-motion guarantees are preserved or improved.

## Acceptance signals

- The Explore page visibly reads as an intentional control-room interface rather than unstyled document content.
- Navigation remains readable at laptop and mobile widths.
- Hero and Evolution communicate their concepts through structured visual composition, not only paragraphs and lists.
- `npm run lint`, focused component tests, build, and browser inspection pass before each refinement package is accepted.
