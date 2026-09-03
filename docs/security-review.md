# Security review — Task 48

Reviewed on 2026-07-16. This review covers the local React application only; it does not authorize or introduce a backend, real Codex/MCP connection, external runtime request, credential, or shell execution path.

| Check | Evidence | Result | Residual risk | Owner decision |
| --- | --- | --- | --- | --- |
| Dynamic execution and remote runtime requests | `rg` found no `dangerouslySetInnerHTML`, `eval`, `new Function`, `fetch`, `XMLHttpRequest` or `WebSocket` in `src`. | PASS | Static links may leave the application when a user activates them. | Keep runtime local-only. |
| External links | Sources use `getSafeExternalLink`; unit coverage allows HTTPS only and requires `noopener noreferrer`. | PASS | The destination content can change after review. | Keep provenance and revalidate volatile claims before a later release. |
| Browser storage and cross-window messages | Persistence validates versioned allowlisted data; Speaker transport rejects malformed, stale, self and unsupported envelopes. | PASS | Same-origin browser channels are not an authorization boundary. | Keep message allowlist and do not transmit notes, sources or arbitrary state. |
| Simulation and terminal representation | Scenario data is marked simulated; terminal label is `Симулированный terminal`; no network APIs are present. | PASS | Educational output can still be mistaken for a live run without presenter context. | Keep local-simulation labels visible. |
| Least privilege and approvals | Current Codex manual distinguishes sandbox technical limits from approval policy; security scene and FAQ recommend read-only scope and approval for side effects. | PASS | Product defaults vary by client and configuration. | Do not claim a universal default. |
| MCP trust boundary | MCP copy distinguishes protocol, model and agent; content advises reviewing scope, credentials, instructions and side effects. | PASS | Third-party MCP servers remain untrusted until separately reviewed. | Keep no live MCP path in v1. |
| Secrets, shell, production and injection | No `.env` requirement, user shell execution, backend, production integration or credential collection exists; content treats secrets, shell, production and untrusted instructions as human decisions. | PASS | Users can still follow an external link or copy educational text. | Preserve human checkpoint messaging. |
| Supply chain | `npm audit --audit-level=high` returned `found 0 vulnerabilities`; lockfile is present. | PASS | Future dependency advisories may appear. | Re-run audit for every release and interpret any finding manually. |
| Source provenance and volatile claims | Eleven canonical URLs returned HTTP 200 without redirect; MCP specification remains pinned to `2025-11-25`; high-volatility claims were rechecked. | PASS with qualified claims | Exact commands and subagent availability can change. | Keep the two qualified claims and revalidate before a later presentation release. |
| Full regression gate | After the user-authorized test/tooling remediation, `npm run verify` passed: content validation, lint with one non-blocking Fast Refresh warning, 47 unit files/78 tests and production build. | PASS | jsdom still emits canvas implementation warnings during axe checks; the accessibility assertions pass. | Keep E2E discovery separate from Vitest and retain the Router wrapper in the route fixture. |

## Conclusion

The review found no executable remote capability path or high-severity dependency advisory. The remaining risks are deliberately bounded: external documentation can change, browser same-origin channels are not authorization, and two public claims remain qualified rather than universal. The required full regression gate now passes.
