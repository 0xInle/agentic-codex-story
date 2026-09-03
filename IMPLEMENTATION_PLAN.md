# Agentic Codex Story Implementation Plan

Use this plan task-by-task. Do not implement multiple phases in one uncontrolled pass.

> **For agentic workers:** keep exactly one active task at a time. Execute unfinished tasks strictly sequentially within one approved phase, preserving the contracts in this document, running task checks, and recording evidence after every task. Stop for mandatory human review at every phase gate; never begin the next phase automatically. Stop earlier for blockers, scope/SPEC/key-architecture changes, document contradictions, out-of-scope fixes, or unavailable required checks. For execution, use `superpowers:subagent-driven-development` or `superpowers:executing-plans`; use TDD for every deterministic behavior.

**Goal:** создать локальное русскоязычное React-приложение, которое в Explore, Presentation и Speaker modes объясняет агентскую разработку на примере Codex, использует единый data-driven контент и демонстрирует детерминированную orchestration simulation без backend и внешних runtime API.

**Architecture:** четыре направленных слоя: content registries → state/presentation/simulation engines → feature renderers → reusable UI primitives. React Router определяет URL, один `AppProvider` с `useReducer` владеет глобальным состоянием, Speaker synchronization изолирована за transport adapter, а контент и сценарии проходят отдельную статическую валидацию до рендера.

**Tech Stack:** React, Vite, JavaScript (только `.js`/`.jsx`), Tailwind CSS, Framer Motion, React Router, Vitest, React Testing Library, Playwright, ESLint, Prettier, axe-core для автоматизированных accessibility-проверок.

## Global constraints

- Не использовать TypeScript, backend, authentication, реальные Codex/MCP/API calls, `.env`, analytics, user data collection, `eval`, dynamic code execution, unsafe HTML или пользовательский shell.
- Core presentation должна работать локально без сети; terminal, MCP и orchestration являются явно обозначенными симуляциями.
- Русский — основной язык контента; code, commands, file names и технические identifiers — на английском.
- Сохраняются 16 сцен, 17 deep-dive routes, FAQ, glossary, sources, normal timing 30–40 минут и compact timing 25–30 минут.
- Dark visual identity, заданные semantic color roles и семь scene layouts сохраняются; sound исключён из v1.
- Desktop/laptop presentation имеет приоритет; mobile — reading-first, но без сломанной вёрстки.
- Никакая volatile claim, команда, slash command, UI label или permission behavior не попадает в финальный контент без актуального primary source и `checkedAt`.
- `npm run verify` — общий технический gate; audit требует документированной человеческой интерпретации.
- Одновременно выполняется ровно одна implementation task; изменяются только перечисленные в ней файлы, после task-specific checks обновляется `docs/implementation-progress.md`. Следующая задача запускается автоматически только если она находится в той же approved phase; review обязателен после phase gate.
- Phase -1 выполняется до research, dependencies и application code. Изменение утверждённого scope требует записи причины и влияния в progress до реализации изменения.

---

## 1. Разрешение неоднозначностей и сохранение scope

1. `/` и `/story` рендерят один Explore feature. `/` — canonical entry, `/story` — явный alias для навигации и ссылок.
2. `/present` восстанавливает последнюю допустимую сцену или открывает `hero`; `/present/:sceneId` валидирует ID и перенаправляет неизвестный ID на `/present/hero` с доступным уведомлением.
3. Deep dive доступен только по перечисленным 17 дочерним маршрутам. Голый `/deep-dive` перенаправляет на `/deep-dive/codex`.
4. Speaker mode открывается отдельной вкладкой через обычную ссылку с `target="_blank"`; приложение не зависит от разрешения popup. Если вкладка не открыта, Presentation продолжает работать.
5. Primary synchronization — `BroadcastChannel`; fallback — `storage` event. Transport не передаёт sensitive data и не пишет контент заметок в storage.
6. `prefers-reduced-motion` даёт системное значение по умолчанию, а пользовательская настройка может его усилить. Настройка не может принудительно включить motion при системном reduce.
7. `presentation.startedAt` и `pausedAt` хранятся как epoch milliseconds; вычисляемое elapsed time не сохраняется как источник истины. Это устраняет drift и неоднозначность исходной state shape.
8. Source research требует сети только на этапе подготовки контента; готовое приложение использует локальный registry и не делает runtime requests.
9. Shared UI phase перемещена перед feature UI, хотя в SPEC она перечислена позже. Это изменение порядка, а не дизайна: оно фиксирует component APIs до параллельной сборки сцен.
10. Simulation engine реализуется до orchestration scene renderer. Остальные сцены могут создаваться параллельно после freeze contracts.
11. Большие независимые массивы контента разделены на отдельные задачи, но остаются в одном плане из-за общих schema, cross-references, terminology и acceptance flow.

## 2. Основные риски

| Риск | Последствие | Мера в плане |
|---|---|---|
| Изменчивость Codex UI/команд/permissions | фактические ошибки на выступлении | Phase 0, source volatility gate и повторная проверка перед финальной репетицией |
| Объём 16 сцен + 17 deep dives + FAQ/glossary | непоследовательный контент и терминология | schemas, content validation, terminology freeze, content batches |
| Два окна и browser-specific synchronization | stale Speaker state или потеря команд | transport contract, sequence numbers, heartbeat, fallback и multi-page Playwright |
| Fullscreen/popups ограничены browser permissions | нестабильный E2E | fullscreen как запрос с graceful failure; Speaker через обычную вкладку |
| Русский текст и большие схемы | overflow на laptop/mobile | layout budgets, visual matrix и browser verification |
| Сложная анимация | motion sickness и performance regression | reduced-motion contract, deterministic timelines, pause offscreen |
| Симуляция с back/forward/retry | недопустимые статусы | pure reducer, transition table и replay tests |
| Конфликты параллельной работы | несовпадающие contracts | freeze gates и запрет совместного изменения registries/reducers |
| Security education может выглядеть как реальная capability | опасное понимание продукта | постоянный “Simulation” label, local-only data и security content review |
| Репозиторий пока не инициализирован Git | commit gates нельзя выполнить немедленно | messages заданы для будущего workflow; инициализация Git не входит в этот план без отдельного решения владельца |

## 3. Предлагаемая структура файлов и ответственности

### Корневые и служебные файлы

| Путь | Ответственность |
|---|---|
| `package.json`, `package-lock.json` | фиксированный toolchain и scripts из SPEC |
| `vite.config.js`, `eslint.config.js`, `.prettierrc.json`, `playwright.config.js` | build, lint, format и E2E configuration |
| `index.html`, `src/main.jsx` | Vite entry и React mount |
| `START_HERE.md`, `AGENTS.md`, `README.md` | entry workflow, repository rules, human setup/use |
| `scripts/validate-content.js` | CLI entry статической content validation |
| `docs/research-notes.md`, `docs/content-fact-check.md` | primary-source evidence и volatile claim register |
| `docs/architecture.md`, `docs/security-model.md` | принятые boundaries и threat model |
| `docs/implementation-progress.md`, `docs/final-verification.md` | phase evidence и финальный human walkthrough |

### Runtime boundaries

| Путь | Ответственность |
|---|---|
| `src/app/App.jsx`, `src/app/router.jsx`, `src/app/routes.js`, `src/app/providers.jsx` | app shell, lazy routes, route constants, provider composition |
| `src/state/appReducer.js`, `src/state/initialState.js`, `src/state/persistence.js` | глобальные transitions, canonical initial state, safe session/local persistence |
| `src/features/presentation/` | viewport scene engine, keyboard map, scene map, progress, fullscreen behavior |
| `src/features/speaker/` | speaker dashboard и synchronization transport |
| `src/features/simulation/` | pure event reducer, scenarios, playback controller и panels |
| `src/features/explore/`, `deep-dive/`, `faq/`, `glossary/`, `sources/` | route-level features без владения глобальными contracts |
| `src/components/ui/`, `code/`, `diagrams/`, `navigation/` | reusable content-agnostic presentation components |
| `src/content/` | versioned data registries; никакого JSX или runtime side effect |
| `src/lib/` | pure validation, time, route, search и external-link utilities |
| `src/hooks/` | browser adapters и focused behavior hooks |
| `src/styles/` | tokens, global CSS и motion/layout policies |
| `src/test/`, `tests/e2e/` | test environment, fixtures и user-flow suites |

### Зафиксированные contracts

- `Scene`: поля из §7.1 SPEC плюс `rendererKey`; `id` является route/state identity.
- `SpeakerNote`: поля из §12; `sceneId` — foreign key к `Scene.id`.
- `DeepDive`: `{ slug, title, sections, quickFaqIds, sourceIds, relatedSceneIds }`, где `sections` содержит ровно девять именованных секций общего layout.
- `FaqItem`: contract §10.1; `answer.length <= 500`, 2–5 предложений.
- `GlossaryTerm`: `{ id, term, shortDefinition, explanation, relatedSceneIds, relatedTermIds }` без self/circular definition chain.
- `Source`: contract §17.2; high volatility требует непустые `url`, `checkedAt`, `topics`.
- `AppState`: один reducer с actions из §16.4; navigation origin дополнен `returnContentTab`.
- `SimulationScenario`: `{ id, title, initialState, timeline, expectedFinalState }`; timeline состоит из `{ id, at, events }`.
- `SyncEnvelope`: `{ channelVersion: 1, senderId, sequence, sentAt, type, payload }`; stale/self messages игнорируются.
- `SceneRendererProps`: `{ scene, mode, isActive, simulationState, onSimulationChange }`; renderer не меняет route напрямую.

---

## 4. Фазы, зависимости и parallelization

```text
Phase -1 Repository operating setup
  → Phase 0 Research
  → Phase 1 Foundation
  → Phase 2 Contracts and content validation
  → Phase 3 Shared UI
  → Phase 4 State and route engines
       ├─→ Phase 5 Explore and Presentation
       ├─→ Phase 6 Speaker
       └─→ Phase 7 Simulation
  Phase 2 + Phase 3 + Phase 5 + Phase 7
       → Phase 8 Scenes
  Phase 2 + Phase 4
       → Phase 9 Deep dives, FAQ, glossary, sources
  Phases 5–9
       → Phase 10 Integration, accessibility, responsive, performance
       → Phase 11 Security, full verification and rehearsal
```

Параллельное исполнение задач в рамках этого плана отключено правилом Phase -1: активна только одна задача, а задачи внутри approved phase выполняются строго последовательно. Review stop обязателен только после phase gate. Технически независимыми кандидатами являются Tasks 9–11 (раздельные content registries), Tasks 26–34 (непересекающиеся scene components после freeze registry API) и Tasks 44–47 (раздельные E2E specs), но общий progress и registry files должны обновляться последовательно.

Только последовательно:

- toolchain → content contracts → наполнение registries;
- reducer/persistence → Explore/Presentation → Speaker commands;
- simulation reducer → scenarios → orchestration renderer;
- scene/deep-dive content → cross-reference validation → финальный fact-check;
- integration → E2E → human walkthrough.

