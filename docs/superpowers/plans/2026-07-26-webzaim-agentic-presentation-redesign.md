# WebZaim Agentic Presentation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy 17-scene presentation with the approved 14-scene practical story, using the WebZaim dark-graphite visual system while preserving local-only, accessible presentation behavior.

**Architecture:** The source of truth stays data-first: scenes, local explanations, tooltip copy, and speaker prose are stored under `src/content`. A single generic scene renderer consumes a small set of declarative visual variants instead of spreading content through JSX. The existing presentation shell continues to own route navigation, keyboard support, fullscreen fallback, and the speaker-text drawer.

**Tech Stack:** React 19, Vite, JavaScript/JSX, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- JavaScript and JSX only; do not add TypeScript.
- No backend, analytics, external runtime API calls, real Codex/MCP calls, secrets, or unsafe HTML.
- All audience content lives in `src/content`; full speaker copy lives only in `src/content/speaker-notes`.
- Use a locally hosted, OFL-licensed Manrope font; do not download or serve unlicensed Gilroy or remote webfonts.
- Extract and use the supplied WebZaim wordmark unchanged; do not recreate a logo.
- The public journey is only landing → presentation. Do not expose Speaker mode, Explore controls, scene map, deep dives, FAQ, or glossary.
- Tooltips must be pointer- and keyboard-accessible, positioned as overlays without moving layout, and explain the local target.
- Preserve keyboard navigation, fullscreen progressive enhancement, `prefers-reduced-motion`, and `npm run verify` as the final technical gate.

---

## File structure and responsibilities

| File | Responsibility |
|---|---|
| `public/brand/webzaim-wordmark-white.png` | Verbatim WebZaim mark extracted from the supplied brand book for dark surfaces. |
| `public/fonts/Manrope-*.woff2` | Local licensed type assets. |
| `src/content/scenes/scenes.js` | Ordered 14-scene registry: root idea, cue, visual data, local tooltip copy, and accessibility metadata. |
| `src/content/speaker-notes/presenterNotes.js` | Three to four presenter paragraphs per scene, independent of JSX. |
| `src/components/diagrams/PresentationVisuals.jsx` | Declarative visual variants: route, comparison, file tree, contract, evidence, roles, and permission rings. |
| `src/components/diagrams/InteractiveDiagram.jsx` | Reusable hover/focus/pin tooltip behavior. |
| `src/features/presentation/*` | Presentation header, generic scene frame, drawer, controls, routing interaction. |
| `src/features/explore/ExplorePage.jsx` | Minimal landing only, despite legacy folder name. |
| `src/styles/{tokens,global,motion}.css` | Brand tokens, layout, typography, route motion, responsive and reduced-motion rules. |
| Focused `*.test.*` and `tests/e2e/presentation.spec.js` | Data contracts, interaction, accessibility, visual geometry, and audience journey. |

## Task 1: Add brand assets and token contracts

**Files:**
- Create: `public/brand/webzaim-wordmark-white.png`
- Create: `public/fonts/Manrope-Regular.woff2`
- Create: `public/fonts/Manrope-SemiBold.woff2`
- Create: `public/fonts/Manrope-Bold.woff2`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Test: `src/test/performancePolicies.test.jsx`

**Interfaces:**
- Produces `--wz-aqua`, `--wz-aquamarine`, `--wz-blue`, `--wz-graphite`, `--wz-alice` and a `--font-sans` beginning with `Manrope`.
- Produces local `/fonts/Manrope-*.woff2` declarations and `/brand/webzaim-wordmark-white.png` used by later components.

- [ ] **Step 1: Add a failing local-asset policy assertion.**

```js
expect(document.head.querySelectorAll('link[href*="fonts.googleapis"]')).toHaveLength(0);
expect(getComputedStyle(document.documentElement).getPropertyValue('--font-sans')).toContain('Manrope');
```

- [ ] **Step 2: Run the focused policy test and observe the missing Manrope contract.**

Run: `npm run test -- src/test/performancePolicies.test.jsx`

- [ ] **Step 3: Download the official OFL Manrope webfont assets, extract the supplied white wordmark, and add the exact token/font-face declarations.**

```css
@font-face { font-family: 'Manrope'; src: url('/fonts/Manrope-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
:root { --wz-aqua: #007dee; --wz-aquamarine: #00e5ba; --wz-blue: #14b2c6; --wz-graphite: #2a3346; --wz-alice: #daeeff; --font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
```

- [ ] **Step 4: Rerun focused policy test and build.**

Run: `npm run test -- src/test/performancePolicies.test.jsx && npm run build`

