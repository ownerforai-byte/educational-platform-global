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
    const isBrowser = typeof window !== "undefined";
    const res = await fetch(dataUrl(safe), {
      // Browser: allow HTTP-cache reuse of public assets.
      // Server: opt routes into dynamic rendering — these pages must not be
      // prerendered at build time, when nothing serves /data yet.
      cache: isBrowser ? "force-cache" : "no-store",
    });
    if (!res.ok) {
      throw new Error(
        `loadData: failed to fetch "${relPath}" from /data/${safe} (HTTP ${res.status} ${res.statusText})`
      );
    }
    return (await res.json()) as T;
  })();

  cache.set(relPath, load);
  return load as Promise<T>;
}
