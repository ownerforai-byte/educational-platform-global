# Hardening pass log
- [ ] R1 monetization leak (PUBLIC_PATHS)
- [ ] R2 account-scoped localStorage keys
- [ ] R3 placeholder copy / ComingSoon
- [ ] R4 smoke tests for 16 study views
- [ ] Verify (typecheck, vitest, npm run check)

## Progress
- R1 done: /srs, /mock-exams, /downloads removed from PUBLIC_PATHS (comment in constants.ts records per-page decision)
- R2 done: lib/scoped-storage.ts key(); used by study-goals, personal-notes, srs, streaks (achievements is pure, no storage)
- R3 done: site-index/sections copy softened; report-card weak-topic ComingSoon (other views already used ComingSoon)
- R4 done: tests/components/study/study-views.test.tsx (40 tests), tests/lib/scoped-storage.test.ts

## Verify (verbatim final lines)
- `cd frontend && npm run typecheck`: `> tsc --noEmit` (no errors, exit 0)
- `npx vitest run tests/lib tests/features tests/components/study`: `Test Files  84 passed (84)` / `Tests  842 passed (842)`
- `npm run check` (root, scoped): final line `--- [visuals] ok`, exit 0
- Known-red, pre-existing, not run here: E2E owner sign-in, Lighthouse LCP

- [x] R1  [x] R2  [x] R3  [x] R4  [x] Verify
