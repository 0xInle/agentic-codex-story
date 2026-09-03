# Architecture

## Layers

`src/content` хранит сцены, deep dives, FAQ, glossary, sources, speaker notes и simulation scenarios. Feature components отображают эти registry; они не должны становиться альтернативным content store.

`src/state` содержит pure app reducer, initial state и persistence boundary. `src/features/presentation`, `speaker` и `simulation` владеют mode-specific поведением. `src/components` содержит reusable UI, navigation, code и diagram primitives. `src/styles` задаёт tokens, layout и motion policy.

## Routes and loading

`src/app/router.jsx` владеет React Router routes. Explore, Presentation, Speaker и reference routes имеют самостоятельные route shells. Deep dive импортируется через `React.lazy` и `Suspense`, поэтому образует отдельный production chunk.

## State and simulation

`appReducer` — единственная pure boundary глобальных app transitions. Presentation timer строится на timestamp-derived state. Simulation использует content-owned scenarios и pure `applyTimelineThrough`; random timing и внешние calls отсутствуют. `SimulationController` отвечает только за controls и viewport pause, а не за реальное выполнение агентов.

## Speaker synchronization

`syncProtocol` defines versioned allowlisted envelopes. `syncTransport` использует BroadcastChannel, затем scoped storage event fallback. Duplicate, stale, self and malformed envelopes are ignored. Notes, sources и storage keys запрещены в payload. Speaker UI ждёт подтверждённое message state, а не меняет сцену оптимистично.

## Public UI contracts

- `SceneRenderer` принимает `scene`, `mode`, `isActive`, simulation props и возвращает доступную scene surface.
- `Dialog`/`Drawer` предоставляют modal semantics, heading, focus restoration и cyclic keyboard trap.
- `Tabs` публикует labelled tablist и valid tab/panel links.
- `DiagramFrame`, `TaskGraph`, `ChapterNav` и `SceneFrame` имеют text descriptions/labels для screen readers.

## Performance and responsive policy

Route shells use `app-shell`; reference modes use `reference-shell`; scene layouts use compact reading-first stack/list fallbacks. Reduced-motion and viewport observer adapters are guarded for non-browser environments. No runtime asset requests are needed for core presentation.
