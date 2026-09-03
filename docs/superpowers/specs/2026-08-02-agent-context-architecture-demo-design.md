# Agent-context architecture demonstration design

## Purpose

Create a standalone, non-executable directory in the repository root named
`architecture-demo-personal-cabinet/`. It will be used only as a realistic
file-tree artifact for a presentation screenshot. It must not be imported by
Vite, referenced by application code, or included in product behaviour.

The example models a neutral personal-cabinet frontend and demonstrates how an
agent receives context progressively: from repository-wide rules to a feature,
then to its API, state and a single UI component.

## Design principles

- Code-looking `.js` and `.jsx` files are empty placeholders; they
  communicate layout only and cannot be executed.
- Markdown files are short, realistic examples rather than copied policy text.
- Every document has one responsibility. Local documents link to the next
  relevant layer instead of duplicating root documentation.
- `AGENTS.md` files are located at practical boundaries: repository, web app,
  feature, API, model, UI module and component.
- The tree deliberately contains enough depth for a readable IDE screenshot,
  while retaining a single product area: profile settings.

## Final tree

```text
architecture-demo-personal-cabinet/
├── AGENTS.md
├── README.md
├── SPEC.md
├── IMPLEMENTATION_PLAN.md
├── docs/
│   ├── architecture.md
│   ├── verification.md
│   ├── security-model.md
│   ├── api/
│   │   └── profile-api.md
│   └── features/
│       └── profile-settings.md
├── apps/
│   └── web/
│       ├── AGENTS.md
│       ├── docs/
│       │   └── ui-architecture.md
│       └── src/
│           ├── app/
│           │   ├── routes.jsx
│           │   └── providers.jsx
│           ├── pages/
│           │   └── profile/
│           │       └── ProfilePage.jsx
│           ├── features/
│           │   └── profile-settings/
│           │       ├── AGENTS.md
│           │       ├── README.md
│           │       ├── architecture.md
│           │       ├── verification.md
│           │       ├── api/
│           │       │   ├── AGENTS.md
│           │       │   ├── profile-contract.md
│           │       │   └── profileClient.js
│           │       ├── model/
│           │       │   ├── AGENTS.md
│           │       │   ├── state-contract.md
│           │       │   ├── profileSettings.js
│           │       │   └── profileSettings.test.example.js
│           │       └── ui/
│           │           └── notification-settings/
│           │               ├── AGENTS.md
│           │               ├── component-contract.md
│           │               ├── accessibility.md
│           │               └── components/
│           │                   └── NotificationSwitch/
│           │                       ├── AGENTS.md
│           │                       ├── NotificationSwitch.jsx
│           │                       ├── NotificationSwitch.types.js
│           │                       └── NotificationSwitch.test.example.jsx
│           └── shared/
│               ├── ui/
│               │   └── Button/
│               │       └── Button.jsx
│               └── lib/
│                   └── http/
│                       └── request.js
└── tests/
    └── e2e/
        └── profile-settings.spec.example.js
```

## Documentation responsibility map

| Layer | Documents | What an agent learns |
| --- | --- | --- |
| Repository root | `AGENTS.md`, `README.md`, `SPEC.md`, `IMPLEMENTATION_PLAN.md` | Global constraints, launch context, product intent, task sequencing and checks. |
| Shared docs | `architecture.md`, `verification.md`, `security-model.md`, feature and API documents | System boundaries, proof expectations, safe access and public contracts. |
| Web app | `apps/web/AGENTS.md`, `ui-architecture.md` | Frontend conventions, route ownership and composition layers. |
| Feature | Feature `AGENTS.md`, `README.md`, `architecture.md`, `verification.md` | Feature scope, its entry point, local state/API/UI relationships and focused checks. |
| API and model | Local `AGENTS.md` plus contract documents | Request/response and state boundaries; files that must not be changed casually. |
| UI and component | Local `AGENTS.md`, component contract and accessibility document | Props/events, visual and accessibility rules, and the nearby test to run. |

## Demonstrated agent path

For a request to change a profile notification switch, the visible route is:

```text
SPEC.md
→ root AGENTS.md
→ apps/web/AGENTS.md
→ profile-settings/AGENTS.md
→ ui/notification-settings/AGENTS.md
→ component-contract.md + NotificationSwitch.test.example.jsx
```

The agent then checks upward through the component, feature and browser scenario.
This demonstrates that context is layered, not a single oversized prompt.

## Verification

- Verify that the tree exactly matches the approved structure.
- Verify that all code-looking files are zero bytes.
- Verify that every `AGENTS.md` and named documentation file is non-empty and
  describes only its own layer.
- Verify that no file under the demo directory is imported by the Vite app.
- Verify with `rg` that the demo directory is absent from `src/`, `package.json`
  and `vite.config.js` import references.

## Self-review

- No product code, package configuration, Vite configuration or existing app
  content is changed.
- The folder name clearly labels the artifact as a demonstration, preventing it
  from being mistaken for an application module.
- The example uses a neutral personal-cabinet domain and avoids company or user
  data.
- The example does not create TypeScript source; empty JavaScript and JSX files
  match the JavaScript-only constraints of the parent repository.
