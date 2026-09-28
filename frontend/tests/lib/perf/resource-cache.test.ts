import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearSharedResourceCaches,
  clearSharedResourceCachesWhere,
  createResourceCache,
  getSharedResourceCache,
} from "@/lib/perf/resource-cache";

/** Deterministic clock so TTL behaviour needs no fake timers. */
function makeClock(start = 1_000) {
  let current = start;
  return {
    now: () => current,
    advance: (ms: number) => {
      current += ms;
    },
  };
}

/** Flushes pending microtasks/timers so a background refresh can settle. */
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createResourceCache", () => {
  it("serves a fresh entry without calling the loader again", async () => {
    const clock = makeClock();
    const cache = createResourceCache<string>({ freshMs: 100, staleMs: 500, now: clock.now });
    const loader = vi.fn(async () => "payload");

    expect(await cache.load("k", loader)).toBe("payload");
    clock.advance(50);
    expect(await cache.load("k", loader)).toBe("payload");

    expect(loader).toHaveBeenCalledTimes(1);
    expect(cache.stats().hits).toBe(1);
    expect(cache.peek("k")).toBe("payload");
    expect(cache.meta("k")?.isStale).toBe(false);
  });

  it("de-duplicates parallel loads for the same key", async () => {
    const cache = createResourceCache<number>({ freshMs: 1000, staleMs: 2000 });
    const loader = vi.fn(async () => 42);

    const [a, b, c] = await Promise.all([
      cache.load("k", loader),
      cache.load("k", loader),
      cache.load("k", loader),
    ]);

    expect([a, b, c]).toEqual([42, 42, 42]);
    expect(loader).toHaveBeenCalledTimes(1);
    expect(cache.stats().inflightHits).toBeGreaterThan(0);
  });

  it("serves stale data immediately and revalidates in the background", async () => {
    const clock = makeClock();
    const cache = createResourceCache<string>({ freshMs: 100, staleMs: 1000, now: clock.now });
    let calls = 0;
    const loader = async () => `v${(calls += 1)}`;

    expect(await cache.load("k", loader)).toBe("v1");
    clock.advance(150);

    expect(await cache.load("k", loader)).toBe("v1");
    expect(cache.stats().staleHits).toBe(1);

    await flush();
    expect(cache.peek("k")).toBe("v2");
  });

  it("blocks and refetches once the stale window has elapsed", async () => {
    const clock = makeClock();
    const cache = createResourceCache<string>({ freshMs: 100, staleMs: 200, now: clock.now });
    let calls = 0;
    const loader = async () => `v${(calls += 1)}`;

    await cache.load("k", loader);
    clock.advance(500);

    expect(await cache.load("k", loader)).toBe("v2");
    expect(calls).toBe(2);
  });

  it("falls back to the last good value when a refresh fails", async () => {
    const clock = makeClock();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const cache = createResourceCache<string>({ freshMs: 10, staleMs: 20, now: clock.now });

    await cache.load("k", async () => "good");
    clock.advance(50);

    const value = await cache.load("k", async () => {
      throw new Error("backend down");
    });

    expect(value).toBe("good");
    expect(cache.stats().errors).toBeGreaterThan(0);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("rejects when configured without the stale fallback", async () => {
    const clock = makeClock();
    const cache = createResourceCache<string>({
      freshMs: 10,
      staleMs: 20,
      serveStaleOnError: false,
      now: clock.now,
    });

    await cache.load("k", async () => "good");
    clock.advance(50);

    await expect(
      cache.load("k", async () => {
        throw new Error("backend down");
      }),
    ).rejects.toThrow("backend down");
  });

  it("never caches a failed first load", async () => {
    const cache = createResourceCache<string>({ freshMs: 10, staleMs: 20 });

    await expect(
      cache.load("cold", async () => {
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");

    expect(cache.has("cold")).toBe(false);
    expect(cache.peek("cold")).toBeUndefined();
  });

  it("supports set / invalidate / invalidateWhere / clear / keys", () => {
    const cache = createResourceCache<number>({ freshMs: 1000, staleMs: 2000 });

    cache.set("unit-1", 1);
    cache.set("unit-2", 2);
    expect(cache.keys().sort()).toEqual(["unit-1", "unit-2"]);
    expect(cache.stats().size).toBe(2);

    expect(cache.invalidate("unit-1")).toBe(true);
    expect(cache.invalidate("unit-1")).toBe(false);

    expect(cache.invalidateWhere((key) => key.startsWith("unit-"))).toBe(1);
    expect(cache.keys()).toEqual([]);

    cache.set("a", 1);
    cache.clear();
    expect(cache.keys()).toEqual([]);
    expect(cache.stats().size).toBe(0);
  });

  it("bypasses caching for an empty key", async () => {
    const cache = createResourceCache<string>();
    const loader = vi.fn(async () => "value");
    await cache.load("", loader);
    await cache.load("", loader);
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it("notifies subscribers after a value is stored", async () => {
    const cache = createResourceCache<number>({ freshMs: 1000, staleMs: 2000 });
    const seen: Array<[string, number]> = [];
    const unsubscribe = cache.subscribe((key, value) => seen.push([key, value]));

    await cache.load("k", async () => 1);
    unsubscribe();
    await cache.load("other", async () => 2);

    expect(seen).toEqual([["k", 1]]);
  });
});

describe("shared caches", () => {
  it("returns one instance per name and can scope invalidation", () => {
    const first = getSharedResourceCache<string>("test-shared-a", { freshMs: 10, staleMs: 20 });
    const second = getSharedResourceCache<string>("test-shared-a", { freshMs: 999, staleMs: 999 });
    expect(first).toBe(second);

    first.set("k", "v");
    const other = getSharedResourceCache<string>("test-shared-b");
    other.set("k", "v");

    const cleared = clearSharedResourceCachesWhere((name) => name === "test-shared-a");
    expect(cleared).toBe(1);
    expect(first.peek("k")).toBeUndefined();
    expect(other.peek("k")).toBe("v");

    clearSharedResourceCaches();
    expect(other.peek("k")).toBeUndefined();
  });
});
