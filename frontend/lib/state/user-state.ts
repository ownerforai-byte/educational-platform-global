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
  notesScope,
  readNotes,
  writeNotes,
  type PersonalNote,
} from "@/lib/personal-notes";
import { isCurrentScope, key, keyForScope } from "@/lib/scoped-storage";
import {
  enqueueChange,
  mergeById,
  removeQueued,
  samePayload,
  type QueuedChange,
} from "@/lib/user-state-core";

export const NOTES_NAMESPACE = "personal-notes";
/**
 * Queue and version-hint keys are ACCOUNT-SCOPED (suffixed via key()), like
 * every other personal-store key. The unsuffixed names below are only the
 * base; "neb-user-state-queue:v1:u:<id>" etc. are what actually touches
 * localStorage. The unsuffixed literals ARE the pre-scoping legacy keys —
 * migrateLegacyQueue() disposes of them once (see below).
 */
export const QUEUE_KEY = "neb-user-state-queue:v1";
const LAST_VERSION_KEY = "neb-user-state-version:v1";
const MIGRATION_FLAG = "neb-user-state-queue-migrated:v1";

/**
 * One-time upgrade migration for the queue written before these keys were
 * account-scoped. The legacy entries cannot be attributed to an account, so
 * they are NOT adopted into the current account's queue — that would push
 * one account's notes into another's session, the exact leak scoping removed.
 * Disposal is safe because a queued payload is always derived from the
 * queueing scope's own local notes store (queueState only ever receives
 * readNotes()/merged output), and those scoped stores survive under their own
 * keys — the owner's next sync re-merges and re-pushes the same edits. Guest-
 * era entries, if any, could never flush anyway (signed-out pushes 401).
 * Idempotent: a flag keeps the audit log from repeating on every sync.
 */
export function migrateLegacyQueue(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(MIGRATION_FLAG)) return;
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (raw) {
      let count = 0;
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) count = parsed.length;
      } catch {
        /* unparseable legacy junk — disposed all the same */
      }
      if (count > 0) {
        console.info(
          `[user-state] discarded ${count} pre-scoping queued change(s); ` +
            "each account's local store already holds those edits",
        );
      }
      window.localStorage.removeItem(QUEUE_KEY);
    }
    // The legacy version hints are dead weight too (and a poisoned base for
    // any code that ever reads the unsuffixed key again).
    window.localStorage.removeItem(LAST_VERSION_KEY);
    window.localStorage.setItem(MIGRATION_FLAG, "1");
  } catch {
    /* storage blocked: leave everything; the next call retries */
  }
}

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
  // The scope is captured once: if the account switches mid-request, the
  // returned version belongs to the OLD account's row and must not be
  // remembered under the new account's key.
  const scope = notesScope();
  try {
    const result = await apiFetch<{ ok: boolean; version: number }>(statePath(namespace), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ payload, baseVersion }),
    });
    if (isCurrentScope(scope)) rememberVersionFor(scope, namespace, result.version);
    return { ok: true, version: result.version };
  } catch (err) {
    const status = statusOf(err);
    if (status === 409) return { ok: false, reason: "conflict" };
    if (status === 400) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "offline" };
  }
}

function rememberVersionFor(scope: string, namespace: string, version: number): void {
  try {
    const storeKey = keyForScope(LAST_VERSION_KEY, scope);
    const all = JSON.parse(window.localStorage.getItem(storeKey) ?? "{}");
    window.localStorage.setItem(storeKey, JSON.stringify({ ...all, [namespace]: version }));
  } catch {
    /* storage blocked */
  }
}

function rememberVersion(namespace: string, version: number): void {
  rememberVersionFor(notesScope(), namespace, version);
}

function lastVersion(namespace: string): number {
  try {
    const all = JSON.parse(
      window.localStorage.getItem(keyForScope(LAST_VERSION_KEY, notesScope())) ?? "{}",
    );
    const value = all?.[namespace];
    return Number.isInteger(value) ? value : 0;
  } catch {
    return 0;
  }
}

