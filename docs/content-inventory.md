# Content inventory — Phase 0 / Task 3

The inventory freezes the initial content surface. Every planned artifact is owned by one future task; no JSX is a content source. Source-sensitive artifacts must use the claim ledger in `docs/content-fact-check.md` and the registry in `src/content/sources`.

## Presentation scenes (16)

| requirementId | artifactType | artifactId | plannedFile | sourceRequirement | ownerTask |
|---|---|---|---|---|---|
| scene-hero | scene | hero | src/content/scenes/scenes.js | SPEC 7, 8.1 | Task 7 / Task 26 |
| scene-evolution | scene | evolution | src/content/scenes/scenes.js | SPEC 7, 8.2 | Task 7 / Task 26 |
| scene-codex | scene | codex | src/content/scenes/scenes.js | SPEC 7, 8.3 | Task 7 / Task 27 |
| scene-prompt-to-system | scene | prompt-to-system | src/content/scenes/scenes.js | SPEC 7, 8.4 | Task 7 / Task 27 |
| scene-specification | scene | specification | src/content/scenes/scenes.js | SPEC 7, 8.5 | Task 7 / Task 28 |
| scene-architecture | scene | architecture | src/content/scenes/scenes.js | SPEC 7, 8.6 | Task 7 / Task 28 |
| scene-planning | scene | planning | src/content/scenes/scenes.js | SPEC 7, 8.7 | Task 7 / Task 29 |
| scene-agents-md | scene | agents-md | src/content/scenes/scenes.js | SPEC 7, 8.8 | Task 7 / Task 29 |
| scene-skills | scene | skills | src/content/scenes/scenes.js | SPEC 7, 8.9 | Task 7 / Task 30 |
| scene-mcp | scene | mcp | src/content/scenes/scenes.js | SPEC 7, 8.10 | Task 7 / Task 30 |
| scene-agents | scene | agents | src/content/scenes/scenes.js | SPEC 7, 8.11 | Task 7 / Task 31 |
| scene-orchestration | scene | orchestration | src/content/scenes/scenes.js | SPEC 7, 8.12 | Task 7 / Task 32 |
| scene-implementation | scene | implementation | src/content/scenes/scenes.js | SPEC 7, 8.13 | Task 7 / Task 33 |
| scene-verification | scene | verification | src/content/scenes/scenes.js | SPEC 7, 8.14 | Task 7 / Task 33 |
| scene-security | scene | security | src/content/scenes/scenes.js | SPEC 7, 8.15 | Task 7 / Task 34 |
| scene-human-decision | scene | human-decision | src/content/scenes/scenes.js | SPEC 7, 8.16 | Task 7 / Task 34 |

## Deep dives (17)

