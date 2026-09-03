# SPEC.md — Agentic Codex Story

**Статус:** Approved product and system specification  
**Версия:** 1.0  
**Дата:** 2026-07-13  
**Рабочее название:** Agentic Codex Story  
**Тип продукта:** локальное интерактивное React-приложение, совмещающее лендинг, образовательный сайт и презентацию  
**Основной язык:** русский  
**Технические термины, имена файлов, команды и код:** английский  
**Целевая продолжительность выступления:** 30–40 минут  
**Основной инструмент рассказа:** OpenAI Codex  
**Базовый стек:** React + Vite + JavaScript + Tailwind CSS + Framer Motion  

---

## 0. Назначение документа

Этот документ является главным источником истины для проектирования и реализации приложения **Agentic Codex Story**.

Документ определяет:

- продуктовую цель;
- целевую аудиторию;
- образовательный результат;
- структуру повествования;
- режимы приложения;
- маршруты и переходы;
- визуальную концепцию;
- техническую архитектуру;
- модель контента;
- симуляции;
- требования к Speaker mode;
- deep-dive-разделы;
- FAQ;
- glossary;
- источники;
- тестирование;
- accessibility;
- performance;
- security;
- агентный процесс реализации;
- критерии приёмки.

`SPEC.md` отвечает на вопрос:

> **Что именно должно быть построено и каким должен быть результат?**

Он не заменяет:

- `AGENTS.md` — правила работы внутри репозитория;
- `IMPLEMENTATION_PLAN.md` — последовательность реализации;
- `README.md` — инструкции для человека;
- `START_HERE.md` — короткую точку входа для Codex;
- фактические результаты тестов и финальной проверки.

При конфликте между ранними обсуждениями и этим документом приоритет имеет этот документ.

---

# 1. Product vision

## 1.1. Краткое описание

Нужно создать локальное интерактивное веб-приложение, которое объясняет начинающим разработчикам современную агентскую разработку на примере OpenAI Codex.

Приложение одновременно является:

1. образовательным лендингом;
2. интерактивной презентацией;
3. демонстрацией агентного workflow;
4. мета-кейсом собственного создания;
5. справочником по ключевым терминам;
6. визуальной симуляцией orchestration;
7. рабочим инструментом докладчика.

Проект не должен выглядеть как документация, обычный SaaS-лендинг или набор слайдов. Он должен восприниматься как **интерактивная лаборатория агентской разработки**.

## 1.2. Главная идея

Сквозной тезис проекта:

> **Ты больше не просто просишь AI написать код. Ты проектируешь систему, в которой агент может понять задачу, использовать инструменты, изменить проект, проверить результат и вернуть доказательства выполнения.**

## 1.3. Финальный эффект

После просмотра у зрителя должно остаться ощущение:

> **«Я понял принципы агентской разработки и могу попробовать применять их сегодня».**

Зритель не обязан получить starter kit или скачать шаблоны. Он должен:

- понять общую систему;
- различать ключевые понятия;
- увидеть практический процесс;
- понимать ограничения;
- знать, с чего начать;
- не воспринимать Codex как магическую кнопку.

---

# 2. Audience

## 2.1. Основная аудитория

Начинающие разработчики, которые:

- знают базовый Git;
- понимают, что такое repository, branch, commit и pull request;
- знакомы с React или другим frontend/backend-стеком;
- умеют запускать проект из терминала;
- слышали о Codex и coding agents;
- почти не работали с агентной разработкой;
- не знают, как связаны spec, `AGENTS.md`, skills, MCP, subagents и orchestration.

## 2.2. Неосновная аудитория

Смешанная техническая аудитория может включать:

- junior-разработчиков;
- middle-разработчиков без агентного опыта;
- технических менеджеров;
- QA-инженеров;
- дизайнеров цифровых продуктов;
- людей, которые используют AI chat, но не coding agents.

## 2.3. Предварительные знания

Не требуется подробно объяснять:

- что такое файл;
- что такое функция;
- что такое npm;
- что такое Git;
- что такое React component.

Нужно кратко объяснять:

- agent;
- tool use;
- context;
- specification;
- implementation plan;
- `AGENTS.md`;
- skill;
- plugin;
- MCP;
- subagent;
- orchestration;
- verification;
- approvals;
- worktree;
- prompt injection.

---

# 3. Goals and non-goals

## 3.1. Product goals

Приложение должно:

1. Объяснить разницу между AI chat и coding agent.
2. Показать эволюцию от autocomplete к orchestration.
3. Объяснить, что такое Codex и как он действует внутри среды разработки.
4. Показать правильный путь от идеи до проверенного продукта.
5. Разграничить prompt, specification, plan и repository instructions.
6. Научить базовой структуре хорошего `SPEC.md`.
7. Объяснить назначение `AGENTS.md`.
8. Объяснить skills и plugins.
9. Объяснить MCP и модель разрешений.
10. Объяснить agents, subagents и orchestration.
11. Показать context engineering.
12. Показать выбор архитектуры проекта.
13. Показать выбор тестов по рискам.
14. Показать verification и human review.
15. Показать security risks.
16. Показать, когда agents не нужны.
17. Дать быстрые ответы на частые вопросы.
18. Предоставить полноценный Presentation mode.
19. Предоставить отдельный Speaker mode.
20. Работать локально без внешних API и ключей.

## 3.2. Educational goals

После основной истории зритель должен уметь своими словами объяснить:

- чем агент отличается от чата;
- зачем нужен `SPEC.md`;
- чем `SPEC.md` отличается от `AGENTS.md`;
- чем plan отличается от specification;
- зачем нужны skills;
- что предоставляет MCP;
- когда нужен subagent;
- что такое orchestration;
- почему больше агентов не всегда лучше;
- как выбирать тесты;
- почему зелёный build не доказывает готовность;
- где должен оставаться human approval;
- какие разрешения опасны;
- с чего начать первый проект.

## 3.3. Non-goals

Первая версия не должна:

- обучать созданию собственных LLM;
- объяснять математику transformer architecture;
- сравнивать все coding agents на рынке;
- выполнять реальные запросы в Codex;
- выполнять реальные MCP calls;
- исполнять введённый пользователем код;
- подключаться к production-системам;
- содержать backend;
- содержать authentication;
- хранить пользовательские данные на сервере;
- быть CMS;
- быть платформой удалённых презентаций;
- быть полноценным multi-agent orchestrator;
- обещать полную автономность AI;
- утверждать, что agents заменяют разработчиков.

---

# 4. Core narrative

## 4.1. Формат повествования

Выбран подход:

> **Интерактивное повествование с системой сцен.**

Основная история показывает, как создаётся само приложение Agentic Codex Story.

Каждый этап создания продукта становится поводом объяснить отдельное понятие:

```text
Idea
→ Research
→ SPEC.md
→ Architecture
→ Implementation plan
→ AGENTS.md
→ Skills and plugins
→ MCP
→ Agents and subagents
→ Orchestration
→ Implementation
→ Testing
→ Verification
→ Security review
→ Human decision
```

## 4.2. Уровни содержания

Ключевые темы должны иметь до четырёх уровней:

