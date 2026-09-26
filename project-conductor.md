# 🧩 Project Conductor — Agentic Workflow Spec

> **Rule 0:** This file lives in the repository root. Any coding agent assigned to this project MUST read it before making an edit. It defines who does what, which model may be used for which task, and how work is scoped.
>
> **Rule 0b (branches):** Read `BRANCHES.md` before creating, checking out, merging, or deleting any branch, and before editing files. It maps every area to one of the 48 area branches (`content/physics`, `feature/ai-chat`, `backend/auth-api`, `test/*`, `ci/*`…), names the 4 reserved worktree branches that must never be touched, and defines the scoped-check commands (`npm run check` / `npm run check:all`).

> **Rule 2 (reproducibility):** Never commit a generated secret to git. Before committing, run `git log -S "<key-value>" -- <file>` and `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'` to confirm the workspace is clean.

---

## Table of Contents

1. [Role Assignment](#1-role-assignment)
2. [Agent Responsibilities & Task Inventory](#2-agent-responsibilities--task-inventory)
3. [Task Classification (Block Types)](#3-task-classification-block-types)
4. [How to Use This Spec](#4-how-to-use-this-spec)
5. [Acceptance Criteria & Quality Gates](#5-acceptance-criteria--quality-gates)
6. [Where to Look (File Map)](#6-where-to-look-file-map)
7. [Branch Workflow](#7-branch-workflow)

---

## 1. Role Assignment

| Agent | Role | Model(s) | Primary Mandate |
|---|---|---|---|
| **Agent** | **Role** | **Model** | **Primary mandate** |
|---|---|---|---|
| `Cline` | Main orchestrator / repository maintainer | Qwen 3.7 | Owns cross-cutting changes, file structure, DB schema, API endpoints, and the agentic workflow itself. Delegates complexity to Qwen 3.7 for core logic. |
| `Qwen 3.8` | Core logic & architecture | Qwen 3.8 | Search/filter algorithms, complex DB queries (HyPertable/Supabase RLS + index selection), AI chain routing (agnes → openrouter → internal), authZ/authN middleware. |
| `Qwen 3.7` | Core logic & architecture | Qwen 3.7 | Search/filter algorithms, complex DB queries (HyPertable/Supabase RLS + index selection), AI chain routing (agnes → openrouter → internal), authZ/authN middleware. |
| `GLM 5.3` | Feature + routine backend | GLM 5.3 | Standard CRUD endpoints for syllabus content (chapters, topics, notes, pyqs), user profile management, DB migration scripts. |
| `MiniMax v2.6 Pro` | Frontend UI/UX | MiniMax v2.6 Pro | Responsive Tailwind layouts, interactive quizzes, chapter progression trackers, student dashboards, progress/streak/certificate UI. |
| `Solar Mini` | Tests & harness | Solar Mini | Extensive unit tests for scraping + backend endpoints, NEB Class 11/12 seed-data validation. |
| `Solar Pro` | Reviewer & optimizer | Solar Pro | Performance review of generated code, CI quality gates, build validation. |

---

## 2. Agent Responsibilities & Task Inventory

### 2.1 Cline (primary, orchestrator)
- Creates file structures and directory conventions for the NEB syllabus platform.
- Owns the agentic workflow spec itself (`project-conductor.md`).
- Delegates work and validates completion (read-back, build, test).
- Runs `/api/*` endpoints, DB schema migrations, and content-tagging flows.
- **Blocking rule:** never commits secrets; always verify with `git grep`.

### 2.2 Qwen 3.8 (core logic)
- Design and implement the search & filter algorithm for chapters (exact / fuzzy / tag-based).
- Write the complex DB queries (HyPertable / Supabase RLS policies + index selection).
- Implement the AI chain routing middleware (agnes → openrouter → internal).
- AuthZ/AuthN middleware: per-user `user.id` scoping, owner-guard checks, mass-assignment rejection.

### 2.2 Qwen 3.7 (core logic fallback)
- Use Qwen 3.7 as the fallback for Qwen 3.8 when Qwen 3.8 returns degraded results.
- Same core tasks: search/filter, DB queries, AI chain routing, authZ/authN middleware.
- Design and implement the search & filter algorithm for chapters (exact / fuzzy / tag-based).
- Write the complex DB queries (HyPertable / Supabase RLS policies + index selection).
- Implement the AI chain routing middleware (agnes → openrouter → internal fallback).
- AuthZ/AuthN middleware: per-user `user.id` scoping, owner-guard checks, mass-assignment rejection.

### 2.3 GLM 5.3 (feature + routine backend)
- Standard CRUD endpoints for syllabus content (chapters, topics, notes, pyqs).
- User profile management endpoints (Create / Read / Update / Delete).
- DB migration scripts (Supabase migrations + seed data for NEB classes 11/12).

### 2.4 MiniMax v2.6 Pro (frontend)
- Responsive Tailwind layouts for syllabus tables, chapter grids, and pyq banks.
- Interactive quiz components + chapter progression tracker.
- Student dashboard UI (progress, streaks, certificates).

### 2.5 Solar Mini (quality & harness)
- Unit tests: scraping scripts (NEB PDF/web extraction), backend endpoint coverage.
- Seed-data validation for NEB Class 11 & 12 content.
- CI test runner + coverage threshold enforcement.

---

## 3. Task Classification (Block Types)

Use these labels as YAML/JSON block headers inside any task-tracking file or PR description.

### 3.1 `feature:`
- Adds new user-visible functionality.
- Example: `/owner` console, `/ai` Studio page, AI chain routing middleware, per-user chat history, chapter search & filter UI.

### 3.2 `bugfix:`
- Fixes incorrect behavior.
- Example: generic error response (`x-error-id`), helmet → security-headers replacement, tiered rate limits, CORS allowlist, no-IDOR route scoping.

### 3.3 `scrape:` / `transform:` / `load:` (data pipeline)
- `scrape:` raw NEB content from PDFs / the web → JSON/raw dump.
- `transform:` clean + restructure (fields, tags, class/subject/slug).
- `load:` insert into Supabase + seed coverage validation (11 / 12 / both).

### 3.4 `setup:` / `config:`
- Infra, env, CI, and package wiring.
- Example: environment gate, `.env.example`, nginx/render config, Vercel runtime, `scripts/ensure-deps.mjs`.

### 3.5 `docs:`
- Offboarding docs, `SECURITY.md`, `project-conductor.md`, migration notes, README sections.

### 3.6 `test:` / `qa:`
- `@testing-library`/vitest suites, contract tests, benchmark scripts, playwright/e2e flows for login + content navigation.

---

## 4. How to Use This Spec

- Before **any** edit: read `project-conductor.md` + the target file(s).
- Before **any** edit touching branches or multiple areas: read `BRANCHES.md`.
- Before **any commit**: run `git log -S` + `git grep -n -E "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=" -- . ':!node_modules' ':!*.md'` and confirm zero hits.
- Use the block types above in tracking files and PR descriptions so reviewers immediately know the intent of each change.
- When in doubt about which model to delegate to, ask Cline first. Qwen 3.8/3.7 for core logic, GLM 5.3 for CRUD, MiniMax 2.6 Pro for UI, Solar Mini for tests.

---

## 5. Acceptance Criteria & Quality Gates

- [ ] No secret keys ever land in the working tree or git objects (`git grep` clean).
- [ ] All committed backend files pass `npx tsc --noEmit` in the backend workspace.
- [ ] All committed frontend files pass `npx next build` (Turbopack) with exit 0.
- [ ] `npm test` (or vitest suite) passes: security-policy (14), auth-flow (21), hardening (27).
- [ ] No IDOR: every route scopes data by `req.user.id` (or equivalent owner check).
- [ ] Generic error bodies only (`x-error-id` + internal log correlation).
- [ ] Production rate limits: auth 5/min window, 3/hour reset; default 60/min.
- [ ] CORS: strict allowlist in production (no wildcards).
- [ ] Content pipeline: `scrape → transform → load` for NEB Class 11/12, verified against a coverage snapshot.
- [ ] All `project-conductor.md` labels + acceptance criteria present in new task tags.
- [ ] `npm run check:all` passes before pushing `main` (scoped `npm run check` before each commit).

---

## 6. Where to Look (File Map)

| Area | Key Paths |
|---|---|
| Backend entrypoint | `backend/src/index.ts` |
| AI orchestration | `backend/src/ai/service.ts` (agnes → openrouter → internal) |
| AuthZ/AuthN + middleware | `backend/src/middleware/` (securityHeaders, errors, rateLimit, cors) |
| Config / env gate | `backend/src/config/env.ts` |
| Testing | `backend/tests/security-policy.test.ts` (14), `auth-flow.test.ts` (21), `hardening.test.ts` (27) |
| Frontend layout | `frontend/components/layout/app-shell.tsx`, `mobile-nav.tsx` |
| Content model | `backend/src/db/mock-db.ts`, Supabase migrations |
| Secrets hygiene | `git log -S`, `git grep -n "vcp_|sbp_|AIza|sk-|KEY=|TOKEN="` |

---

## 7. Branch Workflow

Full map and rules: **`BRANCHES.md`** (read it before touching branches).

- `main` is the only deployable branch — pushing it triggers the Vercel
  production deploy. Area branches: `content/*` (10), `feature/*` (22),
  `backend/*` (6), `test/*` (4), `ci/*` (4), `chore/tooling`, `docs/agents-guides`.
- One area per branch; merge back to `main` often; delete only after
  `git branch --merged main` confirms the merge.
- Never force-push; never push all branches (each costs a Vercel preview build).
- Reserved — other sessions' live worktrees, never touch:
  `agents/greeting-response`, `claude/biology-notes-content-a50317`,
  `claude/eloquent-chandrasekhar-a7839c`, `worktree/roo-ifbdm`.
- Checks: `npm run check` (scoped to changed areas) before each commit,
  `npm run check:all` (full gate: content JSON + frontend tsc/tests + backend
  tsc/tests) before pushing `main`.
