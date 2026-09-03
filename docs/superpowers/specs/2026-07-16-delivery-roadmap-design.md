# Delivery roadmap design

## Goal

Extend the focused landing page with a compact visual roadmap showing how an idea becomes a locally releasable product. The roadmap is explanatory decoration and does not introduce routes, workflow execution, agents, backend behavior, or real production deployment.

## Content and grouping

The roadmap contains thirteen content-owned steps in three groups:

1. **Проектирование:** Идея, Контекст, SPEC, Архитектура, План.
2. **Исполнение:** Agents, Subagents, Orchestration, Реализация.
3. **Доверие:** Тесты, Security review, Human review, Release.

`Release` is labelled as local readiness in supporting copy. It never claims a real deployment occurred.

## Layout

The landing Hero is reduced from full-viewport dominance by using a narrower visual surface and normal top alignment. The roadmap appears directly beneath it, in three labelled rows. Each row contains small numbered blocks connected by dotted line segments; active cyan segments move gently left-to-right to suggest handoff rather than an uncontrolled animation.

At narrow widths, the roadmap becomes a single vertically ordered stack with short vertical connectors. It remains readable without horizontal scrolling.

## Accessibility and motion

- The roadmap is a labelled section with grouped ordered lists; the textual step order is always available.
- Decorative connectors are hidden from assistive technology.
- Motion uses only CSS and is disabled under `prefers-reduced-motion: reduce`; static connector styling remains visible.
- There are no canvas, SVG dependency, external assets, or network requests.

## Component boundary

- `src/content/roadmap/roadmap.js` owns groups, IDs, labels and descriptions.
- `src/features/explore/DeliveryRoadmap.jsx` renders semantic roadmap content.
- `src/features/explore/ExplorePage.jsx` composes Hero and roadmap; it does not own roadmap strings.
- `src/styles/global.css` owns the visual grid, connectors, transitions and reduced-motion styles.

## Verification

- Unit/component tests verify 13 ordered steps, three labelled groups, unique IDs, landing placement and no extra navigation.
- Accessibility test verifies heading/list semantics and non-interactive connector decoration.
- Responsive test verifies narrow layout classes without horizontal overflow.
- Playwright checks landing visibility, CTA journey, browser console and reduced-motion behavior.
