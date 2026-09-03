# WebZaim Agentic Presentation Redesign

## Purpose

Replace the current agentic presentation narrative with a 14-scene, 15–20 minute practical story about introducing coding agents into an existing repository. The presentation must make the application itself a real case study without presenting it as a special or magical exception: it is one feature among many possible features.

The redesign answers one primary question:

> How can a development team introduce a coding agent into an existing project so that repetitive work becomes faster without losing architectural control, safety, or human accountability?

The product remains a local React + Vite + JavaScript application. All Codex, MCP, runtime, orchestration, and verification activity shown in the application remains a deterministic local simulation. No backend, remote runtime API, analytics, or user data collection is added.

## Approved visual direction

Use the WebZaim dark graphite direction from the supplied brand book.

### Brand tokens

| Role | Value | Use |
|---|---:|---|
| Base surface | `#2A3346` | Page, slide, code and architecture surfaces |
| Primary action | `#007DEE` | Primary actions, progress route, highlighted relationships |
| Success / verification | `#00E5BA` | Completed checks, safe boundaries, confirmed evidence |
| Information | `#14B2C6` | Secondary diagrams and metadata |
| Light surface | `#DAEEFF` | Light panels, muted backgrounds, readable contrast |
| Primary text | `#FFFFFF` | Headlines and high-priority text |

Use Manrope as the local, open-source substitute for the brand book’s Gilroy Regular/Semibold. Download it as local font assets; do not load a remote font at runtime. Use weights 400, 600, and 700.

The real WebZaim wordmark/icon will be extracted from the supplied brand book and used sparingly: on the landing hero and in the presentation header. It must not be redrawn, replaced by a generated logo, or repeated inside every diagram.

### Visual language

- Dark graphite is the primary field, not a generic black “cyber” background.
- A bright, animated Aqua path is the recurring brand element. It represents the path of a feature through the engineering process.
- Aquamarine represents evidence, completion, verified constraints, and safe boundaries.
- Use white or Alice Blue content on graphite for strong presentation contrast.
- Use large Manrope display typography, compact explanatory copy, rounded cards, and clear spacing.
- Do not use the previous grid-heavy terminal aesthetic as the dominant visual language.
- Use CSS shapes and gradients for the route; do not create a new synthetic SVG logo or illustration.
- Honour `prefers-reduced-motion`: the route and all transitions become static or near-static when reduced motion is requested.

## Product surfaces

The product contains only two audience-facing surfaces:

1. A minimal landing page with the project statement, the WebZaim mark, a compact preview of the feature route, and one clear “Начать презентацию” action.
2. A presentation route with 14 scenes, keyboard navigation, full-screen support, a slide counter, contextual hover tooltips, and the existing right-side speaker drawer renamed or retained as “Текст доклада”.

Do not add Speaker mode, Explore mode, scene map, deep dives, FAQ, glossary, or extra dashboard/navigation surfaces back into the audience flow. Existing unused code may remain until a later scoped cleanup; the redesign does not require a destructive deletion pass.

## Universal presentation composition

Every presentation scene uses the same readable frame:

```text
[ WebZaim · Агентная разработка ]                         [ 06 / 14 ]

                 One large, expandable central idea
                 One short on-screen cue

             One diagram, file tree, evidence view, or code view

[ Предыдущая ] [ Следующая ] [ Текст доклада ] [ Полный экран ]
```

The central idea must stay compact enough to serve as a reminder for the presenter, not as the full explanation. Detailed text is stored in `src/content/speaker-notes` and rendered only inside the existing drawer. Product content remains in `src/content`; JSX only renders structured content.

Each non-trivial node inside a diagram has a hover/focus tooltip. Tooltips are short, centered over their source element, positioned above it when room allows, and never reflow the slide layout. They clarify the local element, not restate the scene title.

## Narrative route and scenes

