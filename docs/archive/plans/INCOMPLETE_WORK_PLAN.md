# Incomplete Work Plan — ranked by importance

Source of truth used: `PROJECT_STATUS.md`, `SYSTEM_WORK_TRACKER.md`, `plan.md`,
`plan-hardening-pass.md`, `plan-veer-chat-redesign.md`, `plan-pro-app.md`.
This is a status audit, not a claim that every item was re-verified in code.
Items marked *unverified* were taken from the status docs only.

Priority: **P0** = release/security/data risk or time-critical · **P1** = important
for quality or launch · **P2** = polish, later.

---

## P0 — do first

### 0.1 Time-critical: leftover Puter token (expires 2026-12-04)
- Source: `plan.md` line 592. Re-checked 2026-11-10: the README has **no** Puter reference, in the tree or in its history (`git log -S "puter" -- README.md` is empty). The `plan.md` claim looks stale, so the token may sit in another file.
- Status: **owner action** — I cannot revoke provider tokens from this workspace.
- Level: **Owner** (revoke/rewrite); no code change in the workspace.
- Concerned files:
  - `SECURITY.md` lines 68–71 — the token is in history at `4d73f538^`; expires 2026-12-04; can be removed with `git filter-repo`. This is the most specific record and conflicts with the README note above.
  - `plan.md` line 592 — original P0 entry.
  - `INCOMPLETE_WORK_PLAN.md` (this item) — status tracker.
  - Workspace search for "puter" (case-insensitive) in `*.md, *.json, *.ts, *.js, *.mjs, *.yml, *.env`: no live token string found in tracked docs. Hits are only `frontend/lib/puter-*.ts` (code names) and `graphify-out/` (generated). Token value was not read.
- Plan:
  - [ ] Owner: confirm where the token was, and revoke it at the provider now.
  - [ ] Owner: decide whether to rewrite history (`git filter-repo`). Do not force-push `main` without approval (`BRANCHES.md`).
  - [ ] Then confirm the token string is absent from the tree and history.

### 0.2 Secrets hygiene in the workspace — DONE (verified 2026-11-10)
- `cloudflare-token.txt` is gitignored (`.gitignore:150`), not tracked, and has no commits in `git log --all`. Contents were not read.
- Remaining: none for the repo. If the token value is live, rotation is still an owner action.
- Level: **Done**. Concerned file: `.gitignore:150` (ignores `cloudflare-token.txt`).

### 0.3 Owner sign-in E2E — RESOLVED (verified 2026-11-11); member sign-in still skipped
- Supersedes the old "owner sign-in E2E is red in CI" claim from
  `SYSTEM_WORK_TRACKER.md` / `plan-hardening-pass.md`. That claim is stale.
- Verified against the E2E Smoke run for `c3e4dd11`: preflight reports
  `SMOKE_OWNER_EMAIL`, `SMOKE_OWNER_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` all present; the owner sign-in test runs and
  the suite reports `4 passed, 1 skipped`. Live Smoke reports every auth probe
  PASS (login 200 + cookies, refresh rotation 200, `/me` 200, logout 200,
  anonymous writes 401/403). All 17 check-runs green.
- Remaining gap: `SMOKE_MEMBER_EMAIL` and `SMOKE_MEMBER_PASSWORD` are NOT set,
  so the member / Plus-gated sign-in test is the one that skips. The workflow
  already emits an explicit warning for both missing secrets.
- Plan:
  - [x] Add the two public Supabase values as CI secrets (present).
  - [x] Confirm `SMOKE_OWNER_EMAIL` / `SMOKE_OWNER_PASSWORD` (present).
  - [x] Confirm owner sign-in E2E and Live Smoke auth probes pass.
  - [ ] Owner: add `SMOKE_MEMBER_EMAIL` / `SMOKE_MEMBER_PASSWORD` so the
        member Plus-gated sign-in spec stops skipping. No code change needed.
- Level: **owner secrets only**; auth code is healthy.
- Concerned files:
  - `.github/workflows/live-smoke.yml` lines 19–23 — reads `SMOKE_OWNER_EMAIL` / `SMOKE_OWNER_PASSWORD`; targets `https://rn01.onrender.com`.
  - `.github/workflows/e2e-smoke.yml` — reads the two public Supabase values and all four `SMOKE_*` credentials.
  - `.github/workflows/lighthouse.yml` lines 34–35 — same two public values.
  - `frontend/tests/e2e/smoke.spec.ts` lines 61–67 (owner) and 114–116 (member) — in-body skips.
  - `AGENT_RULES.md` lines 149–153 — documents the required secret names.

### 0.4 Eight accounts without a `profiles` row (owner decision pending)
- Source: `PROJECT_STATUS.md` "Live database audit" (2026-11-07). Backfill SQL is written but **not executed**.
- Plan:
  - [ ] Owner decides whether the 8 `auth.users` rows are live accounts.
  - [ ] If yes, run the preserving backfill (`access_status = 'ACTIVE'`) from that section.
  - [ ] If no, leave them; they stay `PENDING`/absent by design.
  - [ ] Re-run the Supabase advisors after the decision.
