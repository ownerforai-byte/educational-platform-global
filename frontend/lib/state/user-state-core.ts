/**
 * Pure helpers for account-backed user state. No DOM, no network — so the
 * conflict policy is unit-testable and stays identical on web and the TWA.
 */

export interface QueuedChange<T = unknown> {
  namespace: string;
  payload: T;
  /** The server version this change was based on. */
  baseVersion: number;
  queuedAt: string;
}

/**
 * Merge two list-shaped stores by id. The newer `updatedAt` wins per item;
 * items that exist only on one side survive. Deterministic ordering keeps the
 * resulting payload byte-stable when nothing changed.
 */
export function mergeById<T extends { id: string; updatedAt?: string }>(
  local: T[],
  remote: T[],
): T[] {
  const byId = new Map<string, T>();
  for (const item of local) byId.set(item.id, item);
  for (const item of remote) {
    const existing = byId.get(item.id);
    if (!existing || (item.updatedAt ?? "") > (existing.updatedAt ?? "")) {
      byId.set(item.id, item);
    }
  }
  return [...byId.values()].sort((a, b) =>
    (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
  );
}

/**
 * One pending change per namespace: a newer offline edit replaces the older
 * one, but keeps the ORIGINAL baseVersion — otherwise a queued write would
 * claim to be based on a server version it never saw.
 */
export function enqueueChange<T>(
  queue: QueuedChange[],
  change: QueuedChange<T>,
  limit = 20,
): QueuedChange[] {
  const existing = queue.find((c) => c.namespace === change.namespace);
  const next = queue.filter((c) => c.namespace !== change.namespace);
  next.push({ ...change, baseVersion: existing?.baseVersion ?? change.baseVersion });
  return next.slice(-limit);
}

export function removeQueued(queue: QueuedChange[], namespace: string): QueuedChange[] {
  return queue.filter((c) => c.namespace !== namespace);
}

export function samePayload(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
