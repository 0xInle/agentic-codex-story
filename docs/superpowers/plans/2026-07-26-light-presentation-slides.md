# Light WebZaim Presentation Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing fourteen-scene presentation into a light, branded, visual-first WebZaim talk while preserving all navigation and speaker-support behavior.

**Architecture:** Scene content remains the single source of truth in `src/content/scenes/scenes.js`; it gains concise Russian display copy and stable visual data. `StoryScene` becomes a two-column shell that renders only a key idea and `PresentationVisuals`; the shared visual renderer maps each visual type to a focused accessible diagram. Global presentation CSS owns the light branded canvas and responsive layout, not the content or visual components.

**Tech Stack:** React 18, Vite, JavaScript/JSX, Vitest, Testing Library, Playwright Chromium, CSS custom properties. No new dependencies.

## Global Constraints

- JavaScript and JSX only; do not create TypeScript files.
- Keep all product copy in `src/content`, including detailed speaker scripts in `src/content/speaker-notes`.
- Do not add a backend, real Codex/MCP calls, external runtime APIs, analytics, remote images or remote fonts.
- Preserve fourteen routes, keyboard navigation, fullscreen fallback, text drawer, accessible hover/focus tooltips and local deterministic behavior.
- Use Russian labels; retain an English technical name only with a nearby Russian explanation.
- The landing and every presentation scene must use a light azure-white surface, the local transparent WebZaim mark and the section-4 ribbon motif.
- Do not commit: the repository has no `.git` directory.

---

### Task 1: Replace scene display contracts with concise Russian slide copy

**Files:**
- Modify: `src/content/scenes/scenes.js`
- Modify: `src/content/scenes/scenes.test.js`
- Modify: `src/components/diagrams/presentationVisuals.test.jsx`

**Interfaces:**
- Consumes: `presenterNotesBySceneId` and the fourteen existing stable scene IDs.
- Produces: each scene has `title`, `screenThesis`, `visualType`, `visual.labels` and Russian `hoverItems`; titles match the approved fourteen-item title list.

- [ ] **Step 1: Write failing content tests for the new title contract**

```js
expect(scenes).toHaveLength(14);
expect(scenes.map(({ title }) => title)).toEqual([
  'Эта презентация — тоже фича',
  'Процесс важнее скорости кода',
  'Повторяемое не нужно делать руками',
]);
expect(scenes.every(({ title }) => title.length <= 42)).toBe(true);
```

- [ ] **Step 2: Run the focused test and observe the legacy titles fail**

Run: `npm run test -- src/content/scenes/scenes.test.js`

Expected: FAIL because the old long headings remain.

- [ ] **Step 3: Replace all fourteen titles, theses and visible labels**

```js
['proof', 'Агенту нужны доказательства', 'Отчёт не заменяет работающий результат.', 'Проверка результата', 'evidence-board', ['Тесты', 'Сборка', 'Браузер', 'Скриншот']]
```

Use the approved title table in `docs/superpowers/specs/2026-07-26-light-presentation-slides-design.md`. Replace `Brief`, `Plan`, `Prove`, `Handoff`, `Review`, `Show`, `Reviewer`, `Diff` and `Evidence` with Russian visible equivalents or a parenthetical explanation.

- [ ] **Step 4: Add a structural visual-data test**

```jsx
render(<PresentationVisuals scene={scenes[7]} />);
expect(screen.getByText('SPEC.md')).toBeInTheDocument();
expect(screen.getByText('AGENTS.md')).toBeInTheDocument();
```

- [ ] **Step 5: Run focused validation**

Run: `npm run test -- src/content/scenes/scenes.test.js src/components/diagrams/presentationVisuals.test.jsx && npm run validate:content`

Expected: PASS; fourteen ordered content-owned scenes validate.

### Task 2: Create the visual-first scene shell and light presentation frame

**Files:**
- Modify: `src/features/presentation/scenes/StoryScene.jsx`
- Modify: `src/features/presentation/PresentationPage.jsx`
- Modify: `src/features/presentation/SceneRenderer.test.jsx`
- Modify: `src/features/presentation/presentation.test.jsx`

**Interfaces:**
- Consumes: the Task 1 scene contract and `PresentationVisuals({ scene })`.
- Produces: `StoryScene` renders `.story-scene-copy` with one `screenThesis` and `.story-scene-visual`; it does not render `ФИЧА / NN`, a scene-title `h2`, or a subtitle paragraph.

- [ ] **Step 1: Write a failing shell test**

```jsx
render(<StoryScene scene={scenes[0]} />);
expect(screen.queryByText('ФИЧА / 01')).not.toBeInTheDocument();
expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
expect(screen.getByText(scenes[0].screenThesis)).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and observe the duplicate scene header fail**

Run: `npm run test -- src/features/presentation/SceneRenderer.test.jsx`

Expected: FAIL because the old eyebrow and repeated `h2` are rendered.

- [ ] **Step 3: Render a single key thought and visual region**

```jsx
return <section className="story-scene" aria-label={scene.title}>
  <div className="story-scene-copy"><p>{scene.screenThesis}</p></div>
  <div className="story-scene-visual"><PresentationVisuals scene={scene} /></div>
