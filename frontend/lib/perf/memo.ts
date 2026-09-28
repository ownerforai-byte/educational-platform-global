/**
 * lib/perf/memo.ts — ADD-ONLY memoization toolkit.
 *
 * Pure helpers (no React, no DOM, SSR-safe). Existing components and modules
 * keep their current implementations; this file makes the *same* patterns
 * available to new code and to the additive caching layer in
 * `lib/perf/resource-cache.ts` without duplicating an LRU or a stable key
 * function at each call site.
 */

/** Shallow equality over plain objects/arrays — default memo deps check. */
export function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, index) => Object.is(item, b[index]));
  }
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const leftKeys = Object.keys(left);
  if (leftKeys.length !== Object.keys(right).length) return false;
  return leftKeys.every((key) => Object.is(left[key], right[key]));
}

/** Minimal LRU (Map insertion order, re-insert on hit for recency). */
export interface LruCache<V> {
  get(key: string): V | undefined;
  set(key: string, value: V): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
  size(): number;
  keys(): string[];
  readonly capacity: number;
}

/**
 * Bounded cache with least-recently-used eviction. `capacity` is clamped to at
 * least 1 so a bad argument can never produce an unusable cache.
 */
export function createLru<V>(capacity = 100): LruCache<V> {
  const limit = Math.max(1, Math.floor(capacity));
  const store = new Map<string, V>();

  return {
    capacity: limit,
    get(key) {
      if (!store.has(key)) return undefined;
      const value = store.get(key) as V;
      // Refresh recency without changing the stored value.
      store.delete(key);
      store.set(key, value);
      return value;
    },
    set(key, value) {
      if (store.has(key)) store.delete(key);
      store.set(key, value);
      while (store.size > limit) {
        const oldest = store.keys().next();
        if (oldest.done) break;
        store.delete(oldest.value);
      }
    },
    has: (key) => store.has(key),
    delete: (key) => store.delete(key),
    clear: () => store.clear(),
    size: () => store.size,
    keys: () => Array.from(store.keys()),
  };
}

/**
 * Deterministic key for mixed primitives/objects. Circular structures and
 * functions fall back to a per-argument identity token, so the result is
 * always a string and never throws.
 */
export function stableKeyOf(args: readonly unknown[]): string {
  const parts = args.map((arg) => {
    if (arg === null) return "null";
    const type = typeof arg;
    if (type === "undefined") return "undefined";
    if (type === "string") return `s:${arg as string}`;
    if (type === "number" || type === "boolean" || type === "bigint") return `${type}:${String(arg)}`;
    if (type === "function" || type === "symbol") return `${type}:${identityKey(arg)}`;
    try {
      return `o:${JSON.stringify(arg)}`;
    } catch {
      return `o:${identityKey(arg)}`;
    }
  });
  return parts.join("\u0000");
}

let identityCounter = 0;
const identityMap = new WeakMap<object, number>();

/** Stable per-object token (used only when a value is not JSON-serializable). */
function identityKey(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    identityCounter += 1;
    return `#${identityCounter}`;
  }
  const existing = identityMap.get(value);
  if (existing !== undefined) return `#${existing}`;
  identityCounter += 1;
  identityMap.set(value, identityCounter);
  return `#${identityCounter}`;
}

/** Memoized function plus the ability to inspect/clear its cache. */
export interface Memoized<Args extends unknown[], Result> {
  (...args: Args): Result;
  /** Number of cached entries (bounded by `max`). */
  size(): number;
  has(...args: Args): boolean;
  clear(): void;
}

/**
 * Caches results of a pure function. Defaults to a stable string key and an
 * unbounded `Map`; pass `max` for LRU eviction, or `key` when arguments are not
 * JSON-friendly (e.g. React refs).
 */
export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  options: { key?: (...args: Args) => string; max?: number; shouldCache?: (...args: Args) => boolean } = {},
): Memoized<Args, Result> {
  const keyOf = options.key ?? stableKeyOf;
  const lru = options.max ? createLru<Result>(options.max) : null;
  const map = lru ? null : new Map<string, Result>();

  const memoized = ((...args: Args): Result => {
    const key = keyOf(args);
    if (options.shouldCache && !options.shouldCache(...args)) return fn(...args);
    if (lru) {
      const hit = lru.get(key);
      if (hit !== undefined) return hit;
      const value = fn(...args);
      lru.set(key, value);
      return value;
    }
    const store = map as Map<string, Result>;
    if (store.has(key)) return store.get(key) as Result;
    const value = fn(...args);
    store.set(key, value);
    return value;
  }) as Memoized<Args, Result>;

  memoized.size = () => (lru ? lru.size() : (map as Map<string, Result>).size);
  memoized.has = (...args: Args) => (lru ? lru.has(keyOf(args)) : (map as Map<string, Result>).has(keyOf(args)));
  memoized.clear = () => {
    if (lru) lru.clear();
    else (map as Map<string, Result>).clear();
  };

  return memoized;
}

