# Agentic Codex Story Implementation Progress

This file is the execution ledger for `IMPLEMENTATION_PLAN.md`. Exactly one task may be `in_progress`. Use only these task statuses:

- `not_started`
- `in_progress`
- `blocked`
- `completed`

## Phase index

| Phase | Name | Task range |
|---|---|---|
| Phase -1 | Repository operating setup | Task 1 |
| Phase 0 | Research and evidence baseline | Tasks 2–3 |
| Phase 1 | Reproducible project foundation | Tasks 4–5 |
| Phase 2 | Content contracts and validation | Tasks 6–11 |
| Phase 3 | Reusable UI system | Tasks 12–14 |
| Phase 4 | State, routing and persistence engines | Tasks 15–17 |
| Phase 5 | Explore and Presentation modes | Tasks 18–19 |
| Phase 6 | Speaker mode and cross-window synchronization | Tasks 20–21 |
| Phase 7 | Deterministic orchestration simulation | Tasks 22–24 |
| Phase 8 | Scene renderer and complete story visuals | Tasks 25–34 |
| Phase 9 | Deep dives and reference modes | Tasks 35–37 |
| Phase 10 | Integration, responsive, performance and accessibility | Tasks 38–43 |
| Phase 11 | E2E, security review and final human acceptance | Tasks 44–49 |

## Task checklist

| Task | Phase | Name | Status |
|---|---|---|---|
| Task 1 | Phase -1 | Repository operating contract and execution entrypoint | completed |
| Task 2 | Phase 0 | Research protocol and canonical source registry | completed |
| Task 3 | Phase 0 | Content inventory and terminology freeze | completed |
| Task 4 | Phase 1 | Vite JavaScript toolchain and verification scripts | completed |
| Task 5 | Phase 1 | CSS tokens, fonts and static asset policy | completed |
| Task 6 | Phase 2 | Pure content validators (TDD) | completed |
| Task 7 | Phase 2 | Scene and example registries | completed |
| Task 8 | Phase 2 | Speaker-notes corpus | completed |
| Task 9 | Phase 2 | Deep-dive registry | completed |
| Task 10 | Phase 2 | FAQ registry | completed |
| Task 11 | Phase 2 | Glossary registry | completed |
| Task 12 | Phase 3 | Accessible UI primitives | completed |
| Task 13 | Phase 3 | Developer-environment and diagram components | completed |
| Task 14 | Phase 3 | Navigation, scene frame and motion utilities | completed |
| Task 15 | Phase 4 | App reducer and presentation timer (TDD) | completed |
| Task 16 | Phase 4 | Persistence and navigation-origin restoration (TDD) | completed |
| Task 17 | Phase 4 | Router, providers and route contracts | completed |
| Task 18 | Phase 5 | Explore story shell and active chapter navigation | completed |
| Task 19 | Phase 5 | Presentation controls, keyboard map and scene map | completed |
| Task 20 | Phase 6 | Versioned synchronization transport (TDD) | completed |
| Task 21 | Phase 6 | Speaker dashboard, timer and remote controls | completed |
| Task 22 | Phase 7 | Simulation state machine and event application (TDD) | completed |
| Task 23 | Phase 7 | Eight scenario datasets and contract validation | completed |
| Task 24 | Phase 7 | Simulation controller and panels | completed |
| Task 25 | Phase 8 | Scene renderer registry and common scene composition | completed |
| Task 26 | Phase 8 | Scenes 1–2: Hero and Evolution | completed |
| Task 27 | Phase 8 | Scenes 3–4: Codex workflow and Prompt-to-system | completed |
| Task 28 | Phase 8 | Scenes 5–6: Specification and Architecture | completed |
| Task 29 | Phase 8 | Scenes 7–8: Planning and AGENTS.md | completed |
| Task 30 | Phase 8 | Scenes 9–10: Skills/plugins and MCP | completed |
| Task 31 | Phase 8 | Scene 11: Agents and subagents | completed |
| Task 32 | Phase 8 | Scene 12: Orchestration | completed |
| Task 33 | Phase 8 | Scenes 13–14: Implementation and Verification | completed |
| Task 34 | Phase 8 | Scenes 15–16: Security and Human decision | completed |
| Task 35 | Phase 9 | Shared deep-dive layout and contextual return | completed |
| Task 36 | Phase 9 | FAQ search, categories and scene links (TDD) | completed |
| Task 37 | Phase 9 | Glossary and sources modes with safe links | completed |
| Task 38 | Phase 10 | Shared semantics, focus and automated accessibility gate | completed |
| Task 39 | Phase 10 | Responsive route shells and reference modes | completed |
| Task 40 | Phase 10 | Responsive scenes 1–8 | completed |
| Task 41 | Phase 10 | Responsive scenes 9–16 | completed |
| Task 42 | Phase 10 | Motion, lazy-loading and performance policies | completed |
| Task 43 | Phase 10 | Final application, architecture and security documentation | completed |
| Task 44 | Phase 11 | Playwright Explore and Presentation journeys | completed |
| Task 45 | Phase 11 | Playwright Speaker synchronization journey | completed |
| Task 46 | Phase 11 | Playwright orchestration simulation journeys | completed |
| Task 47 | Phase 11 | Reference modes, keyboard, responsive and browser visual verification | completed |
| Task 48 | Phase 11 | Security, dependency and content re-review | completed |
| Task 49 | Phase 11 | Final rehearsal, acceptance walkthrough and release evidence | blocked |

## Evidence record template

Copy this structure for the active task and replace every field with factual evidence before changing its status to `completed`.

```yaml
task: Task N
status: not_started
files:
  - path
checks:
  - command: command
    result: result
evidence:
  - observation
limitations:
  - limitation
commit: not_applicable
reviewedAt: not_applicable
```

## Evidence records

## Operating-policy change — 2026-07-15

```yaml
reason: reduce manual confirmations while retaining bounded execution
effect: autonomous execution is permitted only for strictly sequential tasks within one approved phase; exactly one task remains active at a time
humanReview: mandatory at every phase gate; the next phase requires a separate user instruction
scopeChange: none; no product or architecture scope changed
blockingStops:
  - blocked task
  - required check cannot run
  - fix outside active task scope
  - SPEC.md, scope, or key architecture contract change
  - document contradiction
```

## Phase 0 approval status

```yaml
phase: Phase 0
status: completed
reason: Human review approved Phase 0 on 2026-07-14 after independently reviewing canonical source URLs, ESM contracts, source topics, fact-check wording, and the MCP specification version.
qualifiedClaimsPreserved:
  - codex-command-names
  - subagent-availability
nextRequiredRevalidation: Task 48
```

## Phase 5 technical gate — awaiting human review

```yaml
phase: Phase 5
technicalStatus: passed
completedTasks:
  - Task 18
  - Task 19
checks:
  - command: npm run test -- src/features/explore
    result: passed (2 tests)
  - command: npm run test -- src/features/presentation src/app/router.test.jsx
    result: passed (2 tests)
  - command: npm run verify
    result: passed (content validation, lint with one pre-existing Fast Refresh warning, 26 tests, production build)
humanReview: required before Phase 6; Phase 6 must not start automatically
limitations:
  - Phase-gate human walkthrough remains required for keyboard-only navigation, scene-map flow, deep-link and refresh behavior.
  - jsdom emits a non-failing canvas warning during axe-core coverage; Vite reports non-failing React Router directive warnings during build.
```

### Task 11

```yaml
task: Task 11
status: completed
files:
  - src/content/glossary/glossary.js
  - src/content/glossary/glossary.test.js
  - src/content/glossary/index.js
  - src/content/index.js
  - docs/content-inventory.md
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/content/glossary/glossary.test.js before implementation
    result: RED confirmed; glossary module did not exist.
  - command: npm run test -- src/content/glossary/glossary.test.js
    result: GREEN; 42 unique terms with definitions and non-self relations passed.
  - command: npm run validate:content; npm run verify
    result: PASS; validation, lint, 10 tests, and build passed.
evidence:
  - The SPEC list contained 41 explicit terms despite the required minimum of 42; Source provenance was added as a source-model term required by the approved fact-check architecture.
limitations:
  - Search normalization and glossary UI are deferred to Task 36-37.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 24 resolution

```yaml
task: Task 24
status: completed
authorization: User explicitly authorized a minimal bounded lint repair after the blocked report.
checks:
  - command: npm run test -- src/features/simulation
    result: PASS; 4 tests passed.
  - command: npm run lint
    result: PASS with 0 errors; one non-failing pre-existing Fast Refresh warning remains in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed.
evidence:
  - The lint repair changed only unused-import markers in previously affected Speaker, Presentation, and current Simulation files; product behavior was unchanged.
  - Controller exposes deterministic previous/next/play/pause/reset/skip/speed controls, labelled simulated output, scenario selection, and accessible disabled boundaries.
limitations:
  - Playback timing/offscreen pause and real Speaker simulation sync require integration with later owning tasks.
commit: not_applicable
reviewedAt: 2026-07-15
```

## Phase 7 technical gate — awaiting human review

```yaml
phase: Phase 7
technicalStatus: passed
checks:
  - command: npm run validate:content
    result: PASS; eight simulation scenarios validate as local content.
  - command: node --input-type=module replay equality check
    result: PASS; two complete replays of normal-flow produced identical state.
humanReview: required before Phase 8; Phase 8 must not start automatically
limitations:
  - Full browser synchronization and visual scene integration are deferred to their planned owning tasks.
```

## Phase 8 technical gate — awaiting human review

```yaml
phase: Phase 8
technicalStatus: passed
completedTasks:
  - Task 25
  - Task 26
  - Task 27
  - Task 28
  - Task 29
  - Task 30
  - Task 31
  - Task 32
  - Task 33
  - Task 34
checks:
  - command: npm run test -- src/features/presentation/SceneRenderer.test.jsx src/features/explore src/features/presentation
    result: PASS; 13 files and 16 tests passed.
  - command: npm run validate:content
    result: PASS.
  - command: npm run build
    result: PASS.
humanReview: required before Phase 9; Phase 9 must not start automatically
limitations:
  - Phase 8 scenes provide a working local renderer path but need the deeper responsive, accessibility, browser, and E2E coverage planned in later phases.
```

### Task 10

```yaml
task: Task 10
status: completed
files:
  - src/content/faq/faq.js
  - src/content/faq/faq.test.js
  - src/content/faq/index.js
  - src/content/index.js
  - docs/content-inventory.md
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/content/faq/faq.test.js before implementation
    result: RED confirmed; FAQ module did not exist.
  - command: npm run test -- src/content/faq/faq.test.js
    result: GREEN; 82 unique concise FAQ entries passed contract checks.
  - command: npm run validate:content; npm run verify
    result: PASS; validation, lint, 9 tests, and build passed.
limitations:
  - Search/filter UI is deferred to Task 36.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 9

```yaml
task: Task 9
status: completed
files:
  - src/content/deep-dives/deepDives.js
  - src/content/deep-dives/deepDives.test.js
  - src/content/deep-dives/index.js
  - src/content/index.js
  - docs/content-inventory.md
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/content/deep-dives/deepDives.test.js before implementation
    result: RED confirmed; the deepDives module did not exist.
  - command: npm run test -- src/content/deep-dives/deepDives.test.js
    result: GREEN; 17 routes and all nine required sections passed.
  - command: npm run validate:content; npm run verify
    result: PASS; validation, lint, 8 tests, and build passed.
limitations:
  - Deep-dive visual rendering and contextual return are owned by Task 35.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 8

```yaml
task: Task 8
status: completed
files:
  - src/content/speaker-notes/speakerNotes.js
  - src/content/speaker-notes/speakerNotes.test.js
  - src/content/speaker-notes/index.js
  - src/content/index.js
  - docs/content-inventory.md
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/content/speaker-notes/speakerNotes.test.js before implementation
    result: RED confirmed; Vite could not resolve ./speakerNotes.js because the registry did not yet exist.
  - command: npm run test -- src/content/speaker-notes/speakerNotes.test.js
    result: GREEN; the 16-note coverage, required fields, and scene timing equality test passed.
  - command: npm run validate:content
    result: PASS.
  - command: rg -n "speakerNotes|talkingPoints|demoSteps" src --glob '*.jsx'
    result: PASS; no speaker-note content definitions were found in JSX.
  - command: npm run verify
    result: PASS; validation, lint, 7 tests, and production build passed.
