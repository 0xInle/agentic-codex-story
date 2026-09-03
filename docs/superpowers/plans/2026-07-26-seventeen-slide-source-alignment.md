# Seventeen-slide source alignment Implementation Plan

> **For agentic workers:** Execute one task at a time and preserve the existing local-only React/Vite implementation.

**Goal:** Rebuild the presentation content as the 17 ordered sections of the approved talk outline, with a concise on-screen thesis, visual diagram, and content-owned drawer script for each scene.

**Architecture:** `src/content/scenes/scenes.js` remains the registry for title, thesis, diagram labels, and tooltip copy. `src/content/speaker-notes/presenterNotes.js` owns the full presenter narrative. `PresentationVisuals` turns the registry labels into local SVG-free diagram cards or Markdown-file mockups; it makes no network requests.

**Tech stack:** React, Vite, JavaScript, Vitest, Playwright.

## Global constraints

- Keep all presentation content outside JSX.
- Use Russian terms or give an immediately understandable Russian expansion.
- Preserve local-only behavior; do not add dependencies, remote media, APIs, or TypeScript.
- Retain the current light Webzaim visual system and the existing drawer, keyboard, fullscreen, tooltip, and exit mechanics.

---

### Task 1: Establish the source-derived 17-scene content contract

**Files:**
- Modify: `src/content/scenes/scenes.js`
- Modify: `src/content/speaker-notes/presenterNotes.js`
- Test: `src/content/scenes/scenes.test.js`
- Test: `src/features/presentation/presentation.test.jsx`
- Test: `tests/e2e/presentation.spec.js`
- Test: `src/state/appReducer.test.js`
- Test: `tests/e2e/accessibility-keyboard.spec.js`
- Test: `src/features/presentation/SceneRenderer.test.jsx`
- Test: `src/features/presentation/scenes/heroEvolution.test.jsx`

**Interfaces:**
- Produces 17 ordered `scenes` records whose `presenterGuide` has three non-empty paragraphs.
- Scene 2 title is exactly `АГЕНТНАЯ РАЗРАБОТКА — ЭТО НАВЫК ПОСТРОЕНИЯ ПРОЦЕССА`.

- [x] Write failing expectations for the exact 17 IDs, order, first/second/final titles, and `1 / 17` / `17 / 17` navigation labels.
- [x] Run focused scene and presentation tests; observe their failure against the old 14-scene contract.
- [x] Replace the old scene registry with the 17 source-outline sections in the supplied order; write one concise on-screen thesis per section and source-derived presenter narrative in the drawer.
- [x] Update behaviour and E2E expectations for the new progress contract and scene-two title.
- [x] Run the focused tests again; they pass.

### Task 2: Make every source section visually explainable

**Files:**
- Modify: `src/components/diagrams/PresentationVisuals.jsx`
- Modify: `src/components/diagrams/presentationVisuals.test.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes each scene's `visualType`, `visual.labels`, and `hoverItems`.
- Produces a local, accessible visual metaphor per slide, including file mockups for repository context, `SPEC.md`, `AGENTS.md`, workflow/skills, and evidence where relevant.

- [x] Write failing visual-component expectations for the new source-aligned document visual variants.
- [x] Run the focused visual test; observe expected failure.
- [x] Add local visual variants and titles for all 17 scene types; retain hover/focus tooltip behaviour and vertical right-aligned flow where a sequence is used.
- [x] Tune only diagram CSS needed for legible two-column slides at 1280×720 and reduced motion.
- [x] Run focused visual tests and capture browser screenshots for representative process and final slides.

### Task 3: Validate the complete presentation contract

**Files:**
- Modify: `docs/implementation-progress.md`

- [x] Run `npm run test`, `npm run build`, `npm run verify`, and the focused Playwright presentation journey.
- [x] Check all 17 routes in a browser for title, one-line desktop title where feasible, local tooltip, drawer text, and no desktop-height overflow.
- [x] Record exact commands, results, known warnings, and non-product limitations in progress evidence. Do not commit because this repository has no Git metadata.