export function readQueue(): QueuedChange[] {
  if (typeof window === "undefined") return [];
  migrateLegacyQueue();
  return readQueueFor(notesScope());
}

function readQueueFor(scope: string): QueuedChange[] {
  try {
    const raw = window.localStorage.getItem(keyForScope(QUEUE_KEY, scope));
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
  writeQueueFor(notesScope(), queue);
}

function writeQueueFor(scope: string, queue: QueuedChange[]): void {
  try {
    const storeKey = keyForScope(QUEUE_KEY, scope);
    // An empty queue is identical to no queue — don't litter every account's
    // storage with a "[]" key on the first flush.
    if (queue.length === 0) window.localStorage.removeItem(storeKey);
    else window.localStorage.setItem(storeKey, JSON.stringify(queue));
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
  // The queue is scoped to the account that queued it. Every entry below was
  // read under `scope`; if the account switches mid-flush, the remaining
  // entries go back under THAT scope's key — never into the new account's
  // session, which would land one account's notes in another's account.
  const scope = notesScope();
  migrateLegacyQueue();
  let queue = readQueueFor(scope);
  let flushed = 0;
  for (const change of [...queue]) {
    if (!isCurrentScope(scope)) break;
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
  writeQueueFor(scope, queue);
  return { flushed, pending: queue.length };
}

/**
 * Best-effort immediate push after a local edit. On a stale version the next
 * full sync re-pulls and merges; on an unreachable backend the write is queued
 * for the next reconnect (only for accounts that have synced before).
 */
export async function pushNotes(): Promise<void> {
  if (typeof window === "undefined") return;
  const scope = notesScope();
  const notes = readNotes();
  // The account switched between the read and now: these notes belong to the
  // old scope, and pushing (or queueing) them would file them under whatever
  // account is signed in NOW.
  if (!isCurrentScope(scope)) return;
  const base = lastVersion(NOTES_NAMESPACE);
  const result = await pushState(NOTES_NAMESPACE, notes, base);
  if (!result.ok && result.reason === "offline") {
    if (isCurrentScope(scope)) queueState(NOTES_NAMESPACE, notes, base);
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
  // Capture the scope BEFORE reading: every decision below (merge write,
  // push, queue) is only valid while this scope is still the signed-in one.
  // my-notes-view guards its own writes the same way; the sync path was the
  // one writer that skipped the guard, so a sign-in completing in another tab
  // mid-sync could file one account's merged notes under another's key.
  const scope = notesScope();
  const local = readNotes();
  const pulled = await pullState<unknown>(NOTES_NAMESPACE);
  if (pulled.kind === "guest") {
    return { changed: false, status: "guest", notes: local };
  }
  if (pulled.kind === "offline") {
    if (local.length && isCurrentScope(scope)) {
      queueState(NOTES_NAMESPACE, local, lastVersion(NOTES_NAMESPACE));
    }
    return { changed: false, status: "offline", notes: local };
  }
  if (!isCurrentScope(scope)) {
    // The account changed while the pull was in flight. Neither the stored
    // merge nor a push may proceed — the caller reloads under the new scope.
    return { changed: false, status: "conflict", notes: [] };
  }

  const remoteNotes = normalizeNotes(pulled.state.payload);
  const merged = mergeById(local, remoteNotes);
  const changed = !samePayload(merged, local);
  if (changed && !writeNotes(merged, scope)) {
    // writeNotes rejected the write: the scope changed while merging.
    return { changed: false, status: "conflict", notes: [] };
  }
  rememberVersion(NOTES_NAMESPACE, pulled.state.version);

  if (samePayload(merged, remoteNotes) && pulled.state.version > 0) {
    return { changed, status: "synced", notes: merged };
  }

  const pushed = await pushState(NOTES_NAMESPACE, merged, pulled.state.version);
  if (!pushed.ok && pushed.reason === "offline") {
    if (isCurrentScope(scope)) queueState(NOTES_NAMESPACE, merged, pulled.state.version);
    return { changed, status: "offline", notes: merged };
  }
  return {
    changed,
    status: pushed.ok ? "synced" : "conflict",
    notes: merged,
  };
}
