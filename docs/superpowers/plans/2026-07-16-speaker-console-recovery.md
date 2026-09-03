# Speaker Console Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Speaker mode clear and actionable by exposing real connection availability, polished control states, exit navigation, and concise content-owned presenter cues.

**Architecture:** `SpeakerPage` derives availability from the existing local sync transport and composes focused presentational components. `SpeakerControls`, `SpeakerTimer`, and `ConnectionStatus` only render explicit state passed by the page. Existing Presentation acknowledgement remains the source of truth for remote actions.

**Tech Stack:** React 19, React Router, Vite, Vitest, Testing Library, Playwright, CSS custom properties.

## Global Constraints

- JavaScript and JSX only; do not add TypeScript, a backend, external APIs, or dependencies.
- Keep presenter content in `src/content/speaker-notes`; do not place it in JSX.
- Preserve the existing allowlisted local synchronization protocol and acknowledged remote scene changes.
- Do not claim an unavailable Presentation command succeeded.

---

### Task 1: Make Speaker connection and controls explicit

**Files:**
- Modify: `src/features/speaker/SpeakerPage.jsx`
- Modify: `src/features/speaker/SpeakerControls.jsx`
- Modify: `src/features/speaker/SpeakerTimer.jsx`
- Modify: `src/features/speaker/ConnectionStatus.jsx`
- Modify: `src/features/speaker/SpeakerPage.test.jsx`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/speaker-sync.spec.js`
- Modify: `docs/implementation-progress.md`

**Interfaces:**
- `SpeakerControls({ disabled, isOrchestrationScene, simulationPlaying, ...handlers })` renders only supported controls as enabled and exposes semantic active states.
- `ConnectionStatus({ state })` returns either an actionable disconnected status or a compact connection confirmation.
- `SpeakerPage` refreshes the transport connection state, disables unavailable commands, and renders content-owned `talkingPoints` plus current/next-scene cues.

- [x] **Step 1: Write failing component and browser tests**

Add assertions that disconnected Speaker mode disables command buttons and selector, renders actionable recovery text, exposes a history exit link, renders three talking points, and marks active timer/simulation states. Add a two-tab Playwright assertion that enabled controls receive visible hover/pressed-capable classes and control Presentation after acknowledgement.

- [x] **Step 2: Run focused tests to verify RED**

Run: `npm run test -- src/features/speaker/SpeakerPage.test.jsx`

Expected: FAIL because current controls have no disabled or active-state contract and Speaker lacks recovery guidance and an exit link.

- [x] **Step 3: Implement the minimum recovery UI**

Refresh `connectionState` from the existing transport, pass command availability to controls and timer, hide the ambiguous connection-in-progress copy, show recovery guidance when disconnected, and add the `/story` exit link. Use an even CSS grid, hover/active/disabled selectors, and content-owned `talkingPoints` in the notes card.

- [x] **Step 4: Verify GREEN and browser behavior**

Run:

```bash
npm run test -- src/features/speaker/SpeakerPage.test.jsx
npm run test:e2e -- tests/e2e/speaker-sync.spec.js --project=chromium
npm run lint
npm run build
```

Expected: all commands pass; a standalone `/speaker` page explains that Presentation must be opened, while two tabs synchronize and remote commands visibly change Presentation.

- [x] **Step 5: Record factual evidence**

Add test commands, results, changed-file list, manual browser observations, limitation that the browser cannot safely close a user-opened tab, and the remaining Task 49 human-acceptance blocker to `docs/implementation-progress.md`.

## Self-review

- Coverage: all agreed changes have a component, data ownership, style, and browser-verification step.
- Placeholders: none; the scope is restricted to the existing Speaker UI and its tests.
- Contract consistency: controls consume the existing local transport state and do not add a message type or external dependency.
