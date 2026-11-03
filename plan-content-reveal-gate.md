# plan-content-reveal-gate.md (LIVE LOG)

Branch: feature/content-reveal-gate. Baseline: babe41ae.
Goal: paid note/PYQ/formula BODIES leave public static; served by a spark-gated, tier-checked backend endpoint.
Resume rule: find first unchecked box; "NEXT:" line says the exact action.

## Findings (orientation)
- Unlock window is CLIENT-ONLY today (features/credits/unlock-store.ts, localStorage). POST /api/user/credits/unlock returns {credits, expiresAt, cost}; server keeps no state. So the server cannot verify "active spark window".
- DESIGN: stateless HMAC grant. Unlock returns `grant` = signed {userId, moduleKey, expiresAt}; only issued after tier check + spend (or free for PRO/owner) and only for cost-bearing categories (theory/reference). Reveal verifies grant (user match, key match, unexpired) + re-checks tier via canUnlockModule. Reveal NEVER spends sparks, so a 403 can never spend one.
- Backend (tsc rootDir=src) cannot import frontend/lib/content/paths.ts. Single path table = `frontend/lib/content/gated-kinds.json` (kind -> dir under data root), imported by paths.ts, read at runtime by backend via fs.
- Central client rewire point: frontend/lib/data-loader.ts loadData (used by pyq-bank -> srs/mock-exam/offline-pack, topic-vertical-notes, prefetcher). Gated relPaths in browser go via reveal with the stored grant.
- /api/formula-unit is a public GET returning formula bodies: must verify through backend (POST /api/content/verify, 200/403 no body) before computing.
- Server-side fs readers (formula-sheet.ts, topic-content-index.ts, loadData server branch, backend curriculum-corpus.ts, scripts) are not CDN-exposed; they only need the new location in commit 2.
- Manual curl on deployed site: NOT possible in sandbox. For orchestrator/user after deploy. Simulated by handler tests.

## Checklist
- [x] 0. Orientation, branch created, plan + task state written
- [x] 1. FEAT-001 env baseline (install check, run existing gates)
- [x] 2. FEAT-002 commit 1: backend grant + POST /api/content/reveal + /verify, unlock returns grant, backend tests
- [x] 3. FEAT-002 frontend: gated-kinds.json + paths.ts helper, grant store, data-loader reveal routing, formula-unit gate, readers verified, frontend tests
- [x] 4. Commit 1 gates green + commit
- [x] 5. FEAT-003 commit 2: relocate gated bodies out of public/data, update build.ts/ledger/validate/readers/scripts, content:build:check + ledger:check green
- [x] 6. Commit 2 gates green + commit
- [x] 7. Final verification + review + REPORT

## Log
- (init) Branch created from babe41ae.
- FEAT-001 baseline (network open; ran `npm install` in backend, frontend/root deps already present): frontend typecheck clean; frontend targeted vitest (tests/lib tests/features tests/components/study) 87 files / 869 tests pass; backend tsc clean; backend vitest 53 files / 639 tests pass; content:build:check "build parity OK"; ledger:check passed (941 entries). All green.
- NEXT: FEAT-002 step 2: create backend/src/utils/contentGrant.ts, then backend/src/api/content.ts.
- Step 2 DONE: backend/src/utils/contentGrant.ts (HMAC, CONTENT_GRANT_SECRET or SUPABASE_SERVICE_ROLE_KEY), backend/src/api/content.ts (POST /reveal, /verify), mounted in app.ts (+CORS header X-Unlock-Grant), user.ts unlock returns `grant` for theory/reference on success paths only, frontend/lib/content/gated-kinds.json + paths.ts gatedRefForDataPath. backend/tests/content-reveal.test.ts 11 tests pass.
- NEXT: step 3 frontend: grant store (features/credits/grant-store.ts), credit-provider stores grant, UnlockResponse.grant, data-loader reveal routing, prefetcher guard, formula-unit verify + downloads-view header, frontend tests.
- Step 3 DONE: lib/content/grant-store.ts, credit-provider stores/clears grant, UnlockResponse.grant, data-loader browser gated routing (reveal, no static fallback, no-grant throws GatedContentError, failures not cached, prefetch no-op without grant), formula-unit route verifies via backend /verify (empty 403), downloads-view sends X-Unlock-Grant/X-Unlock-Key. Tests: frontend tests/lib/data-loader-gated.test.ts (8), tests/app/formula-unit-route.test.ts (3).
- Step 4 gates: frontend typecheck clean; frontend vitest lib+features+components+app 124 files / 1128 tests; backend tsc clean, vitest 54 files / 650 tests; npm run check exit 0; content:build:check parity OK; ledger:check passed; pyq-register --check passed (511 banks). Reverted noise from check (deploy-version.ts, reports/visual-topic-coverage.json).
- Known behaviours: windows opened before deploy have no grant (re-unlock once). content/manifest.json is gated so free-route mindmap imported maps and ravikishan-concept-panels need a grant (degrade to empty via existing catch). In-progress mock exam keeps papers already in memory after grant expiry (loadData cache); new loads need a fresh unlock. Manual curl on deploy: orchestrator.
- Committed as commit 1. NEXT: FEAT-003 (commit 2): relocate gated bodies out of public/data (set CONTENT_GATED_DIR/backend candidate, update build.ts, ledger, readers, scripts).
- Step 5 DONE (commit 2): git mv of 1067 syllabus-notes bodies + content/_index.json + content/manifest.json (1069 files) from frontend/public/data to frontend/content-gated/ (same subpaths). Kept public: 6 syllabus-notes/*/_manifest.json files (6 subjects), topic-registry.json, content-ledger.json, exams, r-export, etc. Root defined once: gated-kinds.json `gatedDir` (paths.ts GATED_DIR, backend utils/gatedContent.ts, scripts read the JSON). Readers updated: data-loader server branch, formula-sheet, topic-content-index (gated roots first, public for manifests), backend content.ts (gated roots only) + curriculum-corpus + source-registry, build.ts (bodies -> gated, manifests public), ledger.ts, audit-topic-sections, root scripts, next.config outputFileTracingIncludes += ./content-gated/**/*. Tests: content-gated-location.test.ts (4) proves no body under public/data and server readers resolve from gated dir; updated pyq-bank/content-coverage/content-reveal tests.
- Step 6 gates: content:build byte-identical (no drift), content:build:check parity OK, ledger:build rewrote data-source path, pyq-register --check passed, npm run check exit 0, frontend typecheck clean, vitest lib+features+components+app 125 files / 1132 tests pass (after test env fix), backend tsc clean + vitest 54 files / 650 pass, `next build` succeeds. ledger:check re-run after commit (it reads HEAD bytes).
- Not changed: scripts/content-ledger-live.mjs still probes /data/syllabus-notes bodies on the CDN; those now 404 by design (it is effectively a live exposure probe). platform-ledger --check fails on a pre-existing false positive (filename containing "token", tracked in content/ and the runtime mirror before this change too).
- NEXT: Step 7 final verification/REPORT (orchestrator): manual curl on deployed site; confirm Render deploy ships frontend/content-gated and gated-kinds.json.
- Step 7 DONE: orchestrator re-verified backend reveal tests (11 pass), tree clean. Manual curl on deployed site remains for orchestrator/user. NEXT: publish branch (orchestrator).