Нельзя выполнять параллельно: изменения `src/state/appReducer.js`, `src/content/index.js`, `src/features/simulation/simulationReducer.js`, public UI props или content schemas и одновременное наполнение зависимых consumers.

---

# Phase -1 — Repository operating setup

## Task 1 — Repository operating contract and execution entrypoint

**Цель:** до research и application changes создать обязательные repository-level правила, единую точку входа и журнал evidence, чтобы все последующие задачи выполнялись строго по одной.

**Зависимости:** `SPEC.md` и этот `IMPLEMENTATION_PLAN.md`; зависимости приложения не устанавливаются.

**Точные файлы:** create `AGENTS.md`, `START_HERE.md`, `docs/implementation-progress.md`; modify none.

**Интерфейсы/контракты:** `AGENTS.md` фиксирует: JavaScript only; no backend; no real Codex, MCP or external runtime API calls; content only in `src/content`; speaker notes never in JSX; deterministic simulation; TDD for deterministic behavior; one active implementation task at a time; edit only active-task files; run task-specific checks; update progress evidence; sequential continuation only within the active phase; mandatory stop and human review after every phase gate; `npm run verify` as final technical gate. `START_HERE.md` задаёт строго упорядоченный execution loop. Progress entry содержит `{ task, status, files, checks, evidence, limitations, commit, reviewedAt }`, а status ограничен `not_started|in_progress|blocked|completed`.

**Пошаговые действия:**

1. Создать `AGENTS.md` с project overview, approved constraints, file ownership, TDD/testing rules, verification rules, forbidden changes и обязательным review stop.
2. Создать `START_HERE.md`: прочитать `AGENTS.md`, `SPEC.md`, `IMPLEMENTATION_PLAN.md`, затем progress; определить первую незавершённую task; проверить dependencies/file scope; выполнить только её; запустить её checks; записать evidence; остановиться.
3. Создать `docs/implementation-progress.md` с Phase -1…11 index, Task 1…49 checklist и шаблоном evidence record без отметки о выполнении будущих задач.
4. Сверить формулировки с Global constraints и убедиться, что repository rules не расширяют capability или scope.

**Тесты:** ручная one-to-one проверка 13 обязательных правил AGENTS; проверка девяти шагов START_HERE; проверка, что progress содержит все 49 уникальных task IDs и только разрешённые statuses.

**Команды проверки:** `rg -n "JavaScript only|no backend|no real Codex|MCP|external runtime API|src/content|speaker notes|deterministic simulation|TDD|one active implementation task|listed by the active task|task-specific checks|progress evidence|phase gate|npm run verify" AGENTS.md`; `rg -n "AGENTS.md|SPEC.md|IMPLEMENTATION_PLAN.md|implementation-progress.md|current.*phase|only that task|checks|evidence|phase gate|next phase" START_HERE.md`; `rg -c '^\| Task [0-9]+ \|' docs/implementation-progress.md`; ожидается наличие всех policy patterns и count `49`.

**Ожидаемый результат:** repository готов организационно: любой агент получает однозначные ограничения, выбирает ровно одну незавершённую задачу и обязан остановиться после evidence update.

**Commit message:** `docs: establish repository operating workflow`

**Phase -1 gate:** существуют только три организационных файла; dependencies и application files не созданы; все policy checks Task 1 пройдены.

---

# Phase 0 — Research and evidence baseline

## Task 2 — Research protocol and canonical source registry

**Цель:** собрать проверяемую primary-source основу до написания content claims.

**Зависимости:** Task 1 и `SPEC.md`; требуется network access на этапе выполнения задачи.

**Точные файлы:** create `docs/research-notes.md`, `docs/content-fact-check.md`, `src/content/sources/sources.js`, `src/content/sources/index.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `Source` contract; fact-check row `{ claimId, claim, topic, sourceIds, volatility, checkedAt, status }`; допустимые `status`: `verified`, `qualified`, `removed`.

**Пошаговые действия:**

1. Зафиксировать research queries для Codex surfaces, CLI/commands, approvals, worktrees, AGENTS.md, skills, plugins, subagents, MCP terminology и security.
2. Открыть только official/primary sources в порядке §17.1 SPEC; сохранить canonical URLs, дату, organization и volatility.
3. Для каждой изменчивой формулировки записать claim ID, точную допустимую формулировку и evidence; неподтверждённое пометить `removed`, а не переносить в content.
4. Отдельно разграничить Codex, OpenAI Agents SDK, MCP и общие agent patterns.
5. Сформировать source registry без runtime fetching.

**Тесты:** ручная выборка всех high-volatility entries; source IDs unique; каждый URL canonical HTTPS; ни одна high claim не ссылается на secondary-only source.

**Команды проверки:** `node --check src/content/sources/sources.js`; `rg -n "status: '(verified|qualified|removed)'|volatility: '(low|medium|high)'" docs/content-fact-check.md src/content/sources/sources.js`; ожидается синтаксический PASS и записи только из заданных enums.

**Ожидаемый результат:** локальный registry и auditable evidence разрешают безопасно писать Codex/MCP/security content.

**Commit message:** `docs: establish fact-check and source baseline`

## Task 3 — Content inventory and terminology freeze

**Цель:** превратить все обязательные элементы SPEC в контролируемый inventory до наполнения.

**Зависимости:** Task 2.

**Точные файлы:** create `docs/content-inventory.md`, `src/content/terminology.js`; modify `docs/content-fact-check.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** inventory rows `{ requirementId, artifactType, artifactId, plannedFile, sourceRequirement, ownerTask }`; terminology entries `{ id, preferredRu, preferredEn, forbiddenAlternatives, definitionSourceIds }`.

**Пошаговые действия:**

1. Перечислить 16 scenes, 17 deep dives, все required FAQ questions, 42 glossary terms, 16 speaker notes и восемь simulation scenarios.
2. Привязать каждую запись к точному будущему файлу и задаче этого плана.
3. Зафиксировать употребление agent, coding agent, model, tool, skill, plugin, MCP, subagent, orchestration, verification и approval.
4. Сверить strong claims с правилом «объяснение + example + limitation».
5. Зафиксировать исключённый scope: sound, backend, real calls, remote presentation, CMS, authentication и production access.

**Тесты:** ручная bijection-проверка таблиц SPEC ↔ inventory; уникальность `requirementId`/`artifactId`; отсутствие записи без `plannedFile` и `ownerTask`.

**Команды проверки:** `rg -c "^\| scene-" docs/content-inventory.md`; `rg -c "^\| deep-dive-" docs/content-inventory.md`; ожидается соответственно `16` и `17`. `node --check src/content/terminology.js` должен завершиться с code 0.

**Ожидаемый результат:** scope и словарь заморожены; контентные задачи можно разделять без потери требований.

**Commit message:** `docs: freeze content inventory and terminology`

**Phase 0 gate:** Tasks 2–3 evidence просмотрено человеком; факты со status, отличным от `verified`/`qualified`, не разрешены для публичного контента.

---

# Phase 1 — Reproducible project foundation

## Task 4 — Vite JavaScript toolchain and verification scripts

**Цель:** получить минимальный воспроизводимый React/Vite JavaScript project с единым verification gate.

**Зависимости:** Phase 0.

**Точные файлы:** create `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `.prettierrc.json`, `playwright.config.js`, `index.html`, `scripts/validate-content.js`, `src/main.jsx`, `src/app/App.jsx`, `src/test/setup.js`, `src/test/smoke.test.jsx`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** scripts ровно `dev`, `build`, `preview`, `lint`, `test`, `test:watch`, `test:e2e`, `test:e2e:ui`, `validate:content`, `verify`, `audit`; JS/JSX only; browser support задаётся Vite defaults и Playwright Chromium/WebKit/Firefox projects.

**Пошаговые действия:**

1. Создать package manifest с required dependencies из SPEC; axe tooling — единственная дополнительная dependency и обоснована accessibility acceptance.
2. Сначала создать smoke test на mount landmark и запустить его для ожидаемого fail.
3. Добавить минимальные Vite entry/App files до PASS, без feature UI.
4. Настроить jsdom, React Testing Library cleanup, ESLint и Prettier.
5. Настроить Playwright webServer и laptop/mobile projects.
6. Создать foundation-level `validate-content` command, который проверяет наличие/читаемость `SPEC.md`, запрещает `.ts`/`.tsx` вне dependencies и завершается с code 0 для ещё пустого content layer; Task 6 расширяет этот реальный gate registry rules.
7. Записать Task 4 checks, lockfile result и limitations в существующий progress log.

**Тесты:** smoke render; config syntax; build; lint; отсутствие `.ts`/`.tsx`.

**Команды проверки:** `npm install`; `npm run lint`; `npm run test -- src/test/smoke.test.jsx`; `npm run build`; `find . -type f \( -name '*.ts' -o -name '*.tsx' \) -not -path './node_modules/*'`; первые четыре завершаются code 0, последняя не выводит файлов.

**Ожидаемый результат:** минимальная страница собирается и тестируется; зависимости зафиксированы lockfile.

**Commit message:** `chore: establish React Vite JavaScript toolchain`

## Task 5 — CSS tokens, fonts and static asset policy

**Цель:** зафиксировать visual identity и responsive/motion primitives без feature-specific markup.

**Зависимости:** Task 4.

**Точные файлы:** create `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/motion.css`, `public/icons/.gitkeep`, `public/static/.gitkeep`; modify `src/main.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** CSS custom properties для seven semantic roles, typography scales, spacing, radii, focus ring, z-index layers, laptop/tablet/mobile breakpoints; local/system font stack с кириллицей; `[data-reduced-motion='true']` contract.

**Пошаговые действия:**

1. Создать tokens для dark surfaces и semantic colors с non-color status companion policy.
2. Определить responsive clamp typography в пределах SPEC.
3. Добавить global reset, skip-link target, readable focus-visible и overflow safeguards.
4. Добавить motion duration/speed tokens и reduced-motion overrides.
5. Подключить styles через `src/main.jsx`; не загружать web fonts из сети.

**Тесты:** CSS imports resolve; build не содержит remote font URL; focus ring не отключён; reduced-motion media query существует.

**Команды проверки:** `npm run build`; `rg -n "prefers-reduced-motion|focus-visible|--color-status" src/styles`; `rg -n "https?://" src/styles public`; ожидается успешный build, первые patterns найдены, remote asset URLs отсутствуют.

**Ожидаемый результат:** единая локальная visual foundation готова для components.

**Commit message:** `style: define accessible visual tokens`

**Phase 1 gate:** lint, smoke test и build проходят; никаких TypeScript files, network assets и feature code.

---

# Phase 2 — Content contracts and validation

## Task 6 — Pure content validators (TDD)

**Цель:** формализовать все cross-reference и quality constraints как pure functions.

**Зависимости:** Task 4, Task 3.

