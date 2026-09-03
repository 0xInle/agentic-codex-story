# Agentic Presentation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing sixteen-slide presentation with a compact, interactive, seventeen-slide Russian presentation that explains reliable agentic development.

**Architecture:** Store all scene titles, on-screen copy, visual data, hover explanations and drawer scripts in `src/content`. Render that data through a small set of reusable visual components selected by `visualType`; no presenter script belongs in JSX. Preserve the current local presentation route and controls, extending its source of truth from sixteen to seventeen scenes.

**Tech Stack:** React 19, Vite 6, JavaScript, Vitest, Testing Library, Playwright, CSS custom properties; no TypeScript, no backend and no remote runtime APIs.

## Global Constraints

- JavaScript only: create or modify `.js`, `.jsx` and `.css` files; never add `.ts` or `.tsx`.
- Do not install packages, add a backend, call real Codex/MCP/API services, or add external fonts.
- Keep all product copy and scripts in `src/content`.
- Do not render time estimates, `Что говорить`, speaker notes, FAQ, source lists, deep dives, speaker mode or a scene map in a slide.
- The drawer contains the full Russian script for the active scene; it closes via its close button, Escape and backdrop click.
- Every explanatory hover element must also work on keyboard focus and by click/Enter/Space pinning.
- Use `Статическая проверка`, not `Typecheck`, because the product is JavaScript-only.
- Preserve reduced-motion support and visible non-colour-only focus state.
- Do not commit because the repository has no `.git` directory; record the no-Git limitation in `docs/implementation-progress.md`.

---

## Planned file structure

| File | Responsibility |
| --- | --- |
| `src/content/scenes/scenes.js` | Exact ordered seventeen-scene registry and on-screen visual data. |
| `src/content/speaker-notes/presenterNotes.js` | Three Russian read-aloud paragraphs for every scene. |
| `src/content/sceneRendererKeys.js` | The visual-type keys accepted by the scene registry. |
| `src/components/diagrams/InteractiveDiagram.jsx` | Accessible hover/focus/pin popover controller. |
| `src/components/diagrams/PresentationVisuals.jsx` | Data-driven visual patterns: flow, document cards, map, ladder, roles, boundary, code and risk grid. |
| `src/components/diagrams/index.js` | Public diagram exports. |
| `src/features/presentation/scenes/StoryScene.jsx` | Presentation scene shell that selects a visual pattern using content data. |
| `src/features/presentation/sceneRenderers.js` | Maps the new renderer key to `StoryScene`. |
| `src/features/presentation/PresenterGuide.jsx` | Keeps the full script drawer semantic and introduces its scene-script heading. |
| `src/styles/global.css` | Compact responsive visuals, popover and drawer styles. |
| `src/content/scenes/scenes.test.js` | Content contract for seventeen scenes. |
| `src/components/diagrams/presentationVisuals.test.jsx` | Component behavior and accessibility tests for visual patterns/popovers. |
| `src/features/presentation/presentation.test.jsx` | Integration contract for 17-scene progress, navigation and drawer. |
| `tests/e2e/presentation.spec.js` | Browser journey, hover/focus, reduced-motion, fullscreen fallback and 17-scene verification. |
| `docs/implementation-progress.md` | Factual RED/GREEN, browser and final-gate evidence. |

## Scene data contract

```js
{
  id: 'modern-agentic-development',
  order: 1,
  title: 'Современная агентская разработка',
  subtitle: 'Как собрать систему, в которой агенты действительно могут работать',
  rendererKey: 'story',
  visualType: 'flow',
  screenThesis: 'Человек + агенты + инструменты + проверяемый результат',
  visual: { nodes: [], edges: [], code: [], risks: [], cards: [] },
  hoverItems: [{ id: 'human', label: 'Человек', description: 'Задаёт смысл и принимает решения.' }],
  presenterGuide: { paragraphs: [
    'Раньше разработчик проектировал приложение и непосредственно писал код.',
    'Теперь разработчик также проектирует среду, в которой агент получает задачу, понимает проект, использует инструменты и проверяет результат.',
    'Главный вопрос этой презентации — как организовать эту среду так, чтобы итог был управляемым и проверяемым.'
  ] },
}
```