- Level: **Owner decision**, then a one-off data change. No code change is needed.
- Concerned files:
  - `PROJECT_STATUS.md` lines 543–550 — audit note and the commented, not-executed backfill SQL (`access_status = 'ACTIVE'`).
  - `backend/src/db/migrations/002_profiles_trigger.sql` lines 7, 31 — original one-time backfill for users created before the trigger.
  - `backend/src/db/migrations/005_profile_access_status.sql` lines 19–30 — adds `access_status` (default `PENDING`) and its check constraint; this default is why a naive backfill would lock users out.

### 0.5 Deploy target and local env — PARTLY STALE (checked 2026-11-10)
- `backend/.env` **exists** locally and is gitignored (`.gitignore:33`). The "missing `backend/.env`" note in `PROJECT_STATUS.md` is out of date. Its contents were not read.
- `backend/.env.example` exists.
- Remaining: **owner decision** on the deploy target. Track 7 says Vercel frontend + Render backend, verified live; `PROJECT_STATUS.md` still says UNDECIDED. Reconcile that line once the owner confirms.
- Level: **Owner decision** for the target; **Docs** to reconcile the status line.
- Concerned files:
  - `backend/.env.example` and `backend/.env` (local, gitignored via `.gitignore:33`; contents not read).
  - `frontend/vercel.json` — Vercel frontend config (the only deploy config file found; no `render.yaml` in the repo).
  - `.github/workflows/live-smoke.yml` line 20 — `SMOKE_BASE_URL` points at Render (`rn01.onrender.com`), which backs the "Render backend" claim.
  - `.github/workflows/keep-alive.yml` — the cron ping for Render cold starts. Opened in a later pass: runs every 10 minutes, curls `https://rn01.onrender.com/health`, and never fails the run.
  - `PROJECT_STATUS.md` — the "UNDECIDED" line to reconcile.

### 0.6 Repo cleanup of sensitive/bulk artifacts — PARTLY DONE (checked 2026-11-10)
- `frontend/trace.txt`: **already out of the tree** (no longer tracked, not present). It stays in git history from two earlier commits (`7c157730`, `98cdcee4`), so the repo is still large. Rewriting history is an owner decision.
- Still tracked: `frontend/public/data/content/manifest.json` (this is a **CONTENT FILE** — do not touch without the owner), plus `content/_index.json` and several other `manifest.json` files. No `*.aab` is tracked, so that item is gone.
- Remaining (owner decision): move the KB + OCR corpus out of the public repo (`backend/kb/**`, `backend/.ocr-v2/**`); decide whether build-output manifests should stay tracked.
- Level: **Owner decision** (history rewrite, corpus move); **Content** files must not be edited by the agent.
- Concerned files:
  - `frontend/public/data/content/manifest.json` — **CONTENT FILE**, tracked (listed as tracked in the original audit). Do not touch.
  - `content/_index.json` and other `manifest.json` files — **CONTENT FILE**, tracked.
  - `backend/kb/**` and `backend/.ocr-v2/**` — **CONTENT FILE** corpus; the move is an owner decision.
  - `vendor/books/_ocr_*.json` and `vendor/books/_scan_*.json` (e.g. `_ocr_ex13.json`, `_scan_p37_120.json`) — OCR scan payloads at the repo root **not listed in the original plan**. Tracked status not verified; add to the corpus-move decision if tracked.
  - `frontend/trace.txt` — its history note is in the commit list above (`7c157730`, `98cdcee4`); the rewrite decision is the same `git filter-repo` decision as 0.1 (see `SECURITY.md` lines 68–71).
  - `.gitignore` — gitignore rules for env files, which already cover the secrets items.

---

## P1 — important for quality and launch

### 1.1 Frontend lint backlog (React Compiler rules)
- Level: **Code** (frontend lint; no content or owner decision needed).
- Concerned files:
  - `frontend/eslint.config.mjs` — where the react-hooks v7 rules are set to `warn`.
  - `frontend/components/ai/tutor-console.tsx` (recounted: 9 problems; 10 react-hooks rule hits), `frontend/components/lab/schematic-diagram.tsx` (recounted: 9), `frontend/components/ai/ai-chat-interface.tsx` (recounted: 8), `frontend/components/lab/physics-3d-wave-optics.tsx` (recounted: 15 react-hooks hits). Recounted by running `npx eslint` on these four files on this pass; the earlier numbers (8/8/7/6) were out of date. The repo-wide total was not recounted.
  - Counts are from `SYSTEM_WORK_TRACKER.md`; not re-run in this pass.
- Source: `SYSTEM_WORK_TRACKER.md`. 309 lint problems; 187 are errors from react-hooks v7 rules
  (`set-state-in-effect` 81, `refs` 59, `immutability` 18, `purity` 13, `static-components` 11, …) across ~105 files.
