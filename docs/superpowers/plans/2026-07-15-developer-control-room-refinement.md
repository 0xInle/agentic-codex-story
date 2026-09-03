# Developer Control Room Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the functional local story shell into an accessible developer-control-room interface without changing content, routes, or local-only capability boundaries.

**Architecture:** Keep content and state contracts unchanged. Establish visual primitives in CSS and navigation/scene-shell components first, then refine Hero and Evolution as reference scenes, then apply the shared surfaces to the remaining scene renderer path.

**Tech Stack:** React 19, Vite 6, JavaScript, CSS custom properties, Vitest, React Testing Library, local browser verification.

## Global Constraints

- JavaScript and `.jsx` only; no TypeScript.
- No backend, remote fonts, external runtime APIs, analytics, or remote presentation capability.
- Content remains in `src/content`; speaker notes never move into JSX.
- Preserve local routes, keyboard semantics, reduced-motion behavior, and deterministic simulation.
- Use TDD for deterministic interactive behavior and run the task-specific checks before completion.
- Do not modify files outside the active task scope.

---

## File map

| File | Responsibility |
|---|---|
| `src/styles/tokens.css` | colour, spacing, typography, shadow, grid and responsive tokens |
| `src/styles/global.css` | canvas, shell, surface, button/link, responsive and focus rules |
| `src/components/navigation/ChapterNav.jsx` | semantic chapter-pill navigation |
| `src/components/navigation/SceneFrame.jsx` | shared operational scene surface |
| `src/features/explore/ExplorePage.jsx` | constrained control-room Explore shell |
| `src/features/presentation/scenes/HeroScene.jsx` | two-column command-center opening |
| `src/features/presentation/scenes/EvolutionScene.jsx` | timeline/comparison reference scene |
| `src/features/presentation/scenes/*.test.jsx` | component contracts for visual structure and accessible affordances |
| `docs/browser-verification.md` | laptop/mobile visual evidence |

### Task 1: Establish the control-room CSS foundation

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/motion.css`
- Modify: `src/features/explore/ExplorePage.jsx`
- Test: `src/test/smoke.test.jsx`

**Interfaces:**
- Produces CSS classes `.app-shell`, `.control-surface`, `.chapter-pill`, `.scene-frame`, `.eyebrow`, `.button-primary`.

- [ ] Write a failing smoke assertion that Explore has an `app-shell` landmark and a `control-surface`.
- [ ] Run `npm run test -- src/test/smoke.test.jsx`; expect failure because these class names are absent.
- [ ] Add the `app-shell` class to the Explore main landmark and the `control-surface` class to its story identity block.
- [ ] Add tokens for grid colour, panel shadow, max content width, display scale and tablet/mobile spacing.
- [ ] Add static grid background, surface elevation, responsive content width, visible focus, primary action and reduced-motion-safe transitions.
- [ ] Run `npm run test -- src/test/smoke.test.jsx`, `npm run lint`, and `npm run build`; expect PASS with no lint errors.

### Task 2: Rebuild Explore navigation and scene shell

**Files:**
- Modify: `src/components/navigation/ChapterNav.jsx`, `src/components/navigation/SceneFrame.jsx`, `src/features/explore/ExplorePage.jsx`, `src/features/explore/ExplorePage.test.jsx`, `src/components/navigation/navigation.test.jsx`

**Interfaces:**
- Consumes `scenes` records.
- Produces `.chapter-pill` links and `.scene-frame` sections with `data-active`.

- [ ] Write failing tests that navigation has one named region, each chapter link has a pill class, and the active scene has a visible state class.
- [ ] Run `npm run test -- src/features/explore src/components/navigation`; expect failure.
- [ ] Render an app-shell header, story identity eyebrow, primary CTA, chapter pills and framed scenes without changing scene IDs or hrefs.
- [ ] Run `npm run test -- src/features/explore src/components/navigation`, `npm run lint`, and `npm run build`; expect PASS.

### Task 3: Create Hero command-center reference scene

**Files:**
- Modify: `src/features/presentation/scenes/HeroScene.jsx`, `src/features/presentation/scenes/heroEvolution.test.jsx`

**Interfaces:**
- Consumes `SceneRendererProps`.
- Produces `hero-command-center`, `hero-process-card`, two route CTA links and text-labelled process stages.

- [ ] Write failing tests for a labelled process card, the five stage labels, two CTA hrefs and no colour-only status meaning.
- [ ] Run `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx`; expect failure.
- [ ] Implement a two-column hero: narrative/CTA panel plus structured Context → Agent → Tools → Verify → Human process card.
- [ ] Run the focused test, `npm run validate:content`, and `npm run build`; expect PASS.

### Task 4: Create Evolution timeline reference scene

**Files:**
- Modify: `src/features/presentation/scenes/EvolutionScene.jsx`, `src/features/presentation/scenes/heroEvolution.test.jsx`, `src/styles/global.css`

**Interfaces:**
- Consumes `SceneRendererProps`.
- Produces `evolution-timeline` and `evolution-comparison` with five ordered stages and seven labelled dimensions.

- [ ] Write failing tests for timeline and comparison surface classes, ordered labels and reduced-motion-safe static rendering.
- [ ] Run `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx`; expect failure.
- [ ] Implement numbered timeline nodes, text-labelled comparison matrix and responsive stacking.
- [ ] Run focused test, `npm run lint`, and `npm run build`; expect PASS.

### Task 5: Apply shared operational surfaces to all renderer paths

**Files:**
- Modify: `src/features/presentation/scenes/SharedSceneElements.jsx`, `src/features/presentation/SceneRenderer.jsx`, `src/features/presentation/SceneRenderer.test.jsx`, `src/features/presentation/PresentationPage.jsx`, `src/styles/global.css`

**Interfaces:**
- Consumes `SceneRendererProps`.
- Produces a consistent eyebrow/thesis/limitation/action surface in Explore and Presentation.

- [ ] Write failing tests confirming shared surface classes appear in Explore and Presentation and missing renderers remain accessible alerts.
- [ ] Run `npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/explore`; expect failure.
- [ ] Add shared surface metadata and active-mode styling hooks without moving content into components.
- [ ] Run focused tests, `npm run validate:content`, and `npm run build`; expect PASS.

### Task 6: Browser, responsive and accessibility visual acceptance

**Files:**
- Create: `docs/browser-verification.md`
- Modify: `src/styles/global.css`, `src/styles/motion.css`, `src/features/explore/ExplorePage.jsx`, `src/features/explore/ExplorePage.test.jsx`

**Interfaces:**
- Produces browser evidence rows with `{ surface, viewport, focus, overflow, console, result }`.

- [ ] Write a failing component assertion that Explore retains an accessible primary heading and CTA at narrow layout.
- [ ] Run `npm run test -- src/features/explore`; expect failure if responsive shell semantics regress.
- [ ] Add only the breakpoint fixes demonstrated by browser inspection: pill overflow, scene padding, hero stacking and long Russian text wrapping.
- [ ] Inspect laptop and mobile Explore in a browser; record focus, overflow and console results in `docs/browser-verification.md`.
- [ ] Run `npm run test -- src/features/explore`, `npm run lint`, `npm run validate:content`, and `npm run build`; expect PASS.

## Self-review

- Coverage: tasks cover the approved control-room canvas, navigation, scene surfaces, Hero, Evolution, reduced motion, responsive layout, keyboard/focus and browser evidence.
- No product scope is added: no API, backend, external asset or content-contract change is planned.
- Contracts stay consistent: every refined renderer keeps `SceneRendererProps`; content stays in registries.
- Placeholder scan: no incomplete task marker or unspecified implementation step is used.
