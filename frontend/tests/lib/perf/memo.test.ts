import { describe, expect, it, vi } from "vitest";
import {
  createLru,
  lazy,
  memoize,
  memoizeAsync,
  memoizeBy,
  once,
  shallowEqual,
  stableKeyOf,
} from "@/lib/perf/memo";

describe("shallowEqual", () => {
  it("compares primitives, arrays and plain objects", () => {
    expect(shallowEqual(1, 1)).toBe(true);
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(shallowEqual([1, 2], [1, 2])).toBe(true);
    expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(shallowEqual(null, {})).toBe(false);
  });
});

describe("createLru", () => {
  it("evicts the least recently used entry", () => {
    const lru = createLru<number>(2);
    lru.set("a", 1);
    lru.set("b", 2);
    lru.get("a"); // refresh recency
    lru.set("c", 3);

    expect(lru.has("a")).toBe(true);
    expect(lru.has("b")).toBe(false);
    expect(lru.has("c")).toBe(true);
    expect(lru.size()).toBe(2);
  });

  it("clamps capacity and supports delete/clear/keys", () => {
    const lru = createLru<number>(0);
    expect(lru.capacity).toBe(1);
    lru.set("x", 1);
    expect(lru.keys()).toEqual(["x"]);
    expect(lru.delete("x")).toBe(true);
    expect(lru.delete("x")).toBe(false);
    lru.set("y", 2);
    lru.clear();
    expect(lru.size()).toBe(0);
  });
});

describe("stableKeyOf", () => {
  it("is deterministic for equal inputs and distinct across types", () => {
    expect(stableKeyOf(["a", 1])).toBe(stableKeyOf(["a", 1]));
    expect(stableKeyOf(["a"])).not.toBe(stableKeyOf(["b"]));
    expect(stableKeyOf([1])).not.toBe(stableKeyOf(["1"]));
    expect(typeof stableKeyOf([() => 1])).toBe("string");
  });

  it("does not throw on circular structures", () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(typeof stableKeyOf([circular])).toBe("string");
  });
});

describe("memoize", () => {
  it("computes once per key and exposes cache controls", () => {
    const fn = vi.fn((n: number) => n * 2);
    const memoized = memoize(fn);

    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized.size()).toBe(1);
    expect(memoized.has(2)).toBe(true);

    memoized.clear();
    expect(memoized.size()).toBe(0);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("supports custom keys and LRU bounds", () => {
    const fn = vi.fn((obj: { id: string }) => obj.id);
    const memoized = memoize(fn, { key: (obj) => obj.id, max: 1 });

    expect(memoized({ id: "a" })).toBe("a");
    expect(memoized({ id: "a" })).toBe("a");
    expect(fn).toHaveBeenCalledTimes(1);
    memoized({ id: "b" });
    expect(memoized.size()).toBe(1);
  });

  it("memoizeBy only caches a single argument", () => {
    const fn = vi.fn((s: string) => s.toUpperCase());
    const upper = memoizeBy(fn);
    expect(upper("a")).toBe("A");
    expect(upper("a")).toBe("A");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("once and lazy", () => {
  it("runs the factory exactly once and replays the failure", () => {
    const factory = vi.fn(() => 7);
    const read = once(factory);
    expect(read()).toBe(7);
    expect(read()).toBe(7);
    expect(factory).toHaveBeenCalledTimes(1);

    const failing = once(() => {
      throw new Error("init failed");
    });
    expect(() => failing()).toThrow("init failed");
    expect(() => failing()).toThrow("init failed");
  });

  it("lazy defers work and reports initialization", () => {
    const factory = vi.fn(() => ({ heavy: true }));
    const value = lazy(factory);
    expect(value.isInitialized).toBe(false);
    expect(value.get()).toEqual({ heavy: true });
    expect(value.get()).toEqual({ heavy: true });
    expect(value.isInitialized).toBe(true);
    expect(factory).toHaveBeenCalledTimes(1);
  });
});

describe("memoizeAsync", () => {
  it("de-duplicates parallel calls for the same key", async () => {
    const fn = vi.fn(async (id: string) => `value:${id}`);
    const memoized = memoizeAsync(fn);

    const [a, b] = await Promise.all([memoized("x"), memoized("x")]);
    expect(a).toBe("value:x");
    expect(b).toBe("value:x");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized.has("x")).toBe(true);
  });

  it("never caches a rejection and supports invalidation", async () => {
    let attempt = 0;
    const memoized = memoizeAsync(async () => {
      attempt += 1;
      if (attempt === 1) throw new Error("cold start");
      return "warm";
    });

    await expect(memoized()).rejects.toThrow("cold start");
    await expect(memoized()).resolves.toBe("warm");
    expect(attempt).toBe(2);

    memoized.invalidate();
    expect(memoized.size()).toBe(0);
  });

  it("respects a ttl window using the injected clock behaviour of Date.now", async () => {
    const nowSpy = vi.spyOn(Date, "now");
    nowSpy.mockReturnValue(1_000);
    const fn = vi.fn(async () => "payload");
    const memoized = memoizeAsync(fn, { ttlMs: 100 });

    await memoized();
    nowSpy.mockReturnValue(1_050);
    await memoized();
    expect(fn).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(1_200);
    await memoized();
    expect(fn).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });
});