1. **Idea layer** — простое объяснение.
2. **Mechanics layer** — как понятие работает.
3. **Practice layer** — как применить.
4. **Verification layer** — как проверить правильность.

Главная сцена не обязана показывать все четыре уровня целиком. Она должна дать опорную модель и предложить deep dive.

## 4.3. Tone

Тон:

- футуристичный;
- провокационный;
- уверенный;
- технически точный;
- честный;
- без пустого хайпа.

Допустимо:

> Код перестаёт быть единственным продуктом работы разработчика. Продуктом становится система принятия решений.

Недопустимо:

> Agents полностью заменят разработчиков и сами создадут любой продукт.

Каждый сильный тезис должен сопровождаться:

- понятным объяснением;
- практическим примером;
- ограничением или условием.

---

# 5. Application modes

## 5.1. Explore mode

Режим по умолчанию.

Пользователь может:

- свободно прокручивать историю;
- использовать верхнюю навигацию;
- переходить по главам;
- открывать deep dives;
- запускать симуляции вручную;
- читать FAQ;
- использовать glossary;
- просматривать sources;
- запускать Presentation mode.

## 5.2. Presentation mode

Полноэкранный режим выступления.

Требования:

- одна сцена занимает viewport;
- есть keyboard navigation;
- есть screen controls;
- есть progress;
- есть scene map;
- можно открыть deep dive;
- можно открыть Speaker mode;
- можно пропустить анимацию;
- можно изменить скорость симуляции;
- можно выйти в Explore mode;
- состояние восстанавливается после случайного refresh;
- используется тот же контент и renderer, что в Explore mode.

Клавиши:

- `Space` — следующая сцена;
- `ArrowRight` — следующая сцена;
- `ArrowLeft` — предыдущая сцена;
- `Home` — первая сцена;
- `End` — последняя сцена;
- `M` — scene map;
- `D` — deep dive текущей сцены;
- `S` — Speaker mode;
- `F` — запросить fullscreen;
- `Esc` — закрыть overlay или выйти из режима согласно текущему состоянию.

## 5.3. Speaker mode

Открывается отдельным окном или вкладкой.

Speaker mode показывает:

- current scene;
- next scene;
- elapsed time;
- target time;
- speaker notes;
- demo steps;
- transition phrase;
- likely questions;
- simulation controls;
- presentation controls;
- connection state.

Speaker mode может управлять:

- next/previous scene;
- jump to scene;
- timer pause/resume/reset;
- simulation play/pause/reset;
- open deep dive;
- open scene map.

Speaker mode не должен быть обязательным для работы Presentation mode.

## 5.4. Deep-dive mode

Deep dive предоставляет техническое раскрытие темы.

При открытии сохраняются:

- origin mode;
- origin scene;
- scroll position;
- active simulation step;
- active content tab.

При закрытии пользователь возвращается в исходный контекст.

## 5.5. FAQ mode

Отдельная страница быстрых ответов.

Ответы:

- 2–5 предложений;
- один чёткий вывод;
- не более 500 символов;
- ссылка на связанную сцену;
- при необходимости ссылка на deep dive.

## 5.6. Glossary mode

Отдельный словарь терминов с поиском и связанными сценами.

## 5.7. Sources mode

Отдельный список источников, сгруппированных по темам, организациям и изменчивости.

---

# 6. Routes

```text
/
├── /story
├── /present
├── /present/:sceneId
├── /speaker
├── /faq
├── /glossary
├── /sources
└── /deep-dive
    ├── /codex
    ├── /specification
    ├── /architecture
    ├── /planning
    ├── /agents-md
    ├── /context-engineering
    ├── /skills
    ├── /plugins
    ├── /mcp
    ├── /agents
    ├── /subagents
    ├── /orchestration
    ├── /git-worktrees
    ├── /testing
    ├── /verification
    ├── /security
    └── /failure-recovery
```

`/` открывает Explore mode.

Unknown route показывает тематическую 404-страницу с:

- кратким объяснением;
- ссылкой на главную;
- сценами;
- FAQ;
- glossary.

---

# 7. Main presentation scenes

Основной маршрут содержит 16 сцен.

| № | Scene ID | Название | Целевое время |
|---|---|---|---:|
| 1 | `hero` | Разработка изменилась | 2 мин |
| 2 | `evolution` | Эволюция AI-разработки | 2 мин |
| 3 | `codex` | Что такое Codex | 2 мин |
| 4 | `prompt-to-system` | Prompt недостаточно | 2 мин |
| 5 | `specification` | SPEC.md | 3 мин |
| 6 | `architecture` | Архитектура проекта | 2 мин |
| 7 | `planning` | Implementation plan | 2 мин |
| 8 | `agents-md` | AGENTS.md | 3 мин |
| 9 | `skills` | Skills и plugins | 2 мин |
| 10 | `mcp` | MCP | 3 мин |
| 11 | `agents` | Agents и subagents | 3 мин |
| 12 | `orchestration` | Orchestration | 4 мин |
| 13 | `implementation` | Implementation loop | 2 мин |
| 14 | `verification` | Testing и verification | 3 мин |
| 15 | `security` | Security и failures | 3 мин |
| 16 | `human-decision` | Human responsibility | 2 мин |

Допускается сокращённый сценарий 25–30 минут через compact speaker notes.

---

## 7.1. Scene contract

Каждая сцена обязана иметь:

```js
{
  id: 'specification',
  order: 5,
  chapter: 'project-system',
  title: 'SPEC.md',
  shortTitle: 'Specification',
  eyebrow: 'From idea to contract',
  thesis: 'Prompt starts the work. Spec defines success.',
  audienceOutcome: '...',
  durationSeconds: 180,
  compactDurationSeconds: 90,
  layout: 'split',
  visualType: 'spec-transformation',
  keyPoints: [],
  misconception: '...',
  exampleId: '...',
  deepDivePath: '/deep-dive/specification',
  faqIds: [],
  sourceIds: [],
  speakerNotesId: 'specification-notes',
  presentation: {
    transition: 'expand',
    autoStartSimulation: true,
    skippable: true
  },
  accessibility: {
    diagramDescription: '...'
  }
}
```

Правила:

- один главный thesis;
- один audience outcome;
- максимум четыре key points;
- одна visual metaphor;
- один practical example;
- одна common mistake;
- одна transition phrase;
- два likely questions;
- accessibility description;
- source references для изменчивых утверждений.

---

# 8. Scene content requirements

## 8.1. Hero — Разработка изменилась

### Thesis

> Ты больше не просто пишешь код. Ты проектируешь систему, которая помогает создать, проверить и объяснить его.

### Visual

Пустое пространство постепенно превращается в граф:

```text
Developer
→ Specification
→ Orchestrator
   ├── Researcher
   ├── Architect
   ├── Builder
   ├── Tester
   └── Reviewer
→ Verified result
```

### Required content

- AI chat и agent — разные способы работы;
- разработчик остаётся ответственным;
- текущий сайт будет сквозным примером;
- кнопки «Начать выступление» и «Исследовать самостоятельно».

### Common misconception

«Agentic development — это просто длинный prompt».

---

## 8.2. Evolution — Эволюция AI-разработки

### Timeline