| requirementId | artifactType | artifactId | plannedFile | sourceRequirement | ownerTask |
|---|---|---|---|---|---|
| deep-dive-codex | deep_dive | codex | src/content/deep-dives/deepDives.js | SPEC 9.1 | Task 9 / Task 35 |
| deep-dive-specification | deep_dive | specification | src/content/deep-dives/deepDives.js | SPEC 9.2 | Task 9 / Task 35 |
| deep-dive-architecture | deep_dive | architecture | src/content/deep-dives/deepDives.js | SPEC 9.3 | Task 9 / Task 35 |
| deep-dive-planning | deep_dive | planning | src/content/deep-dives/deepDives.js | SPEC 9.4 | Task 9 / Task 35 |
| deep-dive-agents-md | deep_dive | agents-md | src/content/deep-dives/deepDives.js | SPEC 9.5 | Task 9 / Task 35 |
| deep-dive-context-engineering | deep_dive | context-engineering | src/content/deep-dives/deepDives.js | SPEC 9.6 | Task 9 / Task 35 |
| deep-dive-skills | deep_dive | skills | src/content/deep-dives/deepDives.js | SPEC 9.7 | Task 9 / Task 35 |
| deep-dive-plugins | deep_dive | plugins | src/content/deep-dives/deepDives.js | SPEC 9.8 | Task 9 / Task 35 |
| deep-dive-mcp | deep_dive | mcp | src/content/deep-dives/deepDives.js | SPEC 9.9 | Task 9 / Task 35 |
| deep-dive-agents | deep_dive | agents | src/content/deep-dives/deepDives.js | SPEC 9.10 | Task 9 / Task 35 |
| deep-dive-subagents | deep_dive | subagents | src/content/deep-dives/deepDives.js | SPEC 9.11 | Task 9 / Task 35 |
| deep-dive-orchestration | deep_dive | orchestration | src/content/deep-dives/deepDives.js | SPEC 9.12 | Task 9 / Task 35 |
| deep-dive-git-worktrees | deep_dive | git-worktrees | src/content/deep-dives/deepDives.js | SPEC 9.13 | Task 9 / Task 35 |
| deep-dive-testing | deep_dive | testing | src/content/deep-dives/deepDives.js | SPEC 9.14 | Task 9 / Task 35 |
| deep-dive-verification | deep_dive | verification | src/content/deep-dives/deepDives.js | SPEC 9.15 | Task 9 / Task 35 |
| deep-dive-security | deep_dive | security | src/content/deep-dives/deepDives.js | SPEC 9.16 | Task 9 / Task 35 |
| deep-dive-failure-recovery | deep_dive | failure-recovery | src/content/deep-dives/deepDives.js | SPEC 9.17 | Task 9 / Task 35 |

## FAQ inventory

**Planned file:** `src/content/faq/faq.js` · **Owner:** Task 10 / Task 36 · **Contract:** one record per listed question with `id`, `category`, `question`, `answer`, `relatedSceneId`, `relatedDeepDivePath`, and `featured`; answers are 2–5 sentences and no more than 500 characters.

| Category | Required questions |
|---|---|
| Getting started | С чего начать первый проект с Codex? · Какая задача подходит для первого эксперимента? · Нужно ли создавать все документы сразу? · Когда задача слишком большая? · Когда лучше сделать работу вручную? |
| Specifications | Чем spec отличается от prompt? · Может ли Codex написать spec? · Насколько подробной должна быть spec? · Можно ли менять spec? · Как понять, что spec готова? · Как найти противоречия? · Нужна ли spec для маленькой задачи? |
| Architecture | Может ли Codex выбрать архитектуру? · Как избежать overengineering? · Нужна ли Clean Architecture? · Когда feature-based structure оправдана? · Как архитектура помогает нескольким агентам? |
| Planning | Чем plan отличается от spec? · Какой размер задачи хороший? · Что можно выполнять параллельно? · Нужно ли указывать файлы? · Когда план надо пересмотреть? |
| AGENTS.md | Обязателен ли `AGENTS.md`? · Чем он отличается от README? · Чем он отличается от SPEC? · Можно ли иметь несколько файлов? · Что происходит при конфликте? · Что писать бесполезно? · Как часто обновлять? |
| Context | Читает ли agent весь repository? · Что такое context engineering? · Почему большой context может мешать? · Когда начинать новую session? · Как передать прошлые решения? · Где хранить важный контекст? |
| Skills and plugins | Чем skill отличается от prompt? · Чем plugin отличается от MCP? · Можно ли написать свой skill? · Нужно ли подключать много skills? · Что делать при конфликте? · Как проверить сторонний plugin? |
| MCP | Можно ли работать без MCP? · Что MCP даёт сверх API? · Является ли MCP agent? · Почему read-only безопаснее? · Где хранить credentials? · Можно ли доверять стороннему server? · Какие действия требуют approval? |
| Agents and subagents | Чем agent отличается от chat? · Когда нужен subagent? · Нужен ли subagent для каждой задачи? · Как передать контекст? · Как запустить несколько задач? · Как избежать конфликтов? · Кто объединяет результаты? · Всегда ли больше agents быстрее? |
| Orchestration | Нужен ли отдельный orchestrator? · Какие задачи параллельны? · Как обрабатывать failure? · Нужно ли перезапускать всю цепочку? · Где ставить human checkpoints? · Как контролировать стоимость? |
| Testing and verification | Должен ли agent писать tests? · Можно ли доверять его tests? · Обязателен ли TDD? · Когда нужен Playwright? · Почему build недостаточно? · Чем test отличается от verification? · Что проверять вручную? |
| Security | Можно ли разрешить shell? · Может ли agent читать `.env`? · Что такое prompt injection? · Можно ли дать production access? · Как проверить MCP permissions? · Можно ли доверять documentation? · Какие действия всегда подтверждать? |
| Human role | Заменят ли agents разработчиков? · Нужно ли хуже знать code? · Кто отвечает за ошибку? · Нужно ли читать весь diff? · Какие навыки становятся важнее? · Когда autonomy приносит вред? |

