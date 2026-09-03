# Agentic Presentation Redesign Design

## Goal

Replace the current sixteen-slide educational presentation with a seventeen-slide, Russian-language visual narrative about reliable agentic development. The product remains a local React/Vite/JavaScript site with its existing landing page, presentation navigation, fullscreen action, and read-aloud script drawer.

## Scope and constraints

- The presentation contains exactly seventeen ordered scenes.
- The landing route remains `/`; the presentation route remains `/present/:sceneId`.
- There is no backend, real Codex/MCP/API call, authentication, analytics, or external runtime dependency.
- JavaScript only; no TypeScript files or typecheck command are added.
- Product content remains under `src/content`; presenter scripts never live in JSX.
- A drawer contains all text introduced by the heading `Что говорить`; it is not repeated in the slide body.
- Time estimates are excluded from the rendered interface and content contracts.
- Interactive explanations are local hover and keyboard-focus popovers. They provide the same information to pointer and keyboard users.
- Existing fullscreen, previous/next, exit, Escape and drawer-outside-click behavior is retained.

## Content model

Each scene uses one content-owned record with these fields:

```js
{
  id: 'modern-agentic-development',
  order: 1,
  title: 'Современная агентская разработка',
  subtitle: 'Как собрать систему, в которой агенты действительно могут работать',
  visualType: 'agentic-system',
  screenThesis: 'Человек + агенты + инструменты + проверяемый результат',
  visual: { /* visual-type-specific, serializable data */ },
  hoverItems: [
    { id: 'human', label: 'Человек', description: 'Задаёт смысл и принимает решения.' },
  ],
  presenterGuide: { paragraphs: ['…', '…', '…'] },
}
```

`visual` carries only display data such as steps, cards, document sections, code snippets, risks and edge relationships. Components render this data and never duplicate speaker copy.

## Visual system

The existing dark control-room surface, cyan accent, borders, mono eyebrows and visible focus treatments remain the design language. New scenes compose a small set of reusable visual patterns instead of creating seventeen unrelated layouts:

- **Agentic system / simple-vs-reliable flow:** connected nodes and directional links.
- **System map / MCP map / runtime chain:** stacked pipeline with labelled nodes and hover explanations.
- **Document cards:** file-shaped cards, sections and concise sample text.
- **Maturity ladder:** ordered levels with direction and a clear current recommendation.
- **Role topology:** central coordinator with bounded independent roles.
- **Orchestration boundary:** allowed independent tasks versus a collision on one file.
- **Code panels:** semantic `pre`/`code` panels for file structure and command-like examples.
- **Risk/control grid:** warning-coloured but non-colour-only risk statements paired with controls.

Every hover target is an accessible button. Pointer hover/focus opens its popover; click, Enter and Space pin it; Escape closes it. A popover uses `role="tooltip"` while transient and has an explicit relation to its trigger. It must not hide essential screen content or create page overflow.

## Drawer scripts

`PresenterGuide` continues to be a fixed right drawer one third of the desktop viewport, with an opaque enough backdrop, internal scrolling, reduced-motion fallback, close button, Escape close and outside-click close. Its heading stays `Текст доклада`.

All seventeen `presenterGuide.paragraphs` are Russian read-aloud scripts for a mid-level audience. They expand the slide in clear semantic paragraphs, explain trade-offs and retain only necessary proper names such as Codex, MCP, `SPEC.md`, `README.md` and `AGENTS.md`.

## Ordered scene map

