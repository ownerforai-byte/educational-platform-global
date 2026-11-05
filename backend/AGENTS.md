# Backend agent guide — read this instead of exploring `src/`

Scoped to `backend/**`. The root `AGENTS.md` still governs file classification,
content-directory bans, and push rules; `CORE_FILES.md` §C is the route registry.
This file only removes the need to cold-read the server to find the right module.

## Commands (run from `backend/`)

```bash
npm run dev                              # tsx watch src/index.ts, port 3000
npx vitest run tests/auth-flow.test.ts   # one focused test file — always start here
npx vitest run -t "test name"            # one test by name
npm run lint                             # tsc --noEmit (there is no ESLint here)
npm run test:run                         # whole backend suite
```

From the repo root, `npm run test:affected -- <paths>` and `npm run check` pick
the right subset for you. Tests run without Supabase env vars: the client falls
back to an in-memory mock store, so `stderr` lines about missing
`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` are expected, not failures.

## Request path

`src/index.ts` (listen) → `src/app.ts` (helmet/CORS/rate-limit/route mounting)
→ `src/api/<feature>.ts` (one router per feature) → `src/middleware/*` →
`src/ai/*`, `src/db/*`, `src/storage/*`.

To add an endpoint: create `src/api/<feature>.ts`, mount it in `src/app.ts`, add
`tests/<feature>.test.ts`. Nothing else needs editing.

## Middleware — use the existing export, do not re-implement

| Need | Import from `src/middleware/` | Export |
|---|---|---|
| Logged-in user on the request | `auth.ts` | `requireAuth`, `AuthedRequest`, `getUserFromRequest` |
| Role / tier gate | `auth.ts` | `requireRole(...)`, `requireTier(minTier)`, `requireAdmin`, `requireOwner` |
| Owner by email allowlist | `auth.ts` | `requireOwnerEmail`, `isOwnerEmail` |
| Spend premium credits | `creditCheck.ts` | `requireCredit(feature)`, `requirePremium` |
| AI Spark allowance / Plus AI studio | `aiSparkGate.ts` | `requireAiSpark()`, `requirePlusAiStudio()`, `aiSparkGateIfAuthed()` |
| Per-IP throttling | `rateLimit.ts` | `rateLimit` (configured in `app.ts`) |
| Wrap async route handlers | `asyncHandler.ts` | — |

Tier ladder is `visitor → member → plus → pro → owner`. AI Spark daily
allowances: member 3, plus 25, pro 50, owner unlimited, guest 0.

## AI modules (`src/ai/`)

- `service.ts` — orchestration and provider fallback chain. Provider keys stay
  here; never return them to the frontend or log them.
- `prompts.ts` — master academic prompt; `platform-guide-prompt.ts` is the
  separate public platform-explainer prompt.
- `curriculum-corpus.ts`, `curriculum-retrieval.ts`, `syllabus-anchor.ts` —
  corpus retrieval. Read the single named record only; never scan `backend/kb/**`
  or `backend/.ocr-v2/**`.
- `figure-draw.ts`, `image-gen.ts`, `academic-figures.ts`, `google-diagrams.ts` —
  figure/image pipeline and artifact contracts.
- `truncation.ts`, `depth-regulation.ts`, `reply-craft.ts` — answer shaping.
- Streaming routes live in `api/ai-stream.ts` / `api/ai.ts`; SSE payloads are
  JSON-stringified `data:` events, so embedded newlines must go through
  `JSON.stringify`, never hand-escaping.

## Task → file → proving test

| Task | Start in | Test |
|---|---|---|
| Login, signup, OAuth, session, refresh | `api/auth.ts`, `middleware/auth.ts` | `tests/auth-flow.test.ts` |
| Credits, daily reset, refunds | `middleware/creditCheck.ts`, `src/db/` | `tests/credits.test.ts` |
| AI Spark limits, guest quota | `middleware/aiSparkGate.ts` | `tests/ai-spark.test.ts`, `tests/guest-quota.test.ts` |
| Tier gating of an endpoint | `middleware/auth.ts` | `tests/tier-scoped-api.test.ts`, `tests/section-access.test.ts` |
| Rate limits, payload caps, headers | `middleware/rateLimit.ts`, `app.ts` | `tests/security-policy.test.ts`, `tests/hardening.test.ts` |
| Chat/lesson answer quality | `ai/service.ts`, `ai/prompts.ts` | `tests/ai/`, `tests/deep-source-depth.test.ts` |
| Figures and diagrams | `ai/figure-draw.ts`, `ai/academic-figures.ts` | `tests/figure-rendering.test.ts`, `tests/academic-figures.test.ts` |
| Image input or generation | `ai/image-input.ts`, `ai/image-gen.ts` | `tests/image-input.test.ts`, `tests/ai-image-route.test.ts` |
| Storage upload, R2 overflow | `api/storage.ts`, `src/storage/` | `tests/storage-r2.test.ts` |
| Env validation, boot config | `config/env.ts`, `api/config.ts` | `tests/config-route.test.ts`, `tests/security-policy.test.ts` |
| R1 habits/journal/plans | `api/r1*.ts`, `middleware/r1Access.ts` | `tests/r1-access.test.ts`, `tests/r1-journal.test.ts` |
| Public platform guide | `api/ai-platform-guide.ts`, `ai/platform-guide-prompt.ts` | `tests/ai-platform-guide.test.ts`, `tests/platform-guide-prompt.test.ts` |

If the symbol you need is not obvious here, use the repo knowledge graph
(`npm run graphify:query -- "<question>"` from the root) rather than reading
neighbouring files to discover it.
