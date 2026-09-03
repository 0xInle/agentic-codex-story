# Research notes — Phase 0 / Task 2

**Research date:** 2026-07-14  
**Purpose:** form a primary-source evidence base for the educational content. This is a content-research artifact, not application code and not a runtime data source.

## Protocol

1. Use official OpenAI/Codex documentation and the official Model Context Protocol specification as the canonical sources.
2. Record the canonical URL, organisation, date checked, and volatility for every source in `src/content/sources/sources.js`.
3. Assign a claim ID to every product-sensitive or potentially volatile formulation. Keep only the approved wording in `docs/content-fact-check.md`.
4. Treat command names, client availability, product UI labels, and approval defaults as volatile. Re-check them in Task 48 before final acceptance.
5. Do not make runtime requests from the future application. Sources are bundled locally as structured content.
6. Separate three concepts in all future content:
   - **Codex:** OpenAI's coding-agent product and its supported clients/workflows.
   - **Agents SDK:** a separate OpenAI developer SDK for building agentic applications; it is not a synonym for Codex.
   - **General agent patterns:** transferable ideas such as delegation, orchestration, context management, and verification; they are not guarantees about a particular product.

## Research query log and conclusions

| Topic / query | Primary source | Conclusion permitted in this project | Volatility |
|---|---|---|---|
| Codex product surfaces and repository workflow | OpenAI Codex manual | Codex can operate on repository work using tools, with behavior constrained by the active client, sandbox, and approvals. | medium |
| Codex CLI commands and command availability | OpenAI developer command reference | Commands and labels are versioned product details; only checked examples may be shown and they need Task 48 review. | high |
| Sandbox, approvals, and network access | OpenAI agent approvals & security | Sandbox defines technical capability; approval policy decides when user consent is required. Defaults and modes vary by client/configuration. | high |
| Git worktrees | OpenAI worktrees guide | Worktrees isolate Git checkouts for independent tasks; the desktop-app workflow requires a Git repository. | medium |
| `AGENTS.md` | OpenAI custom-instructions guide | Repository instructions are discovered in scope order and can establish project-specific operating rules. | medium |
| Skills and plugins | OpenAI build-skills and build-plugins guides | A skill is a focused reusable workflow; a plugin can package skills and may include app/MCP integrations. Availability is configuration-dependent. | medium |
| Agents, subagents, and orchestration | OpenAI subagents guide | A subagent is a delegated agent in a subagent workflow; delegation is useful for bounded independent work but adds cost and coordination risk. | high |
| MCP terminology and safety | OpenAI MCP guide; MCP specification | MCP connects a model client to tools and context. It is not the model or an autonomous agent. Tool scope, authentication, approvals, and prompt-injection risk require explicit review. | medium |
| Codex versus Agents SDK | OpenAI Agents SDK documentation | Codex and the Agents SDK are distinct OpenAI offerings. This application explains concepts only and makes neither Codex nor MCP runtime calls. | medium |

## Editorial rules derived from research

- Say “the simulation represents” rather than implying that a terminal line, tool result, or approval event is live.
- Do not promise that a feature exists in every Codex client, account tier, or configuration.
- Describe permissions as a decision boundary: narrow tool access, credentials, and side effects before a tool is trusted.
- Explain MCP as a protocol for connecting context and tools, not as a magic capability layer.
- Explain orchestration as deliberate coordination of bounded work; more agents can increase cost, latency, and conflict risk.
- Explain worktrees as Git-based isolation, not as a substitute for review, tests, or a branch strategy.
- Avoid unsupported universal claims such as “Codex always asks before every risky action” or “MCP servers are safe by default.”

## Sources excluded from claim authority

- Search-result snippets, marketing summaries, secondary tutorials, and community posts may help discover terminology but are not evidence for product behavior.
- Unversioned screenshots and remembered command lists are not evidence for current CLI/UI behavior.
- The application will not use external links as a runtime dependency; links are reference material for the reader.

## Recheck triggers

- Before Task 48, revalidate every `high`-volatility claim, all exact command names, availability statements, and permission defaults.
- When an official source changes its terminology, update the source registry, fact-check record, glossary wording, and affected scene content together.

## Canonical URL review — 2026-07-14

The registry was re-opened after human review. OpenAI sources use the current canonical `https://learn.chatgpt.com/docs/...` or `https://developers.openai.com/...` destination without an invented `.md` suffix. The MCP source is pinned to the checked specification version `2025-11-25`. Every registry URL was opened successfully and resolved to its intended official document; the resulting canonical URLs are the values in `src/content/sources/sources.js`.
