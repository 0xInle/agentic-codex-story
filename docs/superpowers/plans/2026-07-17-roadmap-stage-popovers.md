# Roadmap Stage Popovers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each delivery-map stage an accessible, content-owned presenter explanation in a popover above its card.

**Architecture:** Add a three-field `explanation` object to each existing roadmap step. `DeliveryRoadmap` owns a small active/pinned state machine and renders native buttons with one associated popover; CSS positions a non-layout-affecting panel above each card.

**Tech Stack:** React 19, Vite, JavaScript/JSX, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- JavaScript/JSX only; no packages or TypeScript.
- Keep all presenter explanation copy in `src/content/roadmap/roadmap.js`.
- Use native buttons, `aria-expanded`, visible text and Escape support; do not make the explanations hover-only.
- Only one popover may be open at once; it appears above the card and must not create horizontal overflow.
- Keep all thirteen cards, their order, current connectors, compact grid, mobile fallback and reduced-motion connector behavior.
- No route, backend, API, persistence or speaker-mode work is in scope.
- Record actual results in `docs/implementation-progress.md`; do not commit because the workspace has no Git repository.

---

## File structure

- `src/content/roadmap/roadmap.js` — the existing thirteen steps plus their presenter explanations.
- `src/content/roadmap/roadmap.test.js` — validates complete explanation data for every step.
- `src/features/explore/DeliveryRoadmap.jsx` — local hover/focus/click/Escape popover state and semantic button output.
- `src/features/explore/DeliveryRoadmap.test.jsx` — component state-machine and accessibility contract.
- `src/styles/global.css` — card-button reset, popover position, mobile bounds and visible state styling.
- `tests/e2e/explore.spec.js` — mouse and keyboard landing popover journeys.
- `tests/e2e/responsive.spec.js` — existing desktop/mobile no-overflow checks remain the layout guard.
- `docs/implementation-progress.md` — real RED/GREEN, browser, check and limitation evidence.

### Task 1: Add content-owned presenter explanations

**Files:**
- Modify: `src/content/roadmap/roadmap.js`
- Modify: `src/content/roadmap/roadmap.test.js`

**Interfaces:**
- Produces: every step has `explanation: { what: string, why: string, agentHelp: string }` with a non-empty Russian sentence in each field.
- Consumes: existing `deliveryRoadmapGroups` groups and step IDs without renaming or reordering them.

- [ ] **Step 1: Write the failing content contract**

Add this test after obtaining the flattened `steps`:

```js
expect(steps.every(({ explanation }) => explanation
  && ['what', 'why', 'agentHelp'].every((field) => explanation[field]?.trim().length > 0))).toBe(true);
expect(steps.find((step) => step.id === 'idea').explanation.what).toContain('гипотеза');
expect(steps.find((step) => step.id === 'release').explanation.agentHelp).toContain('результат');
```

- [ ] **Step 2: Run RED**

Run:

```bash
npm run test -- src/content/roadmap/roadmap.test.js
```

Expected: FAIL because `explanation` does not exist yet.

- [ ] **Step 3: Add the thirteen exact explanation objects**

Add these fields to the corresponding existing step objects:

```js
idea: { what: 'Гипотеза о ценности будущей фичи.', why: 'Даёт команде общий ориентир до выбора решения.', agentHelp: 'Помогает агенту отличать полезный результат от набора случайных действий.' }
context: { what: 'Факты об аудитории, ограничениях и текущей системе.', why: 'Не позволяет спроектировать решение в вакууме.', agentHelp: 'Даёт агенту границы и исходные данные для обоснованных шагов.' }
spec: { what: 'Проверяемое описание ожидаемого результата.', why: 'Превращает намерение в критерии готовности.', agentHelp: 'Позволяет агенту сверять каждый шаг с явными требованиями.' }
architecture: { what: 'Границы модулей и их ответственность.', why: 'Снижает связанность и цену будущих изменений.', agentHelp: 'Подсказывает агенту, где безопасно менять код и данные.' }
plan: { what: 'Последовательность небольших проверяемых задач.', why: 'Делает большой scope управляемым.', agentHelp: 'Помогает агенту выполнять одну ограниченную задачу за раз.' }
agents: { what: 'Явные правила работы исполнителя в репозитории.', why: 'Сохраняет ограничения и качество между сессиями.', agentHelp: 'Указывает агенту допустимый scope, проверки и условия остановки.' }
subagents: { what: 'Ограниченные независимые исполнители для отдельных частей.', why: 'Ускоряют работу, когда задачи не пересекаются.', agentHelp: 'Позволяет основному агенту делегировать без потери контроля.' }
orchestration: { what: 'Координация зависимостей, handoff и evidence.', why: 'Не даёт параллельным действиям конфликтовать.', agentHelp: 'Помогает агенту выбирать порядок и проверять готовность входов.' }
implementation: { what: 'Минимальное изменение кода в заданном scope.', why: 'Создаёт наблюдаемый продуктовый результат.', agentHelp: 'Держит агента в границах одной задачи и её файлов.' }
testing: { what: 'Автоматизированная проверка ожидаемого поведения.', why: 'Ловит регрессии до ручного просмотра.', agentHelp: 'Даёт агенту доказательство, что изменение работает.' }
security: { what: 'Проверка границ, зависимостей и небезопасных путей.', why: 'Не даёт удобству превратиться в риск.', agentHelp: 'Подсказывает агенту, какие возможности запрещены или требуют проверки.' }
human-review: { what: 'Осознанное решение человека принять результат.', why: 'Автоматика не заменяет ответственность за продукт.', agentHelp: 'Даёт агенту обязательную точку остановки и обратной связи.' }
release: { what: 'Подтверждённая локальная готовность приложения.', why: 'Фиксирует, что результат можно показывать и использовать.', agentHelp: 'Закрывает цикл проверяемым результатом вместо заявления о готовности.' }
```

