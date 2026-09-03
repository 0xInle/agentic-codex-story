# Dense landing map design

## Purpose

Fit the landing Hero and the full delivery map in a desktop viewport without vertical scrolling, while making the map look intentionally full rather than leaving an unused first column in its lower rows.

## Approved changes

- The landing Hero no longer displays `Инструмент не заменяет осмысленное решение человека.`. The same content remains in the presentation slide, where it is part of the learning material.
- The landing Hero is made shorter through smaller title sizing, gaps and padding; its CTA and developer-path card stay intact.
- The thirteen delivery cards remain ordered in three visual rows: five cards, four cards, four cards.
- Every visual row spans the available map width. The middle row retains its reverse travel direction and the final row returns left-to-right, so the animated connectors still describe one continuous route.
- At 1920 × 800 and 1280 × 800 the landing page has no document-level vertical or horizontal overflow. Narrow or low-height screens keep the existing readable single-column fallback.

## Architecture and accessibility

`HeroScene` receives no new data. Its existing `landing` prop determines whether the misconception paragraph renders. `DeliveryRoadmap` markup and content order remain unchanged. `global.css` moves the map from five equal columns to a twenty-column visual grid: the first row's five cards each use four tracks, while each lower row's four cards uses five tracks. This fills every row without changing DOM order or the card data.

The named map region, ordered list, card count and decorative `aria-hidden` connectors remain unchanged. The CSS-only reduced-motion fallback continues to make connectors static.

## Verification

- TDD: add a landing-only Hero test that expects the misconception text to be absent, observe it fail, then make it pass while retaining the slide assertion.
- Extend the landing E2E test to check the absent phrase and verify the 1920 × 800 landing page has no document-level overflow.
- Run focused tests, relevant Chromium E2E, accessibility/reduced-motion E2E and `npm run verify`.
- Inspect the local page at 1920 × 800 to confirm all three rows fill the map and the full landing fits in the viewport.

## Boundaries

This is a visual layout correction only. It does not change slide content, navigation, routes, card data, animation model, external dependencies or project scope.