`visualType` must be one of `flow`, `system-map`, `document-cards`, `maturity-loop`, `context-bridge`, `process-levels`, `system-classes`, `role-topology`, `orchestration-boundary`, `mcp-map`, `browser-flow`, `runtime-chain`, `risk-control-grid` or `final-relationship`. `hoverItems` uses Russian labels and concise Russian descriptions. `presenterGuide.paragraphs` has exactly three non-empty Russian paragraphs and no duration field.

## Task 1: Replace the scene registry with the seventeen-scene content contract *(completed)*

**Files:**
- Modify: `src/content/scenes/scenes.js`
- Modify: `src/content/speaker-notes/presenterNotes.js`
- Modify: `src/content/sceneRendererKeys.js`
- Modify: `src/content/scenes/scenes.test.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Produces `scenes`: seventeen records ordered `1..17`, each with `id`, `title`, `subtitle`, `rendererKey: 'story'`, `visualType`, `screenThesis`, `visual`, `hoverItems`, `presenterGuide`, `accessibility` and `presentation`.
- Produces `presenterNotesBySceneId[sceneId] = { paragraphs: [string, string, string] }`.
- Extends `sceneRendererKeys` with `story` and removes keys not referenced by the new registry only after the renderer migration task is complete.

- [ ] **Step 1: Write the failing content test.** Replace the old 16-ID assertion with the exact IDs below, assert `1..17`, assert no `durationSeconds`, no `durationLabel`, three non-empty Russian paragraphs, a non-empty `subtitle`, a supported visual type and at least one hover item whenever the visual has labelled nodes.

```js
const expectedIds = [
  'modern-agentic-development', 'autonomy-illusion', 'agentic-system-map',
  'specification-start', 'three-documents', 'living-specification', 'context-first',
  'skills-workflows-plugins', 'system-classes', 'subagents', 'orchestration',
  'mcp-architecture', 'mcp-practice', 'runtime-evidence', 'autonomy-risk',
  'maturity-ladder', 'conclusion',
];
expect(scenes.map((scene) => scene.id)).toEqual(expectedIds);
expect(scenes.map((scene) => scene.order)).toEqual(Array.from({ length: 17 }, (_, index) => index + 1));
expect(scenes.every((scene) => scene.presenterGuide.paragraphs.length === 3)).toBe(true);
expect(scenes.every((scene) => !('durationSeconds' in scene))).toBe(true);
```

- [ ] **Step 2: Run the focused test and observe RED.**

Run: `npm run test -- src/content/scenes/scenes.test.js`

Expected: FAIL because the registry still contains sixteen old IDs and duration fields.

- [ ] **Step 3: Write the minimal content implementation.** Create the exact sequence below and preserve all presenter copy under `src/content/speaker-notes`.

| ID | Title | Visual data required | Hover labels |
| --- | --- | --- | --- |
| `modern-agentic-development` | Современная агентская разработка | Human/agents/tools/verifiable-result flow plus repository, terminal and agents motifs | Человек, Агент, Инструменты, Проверка |
| `autonomy-illusion` | Кажется, что агент сделал всё сам | `Задача → Codex → готовый продукт` beside `Замысел → спецификация → контекст → инструменты → агенты → проверка → приёмка` | Простая модель, Надёжный процесс |
| `agentic-system-map` | Из чего состоит агентная разработка | Human through SPEC, repository context, skills, orchestration, MCP, implementation, runtime, acceptance | one concise sentence for every map node |
| `specification-start` | Разработка начинается не с кода | `SPEC.md` file sections and presentation requirements | Цель, Аудитория, Сценарии, Ограничения, Критерии приёмки |
| `three-documents` | Три документа — три разных назначения | README, SPEC and AGENTS cards with samples | README.md, SPEC.md, AGENTS.md |
| `living-specification` | От spec-first к живой спецификации | three levels and `SPEC → архитектура → код → runtime → обновлённый SPEC` loop | Spec-first, Spec-anchored, Spec-as-source, Spec-once |
| `context-first` | Спецификация не знает ваш репозиторий | SPEC request, repository questions and AGENTS bridge | SPEC.md, AGENTS.md, Код, Runtime |
| `skills-workflows-plugins` | Агенту нужны не только знания, но и процессы | Skill → workflow → plugin levels and six practice cards | Мозговой штурм, Планирование, Отладка, Сначала тест, Ревью кода, Проверка перед завершением |
| `system-classes` | Три примера разных классов систем | GSD, Superpowers and Team Mode cards | GSD, Superpowers, Team Mode, Риск зависимости |
| `subagents` | Один агент не обязан делать всё | coordinator and four bounded roles | Исследователь, Исполнитель, Исполнитель сложного блока, Рецензент |
| `orchestration` | Оркестрация — это управление, а не количество агентов | assignment fields, safe independent work and dangerous shared-file collision | Результат, Источники, Область работы, Ограничения, Проверки, Условие остановки, Формат ответа |
| `mcp-architecture` | MCP подключает агента к внешнему миру | Codex/client/server/capabilities/external systems map | Инструменты, Ресурсы, Сценарии, Схемы, Права доступа |
| `mcp-practice` | Агент начинает не только писать, но и наблюдать | browser verification path and constrained-access risk cards | Открыть сайт, Перейти к презентации, Переключить слайды, Проверить подсказки, Полный экран, Консоль и сеть, Сбор следов производительности |
| `runtime-evidence` | Build прошёл. Но работает ли система? | Tests → Lint → Статическая проверка → Build → Browser → Console и Network → Performance → SPEC | each check plus `SPEC ↔ CODE ↔ RUNTIME` |
| `autonomy-risk` | Самая опасная иллюзия: «система всё проверила сама» | automated steps, one false premise, nine risks and autonomy/control formula | every risk and control summary |
| `maturity-ladder` | Не нужно внедрять всё сразу | six levels from structured request to runtime feedback | each maturity level |
| `conclusion` | Будущее — это не один автономный агент | final human/specification/agents/tools/runtime relationship | Человек, Живая спецификация, Специализированные агенты, Инструменты, Проверяемый runtime |

Each script must convey the corresponding approved `Что говорить` section: what the viewer sees, why the mechanism matters, its limitation or risk, and a transition to the next slide. Use clear Russian for the mid-level audience; retain only correct proper names and document names.

- [ ] **Step 4: Run the focused test and observe GREEN.**

Run: `npm run test -- src/content/scenes/scenes.test.js`

Expected: PASS with all registry and script-contract assertions.

- [ ] **Step 5: Record evidence.** Add the exact RED failure and GREEN command result to Task 49 evidence; state that no duration copy, backend or remote calls were introduced.

## Task 2: Create reusable accessible visual patterns and explanatory popovers *(completed)*

**Files:**
- Create: `src/components/diagrams/InteractiveDiagram.jsx`
- Create: `src/components/diagrams/PresentationVisuals.jsx`
- Create: `src/components/diagrams/presentationVisuals.test.jsx`
- Modify: `src/components/diagrams/index.js`
- Modify: `src/styles/global.css`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- `InteractiveDiagram({ label, items })` consumes `{ id, label, description }[]` and renders one `button` per item plus a single active `role="tooltip"` popover.
- `PresentationVisuals({ scene })` selects a semantic pattern by `scene.visualType` and consumes only `scene.visual`, `scene.screenThesis` and `scene.hoverItems`.

- [ ] **Step 1: Write failing component tests.** Assert that pointer entry and keyboard focus show a tooltip, click/Enter pin it, Escape closes it, only one popover exists and visual patterns use semantic labels/list structure.

```jsx
render(<InteractiveDiagram label="Слои системы" items={[{ id: 'spec', label: 'SPEC.md', description: 'Фиксирует намерение.' }]} />);
const trigger = screen.getByRole('button', { name: 'SPEC.md' });
fireEvent.focus(trigger);
expect(screen.getByRole('tooltip')).toHaveTextContent('Фиксирует намерение.');
fireEvent.keyDown(trigger, { key: 'Escape' });
expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
```

- [ ] **Step 2: Run focused tests and observe RED.**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the smallest reusable pattern set.** Use a `switch` in `PresentationVisuals` for every defined `visualType`; render HTML/CSS nodes and connectors, `pre/code` for file/code data, ordered lists for steps and a visible text equivalent for every connector. Do not put speaker paragraphs in these components.

- [ ] **Step 4: Implement compact CSS.** Add `.interactive-diagram`, `.diagram-node`, `.diagram-popover`, `.diagram-flow`, `.diagram-document-card`, `.diagram-ladder`, `.diagram-role-topology`, `.diagram-boundary`, `.diagram-code-panel` and `.diagram-risk-grid`. Use CSS grid/flex, `max-inline-size`, `overflow-wrap: anywhere`, existing accent tokens and `@media (prefers-reduced-motion: reduce)` to stop decorative connector animation.

- [ ] **Step 5: Run focused tests and observe GREEN.**

Run: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx`

