# Agent Guide — fast orientation and file classification

This guide helps coding agents find the smallest useful context and avoid spending time or tokens on large data payloads. It does not replace repository-specific instructions.

## Start here, then read narrowly

1. Read [`CORE_FILES.md`](CORE_FILES.md) first. It is the architecture and route registry; use it to choose the one relevant entrypoint.
2. **Orient with the graphify knowledge graph BEFORE reading files for "where is X", "what depends on Y", or "how do A and B connect" questions.** The graph lives at `graphify-out/graph.json` (gitignored, auto-rebuilt by git hooks on every commit):
   - `graphify query "<question>"` — find the symbols/modules relevant to a task
   - `graphify path "<file-or-symbol-A>" "<B>"` — shortest dependency path between two points
   - `graphify explain "<symbol>"` — plain-language summary of a node + neighbors
   - `graphify god-nodes` — the top architectural hubs
   Use it for orientation; read files directly only to make the actual edit. If the graph looks stale, run `graphify update .` (no LLM needed). Agents without CLI access can use the `/graphify` skill (installed for Copilot and other platforms) or query `graphify-out/graph.json` directly.
   The graph covers source code only (`.graphifyignore` excludes `content/`, `public/`, OCR/KB corpora) — it is NOT the curriculum corpus.
3. Read the target page/API/component and its direct route or parent link. Follow imports only when needed to understand the behavior being changed.
3. Read the closest focused test. Use `npm run test:affected -- <paths>` when available, then the scoped `npm run check`.
4. Read [`AGENT_RULES.md`](AGENT_RULES.md) for curriculum ordering, auth/security, or other mandatory safety rules. Read [`BRANCHES.md`](BRANCHES.md) before any branch operation. Read `project-conductor.md` only when task labels or role assignment matter.
5. Before changing a route or public section, verify its canonical link in `frontend/lib/navigation.ts` and `frontend/lib/site-index.ts`. For syllabus content, use `frontend/lib/syllabus.ts` as the ordering source.

## Binary file classification

Every repository file belongs to one of these two agent-facing classes:

- **[CONTENT FILE]** — learner-facing data and payloads, primarily `content/**`, `frontend/public/data/**`, `public/data/**`, `backend/kb/**`, `backend/.ocr-v2/**`, and authored material under `frontend/public/materials/**` / `frontend/public/resources/**`. This includes the large curriculum corpus and generated data. Read only the specific payload the task names or directly requires; never bulk-read, enumerate contents, or modify adjacent content speculatively.
- **[IMPORTANT CORE FILE]** — everything else: routes, UI, libraries, APIs, tests, build/config files, scripts, documentation, and tooling that control or explain platform behavior. “Core” means relevant to implementation, not that every such file should be read for every task.

Use the classifier without opening file contents:

```bash
npm run classify -- frontend/app/\(app\)/home/page.tsx content/ravikishan/class-11-notes/physics/example.json
npm run classify -- --all
```

`--all` inventories tracked and non-ignored untracked paths and summarizes counts with a few examples; it does not read content payloads. Add `--list` to print every path with its classification, still without opening file contents. The explicit path form classifies only the paths supplied. After work, report the classification of every file you changed.

## Fast architecture map

| Work area | Begin with | Then inspect only the relevant target |
|---|---|---|
| Frontend routes/navigation | `CORE_FILES.md`, `frontend/lib/navigation.ts`, `frontend/lib/site-index.ts` | Route page, linked component, closest test |
| Auth and tier access | `frontend/lib/access-level.ts`, `frontend/providers/auth-provider.tsx`, `(app)` layout and gates | Target gate/API and its focused tests |
| Frontend AI experience | AI route/component and `frontend/lib/api/ai.ts` | Matching backend API and focused UI/API tests |
| Backend API | `backend/src/app.ts` | Mounted route, direct service/middleware, endpoint tests |
| AI provider chain/prompts | `backend/src/ai/service.ts`, `backend/src/ai/prompts.ts` | Specific AI route/provider and its tests; never expose keys to frontend |
| Syllabus/content | `frontend/lib/syllabus.ts`, `frontend/lib/note-routes.ts` | Only the requested subject/unit/topic payload and its schema/test |
| Backend corpus retrieval | `backend/src/ai/curriculum-corpus.ts` and source tests | Only the named corpus/source record; do not inspect whole OCR or KB directories |
| Labs, graphs, PYQs, formulas | Registries in `CORE_FILES.md` | Specific registry entry and consumer |
| Build/check behavior | root and workspace `package.json`, `BRANCHES.md` | The one script/config implicated by the task |

The frontend is the Next.js app in `frontend/`; the Express API is in `backend/`; `content/`, `backend/kb/`, `backend/.ocr-v2/`, and `frontend/public/data/` hold curricular content or derived corpus; root `scripts/` and `content-tools/` hold shared tooling. `README.md` describes setup. `CORE_FILES.md` is authoritative when this summary differs from the code.

## What to avoid

- **Do not cold-read the codebase to answer "where/what/which" questions when the graphify graph can answer them** — run `graphify query` / `graphify path` / `graphify explain` first (graph at `graphify-out/graph.json`, auto-rebuilt by git hooks; rebuild with `graphify update .` if stale). Reading scattered files "to find context" is the exact problem the graph solves.
- Do not read all files, use recursive `cat`, or scan `content/**`, `backend/kb/**`, `backend/.ocr-v2/**`, or `frontend/public/data/**`. These contain thousands of payloads and are not architecture documentation.
- Do not guess routes, syllabus order, or access rules. Follow their canonical registries and existing tests.
- Do not read unrelated markdown, deep dependency trees, generated output, logs, or every similar component “for context.” Search for the named symbol, then read a bounded window.
- Do not change unrelated files, refactor by association, or treat generated/content files as source code.
- Do not place secrets in code, frontend variables, logs, or Git. Use ignored local env files and example placeholders only.
- Do not touch reserved live worktree branches listed in `BRANCHES.md`, force-push, or push area branches. `main` is production: run `npm run check:all` before a requested push.

## Validation and completion

- Run the narrowest relevant test first; fix failures caused by the change rather than suppressing them.
- `npm run check` is scoped to changed areas; `npm run check:all` is the full gate before pushing `main`.
- Keep the final report factual: list changes, validation results/limitations, and classify every touched file as **[IMPORTANT CORE FILE]** or **[CONTENT FILE]**.