```text
Autocomplete
→ Chat assistant
→ Coding agent
→ Parallel agents
→ Orchestration
```

Для каждого уровня показать:

- контекст;
- доступ к файлам;
- tools;
- автономность;
- роль человека;
- parallel work;
- verification.

### Thesis

> Агент отличается от чата не только качеством ответа, а способностью действовать в среде, наблюдать результат и продолжать работу.

---

## 8.3. Codex — Что такое Codex

Объяснить:

- model;
- agent;
- Codex product;
- Codex CLI;
- IDE integration;
- cloud work;
- repository context;
- tools;
- permissions;
- approvals;
- code review;
- tests;
- terminal;
- worktrees;
- skills;
- plugins;
- MCP;
- subagents.

Все конкретные названия интерфейсов и команд должны быть проверены перед заполнением финального контента.

### Visual loop

```text
Understand
→ Explore repository
→ Plan
→ Edit files
→ Run commands
→ Observe
→ Correct
→ Verify
→ Report
```

### Required distinction

```text
Model ≠ Agent
Agent ≠ Tool
Codex ≠ только чат
```

---

## 8.4. Prompt to system

Показать плохой prompt:

```text
Сделай современный красивый сайт про Codex.
```

Показать последствия:

- случайная структура;
- неполная аудитория;
- нет speaker mode;
- нет acceptance criteria;
- нет security;
- нет verification;
- агент не знает, когда остановиться.

Затем показать систему:

```text
Idea
→ Research
→ Specification
→ Architecture
→ Plan
→ Repository instructions
→ Execution
→ Verification
```

### Core statement

```text
Prompt запускает работу.
Specification определяет результат.
Plan определяет порядок.
AGENTS.md определяет правила репозитория.
Verification доказывает готовность.
```

---

## 8.5. Specification

Объяснить разделы хорошей spec:

```text
Problem
Goals
Non-goals
Audience
User scenarios
Information architecture
Functional requirements
Visual requirements
Technical architecture
Testing requirements
Security requirements
Acceptance criteria
```

Показать:

- idea vs prompt vs spec;
- observable requirements;
- vague requirements;
- acceptance criteria;
- edge cases;
- non-goals;
- constraints;
- self-review.

### Interactive builder

Короткая идея постепенно становится структурой документа.

### Checklist

- отсутствуют `TBD` и `TODO`;
- нет противоречий;
- определены boundaries;
- есть user-visible behavior;
- есть failure states;
- есть test requirements;
- есть security requirements;
- есть Definition of Done.

---

## 8.6. Architecture

Объяснить, что архитектура выбирается по:

- размеру проекта;
- количеству независимых функций;
- сложности state;
- количеству маршрутов;
- повторному использованию;
- параллельной работе;
- тестируемости;
- ожидаемому росту.

Подходы:

- simple component structure;
- feature-based structure;
- layered/domain-oriented structure.

Для этого проекта использовать:

```text
src/
├── app/
├── components/
├── features/
├── content/
├── state/
├── hooks/
├── lib/
├── styles/
└── test/
```

### Thesis

> Хорошая архитектура уменьшает число решений, которые агент вынужден угадывать.

### Anti-overengineering

Не добавлять сложность без наблюдаемой необходимости.

---

## 8.7. Planning

Разграничить:

```text
SPEC.md = что строим
IMPLEMENTATION_PLAN.md = в каком порядке строим
```

Хороший этап плана содержит:

- objective;
- dependencies;
- scope;
- files or areas;
- user-visible result;
- verification;
- completion criteria.

Показать dependency graph.

### Common mistake

Делить работу по файлам вместо законченного поведения.

---

## 8.8. AGENTS.md

Объяснить, что файл содержит repository-level instructions.

Обязательные категории:

- project overview;
- stack;
- commands;
- repository structure;
- architecture rules;
- UI rules;
- content rules;
- testing rules;
- verification checklist;
- forbidden changes.

Плохая инструкция:

```md
Write clean and maintainable code.
```

Хорошая инструкция:

```md
Keep scene content in src/content/scenes.
Do not hardcode speaker notes inside React components.
Run npm run verify before reporting completion.
```

Объяснить:

- root instructions;
- nested instructions;
- scope;
- conflict resolution;
- отличие от README;
- отличие от SPEC;
- необходимость обновления.

---

## 8.9. Skills and plugins

Объяснить:

- skill;
- plugin;
- trigger;
- workflow;
- required checks;
- expected output;
- process skills;
- domain skills;
- conflicts.

Пример pipeline:

```text
brainstorming
→ specification
→ writing-plans
→ implementation
→ code review
→ verification
```

### Thesis

> Хороший skill не просто предлагает действие. Он задаёт порядок, который снижает вероятность преждевременной ошибки.

Не утверждать, что конкретный skill встроен в каждую установку Codex, если это не подтверждено источником.

---

## 8.10. MCP

Объяснить:

- MCP host;
- MCP client;
- MCP server;
- tools;
- resources;
- prompts;
- permissions;
- authentication;
- approval;
- read/write.

Показать:

```text
Agent
├── GitHub MCP
├── Browser MCP
├── Documentation MCP
├── Database MCP
└── Issue Tracker MCP
```

Required distinction:

```text
MCP ≠ agent
MCP ≠ model
MCP ≠ автоматическая безопасность
MCP = standardized interface for external capabilities
```

Security overlay:

- provider trust;
- credentials;
- data exposure;
- write access;
- approval;
- logs;
- least privilege;
- read-only by default where possible.

---

## 8.11. Agents and subagents

Объяснить:

- main agent;
- specialized agent;
- subagent;
- orchestrator;
- tool.

Хорошая задача субагенту:

```text
Role
Goal
Scope
Inputs
Allowed tools
Forbidden actions
Expected output
Verification
```

Показать, что subagent полезен, когда:

- задача независима;
- ответственность узкая;
- input ограничен;
- result проверяем;
- integration определена заранее.

Не использовать, когда:

- задача мала;
- нужен весь общий контекст;
- агенты меняют одни файлы;
- output нельзя проверить отдельно.

### Thesis

> Subagent нужен не потому, что он умнее. Он нужен для изоляции контекста и ответственности.

---

## 8.12. Orchestration

Главная интерактивная сцена.

Роли:

- Researcher;
- Architect;
- Content Designer;
- UI Builder;
- Tester;
- Security Reviewer;
- Integrator.

Показать:

- dependency graph;
- parallel tasks;
- blocked tasks;
- retry;
- failure;
- approval;
- conflict;
- integration;
- context packages;
- output contracts;
- cost;
- human checkpoints.

Пример статусов:

```text
idle
queued
running
blocked
waiting_approval
failed
completed
cancelled
```

### Thesis

> Orchestration — это управление зависимостями, контекстом, разрешениями и качеством, а не просто запуск нескольких агентов.

---

## 8.13. Implementation loop

Показать:

```text
Read
→ Understand
→ Change
→ Run
→ Observe
→ Correct
→ Report
```

UI panels:

- task;
- file tree;
- code panel;
- terminal;
- diff;
- browser preview;
- tests;
- summary.

Показать реальные типы действий Codex, подтверждённые официальной документацией на момент реализации.

