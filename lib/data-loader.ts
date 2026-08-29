import { headers } from "next/headers";

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5173";

const cache = new Map<string, Promise<unknown>>();

export function loadData<T>(relPath: string): Promise<T> {
  const cached = cache.get(relPath);
  if (cached) return cached as Promise<T>;

  const load = (async () => {
    // Opt into dynamic rendering: awaiting headers() during build-time
    // prerender probes aborts the probe before any fetch runs (edge pages are
    // always request-rendered in production, so behavior is unchanged there).
    await headers();
    const res = await fetch(`${SITE_ORIGIN}/data/${relPath}`, {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(
        `loadData: failed to fetch "${relPath}" from ${SITE_ORIGIN}/data/${relPath} (HTTP ${res.status} ${res.statusText})`,
      );
    }
    return (await res.json()) as T;
  })();

  cache.set(relPath, load);
  return load as Promise<T>;
}
