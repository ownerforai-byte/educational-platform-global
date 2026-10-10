// ADDITIVE (perf pass, 2026-09-27): error + cache toolkit consumed by the
// cached GET layer appended at the bottom of this file. Imports only — no
// existing statement above or below changes.
import {
  createTimeoutSignal,
  reportClientError,
  retryWithBackoff,
  runSafelyAsync,
  type SafeResult,
} from "./errors/app-error";
import { getSharedResourceCache, clearSharedResourceCachesWhere, type ResourceCache, type ResourceCacheStats } from "./perf/resource-cache";


// In browser, route requests through Next.js proxy rewrite ("") to guarantee
// same-origin cookies, zero CORS blocks, and zero SSL/mixed-content failures.
// In SSR (server-side), call NEXT_PUBLIC_API_URL or localhost directly.
const API_BASE =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000")
    : "";

/**
 * Auth model:
 *  - Both localStorage token and httpOnly `sb-access-token` cookie are supported.
 *  - `Authorization: Bearer <token>` is sent automatically on every request.
 */

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sb-access-token") || getBearerCookie();
}

export function setStoredToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sb-access-token", token);
  }
}

export function clearStoredToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sb-access-token");
  }
}

function getBearerCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )sb-access-token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildHeaders(init?: RequestInit): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  const token = getStoredToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/** Auth endpoints that should NOT trigger a refresh loop. */
function isAuthPath(path: string): boolean {
  return (
    path.startsWith("/api/auth/") &&
    !path.startsWith("/api/auth/refresh") &&
    path !== "/api/auth/refresh"
  );
}

function unauthorizedError(): Error {
  return Object.assign(new Error("Unauthorized"), { status: 401, code: "UNAUTHORIZED" });
}

/** Minimal shape of POST /api/auth/refresh's body (only fields the client uses). */
interface RefreshBody {
  accessToken?: string;
  user?: unknown;
}

/** One refresh promise shared by every 401 path in the app. */
let inFlightRefresh: Promise<{ ok: boolean } & RefreshBody> | null = null;

/**
 * Single-flight session refresh.
 *
 * Three independent callers hit POST /api/auth/refresh on a 401 — this
 * fetch layer's retry, `ensureSession()` and the AuthProvider renewal — and
 * when several requests 401 in the same moment (page load after the access
 * token expired) each used to fire its own refresh: five parallel 401s meant
 * five refresh calls in one second. Every caller now shares this one
 * in-flight promise; the burst after it settles starts a fresh one.
 */
export function refreshSessionShared(): Promise<{ ok: boolean } & RefreshBody> {
  if (!inFlightRefresh) {
    inFlightRefresh = (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return { ok: false };
        const body = (await res.json().catch(() => null)) as RefreshBody | null;
        if (body?.accessToken) setStoredToken(body.accessToken);
        return { ok: true, accessToken: body?.accessToken, user: body?.user };
      } catch {
        return { ok: false };
      }
    })().finally(() => {
      inFlightRefresh = null;
    });
  }
  return inFlightRefresh;
}