| # | ID | Screen title | Visual pattern |
| --- | --- | --- | --- |
| 1 | `modern-agentic-development` | Современная агентская разработка | Agentic system: человек + агенты + инструменты + проверяемый результат; repository, terminal and agent motifs |
| 2 | `autonomy-illusion` | Кажется, что агент сделал всё сам | Simple one-agent path versus reliable development path |
| 3 | `agentic-system-map` | Из чего состоит агентная разработка | Vertical system map from human intent to human acceptance |
| 4 | `specification-start` | Разработка начинается не с кода | `SPEC.md` file mockup and local site requirements |
| 5 | `three-documents` | Три документа — три разных назначения | `README.md`, `SPEC.md`, `AGENTS.md` cards and example popovers |
| 6 | `living-specification` | От spec-first к живой спецификации | Three maturity levels and SPEC-to-runtime feedback loop |
| 7 | `context-first` | Спецификация не знает ваш репозиторий | `SPEC.md`, repository questions and `AGENTS.md` bridge |
| 8 | `skills-workflows-plugins` | Агенту нужны не только знания, но и процессы | Skill → workflow → plugin levels and process examples |
| 9 | `system-classes` | Три примера разных классов систем | GSD, Superpowers and Team Mode comparison cards with dependency warning |
| 10 | `subagents` | Один агент не обязан делать всё | Coordinator with Explorer, Executor, Complex Executor and Reviewer |
| 11 | `orchestration` | Оркестрация — это управление, а не количество агентов | Delegation brief and safe/unsafe parallel boundaries |
| 12 | `mcp-architecture` | MCP подключает агента к внешнему миру | Codex → client → server → capabilities → external systems map |
| 13 | `mcp-practice` | Агент начинает не только писать, но и наблюдать | Browser verification flow and constrained-access risk cards |
| 14 | `runtime-evidence` | Build прошёл. Но работает ли система? | Tests → lint → static check → build → browser → diagnostics → SPEC comparison |
| 15 | `autonomy-risk` | Самая опасная иллюзия: «система всё проверила сама» | One false premise beneath automated stages and control/risk list |
| 16 | `maturity-ladder` | Не нужно внедрять всё сразу | Six maturity steps from structured request to runtime feedback |
| 17 | `conclusion` | Будущее — это не один автономный агент | Final relationship: human + living specification + specialised agents + tools + verifiable runtime |

## Interaction and responsive behaviour

- Presentation progression reflects `order / 17` and supports keyboard navigation exactly as before.
- The slide surface remains compact at desktop widths; diagrams scale and stack intentionally at narrow widths.
- Visual relationships are rendered as HTML/CSS, so they remain selectable, accessible and reduced-motion-safe.
- Decorative connectors have `aria-hidden="true"`; every meaningful relationship is represented by adjacent text, labels or list structure.
- The drawer and pinned popover have predictable Escape behaviour: Escape closes a pinned popover first, then the drawer, then falls through to the existing presentation escape behaviour.

## Verification strategy

1. Content validation confirms exactly seventeen unique IDs, ordered scene numbers, required `subtitle`, `visualType`, `visual`, `hoverItems` and non-empty three-paragraph drawer scripts.
2. Component tests assert every visual pattern’s semantic structure, content rendering and keyboard/pointer popover behavior.
3. Presentation integration tests assert `1 / 17`, first/last navigation, drawer behavior and state reset between scenes.
4. Playwright verifies the seventeen-scene journey, popover pointer/focus access, fullscreen graceful fallback, keyboard navigation and reduced motion.
5. Browser inspection checks desktop compactness, absence of unwanted overflow, the drawer width/scroll behaviour and readable diagrams.
6. `npm run verify` remains the final technical gate; warnings are reported rather than hidden or weakened.

## Explicit non-goals

- No actual MCP server, browser MCP client, GitHub/Jira/database/log integration, external plugin installation or remote call is added.
- No presentation timer, speaker mode, deep-dive route, scene map, FAQ, glossary or sources route is reintroduced.
- No automated slide advance is added.

## Self-review

- All seventeen supplied subject areas map to one uniquely ordered slide.
- Every `Что говорить` block maps to the drawer-only presenter script; no timing content is rendered.
- The plan preserves JavaScript-only constraints by using `Статическая проверка`, not TypeScript typechecking.
- Hover requirements include keyboard focus and persistent activation, so the interaction does not exclude non-pointer users.
- No product behavior implies that the local demonstration has real Codex, MCP or external-system access.