**Точные файлы:** create `src/lib/contentValidation.js`, `src/lib/contentValidation.test.js`, `src/content/sceneRendererKeys.js`, `src/content/index.js`; modify `scripts/validate-content.js`, `package.json`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `validateContent(registries) -> { valid, errors, warnings }`; errors содержат `{ code, path, message }`; `sceneRendererKeys` задаёт разрешённые data keys до появления React registry; validators проверяют scene IDs/order/renderer keys, notes, FAQ lengths and references, deep-dive/source routes, glossary relations, accessibility descriptions, volatility metadata и forbidden placeholder markers.

**Пошаговые действия:**

1. Написать failing table tests для duplicate/missing/invalid references и корректного minimal fixture.
2. Запустить targeted test и подтвердить fail по отсутствующему validator.
3. Реализовать validation маленькими named rules с deterministic error ordering.
4. Добавить CLI adapter, возвращающий code 1 при errors и печатающий concise paths.
5. Подключить `validate:content` и затем `verify` в package scripts.

**Тесты:** по одному negative case на каждое правило §22.1; exact positive fixture; stable ordering snapshot без полного content snapshot.

**Команды проверки:** `npm run test -- src/lib/contentValidation.test.js`; `npm run validate:content`; сначала targeted suite должна показать ожидаемый RED до реализации, финально обе команды PASS/code 0.

**Ожидаемый результат:** недостоверный или несвязный content не может пройти standard gate.

**Commit message:** `test: enforce content registry contracts`

## Task 7 — Scene and example registries

**Цель:** создать 16 scene records и practical examples как единственный data source основной истории.

**Зависимости:** Task 6 и Phase 0 gate.

**Точные файлы:** create `src/content/scenes/scenes.js`, `src/content/scenes/scenes.test.js`, `src/content/scenes/index.js`, `src/content/examples/examples.js`, `src/content/examples/index.js`; modify `src/content/index.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `scenes` — ordered array IDs `hero`…`human-decision`; `examplesById` — map practical examples; renderer keys берутся только из `src/content/sceneRendererKeys.js`, а Task 25 связывает их с React renderers.

**Пошаговые действия:**

1. Написать failing tests для count 16, unique IDs, order 1–16, timing totals, example foreign keys и source rules.
2. Заполнить каждый Scene: thesis, outcome, максимум 4 key points, misconception, example ID, route references, transition и diagram description.
3. Заполнить practical examples, на которые ссылаются scenes, без speaker-only текста.
4. Проверить explanation/example/limitation для strong claims и обновить scene/example inventory rows.

**Тесты:** scene contract, exact ID/order set, duration bounds, example/source/deep-dive references, accessibility descriptions.

**Команды проверки:** `npm run test -- src/content/scenes/scenes.test.js`; `npm run validate:content`; `node -e "import('./src/content/scenes/scenes.js').then(({scenes})=>{if(scenes.length!==16)process.exit(1)})"`; все PASS.

**Ожидаемый результат:** все 16 сцен и их examples доступны как валидированные data, без speaker notes и JSX.

**Commit message:** `content: define scene and example registries`

## Task 8 — Speaker-notes corpus

**Цель:** создать отдельные speaker notes для каждой сцены и проверить normal/compact script timing.

**Зависимости:** Task 7.

**Точные файлы:** create `src/content/speaker-notes/speakerNotes.js`, `src/content/speaker-notes/speakerNotes.test.js`, `src/content/speaker-notes/index.js`; modify `src/content/index.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `speakerNotesBySceneId` содержит ровно 16 `SpeakerNote`: opening, 3–5 talking points, demo steps, simple example, technical note, common mistake, transition, two likely questions и оба timing fields.

**Пошаговые действия:**

1. Написать failing tests для exact scene foreign keys, required fields, talking-point/question counts и timing equality with scenes.
2. Заполнить 16 note records, сохраняя normal 30–40 и compact 25–30 minute narrative.
3. Проверить отсутствие speaker notes и speaker-only phrasing в `src/content/scenes/scenes.js`.
4. Обновить speaker-note inventory rows и progress evidence.

**Тесты:** exact 16-note coverage; timing consistency; no orphan note; content separated from JSX and scene registry.

**Команды проверки:** `npm run test -- src/content/speaker-notes/speakerNotes.test.js`; `npm run validate:content`; `rg -n "speakerNotes|talkingPoints|demoSteps" src --glob '*.jsx'`; первые две PASS, последняя не выводит content definitions.

**Ожидаемый результат:** полный сценарий докладчика существует отдельно от visual components и связан с каждой сценой.

**Commit message:** `content: add complete speaker notes corpus`

## Task 9 — Deep-dive registry

**Цель:** создать 17 технических deep dives по единому девяти-section contract.

**Зависимости:** Tasks 6–7 и terminology freeze.

**Точные файлы:** create `src/content/deep-dives/deepDives.js`, `src/content/deep-dives/deepDives.test.js`, `src/content/deep-dives/index.js`; modify `src/content/index.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `deepDives` содержит exact 17 slugs из routes; каждый record имеет `Overview`, `When to use`, `How it works`, `How to implement`, `Example`, `Common mistakes`, `Checklist`, `Quick FAQ`, `Sources` и valid scene/source links.

**Пошаговые действия:**

1. Написать failing exact-route, section-order и cross-reference tests.
2. Заполнить 17 records с practical guidance, mistakes, checklist и source IDs.
3. Проверить local-only language для Codex/MCP/shell demonstrations и обновить inventory.

**Тесты:** exact route set, nine ordered sections, non-empty examples/checklists, valid scene/source links.

**Команды проверки:** `npm run test -- src/content/deep-dives/deepDives.test.js`; `npm run validate:content`; PASS.

**Ожидаемый результат:** каждый deep-dive route имеет полный валидированный educational record независимо от UI.

**Commit message:** `content: define complete deep-dive registry`

## Task 10 — FAQ registry

**Цель:** создать полный набор коротких beginner answers со стабильными links.

**Зависимости:** Tasks 6–7 и terminology freeze.

**Точные файлы:** create `src/content/faq/faq.js`, `src/content/faq/faq.test.js`, `src/content/faq/index.js`; modify `src/content/index.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `faqItems` покрывает каждый required question из §10.3; answer содержит 2–5 предложений, максимум 500 characters, один вывод, valid scene и optional deep-dive path.

**Пошаговые действия:**

1. Написать failing tests для required question/category set, length, sentence count и links.
2. Заполнить ответы без длинного code и повторяющихся выводов.
3. Проверить terminology/source qualifications и обновить FAQ inventory rows.

**Тесты:** exact required questions, unique IDs, category coverage, answer constraints, valid scene/deep-dive references.

**Команды проверки:** `npm run test -- src/content/faq/faq.test.js`; `npm run validate:content`; PASS.

**Ожидаемый результат:** все обязательные FAQ представлены короткими проверенными ответами и корректными links.

**Commit message:** `content: define complete FAQ registry`

## Task 11 — Glossary registry

**Цель:** создать непротиворечивый словарь минимального набора терминов и связей.

**Зависимости:** Tasks 6–7 и terminology freeze.

**Точные файлы:** create `src/content/glossary/glossary.js`, `src/content/glossary/glossary.test.js`, `src/content/glossary/index.js`; modify `src/content/index.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `glossaryTerms` содержит минимум 42 required terms; каждый record имеет short definition, explanation, related scenes и related term IDs; search normalization появляется только в Task 36.

**Пошаговые действия:**

1. Написать failing tests для exact minimum term set, unique IDs, valid relations и circular-definition detection.
2. Заполнить definitions согласно frozen terminology и source qualifications.
3. Переписать self/circular definition chains и обновить glossary inventory rows.

**Тесты:** minimum set, no orphan/self relations, no circular definition chain, valid scene IDs.

**Команды проверки:** `npm run test -- src/content/glossary/glossary.test.js`; `npm run validate:content`; PASS.

**Ожидаемый результат:** glossary data полностью валидны и готовы для search UI без дублированных normalized fields.

**Commit message:** `content: define complete glossary registry`

**Phase 2 gate:** content inventory имеет владельца и статус для каждого существенного требования; validator выдаёт zero errors.

---

# Phase 3 — Reusable UI system

## Task 12 — Accessible UI primitives

**Цель:** создать content-agnostic controls и overlays с единым focus contract.

**Зависимости:** Phase 1.

**Точные файлы:** create `src/components/ui/Button.jsx`, `IconButton.jsx`, `Panel.jsx`, `Badge.jsx`, `StatusIndicator.jsx`, `Dialog.jsx`, `Drawer.jsx`, `Tabs.jsx`, `Tooltip.jsx`, `Progress.jsx`, `KeyboardHint.jsx`, `SourceBadge.jsx`, `QuickFaqCard.jsx`, `src/components/ui/ui.test.jsx`, `src/components/ui/index.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** native semantic props проходят через components; `Dialog`/`Drawer` имеют controlled `open`, `onClose`, labelled title, initial focus и restore focus; `StatusIndicator` всегда выводит icon/text помимо color.

**Пошаговые действия:**

1. Написать failing component tests на keyboard activation, tab semantics, focus trap/restore, Escape и status accessible name.
2. Реализовать минимальные primitives без content logic.
3. Добавить controlled/uncontrolled запрет: state ownership остаётся у consumer.
4. Проверить reduced-motion и focus-visible styling.
5. Экспортировать только public API через index.

**Тесты:** RTL user-event, jest-dom roles/names, axe на Dialog/Tabs/Tooltip fixtures.

**Команды проверки:** `npm run test -- src/components/ui/ui.test.jsx`; `npm run lint`; обе PASS.

**Ожидаемый результат:** features получают доступные устойчивые building blocks.

**Commit message:** `feat: add accessible UI primitives`

## Task 13 — Developer-environment and diagram components

**Цель:** собрать reusable motifs без копирования конкретного продукта.

**Зависимости:** Task 12.

