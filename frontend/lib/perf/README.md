# Additive performance & resilience layer (2026-09-27)

> **Scope:** this directory, `lib/errors/`, `lib/validation/`, `components/perf/`
> and a small set of *appended* blocks in existing modules.
> **Contract:** add-only. No existing line, export, prop, style or workflow was
> removed, renamed or reordered. Every pre-existing code path behaves exactly as
> it did before; the new code is opt-in.

## 1. What was added

| Module | Responsibility |
|---|---|
| `lib/errors/app-error.ts` | Error taxonomy (`AppError`, `classifyStatus`), readers for the fields `lib/api-client.ts` already attaches (`status`, `code`, `errorId`, `statusToken`), `asAppError`, `retryWithBackoff`, `createTimeoutSignal`, `safeJsonParse`, `runSafely`/`runSafelyAsync`, `reportClientError`. |
| `lib/validation/guards.ts` | Runtime guards + coercions for untrusted JSON (`isSlug`, `isSafeRelativePath`, `asArray`, `asRecord`, `clampNumber`, `pickDefined`, `sanitizeSearchTerm`) and fail-fast `require*` helpers with `ValidationError`. |
| `lib/perf/memo.ts` | `shallowEqual`, `createLru`, `stableKeyOf`, `memoize`, `memoizeBy`, `once`, `lazy`, `memoizeAsync` (in-flight de-duplication, rejections never cached). |
| `lib/perf/resource-cache.ts` | TTL + LRU + in-flight de-dupe + stale-while-revalidate cache with stats, `subscribe`, `invalidateWhere`, and named shared instances. |
| `lib/perf/idle.ts` | `onIdle` (with `requestIdleCallback` fallback), `idleImport`, `idlePrefetchHref`, `idlePreloadImage`. |
| `lib/perf/measure.ts` | Dev-only timing helpers (`measurePerf`, `startPerf`, `perfSummary`); no-ops in production. |
| `components/perf/error-boundary.tsx` | `ErrorBoundary` (class) + `withErrorBoundary` HOC, with `resetKey`, `fallback`, `onError` and `silent`. |
| `components/perf/route-error-boundary.tsx` | `RouteErrorBoundary` — pathname-driven `resetKey`, wired into `app/(app)/layout.tsx`. |

## 2. What was appended to existing files

| File | Addition (nothing removed) |
|---|---|
| `lib/api-client.ts` | `apiGet` (cached GET), `apiGetSafe`, `peekApiCache`, `apiGetCacheStats`, `invalidateApiPath`, `invalidateApiGetWhere`, `prefetchApiGet`, `clearApiGetCache`. `apiFetch`/`request` untouched. |
| `lib/data-loader.ts` | `prefetchData`, `isDataCached`, `peekData`, `invalidateData`, `clearDataCache`, `dataCacheSize`, `dataCacheKeys` — all reusing the existing module-level `cache` map. |
| `lib/api/content.ts`, `lib/api/subjects.ts` | `*Cached` read variants + `prefetch*` + `invalidate*Cache` helpers. The original functions still call `apiFetch`. |
| `providers/query-provider.tsx` | `gcTime`, `retryDelay`, explicit `mutations.retry`, plus `QUERY_STALE_TIME` tiers, `getSharedQueryClient`, `invalidateQueriesByPrefix`, `seedQueryData`. |
| `features/syllabus/hooks.ts` | `prefetchSyllabusByClass`, `invalidateSyllabus`, `peekSyllabus`, `useSyllabusPrefetch` — reusing the module's existing query keys. |
| `app/error.tsx`, `app/global-error.tsx` | A second `useEffect` that reports through `reportClientError` (UI unchanged). |
| `app/(app)/layout.tsx` | `RouteErrorBoundary` wrapped around `{children}` inside the existing `RouteCreditGate`. |
| `types/api.ts` | `ApiErrorEnvelope`, `CachedResponse<T>`, `PaginatedResponse<T>`, `RequestTuning`, `PrefetchTuning`. |

## 3. Correctness rules (read before caching anything)

1. **Never cache user-scoped reads under a shared key.** `apiGet` keys are
   `path + "::" + variant`. For progress/bookmarks/credits/session either pass
   `noStore: true` or a `variant` containing the user id — otherwise two
   accounts on one device can see each other's payload.
2. **Cached GETs are public-only.** The `*Cached` variants added to
   `lib/api/content.ts` and `lib/api/subjects.ts` cover public catalogue data.
3. **Rejections are never cached**, so a retry is always possible.
4. **`freshMs`/`staleMs` are budgets, not guarantees** — the cache always
   returns real data (fresh, stale, or freshly fetched); it never fabricates a
   value and never returns a different key's value.
5. **Logging stays generic in production** (`reportClientError` prints kind +
   `errorId` only), matching the repo's "generic error bodies only" gate.

## 4. Usage

```ts
// Cached read (public endpoint)
import { getNotesCached } from "@/lib/api/content";           // *Cached variant
import { apiGet, prefetchApiGet } from "@/lib/api-client";    // generic form

// User-scoped read: bypass the cache entirely
await apiGet<ProgressEntry[]>("/api/progress", { noStore: true });

// Background warm from a hover/idle handler (never throws)
prefetchApiGet("/api/r-notes", { scope: "r-notes" });

// Invalidate one dataset
invalidateApiGetWhere((key) => key.startsWith("/api/r-notes"));

// Resilient read
const result = await apiGetSafe<RotesResponse>("/api/r-notes");
if (!result.ok) showBanner(result.error.kind === "network" ? "Offline" : "Retry");
```

## 5. Verification

```bash
npx tsc --noEmit                                   # frontend type gate
npx vitest run tests/lib/perf tests/lib/errors \
               tests/lib/validation tests/components/perf
npm run check                                      # repo scoped gate
```

Tests added: `tests/lib/errors/app-error.test.ts`,
`tests/lib/validation/guards.test.ts`, `tests/lib/perf/memo.test.ts`,
`tests/lib/perf/resource-cache.test.ts`,
`tests/components/perf/error-boundary.test.tsx`.