Команды и slash commands не должны быть придуманы или извлечены из памяти без проверки.

---

## 8.14. Testing and verification

Показать risk-based strategy:

```text
Content validation
Unit tests
Component tests
Integration tests
E2E
Accessibility
Visual verification
Security review
Human walkthrough
```

Decision guidance:

- pure logic → unit;
- UI interaction → component/integration;
- critical user flow → E2E;
- layout and overflow → browser/visual verification;
- keyboard/focus → accessibility;
- permissions/dependencies → security review.

### Thesis

> Test проверяет конкретное предположение. Verification доказывает, что пользовательский сценарий работает целиком.

---

## 8.15. Security and failures

Категории:

- prompt injection;
- untrusted instructions;
- secrets;
- shell permissions;
- production access;
- unsafe MCP;
- dependency supply chain;
- conflict;
- context pollution;
- false completion;
- infinite retry;
- expensive orchestration;
- stale instructions.

Permission matrix:

```text
Read source files       allowed
Edit src/               allowed
Run tests               allowed
Read secrets            denied
Deploy production       approval required
Delete data             denied
```

### Thesis

> Безопасность определяется не намерениями агента, а доступными ему возможностями, границами и проверками.

---

## 8.16. Human decision

Показать полный pipeline:

```text
Idea
→ Research
→ Specification
→ Architecture
→ Plan
→ Instructions
→ Skills
→ Tools
→ Agents
→ Implementation
→ Testing
→ Verification
→ Human decision
```

Заключение:

- developer remains responsible;
- generated code must be understood;
- important decisions belong in repository artifacts;
- tests do not remove review;
- simple tasks can be faster manually;
- better problem definition becomes more valuable.

Финальная фраза:

> Ты не перестаёшь быть разработчиком. Ты начинаешь проектировать не только код, но и процесс его создания.

---

# 9. Deep-dive pages

Все deep dives используют общий layout:

```text
Overview
When to use
How it works
How to implement
Example
Common mistakes
Checklist
Quick FAQ
Sources
```

## 9.1. `/deep-dive/codex`

Содержит:

- what Codex is;
- available surfaces;
- repository workflow;
- task loop;
- approvals;
- permissions;
- commands and slash commands;
- code review;
- terminal;
- worktrees;
- skills;
- plugins;
- MCP;
- subagents;
- first-task guidance;
- common mistakes;
- official sources.

Все команды перепроверяются непосредственно перед реализацией.

## 9.2. `/deep-dive/specification`

Содержит:

- spec builder;
- section template;
- good/bad requirements;
- functional/non-functional requirements;
- constraints;
- edge cases;
- acceptance criteria;
- contradiction scan;
- placeholder scan;
- scope check;
- ambiguity check;
- example based on this project.

## 9.3. `/deep-dive/architecture`

Содержит:

- architecture decision tree;
- YAGNI;
- feature boundaries;
- shared UI;
- state boundaries;
- content boundaries;
- agent-friendly files;
- architecture for parallel work;
- refactor rules;
- this-project structure.

## 9.4. `/deep-dive/planning`

Содержит:

- decomposition;
- phases;
- milestones;
- dependencies;
- parallelization;
- task size;
- verification per task;
- evidence;
- implementation plan example.

## 9.5. `/deep-dive/agents-md`

Содержит:

- purpose;
- discovery/scope;
- root and nested instructions;
- recommended sections;
- explicit commands;
- forbidden changes;
- maintenance;
- examples;
- current-project `AGENTS.md`.

## 9.6. `/deep-dive/context-engineering`

Содержит:

- context sources;
- repository instructions;
- specification;
- relevant files;
- summaries;
- tool results;
- context pollution;
- stale context;
- new vs continued session;
- progress docs;
- decision records;
- context budgets.

## 9.7. `/deep-dive/skills`

Содержит:

- skill purpose;
- metadata;
- trigger;
- workflow;
- checklists;
- tool usage;
- expected output;
- process vs domain skill;
- conflicts;
- skill selection;
- safe custom skill creation.

## 9.8. `/deep-dive/plugins`

Содержит:

- plugin vs skill;
- plugin packaging;
- installation;
- trust;
- permissions;
- versioning;
- updates;
- minimum necessary set;
- review checklist.

## 9.9. `/deep-dive/mcp`

Содержит:

- architecture;
- host/client/server;
- tools/resources/prompts;
- transport at a conceptual level;
- auth;
- credentials;
- trust;
- read/write;
- approvals;
- audit;
- prompt injection;
- least privilege;
- simulated configuration.

## 9.10. `/deep-dive/agents`

Содержит:

- agent anatomy;
- goals;
- instructions;
- context;
- tools;
- state;
- actions;
- observation;
- termination criteria;
- monitoring;
- task prompt design.

## 9.11. `/deep-dive/subagents`

Содержит:

- when to use;
- role definition;
- scope;
- context package;
- allowed tools;
- output contract;
- parallel execution;
- result integration;
- failures;
- practical examples.

## 9.12. `/deep-dive/orchestration`

Содержит:

- task graph;
- dependencies;
- parent-child flow;
- parallel work;
- retries;
- failures;
- shared files;
- integration;
- worktrees;
- cost;
- human checkpoints;
- complete simulated scenario.

## 9.13. `/deep-dive/git-worktrees`

Содержит:

- branch vs worktree;
- isolation;
- parallel agents;
- shared files;
- conflict prevention;
- integration;
- tests;
- cleanup;
- when not to use.

## 9.14. `/deep-dive/testing`

Содержит:

- risk-based testing;
- content validation;
- unit;
- component;
- integration;
- E2E;
- TDD;
- coverage;
- accessibility;
- browser verification;
- test independence;
- this-project testing strategy.

## 9.15. `/deep-dive/verification`

Содержит:

- tests vs verification;
- evidence;
- command output;
- browser walkthrough;
- acceptance criteria;
- content review;
- visual review;
- security review;
- human sign-off.

## 9.16. `/deep-dive/security`

Содержит:

- permissions;
- sandboxing;
- secrets;
- shell;
- external instructions;
- prompt injection;
- MCP security;
- dependency audit;
- production access;
- logs;
- incident response;
- checklist.

## 9.17. `/deep-dive/failure-recovery`

Содержит:

- wrong plan;
- incomplete implementation;
- failing tests;
- context loss;
- stuck agent;
- tool failure;
- retry;
- rollback;
- revert;
- human escalation;
- restart criteria.

---

# 10. FAQ

## 10.1. Format

Каждый FAQ:

```js
{
  id: 'spec-vs-prompt',
  category: 'specification',
  question: 'Чем spec отличается от prompt?',
  answer: '...',
  relatedSceneId: 'specification',
  relatedDeepDivePath: '/deep-dive/specification',
  featured: true
}
```

Ограничения:

- 2–5 предложений;
- не более 500 символов;
- один вывод;
- без длинного кода;
- есть related scene;
- при необходимости related deep dive.

## 10.2. Categories

- Getting started;
- Codex;
- Specifications;
- Architecture;
- Planning;
- `AGENTS.md`;
- Context;
- Skills;
- Plugins;
- MCP;
- Agents;
- Subagents;
- Orchestration;
- Git and worktrees;
- Testing;
- Verification;
- Security;
- Human role.

