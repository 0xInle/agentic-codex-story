# Agent-context architecture demonstration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a standalone personal-cabinet file-tree artifact that visually demonstrates layered application and agent context without changing the Vite application.

**Architecture:** The artifact is a root-level directory named `architecture-demo-personal-cabinet/`, with a neutral frontend personal-cabinet domain. Empty `.js` and `.jsx` files model code locations; non-empty Markdown files document one responsibility per layer. Nested `AGENTS.md` files demonstrate progressive rules from repository to component.

**Tech Stack:** Filesystem-only demonstration; Markdown, empty JavaScript/JSX placeholders, no dependencies, no runtime code.

## Global Constraints

- Create only `architecture-demo-personal-cabinet/` and files below it; do not modify `src/`, Vite configuration, package files, product content or tests.
- The directory is illustrative only and must not be imported by the application.
- All `.js` and `.jsx` files in the demo are zero bytes.
- Every `AGENTS.md` and named documentation file is non-empty, concise and limited to the responsibility of its own layer.
- The example domain is a neutral personal cabinet with profile-notification settings.
- Git is not initialized; do not commit.

---

## File structure and responsibilities

| Path group | Responsibility |
| --- | --- |
| Root documents | Global product intent, repository rules, plan and stable technical guidance. |
| `docs/` | Architecture, verification, security, API and feature contracts. |
| `apps/web/` | Frontend application conventions and application-level UI architecture. |
| `src/features/profile-settings/` | Feature scope plus API, state and UI context. |
| `ui/notification-settings/components/NotificationSwitch/` | The deepest component contract and code-file placeholders. |
| `tests/e2e/` | The visible browser-level proof location. |

### Task 1: Establish repository-level and shared-document context

**Files:**
- Create: `architecture-demo-personal-cabinet/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/README.md`
- Create: `architecture-demo-personal-cabinet/SPEC.md`
- Create: `architecture-demo-personal-cabinet/IMPLEMENTATION_PLAN.md`
- Create: `architecture-demo-personal-cabinet/docs/architecture.md`
- Create: `architecture-demo-personal-cabinet/docs/verification.md`
- Create: `architecture-demo-personal-cabinet/docs/security-model.md`
- Create: `architecture-demo-personal-cabinet/docs/api/profile-api.md`
- Create: `architecture-demo-personal-cabinet/docs/features/profile-settings.md`

**Interfaces:**
- Produces: the first leg of the visible instruction chain: `SPEC.md → AGENTS.md → docs/features/profile-settings.md`.
- Consumes: no project code or runtime interfaces.

- [ ] **Step 1: Create the root and `docs/` hierarchy.**

Create only these directories: `architecture-demo-personal-cabinet/`, `docs/api/`, and `docs/features/`.

- [ ] **Step 2: Write root documents.**

`AGENTS.md` must state that agent work starts by reading `SPEC.md`, follows the plan, uses `docs/architecture.md` for boundaries, and reads a feature-level `AGENTS.md` before editing its module. `README.md` labels the folder as a non-executable screenshot artifact. `SPEC.md` describes changing profile-notification settings. `IMPLEMENTATION_PLAN.md` contains the ordered path: understand → scope → implement → verify → review.

- [ ] **Step 3: Write shared documents.**

`architecture.md` names application, feature, shared UI and test boundaries. `verification.md` names unit, integration, browser and accessibility checks. `security-model.md` states minimum access, no secrets in prompts and approval for irreversible actions. `profile-api.md` defines a profile-settings read/update contract. `profile-settings.md` gives user scenario, scope and acceptance criteria.

- [ ] **Step 4: Inspect the visible root context.**

Run: `find architecture-demo-personal-cabinet -maxdepth 3 -type f | sort`

Expected: exactly nine root/shared Markdown files in their planned locations, with no application file outside the demo directory.

### Task 2: Add the web, feature and component instruction layers

