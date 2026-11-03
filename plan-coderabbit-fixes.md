# CodeRabbit PR #5 fixes (live log)

Base: main 4ecbdc27 + merge of feature/study-pages-hardening (20cee371).

- [x] 1 report-card-view.tsx: ComingSoon wrapped in print:hidden
- [x] 2 report-card-view.tsx: reword weak-topic explanation (no "quiz history not recorded")
- [x] 3 credits: tier check before offering/processing unlock (no spark spent on denied)
- [x] 4 credits: preserve MockExams attempt across RouteCreditGate remount
- [x] 5 credits: do not mount/load locked /srs content until unlocked; server enforcement where feasible; record gap
- [x] 6 scoped-storage: capture scope at load, reject stale save and reload (MyNotesView)
- [x] 7 study-goals: guest goals transfer with explicit confirmation
- [x] 8 study-views.test.tsx: expected tier per case, compare to minTier
- [ ] 9 CI content-schema: regenerate ledger, `npm run ledger:check` passes
- [ ] Gates: typecheck, vitest, ledger:check, root npm run check, frontend build

## Notes
- 3: client gate checks sectionForPath tier before offering unlock (passes through to SectionTierGate); backend POST /credits/unlock now refuses (403, no balance read/write) when the user's rung is below the srs/mock-exams/downloads minimum (backend/src/utils/sectionAccess.ts, honours owner overrides).
- 4: features/credits/attempt-hold.tsx; MockExamsView holds the gate mounted while a paper exists. Same tree is kept after expiry (no remount). Starting a new paper is disabled until a fresh unlock.
- 5: /srs, /mock-exams, /downloads children are NOT mounted while locked (categoryForPath unchanged). REMAINING GAP: the card/PYQ/pack data is derived from public static assets (lib/pyq-bank, public/data) and is fetchable directly from the CDN, so there is no server-side content delivery to enforce the spark on; protection is client-side only (not mounted/loaded until unlocked). Real enforcement would need a server-delivered, spark-checked content endpoint.
- 6: personal-notes writeNotes(notes, loadedScope) rejects on scope mismatch; MyNotesView reloads and tells the user.
- 7: findGuestGoals/transferGuestGoals/discardGuestGoals; GuestGoalsPrompt on /onboarding and /settings (warns when it replaces account goals; never implicit).
