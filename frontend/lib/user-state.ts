/**
 * Account-backed user state — the sync layer behind the personal stores.
 *
 * Rule: localStorage is the offline cache and source of truth for rendering;
 * the server row is the durable copy across devices. A sync pulls the server
 * document, merges by id (newest edit wins), writes the merged result locally,
 * then pushes it with the version it read. A stale push gets 409 and the next
 * pull merges again. Nothing here ever blocks the UI: every failure leaves the
 * local store usable and, for an already-linked account, queues the write.
 *
 * Guest sessions (401) are never queued — a signed-out visitor's notes must
 * not later land under whichever account signs in on the same device.
 */
import { apiFetch } from "@/lib/api-client";
import {
  normalizeNotes,
  readNotes,
  writeNotes,
  type PersonalNote,
} from "@/lib/personal-notes";
import {
  enqueueChange,
  mergeById,
  removeQueued,
  samePayload,
  type QueuedChange,
} from "@/lib/user-state-core";

export const NOTES_NAMESPACE = "personal-notes";
export const QUEUE_KEY = "neb-user-state-queue:v1";
const LAST_VERSION_KEY = "neb-user-state-version:v1";

export interface RemoteState<T> {
  namespace: string;
  payload: T | null;
  version: number;
  updatedAt: string | null;
}

type PullResult<T> =
  | { kind: "ok"; state: RemoteState<T> }
  | { kind: "guest" }
  | { kind: "offline" };

type PushResult =
  | { ok: true; version: number }
  | { ok: false; reason: "conflict" | "invalid" | "offline" };

function statusOf(err: unknown): number | undefined {
  return (err as { status?: number } | null)?.status;
}

function statePath(namespace: string): string {
  return `/api/user-state/${encodeURIComponent(namespace)}`;
}

export async function pullState<T>(namespace: string): Promise<PullResult<T>> {
  try {
    const state = await apiFetch<RemoteState<T>>(statePath(namespace));
    return { kind: "ok", state };
  } catch (err) {
    // apiFetch already tried the refresh-and-retry; a remaining 401 means
    // there is no session at all, not a broken connection.
    return statusOf(err) === 401 ? { kind: "guest" } : { kind: "offline" };
  }
}

export async function pushState(
  namespace: string,
  payload: unknown,
  baseVersion: number,
): Promise<PushResult> {
  try {
    const result = await apiFetch<{ ok: boolean; version: number }>(statePath(namespace), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ payload, baseVersion }),
    });
    rememberVersion(namespace, result.version);
    return { ok: true, version: result.version };
  } catch (err) {
    const status = statusOf(err);
    if (status === 409) return { ok: false, reason: "conflict" };
    if (status === 400) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "offline" };
  }
}

function rememberVersion(namespace: string, version: number): void {
  try {
    const all = JSON.parse(window.localStorage.getItem(LAST_VERSION_KEY) ?? "{}");
    window.localStorage.setItem(
      LAST_VERSION_KEY,
      JSON.stringify({ ...all, [namespace]: version }),
    );
  } catch {
    /* storage blocked */
  }
}

function lastVersion(namespace: string): number {
  try {
    const all = JSON.parse(window.localStorage.getItem(LAST_VERSION_KEY) ?? "{}");
    const value = all?.[namespace];
    return Number.isInteger(value) ? value : 0;
  } catch {
    return 0;
  }
}

export function readQueue(): QueuedChange[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (c) => c && typeof c.namespace === "string" && Number.isInteger(c.baseVersion),
        )
      : [];
  } catch {
    return [];
  }
}

export function writeQueue(queue: QueuedChange[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    /* storage full or blocked */
  }
}

/**
 * Queue an offline write only for an account that has synced before. That
 * single guard is what keeps a guest's device-local notes out of a different
 * person's account later.
 */
export function queueState(namespace: string, payload: unknown, baseVersion: number): boolean {
  if (lastVersion(namespace) <= 0) return false;
  writeQueue(
    enqueueChange(readQueue(), {
      namespace,
      payload,
      baseVersion,
      queuedAt: new Date().toISOString(),
    }),
  );
  return true;
}

export async function flushQueue(): Promise<{ flushed: number; pending: number }> {
  let queue = readQueue();
  let flushed = 0;
  for (const change of [...queue]) {
    const result = await pushState(change.namespace, change.payload, change.baseVersion);
    if (result.ok) {
      queue = removeQueued(queue, change.namespace);
      flushed += 1;
      continue;
    }
    if (result.reason === "offline") break; // keep the rest for the next reconnect
    if (result.reason === "conflict") {
      // A newer server document exists. Drop this queued write; the namespace's
      // next sync re-pulls and merges with the correct version.
      queue = removeQueued(queue, change.namespace);
    }
    if (result.reason === "invalid") {
      queue = removeQueued(queue, change.namespace); // never retry a bad payload
    }
  }
  writeQueue(queue);
  return { flushed, pending: queue.length };
}

/**
 * Best-effort immediate push after a local edit. On a stale version the next
 * full sync re-pulls and merges; on an unreachable backend the write is queued
 * for the next reconnect (only for accounts that have synced before).
 */
export async function pushNotes(): Promise<void> {
  if (typeof window === "undefined") return;
  const notes = readNotes();
  const base = lastVersion(NOTES_NAMESPACE);
  const result = await pushState(NOTES_NAMESPACE, notes, base);
  if (!result.ok && result.reason === "offline") {
    queueState(NOTES_NAMESPACE, notes, base);
  }
}

export interface SyncResult {
  /** Local notes changed and the UI should reload them. */
  changed: boolean;
  status: "synced" | "guest" | "offline" | "conflict";
  notes: PersonalNote[];
}

/**
 * Sync the personal-notes namespace. Safe to call on mount, on reconnect, and
 * when the tab becomes visible. Returns the merged notes so callers can avoid
 * a second localStorage read.
 */
export async function syncNotes(): Promise<SyncResult> {
  if (typeof window === "undefined") {
    return { changed: false, status: "offline", notes: [] };
  }
  const local = readNotes();
  const pulled = await pullState<unknown>(NOTES_NAMESPACE);
  if (pulled.kind === "guest") {
    return { changed: false, status: "guest", notes: local };
  }
  if (pulled.kind === "offline") {
    if (local.length) queueState(NOTES_NAMESPACE, local, lastVersion(NOTES_NAMESPACE));
    return { changed: false, status: "offline", notes: local };
  }

  const remoteNotes = normalizeNotes(pulled.state.payload);
  const merged = mergeById(local, remoteNotes);
  const changed = !samePayload(merged, local);
  if (changed) writeNotes(merged);
  rememberVersion(NOTES_NAMESPACE, pulled.state.version);

  if (samePayload(merged, remoteNotes) && pulled.state.version > 0) {
    return { changed, status: "synced", notes: merged };
  }

  const pushed = await pushState(NOTES_NAMESPACE, merged, pulled.state.version);
  if (!pushed.ok && pushed.reason === "offline") {
    queueState(NOTES_NAMESPACE, merged, pulled.state.version);
    return { changed, status: "offline", notes: merged };
  }
  return {
    changed,
    status: pushed.ok ? "synced" : "conflict",
    notes: merged,
  };
}
