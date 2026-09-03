# Agentic Codex Story

Локальное русскоязычное React-приложение о агентской разработке. Оно демонстрирует Explore, Presentation и Speaker modes, 16 сцен, справочные маршруты и детерминированную simulation orchestration.

Это учебная симуляция: приложение не вызывает Codex, MCP или другие внешние runtime API, не имеет backend, учётных записей, аналитики и server-side persistence.

## Запуск

```bash
npm install
npm run dev
```

После запуска Vite откройте URL, который напечатает команда.

## Режимы и маршруты

- `/` и `/story` — Explore mode с главами истории.
- `/present/*` — Presentation mode с переходами между сценами.
- `/speaker` — Speaker mode; он использует отдельную вкладку и локальный transport.
- `/deep-dive/:slug` — lazy-loaded deep dive.
- `/faq`, `/glossary`, `/sources` — reading-first reference modes.

Presentation открывает Speaker mode обычной ссылкой; его отсутствие не блокирует презентацию. Синхронизация использует `BroadcastChannel`, а при его отсутствии — локальное storage event fallback. В transport не передаются speaker notes, sources и произвольные storage keys.

## Проверки

```bash
npm run lint
npm run test
npm run validate:content
npm run build
npm run verify
npm run test:e2e
npm run audit
```

`npm run verify` объединяет content validation, lint, unit/component tests и production build. E2E suites определены в toolchain, но их финальная browser-приёмка выполняется в Phase 11.

## Доступность и motion

Интерфейс использует landmarks, heading hierarchy, keyboard-focus styles, labels для статусов и диаграмм, cyclic focus trap в overlay и reduced-motion preference. При недоступности browser APIs приложение использует безопасные local fallback’и. Simulation прекращает playback вне viewport.

## Ограничения

- JavaScript/JSX only; TypeScript не используется.
- Весь продуктовый контент находится в `src/content`; speaker notes не находятся в JSX.
- Не используйте приложение как источник текущих Codex/MCP permissions или команд: volatile claims требуют revalidation в финальной проверке.
# agentic-codex-story
