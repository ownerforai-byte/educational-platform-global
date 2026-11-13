import { describe, expect, it, vi } from "vitest";
import { sendError, sendSuccess } from "../../src/lib/response.js";

function mockRes() {
  const res = {
    statusCode: 200,
    body: null as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

describe("API envelope helpers", () => {
  it("sendSuccess wraps payload in { ok: true, data }", () => {
    const res = mockRes();
    sendSuccess(res as never, { dailyCreditPool: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, data: { dailyCreditPool: 4 } });
  });

  it("sendError keeps legacy string error and ok:false", () => {
    const res = mockRes();
    sendError(res as never, "Not found", 404, "NOT_FOUND");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      ok: false,
      error: "Not found",
      message: "Not found",
      code: "NOT_FOUND",
    });
  });
});

describe("content cache", () => {
  it("getOrLoad returns cached value within TTL", async () => {
    const { TtlLruCache } = await import("../../src/lib/cache.js");
    const cache = new TtlLruCache(8);
    const loader = vi.fn(async () => ({ n: 1 }));
    const a = await cache.getOrLoad("k", 60_000, loader);
    const b = await cache.getOrLoad("k", 60_000, loader);
    expect(a).toEqual({ n: 1 });
    expect(b).toEqual({ n: 1 });
    expect(loader).toHaveBeenCalledTimes(1);
  });
});
