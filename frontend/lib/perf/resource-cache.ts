/**
 * lib/perf/resource-cache.ts — ADD-ONLY stale-while-revalidate cache.
 *
 * Layered on top of the existing `apiFetch`/`loadData` code paths: nothing in
 * this file changes what those functions do. It gives new (and gradually
 * migrated) call sites three things they otherwise re-implement by hand:
 *
 *   1. steady-state TTL reads — a warm entry is served without a round trip,
 *   2. in-flight de-duplication — N parallel callers share one request,
 *   3. stale-while-revalidate — an expired entry is served instantly while a
 *      background refresh keeps it warm, and a failed refresh never wipes the
 *      last good value (Render cold-start / offline resilience).
 *
 * SSR-safe: plain Maps and `Date.now()`, no timers, no `window` access.
 */

import { AppError, asAppError, reportClientError } from "../errors/app-error";
import { measurePerfAsync } from "./measure";
import { createLru } from "./memo";

/** Tuning knobs for {@link createResourceCache}. */
export interface ResourceCacheOptions {
  /** Window (ms) where an entry is served with no work at all. Default 30s. */
  freshMs?: number;
  /** Window (ms) where an entry is served stale + refreshed in background. Default 5min. */
  staleMs?: number;
  /** Max retained entries (LRU eviction). Default 200. */
  maxEntries?: number;
  /**
   * When a refresh fails and a stale value exists, resolve with the stale
   * value instead of rejecting. Default `true` (resilient) — matches the
   * platform's existing "keep showing the last good data" behaviour.
   */
  serveStaleOnError?: boolean;
  /** Injectable clock (tests). Defaults to `Date.now`. */
  now?: () => number;
  /** Called for every swallowed background-refresh failure. */
  onError?: (error: AppError, key: string) => void;
  /** Label used in log lines, e.g. `notes-cache`. */
  label?: string;
}

/** Per-call overrides accepted by {@link ResourceCache.load}. */
export interface LoadOptions {
  /** Skip the cache and fetch (the entry is replaced on success). */
  force?: boolean;
  /** Extra context for log lines (route, component name). */
  scope?: string;
}

/** Counters useful in dev overlays and tests. */
export interface ResourceCacheStats {
  hits: number;
  staleHits: number;
  misses: number;
  revalidations: number;
  inflightHits: number;
  errors: number;
  size: number;
  inflight: number;
}

/** Metadata about a cached entry (never exposes the value). */
export interface CacheEntryMeta {
  key: string;
  fetchedAt: number;
  ageMs: number;
  isStale: boolean;
}

/** Public surface of a resource cache instance. */
export interface ResourceCache<T> {
  /** Read-through entry point used by components/queries. */
  load(key: string, loader: () => Promise<T>, options?: LoadOptions): Promise<T>;
  /** Forces a network read and replaces the entry (de-duplicated). */
  revalidate(key: string, loader: () => Promise<T>): Promise<T>;
  /** Synchronous peek at a cached value (`undefined` when cold). */
  peek(key: string): T | undefined;
  /** True when any entry (fresh or stale) exists for the key. */
  has(key: string): boolean;
  /** Metadata for a key, when present. */
  meta(key: string): CacheEntryMeta | undefined;
  /** Warms the cache from an already-fetched value. */
  set(key: string, value: T): void;
  /** Drops one key; returns true when something was removed. */
  invalidate(key: string): boolean;
  /** Drops every key matching a predicate; returns the removal count. */
  invalidateWhere(predicate: (key: string) => boolean): number;
  /** Drops every entry (in-flight requests are left to settle). */
  clear(): void;
  /** Snapshot of the counters. */
  stats(): ResourceCacheStats;
  /** Cached keys, oldest first. */
  keys(): string[];
  /** Notifies after a value is stored/replaced. Returns an unsubscribe fn. */
  subscribe(listener: (key: string, value: T) => void): () => void;
}

/**
 * Creates an isolated cache. Prefer {@link getSharedResourceCache} when several
 * modules should share one instance for the same named dataset.
 */