The 14 scenes form one continuous story. The running example is the real interactive presentation feature in this repository. On each scene, briefly state that the same process also applies to a product screen, an API integration described by Swagger, an automated check, or another bounded feature.

### 1. This presentation is also a feature

- **On-screen idea:** `Эта презентация — тоже фича`
- **Cue:** `Агент помог собрать её за несколько коротких запросов.`
- **Visual:** a feature card moving from “Идея” to “Работающий сайт”; WebZaim wordmark appears only here and in the header.
- **Tooltip targets:** idea, context, implementation, checked result.
- **Drawer purpose:** explain that the demonstration is not about a magical site generator. A presentation, a product screen, an API integration, or a CI improvement all require the same controlled handoff from intent to verified output.

### 2. Agentic development is process design

- **On-screen idea:** `Код стал быстрее. Процесс стал важнее.`
- **Cue:** `Архитектура → паттерны → файлы`
- **Visual:** three altitude bands. Architecture and critical interfaces are owned by humans; patterns are shared team decisions; file-level implementation is the high-leverage agent layer.
- **Tooltip targets:** architecture, patterns, file-level work.
- **Drawer purpose:** explain why developer value shifts toward product judgement, architecture, boundaries, and proof rather than only typing speed.

### 3. The recurring cost is context recovery

- **On-screen idea:** `Мы повторяем уже известные решения вручную.`
- **Cue:** `Поиск примера → реализация → проверка → снова поиск`
- **Visual:** a loop with UI pattern, Swagger contract, styling rule, test command, and reviewer comment feeding the same task.
- **Tooltip targets:** current pattern, API contract, team agreement, check.
- **Drawer purpose:** identify the practical pain: developers repeatedly rediscover contemporary components, API conventions, error states, commands, and verbal team agreements.

### 4. Documentation does not replace code

- **On-screen idea:** `Записываем правило один раз — используем много раз.`
- **Cue:** `Вопрос → короткое правило → следующая фича быстрее`
- **Visual:** “knowledge in a person/chat” flows into a concise repository rule, then helps a subsequent feature.
- **Tooltip targets:** repeated question, durable rule, next feature.
- **Drawer purpose:** distinguish a compact, tested decision record from an encyclopedia. A document is justified only when it makes the next similar task safer or faster.

### 5. Begin with a bounded feature

- **On-screen idea:** `Сначала маленький, обратимый scope.`
- **Cue:** `Понятный результат. Явные границы. Проверка.`
- **Visual:** two columns: a safe first task (isolated UI/API/test) and an unsafe first task (payments, permissions, destructive legacy refactor).
- **Tooltip targets:** scope, allowed files, prohibited area, verification.
- **Drawer purpose:** explain that the first agent task should be in a domain the team already understands and can independently judge.

### 6. Context is a map of the repository

- **On-screen idea:** `Контекст — это карта, а не большой prompt.`
- **Cue:** `Правила → задача → нужный слой → проверки`
- **Visual:** real, slightly reduced folder tree from this repository:

```text
AGENTS.md
SPEC.md
IMPLEMENTATION_PLAN.md
docs/
  architecture.md
  implementation-progress.md
src/
  content/scenes/
  content/speaker-notes/
  features/presentation/
  components/diagrams/
  components/ui/
  state/
tests/e2e/
```

- **Tooltip targets:** each root artifact and each `src` responsibility.
- **Drawer purpose:** explain the distinction among README, AGENTS, docs, local module rules, feature SPEC, code, and tests. This is an onboarding map for a new developer as well as an agent.

### 7. Give the agent the right shelf, not the warehouse

- **On-screen idea:** `Узкий контекст делает агента точнее.`
- **Cue:** `Эталон → контракт → scope → legacy boundary`
- **Visual:** a spotlight connects a modern UI module, Swagger/API contract, permitted files, and a locked legacy module.
- **Tooltip targets:** modern example, contract, allowed scope, legacy boundary.
- **Drawer purpose:** show how to prevent the agent from choosing the first legacy pattern it finds. The human selects current examples and constraints; the agent reuses them quickly.