- The rules are set to `warn` in `frontend/eslint.config.mjs` to keep CI green.
- Plan:
  - [ ] Burn down the largest files first: `physics-3d-wave-optics.tsx` (15 react-hooks hits), `tutor-console.tsx` (10), `schematic-diagram.tsx` (9), `ai-chat-interface.tsx` (8).
  - [ ] Flip the rules back to `error` once the count is zero.
  - [ ] Resolve the `@eslint/eslintrc` bridge issue (declare or remove the import).

### 1.2 Notes rebuild — all six subjects (116 units / 696 topics)
- Level: **Content** (learner-facing payloads). The agent may only touch the specific topic a session names.
- Concerned files:
  - `content/**` — **CONTENT FILE**; the authored notes. Do not bulk-read.
  - `frontend/lib/syllabus.ts` — **CORE**; the ordering source for units and topics.
  - `scripts/audit-empty-scopes.mjs` — **CORE**; the `audit:scopes` script (`package.json`).
  - `SYSTEM_WORK_TRACKER.md` — **CORE**; the thin-count record to update each session.
  - Schema gate: located in this pass. `npm run check:content` runs `scripts/content-health-check.mjs` and then `npm run check:schema`, which runs `frontend/tests/lib/content/schema-corpus.test.ts` (`package.json` lines 55–56).
- Source: `SYSTEM_WORK_TRACKER.md` (2026-10-28). Stage S1 (interfaces) is done for all 696 topics.
  Thin topics fell 432 → 283 (of 2,374 authored notes). Note-filling is the remaining work.
- Plan:
  - [ ] Continue Chemistry S2 (Stoichiometry, 8 topics), then the other subjects unit by unit.
  - [ ] After each unit: schema gate, `audit:scopes --strict`, placeholder count = 0.
  - [ ] Track thin count in the tracker each session.

### 1.3 Knowledge validity plan (696 topics against sources)
- Level: **Content validation** (the ledger is a report; the topics themselves are **CONTENT FILE**s).
- Concerned files:
  - `KNOWLEDGE-PLAN.md` — **CORE**; the plan.
  - `reports/knowledge-validation/ledger.md` — **CORE** report; record each validated topic here.
  - `frontend/lib/syllabus.ts` — **CORE**; used to order subjects and units.
  - Topic payloads under `content/**` — **CONTENT FILE**; read only the named topic.
- Source: `KNOWLEDGE-PLAN.md`, ledger `reports/knowledge-validation/ledger.md`. Only the pilot unit (4/696 topics) is done.
- Plan:
  - [ ] Next: Biology unit 2 (floral-diversity), then remaining Biology units.
  - [ ] Order subjects by exam weight (CEE/NEB) rather than alphabetically.

### 1.4 Veer (AI tutor) chat redesign — items 2 and 7
- Level: **Code** (UI wiring) plus **Validation** (browser evidence for item 7).
- Concerned files:
  - Already wired (reference pattern): `frontend/components/ai/ai-chat-interface.tsx` and `frontend/components/ai/tutor-console.tsx` — both use `useVoiceInput` (`frontend/lib/hooks/use-voice-input.ts`), `VoiceMicButton` (`frontend/components/ai/voice-mic-button.tsx`), and a Stop handler.
  - Stop present but **no voice**: `frontend/components/ai/diagram-studio.tsx` (route `frontend/app/(app)/ai/diagrams/page.tsx`) and `frontend/components/ai/subject-classroom.tsx` (route `frontend/app/(app)/ai/subjects/[subject]/page.tsx`).
  - No voice and no Stop: `frontend/components/chat/study-chat.tsx` (used by `frontend/components/lab/ai-lab-tutor.tsx`) and `frontend/components/layout/ai-widget.tsx` (rendered by `frontend/components/layout/app-shell.tsx`). A grep for voice hooks, mic button, stop or abort found nothing in either file (checked by name only; not read in full).
  - Correction (later pass, grep-verified): the line above is wrong for both files. `study-chat.tsx` imports `useVoiceInput` and `VoiceMicButton` (lines 29–30, 83–86), has a Stop button with `aria-label="Stop reply"` (around line 440), and uses `abortRef` with a Stop-pressed branch (lines 215–216). `ai-widget.tsx` imports `VoiceMicButton` and `useVoiceInput` (lines 31, 49, 570–575), has a Stop button (lines 783–788 and 937), and has a voice auto-send ref (line 751). So both have voice and Stop. What is still unverified is whether auto-send and Stop behave correctly in a browser, which is Item 7 below.
  - Plan: `plan-veer-chat-redesign.md`.
  - Tests: `frontend/tests/features/diagram-studio.test.tsx`.
- Source: `plan-veer-chat-redesign.md`. Status doc says: "not release-complete".
- Plan:
  - [ ] Item 2: voice auto-send + Stop on `study-chat`, `diagram-studio`, `subject-classroom`, `ai-widget` (only `ai-chat-interface` and `tutor-console` are wired).
  - [ ] Item 7: browser-level validation of voice auto-send and Stop on every surface, with linked run results.
  - [ ] Tick items only with linked validation evidence.

