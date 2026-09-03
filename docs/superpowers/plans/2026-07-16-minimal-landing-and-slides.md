# Minimal Landing and Slides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the local site to a single visual landing page and a fullscreen-capable sixteen-slide presentation.

**Architecture:** `/` owns the standalone Hero landing surface; `/present/:sceneId` owns every slide. The presentation remains content-driven through `src/content/scenes`, while direct local navigation replaces all cross-window, reference, map, deep-dive, and simulation behavior.

**Tech Stack:** React, React Router, Vite, JavaScript, Vitest, Testing Library, Playwright, CSS custom properties.

## Global Constraints

- JavaScript/JSX only; no backend, external runtime APIs, dependencies, or TypeScript.
- Retain only landing and presentation product paths; removed URLs render Not Found.
- Keep sixteen slide records and slide text in `src/content`; do not place content in JSX.
- Preserve fullscreen request with graceful browser fallback and accessible keyboard navigation.
- Treat this as a user-approved scope reduction from SPEC.md; record it in progress evidence.

---

### Task 1: Make landing and slide navigation the only routes

**Files:**
- Modify: `src/app/router.jsx`
- Modify: `src/app/routes.js`
- Modify: `src/features/explore/ExplorePage.jsx`
- Modify: `src/features/explore/ExplorePage.test.jsx`
- Modify: `src/app/router.test.jsx`
- Modify: `src/features/not-found/NotFoundPage.jsx`
- Modify: `src/features/presentation/PresentationPage.jsx`
- Modify: `src/features/presentation/PresentationControls.jsx`
- Modify: `src/features/presentation/presentation.test.jsx`
- Modify: `src/features/presentation/usePresentationKeyboard.js`
- Modify: `tests/e2e/explore.spec.js`
- Modify: `tests/e2e/presentation.spec.js`

**Interfaces:**
- `ROUTES` exports only `{ landing: '/', present: '/present' }`.
- `PresentationControls({ onPrevious, onNext, onFullscreen, onExit })` renders exactly these four visible actions.
- `PresentationPage` accepts only local scene navigation/fullscreen/exit; it has no transport, map, deep-dive, or simulation command boundary.

- [x] **Step 1: Write RED route and control tests**

Replace Explore expectations with assertions that `/` has one primary `Начать презентацию` link, no scene frames, and no `Исследовать историю` link. Add assertions that Presentation omits `Карта сцен`, `Deep dive`, and Speaker while retaining `Полный экран` and `Выйти из презентации`. Assert `/speaker`, `/faq`, `/sources`, `/glossary`, `/deep-dive/codex`, and `/story` reach Not Found.

- [x] **Step 2: Run RED checks**

Run: `npm run test -- src/features/explore/ExplorePage.test.jsx src/app/router.test.jsx src/features/presentation/presentation.test.jsx`

Expected: FAIL because current routing and control contracts expose removed modes.

- [x] **Step 3: Implement the minimal route and presentation boundary**

Replace `ExplorePage` with the existing Hero visual surface and its sole `/present/hero` CTA. Remove all non-landing/non-presentation routes from `AppRouter`, reduce `ROUTES`, simplify `PresentationPage` to local slide state, and remove `M` and `D` keyboard branches plus map/deep-dive controls. Keep arrow, space, Home, End, `F`, and `Escape` behavior.

- [x] **Step 4: Verify GREEN**

Run:

```bash
npm run test -- src/features/explore/ExplorePage.test.jsx src/app/router.test.jsx src/features/presentation/presentation.test.jsx
npm run test:e2e -- tests/e2e/explore.spec.js tests/e2e/presentation.spec.js --project=chromium
```

Expected: landing opens the first slide; valid slide URLs navigate; removed URLs render Not Found; fullscreen remains available.

### Task 2: Remove auxiliary product modules and simplify the slide content contract