- [ ] **Step 4: Run GREEN**

Run:

```bash
npm run test -- src/content/roadmap/roadmap.test.js
```

Expected: PASS; the thirteen step IDs, order and complete explanation contract remain valid.

- [ ] **Step 5: Commit**

Do not run a commit command because Git is not initialized.

### Task 2: Render accessible above-card popovers with local state

**Files:**
- Modify: `src/features/explore/DeliveryRoadmap.jsx`
- Modify: `src/features/explore/DeliveryRoadmap.test.jsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: each `step.explanation.what`, `.why` and `.agentHelp` from Task 1.
- Produces: thirteen `.delivery-map-trigger` buttons; the active button has `aria-expanded="true"`, `aria-controls="roadmap-popover-${step.id}"`, and one `.delivery-stage-popover` above its card with three labelled paragraphs.

- [ ] **Step 1: Write failing component behavior tests**

Use `userEvent` to add these independent assertions:

```jsx
const user = userEvent.setup();
render(<DeliveryRoadmap />);
const idea = screen.getByRole('button', { name: 'Идея' });
await user.hover(idea);
expect(screen.getByRole('tooltip')).toHaveTextContent('Что это?');
await user.click(idea);
await user.unhover(idea);
expect(screen.getByRole('tooltip')).toBeInTheDocument();
await user.keyboard('{Escape}');
expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
```

Also prove keyboard focus opens the card explanation and opening `Контекст` closes `Идея`.

- [ ] **Step 2: Run RED**

Run:

```bash
npm run test -- src/features/explore/DeliveryRoadmap.test.jsx
```

Expected: FAIL because map cards are not buttons and no popover exists.

- [ ] **Step 3: Implement the minimal local interaction model**

Use `useState` for `{ activeId, pinnedId }`. Render each card's current label/index/description inside a type="button". On mouse enter or focus, set `activeId`; on mouse leave or blur, clear only when no card is pinned; on click toggle its ID in `pinnedId`; on Escape clear both values. Render one `role="tooltip"` panel only when its step ID equals `activeId` or `pinnedId`.

Use CSS to preserve card dimensions and set `.delivery-stage-popover` with `position: absolute; bottom: calc(100% + .75rem)`. Give it a readable narrow width, panel border/background/shadow, high local stacking order, and arrow. Pin it inside map bounds: left-edge cards align left; right-edge cards align right; middle cards centre. Keep the existing single-column mobile grid and ensure the popover max-width uses the viewport width.

- [ ] **Step 4: Run GREEN**

Run:

```bash
npm run test -- src/features/explore/DeliveryRoadmap.test.jsx src/content/roadmap/roadmap.test.js
```

Expected: PASS; card content contract and hover/focus/pin/Escape/one-open behavior all pass.

- [ ] **Step 5: Commit**

Do not run a commit command because Git is not initialized.

### Task 3: Verify the presenter aid in a real browser

**Files:**
- Modify: `tests/e2e/explore.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- Consumes: Task 2's button accessible names and tooltip role.
- Produces: browser evidence that the explanation opens above a card via hover and keyboard, pins via click, and does not block the presentation CTA.

- [ ] **Step 1: Write failing E2E assertions**

In the landing E2E journey, use the unique `Идея` button and assert that hover shows a tooltip containing `Что это?`, focus shows the same explanation, click keeps it visible after mouse exit, and Escape closes it. Retain the existing CTA journey.

- [ ] **Step 2: Run RED**

Run:

```bash
npm run test:e2e -- tests/e2e/explore.spec.js --project=chromium --workers=1
```

Expected: FAIL before Task 2 because the button and tooltip contracts do not exist.

- [ ] **Step 3: Run the browser checks after Task 2 is green**

Run:

```bash
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1
npm run verify
```

Expected: all Chromium presenter, responsiveness and accessibility checks pass; full validation, lint, unit/component tests and production build pass.

- [ ] **Step 4: Inspect and record evidence**

Inspect `/` at 1920 × 800 and mobile width. Confirm a panel appears above the selected card, its three labels are readable, only one panel is visible, and neither viewport has horizontal overflow. Append the actual RED/GREEN commands, results, browser observations, known warnings, no-Git state and remaining final human acceptance limitation under Task 49 in `docs/implementation-progress.md`.

- [ ] **Step 5: Commit**

Do not run a commit command because Git is not initialized.

## Self-review

- Spec coverage: all three presenter questions, above-card placement, hover/focus/click/keyboard/Escape, one-open rule, mobile bounds, content ownership, test coverage and browser verification map directly to Tasks 1–3.
- Placeholder scan: no placeholders or deferred steps appear.
- Contract consistency: Task 1 supplies `explanation.what`, `.why` and `.agentHelp`; Task 2 consumes those exact fields; Task 3 uses Task 2's `button` and `tooltip` contracts.