**Точные файлы:** create `src/components/code/CodePanel.jsx`, `TerminalPanel.jsx`, `DiffPanel.jsx`, `FileTree.jsx`, `src/components/code/codePanels.test.jsx`, `src/components/diagrams/DiagramFrame.jsx`, `AgentCard.jsx`, `TaskNode.jsx`, `TaskGraph.jsx`, `EventTimeline.jsx`, `ContextMeter.jsx`, `PermissionMatrix.jsx`, `src/components/diagrams/diagrams.test.jsx`, `src/components/code/index.js`, `src/components/diagrams/index.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** panels принимают structured data, не HTML strings; `DiagramFrame` требует text description; graph nodes имеют visual status + text; terminal имеет static/simulation label и batched screen-reader summary.

**Пошаговые действия:**

1. Написать failing tests для tabs, labels, descriptions, non-color status и safe text rendering.
2. Реализовать focused components с responsive list fallback для graphs.
3. Добавить virtualization только если browser measurement показывает необходимость; по умолчанию YAGNI.
4. Проверить long Russian labels и empty states.

**Тесты:** malicious-looking text отображается как text; diagrams имеют descriptions; graph keyboard order logical; terminal updates не создают per-line live announcements.

**Команды проверки:** `npm run test -- src/components/code src/components/diagrams`; `npm run lint`; `npm run build`; все PASS.

**Ожидаемый результат:** сцены могут композиционно показывать file tree, terminal, diff, graphs и permissions.

**Commit message:** `feat: add developer and diagram visual components`

## Task 14 — Navigation, scene frame and motion utilities

**Цель:** зафиксировать shell-level UI APIs для Explore/Presentation.

**Зависимости:** Tasks 12–13.

**Точные файлы:** create `src/components/navigation/ChapterNav.jsx`, `SceneFrame.jsx`, `SkipLink.jsx`, `src/components/navigation/navigation.test.jsx`, `src/components/navigation/index.js`, `src/hooks/useReducedMotionPreference.js`, `src/hooks/useInViewportPause.js`, `src/lib/motion.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `SceneFrame({ scene, mode, active, children })`; ChapterNav controlled by `activeSceneId`; motion utility maps preference and simulation speed; offscreen callback pauses only auto playback, never mutates selected scenario.

**Пошаговые действия:**

1. Написать failing tests на active nav state, accessible current marker, skip link, reduced motion resolution и viewport pause.
2. Реализовать components/hooks, избегая direct global state imports.
3. Зафиксировать seven layout names как validated class mapping.
4. Добавить skip/accelerate affordance contract для animation consumers.

**Тесты:** keyboard navigation, current semantics, hook cleanup, media-query changes, invalid layout fallback.

**Команды проверки:** `npm run test -- src/components/navigation src/hooks`; `npm run lint`; все PASS.

**Ожидаемый результат:** public UI APIs стабильны перед параллельной feature/scene work.

**Commit message:** `feat: add navigation frame and motion policies`

**Phase 3 gate:** component tests, axe fixtures, lint и build проходят; public props записаны в `docs/architecture.md` в Task 43.

---

# Phase 4 — State, routing and persistence engines

## Task 15 — App reducer and presentation timer (TDD)

**Цель:** реализовать единственный deterministic state transition boundary.

**Зависимости:** scene registry Task 7.

**Точные файлы:** create `src/state/initialState.js`, `src/state/appReducer.js`, `src/state/appReducer.test.js`, `src/lib/presentationTime.js`, `src/lib/presentationTime.test.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** actions из §16.4; navigation clamps first/last scene; timer derives elapsed from timestamps; invalid scene/action returns unchanged state plus dev warning adapter outside reducer.

**Пошаговые действия:**

1. Написать failing reducer tables для всех actions, boundaries, timer pause/resume/reset и origin restore.
2. Подтвердить RED на missing reducer.
3. Реализовать pure reducer и pure time functions без browser APIs.
4. Добавить invariants: active ID valid, visited unique, simulation state opaque to app reducer.
5. Запустить randomized action-sequence test с fixed seed для invariants.

**Тесты:** unit cases §22.2 для reducer, transitions, progress, timer и origin; no mutation assertions.

**Команды проверки:** `npm run test -- src/state/appReducer.test.js src/lib/presentationTime.test.js`; final PASS.

**Ожидаемый результат:** navigation/timer behavior полностью проверяемо вне React.

**Commit message:** `feat: add deterministic app state engine`

## Task 16 — Persistence and navigation-origin restoration (TDD)

**Цель:** безопасно восстанавливать refresh/deep-dive context без sensitive data.

**Зависимости:** Task 15.

**Точные файлы:** create `src/state/persistence.js`, `src/state/persistence.test.js`, `src/hooks/useNavigationOrigin.js`, `src/hooks/useNavigationOrigin.test.jsx`; modify `src/state/initialState.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** versioned allowlist payload `{ version, lastSceneId, presentationRecovery, reducedMotion, keyboardHelpDismissed, navigationOrigin }`; origin включает mode, scene, scroll, simulation step, content tab; corrupt/stale data ignored.

**Пошаговые действия:**

1. Написать failing tests на allowlist, version mismatch, corrupt JSON, invalid IDs и exact origin restoration.
2. Реализовать serialization/validation отдельно от storage adapter.
3. Реализовать sessionStorage origin и localStorage preferences согласно SPEC.
4. Добавить router-state priority над session fallback.
5. Проверить cleanup и quota/security exception handling.

**Тесты:** no notes/content/secrets serialized; refresh state valid; scroll restoration after render; inactive tab fallback.

**Команды проверки:** `npm run test -- src/state/persistence.test.js src/hooks/useNavigationOrigin.test.jsx`; PASS.

**Ожидаемый результат:** refresh и deep-dive return сохраняют только разрешённое состояние.

**Commit message:** `feat: restore safe presentation context`

## Task 17 — Router, providers and route contracts

**Цель:** включить все routes, lazy boundaries и common app provider без реализации feature content.

**Зависимости:** Tasks 7–16.

**Точные файлы:** create `src/app/routes.js`, `src/app/router.jsx`, `src/app/providers.jsx`, `src/app/router.test.jsx`, `src/features/not-found/NotFoundPage.jsx`, `src/features/explore/ExplorePage.jsx`, `src/features/presentation/PresentationPage.jsx`, `src/features/speaker/SpeakerPage.jsx`, `src/features/deep-dive/DeepDivePage.jsx`, `src/features/faq/FaqPage.jsx`, `src/features/glossary/GlossaryPage.jsx`, `src/features/sources/SourcesPage.jsx`; modify `src/app/App.jsx`, `src/main.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** constants для `/`, `/story`, `/present`, `/present/:sceneId`, `/speaker`, `/faq`, `/glossary`, `/sources`, 17 deep dives; App context exposes `{ state, dispatch }`; lazy route fallback имеет status label.

**Пошаговые действия:**

1. Написать failing memory-router tests для полного route table, aliases, invalid present ID, bare deep-dive и unknown URL.
2. Реализовать route constants/validators.
3. Создать lazy feature boundaries и минимальные content-first pages: каждая route page выводит собственный заголовок и валидированные records из соответствующего registry; последующие feature tasks расширяют эти рабочие страницы интерактивным поведением.
4. Реализовать themed 404 со ссылками home/scenes/FAQ/glossary.
5. Подключить provider и error boundary с recover-to-home action.

**Тесты:** all route resolutions, accessible loading/error states, canonical redirect decisions.

**Команды проверки:** `npm run test -- src/app/router.test.jsx`; `npm run build`; PASS, build manifest показывает separate lazy chunks.

**Ожидаемый результат:** URL architecture работает, а features могут интегрироваться независимо.

**Commit message:** `feat: establish application route contracts`

**Phase 4 gate:** reducer/persistence/router unit suites PASS; no feature owns global navigation state.

---

# Phase 5 — Explore and Presentation modes

## Task 18 — Explore story shell and active chapter navigation

**Цель:** дать свободное чтение всех 16 scenes с anchors и responsive navigation.

**Зависимости:** Phase 4, Task 14, scene data Task 7.

**Точные файлы:** create `src/features/explore/ExplorePage.test.jsx`, `src/features/explore/useActiveScene.js`, `src/features/explore/useActiveScene.test.jsx`; modify `src/features/explore/ExplorePage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** IntersectionObserver adapter emits valid `sceneId`; URL hash optional and replace-only; Explore dispatches `GO_TO_SCENE` без владения state и на этом этапе использует content-first `SceneFrame`; Task 25 подключает тот же shared renderer, что и Presentation.

**Пошаговые действия:**

1. Написать failing tests на 16 anchors, active chapter, Start Presentation, Explore CTA, observation cleanup и mobile nav.
2. Реализовать page landmarks, top nav, progress and scene slots.
3. Синхронизировать active section с reducer и preserve scroll.
4. Добавить pause simulation outside viewport hook.
5. Проверить `/` и `/story` equivalence.

**Тесты:** component interaction; observer mock; keyboard anchors; route transitions; no duplicate landmark IDs.

**Команды проверки:** `npm run test -- src/features/explore`; `npm run lint`; `npm run build`; PASS.

**Ожидаемый результат:** пользователь читает всю историю и запускает Presentation из любого entry route.

**Commit message:** `feat: build Explore mode story shell`

## Task 19 — Presentation controls, keyboard map and scene map

**Цель:** реализовать полный viewport presentation flow из того же content/renderer.

**Зависимости:** Task 18, Task 15.

**Точные файлы:** create `src/features/presentation/PresentationControls.jsx`, `src/features/presentation/SceneMap.jsx`, `src/features/presentation/usePresentationKeyboard.js`, `src/features/presentation/useFullscreenRequest.js`, `src/features/presentation/presentation.test.jsx`; modify `src/features/presentation/PresentationPage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** keys Space/Right/Left/Home/End/M/D/S/F/Esc; overlays consume Esc before mode exit; controls expose next/previous/map/deep dive/speaker/fullscreen/exit; fullscreen rejection gives non-blocking status.

**Пошаговые действия:**

1. Написать failing component/integration tests на every key, boundaries, overlay priority и form-control typing exclusion.
2. Реализовать one-scene viewport renderer, progress, controls и scene map Dialog.
3. Реализовать current-scene deep-dive navigation with origin.
4. Добавить Speaker link, fullscreen request и graceful rejection.
5. Restore refresh state и invalid scene behavior.
6. Поддержать skip animation и ×1/×2/×4 simulation speed controls.

**Тесты:** §22.3 keyboard/control/map/reduced-motion; Explore→Presentation; refresh restore; Presentation→deep dive handoff.

**Команды проверки:** `npm run test -- src/features/presentation src/app/router.test.jsx`; `npm run build`; PASS.

**Ожидаемый результат:** Presentation полностью управляется экраном и клавиатурой, работает без Speaker.

**Commit message:** `feat: add keyboard-first Presentation mode`

**Phase 5 gate:** keyboard-only walkthrough от hero до human-decision, map/deep dive/exit и refresh recovery проходят component integration checks.

---

# Phase 6 — Speaker mode and cross-window synchronization

## Task 20 — Versioned synchronization transport (TDD)

**Цель:** изолировать reliable bidirectional messaging от Speaker UI.

**Зависимости:** Tasks 15–17.

**Точные файлы:** create `src/features/speaker/syncProtocol.js`, `syncTransport.js`, `syncProtocol.test.js`, `syncTransport.test.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `createSyncTransport({ channelName, senderId, broadcastFactory, storage }) -> { send, subscribe, close }`; сообщения SPEC плюс command variants; monotonic sequence; heartbeat ping/pong; BroadcastChannel primary, storage fallback.

**Пошаговые действия:**

1. Написать failing protocol tests на schema, self/stale/duplicate messages и fallback.
2. Реализовать pure encode/decode guard.
3. Реализовать adapters с injected browser capabilities и cleanup.
4. Добавить connection state derivation `connecting|connected|disconnected` по heartbeat timeout.
5. Запретить synchronization of notes, source corpus и arbitrary storage keys.