**Files:**
- Modify: `src/content/scenes/scenes.js`
- Modify: `src/content/scenes/scenes.test.js`
- Modify: `src/content/index.js`
- Modify: `src/lib/contentValidation.js`
- Modify: `src/lib/contentValidation.test.js`
- Modify: `src/features/presentation/SceneRenderer.jsx`
- Modify: `src/features/presentation/SceneRenderer.test.jsx`
- Modify: `src/features/presentation/scenes/SharedSceneElements.jsx`
- Modify: `src/features/presentation/scenes/OrchestrationScene.jsx`
- Modify: `src/features/presentation/scenes/orchestrationScene.test.jsx`
- Delete: `src/content/deep-dives/deepDives.js`
- Delete: `src/content/deep-dives/deepDives.test.js`
- Delete: `src/content/deep-dives/index.js`
- Delete: `src/content/faq/faq.js`
- Delete: `src/content/faq/faq.test.js`
- Delete: `src/content/faq/index.js`
- Delete: `src/content/glossary/glossary.js`
- Delete: `src/content/glossary/glossary.test.js`
- Delete: `src/content/glossary/index.js`
- Delete: `src/content/simulation/index.js`
- Delete: `src/content/simulation/scenarios.js`
- Delete: `src/content/simulation/scenarios.test.js`
- Delete: `src/content/sources/index.js`
- Delete: `src/content/sources/sources.js`
- Delete: `src/content/speaker-notes/index.js`
- Delete: `src/content/speaker-notes/speakerNotes.js`
- Delete: `src/content/speaker-notes/speakerNotes.test.js`
- Delete: `src/content/terminology.js`
- Delete: `src/features/simulation/SimulationController.jsx`
- Delete: `src/features/simulation/SimulationController.test.jsx`
- Delete: `src/features/simulation/SimulationControls.jsx`
- Delete: `src/features/simulation/SimulationPanels.jsx`
- Delete: `src/features/simulation/simulationReducer.js`
- Delete: `src/features/simulation/simulationReducer.test.js`
- Delete: `src/features/simulation/simulationSelectors.js`
- Delete: `src/features/simulation/statusTransitions.js`
- Delete: `src/hooks/useInViewportPause.js`
- Delete: `src/lib/simulationClock.js`
- Delete: `src/lib/simulationClock.test.js`
- Delete: `src/lib/externalLinks.js`
- Delete: `src/lib/externalLinks.test.js`
- Delete: `src/lib/search.js`
- Delete: `src/lib/search.test.js`

**Interfaces:**
- A `Scene` retains only fields consumed by slide renderers and presentation navigation; it has no deep-dive, FAQ, source, speaker-note, or simulation fields.
- `contentRegistries` validates only slide records and renderer keys.
- `SceneRenderer({ scene, mode, isActive })` has no simulation props.

- [x] **Step 1: Write RED content-contract tests**

Change scene tests to reject `deepDivePath`, `faqIds`, `sourceIds`, and `speakerNotesId`; change validation fixtures to use only scene/renderer contracts; assert the Orchestration slide contains its explanatory content but no simulation controls.

- [x] **Step 2: Run RED checks**

Run: `npm run test -- src/content/scenes/scenes.test.js src/lib/contentValidation.test.js src/features/presentation/SceneRenderer.test.jsx src/features/presentation/scenes/orchestrationScene.test.jsx`

Expected: FAIL because the current content model still requires removed registries and Orchestration composes the simulation.

- [x] **Step 3: Implement and delete orphaned modules**

Trim scene records and validators to slide-only contracts. Replace the Orchestration simulation UI with static scene content. Delete exactly the listed reference, speaker, synchronization-support, external-link/search, and simulation modules after imports are removed.

- [x] **Step 4: Verify GREEN and orphan scan**

Run:

```bash
npm run test -- src/content/scenes/scenes.test.js src/lib/contentValidation.test.js src/features/presentation/SceneRenderer.test.jsx src/features/presentation/scenes/orchestrationScene.test.jsx
rg -n "deep-dive|speakerNotes|faqItems|glossaryTerms|scenarios|SimulationController|COMMAND_SIMULATION" src --glob '*.{js,jsx}'
npm run validate:content
```

Expected: tests and validation pass; the scan has no matches in retained product modules.

### Task 3: Delete removed feature surfaces and their focused tests

