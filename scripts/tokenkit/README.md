# TokenKit — token-optimization & context-efficiency toolkit

Zero-new-dependency tools under `scripts/tokenkit/` that cut LLM API cost for
coding tasks. Everything runs offline on Node built-ins + the repo's existing
`typescript@5.9.3` + the existing `graphify-out/graph.json` knowledge graph.
No GitNexus/Serena/grepai/Repomix/Harmony packages are installed; the named
targets below map to working local equivalents.

## Cost-control strategy (at a glance)

| Layer | Tool | What it saves |
|---|---|---|
| Local knowledge graph / jump-to | `codegraph` (GitNexus/CodeGraph) | "where is X / who uses X" without scanning the tree |
| Symbol navigation | `graphify` / `codegraph jump` (Serena-LSP role) | targeted symbol context, not whole files |
| Local semantic search | `grepai` | 100% offline search **before** any LLM call |
| Context packing | `pack` (Repomix) | up to ~99% token reduction on a dir/file |
| Budget / routing / filtering | `cost` + `harmony-mcp` (Harmony MCP) | pick the cheapest tier, filter the prompt, cap output |
| Output constraints | `cost format` | force diff/patch/JSON to minimize generation tokens |
| Prompt caching | `pack` + `graphify` | stable structured context = high system-prompt cache hit rate |

**Model routing tiers** (see `cost route`):

- `local` — `ollama/qwen2.5:1.5b`, cap 8192 — search, file resolution, formatting, symbol jump, small diffs
- `mid` — `ollama/qwen2.5:14b`, cap 32768 — moderate reasoning, single-file edits
- `flag` — your configured flagship, cap 128000 — complex multi-file architecture

Route search/formatting to local, reserve flagship for genuinely hard reasoning.

## npm scripts (root)

```
npm run tokenkit:codegraph            # knowledge-graph jump-to / consumers / god-nodes
npm run tokenkit:grepai              # local semantic search + index build
npm run tokenkit:pack                # repomix-style context packing
npm run tokenkit:cost               # route / budget / format
npm run tokenkit:mcp                # Harmony MCP stdio server
```

All are thin wrappers: `node scripts/tokenkit/<name>.mjs …`.

## 1. codegraph.mjs — GitNexus/CodeGraph (graph + jump-to)

```
node scripts/tokenkit/codegraph.mjs jump LiveLeaderLine            # definition + imports + consumers
node scripts/tokenkit/codegraph.mjs jump LiveLeaderLine --body 30  # + truncated body
node scripts/tokenkit/codegraph.mjs imports frontend/lib/syllabus.ts
node scripts/tokenkit/codegraph.mjs consumers frontend/lib/syllabus.ts
node scripts/tokenkit/codegraph.mjs god-nodes                      # top import hubs
```
Reads `graphify-out/graph.json`; falls back to a bounded source scan if a
symbol isn't in the graph. Strict JSON output.

## 2. grepai.mjs — local semantic search (offline, pre-LLM)

```
node scripts/tokenkit/grepai.mjs index                 # rebuild graphify-out/tokenkit-index.json
node scripts/tokenkit/grepai.mjs search "leader line viewport" --top 5
node scripts/tokenkit/grepai.mjs search "auth" --path frontend/lib --json
node scripts/tokenkit/grepai.mjs search "x" --rebuild   # force index refresh
```
Inverted index of hashed bag-of-tokens over code files; cosine ranking.
Cache at `graphify-out/tokenkit-index.json`. Run `index` after big changes.

## 3. pack.mjs — Repomix-style compression

```
node scripts/tokenkit/pack.mjs backend/src --symbols-only
node scripts/tokenkit/pack.mjs frontend/lib --bodies 20
node scripts/tokenkit/pack.mjs backend/src/ai --json
```
Packs per-file imports + exported-symbol signatures into one
`tokenkit-out/context.md` and reports raw vs packed tokens (typically 98–99%
savings in symbols-only mode). Share that file as cached LLM context.

## 4. cost.mjs — token budgeting, model routing, output constraints

```
node scripts/tokenkit/cost.mjs route "find symbol X and its consumers" --json
node scripts/tokenkit/cost.mjs budget --goal "architect a new module" --content-file tokenkit-out/context.md --json
node scripts/tokenkit/cost.mjs format --mode diff --instruction "add guard clause" --draft-file draft.txt
node scripts/tokenkit/cost.mjs format --mode json --instruction "return location" --draft-file f
```
`route` picks the cheapest tier for the goal; `budget` plans context vs
output tokens and goal-filters the prompt; `format` forces diff/patch/JSON.

## 5. harmony-mcp.mjs — Harmony MCP server (stdio, JSON-RPC 2.0, no deps)

```
node scripts/tokenkit/harmony-mcp.mjs
```
Wire into an MCP client:

```json
{"command":"node","args":["scripts/tokenkit/harmony-mcp.mjs"]}
```
Exposes tools: `pack_context`, `semantic_search`, `symbol_jump`,
`token_budget`, `format_output`. Idempotent + offline.

## Files

| File | Role |
|---|---|
| `lib.mjs` | shared helpers (repo root, graph loader, TS Compiler API symbol parser, token estimator, code-file lister) |
| `graph-core.mjs` | jump-to / import targets / consumers |
| `grep-core.mjs` | inverted-index build + cosine ranking |
| `pack-core.mjs` | repomix packing (import/signature compaction) |
| `codegraph.mjs` `grepai.mjs` `pack.mjs` `cost.mjs` | CLI front-ends |
| `harmony-mcp.mjs` | MCP server over stdio |

## Caching + output constraints (cost controls)

- **Prompt caching:** feed the stable packed `context.md` + a fixed system
  prompt as the cache-eligible prefix; only the task-specific goal changes.
- **Model routing:** `cost route` — keep local search/formatting on Ollama,
  escalate to flagship only for architecture.
- **Output constraints:** `cost format --mode diff|patch|json` returns a
  `hint` telling the model to emit unified-diff hunks / a JSON envelope
  instead of full-file rewrites, cutting generation tokens.

## Cache / output paths

- `graphify-out/tokenkit-index.json` — grepai inverted index
- `tokenkit-out/context.md` — last packed context
- `graphify-out/graph.json` — upstream knowledge graph (rebuild with `npm run graphify:update`)
