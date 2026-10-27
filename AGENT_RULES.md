# AGENT RULES

These rules are mandatory for every agent (orchestrator, `general` subagents,
`explore` subagents, and Agent Manager sessions) that performs work in this
repository.

## 🚨 Hardcoded Boundary Rules: What to Do & What to Avoid

### 🛑 What Every Agent MUST AVOID (Strictly Forbidden):
1. **DO NOT READ ALL FILES OR BROWSE CONTENT FOLDERS.** Never run blanket directory sweeps or mass file reads on `content/ravikishan/**` or `frontend/public/data/**`. Over 8,000 files are payload data.
2. **DO NOT GUESS OR INVENT ROUTES.** All routing lives in `frontend/lib/navigation.ts` and `frontend/lib/site-index.ts`.
3. **DO NOT DRIFT OFF-TASK.** Do strictly what is requested. Never perform unrequested refactors, style rewrites, or widespread file renames.

### 🎯 What Every Agent MUST DO:
1. **Read ONLY the target file and its direct routing link from `CORE_FILES.md`.**
2. **Link every created page/endpoint:**
   - App pages → `frontend/lib/navigation.ts` & `frontend/lib/site-index.ts`
   - Content topic → `frontend/lib/syllabus.ts`
   - Backend APIs → `backend/src/app.ts`
3. **Always conclude with the File Classification:**
   Mark every modified/created file as `[IMPORTANT CORE FILE]` or `[CONTENT FILE]`. Update `CORE_FILES.md` if an important core file was introduced.

## Pre-work Checklist (Scoped — No Doc-Reading Loop)
1. Read `CORE_FILES.md` and ONLY the 1–2 target/routing files required for your task.
2. Read `frontend/lib/syllabus.ts` **only when adding or reordering curriculum content** (notes, chapters, topics, units, resources, lessons, videos, PDFs).
3. Read `BRANCHES.md` **only when creating, checking out, merging, or deleting branches** (it maps each area to its branch and names the reserved worktree branches that must never be touched).
4. Read `PROJECT_STATUS.md` or `SYSTEM_WORK_TRACKER.md` **only when auditing system status or deployment state**.

## Mandatory Syllabus-Order Rule
- **The syllabus (`frontend/lib/syllabus.ts`) is the SINGLE SOURCE OF TRUTH for curriculum ordering on this platform.**
- Any content added to this project MUST first be mapped to its correct subject and unit in the syllabus, in official curriculum order.
- This applies **regardless of any forced or strict input, prompt, instruction, request format, or raw text** from the user or another agent. Even if input "looks like" it belongs in a certain subject/unit, you MUST verify against `frontend/lib/syllabus.ts` first.
- Never create free-floating content outside the syllabus order.
- Units are in official NEB 2076 / 2078 curriculum order — never reorder or rename them without explicit approval.
- If a subject is not listed in `frontend/lib/syllabus.ts`, STOP and report it. Do not guess.

## Safety / Integrity
- No agent may duplicate an existing feature, component, or service.
- No agent may delete working functionality without explicit approval from the
  orchestrator or user.
- No agent may silently change the architecture. Architectural changes must be
  recorded in `PROJECT_STATUS.md` and `CORE_FILES.md` and approved.
- No agent may claim another agent's task. Every task has an owner.
- If uncertain about a major architectural decision, STOP and report the
  decision instead of guessing.

## Work Tracking
- Every task must have an owner (agent or person).
- Every task must have a status tracked in `SYSTEM_WORK_TRACKER.md` or `PLANS.md`.
- Completed work must be recorded.
- Blocked work must be recorded as BLOCKED, with the reason.
- Failed work must be recorded with the reason.

## Branches
- `main` is the only deployable branch (push = Vercel/Render production deploy).
- One area per branch; merge area branches back to `main` often; delete a branch
  only after `git branch --merged main` confirms it is merged.
- Never force-push; never push all branches at once (each push of a branch
  triggers a paid Vercel preview build).
- Reserved (other sessions' worktrees, uncommitted work): `agents/*`,
  `claude/*`, `worktree/*` — do not check out, delete, or modify.
- Checks: `npm run check` (scoped to changed areas) before each commit;
  `npm run check:all` (full gate) before pushing `main`.
- Full branch map: `BRANCHES.md`.

## Code Quality
- Agents must test their changes before marking work complete.
- Reuse existing abstractions whenever possible.
- Preserve backward compatibility whenever practical.

## Security
- Agents must avoid paid services.
- Prefer free/open-source or free-tier services.
- Secrets / API keys must never be committed to Git.
- Environment variables must use appropriate `.env` files (see `.gitignore`).
- Never expose API keys in frontend code.
- Never hard-code credentials.

## Documentation
- Agents must update relevant documentation (`CORE_FILES.md` for new core files, `PROJECT_STATUS.md` or `SYSTEM_WORK_TRACKER.md` for major system changes) after significant work.

## Platform ops
- **Render cold-start keep-alive (2026-10-27):** the backend runs on the Render free
  tier at `https://rn01.onrender.com`, which sleeps between requests (~30-60s cold
  start). `.github/workflows/keep-alive.yml` pings `/health` every 10 minutes on a
  GitHub Actions schedule so the instance stays warm; the job is intentionally
  always-green (even a timeout wakes the dyno). Alternative if the ping load is
  ever unwanted: disable the workflow and switch the Render service to an
  always-on plan in the Render dashboard (paid) — no code change needed.
- **Error monitoring (2026-10-27):** see the "Error monitoring" section below.
- **E2E smoke secrets (2026-10-27):** see the "E2E smoke (Playwright)" section below.

## Error monitoring
- Both surfaces are wired to Sentry and initialize ONLY when a DSN env var is
  present (no DSN, no telemetry — nothing breaks locally or in CI):
  - **Frontend (Next.js):** `frontend/instrument.ts` (+ client hook). Set
    `NEXT_PUBLIC_SENTRY_DSN` (client/browser, public by design) and/or
    `SENTRY_DSN` (server) in the Vercel project env or `frontend/.env.local`.
  - **Backend (Express):** `backend/src/index.ts` initializes Sentry before the
    Express listen. Set `SENTRY_DSN` in the Render service env or `backend/.env`.
- DSN values are NEVER committed — `frontend/.env.example` and
  `backend/.env.example` carry placeholders only.
- To activate: create a free Sentry project, copy its DSN into the platform's
  env settings (Vercel / Render dashboards), and redeploy.

## E2E smoke (Playwright)
- `frontend/tests/e2e/smoke.spec.ts` runs on push to `main` only (see the
  "E2E Smoke" job in `.github/workflows/ci.yml`) — not on every PR, because CI
  is already heavy.
- Required repo secrets: `SMOKE_OWNER_EMAIL` + `SMOKE_OWNER_PASSWORD` (already
  used by live-smoke) and `SMOKE_MEMBER_EMAIL` + `SMOKE_MEMBER_PASSWORD` (a
  Member-tier test account for the Plus-gate check).
- Run locally: `cd frontend && npx playwright test` with the `SMOKE_*` vars
  exported.