**Files:**
- Delete: `src/features/deep-dive/DeepDiveLayout.jsx`
- Delete: `src/features/deep-dive/DeepDivePage.jsx`
- Delete: `src/features/deep-dive/DeepDivePage.test.jsx`
- Delete: `src/features/faq/FaqPage.jsx`
- Delete: `src/features/faq/FaqPage.test.jsx`
- Delete: `src/features/glossary/GlossaryPage.jsx`
- Delete: `src/features/glossary/GlossaryPage.test.jsx`
- Delete: `src/features/sources/SourcesPage.jsx`
- Delete: `src/features/sources/SourcesPage.test.jsx`
- Delete: `src/features/speaker/ConnectionStatus.jsx`
- Delete: `src/features/speaker/SpeakerControls.jsx`
- Delete: `src/features/speaker/SpeakerPage.jsx`
- Delete: `src/features/speaker/SpeakerPage.test.jsx`
- Delete: `src/features/speaker/SpeakerTimer.jsx`
- Delete: `src/features/speaker/syncProtocol.js`
- Delete: `src/features/speaker/syncProtocol.test.js`
- Delete: `src/features/speaker/syncTransport.js`
- Delete: `src/features/speaker/syncTransport.test.js`
- Delete: `src/features/presentation/SceneMap.jsx`
- Delete: `src/components/navigation/ChapterNav.jsx`
- Delete: `src/components/navigation/SceneFrame.jsx`
- Modify: `src/components/navigation/index.js`
- Modify: `src/components/navigation/navigation.test.jsx`
- Delete: `tests/e2e/reference-modes.spec.js`
- Delete: `tests/e2e/simulation.spec.js`
- Delete: `tests/e2e/speaker-sync.spec.js`
- Modify: `tests/e2e/accessibility-keyboard.spec.js`
- Modify: `tests/e2e/responsive.spec.js`

**Interfaces:**
- Retained navigation exports only primitives that are still imported by landing/presentation.
- E2E tests cover no deleted route or capability.

- [x] **Step 1: Write RED absence tests**

Add assertions in router and keyboard suites that deleted routes show Not Found and that the presentation keyboard does not open an overlay on `M` or navigate away on `D`.

- [x] **Step 2: Run RED check**

Run: `npm run test:e2e -- tests/e2e/accessibility-keyboard.spec.js --project=chromium`

Expected: FAIL because map/deep-dive behavior still exists before deletion.

- [x] **Step 3: Delete exactly the listed feature and test files**

Remove the listed files only after Task 1 and Task 2 have removed every runtime import. Reduce the navigation barrel and E2E suite to the retained landing/presentation flow.

- [x] **Step 4: Verify no orphan imports remain**

Run:

```bash
rg -n "features/(deep-dive|faq|glossary|sources|speaker|simulation)|SceneMap|ChapterNav|SceneFrame" src tests --glob '*.{js,jsx}'
npm run test -- src/components/navigation/navigation.test.jsx src/app/router.test.jsx
npm run test:e2e -- tests/e2e/accessibility-keyboard.spec.js tests/e2e/responsive.spec.js --project=chromium
```

Expected: the import scan has no matches and focused tests pass.

### Task 4: Finish visual cleanup, regression suite, and scope evidence

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/test/accessibility.test.jsx`
- Modify: `src/test/performancePolicies.test.jsx`
- Modify: `src/test/responsiveFixtures.test.jsx`
- Modify: `src/test/smoke.test.jsx`
- Modify: `tests/e2e/helpers.js`
- Modify: `docs/implementation-progress.md`
- Modify: `docs/final-verification.md`

**Interfaces:**
- Landing has one CTA and no long-form scene container.
- Presentation action row has only local navigation, fullscreen, and exit controls beneath a slide.
- Final verification records the user-approved v2 scope and removes obsolete walkthrough steps.

- [x] **Step 1: Write RED layout/accessibility expectations**

Replace fixtures for Speaker/reference/map with landing/presentation fixtures. Assert no removed landmark or button label exists; assert full-width presentation action row remains keyboard reachable and mobile readable.

- [x] **Step 2: Run RED checks**

Run: `npm run test -- src/test/accessibility.test.jsx src/test/responsiveFixtures.test.jsx src/test/smoke.test.jsx`

Expected: FAIL because old reference and Speaker fixture contracts remain.

- [x] **Step 3: Remove obsolete CSS and update documentation**

Delete speaker/reference/map/simulation-only CSS, retain landing Hero and presentation action styling, and document the scope reduction plus the still-required human landing/presentation walkthrough.

- [x] **Step 4: Run full verification**

Run:

```bash
npm run verify
npm run test:e2e
rg -n "deep-dive|speaker|Speaker|FAQ|Glossary|Sources|Simulation|scene-map|Исследовать историю" src tests --glob '*.{js,jsx,css}'
```

Expected: verification and E2E pass; the scan has no retained-product references to removed modes or controls.

## Self-review

- Scope coverage: every user-requested removal, retained fullscreen behavior, landing-only content, slide navigation, file deletion, test update, and final evidence has an owned task.
- Dependency order: routes and controls change before deletion; content contracts are simplified before their registries disappear; CSS/tests finalize after all import owners are removed.
- File consistency: Task 3 deletes feature owners only after Tasks 1–2 remove imports. No task relies on a deleted interface.
- Placeholders: none.