/** Convenience wrapper for single-argument selectors/mappers. */
export function memoizeBy<Arg, Result>(
  fn: (arg: Arg) => Result,
  options: { max?: number } = {},
): (arg: Arg) => Result {
  return memoize<[Arg], Result>(fn, options);
}

/**
 * Runs `factory` at most once and caches the result (including a thrown error,
 * so a failing initializer is not retried in a loop).
 */
export function once<Result>(factory: () => Result): () => Result {
  let state: "idle" | "done" | "failed" = "idle";
  let value: Result;
  let failure: unknown;

  return () => {
    if (state === "failed") throw failure;
    if (state === "done") return value;
    try {
      value = factory();
      state = "done";
      return value;
    } catch (error) {
      failure = error;
      state = "failed";
      throw error;
    }
  };
}

/** Lazily initialized singleton with an explicit readiness probe. */
export interface Lazy<Result> {
  get(): Result;
  readonly isInitialized: boolean;
}

/** Defers `factory()` until first `get()` — handy for heavy client-only modules. */
export function lazy<Result>(factory: () => Result): Lazy<Result> {
  let initialized = false;
  let read: () => Result = () => {
    const value = factory();
    initialized = true;
    // Swap to a plain return so later reads skip the guard entirely.
    read = () => value;
    return value;
  };

  return {
    get: () => read(),
    get isInitialized() {
      return initialized;
    },
  };
}

/** Options accepted by {@link memoizeAsync}. */
export interface AsyncMemoOptions {
  /** Max retained entries (LRU eviction). Defaults to 50. */
  max?: number;
  /** Time in ms a resolved value stays fresh; `0` means "keep forever". */
  ttlMs?: number;
  /** Optional custom cache key (defaults to a stable key of the arguments). */
  key?: (...args: unknown[]) => string;
}

/** Async memoization handle: dedupes in-flight calls and caches successes. */
export interface MemoizedAsync<Args extends unknown[], Result> {
  (...args: Args): Promise<Result>;
  /** Drops one entry (or all when `key` is omitted). */
  invalidate(key?: string): void;
  /** True when a resolved value is already cached (never counts in-flight). */
  has(...args: Args): boolean;
  /** Current entry count. */
  size(): number;
}

/**
 * Async memoizer with in-flight de-duplication: parallel callers share one
 * promise, rejections are never cached (so a retry is possible), and `ttlMs`
 * expires entries after a fixed window. Designed for read-only data loaders.
 */
export function memoizeAsync<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  options: AsyncMemoOptions = {},
): MemoizedAsync<Args, Result> {
  const keyOf = (options.key as ((...args: Args) => string) | undefined) ?? ((args: Args) => stableKeyOf(args));
  const max = Math.max(1, options.max ?? 50);
  const ttlMs = Math.max(0, options.ttlMs ?? 0);
  const values = createLru<{ value: Result; storedAt: number }>(max);
  const inflight = new Map<string, Promise<Result>>();

  const run = ((...args: Args): Promise<Result> => {
    const key = keyOf(args);
    const cached = values.get(key);
    if (cached && (ttlMs === 0 || Date.now() - cached.storedAt < ttlMs)) {
      return Promise.resolve(cached.value);
    }
    const pending = inflight.get(key);
    if (pending) return pending;

    const promise = fn(...args)
      .then((value) => {
        values.set(key, { value, storedAt: Date.now() });
        return value;
      })
      .finally(() => {
        inflight.delete(key);
      });

    inflight.set(key, promise);
    return promise;
  }) as MemoizedAsync<Args, Result>;

  run.invalidate = (key?: string) => {
    if (key === undefined) {
      values.clear();
      inflight.clear();
      return;
    }
    values.delete(key);
    inflight.delete(key);
  };
  run.has = (...args: Args) => values.has(keyOf(args));
  run.size = () => values.size();

  return run;
}