## 10.3. Required questions

Минимально включить:

### Getting started

- С чего начать первый проект с Codex?
- Какая задача подходит для первого эксперимента?
- Нужно ли создавать все документы сразу?
- Когда задача слишком большая?
- Когда лучше сделать работу вручную?

### Specifications

- Чем spec отличается от prompt?
- Может ли Codex написать spec?
- Насколько подробной должна быть spec?
- Можно ли менять spec?
- Как понять, что spec готова?
- Как найти противоречия?
- Нужна ли spec для маленькой задачи?

### Architecture

- Может ли Codex выбрать архитектуру?
- Как избежать overengineering?
- Нужна ли Clean Architecture?
- Когда feature-based structure оправдана?
- Как архитектура помогает нескольким агентам?

### Planning

- Чем plan отличается от spec?
- Какой размер задачи хороший?
- Что можно выполнять параллельно?
- Нужно ли указывать файлы?
- Когда план надо пересмотреть?

### AGENTS.md

- Обязателен ли `AGENTS.md`?
- Чем он отличается от README?
- Чем он отличается от SPEC?
- Можно ли иметь несколько файлов?
- Что происходит при конфликте?
- Что писать бесполезно?
- Как часто обновлять?

### Context

- Читает ли agent весь repository?
- Что такое context engineering?
- Почему большой context может мешать?
- Когда начинать новую session?
- Как передать прошлые решения?
- Где хранить важный контекст?

### Skills and plugins

- Чем skill отличается от prompt?
- Чем plugin отличается от MCP?
- Можно ли написать свой skill?
- Нужно ли подключать много skills?
- Что делать при конфликте?
- Как проверить сторонний plugin?

### MCP

- Можно ли работать без MCP?
- Что MCP даёт сверх API?
- Является ли MCP agent?
- Почему read-only безопаснее?
- Где хранить credentials?
- Можно ли доверять стороннему server?
- Какие действия требуют approval?

### Agents and subagents

- Чем agent отличается от chat?
- Когда нужен subagent?
- Нужен ли subagent для каждой задачи?
- Как передать контекст?
- Как запустить несколько задач?
- Как избежать конфликтов?
- Кто объединяет результаты?
- Всегда ли больше agents быстрее?

### Orchestration

- Нужен ли отдельный orchestrator?
- Какие задачи параллельны?
- Как обрабатывать failure?
- Нужно ли перезапускать всю цепочку?
- Где ставить human checkpoints?
- Как контролировать стоимость?

### Testing and verification

- Должен ли agent писать tests?
- Можно ли доверять его tests?
- Обязателен ли TDD?
- Когда нужен Playwright?
- Почему build недостаточно?
- Чем test отличается от verification?
- Что проверять вручную?

### Security

- Можно ли разрешить shell?
- Может ли agent читать `.env`?
- Что такое prompt injection?
- Можно ли дать production access?
- Как проверить MCP permissions?
- Можно ли доверять documentation?
- Какие действия всегда подтверждать?

### Human role

- Заменят ли agents разработчиков?
- Нужно ли хуже знать code?
- Кто отвечает за ошибку?
- Нужно ли читать весь diff?
- Какие навыки становятся важнее?
- Когда autonomy приносит вред?

---

# 11. Glossary

Минимальный набор:

```text
Agent
Coding agent
Subagent
Orchestrator
Orchestration
Model
Prompt
System instructions
Specification
SPEC.md
AGENTS.md
Implementation plan
Skill
Plugin
MCP
MCP host
MCP client
MCP server
Tool
Resource
Context
Context window
Context engineering
Approval
Permission
Sandbox
Verification
Acceptance criteria
Human-in-the-loop
Task graph
Dependency
Worktree
Diff
Prompt injection
Supply-chain attack
Deterministic simulation
Evidence
Definition of Done
Retry
Rollback
Guardrail
```

Каждый термин:

- короткое определение;
- расширенное объяснение;
- related scene;
- related terms.

Определения не должны образовывать круговые ссылки.

---

# 12. Speaker notes

Каждая сцена получает отдельный content object:

```js
{
  sceneId: 'specification',
  opening: '...',
  talkingPoints: [],
  demoSteps: [],
  simpleExample: '...',
  technicalNote: '...',
  commonMistake: '...',
  transition: '...',
  likelyQuestions: [],
  durationSeconds: 180,
  compactDurationSeconds: 90
}
```

Обязательно:

- opening;
- 3–5 talking points;
- demo steps;
- simple example;
- technical note;
- common mistake;
- transition;
- two likely questions;
- normal timing;
- compact timing.

Speaker notes не хранятся внутри JSX.

---

# 13. Visual design

## 13.1. Visual identity

Приложение выглядит как:

- futuristic digital exhibition;
- developer environment;
- educational visualization.

Не копировать интерфейс Codex, VS Code или Terminal один в один.

Использовать узнаваемые motifs:

- file tree;
- terminal;
- diff;
- code editor;
- task graph;
- agent status;
- event log;
- approval dialog;
- browser preview.

## 13.2. Theme

Основная тема — dark.

Semantic color roles:

```text
Blue   — active reasoning/process
Purple — orchestration/coordination
Green  — completed/verified
Amber  — waiting/approval
Red    — failure/security risk
White  — human decision
```

Цвет не должен быть единственным индикатором статуса.

## 13.3. Typography

Две группы:

- readable sans-serif с хорошей кириллицей;
- monospace для code, commands, files и logs.

Presentation typography:

- display: 64–96 px;
- section title: 40–56 px;
- card title: 22–28 px;
- body: 16–20 px;
- code: 14–16 px;
- metadata: 12–14 px.

Реальные значения адаптивны и должны проверяться на laptop viewport.

## 13.4. Scene layouts

Поддерживаемые:

- `center-stage`;
- `split`;
- `system-canvas`;
- `editorial`;
- `timeline`;
- `terminal-workbench`;
- `security-matrix`.

## 13.5. Animation principles

Framer Motion используется для:

- появления структуры;
- перехода task;
- изменения status;
- раскрытия context;
- перестройки graph;
- code reveal;
- morphing chat → agent workflow.

Не использовать:

- бессмысленные particles;
- постоянные bouncing loops;
- длинные blocking intro;
- aggressive parallax;
- blur, мешающий чтению.

Каждую анимацию можно:

- пропустить;
- ускорить;
- отключить через reduced motion.

## 13.6. Sound

Не включать в v1.

---

# 14. Core visual components

Создать переиспользуемые компоненты:

```text
Button
IconButton
Panel
Badge
StatusIndicator
Dialog
Drawer
Tabs
Tooltip
Progress
KeyboardHint
SceneFrame
ChapterNav
CodePanel
TerminalPanel
DiffPanel
FileTree
AgentCard
TaskNode
TaskGraph
EventTimeline
ContextMeter
PermissionMatrix
DiagramFrame
SourceBadge
QuickFaqCard
SpeakerTimer
ConnectionStatus
```

Требования:

- keyboard accessible;
- focus-visible;
- reusable;
- no content-specific logic;
- reduced motion support;
- semantic names;
- unit/component tests where behavior exists.

