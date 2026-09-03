# Compact Delivery Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the landing page's verbose grouped roadmap with a compact, animated thirteen-step delivery map that fits with the hero at 1280 × 800.

**Architecture:** `DeliveryRoadmap` flattens the existing content-owned groups into one ordered semantic list without altering the content data. CSS supplies the five/four/four desktop map, its decorative connections, responsive reflow, compact landing hero, and reduced-motion fallback.

**Tech Stack:** React 19, Vite, JavaScript/JSX, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- JavaScript and JSX only; do not add TypeScript or packages.
- Keep the thirteen cards and their copy in `src/content/roadmap/roadmap.js`.
- Do not add routes, network calls, backend behavior, or non-local assets.
- Animated connectors are decorative and must be hidden from assistive technology.
- Preserve the landing CTA, all slide routes, fullscreen support, and responsive readable fallback.
- Keep the landing document unscrolled at a 1280 × 800 desktop viewport; allow natural vertical reflow at narrow or low-height viewports.
- Record real checks and limitations in `docs/implementation-progress.md`; do not commit because this directory has no Git repository.

---

## File structure

- `src/features/explore/DeliveryRoadmap.jsx` — derives the linear delivery sequence and renders one accessible map/list.
- `src/features/explore/DeliveryRoadmap.test.jsx` — component contract for no visible headings, process order, card count and decorative connectors.
- `src/styles/global.css` — compact hero/map visual layout, animated routes, responsive and reduced-motion styles.
- `tests/e2e/explore.spec.js` — presentation CTA and compact-map journey assertion.
- `tests/e2e/responsive.spec.js` — 1280 × 800 no-document-scroll assertion and existing responsive overflow checks.
- `docs/implementation-progress.md` — factual TDD, test, browser, and limitation evidence.

### Task 1: Render and verify the compact delivery map

**Files:**
- Modify: `src/features/explore/DeliveryRoadmap.jsx`
- Modify: `src/features/explore/DeliveryRoadmap.test.jsx`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/explore.spec.js`
- Modify: `tests/e2e/responsive.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Consumes: `deliveryRoadmapGroups` from `src/content/roadmap/roadmap.js`, whose flattened sequence contains thirteen uniquely identified steps.
- Produces: `DeliveryRoadmap({ groups = deliveryRoadmapGroups })`, a `<section aria-label="Путь от идеи до локального release">` containing one ordered list `.delivery-roadmap-map`; each `li` has the existing number/copy and every non-final item owns one `.delivery-connector[aria-hidden="true"]`.

- [ ] **Step 1: Write the failing component and browser expectations**

Replace the grouped component test with the compact-map contract:

```jsx
render(<DeliveryRoadmap />);
expect(screen.getByRole('region', { name: 'Путь от идеи до локального release' })).toBeInTheDocument();
expect(screen.queryByRole('heading')).not.toBeInTheDocument();
expect(screen.getAllByRole('list')).toHaveLength(1);
expect(screen.getAllByRole('listitem')).toHaveLength(13);
expect(screen.getAllByRole('listitem').at(0)).toHaveTextContent('Идея');
expect(screen.getAllByRole('listitem').at(-1)).toHaveTextContent('Release');
expect(document.querySelectorAll('[aria-hidden="true"].delivery-connector')).toHaveLength(12);
```

Add Playwright assertions that the region exists on `/`, it contains thirteen list items, and at a `1280 × 800` viewport `document.documentElement.scrollHeight <= window.innerHeight` while horizontal overflow remains absent.

- [ ] **Step 2: Run the focused tests to observe RED**

Run:

```bash
npm run test -- src/features/explore/DeliveryRoadmap.test.jsx
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js --project=chromium --workers=1
```

Expected: the component contract fails because the current output has a visible heading, three lists and group headings; the E2E compact-map/viewport assertion fails because it has not been implemented.

- [ ] **Step 3: Render one map and apply the compact map CSS**

In `DeliveryRoadmap.jsx`, flatten `groups` in input order, render one named section and one `<ol className="delivery-roadmap-map">`, and add the existing index/copy to each card. Do not render group titles or a visible map heading. Render a hidden decorative connector after each non-final card and add a turn modifier after cards five and nine.

In `global.css`, compact the landing shell/hero at desktop sizes and create a five-column map grid; force card ten to a new third row so the sequence becomes five/four/four. Style cards compactly, route segments as glowing dotted lines, and row turns as connectors. Preserve a single-column readable mobile fallback. Put all connector animation under the existing reduced-motion static fallback.

- [ ] **Step 4: Run focused tests to prove GREEN**

Run:

```bash
npm run test -- src/features/explore/DeliveryRoadmap.test.jsx src/content/roadmap/roadmap.test.js
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js --project=chromium --workers=1
```

Expected: both unit/component test files pass; Chromium confirms the presentation entry, thirteen-card map, no horizontal overflow and no desktop document scroll at 1280 × 800.

- [ ] **Step 5: Perform accessibility, browser and technical verification**

Run:

```bash
npm run test:e2e -- tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1
npm run verify
```

Inspect `/` in the local browser at 1280 × 800: verify the entire hero/map is visible without page scroll, card text remains readable, the lines animate, and reduced-motion behavior remains covered by the existing browser test. Record actual command output, visual observation, no-Git state, and any non-blocking known warning in progress.

- [ ] **Step 6: Update completion evidence**

In `docs/implementation-progress.md`, append a dated user-authorized compact-map record under Task 49 without changing its blocked human-acceptance status. Include RED/ GREEN output, browser result, `npm run verify`, and the limitation that human final product sign-off remains pending.

- [ ] **Step 7: Commit**

Do not run a commit command: `git status` must first report an initialized repository, and this workspace does not have one.

## Self-review

- Scope coverage: one task covers compact hero, thirteen content-owned cards, five/four/four map, no headings/group labels, animated decorative flow, reduced motion, desktop viewport fit, responsive fallback, tests, browser review and evidence.
- Placeholder scan: no placeholders or deferred implementation language appears in this plan.
- Contract consistency: the component's `groups` input remains unchanged; flattening creates the thirteen-item ordered list expected by tests and E2E.
