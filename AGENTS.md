# AGENTS.md — agentic workflow spec (read before every edit)

This repository uses an agentic workflow. Every coding agent must read
`project-conductor.md` before making any edit or commit.

Rule 0 — **where the workflow lives**:
This file points at `project-conductor.md`. The canonical spec is there: role
assignment, task classification, acceptance criteria, and file map. Keep
`project-conductor.md` in sync before changing the workflow.

Rule 0b — **branches**:
Read `BRANCHES.md` before creating, checking out, merging, or deleting any
branch, and before editing files (it maps every area to its branch: 48 area
branches like `content/physics`, `feature/ai-chat`, `backend/auth-api`).
`main` is the only deployable branch; merge area branches back often; never
push all branches (each one costs a Vercel preview build).

Rule 1 — **read before edit**
Before making any change, read `project-conductor.md`, `BRANCHES.md`, and the
target file(s).
Reference the task-block type (`feature:`, `bugfix:`, `scrape:`, `transform:`,
`load:`, `setup:`, `config:`, `docs:`, `test:`) and pick the model accordingly:
Qwen 3.8/3.7 for core logic, GLM 5.3 for CRUD, MiniMax 2.6 Pro for UI, Solar
Mini for tests, Solar Pro for review.

Rule 2 — **secrets hygiene**
Never commit a generated secret. Before any commit:
`git log -S "<key-value>" -- <file>` and
`git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'`
must be clean.

Rule 3 — **acceptance gates**
- Scope checks with `npm run check` (only the areas you touched); run
  `npm run check:all` (the full gate) before pushing `main`. See `BRANCHES.md` §3.
- All committed backend files pass `npx tsc --noEmit` in the backend workspace.
- All committed frontend files pass `npx next build` (Turbopack) with exit 0.
- `npm test` (or vitest suite) passes: security-policy (14), auth-flow (21),
  hardening (27).
- No IDOR: every route scopes data by `req.user.id` (or equivalent owner check).
- Generic error bodies only (`x-error-id` + internal log correlation).
- Production rate limits: auth 5/min window, 3/hour reset; default 60/min.
- CORS: strict allowlist in production (no wildcards).
- Content pipeline: `scrape → transform → load` for NEB Class 11/12, verified
  against a coverage snapshot.
- `project-conductor.md` labels + acceptance criteria present in new task tags.

Overriding guidance: if the user says "do not change the workflow file" or "I
requested X", the explicit user request wins. Otherwise this file is the
authoritative plan for the agentic workflow run.
