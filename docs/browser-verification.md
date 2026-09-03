# Browser verification — Developer control room

Checked on 2026-07-16 against the local Vite server at `http://127.0.0.1:5173/`.

| Surface | Viewport | Browser | Focus | Overflow | Console | Result |
| --- | --- | --- | --- | --- | --- | --- |
| Explore landing and Hero | 1440×900 | Chromium (Playwright and in-app browser) | Keyboard activation opens Presentation; visible `2px` solid outline | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Explore landing and Hero | 390×844 | Chromium mobile | Primary CTA and H1 are visible; global `:focus-visible` rule applies | `false`; CTA 340px within 374px shell; chapter rail scrolls horizontally by design | No errors observed | PASS |
| Presentation: Orchestration | 1440×900 | In-app browser | Controls, scenario selector and scene actions are visible and reachable | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Glossary reference mode | 390×844 | In-app browser | Search control has visible Russian label `Поиск терминов` | `false`; viewport and document width are both 390px | No errors observed | PASS |
| Presentation timeline | 1440×900 | In-app browser | Scene actions visible; keyboard route covered by E2E | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Presentation SPEC and AGENTS | 1440×900 | In-app browser | Scene actions visible; keyboard route covered by E2E | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Presentation MCP and agents graph | 1440×900 | In-app browser | Scene actions visible; keyboard route covered by E2E | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Presentation terminal loop and security | 1440×900 | In-app browser | Scene actions visible; keyboard route covered by E2E | `false`; viewport and document width are both 1440px | No errors observed | PASS |
| Speaker mode | 1440×900 | In-app browser | Timer, scene, map, deep-dive and simulation controls are visible | `false`; viewport and document width are both 1440px | No errors observed | PASS |

## Evidence notes

- The narrow layout stacks the Hero columns, keeps the presentation CTA at full available width, and preserves long Russian text without page-level horizontal overflow.
- The chapter rail remains horizontally scrollable on small screens so chapter labels are not truncated or wrapped into an inaccessible control.
- Reduced-motion rules disable animation and transitions under both the application attribute and the browser preference.
- The in-app browser screenshots confirm the desktop Hero, the Presentation orchestration controls and the mobile Glossary visual hierarchy. DOM metrics and captured browser diagnostics corroborate those observations.
- The complete unfiltered Playwright run now passes in Chromium, WebKit, Firefox and Chromium mobile. It runs one worker at a time because the local Vite development server is shared by every project.
