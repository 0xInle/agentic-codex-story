# Delivery Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, animated 13-step delivery roadmap under the landing Hero.

**Architecture:** Content in `src/content/roadmap` defines the three groups; `DeliveryRoadmap` renders semantics only; `global.css` supplies responsive dotted connectors and reduced-motion behavior.

### Task 1: Add the landing delivery roadmap

**Files:**
- Create: `src/content/roadmap/roadmap.js`
- Create: `src/content/roadmap/roadmap.test.js`
- Create: `src/features/explore/DeliveryRoadmap.jsx`
- Create: `src/features/explore/DeliveryRoadmap.test.jsx`
- Modify: `src/features/explore/ExplorePage.jsx`
- Modify: `src/test/accessibility.test.jsx`
- Modify: `src/test/responsiveFixtures.test.jsx`
- Modify: `tests/e2e/explore.spec.js`
- Modify: `src/styles/global.css`
- Modify: `docs/implementation-progress.md`

**Interfaces:** `deliveryRoadmapGroups` is an ordered array of `{ id, title, steps }`; every step is `{ id, label, description }`. `DeliveryRoadmap({ groups })` renders one labelled section and three ordered group lists.

- [x] Write failing tests for 3 groups, 13 unique ordered steps, landing placement, non-interactive decorative connectors and reduced-motion CSS.
- [x] Run `npm run test -- src/content/roadmap/roadmap.test.js src/features/explore/DeliveryRoadmap.test.jsx` and confirm RED.
- [x] Add the data, renderer, landing composition, styles, and focused accessibility/responsive/E2E expectations.
- [x] Run `npm run test -- src/content/roadmap/roadmap.test.js src/features/explore/DeliveryRoadmap.test.jsx src/test/accessibility.test.jsx src/test/responsiveFixtures.test.jsx`, `npm run test:e2e -- tests/e2e/explore.spec.js --project=chromium`, `npm run verify`; record evidence.
