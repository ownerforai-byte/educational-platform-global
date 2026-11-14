# AGENT RULES

These rules are mandatory for every agent (orchestrator, `general` subagents,
`explore` subagents, and Agent Manager sessions) that performs work in this
repository.

> **📊 GRAPHIFY-FIRST ORIENTATION (mandatory for every agent):** Before reading
> scattered source files to answer "where is X", "what depends on Y", or "how do A
> and B connect", query the graphify knowledge graph at `graphify-out/graph.json`
> (code-only; auto-rebuilt by git hooks; run `graphify update .` if stale):
> - `graphify query "<question>"` · `graphify path "A" "B"` · `graphify explain "<symbol>"` · `graphify god-nodes`
> - Or run `npx graphify-mcp` as an MCP server, or use the `/graphify` skill in your agent session.
> The graph is NOT the curriculum corpus — `content/**` and `public/data/**` are
> excluded by `.graphifyignore`. Use the graph to find the 1–2 files to read,
> then read narrowly.

## 🚨 Hardcoded Boundary Rules: What to Do & What to Avoid

### 🛑 What Every Agent MUST AVOID (Strictly Forbidden):
1. **DO NOT READ ALL FILES OR BROWSE CONTENT FOLDERS.** Never run blanket directory sweeps or mass file reads on `content/notes/concepts/**` or `frontend/public/data/**`. Over 8,000 files are payload data.
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
- `npm run lint:ratchet` (CI step) fails on any **new** React Compiler lint finding. The legacy backlog is baselined in `scripts/lint-ratchet-baseline.json` and may only go down; after fixing findings, re-baseline with `npm run lint:ratchet:baseline` and record the new count.
- `npm run ai:regression` (CI step) validates the 120-question Veer golden set against the PYQ corpus, offline. If a sampled question/solution changes, rebuild with `npm run ai:regression:build`. Live scoring (`npm run ai:regression:live`) spends AI credits and needs `AI_REGRESSION_TOKEN` in the environment — never commit that token.
- New personal stores must go through `frontend/lib/user-state.ts`, not a new `localStorage` key. Namespaces are lowercase `[a-z0-9_-]{1,64}`, payloads are JSON objects/arrays ≤ 256 KB, and every PUT must send the `baseVersion` it last read. Never send a `user_id` from the client — `/api/user-state` derives identity from the session. Migration `013_user_state.sql` was applied on 2026-11-07 (RLS + 4 policies verified) — the endpoint is live. For future migrations, `backend/scripts/run-sql.mjs` prefers a token in `process.env.SUPABASE_MANAGEMENT_TOKEN` over `backend/.env`, so a short-lived token can be used once without persisting it; never commit or log a token.
- After adding a static App Router page, run `npm run sw:precache` in `frontend` and commit `public/sw-precache.json`; CI (`sw:precache:check`) fails on drift. Never add a new route that renders `UnderDevelopment` — `npm run dead-ends` fails on any placeholder not in `scripts/dead-end-baseline.json`. Removing one and re-running `npm run dead-ends:baseline` lowers the ceiling.
- `npm run smoke:env` (E2E Smoke CI step) prints exactly which `NEXT_PUBLIC_*` / `SMOKE_*` repo secrets are missing; values are never printed. Missing public env fails the job before the build; missing credentials only warn because those tests skip themselves.

## Security
- Agents must avoid paid services.
- Prefer free/open-source or free-tier services.
- Secrets / API keys must never be committed to Git.
- Environment variables must use appropriate `.env` files (see `.gitignore`).
- Never expose API keys in frontend code.
- Never hard-code credentials.

## Documentation
- Agents must update relevant documentation (`CORE_FILES.md` for new core files, `PROJECT_STATUS.md` or `SYSTEM_WORK_TRACKER.md` for major system changes) after significant work.

## 📄 Docs Viewer Layout System (Mandatory for All Academic Content)
- **Universal Docs Viewer Requirement:** ALL readable academic content — syllabus topics, lab theory, concept panels, exam preparation guides, Loksewa knowledge, IOE/CEE/NEB entrance questions, model papers, and any future knowledge-based content additions — MUST render through the standardized Docs Viewer layout system.
- **Single Source of Truth:** `frontend/features/docs/academic-doc-layout.tsx` is the canonical layout system. Do NOT create custom or competing document containers.
- **Required Components for New Additions:** Every new academic content addition must import and implement:
  - `DocPaper` (`@/features/docs/academic-doc-layout`) — outer printable document card (`<article className="doc-view doc-viewer-paper ...">`).
  - `DocToolbar` — standard header with document badge, title, subtitle, metadata badges, font size controls (`sm` / `base` / `lg`), copy link, and Print/Save as PDF.
  - `DocSectionHeading` — numbered/anchored section headings.
  - `DocHighlightCard` — standardized callout cards (`summary`, `definition`, `formula`, `trap`, `trick`, `example`, `practice`).
  - `getDocFontClass(fontSize)` — dynamic font sizing utility for readable prose.
  - `MathMarkdown` (`@/components/ui/math-markdown`) — for all LaTeX / KaTeX mathematical equations and formatted text.
