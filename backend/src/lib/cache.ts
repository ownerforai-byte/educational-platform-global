/**
 * Bounded in-process LRU + TTL cache for read-only curriculum loaders.
 * Not shared across Render instances — CDN Cache-Control is the multi-node layer.
 */

interface Entry<T> {
  value: T;
  expiresAt: number;
  staleAt: number;
}

const DEFAULT_MAX = 256;

export class TtlLruCache {
  private readonly map = new Map<string, Entry<unknown>>();
  private readonly maxEntries: number;

  constructor(maxEntries = DEFAULT_MAX) {
    this.maxEntries = Math.max(1, maxEntries);
  }

  get<T>(key: string): { value: T; fresh: boolean } | null {
    const hit = this.map.get(key) as Entry<T> | undefined;
    if (!hit) return null;
    const now = Date.now();
    if (now > hit.staleAt) {
      this.map.delete(key);
      return null;
    }
    // Refresh LRU order
    this.map.delete(key);
    this.map.set(key, hit);
    return { value: hit.value, fresh: now <= hit.expiresAt };
  }

  set<T>(key: string, value: T, ttlMs: number, staleWhileRevalidateMs = 0): void {
    while (this.map.size >= this.maxEntries) {
      const oldest = this.map.keys().next().value as string | undefined;
      if (oldest === undefined) break;
      this.map.delete(oldest);
    }
    const now = Date.now();
    this.map.set(key, {
      value,
      expiresAt: now + ttlMs,
      staleAt: now + ttlMs + Math.max(0, staleWhileRevalidateMs),
    });
  }

  async getOrLoad<T>(
    key: string,
    ttlMs: number,
    loader: () => Promise<T>,
    staleWhileRevalidateMs = ttlMs * 4,
  ): Promise<T> {
    const hit = this.get<T>(key);
    if (hit?.fresh) return hit.value;
    if (hit && !hit.fresh) {
      // Serve stale and refresh in background
      void loader()
        .then((value) => this.set(key, value, ttlMs, staleWhileRevalidateMs))
        .catch(() => undefined);
      return hit.value;
    }
    const value = await loader();
    this.set(key, value, ttlMs, staleWhileRevalidateMs);
    return value;
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
}

/** Shared curriculum cache (subjects, chapters, notes indexes, etc.). */
export const contentCache = new TtlLruCache(256);

export const CONTENT_CACHE_TTL_MS = 60_000;
export const CONTENT_CDN_CACHE_CONTROL =
  "public, s-maxage=3600, stale-while-revalidate=86400";