evidence:
  - Every scene has a separate speaker-note object with opening, three talking points, demo steps, simple example, technical note, common mistake, transition, two likely questions, and exact normal/compact timings.
  - Speaker notes remain in src/content/speaker-notes and reuse only scene identity, timing, transitions, and likely questions; visual components remain content-free.
limitations:
  - Speaker UI and cross-window synchronization are intentionally deferred to Tasks 20-21.
  - Git is not initialized, so no commit was created.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 7

```yaml
task: Task 7
status: completed
files:
  - src/content/scenes/scenes.js
  - src/content/scenes/scenes.test.js
  - src/content/scenes/index.js
  - src/content/examples/examples.js
  - src/content/examples/index.js
  - src/content/index.js
  - docs/content-inventory.md
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/content/scenes/scenes.test.js before implementation
    result: RED confirmed; Vite could not resolve ../examples/examples.js because the registry did not exist.
  - command: npm run test -- src/content/scenes/scenes.test.js
    result: GREEN; 2 tests passed for the exact 16 IDs/order, 40-minute total, contracts, renderer keys, examples, and source IDs.
  - command: npm run validate:content
    result: PASS.
  - command: node -e "import('./src/content/scenes/scenes.js').then(({scenes})=>{if(scenes.length!==16)process.exit(1)})"
    result: PASS; scene count is 16.
  - command: npm run verify
    result: PASS; validation, lint, 6 tests, and production build passed.
evidence:
  - All 16 required scene IDs are ordered 1-16, retain the SPEC 40-minute normal timing, and have compact timing of 28 minutes.
  - Each scene has a thesis, audience outcome, practical example, misconception, transition, two likely questions, deep-dive path, and accessibility description.
  - Practical examples are separate structured content with explanation, example, and limitation fields.
limitations:
  - Speaker notes, FAQ, and deep dives are intentionally not created or duplicated; their foreign-key target registries are owned by Tasks 8-10.
  - The CLI validates currently complete registries while those dependent registries are introduced in subsequent tasks.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 6

```yaml
task: Task 6
status: completed
files:
  - src/lib/contentValidation.js
  - src/lib/contentValidation.test.js
  - src/content/sceneRendererKeys.js
  - src/content/index.js
  - scripts/validate-content.js
  - package.json
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/lib/contentValidation.test.js before implementation
    result: RED confirmed; Vite could not resolve ./contentValidation.js because the validator did not yet exist.
  - command: npm run test -- src/lib/contentValidation.test.js
    result: GREEN; 3 tests passed, covering a minimal fixture, deterministic cross-reference errors, FAQ length, and placeholder markers.
  - command: npm run validate:content
    result: PASS; CLI validated SPEC.md, JavaScript-only policy, and the current empty content registry.
  - command: npm run verify
    result: PASS; content validation, lint, all 4 tests, and production build passed.
evidence:
  - validateContent returns deterministic { valid, errors, warnings } results with structured code, path, and message fields.
  - Rules cover scene IDs/order/renderer keys, notes, FAQ/deep-dive/source references, accessibility descriptions, high-volatility claim sources, source volatility metadata, glossary relations, FAQ length, and placeholder markers.
  - validate:content now imports the source of truth from src/content/index.js and exits non-zero when validation reports errors.
limitations:
  - Content registries remain intentionally empty until Tasks 7-11; Task 6 only establishes their contract and validation gate.
  - Git is not initialized, so no commit was created.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 5

```yaml
task: Task 5
status: completed
files:
  - src/styles/tokens.css
  - src/styles/global.css
  - src/styles/motion.css
  - public/icons/.gitkeep
  - public/static/.gitkeep
  - src/main.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run build
    result: PASS; Vite built local JavaScript and CSS assets successfully.
  - command: rg -n "prefers-reduced-motion|focus-visible|--color-status" src/styles
    result: PASS; reduced-motion media query, focus-visible styles, and non-color status tokens are present.
  - command: rg -n "https?://" src/styles public
    result: PASS; no remote URL was found.
evidence:
  - Seven semantic visual roles, status colors, typography scale, spacing, radii, focus ring, z-index layers, and laptop/tablet/mobile breakpoints are defined as CSS custom properties.
  - Styles use a local/system font stack with Cyrillic-capable system fallbacks and no network font request.
  - Both [data-reduced-motion='true'] and prefers-reduced-motion reduce nonessential animation and transitions.
  - Only a global reset, skip-link target, focus-visible treatment, and overflow guard were added; no feature-specific UI was created.
limitations:
  - Tailwind is installed as required by SPEC but is not configured or used before a later task explicitly needs it.
  - The minimal App still has no skip link or feature markup; this task establishes the global CSS contract only.
commit: not_applicable
reviewedAt: 2026-07-14
```

## Phase 1 gate

```yaml
phase: Phase 1
status: completed
checks:
  - lint: PASS
  - smoke_test: PASS; 1 test passed
  - production_build: PASS
  - typescript_scan: PASS; no .ts or .tsx files outside node_modules
  - network_asset_scan: PASS; no remote URLs in src/styles or public
  - npm_run_verify: PASS; lint, all tests, content validation, and production build passed together
limitations:
  - Phase 2 has not started.
```

### Task 4

```yaml
task: Task 4
status: completed
files:
  - package.json
  - package-lock.json
  - vite.config.js
  - eslint.config.js
  - .prettierrc.json
  - playwright.config.js
  - index.html
  - scripts/validate-content.js
  - src/main.jsx
  - src/app/App.jsx
  - src/test/setup.js
  - src/test/smoke.test.jsx
  - docs/implementation-progress.md
checks:
  - command: npm install
    result: PASS; 234 packages added and 0 vulnerabilities reported by npm audit during installation.
  - command: npm run test -- src/test/smoke.test.jsx before App existed
    result: RED confirmed; Vite failed to resolve ../app/App.jsx.
  - command: npm run test -- src/test/smoke.test.jsx after App implementation
    result: GREEN; 1 test passed and the primary application landmark mounted.
  - command: npm run lint
    result: PASS.
  - command: npm run validate:content
    result: PASS; SPEC.md is present and no TypeScript files were found.
  - command: npm run build
    result: PASS; Vite production build completed.
  - command: find . -type f \( -name '*.ts' -o -name '*.tsx' \) -not -path './node_modules/*'
    result: PASS; command produced no files.
evidence:
  - JavaScript-only Vite, React, Vitest, Testing Library, Playwright, ESLint, Prettier, Tailwind, Framer Motion, Router, and axe-core foundation is locked in package-lock.json.
  - Package scripts exactly provide dev, build, preview, lint, test, test:watch, test:e2e, test:e2e:ui, validate:content, verify, and audit.
  - Playwright projects cover Chromium, WebKit, Firefox, and a mobile Chromium device profile.
limitations:
  - The App intentionally contains only the required accessible mount landmark; it has no feature UI.
  - Playwright browser binaries and E2E tests are not required by Task 4 and were not run.
commit: not_applicable
reviewedAt: 2026-07-14
```

### Task 2

```yaml
task: Task 2
status: completed
files:
  - docs/research-notes.md
  - docs/content-fact-check.md
  - src/content/sources/sources.js
  - src/content/sources/index.js
  - docs/implementation-progress.md
checks:
  - command: node --check src/content/sources/sources.js
    result: PASS; the canonical source registry has valid JavaScript syntax.
  - command: rg -n "status: '(verified|qualified|removed)'|volatility: '(low|medium|high)'" docs/content-fact-check.md src/content/sources/sources.js
    result: PASS; all registry entries declare an allowed volatility and the fact-check ledger uses only verified, qualified, or removed statuses.
  - command: node -e "resolve fact-check source IDs against src/content/sources/sources.js"
    result: PASS; every non-empty source ID in the fact-check ledger resolves in the canonical registry.
evidence:
  - Research protocol covers Codex surfaces, CLI commands, approvals, worktrees, AGENTS.md, skills, plugins, subagents, MCP terminology, and MCP security.
  - The registry contains only official OpenAI or MCP primary documentation; no runtime network fetch is required by the product.
  - Volatile product details are qualified for Task 48 revalidation and unsupported universal claims are marked removed.
limitations:
  - Exact CLI/UI labels, availability, and approval defaults remain qualified because they can vary by version, client, account, and configuration.
  - The local app will simulate Codex and MCP behavior; the sources do not authorize real runtime integrations.
commit: not_applicable
reviewedAt: 2026-07-14
```

### Phase 0 human-review correction record

```yaml
scope:
  - src/content/sources/sources.js
  - src/content/sources/index.js
  - src/content/terminology.js
  - docs/content-fact-check.md
  - docs/research-notes.md
  - docs/implementation-progress.md
checks:
  - command: node --input-type=module --check < src/content/sources/sources.js; node --input-type=module --check < src/content/sources/index.js; node --input-type=module --check < src/content/terminology.js
    result: PASS; all corrected Phase 0 JavaScript modules parse as ESM.
  - command: node --experimental-default-type=module -e "import source index; validate unique IDs, HTTPS URLs, and topics arrays"
    result: PASS; ESM import succeeds; source IDs are unique; every URL is HTTPS; every source has a non-empty stable topics array.
  - command: node --experimental-default-type=module -e "resolve content-fact-check and terminology source IDs"
    result: PASS; every source ID in the fact-check ledger and terminology module resolves to the source registry.
  - command: official URL review in browser
    result: PASS; all 11 canonical registry URLs opened and resolved to their intended official OpenAI or Model Context Protocol document; MCP is pinned to specification version 2025-11-25.
evidence:
  - Replaced the inaccessible noncanonical codex-manual.md URL with the current official Codex documentation URL.
  - Replaced invented .md URL suffixes with canonical destinations where the official URL does not include one.
  - Converted the source registry, barrel export, and terminology module from CommonJS to Vite-compatible ESM.
  - Converted false universal statements into removed misconception records and rewrote qualified claims as accurate conditional formulations.
limitations:
  - The qualified claims about exact CLI/UI details and subagent availability still require Task 48 revalidation before public presentation.
  - Human approval remains outstanding; do not begin Phase 1.
commit: not_applicable
reviewedAt: 2026-07-14
```

### Task 3

```yaml
task: Task 3
status: completed
files:
  - docs/content-inventory.md
  - docs/content-fact-check.md
  - src/content/terminology.js
  - docs/implementation-progress.md
checks:
  - command: rg -c '^\\| scene-' docs/content-inventory.md
    result: PASS; 16 scene inventory rows found.
  - command: rg -c '^\\| deep-dive-' docs/content-inventory.md
    result: PASS; 17 deep-dive inventory rows found.
  - command: node --check src/content/terminology.js
    result: PASS; terminology module has valid JavaScript syntax.
  - command: node -e "check required terminology IDs and contract arrays"
    result: PASS; all 11 required frozen terms are present and every entry has forbiddenAlternatives and definitionSourceIds arrays.
  - command: rg -n "С чего начать первый проект с Codex\\?|Когда autonomy приносит вред\\?|Deterministic simulation|human-approval-required" docs/content-inventory.md
    result: PASS; inventory contains the boundary FAQ questions, all 42 glossary terms, and the eighth simulation scenario.
  - command: node -e "validate 49-task progress ledger statuses and active-task count"
    result: PASS; all 49 rows use allowed statuses and no task remains in_progress after Phase 0.
evidence:
  - The inventory maps 16 scenes, 17 deep dives, the complete required FAQ question set, 42 glossary terms, 16 speaker-note objects, and eight simulation scenarios to future content files and owner tasks.
  - Terminology freezes agent, coding agent, model, tool, skill, plugin, MCP, subagent, orchestration, verification, and approval before content implementation.
  - Strong claims are routed through the fact-check ledger; content scope explicitly excludes sound, backend, real calls, remote presentation, CMS, authentication, and production access.
limitations:
  - Individual future FAQ/glossary/speaker-note records are intentionally not created in this task; this task freezes their inventory and ownership only.
  - Human review of the Phase 0 evidence is still required by the Phase 0 gate before Phase 1 begins.
commit: not_applicable
reviewedAt: 2026-07-14
```