Expected: PASS; the build emits no remote-font dependency.

## Task 2: Replace the content registry and speaker copy with the 14-scene narrative

**Files:**
- Modify: `src/content/scenes/scenes.js`
- Modify: `src/content/scenes/scenes.test.js`
- Modify: `src/content/speaker-notes/presenterNotes.js`
- Test: `src/content/scenes/scenes.test.js`
- Test: `src/lib/contentValidation.test.js`

**Interfaces:**
- Produces exactly 14 scenes with ids: `presentation-feature`, `process-design`, `context-recovery`, `durable-rules`, `bounded-feature`, `repository-map`, `narrow-context`, `feature-spec`, `brief-to-proof`, `proof`, `role-separation`, `independent-review`, `bounded-tools`, `feedback-loop`.
- Every scene exposes `{ id, order, title, subtitle, screenThesis, visualType, visual, hoverItems, accessibility, presenterGuide }`.
- `presenterGuide.paragraphs` contains the non-empty speaker script supplied by `presenterNotesBySceneId[id]`.

- [ ] **Step 1: Write failing registry expectations for the 14 ids, their order, all root ideas and non-empty local tooltip copy.**

```js
expect(scenes.map(({ id }) => id)).toEqual(['presentation-feature', 'process-design', /* … */ 'feedback-loop']);
expect(scenes).toHaveLength(14);
expect(scenes.every((scene) => scene.hoverItems.every(({ label, description }) => label && description))).toBe(true);
```

- [ ] **Step 2: Run content tests and observe the old 17-scene registry failure.**

Run: `npm run test -- src/content/scenes/scenes.test.js src/lib/contentValidation.test.js`

- [ ] **Step 3: Replace scene definitions and speaker notes with the approved 14-scene content; keep all explanatory prose in `presenterNotes.js`.**

```js
['presentation-feature', 'Эта презентация — тоже фича', 'Агент помог собрать её за несколько коротких запросов.', 'Идея → контекст → реализация → проверенный результат', 'feature-route']
```

- [ ] **Step 4: Rerun content tests and the repository content validator.**

Run: `npm run test -- src/content/scenes/scenes.test.js src/lib/contentValidation.test.js && npm run validate:content`

Expected: PASS; no scene describes a simulated capability as a real action.

## Task 3: Implement generic branded visuals and reliable tooltips

**Files:**
- Modify: `src/components/diagrams/PresentationVisuals.jsx`
- Modify: `src/components/diagrams/InteractiveDiagram.jsx`
- Modify: `src/components/diagrams/presentationVisuals.test.jsx`
- Modify: `src/components/diagrams/diagrams.test.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- `PresentationVisuals({ scene })` renders the declared scene visual without embedded presentation copy.
- `InteractiveDiagram({ label, items })` exposes `role="tooltip"` only for its focused, hovered, or pinned source; overlay positioning remains inside `.diagram-item`.
- Supports `feature-route`, `altitude-bands`, `recovery-loop`, `knowledge-route`, `scope-contrast`, `repository-tree`, `context-spotlight`, `feature-contract`, `delivery-route`, `evidence-board`, `role-handoff`, `review-verdict`, `permission-rings`, and `feedback-loop`.

- [ ] **Step 1: Add failing visual tests for a tree, a delivery route and a tooltip with scene-specific text.**

```jsx
render(<PresentationVisuals scene={repositoryMapScene} />);
expect(screen.getByText('src/content/speaker-notes/')).toBeVisible();
fireEvent.focus(screen.getByRole('button', { name: 'AGENTS.md' }));
expect(screen.getByRole('tooltip')).toHaveTextContent('правила работы в этом репозитории');
```

- [ ] **Step 2: Run visual tests and observe unsupported-visual failures.**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx src/components/diagrams/diagrams.test.jsx`

- [ ] **Step 3: Implement visual variants with semantic lists/sections and overlay-only tooltip positioning.**

```jsx
<div className="diagram-item">
  <button className="diagram-node" onFocus={() => setActiveId(item.id)}>{item.label}</button>
  {activeItem?.id === item.id ? <p className="diagram-popover" role="tooltip">{item.description}</p> : null}
</div>
```

- [ ] **Step 4: Add graphite/aqua route styles, `position: absolute` popovers centered over sources, and reduced-motion route fallback.**

```css
.diagram-popover { position: absolute; left: 50%; bottom: calc(100% + .75rem); transform: translateX(-50%); }
@media (prefers-reduced-motion: reduce) { .feature-route__signal { animation: none; } }
```

