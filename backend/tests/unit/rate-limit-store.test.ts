import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryStore, UpstashStore } from "../../src/middleware/rateLimitStore";

describe("RateLimitStore", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("MemoryStore increments within the window", async () => {
    const store = new MemoryStore();
    const a = await store.hit("auth:1.1.1.1", 60_000);
    expect(a.count).toBe(1);
    const b = await store.hit("auth:1.1.1.1", 60_000);
    expect(b.count).toBe(2);
    expect(b.reset).toBe(a.reset);
  });

  it("UpstashStore uses INCR + PEXPIRE via REST", async () => {
    const calls: unknown[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body ?? "[]")) as unknown[];
        calls.push(body);
        if (body[0] === "INCR") {
          return {
            ok: true,
            json: async () => ({ result: calls.filter((c) => (c as string[])[0] === "INCR").length }),
          };
        }
        if (body[0] === "PEXPIRE") {
          return { ok: true, json: async () => ({ result: 1 }) };
        }
        if (body[0] === "PTTL") {
          return { ok: true, json: async () => ({ result: 55_000 }) };
        }
        return { ok: true, json: async () => ({ result: null }) };
      }),
    );

    const store = new UpstashStore("https://example.upstash.io", "token");
    const first = await store.hit("auth:ip", 60_000);
    expect(first.count).toBe(1);
    expect(calls[0]).toEqual(["INCR", "rl:auth:ip"]);
    expect(calls[1]).toEqual(["PEXPIRE", "rl:auth:ip", 60_000]);
  });
});