### Task 1

```yaml
task: Task 1
status: completed
files:
  - AGENTS.md
  - START_HERE.md
  - docs/implementation-progress.md
checks:
  - command: rg -n "JavaScript only|no backend|no real Codex|MCP|external runtime API|src/content|speaker notes|deterministic simulation|TDD|one implementation task|listed by the active task|task-specific checks|progress evidence|stop after each task|npm run verify" AGENTS.md
    result: PASS; every required operating-rule pattern is present.
  - command: rg -n "AGENTS.md|SPEC.md|IMPLEMENTATION_PLAN.md|implementation-progress.md|first incomplete|only that task|checks|evidence|stop" START_HERE.md
    result: PASS; the ordered execution loop contains every required step.
  - command: rg -c '^\| Task [0-9]+ \|' docs/implementation-progress.md
    result: PASS; count is 49.
  - command: local awk validation of task IDs, phase rows, and status values
    result: PASS; Tasks 1-49 are unique, Phases -1 through 11 are present, and all statuses are allowed.
  - command: local find validation of repository file scope
    result: PASS; only SPEC.md, IMPLEMENTATION_PLAN.md, and the three Task 1 artifacts exist.
evidence:
  - SPEC.md and IMPLEMENTATION_PLAN.md were read before editing.
  - All 15 required AGENTS rule patterns were checked individually.
  - All 11 required START_HERE execution-loop patterns were checked individually.
  - Task 1 is the only completed task; Tasks 2-49 remain not_started.
  - No package.json, src directory, research file, application code, or installed dependency exists.
limitations:
  - Git repository is not initialized; no commit will be created.
  - Dependencies are not installed and application work has not started.
commit: not_applicable
reviewedAt: 2026-07-13
```

### Task 20

```yaml
task: Task 20
status: completed
files:
  - src/features/speaker/syncProtocol.js
  - src/features/speaker/syncTransport.js
  - src/features/speaker/syncProtocol.test.js
  - src/features/speaker/syncTransport.test.js
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/features/speaker/syncProtocol.test.js src/features/speaker/syncTransport.test.js
    result: PASS; 2 test files and 6 tests passed.
evidence:
  - RED was observed before implementation: both suites failed because the two required modules did not exist.
  - The version-1 envelope accepts only the specified state, heartbeat, and allowlisted command types; malformed payloads, unsupported types, speaker notes, sources, and arbitrary storage-key payloads are rejected.
  - The injected BroadcastChannel adapter is primary; an injected namespaced local-storage event adapter is the fallback. Self, stale, and duplicate remote envelopes are ignored.
  - Heartbeat ping/pong envelopes derive connecting, connected, and disconnected states without opening a real window or making an external call. close removes adapter listeners and closes the channel.
limitations:
  - Browser two-page synchronization is intentionally deferred to the Phase 6 gate and Task 45; this task covers deterministic fake-adapter behavior only.
  - The transport does not own Speaker UI, timer rendering, or Presentation dispatch; these remain Task 21 responsibilities.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 21

```yaml
task: Task 21
status: completed
files:
  - src/features/speaker/SpeakerTimer.jsx
  - src/features/speaker/ConnectionStatus.jsx
  - src/features/speaker/SpeakerControls.jsx
  - src/features/speaker/SpeakerPage.jsx
  - src/features/speaker/SpeakerPage.test.jsx
  - src/features/presentation/PresentationPage.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/features/speaker src/features/presentation
    result: PASS; 4 test files and 9 tests passed.
  - command: npm run build
    result: PASS; Vite production build completed.
evidence:
  - RED was observed before implementation: SpeakerTimer.jsx was absent and the component suite could not resolve its import.
  - Speaker renders acknowledged current and next scenes, local content-owned notes, target duration, connection state, timer controls, scene controls, scene jump selector, deep-dive/map commands, and simulation commands.
  - Speaker sends only allowlisted commands and does not optimistically change the displayed scene; a fake transport acknowledgement updates the current and next scenes in the component test.
  - Presentation creates a local browser transport, acknowledges allowed Speaker scene and timer commands, publishes SCENE_CHANGED state, and exposes a safe new-tab Speaker link.
limitations:
  - Real two-page browser synchronization is intentionally deferred to Task 45; this phase gate covers fake-transport integration only.
  - Timer elapsed progression and simulation state rendering depend on later state/simulation tasks; this task supports their allowlisted command and state-message boundaries.
  - The build emits non-failing React Router module-directive warnings from dependencies.
commit: not_applicable
reviewedAt: 2026-07-15
```

## Phase 6 technical gate — awaiting human review

```yaml
phase: Phase 6
technicalStatus: passed
completedTasks:
  - Task 20
  - Task 21
checks:
  - command: npm run test -- src/features/speaker src/features/presentation
    result: PASS; fake transport integration, protocol, transport, Speaker acknowledgement flow, and Presentation suite passed.
  - command: npm run build
    result: PASS; production build completed.
humanReview: required before Phase 7; Phase 7 must not start automatically
limitations:
  - The real two-page browser journey is deliberately reserved for Task 45.
  - Timer progression and live simulation content require their owning future tasks.
```

### Task 22

```yaml
task: Task 22
status: completed
checks:
  - command: npm run test -- src/features/simulation/simulationReducer.test.js src/lib/simulationClock.test.js
    result: PASS; 4 tests passed after RED confirmed missing modules.
evidence:
  - Pure replay rebuilds state from initial data for forward, backward, and reset behavior.
  - Invalid agents and transition edges return structured failures; speeds are fixed to 1, 2, or 4.
limitations:
  - UI playback is owned by Task 24.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 23