</section>;
```

Update the presentation frame to render `/brand/webzaim-symbol.png` with alt `Логотип Вебзайм`, retain the route counter and keep the heading as the only scene title.

- [ ] **Step 4: Verify integration behavior remains intact**

Run: `npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/presentation/presentation.test.jsx`

Expected: PASS; scene counters, routes, drawer and keyboard navigation still work.

### Task 3: Replace generic diagrams with scene-specific visual evidence

**Files:**
- Modify: `src/components/diagrams/PresentationVisuals.jsx`
- Modify: `src/components/diagrams/presentationVisuals.test.jsx`

**Interfaces:**
- Consumes: `scene.visualType`, `scene.visual.labels` and `scene.hoverItems`.
- Produces: visual variants `feature-route`, `altitude-bands`, `recovery-loop`, `knowledge-route`, `scope-contrast`, `repository-tree`, `context-spotlight`, `feature-contract`, `delivery-route`, `evidence-board`, `role-handoff`, `review-verdict`, `permission-rings` and `feedback-loop`; all expose `aria-label="Схема сцены"` and keep tooltip targets.

- [ ] **Step 1: Write failing renderer tests for the two document visuals**

```jsx
render(<PresentationVisuals scene={scenes[5]} />);
expect(screen.getByTestId('repository-tree')).toHaveTextContent('src/features');
render(<PresentationVisuals scene={scenes[7]} />);
expect(screen.getByTestId('spec-context-documents')).toHaveTextContent('Критерии приёмки');
```

- [ ] **Step 2: Run the focused test and observe the generic visual fail**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx`

Expected: FAIL because the document-specific card is absent.

- [ ] **Step 3: Implement small semantic visual components inside `PresentationVisuals.jsx`**

```jsx
function MarkdownDocument({ name, rows }) {
  return <article className="markdown-document" aria-label={name}>
    <p>{name}</p>{rows.map((row) => <code key={row}>{row}</code>)}</article>;
}
```

Use `MarkdownDocument` for `feature-contract` and `knowledge-route`; render a VS Code-like tree for `repository-tree`; use visible directional arrows for routes and roles; use cards with a checkmark only for verified evidence.

- [ ] **Step 4: Preserve hover/focus explanations**

```jsx
expect(screen.getAllByRole('button', { name: /показать пояснение/i })).not.toHaveLength(0);
```

- [ ] **Step 5: Run visual component checks**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx`

Expected: PASS; every checked scene has an accessible visual and tooltip targets.

### Task 4: Apply the light corporate visual system and verify in browser

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/tokens.css`
- Modify: `src/test/responsiveFixtures.test.jsx`
- Modify: `tests/e2e/presentation.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Consumes: `.presentation-console`, `.presentation-header`, `.story-scene`, `.story-scene-copy`, `.story-scene-visual`, Task 3 visual class names and `/brand/webzaim-symbol.png`.
- Produces: light full-height desktop presentation with a one-line header title, no document vertical overflow at 1280 × 720 for representative slides, and responsive stacked content below the desktop breakpoint.

- [ ] **Step 1: Write failing layout contracts**

```jsx
expect(screen.getByRole('main', { name: 'Презентация' })).toHaveClass('presentation-console');
expect(screen.queryByText(/^ФИЧА \/ \d+/)).not.toBeInTheDocument();
```

Add a Playwright assertion that `document.documentElement.scrollHeight <= window.innerHeight` on `/present/repository-map` at 1280 × 720.

- [ ] **Step 2: Run tests and observe old dark-layout assumptions fail**

Run: `npm run test -- src/test/responsiveFixtures.test.jsx && npm run test:e2e -- tests/e2e/presentation.spec.js --project=chromium`

Expected: FAIL until the scene composition and E2E expectations use the new light contract.

- [ ] **Step 3: Implement the light layout and ribbon treatment**

```css
.presentation-console { background: linear-gradient(135deg, #effaff, #f8fcff 48%, #d9f7fb); }
.story-scene { grid-template-columns: minmax(0, .9fr) minmax(22rem, 1.1fr); }
.story-scene-copy { color: var(--wz-graphite); }
```

Use the compact transparent brand symbol, graphitic typography, blue visual structure and aquamarine active states. Keep a decorative ribbon behind content only. Apply `@media (max-width: 48rem)` to stack the two columns and permit the existing mobile reading flow. Preserve `prefers-reduced-motion` behavior.

- [ ] **Step 4: Run all required verification**

Run: `npm run validate:content && npm run verify && npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium`

Expected: PASS; content, lint, unit/component tests, build and five-or-more Chromium journeys pass.

- [ ] **Step 5: Capture and inspect representative browser screenshots**

Run: `npx playwright screenshot --device='Desktop Chrome' http://127.0.0.1:5173/present/presentation-feature /private/tmp/webzaim-slide-01-light.png`

Repeat for `/present/repository-map`, `/present/feature-spec`, `/present/role-separation` and `/present/feedback-loop`. Inspect all five images for a one-line title, readable contrast, no duplicate title, no `ФИЧА / NN`, visible light brand treatment and no clipped controls.

- [ ] **Step 6: Record factual evidence**

Append command output, browser observations, known build warnings, no-Git state and any remaining limitations to `docs/implementation-progress.md`.
