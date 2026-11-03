# Plan: Content-tree consolidation and scaffold removal (live log)

(plan.md at repo root is an unrelated older vision doc, so this log lives here.)
Baseline 88add735; start HEAD 78d387ee on main. Sub-agents do not push; orchestrator publishes.
Commit: `chore(content): consolidate to kind-first tree — remove legacy ravikishan shell, prune stale index keys, retire finished migration scripts, fix doc paths`

## Checklist
- [x] B1 `git ls-files content/ravikishan` = 0; dir not on disk (no-op); `find content -type d -empty` = 0 (no-op sweep)
- [x] B2 pruned 39 stale keys (1145 -> 1106; all under notes/concepts/, 0 pruned elsewhere; no key with existing file touched). Both copies rewritten CRLF/sorted/2-space. Shared sha256 2a045f63cf0bfbea939f3177fb26d6b14fe95c555f2fb0a2e3f673bcf7a7ead6 (working tree CRLF; git blobs are LF via .gitattributes text=auto)
- [x] B3 12 docs path-replaced (README.md and SYSTEM_WORK_TRACKER.md had no ravikishan/ path). Historical header added to reports/content-reclassify-report.md. Ledger: `npm run ledger:build` (no diff) and `node scripts/platform-ledger.mjs` (regenerated reports/platform-ledger.{md,json}, 0 "ravikishan/" left; so no header needed there). `npm run registry:build` regenerated payloadDir in topic-registry.json.
- [x] B4 22 scripts git rm'd; no live refs in package.json/CI (only text mention in platform-ledger.mjs). Kept enrichment/mindmap-validate.mjs, rebuild-legacy-mindmaps.mjs. Kept scripts/theorem-index.json: read by scripts/test-fallback.ts, written by list-theorems.ts.
- [x] B5 all gates green (see Log)
- [x] D verification done
- [x] Commit (local)

## Log
- Baseline check:content (pre-change) passed: schema-corpus 3/3.
- content:build -> "Done. 941 manifest entries"; content:build:check -> "build parity OK — public/data matches the corpus byte-for-byte"
- pyq-register --check -> "pyq-register --check passed — all 511 bank(s) registered in both indexes."
- check:content -> content health + schema-corpus 3 passed.
- Known red CI gates (E2E owner sign-in, Lighthouse LCP): pre-existing, not touched.
- Next step if resuming: nothing left except publishing (push) the local commit.