---

# 15. Orchestration simulation

## 15.1. General requirements

Симуляция:

- deterministic;
- data-driven;
- no API;
- no random timing;
- pausable;
- resettable;
- skippable;
- speed ×1/×2/×4;
- step forward/backward;
- synchronized with Speaker mode.

## 15.2. Agents

- Architect;
- Researcher;
- Content Agent;
- UI Builder;
- Tester;
- Security Reviewer;
- Integrator.

## 15.3. Scenarios

1. Normal flow.
2. Blocked task.
3. File conflict.
4. Missing specification.
5. Unsafe permission.
6. Failed verification.
7. Recovery and retry.
8. Human approval required.

## 15.4. Event model

```js
{
  id: 'builder-started',
  at: 2200,
  events: [
    {
      type: 'AGENT_STATUS_CHANGED',
      agentId: 'builder',
      status: 'running'
    }
  ]
}
```

## 15.5. Agent statuses

```text
idle
queued
running
blocked
waiting_approval
failed
completed
cancelled
```

Transitions must be validated.

## 15.6. Panels

- agent list;
- task graph;
- context panel;
- event log;
- result panel;
- simulation controls;
- permissions;
- integration state.

---

# 16. Technical architecture

## 16.1. Stack

Required:

- React;
- Vite;
- JavaScript;
- Tailwind CSS;
- Framer Motion;
- React Router;
- Vitest;
- React Testing Library;
- Playwright;
- ESLint;
- Prettier.

Optional dependencies require justification.

No TypeScript.

## 16.2. Architecture layers

```text
Content
↓
Presentation engine
↓
Feature components
↓
UI primitives
```

Rules:

- content is data;
- navigation/state logic is not stored in visual components;
- simulation is data-driven;
- deep dives share a template;
- no giant all-purpose component;
- files should have focused responsibilities.

## 16.3. Directory structure

```text
agentic-codex-story/
├── START_HERE.md
├── SPEC.md
├── IMPLEMENTATION_PLAN.md
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── docs/
│   ├── implementation-progress.md
│   ├── research-notes.md
│   ├── content-fact-check.md
│   ├── architecture.md
│   ├── security-model.md
│   └── final-verification.md
├── scripts/
│   └── validate-content.js
├── public/
│   ├── icons/
│   └── static/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   ├── providers.jsx
│   │   └── routes.js
│   ├── components/
│   │   ├── ui/
│   │   ├── code/
│   │   ├── diagrams/
│   │   └── navigation/
│   ├── features/
│   │   ├── explore/
│   │   ├── presentation/
│   │   ├── speaker/
│   │   ├── deep-dive/
│   │   ├── simulation/
│   │   ├── faq/
│   │   ├── glossary/
│   │   └── sources/
│   ├── content/
│   │   ├── scenes/
│   │   ├── deep-dives/
│   │   ├── speaker-notes/
│   │   ├── faq/
│   │   ├── glossary/
│   │   ├── sources/
│   │   └── examples/
│   ├── hooks/
│   ├── state/
│   ├── lib/
│   ├── styles/
│   ├── test/
│   └── main.jsx
└── tests/
    └── e2e/
```

## 16.4. State management

Не использовать Redux в v1.

Использовать:

- React Context;
- `useReducer`;
- focused custom hooks.

State:

```js
{
  mode: 'explore',
  activeSceneId: 'hero',
  visitedSceneIds: [],
  presentation: {
    status: 'idle',
    startedAt: null,
    pausedAt: null,
    elapsedSeconds: 0
  },
  simulation: {},
  navigationOrigin: null,
  preferences: {
    reducedMotion: false,
    keyboardHelpDismissed: false
  }
}
```

Actions:

```text
ENTER_PRESENTATION
EXIT_PRESENTATION
GO_TO_SCENE
NEXT_SCENE
PREVIOUS_SCENE
START_TIMER
PAUSE_TIMER
RESET_TIMER
SET_SIMULATION_STEP
OPEN_DEEP_DIVE
RETURN_FROM_DEEP_DIVE
SET_REDUCED_MOTION
RESTORE_STATE
```

## 16.5. Scene renderer registry

```js
const sceneRenderers = {
  hero: HeroScene,
  timeline: EvolutionScene,
  workflow: CodexWorkflowScene,
  'spec-transformation': SpecificationScene,
  'task-graph': PlanningScene,
  orchestration: OrchestrationScene,
  verification: VerificationScene
};
```

Scene renderer receives:

```js
{
  scene,
  mode,
  isActive,
  simulationState,
  onSimulationChange
}
```

Scene renderer must not directly own global navigation.

## 16.6. Speaker synchronization

Primary:

```js
new BroadcastChannel('agentic-codex-presentation')
```

Fallback:

- `localStorage` events.

Messages:

```text
SCENE_CHANGED
TIMER_STARTED
TIMER_PAUSED
TIMER_RESET
SIMULATION_STEP_CHANGED
SIMULATION_STATE_CHANGED
DEEP_DIVE_OPENED
PRESENTATION_ENDED
CONNECTION_PING
CONNECTION_PONG
```

Speaker mode handles disconnected state.

## 16.7. Navigation origin

Store:

```js
{
  returnMode: 'presentation',
  returnSceneId: 'mcp',
  returnScrollPosition: 0,
  returnSimulationStep: 3
}
```

Use router state + sessionStorage fallback.

## 16.8. Local storage

May store only:

- keyboard help dismissed;
- reduced motion preference;
- last scene;
- accidental refresh recovery.

Do not store sensitive information.

---

# 17. Source and fact-check model

## 17.1. Source priority

1. Official OpenAI documentation.
2. Official Codex documentation and repositories.
3. Official MCP specification.
4. Official library documentation.
5. Primary security research.
6. Secondary articles only for supporting context.

## 17.2. Source record

```js
{
  id: 'openai-codex-agents-md',
  title: 'Custom instructions with AGENTS.md',
  organization: 'OpenAI',
  url: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md',
  sourceType: 'official',
  checkedAt: '2026-07-13',
  topics: ['agents-md'],
  volatility: 'medium'
}
```

## 17.3. Volatility

- `low` — stable concept;
- `medium` — recommended workflow;
- `high` — UI label, command, slash command, availability, current product behavior.

Every `high` claim must:

- have source;
- have `checkedAt`;
- be rechecked before public presentation.

## 17.4. Current official source starting points

At spec creation time:

- OpenAI Codex / ChatGPT Learn docs: `https://learn.chatgpt.com/docs`
- AGENTS.md: `https://learn.chatgpt.com/docs/agent-configuration/agents-md`
- Build skills: `https://learn.chatgpt.com/docs/build-skills`
- Subagents: `https://learn.chatgpt.com/docs/agent-configuration/subagents`
- MCP specification: `https://modelcontextprotocol.io/specification/`

URLs may redirect. Implementation must store canonical current URL after Phase 0 research.

## 17.5. Content accuracy rules

- Do not present universal agent patterns as Codex-only features.
- Do not present every plugin/skill as preinstalled.
- Do not invent CLI or slash commands.
- Do not claim a permission behavior without a current source.
- Do not imply real API execution in the simulation.
- Clearly label simulated output.
- Distinguish OpenAI Codex, OpenAI Agents SDK and general agent architecture.

