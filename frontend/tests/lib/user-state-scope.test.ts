import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Account-scoping of the user-state sync layer. The offline queue and the
 * version hints are keyed per account; the pre-scoping legacy queue is
 * disposed once instead of being adopted (adoption would push one account's
 * notes into another's session); and a mid-flight account switch never lets
 * one account's payload reach another's session or storage key.
 */

vi.mock("@/lib/api-client", () => ({ apiFetch: vi.fn() }));

import { apiFetch } from "@/lib/api-client";
import {
  NOTES_NAMESPACE,
  QUEUE_KEY,
  flushQueue,
  migrateLegacyQueue,
  queueState,
  readQueue,
  syncNotes,
} from "@/lib/user-state";

const apiFetchMock = apiFetch as ReturnType<typeof vi.fn>;

function signIn(id: string | null) {
  if (id === null) window.localStorage.removeItem("rvk:session");
  else
    window.localStorage.setItem(
      "rvk:session",
      JSON.stringify({
        user: { id, email: `${id}@example.com` },
        accessToken: null,
        expiresAt: null,
        savedAt: 1,
      }),
    );
}

const versionKey = (scope: string) => `neb-user-state-version:v1:${scope}`;
const queueKey = (scope: string) => `${QUEUE_KEY}:${scope}`;
const note = (id: string, updatedAt: string) => ({ id, title: id, body: "", quote: "", subjectKey: "", createdAt: updatedAt, updatedAt });

beforeEach(() => {
  window.localStorage.clear();
  apiFetchMock.mockReset();
});

describe("account-scoped queue and version hints", () => {
  it("queues under the signed-in account's key only", () => {
    signIn("a");
    window.localStorage.setItem(versionKey("u:a"), JSON.stringify({ [NOTES_NAMESPACE]: 3 }));
    expect(queueState(NOTES_NAMESPACE, [note("n1", "2026-11-07T00:00:00Z")], 3)).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(queueKey("u:a"))!)).toHaveLength(1);
    // Another account sees an empty queue and has no queue key of its own.
    signIn("b");
    expect(readQueue()).toEqual([]);
    expect(window.localStorage.getItem(queueKey("u:b"))).toBeNull();
  });

  it("keeps the guest guard: no version hint for this scope, nothing queued", () => {
    signIn(null);
    // The legacy unscoped hint must not leak into the anon scope's decision.
    window.localStorage.setItem("neb-user-state-version:v1", JSON.stringify({ [NOTES_NAMESPACE]: 5 }));
    expect(queueState(NOTES_NAMESPACE, [note("n1", "2026-11-07T00:00:00Z")], 0)).toBe(false);
    expect(window.localStorage.getItem(queueKey("anon:"))?.length ?? 0).toBe(0);
    expect(readQueue()).toEqual([]);
  });
});

describe("legacy queue migration", () => {
  it("disposes the pre-scoping queue once instead of adopting it into the current account", async () => {
    const legacy = [
      { namespace: NOTES_NAMESPACE, payload: [note("stale", "2026-11-01T00:00:00Z")], baseVersion: 2, queuedAt: "2026-11-01T00:00:00Z" },
    ];
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(legacy));
    window.localStorage.setItem("neb-user-state-version:v1", JSON.stringify({ [NOTES_NAMESPACE]: 2 }));
    signIn("b");
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    await flushQueue();

    // Nothing from the legacy queue was pushed (it may belong to any account)
    // and nothing was adopted into b's queue...
    expect(apiFetchMock).not.toHaveBeenCalled();
    expect(window.localStorage.getItem(queueKey("u:b"))).toBeNull();
    // ...the legacy keys are gone, the run is logged once, and a flag keeps
    // later syncs from re-logging.
    expect(window.localStorage.getItem(QUEUE_KEY)).toBeNull();
    expect(window.localStorage.getItem("neb-user-state-version:v1")).toBeNull();
    expect(info).toHaveBeenCalledTimes(1);
    expect(info.mock.calls[0][0]).toContain("1 pre-scoping queued change");
    migrateLegacyQueue();
    expect(info).toHaveBeenCalledTimes(1);
    info.mockRestore();
  });

  it("leaves nothing behind when the legacy queue is absent but still flags the migration", () => {
    signIn("a");
    migrateLegacyQueue();
    expect(window.localStorage.getItem("neb-user-state-queue-migrated:v1")).toBe("1");
    expect(window.localStorage.getItem(QUEUE_KEY)).toBeNull();
  });
});

describe("mid-flight account switch", () => {
  it("writes the remaining queue back under the ORIGINAL scope when the account switches mid-flush", async () => {
    signIn("a");
    window.localStorage.setItem(versionKey("u:a"), JSON.stringify({ [NOTES_NAMESPACE]: 1, srs: 1 }));
    queueState(NOTES_NAMESPACE, [note("n1", "2026-11-07T00:00:00Z")], 1);
    queueState("srs", { deck: 1 }, 1);
    expect(readQueue()).toHaveLength(2);

    apiFetchMock
      .mockResolvedValueOnce({ ok: true, version: 2 }) // first namespace flushes
      .mockImplementationOnce(async () => {
        signIn("b"); // account switches while the second push is in flight
        throw Object.assign(new Error("network down"), { status: 0 });
      });

    const result = await flushQueue();
    expect(result.flushed).toBe(1);
    // The un-flushed entry goes back under a's key — never into b's session
    // or b's queue key.
    expect(JSON.parse(window.localStorage.getItem(queueKey("u:a"))!)).toHaveLength(1);
    expect(window.localStorage.getItem(queueKey("u:b"))).toBeNull();
  });

  it("aborts the sync without writing when the account switches during the pull", async () => {
    signIn("a");
    window.localStorage.setItem(
      "neb-my-notes:v1:u:a",
      JSON.stringify([note("local", "2026-11-07T00:00:00Z")]),
    );
    apiFetchMock.mockImplementationOnce(async () => {
      signIn("b"); // sign-in completes while the pull is in flight
      return { namespace: NOTES_NAMESPACE, payload: [note("remote", "2026-11-08T00:00:00Z")], version: 4, updatedAt: null };
    });

    const result = await syncNotes();
    expect(result.status).toBe("conflict");
    expect(result.changed).toBe(false);
    // No merge write under the new account, no push, no queue entry.
    expect(window.localStorage.getItem("neb-my-notes:v1:u:b")).toBeNull();
    expect(apiFetchMock).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem(queueKey("u:b"))).toBeNull();
  });
});
