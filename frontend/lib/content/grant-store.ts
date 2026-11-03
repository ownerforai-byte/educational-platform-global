/**
 * Client store for server-issued content grants (see backend utils/contentGrant).
 *
 * POST /api/user/credits/unlock returns a signed `grant` for cost-bearing
 * categories; loadData sends it to POST /api/content/reveal. Kept apart from
 * the unlock-window store (features/credits/unlock-store.ts) because this
 * module is imported by lib/data-loader.ts, which also runs on the server:
 * no "use client", no node builtins, every storage access guarded.
 */

const STORAGE_KEY = "neb.unlock.grants.v1";

export interface StoredGrant {
  grant: string;
  /** Unix epoch seconds. */
  expiresAt: number;
}
type GrantMap = Record<string, StoredGrant>;

const nowSeconds = () => Math.floor(Date.now() / 1000);

function read(): GrantMap {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const now = nowSeconds();
    const out: GrantMap = {};
    for (const [key, v] of Object.entries(parsed as Record<string, unknown>)) {
      const g = v as Partial<StoredGrant> | null;
      if (g && typeof g.grant === "string" && typeof g.expiresAt === "number" && g.expiresAt > now) {
        out[key] = { grant: g.grant, expiresAt: g.expiresAt };
      }
    }
    return out;
  } catch {
    return {};
  }
}

function write(map: GrantMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Storage full / private mode: the grant is simply not persisted.
  }
}

export function storeGrant(moduleKey: string, grant: string, expiresAt: number): void {
  write({ ...read(), [moduleKey]: { grant, expiresAt } });
}

export function clearGrant(moduleKey: string): void {
  const map = read();
  if (!(moduleKey in map)) return;
  delete map[moduleKey];
  write(map);
}

/** The unexpired grant for `moduleKey`, else null (expired entries are dropped). */
export function getGrant(moduleKey: string): string | null {
  const map = read();
  write(map); // persist the expiry sweep
  return map[moduleKey]?.grant ?? null;
}