---

# 18. Accessibility

Required:

- full keyboard navigation;
- visible focus;
- semantic buttons;
- correct dialog focus management;
- `prefers-reduced-motion`;
- no color-only status;
- sufficient contrast;
- text descriptions for diagrams;
- accessible labels for presentation controls;
- logical heading hierarchy;
- skip links;
- terminal updates not announced line-by-line unnecessarily;
- screen reader friendly status summaries;
- mobile reading support.

Accessibility is part of Definition of Done, not a later enhancement.

---

# 19. Responsive behavior

Priority:

1. Desktop 1440+.
2. Laptop 1024–1439.
3. Tablet.
4. Mobile reading.

Desktop:

- full graphs;
- all panels;
- full Speaker mode.

Laptop:

- reduced spacing;
- panel tabs where necessary;
- readable presentation.

Tablet:

- functional Explore mode;
- simplified graphs;
- presentation usable but not primary.

Mobile:

- readable Explore mode;
- FAQ;
- glossary;
- deep dives;
- presentation may be simplified;
- Speaker mode not optimized as main use case;
- no broken layout.

---

# 20. Performance

Requirements:

- lazy-load deep-dive routes;
- lazy-load heavy diagrams;
- do not preload all code examples;
- pause simulations outside viewport;
- no uncontrolled animation loops;
- local assets;
- no large video files;
- avoid unnecessary 3D libraries;
- optimize graph rendering;
- no runtime network dependency for core presentation;
- no console errors;
- smooth scene transitions on standard laptop.

---

# 21. Security

## 21.1. Application security

- no secrets;
- no required `.env`;
- no `eval`;
- no dynamic code execution;
- no user shell execution;
- no unsafe HTML;
- avoid `dangerouslySetInnerHTML`;
- safe external links;
- fixed lockfile;
- dependency audit;
- no analytics;
- no user data collection;
- terminal is simulation only;
- MCP is simulation only.

## 21.2. Educational security content

Must cover:

- least privilege;
- read-only where possible;
- approvals;
- secret boundaries;
- shell risk;
- production access;
- prompt injection;
- untrusted files and docs;
- MCP trust;
- dependency supply chain;
- audit logs;
- rollback;
- human escalation.

## 21.3. Security review deliverable

Create:

```text
docs/security-model.md
```

Include:

- assets;
- threats;
- trust boundaries;
- mitigations;
- residual risks.

---

# 22. Testing strategy

## 22.1. Content validation

Validate:

- unique scene IDs;
- order;
- existing renderer;
- existing speaker notes;
- existing FAQ IDs;
- existing deep-dive routes;
- existing source IDs;
- accessibility descriptions;
- FAQ length;
- volatile claims with sources;
- no placeholder markers.

## 22.2. Unit tests

Test:

- reducer;
- scene transitions;
- progress;
- timer calculations;
- agent state transitions;
- simulation event application;
- origin restoration;
- source validation;
- FAQ filtering.

## 22.3. Component tests

Test:

- keyboard controls;
- dialog focus;
- code tabs;
- FAQ search;
- glossary search;
- presentation controls;
- scene map;
- reduced motion;
- simulation controls.

## 22.4. Integration tests

Test:

- Explore → Presentation;
- Presentation → Deep dive → return;
- refresh restore;
- speaker synchronization;
- disconnected speaker;
- simulation and presentation state;
- route transitions.

## 22.5. E2E tests

Critical flow:

```text
1. Open app.
2. Start presentation.
3. Move through scenes.
4. Open deep dive.
5. Return to same scene.
6. Open speaker window.
7. Verify synchronization.
8. Run orchestration simulation.
9. Trigger a failure scenario.
10. Complete presentation.
11. Open FAQ.
```

Also test:

- keyboard-only flow;
- reduced motion;
- laptop viewport;
- mobile Explore mode;
- refresh recovery;
- unknown route.

## 22.6. Visual/browser verification

Manually or with browser tooling verify:

- Hero;
- AI timeline;
- SPEC transformation;
- AGENTS panel;
- MCP permissions;
- orchestration graph;
- terminal;
- security matrix;
- Speaker mode;
- long Russian text;
- focus;
- overflow;
- responsive layouts;
- console.

## 22.7. Test selection principle

> Tests are chosen according to behavior and risk, not to maximize coverage percentage.

---

# 23. Commands

Required scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "validate:content": "node scripts/validate-content.js",
    "verify": "npm run validate:content && npm run lint && npm run test && npm run build && npm run test:e2e",
    "audit": "npm audit"
  }
}
```

`npm run verify` is the standard completion gate.

Dependency audit requires human interpretation and is not blindly treated as pass/fail.

---

# 24. Implementation phases

## Phase 0 — Research and fact-check

Deliver:

- `docs/research-notes.md`;
- `docs/content-fact-check.md`;
- source registry;
- volatile claims list.

Acceptance:

- current Codex concepts verified;
- commands verified;
- `AGENTS.md` verified;
- subagents verified;
- skills/plugins verified;
- MCP terminology verified;
- security claims sourced;
- uncertain claims removed or labeled.

## Phase 1 — Foundation

Deliver:

- Vite app;
- Tailwind;
- router;
- tests;
- lint;
- base folders;
- tokens.

Acceptance:

- dev works;
- lint works;
- test works;
- build works;
- route smoke test.

## Phase 2 — Content model

Deliver:

- scene registry;
- FAQ;
- glossary;
- sources;
- notes;
- validation script.

Acceptance:

- all references valid;
- content tests pass;
- no placeholders.

## Phase 3 — Explore mode

Deliver:

- main story page;
- navigation;
- chapter progress;
- anchors;
- responsive shell.

Acceptance:

- all scenes reachable;
- active section correct;
- mobile readable;
- deep-dive origin retained.

## Phase 4 — Presentation engine

Deliver:

- reducer;
- keyboard;
- scene progress;
- map;
- fullscreen shell;
- refresh restore;
- reduced motion.

Acceptance:

- complete keyboard flow;
- no out-of-range navigation;
- accessible controls;
- restore works.

## Phase 5 — Speaker mode

Deliver:

- separate route/window;
- current/next;
- notes;
- timer;
- BroadcastChannel;
- fallback;
- disconnected state.

Acceptance:

- bidirectional control;
- sync works;
- presentation works without speaker;
- connection loss handled.

## Phase 6 — Shared UI system

Deliver all primitives and motion utilities.

Acceptance:

- accessibility;
- consistency;
- component tests;
- reduced motion.

## Phase 7 — Core scenes

Priority:

- Hero;
- Evolution;
- Prompt to system;
- SPEC;
- AGENTS;
- MCP;
- Agents/Subagents;
- Orchestration;
- Verification;
- Security;
- Human decision.

Acceptance:

- each scene communicates one thesis;
- shared renderer;
- no overflow;
- meaningful animation.

## Phase 8 — Simulation engine

Deliver scenarios and controls.

Acceptance:

- deterministic;
- reproducible;
- resettable;
- skippable;
- synced;
- failure and recovery shown.

## Phase 9 — Deep dives

Implement shared layout then all routes.

Acceptance:

- common structure;
- practical guidance;
- mistakes;
- checklist;
- sources;
- return behavior.

## Phase 10 — FAQ, glossary, sources

Acceptance:

- search;
- categories;
- short answers;
- terms consistent;
- safe links;
- source dates.

## Phase 11 — Full verification and polish

Acceptance:

- verify passes;
- audit reviewed;
- accessibility reviewed;
- content fact-check complete;
- security reviewed;
- full rehearsal completed;
- final verification document created.

---

# 25. Agentic implementation workflow

## 25.1. Root artifacts

```text
START_HERE.md
SPEC.md
IMPLEMENTATION_PLAN.md
AGENTS.md
README.md
docs/implementation-progress.md
```

## 25.2. Responsibility

`SPEC.md`:

- product result.

`IMPLEMENTATION_PLAN.md`:

- ordered implementation tasks.

`AGENTS.md`:

- repository working rules.

`START_HERE.md`:

- minimal Codex entry instruction.

`implementation-progress.md`:

- current phase and evidence.

## 25.3. Logical agent roles

- Orchestrator;
- Research Agent;
- Product/Content Agent;
- Architecture Agent;
- UI System Agent;
- Scene Builder;
- Simulation Agent;
- Test Agent;
- Security Reviewer;
- Visual Verifier;
- Integrator.

Not every role requires a physically separate agent.

## 25.4. Parallel work

Safe:

- Codex research / MCP research / security research;
- FAQ / glossary / speaker notes after terminology freeze;
- independent UI primitives after API freeze;
- content validation / reducer tests / E2E design;
- isolated scene renderers using stable components.

Unsafe:

- two agents editing same reducer;
- concurrent redesign of one scene;
- content schema change while content is being filled;
- architecture refactor during active feature implementation;
- component API change while scenes rely on it.

## 25.5. Worktrees

Use only for sufficiently independent tasks.

Rules:

- one worktree per bounded task;
- avoid shared-file edits;
- commit before integration;
- run checks;
- integrate centrally;
- clean up after merge.

## 25.6. Subagent task format

```md
## Role

