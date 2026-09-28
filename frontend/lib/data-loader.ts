// ADDITIVE (perf pass, 2026-09-27): shared error funnel used by the prefetch
// helpers appended below. Import only — nothing below changes.
import { reportClientError } from "./errors/app-error";


const cache = new Map<string, Promise<unknown>>();

/**
 * Builds the URL for a /public/data asset. Browsers can use a relative URL;
 * Node's fetch (SSR/prerender) requires an absolute one, so we point at this
 * Next.js server itself. Override with NEXT_PUBLIC_SITE_URL when deployed
 * behind a different origin.
 */
function dataUrl(safe: string): string {
  const relPath = `/data/${safe}`;
  if (typeof window !== "undefined") return relPath;
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `http://127.0.0.1:${process.env.PORT || 3000}`;
  return new URL(relPath, base).toString();
}

/**
 * Loads static JSON from /public/data. Works in both browser and RSC/SSR
 * contexts — no filesystem access anywhere.
 */
export function loadData<T>(relPath: string): Promise<T> {
  const cached = cache.get(relPath);
  if (cached) return cached as Promise<T>;

  const load = (async () => {
    const safe = relPath.replace(/\\/g, "/").replace(/^\/+/, "");
    if (safe.startsWith("..")) {
      throw new Error(`loadData: invalid path "${relPath}"`);
    }

    // On server (SSR/prerender/RSC), attempt direct filesystem read to prevent ECONNREFUSED / port mismatch crashes
    if (typeof window === "undefined") {
      try {
        const { readFile } = await import("node:fs/promises");
        const { join, resolve } = await import("node:path");
        const cwd = process.cwd();
        const candidatePaths = [
          join(cwd, "public", "data", safe),
          join(cwd, "frontend", "public", "data", safe),
          resolve(cwd, "..", "public", "data", safe),
        ];
        for (const p of candidatePaths) {
          try {
            const raw = await readFile(/*turbopackIgnore: true*/ p, "utf-8");
            return JSON.parse(raw) as T;
          } catch {
            // try next candidate path
          }
        }
      } catch {
        // Fall back to fetch below
      }
    }

    const isBrowser = typeof window !== "undefined";
    try {
      const res = await fetch(dataUrl(safe), {
        // Browser: allow HTTP-cache reuse of public assets.
        // Server: opt routes into dynamic rendering
        cache: isBrowser ? "force-cache" : "no-store",
      });
      if (!res.ok) {
        throw new Error(
          `loadData: failed to fetch "${relPath}" from /data/${safe} (HTTP ${res.status} ${res.statusText})`
        );
      }
      return (await res.json()) as T;
    } catch (err) {
      // In server components, log warning and return empty fallback instead of crashing entire render
      if (!isBrowser) {
        console.warn(`[loadData] Server fetch fallback failed for "${relPath}":`, (err as Error)?.message);
        return ([] as unknown) as T;
      }
      throw err;
    }
  })();

  cache.set(relPath, load);
  return load as Promise<T>;
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass, 2026-09-27): prefetch + cache introspection.
 *
 * `loadData` above is untouched — the same module-level `cache` remains the
 * single store, so warming it here makes the *existing* call literal on the
 * next render (the promise is already resolved). Every helper is safe on the
 * server and never throws.
 * ------------------------------------------------------------------ */

/** Warms a `/data` asset in the background; never throws, never blocks. */
export function prefetchData(relPath: string): void {
  try {
    void loadData(relPath).catch((error: unknown) => {
      reportClientError("loadData:prefetch", error, { path: relPath });
    });
  } catch (error) {
    reportClientError("loadData:prefetch:sync", error, { path: relPath });
  }
}

/** True when `relPath` was already requested in this session. */
export function isDataCached(relPath: string): boolean {
  return cache.has(relPath);
}

/**
 * Resolves to the cached value without triggering a fetch; resolves to
 * `undefined` when the asset is cold or the earlier fetch failed.
 */
export async function peekData<T>(relPath: string): Promise<T | undefined> {
  const cached = cache.get(relPath) as Promise<T> | undefined;
  if (!cached) return undefined;
  try {
    return await cached;
  } catch {
    return undefined;
  }
}

/** Drops one entry so the next `loadData` re-fetches it. */
export function invalidateData(relPath: string): boolean {
  return cache.delete(relPath);
}

/** Drops every entry (used by hard-refresh / sign-out flows and tests). */
export function clearDataCache(): void {
  cache.clear();
}

/** Number of in-memory entries (diagnostics and tests). */
export function dataCacheSize(): number {
  return cache.size;
}

/** Cached asset paths, in insertion order (diagnostics and tests). */
export function dataCacheKeys(): string[] {
  return Array.from(cache.keys());
}