**Тесты:** bidirectional messages, ordering, reconnect, malformed payload, fallback, close cleanup.

**Команды проверки:** `npm run test -- src/features/speaker/syncProtocol.test.js src/features/speaker/syncTransport.test.js`; PASS.

**Ожидаемый результат:** browser transport детерминированно тестируется без реальных окон.

**Commit message:** `feat: add resilient speaker sync transport`

## Task 21 — Speaker dashboard, timer and remote controls

**Цель:** предоставить докладчику отдельный operational view с graceful disconnected state.

**Зависимости:** Task 20, speaker notes Task 8, Presentation Task 19.

**Точные файлы:** create `src/features/speaker/SpeakerTimer.jsx`, `src/features/speaker/ConnectionStatus.jsx`, `src/features/speaker/SpeakerControls.jsx`, `src/features/speaker/SpeakerPage.test.jsx`; modify `src/features/speaker/SpeakerPage.jsx`, `src/features/presentation/PresentationPage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** current/next scene, elapsed/target, notes/demo/transition/questions; commands next/previous/jump/timer/simulation/deep-dive/map; local UI mirrors acknowledged Presentation state, не optimistic navigation.

**Пошаговые действия:**

1. Написать failing tests на connected/disconnected, current/next at last scene, timer commands и remote scene acknowledgement.
2. Реализовать dashboard sections и readable compact layout.
3. Подключить transport к Presentation dispatch с message allowlist.
4. Реализовать reconnect snapshot handshake.
5. Убедиться, что закрытие Speaker не меняет Presentation.

**Тесты:** component tests; fake transport integration; stale connection; timer pause/resume/reset; all remote controls.

**Команды проверки:** `npm run test -- src/features/speaker src/features/presentation`; `npm run build`; PASS.

**Ожидаемый результат:** отдельная вкладка показывает и управляет выступлением, а connection loss видим и безопасен.

**Commit message:** `feat: build synchronized Speaker mode`

**Phase 6 gate:** fake-transport integration PASS; реальная two-page проверка включена в Task 45.

---

# Phase 7 — Deterministic orchestration simulation

## Task 22 — Simulation state machine and event application (TDD)

**Цель:** реализовать pure reversible engine для статусов, graph, permissions и integration state.

**Зависимости:** content contracts Task 6.

**Точные файлы:** create `src/features/simulation/statusTransitions.js`, `simulationReducer.js`, `simulationSelectors.js`, `simulationReducer.test.js`, `src/lib/simulationClock.js`, `src/lib/simulationClock.test.js`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** statuses из SPEC; `applyTimelineThrough(scenario, stepIndex)` воспроизводит state с начала; back не использует inverse mutations; invalid transition returns structured failure; clock speed enum `1|2|4`.

**Пошаговые действия:**

1. Написать failing transition-table tests для allowed/denied edges.
2. Написать replay tests для forward/back/reset/skip и fixed clock.
3. Реализовать pure event reducer для agent, task, log, permission, conflict, approval и integration events.
4. Реализовать selectors для panels и screen-reader summary.
5. Проверить deterministic deep equality двух полных replays.

**Тесты:** §22.2 agent transitions/event application; all statuses reachable where valid; no random/time globals; invalid agent/event IDs fail explicitly.

**Команды проверки:** `npm run test -- src/features/simulation/simulationReducer.test.js src/lib/simulationClock.test.js`; PASS.

**Ожидаемый результат:** сценарий одинаково воспроизводится на любом speed и после backward/reset.

**Commit message:** `feat: add deterministic simulation engine`

## Task 23 — Eight scenario datasets and contract validation

**Цель:** выразить normal, failures, recovery и approvals только данными.

**Зависимости:** Task 22, source/security terminology Phase 0.

**Точные файлы:** create `src/content/simulation/scenarios.js`, `src/content/simulation/index.js`, `src/content/simulation/scenarios.test.js`; modify `src/content/index.js`, `src/lib/contentValidation.js`, `docs/content-inventory.md`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** exact IDs `normal-flow`, `blocked-task`, `file-conflict`, `missing-specification`, `unsafe-permission`, `failed-verification`, `recovery-retry`, `human-approval`; seven agents; events sorted by `at` and unique ID.

**Пошаговые действия:**

1. Написать failing schema/replay assertions для восьми IDs и required outcomes.
2. Заполнить context packages, dependency edges, shared-file conflict, retries, cost marker и human checkpoints.
3. Добавить visible simulated-output labels и permission matrix events.
4. Прогнать каждую timeline через engine и сравнить expected final state.
5. Расширить CLI validation для transitions и references.

**Тесты:** eight valid full replays; failure scenarios действительно входят в expected failure/block/approval state; recovery завершает только после approval/verification.

**Команды проверки:** `npm run test -- src/content/simulation/scenarios.test.js src/features/simulation`; `npm run validate:content`; PASS.

**Ожидаемый результат:** все orchestration cases data-driven, reproducible и содержательно различимы.

**Commit message:** `content: define orchestration simulation scenarios`

## Task 24 — Simulation controller and panels

**Цель:** дать пользователю play/pause/reset/skip/speed/step controls и полный набор panels.

**Зависимости:** Task 13, Tasks 20, 22–23.

**Точные файлы:** create `src/features/simulation/SimulationController.jsx`, `SimulationControls.jsx`, `SimulationPanels.jsx`, `SimulationController.test.jsx`; modify `src/features/speaker/syncProtocol.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** controlled `{ scenarioId, stepIndex, playing, speed }`; controller emits state changes; offscreen pauses playback; sync messages use scenario ID + step, not arbitrary state blob.

**Пошаговые действия:**

1. Написать failing fake-timer tests на play/pause/speeds/step/reset/skip/scenario switch.
2. Реализовать controller поверх pure replay engine.
3. Compose agent list, task graph, context, event log, result, permissions, integration panels.
4. Добавить accessible summary and controls; disable impossible backward/forward.
5. Подключить Speaker synchronization и ignore unknown scenario.

**Тесты:** fake timers; reduced motion; offscreen pause; keyboard controls; sync; failure/recovery visible states.

**Команды проверки:** `npm run test -- src/features/simulation`; `npm run lint`; `npm run build`; PASS.

**Ожидаемый результат:** orchestration simulation полностью управляется, синхронизируется и не делает real calls.

**Commit message:** `feat: build orchestration simulation controls`

**Phase 7 gate:** два replay одного scenario дают identical state; все восемь scenarios проходят content validation.

---

# Phase 8 — Scene renderer and complete story visuals

## Task 25 — Scene renderer registry and common scene composition

**Цель:** связать content `rendererKey` с focused visual renderers без content logic в registry.

**Зависимости:** Task 7, Tasks 12–14, Presentation Task 19.

**Точные файлы:** create `src/features/presentation/sceneRenderers.js`, `src/features/presentation/SceneRenderer.jsx`, `src/features/presentation/SceneRenderer.test.jsx`, `src/features/presentation/scenes/SharedSceneElements.jsx`; modify `src/features/explore/ExplorePage.jsx`, `src/features/presentation/PresentationPage.jsx`, `src/lib/contentValidation.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** registry covers every `rendererKey`; props exactly `SceneRendererProps`; missing key renders accessible error only in development and is validation error in build gate.

**Пошаговые действия:**

1. Написать failing registry coverage/prop tests.
2. Реализовать lazy renderer map by visual family, not per route.
3. Реализовать shared thesis, misconception, example, source and deep-dive affordances.
4. Использовать один renderer path в Explore и Presentation.
5. Проверить active-only autoplay contract.

**Тесты:** registry coverage all scenes; same content in both modes; no renderer dispatches navigation directly; lazy fallback accessible.

**Команды проверки:** `npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/explore`; `npm run validate:content`; PASS.

**Ожидаемый результат:** стабильный renderer boundary позволяет независимо создавать visual families.

**Commit message:** `feat: establish shared scene renderer registry`

## Task 26 — Scenes 1–2: Hero and Evolution

**Цель:** создать opening segment, который различает chat и agent и показывает эволюцию AI development.

**Зависимости:** Task 25.

**Точные файлы:** create `src/features/presentation/scenes/HeroScene.jsx`, `src/features/presentation/scenes/EvolutionScene.jsx`, `src/features/presentation/scenes/heroEvolution.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Hero exposes two route CTAs; Evolution consumes five ordered levels and seven comparison dimensions; обе сцены принимают только `SceneRendererProps`.

**Пошаговые действия:**

1. Написать failing tests для thesis, misconception, two CTAs, five levels, dimensions и diagram descriptions.
2. Реализовать Hero developer→orchestrator graph и Explore/Presentation entry actions.
3. Реализовать Evolution timeline с non-color comparison indicators и reduced-motion path.

**Тесты:** required content, CTA routes, keyboard access, descriptions, reduced motion, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** первые две сцены образуют самостоятельное вступление и доступны в обоих режимах.

**Commit message:** `feat: build hero and evolution scenes`

## Task 27 — Scenes 3–4: Codex workflow and Prompt-to-system

**Цель:** показать verified Codex action loop и переход от vague prompt к системе artifacts.

**Зависимости:** Tasks 2, 25–26.

**Точные файлы:** create `src/features/presentation/scenes/CodexWorkflowScene.jsx`, `src/features/presentation/scenes/PromptSystemScene.jsx`, `src/features/presentation/scenes/codexPrompt.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Codex loop consumes sourced content only; distinctions Model≠Agent, Agent≠Tool, Codex≠chat are visible; PromptSystem renders bad prompt consequences and eight-step pipeline.

**Пошаговые действия:**

1. Написать failing tests для loop stages, three distinctions, bad-prompt consequences и artifact statements.
2. Реализовать Codex workflow using local structured panels and source badges.
3. Реализовать prompt→system transformation with skip/reduced-motion behavior.

**Тесты:** source references, exact distinctions, keyboard, safe simulated labels, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/codexPrompt.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** зритель понимает действие Codex в среде и роль spec/plan/instructions/verification.

**Commit message:** `feat: build Codex and prompt system scenes`

## Task 28 — Scenes 5–6: Specification and Architecture

**Цель:** создать интерактивный spec builder и architecture decision comparison.

**Зависимости:** Tasks 25, 27.

**Точные файлы:** create `src/features/presentation/scenes/SpecificationScene.jsx`, `src/features/presentation/scenes/ArchitectureScene.jsx`, `src/features/presentation/scenes/specArchitecture.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** spec builder has deterministic local step/reset state; architecture renders simple/feature/layered choices and this-project structure without changing approved architecture.

**Пошаговые действия:**

1. Написать failing interaction tests для builder steps/reset, checklist, decision factors и anti-overengineering thesis.
2. Реализовать idea→observable spec transformation and validation checklist.
3. Реализовать architecture decision comparison and selected project tree.