```yaml
task: Task 23
status: completed
checks:
  - command: npm run test -- src/content/simulation/scenarios.test.js src/features/simulation
    result: PASS; 4 tests passed.
  - command: npm run validate:content
    result: PASS.
evidence:
  - Eight required scenario IDs, seven-agent initial state, sorted timelines, and simulated labels are data-owned in src/content.
limitations:
  - Visual orchestration panels are owned by Task 24.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 24

```yaml
task: Task 24
status: blocked
checks:
  - command: npm run test -- src/features/simulation
    result: PASS; 4 tests passed after RED confirmed the controller did not exist.
  - command: npm run lint
    result: FAIL; 20 errors in src/features/speaker/* and src/features/presentation/PresentationPage.jsx, which are outside the Task 24 file scope.
evidence:
  - Simulation controller renders labelled simulated output and deterministic previous/next/reset/skip controls.
blockingCondition: lint fixes require files outside the active task scope.
nextAction: amend the plan or explicitly authorize a bounded lint-repair task for the affected Speaker and Presentation files, then rerun Task 24 checks.
commit: not_applicable
reviewedAt: 2026-07-15
```

### Task 38

```yaml
task: Task 38
status: completed
files:
  - src/test/accessibility.test.jsx
  - src/components/ui/Dialog.jsx
  - src/components/ui/Tabs.jsx
  - src/components/ui/Tooltip.jsx
  - src/components/diagrams/DiagramFrame.jsx
  - src/components/navigation/SceneFrame.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/test/accessibility.test.jsx src/components/ui src/components/diagrams src/components/navigation before implementation
    result: RED confirmed; Dialog had no semantic heading or cyclic focus trap, and Tabs had no accessible tablist name.
  - command: npm run test -- src/test/accessibility.test.jsx src/components/ui src/components/diagrams src/components/navigation
    result: PASS; 4 test files and 8 tests passed, including critical-violation axe matrices.
  - command: npm run lint
    result: PASS with 0 errors; one existing Fast Refresh warning remains in src/app/providers.jsx.
evidence:
  - Dialog and Drawer now expose a labelled heading, modal semantics, focus restoration, and cyclic keyboard focus containment.
  - Tabs expose a labelled tablist and valid tab-to-panel relationships; the axe regression initially revealed and then verified the repaired aria-controls target.
  - Tooltip, diagram, status, chapter navigation, and scene-frame fixtures expose accessible labels, text fallback, and headings.
limitations:
  - axe-core under jsdom emits a non-failing HTMLCanvasElement getContext warning while evaluating color contrast; critical axe assertions pass.
  - Route-level accessibility and browser keyboard checks remain owned by Tasks 39, 44, and 47.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 39

```yaml
task: Task 39
status: completed
files:
  - src/test/responsiveFixtures.test.jsx
  - src/styles/tokens.css
  - src/styles/global.css
  - src/features/presentation/PresentationControls.jsx
  - src/features/presentation/SceneMap.jsx
  - src/features/speaker/SpeakerPage.jsx
  - src/features/deep-dive/DeepDiveLayout.jsx
  - src/features/faq/FaqPage.jsx
  - src/features/glossary/GlossaryPage.jsx
  - src/features/sources/SourcesPage.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/test/responsiveFixtures.test.jsx src/features/explore src/features/deep-dive src/features/faq src/features/glossary src/features/sources before implementation
    result: RED confirmed; Speaker shell and presentation-control/map responsive contracts were absent.
  - command: npm run test -- src/test/responsiveFixtures.test.jsx src/features/explore src/features/deep-dive src/features/faq src/features/glossary src/features/sources
    result: PASS; 7 test files and 9 tests passed.
  - command: npm run lint
    result: PASS with 0 errors; one existing Fast Refresh warning remains in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed.
evidence:
  - The user authorized the bounded plan correction after the blocker: responsiveFixtures.jsx was renamed to responsiveFixtures.test.jsx and Task 39 command/path were synchronized so Vitest executes the required fixture.
  - Presentation controls, SceneMap, Speaker, deep dives, FAQ, glossary and sources expose responsive shells, wrapping controls and reading surfaces without changing content contracts.
  - Browser checks at 390x844 for /faq and /sources found no document horizontal overflow, visible primary controls/links, expected shell classes and no console warnings or errors.
limitations:
  - Speaker is intentionally desktop-first; the compact layout preserves reading order and reachability rather than reproducing a full presentation control room on a phone.
  - Broader scene-level visual hardening remains owned by Tasks 40 and 41.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 40

```yaml
task: Task 40
status: completed
files:
  - src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx
  - src/styles/global.css
  - src/features/presentation/scenes/CodexWorkflowScene.jsx
  - src/features/presentation/scenes/PromptSystemScene.jsx
  - src/features/presentation/scenes/SpecificationScene.jsx
  - src/features/presentation/scenes/ArchitectureScene.jsx
  - src/features/presentation/scenes/PlanningScene.jsx
  - src/features/presentation/scenes/AgentsMdScene.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx before implementation
    result: RED confirmed; Codex workflow and remaining compact scene contracts were absent.
  - command: npm run test -- src/features/presentation/scenes/scenesOneToEightResponsive.test.jsx
    result: PASS; 1 focused responsive-scene test passed.
  - command: npm run lint
    result: PASS with 0 errors; one existing Fast Refresh warning remains in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed.
evidence:
  - Hero and Evolution retain their existing mobile stacking contracts.
  - Scenes 3–8 use explicit reading-first stack, wrapping list, action and overflow-safe code surfaces; specification controls retain an accessible group.
limitations:
  - Exact visual behaviour at device widths requires the browser matrix in Task 47; this task establishes component contracts and responsive CSS fallbacks.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 41

```yaml
task: Task 41
status: completed
files:
  - src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx
  - src/styles/global.css
  - src/features/presentation/scenes/SkillsScene.jsx
  - src/features/presentation/scenes/McpScene.jsx
  - src/features/presentation/scenes/AgentsScene.jsx
  - src/features/presentation/scenes/OrchestrationScene.jsx
  - src/features/presentation/scenes/ImplementationScene.jsx
  - src/features/presentation/scenes/VerificationScene.jsx
  - src/features/presentation/scenes/SecurityScene.jsx
  - src/features/presentation/scenes/HumanDecisionScene.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test -- src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx before implementation
    result: RED confirmed; scenes 9–16 lacked labelled responsive surfaces.
  - command: npm run test -- src/features/presentation/scenes/scenesNineToSixteenResponsive.test.jsx
    result: PASS; 1 focused responsive-scene test passed.
  - command: npm run lint
    result: PASS with 0 errors; one existing Fast Refresh warning remains in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed.
evidence:
  - Skills, MCP, agents, implementation, verification, security and human-decision scenes now use labelled compact surfaces; capability lists wrap as cards.
  - Orchestration retains deterministic controls while its selects, buttons and status panels wrap safely at narrow widths.
limitations:
  - Full end-to-end browser verification of simulation controls remains owned by Tasks 46–47.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 42

```yaml
task: Task 42
status: completed
checks:
  - command: npm run test -- src/test/performancePolicies.test.jsx src/hooks src/features/simulation
    result: PASS; 4 files and 7 tests passed after RED for unavailable matchMedia.
  - command: npm run lint; npm run build; du -h dist/assets/* | sort -h
    result: PASS with one existing Fast Refresh warning; lazy DeepDivePage chunk is 4 KB on disk.
evidence:
  - reduced-motion and IntersectionObserver adapters safely fall back in non-browser environments; simulation playback pauses offscreen.
  - Deep-dive route is lazy-loaded through Suspense.
limitations:
  - No size threshold is claimed; the inventory is evidence only.
commit: not_applicable
reviewedAt: 2026-07-16
```

### Task 43

```yaml
task: Task 43
status: completed
checks:
  - command: required package-script existence check; npm run lint
    result: PASS; required scripts exist and lint has 0 errors with one existing Fast Refresh warning.
  - command: npm run verify
    result: PASS; content validation, lint, 47 test files / 69 tests, and production build passed.
evidence:
  - README, architecture and security model document only implemented local-only routes, layers, sync protocol, simulation and controls.
limitations:
  - E2E/browser acceptance and volatile-claim revalidation are deferred to Phase 11.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

## Phase 10 technical gate — awaiting human review

```yaml
phase: Phase 10
technicalStatus: passed
completedTasks: [Task 38, Task 39, Task 40, Task 41, Task 42, Task 43]
checks:
  - npm run verify: PASS; 47 test files / 69 tests, content validation, lint with one warning, production build
  - mobile browser checks: PASS for FAQ and Sources at 390x844; no overflow or console warnings/errors
humanReview: required before Phase 11; do not start E2E/security acceptance automatically
limitations:
  - jsdom axe emits non-failing canvas warnings.
  - Vite emits non-failing React Router module-directive warnings.
  - Git is not initialized.
```

### Task 44

```yaml
task: Task 44
status: completed
files:
  - tests/e2e/helpers.js
  - tests/e2e/explore.spec.js
  - tests/e2e/presentation.spec.js
  - playwright.config.js
  - src/features/presentation/PresentationControls.jsx
  - src/features/presentation/usePresentationKeyboard.js
  - src/features/presentation/PresentationPage.jsx
  - src/features/presentation/presentation.test.jsx
  - src/features/deep-dive/DeepDivePage.jsx
  - src/features/deep-dive/DeepDiveLayout.jsx
  - src/features/deep-dive/DeepDivePage.test.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/presentation.spec.js --project=chromium
    result: PASS; 4 Chromium E2E tests passed: Explore canonical/alias navigation, Presentation deep link/focus, keyboard plus refresh recovery, and scene-map/deep-dive contextual return.
  - command: npm run test -- src/features/presentation/presentation.test.jsx src/features/deep-dive/DeepDivePage.test.jsx
    result: PASS; 2 files and 4 tests passed after RED was observed.
  - command: npm run lint
    result: PASS with one pre-existing Fast Refresh warning in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed with non-failing React Router dependency directive warnings.
evidence:
  - E2E helpers use role/name locators and collect console errors.
  - The Playwright config exposes the plan-required chromium project name and baseURL.
  - `/` and `/story` Explore journey, chapter anchor navigation, and clean console passed in Chromium.
  - RED evidence recorded: the component test for `/present/evolution` first rendered `Разработка изменилась` instead of `Эволюция AI-разработки`.
  - User-authorized bounded remediation restored URL-driven scene navigation, keyboard controls, scene map, current-scene deep-dive handoff, and contextual return. The browser URL now represents the selected scene, so refresh recovery is deterministic.
  - Deep dive now resolves its route slug instead of always selecting the first record and falls back to Explore when opened without a Presentation origin.
  - Post-completion bounded remediation (2026-07-16): the refresh-recovery E2E now waits for the initial Evolution heading before dispatching ArrowRight, preventing a real startup race between navigation and the keyboard-effect subscription. A stress run with 24 parallel Chromium repetitions passed, and the full four-project gate passed 64/64 after serializing Playwright workers to avoid shared Vite-server load contention.
limitations:
  - Chromium was launched outside the filesystem sandbox because macOS blocks the browser process within it.
  - The scope deviation from Task 44's listed test/config files was explicit and user-authorized to repair defects in the owning Task 19/35 contracts; no product scope was added. The later E2E-only stabilization was explicitly user-authorized and changed no application code.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 45

```yaml
task: Task 45
status: completed
files:
  - tests/e2e/speaker-sync.spec.js
  - src/features/speaker/syncTransport.js
  - src/features/speaker/syncTransport.test.js
  - src/features/speaker/SpeakerPage.jsx
  - src/features/presentation/PresentationPage.jsx
  - src/features/presentation/presentation.test.jsx
  - src/features/presentation/SceneRenderer.jsx
  - src/features/presentation/scenes/OrchestrationScene.jsx
  - src/features/simulation/SimulationController.jsx
  - src/features/simulation/SimulationController.test.jsx
  - docs/implementation-progress.md
checks:
  - command: npm run test:e2e -- tests/e2e/speaker-sync.spec.js --project=chromium
    result: PASS; 4 Chromium two-page journeys passed: scene handshake with next/previous/jump acknowledgement, timer acknowledgement, simulation state acknowledgement, and Speaker close/reconnect snapshot.
  - command: npm run test -- src/features/presentation/presentation.test.jsx src/features/simulation/SimulationController.test.jsx src/features/speaker/syncTransport.test.js src/features/speaker/SpeakerPage.test.jsx
    result: PASS; 4 test files and 13 tests passed after RED evidence for snapshot, stable sender ID, remote play, and renderer bridge.
  - command: npm run lint
    result: PASS with one pre-existing Fast Refresh warning in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed with non-failing React Router dependency directive warnings.
evidence:
  - Initial RED test opened `/present/evolution`, then `/speaker`; Speaker remained at its local default because Presentation did not publish a snapshot after `CONNECTION_PING`.
  - User-authorized remediation added a `SCENE_CHANGED` snapshot reply to `CONNECTION_PING` and keeps one Presentation transport alive throughout route changes, preserving monotonic sequence ordering.
  - A sender ID is now stable per session-storage area and distinct for a new Speaker tab, so anti-replay protection continues to reject stale messages without preventing reconnect.
  - The allowlisted simulation bridge sends only command/state data through Presentation, renderer, orchestration scene and SimulationController; it does not send speaker notes, source content or arbitrary state blobs.
  - Browser assertions wait for visible acknowledged state, not fixed timeouts: scene headings update after next/previous/jump, timer changes to `Поставить таймер на паузу`, Presentation changes to `Пауза`, and Speaker shows `Симуляция: воспроизводится`.
limitations:
  - Chromium was launched outside the filesystem sandbox because macOS blocks the browser process within it.
  - The remediation spans owning Tasks 20–24 contracts and was explicitly authorized after Task 45 exposed the defects; it introduces no backend, external API or product-scope change.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 46

```yaml
task: Task 46
status: completed
files:
  - tests/e2e/simulation.spec.js
  - src/lib/simulationClock.js
  - src/features/simulation/SimulationController.jsx
  - src/features/simulation/SimulationController.test.jsx
  - src/content/simulation/scenarios.js
  - src/content/simulation/scenarios.test.js
  - docs/implementation-progress.md
checks:
  - command: npm run test:e2e -- tests/e2e/simulation.spec.js --project=chromium
    result: PASS; 2 Chromium E2E journeys passed: timed normal-flow playback and deterministic previous/next/reset/skip/speed with blocked, approval, recovery and completion states.
  - command: npm run test -- src/content/simulation/scenarios.test.js src/features/simulation
    result: PASS; 3 files and 8 tests passed after RED evidence for playback and unsafe-permission approval state.
  - command: npm run validate:content
    result: PASS; content contracts are valid and no TypeScript files were found.
  - command: npm run lint
    result: PASS with one pre-existing Fast Refresh warning in src/app/providers.jsx.
  - command: npm run build
    result: PASS; Vite production build completed with non-failing React Router dependency directive warnings.
evidence:
  - RED E2E opens `/present/orchestration`, starts playback, confirms the button changes to `Пауза`, then waits for the deterministic first timeline state (`Шаг: 1`, `builder: queued`).
  - User-authorized Task 24 remediation wires `getScaledDelay(500, speed)` into a one-step timeout and pauses at the final step. Fake-timer tests and browser playback confirm the first event advances deterministically.
  - User-authorized Task 23 remediation makes `unsafe-permission` an explicit three-step scenario. Its permission checkpoint transitions builder from `running` to `waiting_approval` exactly once, avoiding the prior invalid duplicate terminal transition.
  - Chromium confirms previous/next/reset/skip controls, blocked-task final state, unsafe permission approval state, recovery-retry block then completion, speed ×4 playback, and reset recovery.
  - Assertions use rendered deterministic state rather than fixed sleeps; console collection is installed in both browser journeys.
limitations:
  - Chromium was launched outside the filesystem sandbox because macOS blocks the browser process within it.
  - The playback and scenario-data remediations were explicitly authorized after Task 46 exposed their defects; no backend, external API or product-scope change was introduced.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 47

```yaml
task: Task 47
status: completed
files:
  - tests/e2e/reference-modes.spec.js
  - tests/e2e/accessibility-keyboard.spec.js
  - tests/e2e/responsive.spec.js
  - tests/e2e/helpers.js
  - docs/browser-verification.md
  - docs/implementation-progress.md
checks:
  - command: npm run test:e2e -- tests/e2e/reference-modes.spec.js --project=chromium
    result: PASS; 2 Chromium reference-mode journeys passed, including FAQ and Glossary search, Sources, 17 deep dives and unknown-route recovery.
  - command: npm run test:e2e -- tests/e2e/accessibility-keyboard.spec.js --project=chromium
    result: PASS; 2 Chromium keyboard and reduced-motion journeys passed.
  - command: npm run test:e2e -- tests/e2e/responsive.spec.js --project=chromium
    result: PASS; 2 Chromium laptop/mobile no-horizontal-overflow journeys passed.
  - command: npm run test:e2e -- --project=chromium
    result: PASS; all 16 Chromium E2E tests passed.
  - command: npm run test:e2e -- tests/e2e/reference-modes.spec.js tests/e2e/accessibility-keyboard.spec.js --project=firefox-laptop --workers=1
    result: PASS; 4 Firefox critical route/keyboard/reduced-motion tests passed sequentially.
  - command: npm run test:e2e -- tests/e2e/reference-modes.spec.js tests/e2e/accessibility-keyboard.spec.js --project=webkit-laptop --workers=1
    result: PASS; 4 WebKit critical route/keyboard/reduced-motion tests passed sequentially.
  - command: npm run test:e2e
    result: PASS; all 64 E2E tests passed sequentially across Chromium, WebKit, Firefox and Chromium mobile in 2.4 minutes.
evidence:
  - User-authorized Task 37 remediation added the labelled `Поиск терминов` Glossary input; the reference E2E then covered FAQ, Glossary, Sources, Specification deep dive, 404 recovery and all 17 deep-dive routes.
  - Keyboard flow covers keyboard activation into Presentation, scene navigation, map open/close, deep-dive return and FAQ search. The initial browser-specific Tab focus assumption was replaced with explicit focus before keyboard Enter; this keeps the tested keyboard activation while avoiding an unsupported claim about cross-browser initial focus order.
  - Manual in-app browser checks at 1440×900 and 390×844 verified the Hero, Presentation orchestration controls and Glossary; document width equalled viewport width and no console errors were captured.
  - Firefox and WebKit browser runtimes were installed only to run the task-required critical cross-browser subset; package dependencies and lockfile were unchanged.
  - User-authorized Task 44 E2E-only remediation waits for the initial Presentation heading before ArrowRight and serializes Playwright workers. The full required command now passes without reducing assertions or browser coverage.
  - Manual in-app browser matrix covers Hero, timeline, SPEC, AGENTS, MCP, agents graph, terminal loop, security, Speaker and mobile Glossary. Each recorded route has matching viewport/document width, visible Russian content and no captured console errors.
limitations:
  - The full suite intentionally uses one worker because all projects share one local Vite dev server; this lengthens the gate but keeps it deterministic.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 48

```yaml
task: Task 48
status: completed
files:
  - docs/security-review.md
  - docs/security-model.md
  - docs/content-fact-check.md
  - src/content/sources/sources.js
  - vite.config.js
  - src/test/responsiveFixtures.test.jsx
  - docs/implementation-progress.md
checks:
  - command: rg -n "dangerouslySetInnerHTML|\\beval\\(|new Function|fetch\\(|XMLHttpRequest|WebSocket" src
    result: PASS; no production matches.
  - command: npm run audit
    result: PASS; found 0 vulnerabilities at the high audit threshold.
  - command: npm run test -- src/lib/externalLinks.test.js
    result: PASS; 1 test passed, confirming HTTPS-only links with noopener noreferrer.
  - command: npm run validate:content
    result: PASS; content contracts are valid and no TypeScript files were found.
  - command: npm run verify
    result: PASS; content validation, lint (0 errors and one known Fast Refresh warning), 47 unit files/78 tests, and production build passed.
evidence:
  - All 11 canonical registry URLs returned HTTP 200 without redirect on 2026-07-16. The MCP source remains pinned to specification version 2025-11-25.
  - The refreshed Codex manual confirms that sandbox mode describes technical capability while approval policy describes consent, and that subagent behavior depends on client, account and configuration.
  - No backend, real Codex/MCP connection, runtime network request, dynamic code execution, secret collection or user shell execution path was found in production source.
  - Exact command labels and subagent availability remain the two deliberately qualified high-volatility claims.
  - User-authorized remediation excludes `tests/e2e/**` and `node_modules/**` from Vitest discovery and renders route fixtures inside MemoryRouter. The focused fixture test and the full technical gate then passed.
limitations:
  - jsdom logs a known `HTMLCanvasElement.getContext` implementation warning while axe checks run; the related accessibility tests pass and there are no lint errors.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

### Task 49

```yaml
task: Task 49
status: blocked
files:
  - docs/final-verification.md
  - docs/implementation-progress.md
checks:
  - command: npm ci
    result: PASS; clean install added 236 packages and reported 0 vulnerabilities.
  - command: npm run verify
    result: PASS before the clean-install gate; content validation, lint with one known warning, 47 unit files/78 tests and build passed.
  - command: npm run test:e2e
    result: PASS before the clean-install gate; all 64 cross-browser E2E tests passed.
  - command: npm run audit
    result: PASS before the clean-install gate; 0 vulnerabilities at the high audit threshold.
  - command: npm run test -- src/features/speaker/SpeakerPage.test.jsx
    result: RED then GREEN; RED had two intended failures for missing recovery guidance and presenter cue, then all 5 focused Speaker component tests passed.
  - command: npm run test:e2e -- tests/e2e/speaker-sync.spec.js --project=chromium
    result: PASS; 5 two-tab Chromium journeys passed, including disabled standalone Speaker controls, connection recovery, command-grid activation, hover-capable cursor and acknowledged scene navigation.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 2 pre-existing warnings, 47 test files / 81 tests, and production build passed.
evidence:
  - docs/final-verification.md maps the required walkthrough to automated browser evidence and records the clean-install result.
  - User manually confirmed that the Speaker timer advances after the 2026-07-16 remediation; focused Speaker unit and Chromium E2E checks also passed.
  - User-approved Speaker recovery design is recorded in docs/superpowers/specs/2026-07-16-speaker-console-recovery-design.md and its implementation plan in docs/superpowers/plans/2026-07-16-speaker-console-recovery.md.
  - Speaker no longer renders the ambiguous `Подключение…` copy. Without an active Presentation tab it states how to recover and disables timer, scene, map, deep-dive, simulation and scene-selector commands; periodic local pings allow controls to enable once Presentation opens.
  - Speaker now provides a full-width even command grid, hover/pressed/disabled states, an explicit `/story` exit link, and a content-owned current-scene cue with three talking points and a transition prompt. Simulation commands remain intentionally unavailable outside the Orchestration scene.
  - Manual in-app-browser check observed the disconnected recovery copy and disabled controls on `/speaker`; after `/present/evolution` opened in a second local tab, `Следующая сцена` was enabled with `cursor: pointer`, a visual transition contract and command-grid styling.
  - Superseded on 2026-07-16 by the user-approved minimal landing-and-slides scope: Speaker, deep dives, scene map, FAQ, glossary, sources and simulation were physically deleted. The historical Speaker evidence above remains an accurate record for the superseded scope only.
  - The simplified product keeps `/` with one presentation CTA and `/present/:sceneId` with local slide navigation, fullscreen and exit. `npm run test` passed 30 files / 46 tests; `npm run test:e2e` passed 32 cross-browser journeys; `npm run build` passed with 67 transformed modules.
  - Final `npm run verify` after documentation updates passed content validation, lint with 0 errors / 1 known warning, 30 test files / 46 tests and the production build. Browser inspection confirmed the landing contains one Hero and CTA only; an Evolution slide exposes exactly previous, next, fullscreen and exit controls.
  - User-approved delivery roadmap added below the landing Hero: 13 content-owned steps in three semantic groups, animated CSS-only handoff connectors and a static reduced-motion fallback. RED was observed for missing data/component imports; GREEN passed 2 focused tests. Final `npm run verify` passed 32 files / 48 tests and build; Chromium landing E2E passed; browser inspection confirmed all three roadmap groups and their ordered step text.
  - User-approved compact-map refinement replaced the visible roadmap header and three group sections with one accessible `Путь от идеи до локального release` region and one ordered thirteen-card map. Content ownership in `src/content/roadmap/roadmap.js` is unchanged; the component flattens the existing groups in their original order. The visual sequence is five cards left-to-right, four cards right-to-left, then four cards left-to-right, with twelve CSS-only decorative connectors; the two row turns animate vertically.
  - RED: `npm run test -- src/features/explore/DeliveryRoadmap.test.jsx` failed as expected because the previous component exposed three group regions, three lists and visible headings rather than the named single map. GREEN: `npm run test -- src/features/explore/DeliveryRoadmap.test.jsx src/content/roadmap/roadmap.test.js` passed 2 files / 2 tests.
  - `npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js --project=chromium --workers=1` passed 3 tests after the local macOS browser process was granted permission; the first sandboxed attempt was blocked before Chromium could launch (`MachPortRendezvous` permission denied), not by an application assertion. `npm run test:e2e -- tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1` passed 2 tests, including reduced-motion behavior.
  - Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 48 tests, and the production build. jsdom emitted its pre-existing canvas warning during axe tests, while the accessibility tests passed.
  - In-app browser inspection at 1280 × 800 confirmed that the Hero and full map are visible without vertical or horizontal document overflow (`scrollHeight` 800, `scrollWidth` 1280), all 13 cards and 12 connectors render, and all 12 connector animations are active under normal motion settings.
  - User-authorized 2026-07-17 dense-landing refinement removes the misconception helper copy from the landing Hero only; the same source text remains on the presentation Hero. Landing-only type scale, padding and developer-path spacing were reduced to remove the remaining desktop scroll.
  - The map remains a thirteen-card, content-owned ordered list with twelve decorative connectors, but its visual CSS grid now has twenty tracks: cards 1–5 fill row one as five equal cards, cards 6–9 fill row two right-to-left, and cards 10–13 fill row three left-to-right. No lower row has an unused column.
  - RED: `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx` failed as expected because the landing Hero still rendered `Инструмент не заменяет осмысленное решение человека.`. GREEN: focused Hero/map tests passed 2 files / 4 tests. Chromium E2E passed 6 tests for landing entry, 1280 × 800, 1920 × 800, mobile, keyboard and reduced-motion flows.
  - Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 49 tests and the production build. jsdom emitted the pre-existing canvas warning during axe tests, while accessibility tests passed.
  - In-app browser inspection at 1920 × 800 measured `scrollHeight` 800 and `scrollWidth` 1920. The landing Hero, all three filled map rows, and normal-motion connectors were fully visible without page overflow.
  - User-authorized stage explanations now live beside all thirteen roadmap steps in `src/content/roadmap/roadmap.js` as `{ what, why, agentHelp }`. Each explanation answers what the stage is, why it is needed and how it helps an agent; no presenter copy was placed in JSX.
  - RED: `npm run test -- src/content/roadmap/roadmap.test.js` failed before the explanation contract existed. GREEN: `npm run test -- src/features/explore/DeliveryRoadmap.test.jsx src/content/roadmap/roadmap.test.js` passed 2 files / 4 tests after the content contract and the accessible card interactions were added. The component test also had an intentional RED state: its expected buttons, hover panel and keyboard behavior were absent before implementation.
  - The compact map cards are now native buttons: hover or keyboard focus reveals one explanation panel above the active card; click, Enter or Space pins or unpins it; Escape closes it. Every panel uses the three fixed labels `Что это?`, `Зачем?` and `Как помогает агенту?`; only one panel can be open at once.
  - `npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/responsive.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium --workers=1` passed 7 Chromium checks, including hover, pinning, Escape close, keyboard focus and above-card placement. `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 51 tests and the production build; the pre-existing jsdom canvas warning occurred during axe checks, whose tests passed.
  - In-app browser inspection at 1920 × 800 confirmed the `Идея` panel contains its three content-owned explanations, is rendered above its card, and keeps the document at `scrollHeight` 800 / `scrollWidth` 1920. The manual browser check used click-to-pin; automated Chromium evidence separately covers hover and keyboard focus.
  - User-authorized copy refinement translates the remaining English workflow terms in the explanation panels only: `scope` is now `объём работ` or `границы задачи`, and `handoff` / `evidence` are now `передача результатов` / `доказательства`. Card labels and internal stable IDs are unchanged.
  - RED: `npm run test -- src/content/roadmap/roadmap.test.js` failed while explanation text still contained `scope`, `handoff` and `evidence`. GREEN: the focused content test passed after replacement. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 51 tests and the production build.
  - User-authorized presentation refinement replaces the verbose scene counter with the compact accessible `N / 16` indicator. It shares the `PRESENTATION MODE` eyebrow line and visual treatment at the upper right; its accessible label remains `Сцена N из 16`.
  - RED: `npm run test -- src/features/presentation/presentation.test.jsx` failed because the page still rendered `Сцена 2 из 16` and had no `.presentation-progress`. GREEN: the focused PresentationPage test and both scene-responsive test files passed after the compact header and presentation-only sizing changes.
  - Browser inspection at 1920 × 800 confirmed scene one exposes `PRESENTATION MODE` and `1 / 16`, has no vertical or horizontal document overflow (`scrollHeight` 800 / `scrollWidth` 1920), and keeps the slide controls visible below the scene.
  - User-authorized spacing refinement makes the presentation container a three-row, viewport-height grid. Its header, slide surface and controls now use the available height while retaining equal outer top and bottom padding.
  - RED: Chromium presentation E2E measured a 95.23 px difference between the top and bottom outer gaps at 1920 × 800. GREEN: after the grid change, `npm run test:e2e -- tests/e2e/presentation.spec.js --project=chromium --workers=1` passed all 4 checks, including the new ≤2 px balance assertion.
  - User-authorized Evolution slide refinement gives each comparison checkmark the dedicated `.evolution-check` class and a 0.45rem right margin, preventing the marker from visually merging with its label.
  - RED: `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx` failed because the checkmarks had no dedicated class. GREEN: the focused test passed after the semantic class and margin were added. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 51 tests and the production build.
  - User-authorized control refinement reduces the desktop presentation control panel to 52rem, uses 0.55rem gaps, 0.9rem text, 2.55rem button height and compact padding. Mobile retains its existing two-column fallback.
  - RED: the new 1024 × 800 Chromium E2E check failed while controls still used the 16 px base font. GREEN: `npm run test:e2e -- tests/e2e/presentation.spec.js --project=chromium --workers=1` passed all 5 checks, confirming four controls share one row and use text smaller than 16 px. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 51 tests and the production build.
  - Clarified user feedback identified the Evolution comparison cards, not the navigation controls, as the elements that were wrapping. Desktop now uses seven equal columns for all seven dimensions; widths below 70rem intentionally use four columns for readability.
  - RED: Chromium E2E at 1920 × 800 observed the seven comparison cards in two rows. GREEN: the presentation E2E suite passed 6/6 after the explicit seven-column desktop grid was added. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 51 tests and the production build.
  - User-authorized typography refinement sets the Evolution comparison cards to 0.92rem without altering the slide heading, progression stages or navigation controls. RED: the desktop E2E check failed at the previous 16 px size; GREEN: all 6 presentation Chromium checks and the full `npm run verify` gate passed after the smaller card type was applied.
  - User-authorized presenter guidance adds `src/content/speaker-notes/presenterNotes.js`: every one of the 16 scene IDs has a content-owned opening, exactly three talking points and a transition to the next scene. The visual slide itself remains concise; presenter copy is not embedded in JSX.
  - The presentation controls now include `Подсказка докладчика`. It toggles an accessible non-modal dialog above the control row; it contains `О чём сказать`, three `Ключевые мысли` and `Переход к следующей сцене`. Its close button and Escape close only the guide; changing scenes also closes it.
  - RED: focused content and PresentationPage tests failed while `presenterGuide` and the guide control were absent. GREEN: both focused files passed 6 tests. Chromium presentation E2E passed 7/7, including opening the guide and closing it with Escape. Browser inspection at 1920 × 800 observed the panel and controls fully in the viewport with `scrollHeight` 800. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 52 tests and the production build.
  - User-authorized presenter-script redesign replaces brief cues with three content-owned, read-aloud Russian paragraphs per each of the 16 scenes. Each paragraph has at least 35 words; the guide declares `≈ 1–2 минуты`. The text addresses a mid-level audience and remains separate from slide JSX.
  - `Подсказка докладчика` is renamed `Текст доклада`. It now opens a fixed right drawer with an entry animation, full viewport height, `overflow-y: auto`, and an exact desktop width of one third of the viewport. Reduced-motion users receive the same drawer without its entry animation.
  - The apparent uneven control row was traced to the global 3 px external focus offset and the long guide-button label, not unequal grid tracks. The row keeps five equal columns, while its focus indicator is now an internal visible ring with zero offset; the shorter `Текст доклада` label prevents visual crowding.
  - RED: content and PresentationPage tests failed while the old cue contract and button existed. Chromium E2E initially caught the remaining inherited `outline-offset: 3px`; an explicit local reset fixed the root cause. GREEN: Chromium presentation E2E passed 7/7, including drawer geometry (33% width, full height, animation and scroll), one control row at 1024 px, and the internal focus ring. Browser inspection at 1920 × 800 measured a drawer ratio of 0.333329, one control row and `scrollHeight` 800. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 52 tests and the production build.
  - User-authorized drawer polish removes the visible `≈ 1–2 минуты` copy from both content and UI. A fixed backdrop now closes the drawer when a user clicks anywhere outside it; Escape and the close button remain available. RED: focused content and PresentationPage tests failed while the duration and backdrop were absent. GREEN: focused tests passed, Chromium presentation E2E passed 7/7 including an outside click followed by Escape, and `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 52 tests and the production build.
  - User-authorized drawer-language refinement replaces English working terms in all sixteen read-aloud scripts with clear Russian terminology. The only retained Latin-script references are the proper names Codex, MCP, SPEC.md and AGENTS.md. RED: the focused scene-content test rejected English working terms; GREEN: `npm run test -- src/content/scenes/scenes.test.js` passed 2 tests after the copy rewrite. Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 52 tests and the production build.
  - User-authorized first-slide copy update replaces the legacy developer-path labels with five content-owned presentation goals: познакомить с проектом; объяснить архитектуру и правила; дать способ проверять работу; фиксировать повторяющиеся инструкции; автоматизировать стабильные процессы. RED: the focused Hero test could not find the `Цели презентации` list while the legacy labels were present. GREEN: `npm run test -- src/features/presentation/scenes/heroEvolution.test.jsx` passed 3 tests. Browser inspection at 1280 × 720 confirmed all five goals fit in the existing card with no document overflow (`scrollWidth` 1280, `scrollHeight` 720). Final `npm run verify` passed content validation, ESLint with 0 errors and one known Fast Refresh warning, 32 files / 52 tests and the production build.
  - Agentic presentation redesign Task 1: RED: `npm run test -- src/content/scenes/scenes.test.js` failed because the old registry exposed sixteen IDs and no `subtitle` contract. GREEN: the same focused test passed 2 tests after the registry was replaced by seventeen ordered content-owned scenes and three-paragraph Russian drawer scripts. No timing field, backend, remote Codex call or real MCP call was added. Git remains uninitialized.
  - Agentic presentation redesign Task 2: RED: `npm run test -- src/components/diagrams/presentationVisuals.test.jsx` failed because `InteractiveDiagram.jsx` and `PresentationVisuals.jsx` did not exist. GREEN: the focused suite passed 2 tests after data-driven semantic visual patterns and one accessible hover/focus/pin tooltip controller were added. The reduced-motion rule disables node transitions.
  - Agentic presentation redesign Task 3: RED: `npm run test -- src/features/presentation/SceneRenderer.test.jsx` could not find the new first-scene title because the old shared renderer rendered legacy fields. A second focused run exposed stale responsive tests that instantiated obsolete scene components with removed IDs. GREEN: the renderer/responsive suite passed 4 files / 7 tests after `StoryScene` and its `story` renderer mapping were introduced and the responsive contracts were migrated to all seventeen new scenes.
  - Agentic presentation redesign Task 4: integration tests confirm `1 / 17` and `17 / 17`, active-scene drawer content, keyboard next navigation, fullscreen/exit controls and no rendered duration text. A full `npm run verify` passed content validation, lint with 0 errors and one known Fast Refresh warning, 33 files / 54 tests, and the production build. The known jsdom canvas warning appeared during axe tests without test failures.
  - No human laptop/mobile walkthrough, 30–40 minute rehearsal, 25–30 minute compact rehearsal or sign-off has been performed or fabricated.
blockingCondition: The user-approved simplified scope still requires a final human landing and sixteen-slide walkthrough plus an explicit acceptance verdict. Automated checks cannot substitute for human acceptance.
nextAction: A human reviewer must review the landing, all sixteen slides, keyboard navigation, fullscreen graceful fallback, laptop/mobile layout and acceptance verdict in docs/final-verification.md; then rerun npm run verify and npm run audit before the product gate can be approved.
limitations:
  - Git remains uninitialized; there is no commit identifier for the final record.
  - Fullscreen depends on browser permission and retains the existing graceful unavailable status.
  - `npm run verify` reports one non-blocking Fast Refresh warning in src/app/providers.jsx.
commit: not_applicable; Git is not initialized
reviewedAt: 2026-07-16
```

## User-authorized WebZaim presentation redesign — iteration 1

```yaml
date: 2026-07-26
status: implemented_pending_human_review
scope:
  - Replaced the public landing and presentation narrative with a new 14-scene practical talk about introducing coding agents into an existing project.
  - Applied the approved WebZaim dark-graphite visual direction, local Manrope font and wordmark extracted from the supplied brand book.
  - Kept the product local-only: no backend, remote runtime API, real Codex/MCP call, analytics or TypeScript was added.
files:
  - public/brand/webzaim-wordmark-white.png
  - public/fonts/Manrope-Variable.ttf
  - src/content/scenes/scenes.js
  - src/content/speaker-notes/presenterNotes.js
  - src/components/diagrams/PresentationVisuals.jsx
  - src/components/diagrams/InteractiveDiagram.jsx
  - src/features/explore/ExplorePage.jsx
  - src/features/presentation/PresentationPage.jsx
  - src/features/presentation/PresentationControls.jsx
  - src/features/presentation/scenes/StoryScene.jsx
  - src/styles/tokens.css
  - src/styles/global.css
  - focused unit, component and Playwright contracts listed in the implementation plan
checks:
  - command: npm run validate:content
    result: PASS; 14 ordered content-owned scenes, no TypeScript files and no content placeholders.
  - command: npm run verify
    result: PASS; lint reported 0 errors and one existing Fast Refresh warning; 33 test files / 59 tests passed; Vite production build passed.
  - command: npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium
    result: PASS; 5 Chromium journeys passed: landing entry, tooltip, drawer dismissal, keyboard navigation, reduced motion, desktop-height composition and fullscreen fallback.
  - command: local Playwright screenshots at landing, repository-map, brief-to-proof, role-separation, bounded-tools and feedback-loop
    result: PASS; all six routes rendered meaningful branded content without a Vite error overlay.
  - command: rg -n "https?://|fonts\\.googleapis|fetch\\(|XMLHttpRequest|WebSocket|dangerouslySetInnerHTML|\\beval\\(" src public
    result: PASS with expected test-only matches; no production remote-font or runtime-network call was found.
  - command: npm run audit
    result: QUALIFIED; npm reported 10 high-severity transitive dependency advisories in brace-expansion/minimatch/ESLint tooling and react-router. npm reports no fix available; no dependency was changed automatically.
evidence:
  - The landing has one clear presentation CTA and no Explore, Speaker, deep-dive, FAQ, glossary or map controls in its audience path.
  - Presentation controls provide previous/next, text drawer, fullscreen and exit only. Drawer close restores focus to its trigger.
  - All root ideas, detailed speaker prose and short local tooltip explanations are content-owned rather than embedded in JSX.
  - Tooltips render as positioned overlays above their source rather than inserting a layout panel.
  - The 1280 x 720 Playwright geometry assertion confirms the desktop presentation console does not exceed viewport height for the repository-map scene.
limitations:
  - `npm audit` remains a human-review item because it reports 10 high-severity transitive advisories with no available automatic fix. The application remains local-only and does not enable the reported React Router server-action mode.
  - jsdom emits its pre-existing canvas `getContext` warning during axe checks; accessibility tests pass.
  - The brand-wordmark asset is a bitmap crop of the exact supplied brand-book variant; replacing it with an official standalone vector asset would require that asset from the brand owner.
  - Git is not initialized, so no commit was created.
nextAction: Human visual/content review of the new 14-scene presentation before any follow-up design iteration.
```

## User-authorized landing refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Updated only the public landing; presentation slides and their dark treatment remain unchanged for a later review.
  - Removed the slide-route panel and the raster wordmark from the landing.
  - Replaced the landing grid backdrop with a light azure-to-white corporate surface using existing WebZaim blue, aquamarine and graphite tokens.
  - Kept the landing within one desktop viewport by reducing its layout to a compact heading, explanatory text and one CTA.
tests:
  - command: npm run test -- src/features/explore/ExplorePage.test.jsx
    result: PASS; 2 tests. RED first confirmed the old image wordmark remained; GREEN confirms no wordmark image or route list is rendered and the CTA contract remains intact.
  - command: npm run build
    result: PASS; Vite production build completed. React Router emitted its existing ignored-use-client bundling notices.
  - command: npx playwright screenshot --device='Desktop Chrome' http://127.0.0.1:5173 /private/tmp/webzaim-landing-light.png
    result: PASS; browser screenshot confirms the compact light landing fits in one 1280 × 720 viewport without the removed panels or grid.
limitations:
  - The supplied bitmap wordmark remains in the repository because it is still used by presentation surfaces; it is no longer rendered on the landing.
  - The visual direction of presentation slides was intentionally not changed in this focused iteration.
commit: not_applicable; Git is not initialized
```

## User-authorized brand-element refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Reviewed section 4 of the supplied WebZaim brand book: its active compositional element is a flowing blue ribbon/line.
  - Replaced the landing's text-only company mark with the user-selected supplied symbol, isolated on a transparent background at public/brand/webzaim-symbol.png.
  - Added a low-contrast blue, Pacific Blue and aquamarine ribbon composition on the right side of the landing only.
checks:
  - command: npm run test -- src/features/explore/ExplorePage.test.jsx
    result: PASS; 2 tests. RED proved the standalone sign was missing; GREEN verifies its accessible image contract and preserved landing CTA.
  - command: npm run build
    result: PASS; Vite production build completed with the existing React Router ignored-use-client notices.
  - command: local Chromium screenshot at 1280 × 720
    result: PASS; the transparent sign and decorative ribbon render in the light landing composition with no scroll.
limitations:
  - The symbol PNG is an exact crop from the user-supplied reference screenshot, not an official vector source file.
  - Presentation surfaces retain their existing brand treatment until separately reviewed.
commit: not_applicable; Git is not initialized
```

## User-authorized light slide-system redesign — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Preserved all 14 presentation routes and replaced their visible headings with concise approved Russian copy.
  - Removed the repeated in-scene heading and the `ФИЧА / NN` eyebrow from every story scene.
  - Rebuilt every story surface as one key thought on the left and one interactive visual explanation on the right.
  - Applied the light azure-white WebZaim system to presentation headers, scenes, diagrams, controls and the speaker drawer.
  - Added a compact transparent brand mark in the presentation header and a low-contrast section-4 ribbon motif behind the composition.
  - Added document-like visual evidence for `SPEC.md` and `AGENTS.md`; repository, role, process, review, evidence, permission and feedback visuals remain data-driven and tooltip-enabled.
red_green_evidence:
  - RED: `npm run test -- src/content/scenes/scenes.test.js` failed with every legacy long heading still present.
  - GREEN: content registry test passed after the 14 approved headings and Russian labels replaced legacy copy.
  - RED: `npm run test -- src/features/presentation/SceneRenderer.test.jsx` found the old `ФИЧА / 01` eyebrow.
  - GREEN: StoryScene test passed after its repeated heading and subtitle were removed in favour of a key-thought/visual pair.
  - RED: Chromium E2E exposed stale legacy headings and an internal presentation-shell scroll-height metric.
  - GREEN: user-visible document height is exactly one 1280 × 720 viewport for the repository-map route; all updated keyboard, tooltip, drawer, fullscreen-fallback and exit journeys pass.
checks:
  - command: npm run validate:content
    result: PASS; source-of-truth content is valid and no TypeScript files exist.
  - command: npm run verify
    result: PASS; lint has 0 errors and one existing Fast Refresh warning; 33 test files / 60 tests pass; Vite production build passes.
  - command: npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium
    result: PASS; 5 Chromium journeys pass.
  - command: local Chromium screenshots for presentation-feature, repository-map, feature-spec, role-separation and feedback-loop
    result: PASS; all sampled slides render a one-line heading, light visual treatment, visible logo, left-side thought, right-side diagram and controls without a document-level vertical scroll at desktop size.
limitations:
  - The technical names `SPEC.md` and `AGENTS.md` remain deliberately visible as filenames; the slide itself explains their Russian purpose.
  - Existing jsdom canvas warnings appear during axe checks without accessibility-test failure.
  - Existing Fast Refresh warning in src/app/providers.jsx remains unrelated to this redesign.
  - Git is not initialized; no commit was created.
nextAction: Human visual review of all 14 light slides and the detailed speaker drawer before any further content or visual adjustment.
```

## User-authorized vertical process-block refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Process, role, review and evidence diagrams now place their cards in a vertical top-to-bottom sequence with vertical connectors.
  - Repository trees, comparison layouts and paired Markdown documents retain their structural layouts because horizontal comparison and hierarchy carry their meaning.
checks:
  - command: npm run test -- src/components/diagrams/presentationVisuals.test.jsx src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 10 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router notices.
  - command: local Chromium screenshot at /present/presentation-feature
    result: PASS; the four route cards render as a centred vertical sequence with visible top-to-bottom connectors and no clipped controls.
commit: not_applicable; Git is not initialized
```

## User-authorized right-aligned vertical-flow refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Right-aligned the vertical process, role, review and evidence card stacks within their visual column.
  - Replaced horizontal connector motion with a top-to-bottom animation and retained an explicit reduced-motion stop.
checks:
  - command: npm run test -- src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 5 tests.
  - command: npm run build
    result: PASS; Vite production build completed.
  - command: local Chromium screenshot at /present/presentation-feature
    result: PASS; vertical process cards render against the right edge of the visual column.
commit: not_applicable; Git is not initialized
```

## User-authorized source-outline realignment: 17 slides — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Re-read the supplied “Доклад — AI-агенты в существующей разработке” and made its 17 numbered sections the ordered presentation contract.
  - Replaced the prior 14-scene narrative with 17 content-owned scenes; each has one on-screen thesis, local hover/focus explanations and a three-paragraph presenter script in `src/content/speaker-notes`.
  - Scene 2 title is exactly “АГЕНТНАЯ РАЗРАБОТКА — ЭТО НАВЫК ПОСТРОЕНИЯ ПРОЦЕССА”.
  - Added source-aligned local visual metaphors for repository context, `SPEC.md`, `AGENTS.md`, `SKILL.md`, architecture, production flow, roles, permissions and runtime evidence.
  - Reduced the desktop presentation-header title scale so the long scene-2 title fits in one line at 1280 × 720 without truncation.
red_green_evidence:
  - RED: scene and presentation contract tests failed against the old 14-scene registry, `1 / 14` progress marker and old second-scene title.
  - GREEN: focused content, visual and presentation tests passed with the 17-scene registry, `1 / 17` through `17 / 17` progress and source-aligned drawer scripts.
  - RED: the first E2E run exposed a stale tooltip assertion from the removed copy; the tooltip itself rendered correctly.
  - GREEN: the assertion now verifies the new first-slide tooltip text and the full Chromium journey passes.
checks:
  - command: npm run test -- src/content/scenes/scenes.test.js src/components/diagrams/presentationVisuals.test.jsx src/features/presentation/presentation.test.jsx
    result: PASS; 3 files / 13 tests.
  - command: local Chromium route sweep at 1280 × 720 across all 17 `/present/:sceneId` routes
    result: PASS; every route has its expected heading, `N / 17` marker, at least three interactive visual elements, and document height exactly equal to the 720px viewport.
  - command: npm run test
    result: PASS; 33 files / 61 tests. Existing jsdom canvas notices appear while axe runs but do not fail accessibility tests.
  - command: npm run test:e2e -- tests/e2e/presentation.spec.js tests/e2e/accessibility-keyboard.spec.js --project=chromium
    result: PASS; 5 Chromium journeys cover landing entry, tooltip, drawer dismissal, keyboard navigation, reduced motion, exit and fullscreen fallback.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 61 tests, and Vite build all pass.
limitations:
  - The first sandboxed Chromium E2E run could not launch due to the macOS Mach-port permission restriction; the same mandatory suite then passed in the approved local browser environment.
  - `SPEC.md`, `AGENTS.md`, `MCP`, `runtime`, `build`, `review` and `evidence` remain visible where they name an actual file or widely-used engineering term; each slide or drawer gives a Russian explanation.
  - Existing React Router ignored-use-client build notices, the Fast Refresh lint warning in `src/app/providers.jsx`, and jsdom canvas notices from axe remain unrelated to this content change.
commit: not_applicable; Git is not initialized
nextAction: Human review of the 17-slide source-aligned narrative, drawer copy and visual metaphors before further design changes.
```

## User-authorized sentence-case presentation headings — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Replaced all-caps scene titles with ordinary sentence case across all 17 presentation scenes.
  - Preserved uppercase technical filenames and abbreviations where they name actual artifacts: `SPEC`, `MCP`, `Runtime` and `build` remain readable terms rather than display-wide capitalization.
checks:
  - command: npm run test -- src/content/scenes/scenes.test.js src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 7 tests, including the exact second-scene and final-scene title contracts.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
commit: not_applicable; Git is not initialized
```

## User-authorized compact visual-composition refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Replaced the six-card vertical production-line stack with a compact two-column, three-row grid.
  - Placed `AGENTS.md`, `SPEC.md`, `SKILL.md` and `architecture.md` mockups beside their related diagrams instead of above them.
  - Added a compact `AGENTS.md` mockup to the repository-context scene and reduced related card padding/minimum heights.
  - Kept document mockups local, semantic and content-derived; tooltips remain attached to each individual diagram card.
red_green_evidence:
  - RED: component tests required an `AGENTS.md` mockup on the repository slide and the explicit compact delivery-grid layout; both failed against the prior rendering.
  - GREEN: the updated component exposes the document mockup and `data-layout="diagram-delivery-grid"` contract.
checks:
  - command: npm run test -- src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 6 tests, including compact delivery-grid and document-mockup contracts.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
limitations:
  - A requested local Chromium sweep of the six visually affected slides was declined at the system permission prompt, so browser screenshot evidence for this refinement is pending human visual review.
commit: not_applicable; Git is not initialized
```

## User-reported tooltip clipping correction — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Constrained presentation tooltips to the active visual column instead of a 32rem max-content box that could extend beyond the slide surface.
  - Enabled natural wrapping and long-token breaking in tooltip content while retaining hover, focus, click-to-pin and Escape dismissal behavior.
checks:
  - command: npm run test -- src/components/diagrams/presentationVisuals.test.jsx src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 11 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
limitations:
  - Browser screenshot confirmation remains pending because the previous local Chromium request was declined at the system permission prompt.
commit: not_applicable; Git is not initialized
```

## User-reported vertical tooltip clipping correction — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - When an interactive diagram tooltip is open, its scene surface now raises its stacking layer and allows the tooltip to extend above the normal clipped scene boundary.
  - The default closed state retains the fixed-height, no-scroll presentation surface.
checks:
  - command: npm run test -- src/components/diagrams/presentationVisuals.test.jsx src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 11 tests, preserving tooltip, drawer and presentation-control behaviour.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
limitations:
  - Browser screenshot confirmation remains pending because the prior local Chromium request was declined at the system permission prompt.
commit: not_applicable; Git is not initialized
```

## User-approved practical rewrite of scene-two drawer — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Rewrote only the second slide’s three drawer paragraphs.
  - The revised copy explains why agentic development is a process-design skill, distinguishes human judgement from the agent’s work, and gives a short three-question practice loop.
  - Avoided the implementation-search, current-example and API-contract material reserved for scene 3.
red_green_evidence:
  - RED: the content-registry test failed until the drawer contained the approved “скорость сама по себе не делает разработку лучше” and “три вопроса” ideas.
  - GREEN: the revised content satisfies the source contract while scene 3 remains unchanged.
checks:
  - command: npm run test -- src/content/scenes/scenes.test.js src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 7 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
commit: not_applicable; Git is not initialized
```

## User-authorized Russian rewrite of scene-nine drawer — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Replaced the English process chain and terms in the ninth scene’s drawer with a Russian, concrete sequence: задача → план → реализация → проверка → передача результата → независимое ревью.
  - Reframed the explanation around boundaries, evidence, independent review and acceptance without changing the slide’s on-screen key thought.
red_green_evidence:
  - RED: content test failed while the drawer contained `brief`, `prove`, `handoff`, `reviewer`, `show` and `evidence`.
  - GREEN: content test now confirms the Russian process chain and rejects those obsolete English process terms.
checks:
  - command: npm run test -- src/content/scenes/scenes.test.js src/features/presentation/presentation.test.jsx
    result: PASS; 2 files / 7 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
commit: not_applicable; Git is not initialized
```

## User-authorized local slide illustrations — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Imported the 17 user-provided, numbered local images into `public/presentation-slides/` without resizing or remote loading.
  - Declared the one-to-one local image contract in `src/content/scenes/scenes.js`: scene N renders `/presentation-slides/N.png` with an accessible Russian alternative text.
  - Replaced the right-side interactive diagrams, document mockups and diagram popovers in presentation scenes with one consistent 3:2 image frame.
  - Kept each slide's key thought on the left and retained the existing speaker-text drawer; no tooltip interaction remains in the scene visual itself.
red_green_evidence:
  - RED: the presentation-visual and scene-registry tests failed while no `presentationImage` contract or image element existed and diagram buttons remained in the markup.
  - GREEN: the visual component renders the content-declared local image and exposes no buttons or tooltips.
checks:
  - command: node -e "…17 local presentation images present…"
    result: PASS; all 17 assets exist. `1.png` and `17.png` were additionally confirmed as 1536×1024; every supplied asset has the shared 3:2 source format.
  - command: npm run test -- --run src/components/diagrams/presentationVisuals.test.jsx src/features/presentation/scenes/heroEvolution.test.jsx src/content/scenes/scenes.test.js
    result: PASS; 3 files / 6 tests.
  - command: npm run test
    result: PASS; 33 files / 57 tests. Existing jsdom canvas notices during axe checks are non-failing.
  - command: npm run build
    result: PASS; Vite production build completed. Existing React Router ignored-use-client notices remain non-failing.
  - command: npx playwright test tests/e2e/presentation.spec.js --project=chromium --reporter=line
    result: PASS; 3 Chromium journeys cover the local illustration, drawer dismissal, keyboard navigation, exit, fullscreen fallback and desktop-height constraint.
  - command: npx playwright screenshot --device="Desktop Chrome" http://127.0.0.1:5174/present/presentation-feature /private/tmp/presentation-local-image.png
    result: PASS; manual screenshot review confirms the requested left-text/right-image composition and consistent framed image placement.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 57 tests, and Vite build all pass.
limitations:
  - The repository-wide `npm run test:e2e` is not green because `tests/e2e/explore.spec.js` still asserts the retired pre-redesign landing hero, roadmap and tooltip content. This is an outdated test outside the requested presentation-image change; the focused presentation E2E suite passes.
  - The image sources are copied as supplied; their internal white margins and composition are intentionally preserved with `object-fit: contain`, so no source art is cropped.
commit: not_applicable; Git is not initialized
```

## User-reported wide-screen illustration-frame correction — 2026-07-26

```yaml
status: implemented_pending_human_review
root_cause:
  - The illustration frame used `width: 100%` without a maximum inline size, so the frame expanded to the whole right grid column on very wide screens.
fix:
  - Capped the shared illustration frame at 40rem and centered it in the visual column; the source art remains uncropped inside its consistent 3:2 frame.
red_green_evidence:
  - RED: a focused CSS-contract test failed because the frame had no wide-screen width cap or placement rule.
  - GREEN: the test now requires both `max-inline-size: 40rem` and `justify-self: center`.
checks:
  - command: npm run test -- --run src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 3 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
  - command: local Playwright screenshot at 2048×768
    result: PASS; measured illustration frame is 640×426.66 px and manual screenshot review confirms it remains a contained right-side card.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 58 tests, and Vite build all pass.
commit: not_applicable; Git is not initialized
```

## User-reported regular-window illustration-card refinement — 2026-07-26

```yaml
status: implemented_pending_human_review
root_cause:
  - Although the previous width cap worked, the grid item could still visually fill the available vertical space and blend into the scene surface in a normal browser window.
fix:
  - The visual column is now a centered grid surface and the illustration uses a fixed responsive inline size of `min(100%, 34rem)` with a 3:2 aspect ratio, non-stretching alignment, clearer border, padding and card shadow.
red_green_evidence:
  - RED: focused visual-style test failed before the compact non-stretching card contract existed.
  - GREEN: focused test now verifies the compact inline size and centered non-stretching alignment.
checks:
  - command: npm run test -- --run src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 3 tests.
  - command: local Playwright screenshot at 1840×850
    result: PASS; measured card is 544×362.66 px and screenshot confirms visible separation from the surrounding slide surface.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 58 tests, and Vite build all pass.
commit: not_applicable; Git is not initialized
```

## User-authorized smaller presentation illustration card — 2026-07-26

```yaml
status: implemented_pending_human_review
scope:
  - Reduced the shared right-side illustration card maximum width from 34rem to 30rem while retaining its centered, non-stretching 3:2 layout.
red_green_evidence:
  - RED: focused style-contract test failed while the card maximum remained 34rem.
  - GREEN: focused test now requires the 30rem card size.
checks:
  - command: npm run test -- --run src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 3 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
commit: not_applicable; Git is not initialized
```

## User-authorized slide 13 title clarification — 2026-07-28

```yaml
status: completed
scope:
  - Replaced the ambiguous English/Russian title `Review: не проверяйте себя сами` on slide 13 with `Независимое ревью: как проверить работу агента`.
  - Kept the slide's thesis, speaker text, illustration, and position in the 17-slide sequence unchanged.
red_green_evidence:
  - RED: `src/content/scenes/scenes.test.js` failed after its expected title was changed, because the scene content still contained the previous title.
  - GREEN: the scene content now supplies the approved title and the focused scene-registry test passes.
checks:
  - command: npm run test -- --run src/content/scenes/scenes.test.js
    result: PASS; 2 tests.
  - command: npm run build
    result: PASS; Vite production build completed with existing React Router ignored-use-client notices.
commit: not_applicable; Git is not initialized
```

## User-authorized slide 9 title clarification — 2026-07-28

```yaml
status: completed
scope:
  - Replaced the generic slide 9 title `От идеи к готовой фиче` with `Путь фичи: от задачи до независимого ревью`.
  - Kept the six-step process, presenter text, illustration, and sequence unchanged.
red_green_evidence:
  - RED: `src/content/scenes/scenes.test.js` failed after its expected slide 9 title was updated, because the scene content still contained the generic title.
  - GREEN: the scene content now supplies the approved process-oriented title and the focused scene-registry test passes.
checks:
  - command: npm run test -- --run src/content/scenes/scenes.test.js
    result: PASS; 2 tests.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 58 tests, and Vite production build all pass.
commit: not_applicable; Git is not initialized
```

## User-authorized slide 14 quality-review framing — 2026-07-29

```yaml
status: completed
scope:
  - Replaced slide 14 title `Код должен быть понятен человеку` with `Код агента должен соответствовать проекту`.
  - Reframed its on-screen thesis around the team's review of code style, established patterns, readability, and change boundaries.
  - Kept the existing speaker guide, illustration, ordered slide position, and supporting examples unchanged.
red_green_evidence:
  - RED: `src/content/scenes/scenes.test.js` failed after its expected slide 14 title was updated, because the scene content still had the previous title.
  - GREEN: the approved title is now supplied by scene content and the focused registry test passes.
checks:
  - command: npm run test -- --run src/content/scenes/scenes.test.js
    result: PASS; 2 tests.
  - command: npm run verify
    result: PASS; content validation, ESLint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 58 tests, and Vite production build all pass.
commit: not_applicable; Git is not initialized
```

## User-authorized presentation example overlays — 2026-08-02

```yaml
status: implemented_pending_human_review
scope:
  - Added content-owned example mappings only for slide 4 (`demo.png`), slide 6 (`agents.png`) and slide 8 (`spec.png`).
  - Added the `Пример` control only when the active scene declares such a mapping.
  - Added a local, accessible overlay that opens at up to 75% of the viewport, enters and exits with animation, closes from the backdrop or Escape, and restores focus to its trigger.
red_green_evidence:
  - RED: the focused presentation test failed because the `Пример` button did not exist on slide 4.
  - GREEN: focused presentation tests now cover opening the content-linked overlay, its mapped local image, backdrop close, focus return, and the absence of the control on slides without a mapping.
checks:
  - command: npm run test -- --run src/features/presentation/presentation.test.jsx
    result: PASS; 7 tests.
  - command: npm run test -- --run src/components/diagrams/presentationVisuals.test.jsx
    result: PASS; 3 tests.
  - command: npm run validate:content
    result: PASS; scene content contract and JavaScript-only scan pass.
  - command: npm run build
    result: PASS; Vite production build completes with existing React Router ignored-use-client notices.
  - command: local Playwright route-and-overlay inspection
    result: PARTIAL; confirmed the `demo.png`, `agents.png`, and `spec.png` mappings and a 1065 px overlay width at a 1440 px viewport for slide 4. A follow-up visual measurement was not completed because local Chromium permission was declined.
  - command: npm run verify
    result: BLOCKED; 32 of 33 test files pass (59 of 60 tests). Existing `src/content/scenes/scenes.test.js` expects the old slide 15 title `Инструменты и MCP: сначала глаза`, while current scene content has `Инструменты и MCP`. This task did not modify slide 15 or that expectation.
limitations:
  - No dependency, backend, external API, or application-scope change was introduced.
  - Final visual re-measurement of the three overlays awaits permission for a local Chromium process.
commit: not_applicable; Git is not initialized
```

## User-authorized single-row example controls — 2026-08-02

```yaml
status: implemented_pending_human_review
scope:
  - Added a six-column presentation-control layout only when an active slide supplies the `Пример` action.
  - Kept the existing five-column layout on all other slides and the existing small-screen wrapping behavior.
red_green_evidence:
  - RED: the focused presentation test failed because the example slide panel had no `presentation-controls--with-example` layout contract.
  - GREEN: the panel now receives that modifier only with an example control.
checks:
  - command: npm run test -- --run src/features/presentation/presentation.test.jsx
    result: PASS; 7 tests.
  - command: npm run build
    result: PASS; Vite production build completes with existing React Router ignored-use-client notices.
  - command: Playwright MCP browser measurement at the default viewport
    result: PASS; six buttons form a single row at y=648 px, with six equal columns of approximately 184.67 px.
commit: not_applicable; Git is not initialized
```

## User-authorized 13-slide delivery path and speaker-script removal — 2026-08-16

```yaml
status: completed
scope:
  - Replaced the former 17-slide outline with the approved 13-step path from a working feature to repeatable agent adoption.
  - Moved the existing documentation-rule example to slide 3.
  - Combined AGENTS.md and SPEC.md into a single `Пример` action on slide 6; it switches between two local images in one dialog.
  - Removed the `Текст доклада` control, the presenter drawer component, and the content-owned speaker-script registry.
  - Replaced visible English `scope` wording in the new path with `границы изменений`.
red_green_evidence:
  - RED: focused presentation and scene-registry tests failed while they required the removed script control, the 17-slide order, and the former scene identifiers.
  - GREEN: 13 ordered content records, a one-control documentation example, no script control, and focus-safe dialog close behavior are covered by focused tests.
checks:
  - command: npm run test -- src/features/presentation/presentation.test.jsx src/content/scenes/scenes.test.js src/lib/contentValidation.test.js src/components/diagrams/PresentationVisuals.test.jsx
    result: PASS; 4 test files, 14 tests.
  - command: npm run test
    result: PASS; 33 test files, 58 tests. Existing axe/jsdom canvas notices remain non-failing test-environment output.
  - command: npm run verify
    result: PASS; content validation, lint with 0 errors and 1 existing Fast Refresh warning, 33 test files / 58 tests, and Vite production build.
  - command: Playwright MCP browser verification at http://127.0.0.1:5173/present/agent-and-spec
    result: PASS; slide title and progress are `AGENTS.md и SPEC.md: две части контракта` and `6 / 13`; controls are previous, next, example, fullscreen, and exit; no script control is present; one dialog switches from `/presentation-slides/agents.png` to `/presentation-slides/spec.png`.
  - command: Playwright MCP browser verification at http://127.0.0.1:5173/present/tomorrow-start
    result: PASS; final progress is `13 / 13`, the control panel has four buttons, and document scroll height equals the 720 px viewport.
limitations:
  - No local Chromium process, dependency installation, backend, external runtime API, or production deployment was used.
  - The existing lint warning in `src/app/providers.jsx` is outside this change.
commit: not_applicable; Git is not initialized
```