Expected: PASS; all patterns render semantic content and popovers meet pointer/keyboard behavior.

- [ ] **Step 6: Record evidence.** Record focused RED/GREEN evidence and the reduced-motion rule in Task 49.

## Task 3: Migrate presentation rendering to the story scene shell *(completed)*

**Files:**
- Create: `src/features/presentation/scenes/StoryScene.jsx`
- Modify: `src/features/presentation/sceneRenderers.js`
- Modify: `src/features/presentation/SceneRenderer.test.jsx`
- Modify: `src/features/presentation/scenes/heroEvolution.test.jsx`
- Modify: `src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx`
- Modify: `src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- `StoryScene({ scene })` renders a labelled `section`, `scene.subtitle`, `scene.screenThesis` and `<PresentationVisuals scene={scene} />`.
- `sceneRenderers.story = StoryScene`; every registry scene references `story`.

- [ ] **Step 1: Write failing renderer tests.** Assert the first and final scenes render their exact titles/subtitles, the first scene exposes the agentic-system thesis, and the final scene renders `17 / 17` through the integration test added in Task 4.

- [ ] **Step 2: Run focused renderer tests and observe RED.**

Run: `npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/presentation/scenes/heroEvolution.test.jsx`

Expected: FAIL because `story` has no renderer and legacy visual components receive incompatible data.

- [ ] **Step 3: Implement `StoryScene` and replace renderer mapping.** Map all seventeen registry records to `StoryScene`; delete obsolete renderer imports and mappings only when no active test/import references them. Keep reusable general UI/diagram primitives that are still used by the new visual patterns.

- [ ] **Step 4: Update responsive tests.** Replace legacy renderer-class assertions with the semantic story-surface and visual-type assertions for scenes 1–8 and 9–17.

- [ ] **Step 5: Run focused renderer tests and observe GREEN.**

Run: `npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/presentation/scenes/heroEvolution.test.jsx src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx`

Expected: PASS; all seventeen scenes have an explicit compact surface and supported visual pattern.

- [ ] **Step 6: Record evidence.** Record the removed legacy mapping and test results in Task 49.

## Task 4: Adapt drawer and presentation controls to the 17-scene contract *(in progress)*

**Files:**
- Modify: `src/features/presentation/PresentationPage.jsx`
- Modify: `src/features/presentation/PresenterGuide.jsx`
- Modify: `src/features/presentation/presentation.test.jsx`
- Modify: `src/test/accessibility.test.jsx`
- Modify: `src/styles/global.css`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- `PresentationPage` displays `index + 1 / 17` from `scenes.length`; it closes a pinned diagram popover before closing the drawer or leaving presentation.
- `PresenterGuide({ guide, onClose })` renders three content-owned script paragraphs without timing text.

- [ ] **Step 1: Write failing integration/accessibility tests.** Assert `/present/modern-agentic-development` displays `1 / 17`, `/present/conclusion` displays `17 / 17`, previous/next clamp to first/last scene, and the drawer contains the active scene’s three paragraphs but neither `Что говорить` nor time text.

- [ ] **Step 2: Run focused tests and observe RED.**

Run: `npm run test -- src/features/presentation/presentation.test.jsx src/test/accessibility.test.jsx`

Expected: FAIL because routes and progress still use the old scene registry.

- [ ] **Step 3: Implement the minimal integration changes.** Derive all counts from `scenes.length`, retain `aria-live` progress, keep the existing drawer close paths and use the active `scene.presenterGuide`. Do not add a timer or new route.

- [ ] **Step 4: Run focused tests and observe GREEN.**

Run: `npm run test -- src/features/presentation/presentation.test.jsx src/test/accessibility.test.jsx`

Expected: PASS; navigation, drawer, focus semantics and close behavior work for the 17-scene registry.

- [ ] **Step 5: Record evidence.** Add focused RED/GREEN result and the fact that time UI remains absent.

## Task 5: Complete visual accessibility, content validation and responsive contract

**Files:**
- Modify: `src/lib/contentValidation.js`
- Modify: `src/lib/contentValidation.test.js`
- Modify: `src/test/responsiveFixtures.test.jsx`
- Modify: `src/test/performancePolicies.test.jsx`
- Modify: `src/styles/motion.css`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- `validateContent()` fails if there are not exactly 17 ordered story scenes, a visual pattern is unknown, a hover item lacks an id/label/description, a script is not exactly three paragraphs or timing fields reappear.

- [ ] **Step 1: Write failing validator tests.** Add one invalid scene with `visualType: 'unknown'`, one with a missing tooltip description and one with `durationLabel`; expect three explicit failures. Add responsive fixture checks for a document-card pattern and a risk-control pattern.

- [ ] **Step 2: Run focused tests and observe RED.**

Run: `npm run test -- src/lib/contentValidation.test.js src/test/responsiveFixtures.test.jsx src/test/performancePolicies.test.jsx`

Expected: FAIL because the validator does not yet enforce the new contract.

- [ ] **Step 3: Implement validation and motion constraints.** Validate the exact fields above, preserve the no-TypeScript scan, require `prefers-reduced-motion` to disable connector motion and ensure compact surfaces do not introduce unbounded animation or large assets.

- [ ] **Step 4: Run focused tests and observe GREEN.**

Run: `npm run test -- src/lib/contentValidation.test.js src/test/responsiveFixtures.test.jsx src/test/performancePolicies.test.jsx`

Expected: PASS; malformed story content is rejected and responsive/motion policy tests remain green.

- [ ] **Step 5: Run the content validator.**

Run: `npm run validate:content`

Expected: `Content validation passed` and confirmation that no TypeScript files exist.

- [ ] **Step 6: Record evidence.** Record the malformed-contract RED cases, validator GREEN output and reduced-motion coverage.

## Task 6: Verify the complete browser journey and visual compactness

**Files:**
- Modify: `tests/e2e/presentation.spec.js`
- Modify: `tests/e2e/accessibility-keyboard.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Browser contract: the presentation begins at `/present/modern-agentic-development`, reaches `/present/conclusion`, exposes `1 / 17` and `17 / 17`, keeps controls reachable, and exposes hover/focus descriptions without page overflow at desktop size.

