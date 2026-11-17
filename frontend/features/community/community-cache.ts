/**
 * Viewer-scoped SWR memory cache and bounded-concurrency hover prefetch for
 * Community Feed and Subject Study Spaces.
 *
 * Every key includes the active `viewerId` ("guest" when signed out) so two
 * accounts sharing a browser never observe each other's `likedByYou`,
 * `upvotedByYou`, or `followingByYou` flags.
 */

const FRESH_MS = 20_000;
const STALE_MS = 5 * 60_000;
const MAX_ENTRIES = 120;
const MAX_CONCURRENT_PREFETCH = 2;

interface CacheEntry<T> {
  value: T;
  storedAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const inFlightPrefetches = new Set<string>();
let activePrefetchCount = 0;
let enabledInTests = false;

function isCacheActive(): boolean {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return enabledInTests;
  }
  return true;
}

export function setCommunityCacheTestMode(enabled: boolean): void {
  enabledInTests = enabled;
  if (!enabled) clearCommunityCache();
}

export function clearCommunityCache(): void {
  store.clear();
  inFlightPrefetches.clear();
  activePrefetchCount = 0;
}

export function viewerCacheScope(viewerId?: string | null): string {
  return viewerId ? `u:${viewerId}` : "guest";
}

export function feedListCacheKey(
  viewerId: string | null | undefined,
  view: "feed" | "mine" | "saved",
  params: { q?: string; category?: string; filter?: string; idsKey?: string },
): string {
  return [
    "feed-list",
    viewerCacheScope(viewerId),
    view,
    params.q?.trim() ?? "",
    params.category ?? "",
    params.filter ?? "latest",
    params.idsKey ?? "",
  ].join("::");
}

export function feedPostCacheKey(viewerId: string | null | undefined, postId: string): string {
  return `feed-post::${viewerCacheScope(viewerId)}::${postId}`;
}

export function feedPersonCacheKey(viewerId: string | null | undefined, personId: string): string {
  return `feed-person::${viewerCacheScope(viewerId)}::${personId}`;
}

export function spaceThreadsCacheKey(viewerId: string | null | undefined, spaceId: string): string {
  return `space-threads::${viewerCacheScope(viewerId)}::${spaceId}`;
}

export function spaceThreadDetailCacheKey(
  viewerId: string | null | undefined,
  threadId: string,
): string {
  return `space-thread::${viewerCacheScope(viewerId)}::${threadId}`;
}

export function peekCommunityCache<T>(
  cacheKey: string,
): { value: T; fresh: boolean } | undefined {
  if (!isCacheActive()) return undefined;
  const entry = store.get(cacheKey);
  if (!entry) return undefined;
  const age = Date.now() - entry.storedAt;
  if (age > STALE_MS) {
    store.delete(cacheKey);
    return undefined;
  }
  // Touch LRU order.
  store.delete(cacheKey);
  store.set(cacheKey, entry);
  return { value: entry.value as T, fresh: age <= FRESH_MS };
}

export function writeCommunityCache<T>(cacheKey: string, value: T): void {
  if (!isCacheActive()) return;
  if (store.has(cacheKey)) store.delete(cacheKey);
  while (store.size >= MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (!oldest) break;
    store.delete(oldest);
  }
  store.set(cacheKey, { value, storedAt: Date.now() });
}

export function invalidateCommunityCacheWhere(predicate: (key: string) => boolean): void {
  for (const existingKey of Array.from(store.keys())) {
    if (predicate(existingKey)) store.delete(existingKey);
  }
}

/**
 * Prefetches a resource on pointer-enter/focus with bounded concurrency so
 * sweeping the cursor across a list never floods the API.
 */
export function prefetchCommunityResource<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  shouldCache: (result: T) => boolean = () => true,
): void {
  if (!isCacheActive()) return;
  const existing = peekCommunityCache<T>(cacheKey);
  if (existing?.fresh) return;
  if (inFlightPrefetches.has(cacheKey)) return;
  if (activePrefetchCount >= MAX_CONCURRENT_PREFETCH) return;

  inFlightPrefetches.add(cacheKey);
  activePrefetchCount += 1;
  void Promise.resolve()
    .then(fetcher)
    .then((result) => {
      if (shouldCache(result)) writeCommunityCache(cacheKey, result);
    })
    .catch(() => undefined)
    .finally(() => {
      inFlightPrefetches.delete(cacheKey);
      activePrefetchCount = Math.max(0, activePrefetchCount - 1);
    });
}