async function request<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: buildHeaders(init),
      credentials: "include",
    });
  } catch (err: any) {
    if (err?.name === "TypeError" && err?.message?.includes("fetch")) {
      throw new Error(
        "Unable to connect to server. The backend may be spinning up (Render cold start) or offline. Please retry in 10-15 seconds."
      );
    }
    throw err;
  }

  // Refresh-and-retry only for resource endpoints, and only once.
  if (response.status === 401 && !isRetry && !isAuthPath(path)) {
    const refreshed = await refreshSessionShared();
    if (refreshed.ok) {
      return request<T>(path, init, true);
    }
    throw unauthorizedError();
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ error: response.statusText }))) as {
      error?: string;
      /** Human-facing explanation the backend attaches alongside `error`. */
      message?: string;
      /** Correlation id the backend logged the full error under. */
      errorId?: string;
      /** Machine-readable reason (e.g. PENDING_APPROVAL / ACCOUNT_REJECTED). */
      code?: string;
      /** Signed token that opens the /welcome status (pending) screen. */
      statusToken?: string;
    };
    // Prefer the human `message` ("You've used all 4 credits…") over the
    // short machine `error` ("Insufficient credits") — and fall back to the
    // status text when the body isn't JSON (e.g. a proxy's 500 page).
    const text =
      (typeof error.message === "string" && error.message.trim()) ||
      error.error ||
      `Request failed: ${response.status}`;
    const err = new Error(text);
    (err as unknown as { status?: number }).status = response.status;
    if (error.errorId) (err as unknown as { errorId?: string }).errorId = error.errorId;
    if (error.code) (err as unknown as { code?: string }).code = error.code;
    if (error.statusToken)
      (err as unknown as { statusToken?: string }).statusToken = error.statusToken;
    throw err;
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(path, init);
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass, 2026-09-27): cached GET layer.
 *
 * `apiFetch` / `request` above are untouched — every existing call keeps
 * its exact behaviour. These new exports add a read-through cache for
 * GET-only endpoints (notes manifests, syllabus JSON, subject lists) with:
 *   • in-flight de-duplication (parallel callers share one request),
 *   • TTL + stale-while-revalidate (instant renders from warm data),
 *   • a per-request timeout with abort propagation,
 *   • bounded retry for transient failures (cold start, 5xx).
 *
 * ⚠️ Correctness rule: a cache key is the path plus an optional `variant`.
 * Any response that depends on *who* is logged in (progress, bookmarks,
 * credits, session) must either pass `noStore: true` or a `variant` that
 * contains the user id — otherwise two accounts on one device could see each
 * other's cached payload, the client-side twin of an IDOR.
 * ------------------------------------------------------------------ */

/** Options for {@link apiGet}. */
export interface ApiGetOptions {
  /** Fresh window (ms) before a background revalidation starts. Default 30s. */
  freshMs?: number;
  /** Window (ms) in which a stale value may still be served. Default 5min. */
  staleMs?: number;
  /** Max cached GET keys (LRU). Default 200. */
  maxEntries?: number;
  /** Skip the cache and force a network read. */
  force?: boolean;
  /** Per-request timeout (ms). Default 15000. `0` disables the timeout. */
  timeoutMs?: number;
  /** Extra retries for transient failures (in addition to the first try). */
  retries?: number;
  /** Caller abort signal (unmount, route change). */
  signal?: AbortSignal;
  /** Label for log lines (`notes`, `subjects`, …). */
  scope?: string;
  /** Set to `true` for responses that must never be cached (auth'd reads). */
  noStore?: boolean;
  /** Cache-key discriminator (e.g. the user id) for scoped reads. */
  variant?: string;
}

/** Default fresh window for cached GETs (30 seconds). */
const DEFAULT_API_FRESH_MS = 30_000;
/** Default window in which a stale value may be served (5 minutes). */
const DEFAULT_API_STALE_MS = 300_000;
/** Default LRU bound for cached GET keys. */
const DEFAULT_API_MAX_ENTRIES = 200;
/** Default per-request timeout (15 seconds). */
const DEFAULT_API_TIMEOUT_MS = 15_000;

/**
 * Resolves the shared cache instance matching the requested windows, so
 * call sites with the same tuning share one store (and therefore one
 * de-duplication scope) while stricter call sites stay isolated.
 */
function getApiGetCache(options: ApiGetOptions): ResourceCache<unknown> {
  const freshMs = Math.max(0, options.freshMs ?? DEFAULT_API_FRESH_MS);
  const staleMs = Math.max(freshMs, options.staleMs ?? DEFAULT_API_STALE_MS);
  const maxEntries = Math.max(1, options.maxEntries ?? DEFAULT_API_MAX_ENTRIES);
  return getSharedResourceCache<unknown>(
    `api-get:${freshMs}:${staleMs}:${maxEntries}`,
    {
      freshMs,
      staleMs,
      maxEntries,
      label: "api-get",
      onError: (error, key) => reportClientError("api-get:revalidate", error, { key }),
    },
  );
}