**Тесты:** builder transitions/reset, keyboard, deep-dive links, diagram descriptions, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/specArchitecture.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** scenes 5–6 дают законченный путь от requirements contract к выбранной структуре.

**Commit message:** `feat: build specification and architecture scenes`

## Task 29 — Scenes 7–8: Planning and AGENTS.md

**Цель:** объяснить dependency-based plan и repository instruction scope.

**Зависимости:** Tasks 25, 28.

**Точные файлы:** create `src/features/presentation/scenes/PlanningScene.jsx`, `src/features/presentation/scenes/AgentsMdScene.jsx`, `src/features/presentation/scenes/planningAgentsMd.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Planning consumes task dependency nodes; AGENTS scene renders root/nested scope, conflict order и safe code-text examples.

**Пошаговые действия:**

1. Написать failing tests для SPEC-vs-plan, task outcome/dependency, bad/good instruction и root/nested conflicts.
2. Реализовать behavior-based planning graph.
3. Реализовать AGENTS comparison and maintenance guidance.

**Тесты:** required distinctions/examples, keyboard graph fallback, safe text rendering, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/planningAgentsMd.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** зритель различает plan и spec и понимает точные repository instructions.

**Commit message:** `feat: build planning and AGENTS scenes`

## Task 30 — Scenes 9–10: Skills/plugins and MCP

**Цель:** объяснить reusable workflows, plugin packaging и permissioned external capabilities.

**Зависимости:** Tasks 2, 25, 29.

**Точные файлы:** create `src/features/presentation/scenes/SkillsScene.jsx`, `src/features/presentation/scenes/McpScene.jsx`, `src/features/presentation/scenes/skillsMcp.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Skills scene consumes sourced workflow data; MCP scene exposes host/client/server/tools/resources/prompts and permission matrix, without universal-installation or automatic-safety claims.

**Пошаговые действия:**

1. Написать failing tests для skill/plugin distinctions, pipeline, MCP roles, required inequalities and least privilege overlay.
2. Реализовать skills/plugins workflow with qualification and conflict guidance.
3. Реализовать MCP capability graph and read/write/approval/security overlay.

**Тесты:** source badges, no universal/preinstalled claim, exact MCP distinctions, keyboard, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/skillsMcp.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** scenes 9–10 точно отделяют workflows/packages от external capability interface.

**Commit message:** `feat: build skills plugins and MCP scenes`

## Task 31 — Scene 11: Agents and subagents

**Цель:** дать самостоятельную модель delegation, isolation и случаев, когда subagent не нужен.

**Зависимости:** Tasks 25, 30.

**Точные файлы:** create `src/features/presentation/scenes/AgentsScene.jsx`, `src/features/presentation/scenes/agentsScene.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** delegation card содержит Role, Goal, Scope, Inputs, Allowed tools, Forbidden actions, Expected output, Verification и completion criteria; fit decision covers independent/small/shared-context/shared-file cases.

**Пошаговые действия:**

1. Написать failing tests для agent/tool/orchestrator distinctions, nine delegation fields, fit и non-fit criteria.
2. Реализовать agent anatomy, delegation card and decision comparison.
3. Добавить thesis об изоляции context/responsibility и human integration.

**Тесты:** exact contract fields, positive/negative criteria, keyboard, source qualification, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/agentsScene.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** scene 11 отдельно проверяется и полностью объясняет subagent delegation.

**Commit message:** `feat: build agents and subagents scene`

## Task 32 — Scene 12: Orchestration

**Цель:** встроить детерминированную simulation в главную orchestration scene без дублирования engine state.

**Зависимости:** Tasks 24–25, 31.

**Точные файлы:** create `src/features/presentation/scenes/OrchestrationScene.jsx`, `src/features/presentation/scenes/orchestrationScene.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** scene composes controlled `SimulationController`, exposes dependency/context/permission/cost/human-checkpoint panels and never mutates simulation state directly.

**Пошаговые действия:**

1. Написать failing integration tests для scenario selection, play/pause/retry/approval and panel presence.
2. Compose simulation controls/panels in `system-canvas` layout.
3. Добавить orchestration thesis, cost and human checkpoint explanation.

**Тесты:** controlled integration, failure/recovery visibility, synchronized state callback, keyboard, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/orchestrationScene.test.jsx src/features/simulation`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** главная интерактивная сцена воспроизводит normal/failure/recovery scenarios и объясняет orchestration boundaries.

**Commit message:** `feat: build orchestration scene`

## Task 33 — Scenes 13–14: Implementation and Verification

**Цель:** показать Codex implementation loop и risk-based verification ladder.

**Зависимости:** Tasks 13, 25, 32.

**Точные файлы:** create `src/features/presentation/scenes/ImplementationScene.jsx`, `src/features/presentation/scenes/VerificationScene.jsx`, `src/features/presentation/scenes/implementationVerification.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Implementation uses seven structured local panels and Read→Report stages; Verification maps behavior/risk to content/unit/component/integration/E2E/accessibility/browser/security/human checks.

**Пошаговые действия:**

1. Написать failing tests для loop, panel set, risk mappings and test-vs-verification thesis.
2. Реализовать implementation workbench with explicitly simulated output.
3. Реализовать verification ladder and evidence summary.

**Тесты:** exact panels/mappings, simulation labels, keyboard tabs, source qualification, axe.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/implementationVerification.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** scenes 13–14 связывают изменение code с наблюдением, исправлением и доказательством результата.

**Commit message:** `feat: build implementation and verification scenes`

## Task 34 — Scenes 15–16: Security and Human decision

**Цель:** завершить story capability-based security model и exact human-responsibility conclusion.

**Зависимости:** Tasks 25, 33.

**Точные файлы:** create `src/features/presentation/scenes/SecurityScene.jsx`, `src/features/presentation/scenes/HumanDecisionScene.jsx`, `src/features/presentation/scenes/securityHuman.test.jsx`; modify `src/features/presentation/sceneRenderers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** Security consumes fixed permission matrix and failure catalog; HumanDecision renders full pipeline and exact final phrase from SPEC.

**Пошаговые действия:**

1. Написать failing tests для security categories, exact permission decisions, human responsibilities and final phrase.
2. Реализовать non-color security matrix and failure/recovery explanation.
3. Реализовать complete pipeline, limitations and human decision conclusion.

**Тесты:** exact matrix decisions, required risks, no autonomy hype, keyboard, axe, source validation.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/securityHuman.test.jsx`; `npm run validate:content`; `npm run build`; PASS.

**Ожидаемый результат:** все 16 scenes завершены; финальный segment ясно сохраняет ответственность разработчика.

**Commit message:** `feat: complete security and human decision scenes`

**Phase 8 gate:** 16 scenes accessible in both modes, renderer coverage complete, timings and source references validate.

---

# Phase 9 — Deep dives and reference modes

## Task 35 — Shared deep-dive layout and contextual return

**Цель:** отрендерить 17 deep dives единым layout и точно восстановить origin.

**Зависимости:** Task 9, Tasks 12–14, 16–17.

**Точные файлы:** create `src/features/deep-dive/DeepDiveLayout.jsx`, `src/features/deep-dive/DeepDivePage.test.jsx`, `src/lib/externalLinks.js`, `src/lib/externalLinks.test.js`; modify `src/features/deep-dive/DeepDivePage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** nine ordered sections; route slug→record; close returns mode/scene/scroll/step/tab; direct URL falls back to Explore; `getSafeExternalLink(url)` accepts HTTPS only and returns `noopener noreferrer` policy.

**Пошаговые действия:**

1. Написать failing parameterized tests по всем 17 routes и nine sections.
2. Реализовать shared table of contents, headings, checklist, quick FAQ and sources.
3. Подключить origin restore and direct-link fallback.
4. Lazy-load heavy diagrams and examples per record.
5. Проверить focus: open moves to title, close restores logical trigger when present.

**Тесты:** route matrix; origin exact restoration; direct load; invalid slug; headings/focus; lazy boundaries; unsafe external protocols rejected.

**Команды проверки:** `npm run test -- src/features/deep-dive src/lib/externalLinks.test.js`; `npm run build`; PASS.

**Ожидаемый результат:** каждый deep dive доступен напрямую и возвращает пользователя в исходный контекст.

**Commit message:** `feat: render complete deep-dive library`

## Task 36 — FAQ search, categories and scene links (TDD)

**Цель:** дать быстрые concise answers с predictable search/filter behavior.

**Зависимости:** Task 10, router Task 17.

**Точные файлы:** create `src/features/faq/FaqPage.test.jsx`, `src/lib/search.js`, `src/lib/search.test.js`; modify `src/features/faq/FaqPage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** `normalizeSearchText(value)` lowercases Russian/English, normalizes `ё/е`, whitespace and punctuation; `filterFaq(items,{query,category})`; empty result gives recovery links.

**Пошаговые действия:**

1. Написать failing pure tests для Cyrillic, technical terms, category combination and stable original order.
2. Реализовать pure search/filter.
3. Написать failing UI tests на input label, clear, category, result count, scene/deep-dive links.
4. Реализовать page and featured section.
5. Проверить every answer presentation remains within content limits.

**Тесты:** unit search; component keyboard/search; route links; empty state; axe.

**Команды проверки:** `npm run test -- src/lib/search.test.js src/features/faq`; `npm run validate:content`; PASS.

**Ожидаемый результат:** FAQ быстро отвечает на весь required beginner question set.

**Commit message:** `feat: add searchable FAQ mode`

## Task 37 — Glossary and sources modes with safe links

**Цель:** дать linked terminology graph и auditable source catalog.

**Зависимости:** Tasks 2, 11, 35–36.

**Точные файлы:** create `src/features/glossary/GlossaryPage.test.jsx`, `src/features/sources/SourcesPage.test.jsx`; modify `src/features/glossary/GlossaryPage.jsx`, `src/features/sources/SourcesPage.jsx`, `src/app/router.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** glossary search reuses `normalizeSearchText`; source grouping topic/organization/volatility; `getSafeExternalLink(url)` accepts only HTTPS and returns rel policy `noopener noreferrer`.

**Пошаговые действия:**

1. Написать failing tests на term search, related terms/scenes, grouping and unsafe protocols.
2. Реализовать glossary short/expanded views without circular navigation traps.
3. Реализовать source filters, checked date and volatility labels.
4. Подключить safe external links with visible external destination affordance.
5. Проверить mobile reading and long URLs.

**Тесты:** search, expansion, relations, grouping, safe link allow/deny, axe.

**Команды проверки:** `npm run test -- src/features/glossary src/features/sources src/lib/externalLinks.test.js`; `npm run validate:content`; PASS.

**Ожидаемый результат:** пользователь исследует термины и проверяет provenance claims без unsafe navigation.

**Commit message:** `feat: add glossary and source reference modes`

**Phase 9 gate:** все route records доступны; cross-links/content validation PASS; direct deep-dive and return behavior verified.

---

# Phase 10 — Integration, responsive, performance and accessibility

## Task 38 — Shared semantics, focus and automated accessibility gate

**Цель:** закрыть cross-route semantic, dialog/focus и non-color status risks общими primitives.

**Зависимости:** Tasks 12–37.

**Точные файлы:** create `src/test/accessibility.test.jsx`; modify `src/components/ui/Dialog.jsx`, `src/components/ui/Drawer.jsx`, `src/components/ui/Tabs.jsx`, `src/components/ui/Tooltip.jsx`, `src/components/ui/StatusIndicator.jsx`, `src/components/diagrams/DiagramFrame.jsx`, `src/components/diagrams/TaskGraph.jsx`, `src/components/navigation/ChapterNav.jsx`, `src/components/navigation/SceneFrame.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** representative axe matrix covers app shell, dialogs, graph/list fallback and navigation; overlays trap/restore focus; status has text/icon; diagrams always expose descriptions.