### 1.5 AI answer quality, real providers
- Level: **Validation with real providers** (needs owner-approved test account and keys outside the repo).
- Concerned files:
  - `backend/src/ai/service.ts` — **CORE**; provider chain under test.
  - `scripts/ai-regression.mjs` — **CORE**; `npm run ai:regression` (offline, CI) and the live mode that needs `AI_REGRESSION_TOKEN`.
  - `reports/ai-regression-golden-set.json` — generated golden set (not read).
  - `AGENT_RULES.md` line 81 — documents the offline vs live split.
  - `SYSTEM_WORK_TRACKER.md` line 53 — regression set status.
- Source: `SYSTEM_WORK_TRACKER.md` (deep-concept answer upgrade — Partial; mobile AI pages — not verified on a real device).
- Plan:
  - [ ] Run the deep-concept flow against the real provider and search (currently mocked only).
  - [ ] Verify account-backed related history.
  - [ ] Check AI routes on a real phone/desktop (they sit behind the approval wall; use an approved test account).
  - [ ] Run the live AI regression job (needs `AI_REGRESSION_TOKEN`, never in the repo).

### 1.6 Performance
- Level: **Code / CI config** (budgets, bundle, keep-alive).
- Concerned files:
  - `frontend/lighthouserc.json` — **CORE**; the Lighthouse budgets to tighten.
  - `.github/workflows/lighthouse.yml` — **CORE**; runs Lighthouse with the two public Supabase values.
  - `.github/workflows/keep-alive.yml` — **CORE**; the cron-ping workaround for cold starts.
  - `plan.md` Phase 5 / perf section — **CORE**.
  - `frontend/public/data/content/manifest.json` — **CONTENT FILE** (the 7.5 MB file to check for fetches). Do not edit it; read only to check fetch sites.
- Source: `plan.md` Phase 5 / perf section; `PROJECT_STATUS.md` Track 6 (open).
- Plan:
  - [ ] Bundle analyzer on the top 10 routes; record first-load JS per route.
  - [ ] Check whether any page fetches the 7.5 MB `manifest.json`; if so, split per class/subject/topic.
  - [ ] Confirm `react-query-devtools` is absent from the production bundle.
  - [ ] Re-measure Lighthouse LCP/TBT (plan.md says this still needs a build run).
  - [ ] Tighten budgets in steps (perf 0.7 → 0.85, LCP 4 s → 2.5 s) and add a per-route JS budget in CI.
  - [ ] Render cold-start: always-on backend or keep-alive (current cron-ping is a workaround).

### 1.7 Monitoring and reliability
- Level: **Ops / owner** (monitoring accounts and Supabase support ticket); code side is small.
- Concerned files:
  - `/health` endpoints: `backend/src/app.ts` line 113, `backend/src/api/controller.ts` line 46, `backend/src/api/storage.ts` line 65 — the targets for uptime alerts.
  - `.github/workflows/keep-alive.yml` — **CORE**; the existing scheduled ping.
  - `backend/src/db/migrations/` — **CORE**; the migration history for the runbook.
  - `plan.md` Phase 5 — **CORE**.
- Source: `plan.md` Phase 5.
- Plan:
  - [ ] Uptime monitoring + alerts on `/health`, error rate, AI failures.
  - [ ] Staging environment and documented rollback.
  - [ ] Supabase backups + restore drill; migration runbook.
  - [ ] File a Supabase support ticket for the refresh-token reuse quirk (reuse does not revoke the family; low impact).

### 1.8 Quality gates
- Level: **Code / CI config**.
- Concerned files:
  - `.github/workflows/ci.yml` — **CORE**; where the axe and coverage steps go.
  - `frontend/playwright.config.ts` — **CORE**; Playwright config.
  - `frontend/tests/e2e/smoke.spec.ts` — **CORE**; the one existing spec to grow.
  - `.github/workflows/e2e-smoke.yml` — **CORE**; the Playwright CI job.
  - `plan.md` Phase 6 — **CORE**.
- Source: `plan.md` Phase 6.
- Plan:
  - [ ] Automated axe checks on key pages in CI.
  - [ ] Coverage threshold on core logic (auth, credits, progress, streaks).
  - [ ] Grow Playwright e2e beyond one smoke spec: login → lesson → quiz → Veer → bookmark → offline.

### 1.9 Pro app UX plan (`plan-pro-app.md`)
- Level: **Owner decision** (scope) before any **Code** work.
- Concerned files:
  - `plan-pro-app.md` — **CORE**; the W1–W7 workstreams.
  - `frontend/components/ai/` and `frontend/app/(app)/ai/` — the 12 `page.tsx` AI routes (counted by glob; the earlier count of 11 was wrong) that W3 would consolidate (AI consolidation touches `ai-chat-interface.tsx`, `tutor-console.tsx`, `diagram-studio.tsx`, `subject-classroom.tsx`).
  - `frontend/lib/navigation.ts` and `frontend/lib/site-index.ts` — **CORE**; route registries to update when routes change.