- [ ] **Step 1: Write failing Playwright cases.** Add tests that visit the first, system-map, document, orchestration, MCP, runtime, risk and conclusion scenes; assert the unique diagram label/text, a hover popover, keyboard focus popover, Escape close, `17 / 17`, previous navigation and reduced-motion non-animation.

- [ ] **Step 2: Run the focused browser suite and observe RED.**

Run: `npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1`

Expected: FAIL because the old 16-scene journey and selectors remain.

- [ ] **Step 3: Make only test-supported fixes.** Fix semantic labels, focus behavior, CSS overflow or responsive grid behavior found by the browser suite. Do not weaken expectations, hide content or remove an interaction to make the suite pass.

- [ ] **Step 4: Run the focused browser suite and observe GREEN.**

Run: `npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1`

Expected: PASS for all selected Chromium presentation/accessibility journeys.

- [ ] **Step 5: Inspect visual output in a browser.** Check `/present/modern-agentic-development`, `/present/agentic-system-map`, `/present/orchestration`, `/present/mcp-architecture`, `/present/runtime-evidence` and `/present/conclusion` at 1280×800 and 1920×800. Confirm readable diagrams, one visible active popover, full controls and no document overflow. Check a narrow viewport deliberately stacks rather than clips content.

- [ ] **Step 6: Run the final technical gate.**

Run: `npm run verify`

Expected: content validation passes; ESLint has 0 errors; all unit/component/integration tests pass; production build passes.

- [ ] **Step 7: Record evidence and stop.** Add actual RED/GREEN output, browser measurements, known warnings and no-Git status. Keep Task 49 blocked until the human reviews the landing and every one of the seventeen slides.

## Dependency order

`Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6`.

Tasks 1 and 2 must be sequential because visual components consume the new scene contract. Tasks 3–5 must remain sequential because rendering, presentation integration and validator expectations share the contract. Task 6 begins only after all prior automated checks are green.

## Plan self-review

- Every supplied slide maps to a unique content record in Task 1.
- Every `Что говорить` text maps to a drawer script; no task creates time UI.
- Every requested hover interaction maps to the accessible popover contract in Task 2 and browser evidence in Task 6.
- Visual diagrams, file structures and code panels are explicit in Tasks 1–3.
- Runtime uses `Статическая проверка`, avoiding a TypeScript contradiction.
- No task introduces a backend, remote API, real MCP server, external font or automatic slide change.
- План не содержит незаполненных секций или отложенных шагов.