**Пошаговые действия:**

1. Написать failing axe/focus tests for shared primitives and representative route compositions.
2. Исправить only shared semantic/focus/non-color failures в перечисленных components.
3. Проверить heading/landmark composition and screen-reader summaries.

**Тесты:** zero critical axe violations, dialog/drawer focus trap/restore, keyboard tabs, status/diagram accessible names.

**Команды проверки:** `npm run test -- src/test/accessibility.test.jsx src/components/ui src/components/diagrams src/components/navigation`; `npm run lint`; PASS.

**Ожидаемый результат:** shared accessibility behavior имеет отдельный automated gate до browser E2E.

**Commit message:** `fix: harden shared accessibility semantics`

## Task 39 — Responsive route shells and reference modes

**Цель:** обеспечить desktop/laptop/tablet/mobile layouts для route-level shells и reading modes.

**Зависимости:** Task 38.

**Точные файлы:** create `src/test/responsiveFixtures.test.jsx`; modify `src/styles/tokens.css`, `src/styles/global.css`, `src/features/explore/ExplorePage.jsx`, `src/features/presentation/PresentationPage.jsx`, `src/features/presentation/PresentationControls.jsx`, `src/features/presentation/SceneMap.jsx`, `src/features/speaker/SpeakerPage.jsx`, `src/features/deep-dive/DeepDivePage.jsx`, `src/features/deep-dive/DeepDiveLayout.jsx`, `src/features/faq/FaqPage.jsx`, `src/features/glossary/GlossaryPage.jsx`, `src/features/sources/SourcesPage.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** viewport fixtures `1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`; mobile Explore/reference modes remain fully readable; Speaker remains desktop-first without broken mobile layout.

**Пошаговые действия:**

1. Создать fixture assertions for overflow-safe route shells and panel/tab fallbacks.
2. Исправить navigation, spacing, headings, controls and long Russian text only in listed route files.
3. Проверить mobile reading order and touch target visibility.

**Тесты:** route-shell component fixtures, no horizontal document overflow, logical reading order, controls remain reachable.

**Команды проверки:** `npm run test -- src/test/responsiveFixtures.test.jsx src/features/explore src/features/deep-dive src/features/faq src/features/glossary src/features/sources`; `npm run build`; PASS.

**Ожидаемый результат:** все route shells и reference modes устойчивы на пяти required viewport classes.

**Commit message:** `fix: harden responsive route shells`

## Task 40 — Responsive scenes 1–8

**Цель:** проверить и исправить visual layouts первой половины истории на laptop/tablet/mobile.

**Зависимости:** Task 39.

**Точные файлы:** create `src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx`; modify `src/styles/global.css`, `src/features/presentation/scenes/HeroScene.jsx`, `src/features/presentation/scenes/EvolutionScene.jsx`, `src/features/presentation/scenes/CodexWorkflowScene.jsx`, `src/features/presentation/scenes/PromptSystemScene.jsx`, `src/features/presentation/scenes/SpecificationScene.jsx`, `src/features/presentation/scenes/ArchitectureScene.jsx`, `src/features/presentation/scenes/PlanningScene.jsx`, `src/features/presentation/scenes/AgentsMdScene.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** each graph/timeline/split/editorial layout has compact list/tab fallback and preserves thesis, controls and diagram description.

**Пошаговые действия:**

1. Написать failing layout fixture tests for scenes 1–8 at 1024, 768 and 390 widths.
2. Исправить overflow, panel stacking, typography and control wrapping only in listed scene files.
3. Проверить long Russian copy and reduced-motion static state.

**Тесты:** scene fixture render, interaction remains reachable, no clipped thesis/code/graph label, axe regression.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx`; `npm run build`; PASS.

**Ожидаемый результат:** scenes 1–8 читаемы и функциональны на laptop/tablet/mobile reading layout.

**Commit message:** `fix: harden responsive scenes one through eight`

## Task 41 — Responsive scenes 9–16

**Цель:** проверить capability, orchestration, verification и security visuals второй половины истории.

**Зависимости:** Task 40.

**Точные файлы:** create `src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx`; modify `src/styles/global.css`, `src/features/presentation/scenes/SkillsScene.jsx`, `src/features/presentation/scenes/McpScene.jsx`, `src/features/presentation/scenes/AgentsScene.jsx`, `src/features/presentation/scenes/OrchestrationScene.jsx`, `src/features/presentation/scenes/ImplementationScene.jsx`, `src/features/presentation/scenes/VerificationScene.jsx`, `src/features/presentation/scenes/SecurityScene.jsx`, `src/features/presentation/scenes/HumanDecisionScene.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** permissions/task graph/workbench/security matrix expose compact tab/list fallbacks without removing content or simulation controls.

**Пошаговые действия:**

1. Написать failing layout fixture tests for scenes 9–16 at 1024, 768 and 390 widths.
2. Исправить panel density, graph fallback, matrix labels, terminal/code overflow and controls only in listed scene files.
3. Проверить simulation and final pipeline remain understandable with static/reduced motion.

**Тесты:** responsive scene fixtures, simulation controls reachable, no clipped matrix/status, axe regression.

**Команды проверки:** `npm run test -- src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx`; `npm run build`; PASS.

**Ожидаемый результат:** scenes 9–16 сохраняют полный смысл и управление на laptop/tablet/mobile reading layout.

**Commit message:** `fix: harden responsive scenes nine through sixteen`

## Task 42 — Motion, lazy-loading and performance policies

**Цель:** обеспечить reduced motion, offscreen pause и bounded production loading перед E2E.

**Зависимости:** Tasks 38–41.

**Точные файлы:** create `src/test/performancePolicies.test.jsx`; modify `src/styles/motion.css`, `src/app/router.jsx`, `src/features/presentation/SceneRenderer.jsx`, `src/hooks/useReducedMotionPreference.js`, `src/hooks/useInViewportPause.js`, `src/features/simulation/SimulationController.jsx`, `src/features/deep-dive/DeepDivePage.jsx`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** deep dives/heavy diagrams remain lazy; simulations pause outside viewport; reduced motion skips nonessential transitions; no uncontrolled animation loop or runtime asset request.

**Пошаговые действия:**

1. Написать failing tests for route laziness, media-query preference, offscreen pause and cleanup.
2. Исправить lazy boundaries, motion resolution and pause/resume ownership only in listed files.
3. Build production assets, document chunk inventory and inspect runtime console/network behavior.

**Тесты:** lazy imports, reduced motion, observer cleanup, simulation pause, production build chunk inspection.

**Команды проверки:** `npm run test -- src/test/performancePolicies.test.jsx src/hooks src/features/simulation`; `npm run lint`; `npm run build`; `du -h dist/assets/* | sort -h`; PASS and chunk inventory recorded without invented size threshold.

**Ожидаемый результат:** app obeys motion preferences, avoids eager heavy routes and pauses non-visible simulation work.

**Commit message:** `perf: enforce motion and loading policies`

## Task 43 — Final application, architecture and security documentation

**Цель:** описать реально реализованное и уже прошедшее cross-cutting hardening приложение, его окончательные architecture boundaries и threat model без повторного определения operating rules.

**Зависимости:** Tasks 38–42; public APIs Phases 3–9 стабилизированы.

**Точные файлы:** create `README.md`, `docs/architecture.md`, `docs/security-model.md`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** README документирует фактические setup/modes/commands; architecture фиксирует реализованные layers, state ownership, sync, simulation и content boundaries; security model содержит assets, threats, trust boundaries, mitigations и residual risks.

**Пошаговые действия:**

1. Документировать проверенные setup, routes, modes, keyboard controls, testing commands и local-only behavior в README.
2. Записать actual public contracts, dependency graph, state ownership, lazy boundaries и synchronization protocol в architecture doc.
3. Провести threat modeling для storage, external links, supply chain, simulated terminal/MCP, browser channels and untrusted content.
4. Сверить документацию с реализованными file paths и command names; не переносить в неё отсутствующее behavior.

**Тесты:** commands in README exist in package; documented routes/files exist; no claim of real API/backend; security mitigations map to implemented controls and tests.

**Команды проверки:** `node -e "const p=require('./package.json'); for (const s of ['dev','build','lint','test','test:e2e','validate:content','verify','audit']) if(!p.scripts[s]) process.exit(1)"`; `npm run lint`; PASS.

**Ожидаемый результат:** README, architecture и security docs точно описывают фактически реализованный и hardened v1; `AGENTS.md` и `START_HERE.md` из Task 1 не изменяются.

**Commit message:** `docs: finalize application architecture and security guides`

**Phase 10 gate:** Tasks 38–42 quality checks PASS; browser matrix evidence recorded; no critical overflow/console errors; Task 43 documentation matches the hardened application.

---

# Phase 11 — E2E, security review and final human acceptance

## Task 44 — Playwright Explore and Presentation journeys

**Цель:** доказать основной путь от landing до завершения Presentation, включая keyboard, deep-dive return и refresh recovery.

**Зависимости:** Phase 10.

**Точные файлы:** create `tests/e2e/helpers.js`, `tests/e2e/explore.spec.js`, `tests/e2e/presentation.spec.js`; modify `playwright.config.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** helpers используют role/name/test-visible state и fail on console error; tests cover `/`, `/story`, `/present/:sceneId`, deep-dive origin and refresh state without CSS selectors.

**Пошаговые действия:**

1. Настроить deterministic webServer/baseURL/browser projects and console collector.
2. Написать failing Explore flow: open, navigate chapters, start Presentation.
3. Написать failing Presentation flow: keys, map, deep dive, return same scene, refresh restore, finish/exit.
4. При product failure остановить Task 44 и вернуть defect в owning task; менять только listed test/config files.

**Тесты:** Explore alias/anchors, Presentation keyboard boundaries, map/deep dive/return, refresh recovery, fullscreen graceful failure and clean console.

**Команды проверки:** `npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/presentation.spec.js --project=chromium`; PASS.

**Ожидаемый результат:** главный viewer/presenter journey подтверждён отдельным reproducible Chromium E2E gate.

**Commit message:** `test: cover Explore and Presentation journeys`

## Task 45 — Playwright Speaker synchronization journey

**Цель:** доказать bidirectional two-page sync и disconnected behavior независимо от прочих E2E flows.

**Зависимости:** Task 44 и Phase 6 gate.

**Точные файлы:** create `tests/e2e/speaker-sync.spec.js`; modify `tests/e2e/helpers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** test creates Presentation and Speaker pages in one browser context; waits on visible acknowledged state, not time delay; validates scene/timer/simulation commands and connection indicator.

