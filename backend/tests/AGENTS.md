# Backend test guide — copy these patterns, don't invent new ones

Scoped to `backend/tests/**`. Read this plus the one closest existing test file;
that is enough to write a new suite without studying the harness.

## Harness

- Vitest + the **real** Express app: `createApp()` from `../src/app`, then
  `app.listen(0)` and call it with global `fetch` against
  `http://127.0.0.1:<port>`. There is no supertest and no separate test server.
- Close every server in `afterAll`; suites run concurrently and ports are
  ephemeral.
- Call `resetRateLimits()` (from `../src/middleware/rateLimit`) in `beforeEach`
  when a suite makes repeated requests — login is capped at 5/min per IP and a
  whole suite shares `127.0.0.1`.

## Mocking Supabase

`vi.mock("../src/db/supabase", ...)` **before** importing the app, and provide
both shapes the source uses:

```ts
return { supabaseAdmin: admin, createAuthClient: () => admin };
```

`admin.from` must return a **thenable query chain**: `select/eq/order/single/
maybeSingle/limit/upsert/update/insert/delete` all return the same object, and
`then` resolves `{ data, error }`. Copy `makeQueryChain` / `mockProfiles` from
`tests/auth-flow.test.ts` rather than rebuilding it.

Routers owned by other agents may be stubbed with an empty `Router()` (see the
top of `auth-flow.test.ts`) so a full-app mount stays stable while they edit.

## Expected noise — do not "fix" it

- `SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing - using in-memory mock store`
- `[Auth] Token validation failed: Invalid JWT`, `storage upload failed: …`,
  `AI chat error: …`, `[guest-quota] …` when the test exercises an error path.

These are assertions passing, not failures. Never silence them by weakening the
code under test.

## Rules

- SSE fixtures: build events as `` `data: ${JSON.stringify(event)}\n\n` ``.
  Hand-escaped `\n` inside a JSON string produces real newlines and breaks the
  parser with `Unterminated string in JSON`.
- Assert the contract (status, body shape, cookie, credit delta), not log text.
- Never raise rate limits, disable a middleware, or mock the thing the test is
  named after to get green.
- Run one file first: `npx vitest run tests/<file>.test.ts` from `backend/`.
  From the repo root, `npm run test:affected -- <changed paths>` selects the
  impacted suites across workspaces.