- Workstreams W1–W7 are all unchecked: notes reading UX, practice→quiz loop, AI surface consolidation (11 routes → one chat + tool modes), dashboard/progress model, search, lab/3D polish, community.
- Plan:
  - [ ] Decide which W-items are in the release scope (owner).
  - [ ] Start with W3 (AI consolidation) and W2 (quiz loop); they touch the most user-visible flow.
  - [ ] Design-token audit and component kit (prerequisite for the rest).

### 1.10 Dead routes and overlapping AI entry points
- Level: **Code** (small); may already be done for the disabled routes.
- Concerned files:
  - No `frontend/app/**` folder matches `*disabled*` now, and `navigation.ts` / `site-index.ts` do not reference them. The routes appear only in old build logs (`frontend/prod-build-clean.log`, `frontend/prod-build-final.log`, `frontend/prod-main-build.log`) — likely stale. Confirm with a fresh build before removing anything.
  - `frontend/tests/lib/legacy-redirects.test.ts` lines 49–50 — asserts the two paths have no redirect; keep or update it with the removal.
  - Overlapping AI entry points: see 1.9 (`frontend/app/(app)/ai/**`).
- Source: `plan.md` Phase 2 — remove `r-notes-disabled`, `ravikishan-notes-disabled`; consolidate overlapping AI entry points.
- Plan:
  - [ ] Confirm no links point to the disabled routes (grep `frontend/lib/navigation.ts` and `site-index.ts` first).
  - [ ] Remove, then run `npm run check`.

### 1.11 Lab / 3D single system (`plan.md` "One 3D System for All Subjects")
- Level: **Audit** (read-only check of the phase table against code), then **Code**.
- Concerned files:
  - `plan.md` lines 668+ ("One 3D System for All Subjects"), the phase table near line 819, and the verification section near line 977 (retirement of `topic-3d-map.tsx`).
  - `frontend/components/lab/` — the 3D and lab components the plan consolidates (e.g. `physics-3d-wave-optics.tsx`, `schematic-diagram.tsx`).
- Audit (this pass, read-only): in `plan.md`, Phases 2–4 and 6 are marked done. Phase 0 (`plan.md` line 782) and Phase 1 (line 814) still have open Lighthouse re-measurement boxes. Phase 5 has one open box: manual rollout review per subject, which needs a signed-in browser pass and owner parity decisions. `frontend/components/lab/` is not checked here beyond what `plan.md` states.
- Code check: `frontend/lib/topic-3d-map.tsx` is absent, and the only remaining `topic-3d-map` reference in `frontend/**/*.{ts,tsx}` is a comment in `frontend/app/(app)/lab/page.tsx:364`. `frontend/lib/lab-manifest.ts` exists. `lab-catalog.ts` and `lab-registry.tsx` still exist; the plan says they are derived views, which was not verified.
- Dead-code candidates named in `plan.md` Phase 3, not yet removed: `frontend/components/lab/topics/[topicId]/topics-3d.tsx` and `frontend/components/lab/chapters/[chapterId]/chapters-3d.tsx` (no consumer after the Phase 3 conversion). Confirm reachability before deleting.
  - Reachability check (later pass, grep for the file names across `frontend/`): no file references `topics-3d` or `chapters-3d`, so neither has an importer by name. This does not prove they are dead, because they could be loaded by a dynamic path. Still a candidate; not deleted.
- Correction to the code check above: `frontend/components/lab/topic-visuals/math-mappings.md` (lines 1 and 3) also names `topic-3d-map`, and it says to apply replacements to `frontend/lib/topic-3d-map.ts`. That is a doc, not code, but it is a stale reference. The "only remaining reference is the comment at `lab/page.tsx:364`" claim covers `.ts`/`.tsx` only. Owner decides whether to update or delete that doc.
- Plan:
  - [x] Re-read the phase table and mark each phase done or open against the code (done this pass; the open boxes are listed above).
  - [ ] Confirm whether `lab-catalog.ts` and `lab-registry.tsx` are generated/derived views, or still independent sources. Partial answer: `frontend/lib/lab-manifest.ts` imports `LABS` from `lab-catalog.ts` and lazily loads `lab-registry.tsx` entries. Both are inputs to the manifest, not outputs of it, so they are still independent sources today.
  - Follow-up check (later pass): neither `lab-catalog.ts` nor `lab-registry.tsx` has a generated-file header or a "DO NOT EDIT" marker. Both are hand-written sources. Other importers: `lab-page-body.tsx`, `lab-activity-loaders.ts`, `app/(app)/lab/[labId]/page.tsx`, `app/(app)/lab/3d/page.tsx`, and several scripts. The item stays open until the owner says whether the "derived views" goal in 1.11 is still wanted.
  - [ ] Decide on the two `chapters-3d.tsx` / `topics-3d.tsx` dead-code candidates (Code, after a reachability check).
  - [ ] Phase 5 manual rollout review per subject (Validation; needs an approved test account).

---

## P2 — later

