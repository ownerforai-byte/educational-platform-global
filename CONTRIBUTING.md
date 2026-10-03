# Contributing

**Ravikishan's Platform** is an open study platform for NEB Class 11 & 12 (Nepali +2)
students: a free, offline-capable PWA with an AI tutor ("Veer") grounded in the real
syllabus + ingested textbooks, live web cross-checks, streamed answers, and AI-drawn
figures — across Physics, Chemistry, Biology, Mathematics, English and Nepali.

> Agents and humans alike: read **[`BRANCHES.md`](BRANCHES.md)** first — it maps
> every area of this codebase to its branch and defines the checks.

## Getting started

Prerequisites: **Node 22+** (monorepo: `backend` workspace via npm workspaces).
Optional, only when ingesting books: **poppler** (`pdftotext`) and `unzip`.

```bash
git clone https://github.com/ownerforai-byte/educational-platform-global.git
cd educational-platform-global
npm install                 # installs the backend workspace

# configuration
cp .env.example backend/.env             # AI keys (AGNES_API_KEY, …) + Supabase admin key
cp frontend/.env.example frontend/.env   # Supabase + NEXT_PUBLIC_API_URL
```

Run both halves:

```bash
npm run dev:backend         # Express API (tsx watch, backend/src/index.ts)
cd frontend && npm run dev  # Next.js 15 App Router
```

## Branch model

- `main` is the only deployable branch (pushing it triggers the Vercel
  production deploy + Render backend deploy).
- 48 area branches exist for parallel work: `content/*` (subjects),
  `feature/*` (frontend routes), `backend/*` (API areas), `test/*`, `ci/*`,
  `chore/tooling`, `docs/agents-guides`. All start at `main`.
- One area per branch: keep your change inside your branch's area (see the
  map in `BRANCHES.md` §2). Cross-area changes need justification in the PR.
- Reserved branches — other sessions' live worktrees, never touch:
  `agents/*`, `claude/*`, `worktree/*` (`BRANCHES.md` §4).
- Merge back to `main` often; delete a branch only after
  `git branch --merged main` confirms it. Never force-push; never push all
  branches at once (each branch push costs a Vercel preview build).

## Checks

| When | Command |
|---|---|
| Before every commit | `npm run check` — runs only the areas you touched |
| Before pushing `main` | `npm run check:all` — full gate (content JSON + frontend tsc/tests + backend tsc/tests) |
| Backend suites | `npm test` (security-policy, auth-flow, hardening, AI pipeline, truncation, image-gen, …) |
| Type gates | `npx tsc --noEmit -p backend/tsconfig.json` · `cd frontend && npx tsc --noEmit` |

## Area guides

| Area | Where the work lives |
|---|---|
| Notes & data (1,200+ JSON topics) | `content/ravikishan/**` — Zod-validated, `npm run content:build` (gate: `content:build:check`), health: `content:doctor` |
| Topic registry (single source of truth: topic → place → route) | `frontend/lib/topic-registry.ts`, `npm run registry:build` / `registry:check` |
| AI pipeline (chat chain, streaming, figures) | `backend/src/ai/**` — provider chain (Agnes → OpenRouter → internal), live SSE streaming, truncation repair, figure generation (`image-gen.ts`: Agnes image models + browser-side puter.js fallback), all unit-tested in `backend/tests/` |
| Content UI / chat surfaces | `frontend/components/**`, `frontend/app/**` |
| Security posture | generic error bodies only (`x-error-id` + internal correlation), every route scopes data by `req.user.id` (no IDOR), production CORS allowlist, auth rate limits |

## Content pipeline

Curriculum content flows `scrape → transform → load` for NEB Class 11/12 and is
verified against a coverage snapshot. Book ingestion (PDF/MD/DOCX → JSON records)
lives in `backend/scripts/ingest-books.ts` and feeds the tutor's
`[CURRICULUM SOURCE]` context.

## Commits & PRs

- Use task labels from `project-conductor.md` §3: `feature:`, `bugfix:`,
  `scrape:`, `transform:`, `load:`, `setup:`, `config:`, `docs:`, `test:`.
- Fill in the PR template (area branch + check results).
- No secrets in git — verify with
  `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'`.
- Read order for agents: `CLAUDE.md` / `AGENTS.md` → `BRANCHES.md` →
  `project-conductor.md` → `AGENT_RULES.md`.

## Reporting & proposing

- **Bugs**: open an issue with the exact repro (URL/route, subject, class, the
  failing command and its output).
- **Content**: use the `content/*` area branch for the subject you're touching;
  run `npm run content:build` and the schema check before merging.
- **Code**: open the relevant `feature/*` branch, keep it to one area, pass the
  gates above, then merge back to `main`.
