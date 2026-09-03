# Dense Landing Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove landing-only helper text, reduce Hero height and fill all delivery-map rows without desktop scrolling.

**Architecture:** Keep the Hero's source content and delivery-map DOM stable. Use `landing` as the one rendering distinction and CSS grid track spans for the dense 5→4→4 map.

**Tech Stack:** React, Vite, JavaScript/JSX, CSS, Vitest, Playwright.

## Global Constraints

- JavaScript/JSX only; do not install packages.
- Keep all card content in `src/content/roadmap/roadmap.js`.
- Preserve slide content and the accessible map/list contracts.
- Preserve reduced-motion and mobile behavior.
- Do not commit: this workspace is not a Git repository.

### Task 1: Make the landing Hero and map dense without losing semantic contracts

**Files:**
- Modify: `src/features/presentation/scenes/HeroScene.jsx`
- Modify: `src/features/presentation/scenes/heroEvolution.test.jsx`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/explore.spec.js`
- Modify: `tests/e2e/responsive.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Consumes: `HeroScene({ scene, landing })` and the existing thirteen `.delivery-map-item` nodes.
- Produces: landing Hero without `.hero-limit`, unchanged slide Hero with `.hero-limit`, and a dense CSS 5→4→4 map that has no desktop document overflow at 1280 × 800 or 1920 × 800.

- [ ] **Step 1: Add failing behavior tests**

Add a Hero unit assertion for `landing` that the misconception text is absent; retain the existing non-landing test that proves the Hero still renders. Extend landing E2E to assert the phrase is absent and add the 1920 × 800 no-vertical-overflow check.

- [ ] **Step 2: Run RED**

```bash
npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js --project=chromium --workers=1
```

Expected: the new landing assertion fails because the current landing Hero renders the misconception; the 1920 × 800 overflow assertion documents the current issue where applicable.

- [ ] **Step 3: Implement the minimum visual correction**

Render the misconception only when `landing` is false. Tighten landing-only Hero dimensions in `global.css`. Change the map grid to twenty tracks, giving cards 1–5 four-track spans and cards 6–13 five-track spans. Explicitly place the reverse middle row and forward final row without empty grid cells. Keep connectors, mobile overrides and reduced-motion rules.

- [ ] **Step 4: Run GREEN and complete checks**

```bash
npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx src/features/explore/DeliveryRoadmap.test.jsx
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1
npm run verify
```

Inspect `http://localhost:5173/` at 1920 × 800. Confirm that the full Hero/map is visible, the lower rows fill their width, and normal-motion connectors remain active. Record factual results, known warnings and the pending final human acceptance status in progress.

- [ ] **Step 5: Commit**

Do not run a commit command because `git status` reports that this directory is not a Git repository.

## Self-review

- Scope coverage: landing copy, Hero density, map density, desktop fit, responsive fallback, accessibility, test and browser verification are all in Task 1.
- Placeholder scan: no placeholders appear.
- Contract consistency: the `landing` prop and existing map DOM are preserved; only rendering condition and CSS placement change.
