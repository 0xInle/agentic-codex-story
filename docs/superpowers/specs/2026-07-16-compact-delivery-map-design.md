# Compact delivery map design

## Purpose

Keep the landing page within a typical 1280 × 800 desktop viewport while showing the complete path from an idea to a local release. The map is supporting context for the landing slide, not a second content-heavy section.

## Approved experience

The landing page has two visible parts:

1. A compacted existing hero with the presentation entry action.
2. A single visual delivery map directly below it.

The map has no visible eyebrow, title, explanatory paragraph, or group headings. It displays all thirteen existing steps as compact cards in a five, four, four layout. Each card keeps its ordinal number, label, and short description. Animated dotted/glowing transitions show the directed flow across a row and into the next row. The transition is decorative and must not communicate information unavailable in the cards themselves.

At a 1280 × 800 desktop viewport, the hero and map fit without document-level vertical scrolling. At narrower widths or low viewport heights, the layout may become vertically scrollable rather than clipping or shrinking text below readable sizes.

## Architecture

`src/content/roadmap/roadmap.js` remains the sole owner of the thirteen delivery steps and their current semantic grouping. `DeliveryRoadmap` derives one ordered sequence by flattening those groups; it does not render the group titles. The component exposes one labelled landmark for assistive technology but does not render a visible heading solely for that label.

`src/styles/global.css` owns the compact desktop grid, card styling, visual route segments, responsive fallback, and reduced-motion behavior. The existing hero styles are tightened only in the landing context. No new packages, remote assets, routes, APIs, or product features are introduced.

## Accessibility and motion

- The map is one named region with one ordered list of thirteen items.
- Decorative route segments are `aria-hidden`.
- Card order in the DOM remains the process order.
- The existing `prefers-reduced-motion` rule disables animated route movement while retaining visible static connectors.
- Responsive styles preserve readable cards and natural document flow.

## Verification

- Update component tests to prove there is one labelled map/list, all thirteen cards appear in order, visible group headings are absent, and there are twelve decorative connectors.
- Retain the content-data test for unique identifiers and all thirteen steps.
- Add a Playwright landing-page assertion at 1280 × 800 that verifies the document fits the viewport and the map is visible.
- Run focused tests, the relevant Playwright suites, accessibility/browser inspection, and `npm run verify`.

## Boundaries

This change does not alter the slides, their content, presentation controls, fullscreen behavior, routing, or the content model beyond using the existing data in a more compact visual layout. It deliberately avoids a free-form diagram or a new interaction model: the cards remain static informational content and the animation is purely decorative.
