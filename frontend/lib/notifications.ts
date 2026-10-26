/**
 * Shared notification store (plan.md §14 — 5.1 + 5.2).
 *
 * The read-id store is the single source of truth for notification state:
 *   · the notifications page renders its queue from it,
 *   · the header bell derives its badge from it — so "mark all read" zeroes
 *     every badge in the same tab AND across open tabs (storage event).
 *
 * Semantics (owner direction 2026-10-24): read = approved = removed from the
 * queue. A notification is pending until its id lands in the read store.
 */

export interface NotificationItem {
  id: string;
  category: "curriculum" | "ai" | "account" | "system";
  title: string;
  body: string;
  timestamp: string;
  href?: string;
  actionLabel?: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-phys-xi-docs",
    category: "curriculum",
    title: "NEB Physics XI Resource Documents Published",
    body: "All 26 NEB Physics XI unit study documents (Mechanics, Heat & Thermodynamics, Optics, Electricity, Modern Physics) are now active in their unit Resources sections with worked questions, compare/contrast tables, and .docx downloads.",
    timestamp: "10 mins ago",
    href: "/class-11-notes/physics/chapters/kinematics",
    actionLabel: "View Unit Resources",
  },
  {
    id: "notif-sparks-refill",
    category: "account",
    title: "Daily AI Spark Pool Refilled",
    body: "Your daily spark allowance has been refreshed to full capacity. Ask Veer questions, test your knowledge in the AI quiz, or unlock deep concept notes freely.",
    timestamp: "2 hours ago",
    href: "/credits",
    actionLabel: "Check Spark Balance",
  },
  {
    id: "notif-exam-countdown",
    category: "curriculum",
    title: "Official NEB Exam Countdown Synchronized",
    body: "NEB Class 11 and 12 board examination timeline and subject milestone trackers are live. Review high-yield weightage topics and test your readiness.",
    timestamp: "5 hours ago",
    href: "/exam-countdown",
    actionLabel: "Open Exam Countdown",
  },
  {
    id: "notif-veer-tutor-update",
    category: "ai",
    title: "Veer Study Assistant Enhanced",
    body: "Veer is now grounded in official CDC curriculum definitions and real drawn vector schematics. Open your console to start a lesson or clear concepts.",
    timestamp: "Yesterday",
    href: "/chat",
    actionLabel: "Chat with Veer",
  },
  {
    id: "notif-3d-lab-update",
    category: "system",
    title: "Virtual 3D Laboratory Upgraded",
    body: "Over 96+ interactive 3D simulations are active across Physics, Chemistry, and Biology. Explore optics, projectile motion, and cell biology in 3D.",
    timestamp: "2 days ago",
    href: "/lab/3d",
    actionLabel: "Explore 3D Labs",
  },
  {
    id: "notif-pyq-bank",
    category: "curriculum",
    title: "Previous Year Question Bank Expanded",
    body: "Past 10 years of solved NEB questions for Physics, Chemistry, Biology, and Mathematics with step-by-step model solutions have been updated.",
    timestamp: "3 days ago",
    href: "/pyqs",
    actionLabel: "Practice PYQs",
  },
  {
    id: "notif-account-security",
    category: "account",
    title: "Account Security & Owner Verification Active",
    body: "Administrative approval protection is active. Your notes, saved chat history, and personal bookmarked materials remain private and securely scoped.",
    timestamp: "4 days ago",
    href: "/profile",
    actionLabel: "Account Profile",
  },
];

export const NOTIFICATIONS_STORAGE_KEY = "ravikisan_read_notification_ids";

export interface NotificationSnapshot {
  /** False until the client store has been read (SSR + first hydration render). */
  hydrated: boolean;
  /** Ids the user has approved (read) — those cards no longer render. */
  readIds: ReadonlySet<string>;
  /** Ids still pending approval. */
  pendingIds: readonly string[];
  /** pendingIds.length — the number every badge shows. */
  unreadCount: number;
}

/** Server/first-render snapshot: nothing read yet, nothing claimed as read. */
const EMPTY_SNAPSHOT: NotificationSnapshot = {
  hydrated: false,
  readIds: new Set<string>(),
  pendingIds: INITIAL_NOTIFICATIONS.map((n) => n.id),
  unreadCount: INITIAL_NOTIFICATIONS.length,
};

let snapshot: NotificationSnapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();
let storageListenerAttached = false;

function readStoreFromStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? new Set(parsed.filter((x): x is string => typeof x === "string"))
      : new Set();
  } catch {
    // Corrupt/unreadable store — start with an empty (all-pending) queue.
    return new Set();
  }
}

function rebuild(): void {
  const readIds = readStoreFromStorage();
  const pendingIds = INITIAL_NOTIFICATIONS.filter((n) => !readIds.has(n.id)).map(
    (n) => n.id,
  );
  snapshot = { hydrated: true, readIds, pendingIds, unreadCount: pendingIds.length };
}

function emit(): void {
  for (const listener of [...listeners]) listener();
}

function persist(readIds: ReadonlySet<string>): void {
  try {
    window.localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify([...readIds]),
    );
  } catch {
    // Storage full/unavailable — the in-memory state still updates.
  }
}

/** Cross-tab sync (plan.md §14 5.2): any tab's write re-reads this store. */
function ensureStorageListener(): void {
  if (storageListenerAttached || typeof window === "undefined") return;
  storageListenerAttached = true;
  window.addEventListener("storage", (event) => {
    const key = (event as StorageEvent).key;
    if (key != null && key !== NOTIFICATIONS_STORAGE_KEY) return;
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

/**
 * Re-read the store from localStorage and notify subscribers. The storage
 * event covers cross-tab writes; tests (and any same-tab code that mutates
 * localStorage directly) call this to pick the change up.
 */
export function refreshNotificationsFromStorage(): void {
  rebuild();
  emit();
}

/** Approve (read) one notification — it drops out of the queue. */
export function markNotificationRead(id: string): void {
  const next = readStoreFromStorage();
  next.add(id);
  persist(next);
  rebuild();
  emit();
}

/** Approve the whole queue — every badge must drop to zero. */
export function markAllNotificationsRead(): void {
  const next = new Set(INITIAL_NOTIFICATIONS.map((n) => n.id));
  persist(next);
  rebuild();
  emit();
}