- Image pipeline audit (AVIF/WebP, dimensions), Devanagari font subsetting.
- Vercel Speed Insights / Web Vitals from real users.
- Web Push reminders, offline chapter download with queued progress sync (`plan.md` Phase 4).
- Visual regression tests for core pages; design-system lint (no raw colors/px outside tokens).
- Nepali UI language toggle; local payments (eSewa / Khalti / Fonepay); SEO and sitemap; teacher/class tools.
- Migrate `@cloudflare/next-on-pages` (deprecated) to OpenNext — only if Cloudflare is kept as a target.
- Branch cleanup: archive merged branches, protect `main` (`BRANCHES.md` §1).
- Remove the unreferenced `content/resources/question-bank/` path or wire it in (PYQ decision B already retired `content/pyq/`; do not add a second reader).

**Level and concerned files for P2 (added in this pass; nothing above was changed):**
- Image pipeline audit (AVIF/WebP) — Level: **Code** (small). Concerned: `frontend/next.config.mjs` (no `images.formats` setting found in this pass). Dimensions work is a content-side check; `frontend/public/` assets are **CONTENT FILE** where they are learner-facing, so audit only.
- Devanagari font subsetting — Level: **Code**. Concerned: `frontend/tailwind.config.ts` lines 55, 66, 71 (Noto Sans Devanagari is already the Nepali font stack). Nepali routes are covered by `frontend/tests/features/syllabus-route-params.test.ts`.
- Speed Insights / Web Vitals — Level: **Owner decision** (needs a Vercel project setting) plus **Code**. Concerned: `frontend/package.json` (no Speed Insights package found in this pass); `frontend/app/layout.tsx` is where the component would mount.
- Web Push reminders; offline chapter download with queued progress sync — Level: **Code** (larger; `plan.md` Phase 4). Concerned: `frontend/public/sw.js`, `frontend/components/pwa/service-worker-registrar.tsx`, its test `frontend/tests/components/pwa/service-worker-registrar.test.tsx`, `frontend/public/manifest.json`. No web-push library found in this pass.
- Visual regression tests; design-system lint — Level: **Code / CI config**. Concerned: `frontend/playwright.config.ts`, `frontend/tailwind.config.ts` (tokens), `frontend/eslint.config.mjs`.
- Nepali UI toggle; eSewa / Khalti / Fonepay; SEO and sitemap; teacher/class tools — Level: **Owner decision** (product scope and payment provider choice) before **Code**. Concerned: `frontend/app/sitemap.ts`, `frontend/app/robots.ts` (exist; sitemap/SEO partly in place), `frontend/lib/navigation.ts`, `frontend/lib/site-index.ts`. No payment-provider code found in this pass.
- Migrate `@cloudflare/next-on-pages` to OpenNext — Level: **Status check, likely stale**. `@cloudflare/next-on-pages` was not found in `frontend/package.json` or the root `package.json`, so confirm whether Cloudflare is still a target (see 0.5) before any work.
- Branch cleanup — Level: **Owner decision** plus **Ops** (git commands need owner approval). Concerned: `BRANCHES.md` §1 — read it before any branch operation (AGENTS.md rule).
- Question-bank path — Level: **Owner decision**. Concerned: `content/resources/question-bank/` — **CONTENT FILE**, do not read or modify; `SYSTEM_WORK_TRACKER.md` line 73 says it stays unwired and no second reader should be added.

### Open boxes from `plan.md` § Pro Upgrade Plan (added in this pass; not yet in the sections above)

Source: `plan.md` lines 579–664, every `- [ ]` box. Boxes already covered above are cross-referenced and not repeated. Nothing has been ticked and no code, content or config has been changed.

**Phase 1 — Content rights & privacy**
- [ ] Move KB + OCR corpus out of the public repo (`plan.md` 588, P0) — Level: **Ops/owner** (private repo or submodule choice) plus **Code** (loader change). Concerned: `backend/kb/**` and `backend/.ocr-v2/**` (**CONTENT FILE**, audit only), `.gitignore`, `backend/src/ai/curriculum-corpus.ts`.
- [ ] Revoke the leftover Puter token (`plan.md` 592, P0) — covered by 0.1; Level: **Owner decision** (may be stale).