## Glossary, speaker notes, and simulation inventory

| requirementId | artifactType | artifactId | plannedFile | sourceRequirement | ownerTask |
|---|---|---|---|---|---|
| glossary-42-terms | glossary | agent-through-guardrail | src/content/glossary/glossary.js | SPEC 11 (42 named terms) | Task 11 / Task 37 |
| speaker-notes-16 | speaker_notes | hero-through-human-decision | src/content/speaker-notes/speakerNotes.js | SPEC 12 (one object per scene) | Task 8 / Task 21 |
| scenario-normal-flow | simulation_scenario | normal-flow | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-blocked-task | simulation_scenario | blocked-task | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-file-conflict | simulation_scenario | file-conflict | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-missing-specification | simulation_scenario | missing-specification | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-unsafe-permission | simulation_scenario | unsafe-permission | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-failed-verification | simulation_scenario | failed-verification | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-recovery-retry | simulation_scenario | recovery-retry | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |
| scenario-human-approval | simulation_scenario | human-approval-required | src/content/simulation/scenarios.js | SPEC 15.3 | Task 23 |

### Glossary terms frozen for Task 11

Agent; Coding agent; Subagent; Orchestrator; Orchestration; Model; Prompt; System instructions; Specification; SPEC.md; AGENTS.md; Implementation plan; Skill; Plugin; MCP; MCP host; MCP client; MCP server; Tool; Resource; Context; Context window; Context engineering; Approval; Permission; Sandbox; Verification; Acceptance criteria; Human-in-the-loop; Task graph; Dependency; Worktree; Diff; Prompt injection; Supply-chain attack; Deterministic simulation; Evidence; Definition of Done; Retry; Rollback; Guardrail.

### Content quality freeze

- Every scene has exactly one thesis, one audience outcome, up to four key points, one visual metaphor, one practical example, one misconception, a transition phrase, two likely questions, and an accessibility description (SPEC 7.1).
- Every strong factual claim needs an explanation, example, limitation, and source handling through the fact-check ledger; high-volatility wording remains qualified until Task 48.
- Speaker notes stay in `src/content/speaker-notes`, never JSX.
- The app excludes real Codex/MCP/runtime API calls, backend/authentication, user-code execution, remote presentation platform behavior, and autonomous production access (SPEC 3.3 and AGENTS.md).

### Task 7 delivery evidence

Task 23 adds eight local-only, labelled simulation datasets in `src/content/simulation/scenarios.js`; they are data, not runtime calls.

`src/content/scenes/scenes.js` now owns the 16 scene records, and `src/content/examples/examples.js` owns the practical examples they reference. Speaker-note, FAQ, and deep-dive foreign-key targets remain in their dedicated future registries; their records are not duplicated in scene content.

`src/content/speaker-notes/speakerNotes.js` now owns one speaker-note object per scene, including normal and compact timings; no speaker-only content is placed in JSX.

`src/content/deep-dives/deepDives.js` now owns the 17 deep-dive route records with the required nine-section contract.

`src/content/faq/faq.js` now owns all 82 required FAQ questions with concise answers and stable scene/deep-dive links.

`src/content/glossary/glossary.js` now owns all 42 required terms, their definitions, scene relations, and non-self term relations.
