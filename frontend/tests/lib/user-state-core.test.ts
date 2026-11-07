import { describe, expect, it } from "vitest";
import {
  enqueueChange,
  mergeById,
  removeQueued,
  samePayload,
  type QueuedChange,
} from "@/lib/user-state-core";

type Note = { id: string; updatedAt: string; title: string };

describe("mergeById", () => {
  const older: Note = { id: "a", updatedAt: "2026-11-01T00:00:00Z", title: "old" };
  const newer: Note = { id: "a", updatedAt: "2026-11-07T00:00:00Z", title: "new" };
  const onlyLocal: Note = { id: "b", updatedAt: "2026-11-02T00:00:00Z", title: "local" };
  const onlyRemote: Note = { id: "c", updatedAt: "2026-11-03T00:00:00Z", title: "remote" };

  it("keeps both sides and lets the newest edit win per id", () => {
    const merged = mergeById([older, onlyLocal], [newer, onlyRemote]);
    // Newest edit first: a (Nov 7) beats c (Nov 3) beats b (Nov 2).
    expect(merged.map((n) => n.id)).toEqual(["a", "c", "b"]);
    expect(merged.find((n) => n.id === "a")?.title).toBe("new");
  });

  it("is symmetric: the same result when local and remote are swapped", () => {
    const a = mergeById([older, onlyLocal], [newer, onlyRemote]);
    const b = mergeById([newer, onlyRemote], [older, onlyLocal]);
    expect(a).toEqual(b);
  });

  it("is idempotent and returns an empty list for two empty stores", () => {
    expect(mergeById([], [])).toEqual([]);
    const once = mergeById([older], [newer]);
    expect(mergeById(once, once)).toEqual(once);
  });
});

describe("offline queue", () => {
  const change = (payload: unknown, baseVersion: number): QueuedChange => ({
    namespace: "personal-notes",
    payload,
    baseVersion,
    queuedAt: "2026-11-07T00:00:00Z",
  });

  it("keeps one pending change per namespace but preserves its original baseVersion", () => {
    let queue: QueuedChange[] = [];
    queue = enqueueChange(queue, change({ v: 1 }, 4));
    queue = enqueueChange(queue, change({ v: 2 }, 9));
    expect(queue).toHaveLength(1);
    expect(queue[0].payload).toEqual({ v: 2 });
    expect(queue[0].baseVersion).toBe(4);
  });

  it("keeps changes for different namespaces and drops only the requested one", () => {
    let queue = enqueueChange([], change({ v: 1 }, 0));
    queue = enqueueChange(queue, { ...change({ v: 2 }, 0), namespace: "srs" });
    expect(queue).toHaveLength(2);
    expect(removeQueued(queue, "personal-notes").map((c) => c.namespace)).toEqual(["srs"]);
  });

  it("bounds the queue so a long offline session cannot grow forever", () => {
    let queue: QueuedChange[] = [];
    for (let i = 0; i < 30; i++) {
      queue = enqueueChange(queue, { ...change(i, 0), namespace: `ns-${i}` }, 5);
    }
    expect(queue).toHaveLength(5);
  });

  it("compares payloads by value, not identity", () => {
    expect(samePayload({ a: 1 }, { a: 1 })).toBe(true);
    expect(samePayload({ a: 1 }, { a: 2 })).toBe(false);
  });
});