**Пошаговые действия:**

1. Написать failing two-page handshake/current-next scene test.
2. Добавить next/previous/jump, timer and simulation command assertions in both directions.
3. Close/reopen Speaker page and verify disconnected/reconnect snapshot behavior.
4. При product failure остановить и вернуть defect в Tasks 20–21.

**Тесты:** handshake, bidirectional commands, sequence ordering, close/disconnect, reconnect snapshot, Presentation independence after Speaker close.

**Команды проверки:** `npm run test:e2e -- tests/e2e/speaker-sync.spec.js --project=chromium`; PASS.

**Ожидаемый результат:** cross-window behavior имеет отдельный стабильный browser gate и не зависит от остальных specs.

**Commit message:** `test: verify Speaker synchronization journey`

## Task 46 — Playwright orchestration simulation journeys

**Цель:** доказать deterministic controls и required failure/recovery scenarios в browser.

**Зависимости:** Tasks 32, 42, 44.

**Точные файлы:** create `tests/e2e/simulation.spec.js`; modify `tests/e2e/helpers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** scenario assertions use scenario IDs and visible status/result; reset replay returns identical summaries; speed affects timing only, not final state.

**Пошаговые действия:**

1. Написать failing normal-flow play/pause/step/back/reset/skip tests.
2. Добавить blocked-task, unsafe-permission, failed-verification and recovery-retry journeys.
3. Сравнить summary after two resets/replays and verify simulated labels.
4. При product failure остановить и вернуть defect в Tasks 22–24 or 32.

**Тесты:** deterministic replay, all controls, required failure/approval/recovery visibility, reduced-motion state and clean console.

**Команды проверки:** `npm run test:e2e -- tests/e2e/simulation.spec.js --project=chromium`; PASS.

**Ожидаемый результат:** orchestration simulation подтверждена отдельно от presentation navigation and Speaker transport.

**Commit message:** `test: verify orchestration simulation journeys`

## Task 47 — Reference modes, keyboard, responsive and browser visual verification

**Цель:** закрыть remaining routes, keyboard-only, reduced-motion, viewport и manual/browser visual matrix.

**Зависимости:** Tasks 44–46.

**Точные файлы:** create `tests/e2e/reference-modes.spec.js`, `tests/e2e/accessibility-keyboard.spec.js`, `tests/e2e/responsive.spec.js`, `docs/browser-verification.md`; modify `tests/e2e/helpers.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** E2E covers FAQ/glossary/sources/17 deep dives/404; viewports laptop and mobile; browser-verification rows contain `{ surface, viewport, browser, focus, overflow, console, result }`.

**Пошаговые действия:**

1. Написать reference route/search/link/unknown-route tests.
2. Написать keyboard-only and reduced-motion flow from home through presentation/deep dive/FAQ.
3. Написать laptop/mobile Explore and reference-mode responsive tests.
4. Manually/browser-tool verify Hero, timeline, SPEC, AGENTS, MCP, graph, terminal, security matrix, Speaker, Russian text, focus, overflow and console; record evidence.
5. Run Chromium full suite and Firefox/WebKit critical route/keyboard subset; no silent skips.

**Тесты:** all reference routes, searches, safe links, keyboard focus, reduced motion, laptop/mobile layouts, 404 and visual/browser checklist.

**Команды проверки:** `npm run test:e2e`; `npm run test:e2e -- --project=chromium`; PASS; `rg -n "fail|critical overflow|console error" docs/browser-verification.md` returns no unresolved result rows.

**Ожидаемый результат:** все remaining user-visible routes and browser verification surfaces имеют recorded cross-browser evidence.

**Commit message:** `test: verify reference accessibility and responsive journeys`

## Task 48 — Security, dependency and content re-review

**Цель:** независимо проверить capability boundaries и актуальность публичных claims перед репетицией.

**Зависимости:** Tasks 43–47.

**Точные файлы:** create `docs/security-review.md`; modify `package.json`, `package-lock.json`, `docs/security-model.md`, `docs/content-fact-check.md`, `src/content/sources/sources.js`, `src/content/scenes/scenes.js`, `src/content/deep-dives/deepDives.js`, `src/content/faq/faq.js`, `src/content/glossary/glossary.js`, `docs/implementation-progress.md`.

**Интерфейсы/контракты:** review result rows `{ check, evidence, result, residualRisk, ownerDecision }`; audit findings categorized exploitability/runtime reachability/mitigation; updated sources keep stable IDs.

**Пошаговые действия:**

1. Search production source for eval, unsafe HTML, dynamic execution, remote runtime requests, secrets, broad storage and unsafe links.
2. Run dependency audit and manually assess every nonzero finding; update only justified dependencies/lockfile and rerun all gates.
3. Re-open every high-volatility primary source; update `checkedAt`, qualify changed claims or remove unsupported claims.
4. Review educational least privilege, approvals, secrets, shell, production, injection, MCP trust, supply chain, logs, rollback and escalation coverage.
5. Confirm Simulation/terminal/MCP labels and no real capability path.

**Тесты:** security grep; external-link unit tests; content validation; audit interpretation; regression verify.

**Команды проверки:** `rg -n "dangerouslySetInnerHTML|\beval\(|new Function|fetch\(|XMLHttpRequest|WebSocket" src`; expected zero unexplained production matches. `npm run audit`; `npm run validate:content`; `npm run verify`; results recorded exactly, verify PASS.

**Ожидаемый результат:** documented residual risk, current claims и подтверждённые local-only capability boundaries.

**Commit message:** `security: complete application and content review`

## Task 49 — Final rehearsal, acceptance walkthrough and release evidence

**Цель:** завершить human acceptance на реальном laptop/mobile browser и подтвердить educational timing.

**Зависимости:** Tasks 47–48; это последняя задача.

**Точные файлы:** create `docs/final-verification.md`; modify `docs/implementation-progress.md`.

**Интерфейсы/контракты:** verification record содержит environment, commit, date, commands, 22 walkthrough steps, normal/compact timings, screenshots references, issues/fixes, residual limitations и human sign-off.

**Пошаговые действия:**

1. На clean install выполнить full technical gate и записать exact command outputs/commit.
2. Пройти все 22 шага §28 SPEC на laptop viewport, включая Speaker separate page and failure/recovery cases.
3. Пройти mobile Explore/FAQ/glossary/deep dives и unknown route.
4. Провести normal rehearsal 30–40 минут и compact rehearsal 25–30 минут; записать scene-level overruns.
5. Проверить final thesis, terminology consistency, no unsupported claims, no console errors and no critical overflow.
6. Если найден defect, остановить Task 49, вернуть работу в задачу-владельца с её точным file list, повторить затронутый phase gate и весь `npm run verify`; не подписывать документ до PASS.
7. Записать human sign-off или конкретный failed acceptance criterion; отсутствие sign-off означает, что продукт не готов.

**Тесты:** clean-install gate, full Playwright, human walkthrough, browser/accessibility/security/content/timing review.

**Команды проверки:** `npm ci`; `npm run verify`; `npm run audit`; ожидается verify PASS, audit интерпретирован в security review, walkthrough без unresolved critical findings.

**Ожидаемый результат:** `docs/final-verification.md` содержит доказательства каждого Product DoD и acceptance criterion, а не декларацию готовности.

**Commit message:** `docs: record final verification and rehearsal`

**Phase 11 gate / Product gate:** только signed `docs/final-verification.md` + PASS `npm run verify` + reviewed audit + актуальный fact-check разрешают считать v1 завершённой.

---

## 5. Coverage matrix

| Существенное требование SPEC | Задачи |
|---|---|
| Repository operating rules, START_HERE and progress evidence | 1 |
| Product/audience/narrative/16 scenes/normal and compact timing | 2–3, 7–8, 26–34, 49 |
| Explore mode | 17–18, 25–34, 39, 44, 47 |
| Presentation keyboard/fullscreen/map/progress/restore | 15–19, 25–34, 38–42, 44–47 |
| Speaker current/next/notes/timer/control/sync/disconnect | 8, 20–21, 38–39, 45 |
| Deep-dive content, origin restoration and 17 routes | 9, 16–17, 35, 39, 47 |
| FAQ format/questions/search/links | 10, 36, 39, 47 |
| Glossary terms/relations/search | 3, 11, 36–37, 39, 47 |
| Sources, volatility and fact-check | 2–3, 7–11, 27, 30, 35, 37, 48–49 |
| Visual identity/layouts/components/motion | 5, 12–14, 25–34, 38–42, 47 |
| Orchestration simulation/eight scenarios/sync | 20, 22–24, 32, 42, 45–46 |
| React/Vite/JavaScript and required tooling | 1, 4–6 |
| State reducer/persistence/router | 15–17 |
| Accessibility semantics, keyboard, focus, reduced motion | 5, 12–14, 18–21, 25–34, 38, 42, 44–47 |
| Responsive desktop/laptop/tablet/mobile reading | 5, 18–19, 25–34, 39–41, 47, 49 |
| Performance/lazy loading/local assets/offscreen pause | 4–5, 14, 17, 24–25, 35, 42, 47 |
| Application and educational security | 1–3, 23, 27, 30, 34–35, 43, 47–49 |
| Content validation and unit tests | 6–11, 15–16, 22–23, 36 |
| Component and integration tests | 12–21, 24–42 |
| Playwright E2E and browser verification | 44–47 |
| README, architecture, security and verification artifacts | 1, 43, 47–49 |
| Definition of Done and final human walkthrough | 38–49 |

## 6. Специально исключено из первой версии

- sound;
- backend, authentication, CMS и server-side persistence;
- реальные Codex, MCP, shell и production calls;
- remote presentation platform и multi-user audience controls;
- real multi-agent orchestrator, исполнение пользовательского code и загрузка сторонних plugins;
- analytics, telemetry и user data collection;
- обучение LLM internals и обзор всех coding agents;
- полноценная оптимизация Speaker mode для mobile;
- 3D libraries, large video и runtime network dependency.

Эти исключения взяты из approved SPEC и не являются сокращением заявленного v1 scope.

## 7. Правило исполнения

Перед каждой задачей исполнитель читает Global constraints, dependencies и contracts; создаёт failing test там, где поведение детерминировано; меняет только перечисленные файлы; выполняет точные проверки и обновляет progress evidence. Внутри approved phase исполнитель автоматически переходит к следующей задаче только после PASS; после phase gate останавливается для human review. Если проверка требует изменить не перечисленный файл, задача останавливается и план пересматривается до редактирования; silent scope/design changes запрещены.