**Phase 2 — Repo organization**
- [ ] Move AI-agent tooling folders out of the default view or gitignore them (`plan.md` 599, P1) — Level: **Ops** (gitignore) plus **Owner decision** (what to keep tracked). Concerned: `.gitignore`, root `AGENTS.md`, `CLAUDE.md`, `graphify-out/` (gitignored already per AGENTS.md; confirm the other folders).
- [ ] Shorten very long Nepali filenames in `content/notes` (`plan.md` 600, P1) — Level: **Content** (renames change URLs/links, so **Content validation** too). Concerned: `content/notes/**` (**CONTENT FILE**, list only the names over 255 bytes; do not open payloads). Any rename must also update the path references in `frontend/lib/note-routes.ts`.
- [ ] `frontend/lib` has 158 flat files (`plan.md` 601, P1) — Level: **Code** (large refactor; split into small units). Concerned: `frontend/lib/*.ts` (the flat files, not the static data themselves). Needs a per-file plan before any move.
- [ ] Remove dead routes and consolidate AI entry points (`plan.md` 602, P1) — covered by 1.10; Level: **Code** plus **Validation** (fresh build).
- [ ] Stop committing build output/binaries: `manifest.json` (7.5 MB), `_index.json` (6.7 MB), `play-store/*.aab` (`plan.md` 604, P1) — Level: **Ops** (move to CI artifacts; needs owner sign-off) plus **Code** (loaders in `frontend/lib/pyq-bank.ts` and `frontend/lib/content/paths.ts` read `content/_index.json` and `content/manifest.json`). Concerned: `.gitignore` lines 233–236 and 264–270 (the migration is already partly described there), `frontend/public/data/content/manifest.json` (**CONTENT FILE**), `android-twa/` (`*.aab`, already gitignored by `.gitignore:59`, so check whether tracked copies still exist). Do not delete content payloads.
- [ ] Branch cleanup (`plan.md` 605, P2) — covered by the P2 block above.

**Phase 3 — Lightweight enforced**
- [ ] Bundle analyzer on the top 10 routes; record first-load JS per route (`plan.md` 609, P0) — Level: **Validation** (needs a build; user must approve the build command). Concerned: `frontend/next.config.mjs` (no analyzer wired found in this pass), `frontend/public/sw-precache.json` (route list source).
- [ ] Check whether any client page fetches the 7.5 MB `manifest.json` (`plan.md` 610, P0) — Level: **Code** (audit first). Partial finding in this pass: client loaders use `content/manifest.json` at `frontend/components/perf/topic-notes-prefetcher.tsx` (its comment says 510 KB, a different file from the 7.5 MB one), `frontend/components/content/topic-vertical-notes.tsx` (line 546), `frontend/components/content/ravikishan-concept-panels.tsx` (line 97), `frontend/lib/content/topic-supplemental.ts` (line 64). Size and path must be measured before any split.
- [ ] Tighten Lighthouse budgets in steps and add a per-route JS budget in CI (`plan.md` 611, P0) — Level: **Code / CI config** plus **Validation** (budgets need a measured baseline first, so depends on the bundle analyzer item). Concerned: `.github/workflows/` (CI), `frontend/next.config.mjs`, Lighthouse config (not located in this pass).
- [ ] Verify react-query-devtools is not in the production bundle (`plan.md` 612, P1) — Level: **Validation** (needs a build) plus **Code** (move the package to dev-only if needed). Partial finding in this pass: `@tanstack/react-query-devtools` is listed under `"dependencies"` in `frontend/package.json` (line 30), not `devDependencies`. No `ReactQueryDevtools` import was found in `frontend/app`, `frontend/components`, `frontend/providers` or `frontend/lib`. The package being installed does not by itself mean it ships; that needs the build check.
- [ ] Lazy-load heavy libs (three/r3f/xr, gsap, mathjs, highlight.js, katex) and drop what's unused (`plan.md` 613, P1) — Level: **Code** plus **Validation**. Concerned: `frontend/package.json`, the imports in `frontend/components/lab/**` and `frontend/components/**` that use them. Must be measured against the bundle analyzer output.
- [ ] Move large PDFs/DOCX/HTML out of `public/` to a CDN or object storage (`plan.md` 614, P1) — Level: **Ops/owner** (storage choice) plus **Content** (links change). Concerned: `frontend/public/**` (**CONTENT FILE** — audit only, do not move files in this pass), `frontend/lib/` loaders that build those paths.
- [ ] Image pipeline audit and Devanagari font subsetting (`plan.md` 615, P2) — covered by the P2 block above.
- [ ] Speed Insights / Web Vitals (`plan.md` 616, P2) — covered by the P2 block above.

**Phase 4 — PWA**
- [ ] Web Push (VAPID) (`plan.md` 622, P1) — covered by the P2 block above (Web Push item), with the owner-decision note that VAPID keys are needed. Level: **Owner decision** (VAPID key pair as a secret) plus **Code**.
- [ ] Offline chapter download and queued progress sync (`plan.md` 624, P1) — covered by the P2 block above. Level: **Code** (larger).
- [ ] Badging API, share target, periodic content refresh (`plan.md` 626, P2) — Level: **Code** (small each; test in a browser for the share target). Concerned: `frontend/public/manifest.json`, `frontend/public/sw.js`, `frontend/components/pwa/service-worker-registrar.tsx`.