### 8. SPEC preserves intent

- **On-screen idea:** `Контекст говорит “где”. SPEC говорит “что”.`
- **Cue:** `Цель · сценарий · границы · приёмка`
- **Visual:** readable feature contract card with the four fields and acceptance evidence.
- **Tooltip targets:** goal, scenario, boundaries, acceptance.
- **Drawer purpose:** explain that an existing project needs a compact feature contract, not a new description of the entire system. The agent confirms its understanding before planning.

### 9. A feature moves through a production line

- **On-screen idea:** `Не prompt → код. А brief → proof.`
- **Cue:** `Brief → Plan → Prove → Handoff → Review → Show`
- **Visual:** the brand route travels across six stations. Each station is a compact card, and the current station highlights when hovered.
- **Tooltip targets:** brief, plan, prove, handoff, review, show.
- **Drawer purpose:** show the separation of intent, decomposed work, acceptance criteria, execution contract, independent review, and human-readable evidence. This is a conceptual workflow, not a requirement for six tools or overnight automation.

### 10. Give the agent a way to prove its work

- **On-screen idea:** `Агенту нужны доказательства, а не только инструкции.`
- **Cue:** `Tests · Build · Browser · Screenshot · Evidence`
- **Visual:** evidence board receiving five concrete proof artifacts. Green marks indicate completed checks.
- **Tooltip targets:** test, build, browser, screenshot, evidence.
- **Drawer purpose:** explain why fast local checks, reproducible environments, test data, browser inspection, and screenshots help the agent find obvious errors without human babysitting.

### 11. Separate roles when it reduces risk

- **On-screen idea:** `Субагенты нужны для ролей, а не количества.`
- **Cue:** `Исследователь → Исполнитель → Reviewer`
- **Visual:** three cards pass a structured work order along the animated route. A coordinating human/lead marker remains above the path.
- **Tooltip targets:** researcher, executor, reviewer, work order.
- **Drawer purpose:** explain that the work order includes objective, sources, allowed files, constraints, checks, risks, evidence, and stop conditions. Independent work can be parallel; changes to shared files remain sequential or isolated.

### 12. The reviewer checks facts, not the report

- **On-screen idea:** `Исполнитель не оценивает собственную работу.`
- **Cue:** `SPEC + diff + evidence → verdict`
- **Visual:** three source cards flow into a verdict panel: scope respected, acceptance met, risk found, or human decision required.
- **Tooltip targets:** SPEC, diff, evidence, verdict.
- **Drawer purpose:** explain fresh-eyes review and its limitations. A reviewer tries to falsify the result, but human approval remains necessary for critical decisions.

### 13. First give the agent eyes, then hands

- **On-screen idea:** `Инструменты расширяют действие только по необходимости.`
- **Cue:** `Код и docs → browser and logs → bounded actions`
- **Visual:** three growing permission rings: read context, observe runtime, perform narrow approved actions. The outermost ring visibly requires approval.
- **Tooltip targets:** code/docs, browser/logs, bounded tool, approval.
- **Drawer purpose:** introduce MCP only as a way to expose controlled capabilities. Explain least privilege, protected secrets, auditability, reversibility, and explicit approval for risky actions.

### 14. The agent scales team experience

- **On-screen idea:** `Следующая фича должна пройти лучше предыдущей.`
- **Cue:** `Боль → контекст → фича → доказательство → новое правило`
- **Visual:** complete closed loop returning to a richer repository map. The Aqua route becomes Aquamarine at the verified step.
- **Tooltip targets:** pain, context, feature, proof, improvement.
- **Drawer purpose:** finish with a realistic adoption path: start with one known, safe task; capture only missing durable knowledge; then add local rules, review roles, stronger evidence, and tools when actual experience requires them.

## Content and interaction contracts