- [ ] **Step 5: Rerun visual tests.**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx src/components/diagrams/diagrams.test.jsx`

Expected: PASS; tooltips do not append a normal-flow panel.

## Task 4: Recompose landing and presentation shell around the new story

**Files:**
- Modify: `src/features/explore/ExplorePage.jsx`
- Modify: `src/features/presentation/scenes/StoryScene.jsx`
- Modify: `src/features/presentation/PresentationPage.jsx`
- Modify: `src/features/presentation/PresenterGuide.jsx`
- Modify: `src/features/presentation/presentation.test.jsx`
- Modify: `src/features/presentation/SceneRenderer.test.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Landing renders only the wordmark, compact route preview, root project statement, and link to `/present/presentation-feature`.
- Presentation header exposes `ВебЗайм · Агентная разработка` and a `1 / 14`-style live counter.
- Drawer remains `role="dialog"`, opens from “Текст доклада”, and closes by close action, Escape, and backdrop click with focus returned to its trigger.

- [ ] **Step 1: Add failing component expectations for the 14-scene header, branded landing CTA and drawer focus restoration.**

```jsx
expect(screen.getByText('ВебЗайм · Агентная разработка')).toBeVisible();
expect(screen.getByText('1 / 14')).toBeVisible();
await user.click(screen.getByRole('button', { name: 'Текст доклада' }));
await user.keyboard('{Escape}');
expect(screen.getByRole('button', { name: 'Текст доклада' })).toHaveFocus();
```

- [ ] **Step 2: Run focused presentation tests and observe the legacy title/count behavior.**

Run: `npm run test -- src/features/presentation/presentation.test.jsx src/features/presentation/SceneRenderer.test.jsx`

- [ ] **Step 3: Update the generic scene frame, landing and shell without surfacing legacy modes or primary-flow content.**

```jsx
<img className="webzaim-wordmark" src="/brand/webzaim-wordmark-white.png" alt="ВебЗайм" />
<p className="eyebrow">ВебЗайм · Агентная разработка</p>
```

- [ ] **Step 4: Make the speaker drawer accessible and restore focus to the opening control on any close path.**

- [ ] **Step 5: Rerun focused tests.**

Run: `npm run test -- src/features/presentation/presentation.test.jsx src/features/presentation/SceneRenderer.test.jsx`

Expected: PASS; no Speaker/Explore/deep-dive control is visible on the landing or presentation.

## Task 5: Verify the complete audience journey and visual constraints

**Files:**
- Modify: `tests/e2e/presentation.spec.js`
- Modify: `tests/e2e/accessibility-keyboard.spec.js`
- Modify: `src/test/accessibility.test.jsx`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- E2E journey: `/` → `/present/presentation-feature` → keyboard next → tooltip → drawer close → fullscreen fallback → exit.
- Documents factual local verification evidence; no claim of a real external agent, service, or API.

- [ ] **Step 1: Add failing E2E assertions for the new entry scene, `1 / 14`, tooltip behavior, drawer dismissal, and current final scene.**

```js
await page.goto('/');
await page.getByRole('link', { name: 'Начать презентацию' }).click();
await expect(page.getByText('1 / 14')).toBeVisible();
await page.getByRole('button', { name: 'Идея' }).hover();
await expect(page.getByRole('tooltip')).toContainText('задача и ожидаемый результат');
```

- [ ] **Step 2: Run the focused E2E suite and observe it fail against legacy scene identifiers.**

Run: `npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js`

- [ ] **Step 3: Update tests for the approved journey, then run content, lint, unit/component, build and E2E checks.**

Run: `npm run validate:content && npm run lint && npm run test && npm run build && npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js`

- [ ] **Step 4: Inspect the landing and at least scenes 1, 6, 9, 11, 13 and 14 in Chromium at desktop and narrow widths; verify no desktop presentation scroll, visible brand contrast, correctly centered tooltips, local font requests only, and reduced-motion behavior.**

- [ ] **Step 5: Record actual commands, results, browser observations, known limitations, and Git state in progress.**

- [ ] **Step 6: Run the final technical gate.**

Run: `npm run verify`

Expected: PASS.

## Plan self-review

- **Coverage:** Tasks 1–5 implement the approved WebZaim palette/wordmark/local typography, 14-scene practical story, contextual tooltips, drawer copy, file structures, landing-only entry, keyboard/fullscreen continuity, reduced motion, and all requested test layers.
- **No placeholders:** searched the plan for `TODO`, `TBD`, and “implement later”; none are present.
- **Contract consistency:** every scene registry consumer reads the same `scene.visualType`, `scene.hoverItems`, and `scene.presenterGuide` fields; visual type names are named once in Task 3 and referenced by Task 2.
