# Content fact check

This registry is the allowed-claim ledger for content. A claim may be rendered only with its approved wording and status. `verified` means supported by a canonical source at `checkedAt`; `qualified` means it needs context or a final recheck; `removed` means it must not appear as a product claim.

| claimId | claim | topic | sourceIds | volatility | checkedAt | status | approved wording / handling |
|---|---|---|---|---|---|---|---|
| codex-repository-workflow | Codex documentation describes repository-oriented workflows that use tools. | Codex | codex-manual | medium | 2026-07-14 | verified | “Codex can work with repository context and tools; the available workflow depends on the client and its permissions.” |
| codex-command-names | Exact command and UI labels are versioned documentation details and require a current source when displayed. | Codex CLI | codex-cli-reference | high | 2026-07-16 | qualified | Show exact commands only as checked examples and revalidate them before any later presentation release. |
| approvals-and-sandbox | Sandbox and approval policy are distinct controls. | Security | codex-approvals-security | high | 2026-07-16 | verified | “Sandbox limits what can be done technically; approval policy determines when consent is required.” |
| misconception-approval-defaults | Misconception: a particular approval or network default applies to every Codex surface. | Security | codex-approvals-security | high | 2026-07-16 | removed | Do not present this as a product claim; defaults vary by client and configuration. |
| git-worktrees | Worktrees provide Git-based checkout isolation. | Worktrees | codex-worktrees | medium | 2026-07-14 | verified | “A Git worktree is a separate checkout that shares repository metadata; it can isolate concurrent work.” |
| agents-instructions | `AGENTS.md` can provide scoped repository instructions. | Repository guidance | codex-agents-md | medium | 2026-07-14 | verified | “Repository guidance can define local operating rules and be layered by directory scope.” |
| skills-and-plugins | Skills and plugins are distinct reusable extension concepts. | Extensibility | codex-skills, codex-plugins | medium | 2026-07-14 | verified | “A skill is a focused workflow; a plugin can package skills and optionally integrations.” |
| misconception-subagent-for-all-work | Misconception: delegated subagents are appropriate for all work. | Orchestration | codex-subagents | high | 2026-07-14 | removed | Explain bounded parallel delegation together with coordination cost and conflict risk. |
| subagent-availability | Supported Codex clients can expose subagent workflows; availability and triggering depend on the client, account, and configuration. | Orchestration | codex-subagents | high | 2026-07-16 | qualified | Keep this surface-dependent wording and revalidate it before any later presentation release. |
| mcp-definition | MCP connects model clients with tools and context. | MCP | mcp-specification, codex-mcp | low | 2026-07-14 | verified | “MCP is a protocol for connecting a model client to tools and context; it is neither a model nor an autonomous agent.” |
| mcp-security | MCP tools require deliberate permissions and security review. | MCP security | codex-mcp, mcp-specification | medium | 2026-07-14 | verified | “Review tool scope, authentication, data exposure, instructions, and side effects before enabling an MCP tool.” |
| misconception-codex-agents-sdk-same-product | Misconception: Codex and the OpenAI Agents SDK are the same product. | Terminology | openai-agents-sdk | medium | 2026-07-14 | removed | Keep the names distinct: Codex is a coding-agent product; the Agents SDK is a developer SDK for agentic applications. |

## Validation policy

- Every source ID used above must resolve in `src/content/sources/sources.js`; a removed misconception still requires its supporting source.
- A `high`-volatility claim is rechecked on 2026-07-16; qualified wording remains intentionally bounded and must be revalidated before a later presentation release.
- A `removed` claim remains visible here only as a guardrail; it is forbidden from product copy except when explicitly explained as a misconception.
- Future terminology, scenes, FAQ, glossary, deep dives, and simulations must reference this ledger where they make a factual product claim.

## Terminology freeze (Task 3)

- Use the preferred Russian and English labels from `src/content/terminology.js` consistently in scenes, deep dives, FAQ, glossary, and speaker notes.
- Forbidden alternatives are guardrails against misleading phrasing, not extra terms for the glossary.
- `deterministic simulation` is a local product-scope term: it must never be described as a real Codex, MCP, terminal, or external API execution.