/** Cache key for a GET path plus an optional scope variant. */
function apiCacheKey(path: string, variant?: string): string {
  return variant ? `${path}::${variant}` : path;
}

/**
 * Cached GET. Behaviour is identical to `apiFetch(path)` for the network
 * path; caching only ever *adds* an early return for a warm key.
 */
export async function apiGet<T>(path: string, options: ApiGetOptions = {}): Promise<T> {
  const {
    timeoutMs = DEFAULT_API_TIMEOUT_MS,
    retries = 0,
    signal,
    scope,
    noStore = false,
    variant,
    force,
  } = options;

  const load = async (): Promise<T> => {
    // The timeout is created per attempt: a single shared timer would abort
    // already on attempt #1 and make `retries` a no-op after a slow response.
    return retryWithBackoff<T>(
      async () => {
        const timeout = timeoutMs > 0 ? createTimeoutSignal(timeoutMs, signal ?? null) : null;
        try {
          return await apiFetch<T>(path, timeout ? { signal: timeout.signal } : undefined);
        } finally {
          timeout?.clear();
        }
      },
      {
        attempts: Math.max(1, retries + 1),
        ...(signal ? { signal } : {}),
        onRetry: (error, attempt) =>
          reportClientError(`${scope ?? "apiGet"}:retry`, error, { path, attempt }),
      },
    );
  };

  if (noStore) return load();

  const cache = getApiGetCache(options);
  return cache.load(apiCacheKey(path, variant), load, typeof force === "boolean" ? { force } : {}) as Promise<T>;
}

/**
 * Result-tuple variant of {@link apiGet} for call sites that treat a failed
 * read as data (feature flags, optional widgets) instead of an exception.
 */
export async function apiGetSafe<T>(
  path: string,
  options: ApiGetOptions = {},
): Promise<SafeResult<T>> {
  return runSafelyAsync(() => apiGet<T>(path, options), { path });
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass): cache introspection, invalidation, prefetch.
 * ------------------------------------------------------------------ */

/** Synchronous read of a warm cached GET; `undefined` when cold. */
export function peekApiCache<T>(path: string, options: ApiGetOptions = {}): T | undefined {
  return getApiGetCache(options).peek(apiCacheKey(path, options.variant)) as T | undefined;
}

/** Counter snapshot for the GET cache matching `options` (dev overlay/tests). */
export function apiGetCacheStats(options: ApiGetOptions = {}): ResourceCacheStats {
  return getApiGetCache(options).stats();
}

/** Drops one cached GET path (e.g. right after a successful write). */
export function invalidateApiPath(path: string, options: ApiGetOptions = {}): boolean {
  return getApiGetCache(options).invalidate(apiCacheKey(path, options.variant));
}

/**
 * Drops every cached GET whose key matches `predicate` — use it to scope an
 * invalidation to one dataset (`key.startsWith("/api/r-notes")`) instead of
 * flushing the whole cache.
 */
export function invalidateApiGetWhere(
  predicate: (key: string) => boolean,
  options: ApiGetOptions = {},
): number {
  return getApiGetCache(options).invalidateWhere(predicate);
}

/**
 * Warms a cached GET in the background and never throws — the safe way to
 * prefetch from a hover/focus handler or an idle callback.
 */
export function prefetchApiGet<T>(path: string, options: ApiGetOptions = {}): void {
  void apiGet<T>(path, options).catch((error: unknown) => {
    reportClientError(`${options.scope ?? "apiGet"}:prefetch`, error, { path });
  });
}

/** Drops every cached GET across all tuning profiles (sign-out / switch). */
export function clearApiGetCache(): number {
  return clearSharedResourceCachesWhere((name) => name.startsWith("api-get:"));
}


