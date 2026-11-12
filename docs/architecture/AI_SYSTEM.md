# AI system (Veer)

Orchestration lives in `backend/src/ai/`. Frontend calls go through `frontend/lib/api/ai.ts` and feature UI under `features/ai/`.

## Provider chain (summary)

Primary Agnes, then paid/fast fallbacks, then a free-tier pool, then an internal keyword engine. Work-type lanes (`chat`, `quiz-generate`, `evaluate`, `math`, …) keep keys and queues separated — see `docs/architecture/OVERVIEW.md` for the diagram.

## Grounding & citations

Answers are grounded in curriculum corpus + optional web. **"From your notes"** citations should surface **learner routes** (title → `/class-*-notes/...`) rather than raw repo paths, falling back to a path only when no safe route exists.

## Sparks & tiers

Daily AI allowance is tier- and plan-driven (`spark` metering + `aiSparkGate`). UI gates are not enough — the API enforces ceilings.

## Regression

```bash
npm run ai:regression          # offline golden set
npm run ai:regression:live     # optional live scoring (needs token)
```
