# Roadmap stage popovers design

## Purpose

Turn every delivery-map card into a presenter aid: the viewer can reveal a short explanation of the stage without memorising the story.

## Approved interaction

Each of the thirteen cards has a compact explanatory popover positioned above the card. It has three labelled, content-owned lines:

- `Что это?`
- `Зачем?`
- `Как помогает агенту?`

Pointer hover and keyboard focus reveal the matching popover temporarily. Click or Enter/Space toggles a pinned state so a presenter can keep the explanation visible while speaking. A second activation, Escape, or moving focus/hover away from an unpinned card closes it. Only one popover can be open at a time.

On narrow viewports, the popover remains visually attached to the card but uses the available width and may overlap nearby map space rather than forcing a card-grid reflow. It must not cause horizontal page overflow.

## Architecture

`src/content/roadmap/roadmap.js` becomes the sole home for the new `explanation` object on every existing step. Its `what`, `why`, and `agentHelp` strings are Russian presenter copy.

`DeliveryRoadmap` owns small local state: active step ID and whether it is pinned. Each card becomes a native button styled as the existing card. It exposes an `aria-expanded` state and controls its own labelled explanatory element. Decorative connectors remain `aria-hidden`; the ordered list and content order remain unchanged.

No new package, route, external API, persistent storage, or global state is needed.

## Accessibility and motion

- Every explanation is reachable with Tab and revealed by focus.
- Enter and Space pin/unpin the current card using the native button contract.
- Escape closes an open popover and restores a non-expanded state.
- Popover content is regular readable DOM text, not a hover-only visual effect.
- The design does not depend on animated motion; reduced-motion behavior for existing connectors stays unchanged.

## Verification

- Add content-data coverage requiring all thirteen explanation objects and their three non-empty fields.
- TDD component tests for focus reveal, click pin/unpin, keyboard activation, Escape close, and one-open-popover behavior.
- Add Playwright keyboard and mouse checks for a representative card, then run the existing mobile overflow and accessibility suite.
- Inspect desktop and mobile local layouts to confirm popovers appear above cards and do not cause horizontal overflow.

## Boundaries

The cards remain educational navigation-free content. This adds only local presenter explanations; it does not reintroduce speaker mode, deep dives, remote data, backend behavior, or a separate presentation control surface.
