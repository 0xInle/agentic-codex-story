# Minimal landing and slides design

## Decision

The application becomes a focused local presentation site with two user-facing experiences only:

1. A landing page at `/` containing the visual Hero panel and one `Начать презентацию` action.
2. A slide presentation at `/present/:sceneId` containing the current scene, fullscreen support, and a compact navigation bar beneath the scene.

This deliberately replaces the broader v1 navigation described by the original SPEC and implementation plan. It is a user-approved scope reduction; it does not add backend behavior, runtime APIs, analytics, or dependencies.

## Removed product surface

Remove routes, links, components, tests, and content registries used exclusively by:

- the long-form Explore story and chapter navigation;
- Deep Dive pages;
- Speaker mode and cross-window synchronization;
- scene map;
- FAQ, glossary, and sources pages;
- deterministic orchestration simulation and its controls.

Old removed URLs must resolve to the ordinary Not Found page. No hidden fallback route or undocumented feature remains.

## Landing page

The landing page keeps the existing dark grid visual system, Hero thesis, five-stage supporting list, and a single primary CTA. It does not render the sixteen presentation scenes or an Explore-style long-form document below the Hero.

## Presentation page

Each presentation URL continues to render one of the existing sixteen scenes. Presentation keeps:

- next, previous, first, and last scene keyboard navigation;
- fullscreen request with its existing graceful browser fallback;
- exit to the landing page;
- an accessible scene count and focus-safe navigation.

The visible navigation below the current slide contains only previous, next, fullscreen, and exit controls. Map and deep-dive actions are removed from both visual and keyboard interaction.

## Data boundary

Retain the scene corpus and only the shared content required for its visual renderers. Remove content modules that become orphaned after their owning features are deleted. The slide text itself remains content-owned, not hard-coded into JSX.

## Verification

- Routing tests assert that `/` contains only the landing surface and CTA, all valid `/present/:sceneId` routes render slides, and removed routes reach Not Found.
- Component tests assert that presentation controls exclude map/deep-dive/Speaker actions while retaining fullscreen and keyboard navigation.
- Playwright verifies the landing-to-presentation journey, slide switching, fullscreen graceful handling, and absence of removed navigation.
- Content validation, lint, unit/component tests, production build, accessibility checks, and the final browser journey remain required.

## Explicit non-goals

There is no speaker console, cross-window synchronization, scene map, deep-dive navigation, reference library, FAQ, glossary, source browser, or orchestration simulation in this product version.