**Files:**
- Create: `architecture-demo-personal-cabinet/apps/web/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/apps/web/docs/ui-architecture.md`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/app/routes.jsx`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/app/providers.jsx`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/pages/profile/ProfilePage.jsx`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/README.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/architecture.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/verification.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/api/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/api/profile-contract.md`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/api/profileClient.js`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/model/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/model/state-contract.md`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/model/profileSettings.js`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/model/profileSettings.test.example.js`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/AGENTS.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/component-contract.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/accessibility.md`
- Create: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/components/NotificationSwitch/AGENTS.md`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/components/NotificationSwitch/NotificationSwitch.jsx`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/components/NotificationSwitch/NotificationSwitch.types.js`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/features/profile-settings/ui/notification-settings/components/NotificationSwitch/NotificationSwitch.test.example.jsx`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/shared/ui/Button/Button.jsx`
- Create empty: `architecture-demo-personal-cabinet/apps/web/src/shared/lib/http/request.js`
- Create empty: `architecture-demo-personal-cabinet/tests/e2e/profile-settings.spec.example.js`

**Interfaces:**
- Consumes: root feature contract and shared documentation from Task 1.
- Produces: visible agent path: root rules → web rules → feature rules → API/model/UI rules → component rules → test.

- [ ] **Step 1: Create application-level files.**

Write the web `AGENTS.md` to point to `docs/ui-architecture.md`, state that pages compose features and shared code stays outside feature folders. Write `ui-architecture.md` to define `pages/`, `features/` and `shared/`. Create the listed empty app, page and shared code files.

- [ ] **Step 2: Create feature-level documentation.**

Write the feature `AGENTS.md` to reference its architecture, verification and API/model/UI folders; limit edits to profile settings. Write `README.md` to identify `ProfilePage.jsx` as the entry point. Write `architecture.md` to describe page → feature → API/model/UI composition. Write `verification.md` to identify component, feature and E2E proof layers.

- [ ] **Step 3: Create API and model contexts.**

The API `AGENTS.md` must direct the agent to `profile-contract.md` and prohibit contract changes without updating documentation. The model `AGENTS.md` must direct the agent to `state-contract.md` and prohibit direct UI-side mutation. The contract documents must respectively describe profile notification request/response data and the feature state boundary. Create the listed empty JavaScript files.

- [ ] **Step 4: Create UI and component contexts.**

The UI `AGENTS.md` must direct the agent to the component contract and accessibility rules. `component-contract.md` must define `checked`, `disabled` and `onChange` responsibilities. `accessibility.md` must require an accessible label, keyboard operation and visible focus. The component `AGENTS.md` must point to these documents and its adjacent test. Create the listed empty JSX files.

- [ ] **Step 5: Inspect the complete tree.**

Run: `find architecture-demo-personal-cabinet -type f | sort`

Expected: all root, docs, application, feature, API, model, UI, component, shared and E2E paths listed above are present.

### Task 3: Verify isolation and screenshot readiness

**Files:**
- Modify: no files.

**Interfaces:**
- Consumes: the completed demo tree from Tasks 1–2.
- Produces: evidence that the demo is non-executable, complete and isolated from the application.

- [ ] **Step 1: Verify all code placeholders are empty.**

Run:

```sh
find architecture-demo-personal-cabinet \( -name '*.js' -o -name '*.jsx' \) -type f -size +0c -print
```

Expected: no output.

- [ ] **Step 2: Verify Markdown instructions and documents are non-empty.**

Run:

```sh
find architecture-demo-personal-cabinet -name '*.md' -type f -empty -print
```

Expected: no output.

- [ ] **Step 3: Verify the application does not import the demonstration.**

Run:

```sh
rg -n "architecture-demo-personal-cabinet" src package.json vite.config.js
```

Expected: exit status 1 with no matches.

- [ ] **Step 4: Produce the screenshot-oriented tree output.**

Run: `find architecture-demo-personal-cabinet -print | sort`

Expected: a stable, deeply nested file tree with a visible sequence of `AGENTS.md`, contracts and empty code placeholders.

## Plan self-review

- Spec coverage: Tasks 1–2 cover every approved folder, code placeholder, documentation layer and nested agent instruction layer. Task 3 verifies isolation and screenshot readiness.
- Placeholder scan: the plan contains no incomplete work markers or deferred implementation.
- Interface consistency: every local `AGENTS.md` references files produced in its own task; all named paths are unique and nested under the demo root.
- Scope check: the plan creates one independent filesystem artifact and does not alter the application.