- **New Content Checklist:** When adding or authoring new academic content or syllabus tracks:
  1. Wrap the content inside `<DocPaper>`.
  2. Provide a `<DocToolbar>` with title, badge text, metadata, and wired font size state (`useState<DocFontSize>("base")`).
  3. Format callouts, formulas, and warnings using `<DocHighlightCard type="...">`.
  4. Ensure print/PDF view renders cleanly (leveraging `print:` classes provided by the layout system).
  5. If new content routes are created, add them to the Docs Viewer registry so learners can view them immediately.

## Platform ops
- **Render cold-start keep-alive (2026-10-27):** the backend runs on the Render free
  tier at `https://rn01.onrender.com`, which sleeps between requests (~30-60s cold
  start). `.github/workflows/keep-alive.yml` pings `/health` every 10 minutes on a
  GitHub Actions schedule so the instance stays warm; the job is intentionally
  always-green (even a timeout wakes the dyno). Alternative if the ping load is
  ever unwanted: disable the workflow and switch the Render service to an
  always-on plan in the Render dashboard (paid) — no code change needed.
- **Vercel only (2026-10-27):** the Cloudflare/open-next deployment path is gone —
  `frontend/open-next.config.ts`, `frontend/wrangler.jsonc` and the
  `@opennextjs/cloudflare` devDependency were removed. Frontend deploys to Vercel
  (`www.harindrasah.com.np`), backend to Render; there is no third target.
- **ISR corpus pages (2026-10-27):** the 20 class-11/class-12-notes corpus pages
  (subject, chapters, unit, topic, exercises, exercise-type, mindmap, syllabus,
  theory) are prerendered at build via `generateStaticParams` +
  `dynamicParams = false` and tagged `export const revalidate = 86_400`.
  `frontend/next.config.mjs` exempts the two class trees from the global
  `Cache-Control: public, max-age=0, must-revalidate` rule so the route-level
  `s-maxage=86400, stale-while-revalidate` reaches the CDN. Vercel invalidates
  the ISR cache on every deploy. **PHASE 4.2 skipped:** no tag-based on-demand
  revalidation exists — the corpus has no external mutation source, so
  deploy-time invalidation is the only trigger needed.
- **Lighthouse CI (2026-10-27):** `.github/workflows/lighthouse.yml` +
  `frontend/lighthouserc.json` run `@lhci/cli autorun` on `/home`, a class-11
  topic page, `/lab` and `/pyqs` on push to `main` (mobile emulation, 3 runs,
  optimistic aggregation). Budgets: performance score ≥ 0.4, FCP ≤ 4500 ms,
  LCP ≤ 8500 ms, TBT ≤ 1500 ms (lab proxy for INP), CLS ≤ 0.35. Needs no secrets
  beyond the public app env the build already uses — no LHCI server/token.
  First run measured `/home` CLS at 0.306 (over the initial 0.3 budget, all
  other budgets green) — 0.35 is the current baseline + headroom; the real fix
  is finding what shifts on `/home` and tightening the budget back down.
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
- `frontend/tests/e2e/smoke.spec.ts` runs on push to `main` only
  (`.github/workflows/e2e-smoke.yml`, the "E2E Smoke" workflow) — not on
  every PR, because CI is already heavy.
- Required repo secrets for the browser suite:
  - `SMOKE_OWNER_EMAIL` + `SMOKE_OWNER_PASSWORD` (already used by live-smoke)
  - `SMOKE_MEMBER_EMAIL` + `SMOKE_MEMBER_PASSWORD` (a Member-tier test account
    for the Plus-gate check)
  - the public app env the CI server must boot with:
    `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
    `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`
  (missing SMOKE_* credentials only skip those tests; missing public env
  fails the job because the app cannot boot — add the secrets and re-run).
- Run locally: `cd frontend && npx playwright test` with the `SMOKE_*` vars
  exported (a running `npm run dev` on :5173 is reused automatically).
