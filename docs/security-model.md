# Security model

## Assets and trust boundaries

Important assets are local content registries, speaker notes, deterministic scenarios, browser storage preferences and cross-window state envelopes. `src/content` is trusted repository content; external source links are untrusted destinations. Browser APIs (`BroadcastChannel`, storage events, fullscreen and popup behavior) are capability boundaries, not trusted services.

## Threats and mitigations

| Threat | Implemented mitigation |
| --- | --- |
| Real tool/API invocation implied by the UI | The application is local-only simulation; no runtime API client or backend exists. |
| Unsafe cross-window payload | Versioned allowlisted envelope rejects malformed, stale, self and unsupported messages. |
| Notes or sources leaking through sync | Protocol rejects `note`, `notes`, `source`, `sources`, `storageKey` and `storageKeys` payload fields. |
| Malformed persisted state | Persistence uses versioned allowlist validation and ignores corrupt/stale data. |
| Unsafe external links | Source links pass through `getSafeExternalLink` and use `noopener noreferrer`. |
| Misleading status by colour alone | StatusIndicator includes textual accessible labels. |
| Motion/accessibility harm | Reduced-motion policy, visible focus and accessible overlays are covered by tests. |
| Dependency supply-chain risk | Lockfile and `npm audit --audit-level=high` are available; audit conclusions require human review. |

## Residual risks

The local app cannot prove current vendor UI, commands or permissions. The two high-volatility claims about exact command labels and subagent availability were rechecked on 2026-07-16 but remain qualified because they depend on release, client, account and configuration. Browser storage and BroadcastChannel remain same-origin browser mechanisms; they are not an authorization system. An external source link can change after its recorded `checkedAt` date.

## Non-goals

There is no authentication, production deployment, user data collection, secrets, dynamic code execution, user shell execution, backend, CMS or real Codex/MCP connection in v1.
