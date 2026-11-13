import { describe, expect, it, vi } from "vitest";
import { TtlLruCache } from "../../src/lib/cache.js";

describe("TtlLruCache", () => {
  it("evicts oldest when over capacity", () => {
    const cache = new TtlLruCache(2);
    cache.set("a", 1, 60_000);
    cache.set("b", 2, 60_000);
    cache.set("c", 3, 60_000);
    expect(cache.get("a")).toBeNull();
    expect(cache.get("b")?.value).toBe(2);
    expect(cache.get("c")?.value).toBe(3);
  });

  it("serves stale while revalidating", async () => {
    vi.useFakeTimers();
    const cache = new TtlLruCache(4);
    let n = 0;
    const loader = vi.fn(async () => {
      n += 1;
      return n;
    });
    expect(await cache.getOrLoad("x", 1000, loader, 5000)).toBe(1);
    vi.advanceTimersByTime(1500);
    const stale = await cache.getOrLoad("x", 1000, loader, 5000);
    expect(stale).toBe(1);
    await Promise.resolve();
    await Promise.resolve();
    vi.useRealTimers();
  });
});
