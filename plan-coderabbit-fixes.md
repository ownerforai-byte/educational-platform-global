# CodeRabbit PR #5 fixes (live log)

Base: main 4ecbdc27 + merge of feature/study-pages-hardening (20cee371).

- [ ] 1 report-card-view.tsx: ComingSoon wrapped in print:hidden
- [ ] 2 report-card-view.tsx: reword weak-topic explanation (no "quiz history not recorded")
- [ ] 3 credits: tier check before offering/processing unlock (no spark spent on denied)
- [ ] 4 credits: preserve MockExams attempt across RouteCreditGate remount
- [ ] 5 credits: do not mount/load locked /srs content until unlocked; server enforcement where feasible; record gap
- [ ] 6 scoped-storage: capture scope at load, reject stale save and reload (MyNotesView)
- [ ] 7 study-goals: guest goals transfer with explicit confirmation
- [ ] 8 study-views.test.tsx: expected tier per case, compare to minTier
- [ ] 9 CI content-schema: regenerate ledger, `npm run ledger:check` passes
- [ ] Gates: typecheck, vitest, ledger:check, root npm run check, frontend build
