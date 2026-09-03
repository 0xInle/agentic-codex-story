# Speaker console recovery design

## Goal

Make Speaker mode understandable and dependable when it is used with, or without, an open Presentation tab. Improve the control layout without adding backend behavior, external APIs, or new product modes.

## Agreed interaction design

- Speaker controls are available only after a confirmed Presentation connection. Before confirmation, the page explains that Presentation mode must be open in another tab; commands and the scene selector are disabled rather than silently doing nothing.
- The ambiguous `Подключение…` label is removed. Connection state is only surfaced as a clear, actionable disconnected notice or a compact connected confirmation.
- The control surface uses an even responsive grid. Every enabled command has hover and pressed feedback; active timer and simulation states are visually explicit; disabled controls look disabled and expose an explanation.
- Simulation commands are available only for the Orchestration scene, where Presentation can render the deterministic simulation.
- `Выйти в историю` navigates to `/story`. It intentionally does not try to close the browser tab because tabs opened by the user cannot reliably be closed by page code.
- Speaker notes show a short current-scene cue, three content-owned talking points, and a transition prompt. Notes remain in `src/content/speaker-notes`, never in JSX.

## Data flow and error handling

The existing local synchronization transport remains the only command path. Speaker continues to wait for Presentation acknowledgements before changing scene state. The UI derives command availability from the transport connection state, so an unavailable peer is a visible recoverable state rather than a failed command. No simulated command claims that an external process ran.

## Verification

- Component tests cover disconnected command disablement, speaker cue rendering, exit navigation, and acknowledged timer behavior.
- Playwright covers the two-tab flow, including explicit usable controls after synchronization.
- Lint, unit/component tests, build, and the project verification gate run after the scoped change.

## Scope boundary

This is a UX and reliability repair for existing Speaker mode. It does not change the content model, architecture, presentation routes, synchronization protocol allowlist, product scope, or Phase 11 human-acceptance requirement.