## Goal

## Scope

## Inputs

## Allowed actions

## Forbidden actions

## Expected output

## Verification

## Completion criteria
```

Every delegated task must define:

- responsibility;
- boundaries;
- inputs;
- tools;
- output contract;
- evidence.

---

# 26. START_HERE behavior

Recommended content:

```md
# Start here

1. Read AGENTS.md.
2. Read SPEC.md.
3. Read IMPLEMENTATION_PLAN.md.
4. Read docs/implementation-progress.md.
5. Inspect the repository.
6. Identify the first incomplete phase.
7. Confirm its dependencies.
8. Implement only that phase.
9. Run its required verification.
10. Update progress with evidence.
11. Stop and report.
```

Recommended prompt:

```md
Follow START_HERE.md.

Do not implement multiple phases in one uncontrolled pass.
Do not change the approved design silently.
Before editing, summarize the user-visible result, scope, dependencies,
files and verification for the current phase.

After implementation, report:
- changes;
- files;
- checks;
- browser evidence;
- limitations;
- next phase.
```

---

# 27. Definition of Done

## 27.1. Phase DoD

A phase is complete only when:

- acceptance criteria pass;
- no placeholders;
- no unexplained spec deviations;
- correct tests added;
- lint passes;
- tests pass;
- build passes;
- browser flow checked;
- console clean;
- accessibility checked;
- progress updated with evidence;
- limitations documented.

## 27.2. Product DoD

### Startup

- `npm install` succeeds;
- `npm run dev` works;
- no keys;
- no backend;
- no required internet for core demo;
- local assets.

### Explore

- complete story;
- chapter navigation;
- active section;
- deep-dive return;
- readable mobile.

### Presentation

- keyboard;
- controls;
- progress;
- scene map;
- deep dive;
- simulation skip;
- refresh restore;
- exit.

### Speaker

- current/next;
- notes;
- timer;
- controls;
- sync;
- disconnected state.

### Content

- 16 scenes;
- all deep dives;
- FAQ;
- glossary;
- sources;
- consistent terminology;
- verified Codex claims.

### Simulation

- deterministic;
- agents/tasks;
- statuses;
- event log;
- failures;
- recovery;
- no real calls.

### Accessibility

- keyboard;
- focus;
- semantics;
- contrast;
- reduced motion;
- diagram descriptions;
- non-color indicators.

### Performance

- lazy loading;
- no uncontrolled loops;
- smooth laptop behavior;
- no huge assets.

### Security

- no secrets;
- no eval;
- no unsafe HTML;
- safe links;
- lockfile;
- audit reviewed;
- simulated terminal/MCP.

### Quality

- `npm run verify` passes;
- browser walkthrough completed;
- no critical overflow;
- no console errors;
- content review;
- security review.

---

# 28. Final human walkthrough

Required:

```text
1. Open the main page.
2. Review Hero.
3. Start Presentation mode.
4. Navigate by keyboard.
5. Open and close scene map.
6. Open a deep dive.
7. Return to the same scene.
8. Open Speaker mode.
9. Verify synchronization.
10. Run orchestration simulation.
11. Trigger blocked task.
12. Trigger unsafe permission.
13. Trigger failed verification.
14. Complete recovery.
15. Open FAQ.
16. Open glossary.
17. Check sources.
18. Enable reduced motion.
19. Check laptop viewport.
20. Check mobile Explore mode.
21. Finish presentation.
22. Confirm no console errors.
```

Record results in:

```text
docs/final-verification.md
```

---

# 29. Acceptance criteria summary

The product is accepted when:

1. It clearly teaches the complete modern agentic workflow.
2. Codex is the main example, but universal concepts are correctly separated.
3. The presentation can be delivered in 30–40 minutes.
4. Presentation and Speaker modes work reliably.
5. The orchestration simulation is understandable and deterministic.
6. Practical guidance exists for spec, architecture, `AGENTS.md`, skills, MCP, subagents, testing and security.
7. FAQ answers common beginner questions concisely.
8. Sources support volatile claims.
9. The app runs locally without external services.
10. Verification provides evidence, not just a “done” claim.
11. Accessibility and security requirements pass.
12. The final message remains clear:

> **Agentic development is not the removal of the developer. It is the deliberate design of context, tools, boundaries, work and verification.**

---

# 30. Spec self-review result

This specification has been checked for:

- placeholders;
- internal contradictions;
- scope creep;
- ambiguous requirements;
- mismatch between story and architecture;
- missing failure states;
- missing verification;
- missing security;
- missing accessibility;
- missing content-source requirements.

Decisions made explicitly:

- local-only application;
- no backend;
- no TypeScript;
- no real Codex calls;
- no real MCP calls;
- FAQ uses quick answers only;
- sound excluded;
- desktop/laptop presentation prioritized;
- mobile is reading-first;
- 16-scene primary story;
- `SPEC.md` is source of truth;
- implementation remains phased;
- “one click” means one repository entry instruction, not an uncontrolled single-pass generation.

No unresolved `TBD` or `TODO` items are allowed to remain before implementation planning.
