import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/[...path]/route";

function request(method: string): NextRequest {
  return new NextRequest("https://harindrasah.com.np/api/ai/chat?stream=1", {
    method,
    headers: { "content-type": "application/json" },
    ...(method === "GET" || method === "HEAD" ? {} : { body: '{"message":"hello"}' }),
  });
}

const context = { params: Promise.resolve({ path: ["ai", "chat"] }) };

describe("backend proxy retries", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("retries an idempotent GET after a transport failure", async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new TypeError("connection reset"))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(request("GET"), context);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("ok");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain("/api/ai/chat?stream=1");
  });

  it.each(["POST", "PUT", "PATCH", "DELETE"])(
    "does not replay %s after a transport failure",
    async (method) => {
      const fetchMock = vi.fn().mockRejectedValue(new TypeError("connection reset"));
      vi.stubGlobal("fetch", fetchMock);

      const response = await POST(request(method), context);

      expect(response.status).toBe(503);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({
        method,
        body: '{"message":"hello"}',
      });
    },
  );

  it("does not retry a mutation that returned an HTTP error", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("failed", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(request("POST"), context);

    expect(response.status).toBe(500);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