export function createResourceCache<T>(
  options: ResourceCacheOptions = {},
): ResourceCache<T> {
  const freshMs = Math.max(0, options.freshMs ?? 30_000);
  const staleMs = Math.max(freshMs, options.staleMs ?? 300_000);
  const serveStaleOnError = options.serveStaleOnError ?? true;
  const now = options.now ?? (() => Date.now());
  const label = options.label ?? "resource-cache";

  const entries = createLru<{ value: T; fetchedAt: number }>(options.maxEntries ?? 200);
  const inflight = new Map<string, Promise<T>>();
  const listeners = new Set<(key: string, value: T) => void>();

  const counters: ResourceCacheStats = {
    hits: 0,
    staleHits: 0,
    misses: 0,
    revalidations: 0,
    inflightHits: 0,
    errors: 0,
    size: 0,
    inflight: 0,
  };

  /** Stores a value, refreshes recency and notifies subscribers. */
  function store(key: string, value: T): void {
    entries.set(key, { value, fetchedAt: now() });
    counters.size = entries.size();
    for (const listener of listeners) {
      try {
        listener(key, value);
      } catch (error) {
        reportClientError(`${label}:listener`, error, { key });
      }
    }
  }

  /** Reports a swallowed failure; background refreshes must never throw. */
  function reportBackground(error: unknown, key: string, scope?: string): AppError {
    const normalized = asAppError(error, { path: `${label}:${key}` });
    counters.errors += 1;
    options.onError?.(normalized, key);
    reportClientError(`${label}:background`, normalized, { key, scope });
    return normalized;
  }

  /** One de-duplicated fetch for `key`; rejections are never cached. */
  function fetchFresh(key: string, loader: () => Promise<T>): Promise<T> {
    const pending = inflight.get(key);
    if (pending) {
      counters.inflightHits += 1;
      return pending;
    }

    counters.misses += 1;
    const request = (async () => {
      try {
        // Dev-only timing (production: exact passthrough) — makes cache-miss
        // latency visible in `perfSummary()` without touching the hot path.
        const value = await measurePerfAsync(`cache:${label}`, loader);
        store(key, value);
        return value;
      } catch (error) {
        throw asAppError(error, { path: `${label}:${key}` });
      } finally {
        inflight.delete(key);
        counters.inflight = inflight.size;
      }
    })();

    inflight.set(key, request);
    counters.inflight = inflight.size;
    return request;
  }

  /** Fire-and-forget refresh used by the stale-while-revalidate branch. */
  function refreshInBackground(key: string, loader: () => Promise<T>, scope?: string): void {
    counters.revalidations += 1;
    if (inflight.has(key)) {
      counters.inflightHits += 1;
      return;
    }
    void fetchFresh(key, loader).catch((error: unknown) => {
      reportBackground(error, key, scope);
    });
  }

  /** Age-based classification for an entry. */
  function classify(entry: { fetchedAt: number } | undefined): "missing" | "fresh" | "stale" | "expired" {
    if (!entry) return "missing";
    const age = now() - entry.fetchedAt;
    if (age < freshMs) return "fresh";
    if (age < staleMs) return "stale";
    return "expired";
  }

  const cache: ResourceCache<T> = {
    async load(key, loader, loadOptions = {}) {
      // Defensive: an empty key would collide across call sites, so bypass the
      // cache entirely rather than serving the wrong dataset.
      if (!key) return loader();

      const state = loadOptions.force ? "expired" : classify(entries.get(key));

      if (state === "fresh") {
        counters.hits += 1;
        return (entries.get(key) as { value: T }).value;
      }

      if (state === "stale") {
        counters.staleHits += 1;
        const stale = entries.get(key) as { value: T };
        refreshInBackground(key, loader, loadOptions.scope);
        return stale.value;
      }

      if (state === "expired") {
        const stale = entries.get(key);
        try {
          return await fetchFresh(key, loader);
        } catch (error) {
          if (stale && serveStaleOnError) {
            // Counted as an error even though we recovered: the failure is
            // real and the caller is being served a stale value.
            counters.errors += 1;
            reportClientError(`${label}:stale-fallback`, error, {
              key,
              scope: loadOptions.scope,
            });
            return stale.value;
          }
          throw error;
        }
      }

      return fetchFresh(key, loader);
    },

    revalidate(key, loader) {
      counters.revalidations += 1;
      return fetchFresh(key, loader);
    },

    peek(key) {
      return entries.get(key)?.value;
    },

    has(key) {
      return entries.has(key);
    },

    meta(key) {
      const entry = entries.get(key);
      if (!entry) return undefined;
      const ageMs = Math.max(0, now() - entry.fetchedAt);
      return { key, fetchedAt: entry.fetchedAt, ageMs, isStale: ageMs >= freshMs };
    },

    set(key, value) {
      if (!key) return;
      store(key, value);
    },

    invalidate(key) {
      const removed = entries.delete(key);
      counters.size = entries.size();
      return removed;
    },

    invalidateWhere(predicate) {
      let removed = 0;
      for (const key of entries.keys()) {
        if (predicate(key)) {
          entries.delete(key);
          removed += 1;
        }
      }
      counters.size = entries.size();
      return removed;
    },

    clear() {
      entries.clear();
      counters.size = 0;
    },

    stats() {
      return { ...counters, size: entries.size(), inflight: inflight.size };
    },

    keys() {
      return entries.keys();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };

  return cache;
}

/* ------------------------------------------------------------------ *
 * Shared (named) instances.
 * ------------------------------------------------------------------ */

/** Global registry key — survives Fast Refresh / double-eval in dev. */
const SHARED_REGISTRY_KEY = "__nebSharedResourceCaches";

interface RegistryHolder {
  [SHARED_REGISTRY_KEY]?: Map<string, ResourceCache<unknown>>;
}

/** Returns the process-wide registry, creating it on first use. */
function sharedRegistry(): Map<string, ResourceCache<unknown>> {
  const holder = globalThis as unknown as RegistryHolder;
  if (!holder[SHARED_REGISTRY_KEY]) {
    holder[SHARED_REGISTRY_KEY] = new Map<string, ResourceCache<unknown>>();
  }
  return holder[SHARED_REGISTRY_KEY] as Map<string, ResourceCache<unknown>>;
}

/**
 * Returns the cached instance registered under `name`, creating it with
 * `options` on first call. Using one instance per dataset is what makes the
 * de-duplication and TTL bounds meaningful across modules/routes.
 */
export function getSharedResourceCache<T>(
  name: string,
  options: ResourceCacheOptions = {},
): ResourceCache<T> {
  const registry = sharedRegistry();
  const existing = registry.get(name) as ResourceCache<T> | undefined;
  if (existing) return existing;
  const created = createResourceCache<T>({ label: name, ...options });
  registry.set(name, created as ResourceCache<unknown>);
  return created;
}

/** Drops every shared cache (used by the auth/sign-out flow and tests). */
export function clearSharedResourceCaches(): void {
  for (const cache of sharedRegistry().values()) cache.clear();
}

/**
 * Clears the shared caches whose registered name matches `predicate` — used to
 * scope invalidation to one dataset instead of flushing everything.
 */
export function clearSharedResourceCachesWhere(predicate: (name: string) => boolean): number {
  const registry = sharedRegistry();
  let cleared = 0;
  for (const [name, cache] of registry.entries()) {
    if (predicate(name)) {
      cache.clear();
      cleared += 1;
    }
  }
  return cleared;
}
