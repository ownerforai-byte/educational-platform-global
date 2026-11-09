/**
 * Live notification inbox — the single source of truth for every alert badge.
 *
 * There is intentionally NO seeded/coded queue. The old implementation shipped
 * a hardcoded array of invented announcements, so the header bell and the
 * "All Alerts (N)" tab showed a static number that had nothing to do with the
 * student's real state — even after every card had been approved.
 *
 * Notifications now exist only when something real happens (a quiz is scored,
 * a study streak advances, a spark pool refills, ...). `pushNotification()` is
 * called by those event handlers; the inbox persists in localStorage and every
 * badge derives from `items` the user has not approved yet. With no live
 * events — or once everything is marked read — the count is genuinely 0.
 *
 * Read semantics (owner direction 2026-10-24): read = approved = removed from
 * the queue. Cross-tab sync goes through the storage event.
 */

export type NotificationCategory = "curriculum" | "ai" | "account" | "system";

export interface NotificationItem {
  /** Stable id derived from the real event, so a read never comes back. */
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  /** Epoch ms of the real event — the source for the live relative label. */
  createdAt: number;
  /** Recomputed on every read so "2 hours ago" never goes stale. */
  timestamp: string;
  href?: string;
  actionLabel?: string;
}

export interface LiveNotificationInput {
  /** Stable id; passing the same id twice updates instead of duplicating. */
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  href?: string;
  actionLabel?: string;
}

export const NOTIFICATIONS_STORAGE_KEY = "ravikisan_read_notification_ids";
export const NOTIFICATIONS_FEED_KEY = "ravikisan_live_notifications_v1";

/** Keep the inbox bounded so a long-lived device never grows without limit. */
const MAX_ITEMS = 50;

export interface NotificationSnapshot {
  /** False until the client store has been read (SSR + first hydration render). */
  hydrated: boolean;
  /** Ids the user has approved (read) — those cards no longer render. */
  readIds: ReadonlySet<string>;
  /** The live, still-unread items, newest first. */
  items: readonly NotificationItem[];
  /** Ids still pending approval. */
  pendingIds: readonly string[];
  /** items.length — the ONE number every badge shows. */
  unreadCount: number;
}

/** Server/first-render snapshot: no live data yet, no invented alerts. */
const EMPTY_SNAPSHOT: NotificationSnapshot = {
  hydrated: false,
  readIds: new Set<string>(),
  items: [],
  pendingIds: [],
  unreadCount: 0,
};

let snapshot: NotificationSnapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();
let storageListenerAttached = false;

/** Human-readable, live relative time. Never a coded string. */
export function formatRelativeTime(createdAt: number, now = Date.now()): string {
  const seconds = Math.max(0, Math.round((now - createdAt) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(createdAt).toLocaleDateString();
}

function readIdsFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? new Set(parsed.filter((x): x is string => typeof x === "string"))
      : new Set();
  } catch {
    return new Set();
  }
}

function readFeedFromStorage(): NotificationItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_FEED_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is Record<string, unknown> =>
        !!x && typeof x === "object" &&
        typeof x.id === "string" &&
        typeof x.title === "string" &&
        typeof x.body === "string" &&
        typeof x.createdAt === "number" &&
        Number.isFinite(x.createdAt),
      )
      .map((x) => ({
        id: x.id as string,
        category: (["curriculum", "ai", "account", "system"] as const).includes(
          x.category as NotificationCategory,
        )
          ? (x.category as NotificationCategory)
          : "system",
        title: x.title as string,
        body: x.body as string,
        createdAt: x.createdAt as number,
        timestamp: formatRelativeTime(x.createdAt as number),
        href: typeof x.href === "string" ? x.href : undefined,
        actionLabel: typeof x.actionLabel === "string" ? x.actionLabel : undefined,
      }))
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_ITEMS);
  } catch {
    // Corrupt/unreadable store — start with a genuinely empty inbox.
    return [];
  }
}

function rebuild(): void {
  const readIds = readIdsFromStorage();
  const items = readFeedFromStorage().filter((n) => !readIds.has(n.id));
  snapshot = {
    hydrated: true,
    readIds,
    items,
    pendingIds: items.map((n) => n.id),
    unreadCount: items.length,
  };
}

function emit(): void {
  for (const listener of [...listeners]) listener();
}

function persistReadIds(readIds: ReadonlySet<string>): void {
  try {
    window.localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify([...readIds]),
    );
  } catch {
    // Storage full/unavailable — the in-memory state still updates.
  }
}

function persistFeed(items: readonly NotificationItem[]): void {
  try {
    window.localStorage.setItem(NOTIFICATIONS_FEED_KEY, JSON.stringify(items));
  } catch {
    // Storage full/unavailable — the in-memory state still updates.
  }
}

/** Cross-tab sync: any tab's write re-reads both stores. */
function ensureStorageListener(): void {
  if (storageListenerAttached || typeof window === "undefined") return;
  storageListenerAttached = true;
  window.addEventListener("storage", (event) => {
    const key = (event as StorageEvent).key;
    if (key != null && key !== NOTIFICATIONS_STORAGE_KEY && key !== NOTIFICATIONS_FEED_KEY) {
      return;
    }
    rebuild();
    emit();
  });
}

export function subscribeNotifications(listener: () => void): () => void {
  ensureStorageListener();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getNotificationSnapshot(): NotificationSnapshot {
  if (!snapshot.hydrated && typeof window !== "undefined") {
    rebuild();
  }
  return snapshot;
}

export function getServerNotificationSnapshot(): NotificationSnapshot {
  return EMPTY_SNAPSHOT;
}

/** Re-read both stores and notify subscribers (also used by tests). */
export function refreshNotificationsFromStorage(): void {
  rebuild();
  emit();
}

/**
 * Record a REAL platform event. Call this from quiz scoring, streak, unlock
 * and similar handlers — never to seed demo content. Same-id calls refresh the
 * existing entry instead of duplicating it.
 */
export function pushNotification(input: LiveNotificationInput): NotificationItem | null {
  if (typeof window === "undefined") return null;
  const item: NotificationItem = {
    ...input,
    createdAt: Date.now(),
    timestamp: "Just now",
  };
  const existing = readFeedFromStorage();
  const feed = [
    item,
    ...existing.filter((n) => n.id !== item.id),
  ].slice(0, MAX_ITEMS);
  persistFeed(feed);
  // Re-emitting the same real event must not resurrect an approved item: the
  // read-id store already contains its id, so rebuild() filters it out.
  rebuild();
  emit();
  return item;
}

/** Approve (read) one notification — it drops out of the queue. */
export function markNotificationRead(id: string): void {
  const next = readIdsFromStorage();
  next.add(id);
  persistReadIds(next);
  rebuild();
  emit();
}

/** Approve the whole live queue — every badge must drop to zero. */
export function markAllNotificationsRead(): void {
  const next = readIdsFromStorage();
  for (const item of readFeedFromStorage()) next.add(item.id);
  persistReadIds(next);
  rebuild();
  emit();
}