**Phase 5 — Reliability & brand**
- [ ] Custom domain for frontend and API (`plan.md` 631, P0) — Level: **Ops/owner** (DNS and hosting; no code). Concerned: `frontend/lib/` API base URL config (not located in this pass), `frontend/next.config.mjs`, `backend/src/app.ts` (CORS allowlist, to be checked when the domain changes).
- [ ] Replace the cron-ping workaround (`plan.md` 632, P1) — Level: **Owner decision** (hosting plan cost) plus **Ops**. Concerned: `.github/workflows/keep-alive.yml` (pings `https://rn01.onrender.com/health` every 10 minutes and never fails the run; read in an earlier pass).
- [ ] Public status page, uptime monitoring and alerting (`plan.md` 633, P1) — Level: **Ops/owner** (external monitor account). Concerned: `backend/src/app.ts` (health route), `.github/workflows/keep-alive.yml`.
- [ ] Staging environment, preview deploys for backend, documented rollback (`plan.md` 634, P1) — Level: **Ops/owner**. Concerned: `.github/workflows/`, `BRANCHES.md` (branch rules apply), `docs/DEPLOYMENT.md` (exists per the Phase 2 checkbox).
- [ ] Backups, restore drill for Supabase, migration runbook (`plan.md` 635, P2) — Level: **Ops/owner** plus **Validation** (restore drill is a live action; needs owner approval). Concerned: `backend/` migrations folder (not located in this pass), `docs/DEPLOYMENT.md`.

**Phase 6 — Quality gates**
- [ ] Automated accessibility checks (axe) on key pages in CI (`plan.md` 643, P1) — Level: **Code / CI config** plus **Validation**. Concerned: `frontend/playwright.config.ts`, `.github/workflows/`, `frontend/package.json` (no axe package found in this pass).
- [ ] Coverage reporting with a threshold on core logic (`plan.md` 644, P1) — Level: **Code / CI config**. Concerned: `frontend/vitest.config.mts`, `backend/` test config (not located in this pass), `.gitignore:16` (`coverage/` is already ignored). Threshold must be set from a measured baseline.
- [ ] Grow Playwright e2e beyond one smoke spec (`plan.md` 645, P1) — Level: **Code** plus **Validation** (needs the owner test account, same as 0.3). Concerned: `frontend/playwright.config.ts`, `frontend/tests/e2e/smoke.spec.ts` (the one existing spec, confirmed by glob in this pass).
- [ ] Visual regression tests — covered by the P2 block above.

**Phase 7 — AI tutor (Veer)**
- [ ] Schedule the live regression run on prompt/model changes (`plan.md` 652, P1) — covered by 1.5; Level: **Ops/owner** (owner test account plus `AI_REGRESSION_TOKEN`, never in the repo). Concerned: `.github/workflows/`, `scripts/ai-regression.mjs`.
- [ ] Embed the tutor inside lessons and quizzes ("Explain", "Hint", "Why was I wrong?") (`plan.md` 655, P1) — Level: **Code** plus **Content validation** (wording of hints must be checked against the notes). Concerned: `frontend/components/chat/study-chat.tsx`, `frontend/components/layout/ai-widget.tsx` (both already have voice and Stop, per the 1.4 correction), lesson and quiz components (not located in this pass).
- [ ] Answer modes (step-by-step, exam-answer 8-mark format, quick revision) and thumbs up/down feedback (`plan.md` 656, P1) — Level: **Code** plus **Validation** (feedback storage needs a migration, so Owner decision for the schema). Concerned: `backend/src/api/ai.ts`, `backend/src/ai/prompts.ts`, `frontend/lib/api/ai.ts`, `backend/src/ai/citations.ts` (the answer format it appends to already exists).

**Phase 8 — Growth, money, reach**
- [ ] Privacy-friendly product analytics (`plan.md` 660, P1) — Level: **Owner decision** (Plausible vs PostHog, and the privacy text) plus **Code**. Concerned: `frontend/app/layout.tsx`, the privacy page (path not located in this pass), `frontend/lib/` analytics wrapper (none found).
- [ ] Nepali UI language toggle (`plan.md` 661, P1) — covered by the P2 block above; Level: **Owner decision** plus **Code** plus **Content validation**.
- [ ] Local payments, SEO, teacher tools (`plan.md` 662–664) — covered by the P2 block above.

---

## Already done (no action; listed to avoid re-work)
- Hardening pass R1–R4 and its verification (`plan-hardening-pass.md`).
- Veer items 1, 3, 4, 5, 6 (`plan-veer-chat-redesign.md`).
- AI page responsiveness (2026-11-02), note presentation dedup (2026-10-30).
- Resources PATCH/DELETE ownership, controller PATCH, storage upload guards, bookmarks (`PROJECT_STATUS.md` open items, reviewed 2026-11-07).
- Live Supabase migration audit: missing trigger, plan columns, `quiz_history` applied (2026-11-07).
- PYQ decision: retire `content/pyq/` (2026-10-24).

---

## Suggested order for the next session
1. 0.1 and 0.2 (token expiry and secret hygiene) — today.
2. 0.3 (CI red) and 0.4 (owner decision on 8 accounts).
3. 0.5 and 0.6 (deploy target, repo cleanup).
4. 1.1 lint burn-down and 1.4 Veer items 2 and 7.
5. Then content (1.2, 1.3) in small unit-sized sessions.

## File classification
- `INCOMPLETE_WORK_PLAN.md` — **[IMPORTANT CORE FILE]** (documentation).