- Scene titles, root ideas, cues, tooltip data, visual configuration, and route order live in `src/content/scenes`.
- Full presenter prose lives in `src/content/speaker-notes`.
- The drawer opens from the persistent presentation controls, traps focus correctly, closes through its close action, Escape, and click outside the panel, then returns focus to the trigger.
- Tooltips appear for pointer hover and keyboard focus. Their contents remain concise and specific to the hovered element.
- Presentation controls remain keyboard-accessible; previous and next scene controls correctly announce unavailable states at boundaries.
- Full-screen is progressive enhancement. The presentation continues to work when browser full-screen is unavailable or declined.
- The landing page contains no expanded slide content. It introduces the subject, uses a compact route preview, and starts the presentation.

## Files expected to change during implementation

The implementation plan may refine exact task scope, but the redesign is expected to touch focused files in these areas:

- `src/content/scenes/scenes.js` and its tests;
- `src/content/speaker-notes/presenterNotes.js`;
- `src/components/diagrams/PresentationVisuals.jsx`, `InteractiveDiagram.jsx`, and focused tests;
- `src/features/presentation/PresentationPage.jsx`, scene rendering components, controls, and tests;
- `src/features/explore/ExplorePage.jsx` and landing-specific content only as required to keep the landing minimal;
- `src/styles/tokens.css`, `global.css`, and `motion.css`;
- locally hosted Manrope font assets under an approved project asset directory and their font declarations;
- a brand asset extracted from the supplied brand book under an approved asset directory;
- unit, component, integration, accessibility, and Playwright tests that cover changed behavior;
- `docs/implementation-progress.md` for factual implementation evidence.

## Verification strategy

### Content and contracts

- Validate 14 unique scene ids, expected order, root idea, cue, visual configuration, tooltip data, and non-empty speaker prose.
- Validate that speaker prose remains outside JSX.
- Validate real file-tree labels against actual repository paths.

### Visual and interaction behavior

- Component tests cover the drawer’s open, close, Escape, backdrop click, and focus return behavior.
- Component tests cover tooltip content, hover/focus access, centered positioning contract, and no layout reflow.
- Component tests cover the brand header and slide counter.
- Browser checks inspect the dark graphite palette, contrast, route visibility, and desktop-sized no-scroll presentation composition.
- Browser checks verify responsive fallbacks instead of requiring the full layout on narrow screens.
- Reduced-motion checks prove the route and scene transitions respect user preferences.

### Presentation journey

- Playwright covers landing → presentation, next/previous navigation, keyboard navigation, drawer open/close, full-screen request fallback, tooltip interaction, and exit to landing.
- Run existing content validation, lint, unit/component/integration tests, build, E2E tests, and the repository’s final `npm run verify` gate.

### Security and accessibility

- Verify no remote font request or remote runtime dependency is introduced.
- Verify no unsafe HTML, dynamic code execution, real Codex/MCP calls, secrets, or permission escalation is added.
- Verify button names, keyboard focus, focus-visible treatment, contrast, and dialog semantics.

## Deliberate exclusions

- No backend or real API calls.
- No change to the approved local-only product model.
- No recreated WebZaim logo or invented brand marks.
- No remote font loading; no unlicensed Gilroy download.
- No return of Speaker mode, Explore mode, deep dives, scene map, FAQ, glossary, or dashboard controls to the primary audience flow.
- No automatic agent autonomy claim or simulated behavior presented as real activity.

## Self-review

- Every scene has one compact screen idea, one visual object, specific tooltip targets, and drawer intent.
- The story starts with the real presentation case, moves through the implementation problem, and ends with incremental adoption.
- Brand colors, typography substitution, real-logo constraint, and reduced-motion behavior are explicit.
- The repository structure shown to the audience matches existing paths verified in the workspace.
- The design does not require a backend, live agents, external APIs, or a TypeScript migration.
- No TODO/TBD placeholders remain.
