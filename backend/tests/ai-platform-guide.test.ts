import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.AGNES_API_KEY = "test-key";
process.env.AGNES_PLATFORM_GUIDE_RETRY_DELAY_MS = "1";

const guideRouter = (await import("../src/api/ai-platform-guide")).default;
const { resetRateLimits } = await import("../src/middleware/rateLimit");
const httpFetch = globalThis.fetch;
const servers: http.Server[] = [];

async function mountGuide() {
  const app = express();
  app.use(express.json());
  app.use("/api/ai/platform-guide", guideRouter);
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${port}/api/ai/platform-guide`;
}

async function send(url: string) {
  const response = await httpFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "What can I study here?" }),
  });
  return { status: response.status, body: await response.json() };
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
  resetRateLimits();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

afterAll(async () => {
  await Promise.all(servers.map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
});

describe("public platform guide", () => {
  it("retries an Agnes throttle once and returns the answer", async () => {
    const upstream = vi.mocked(fetch)
      .mockResolvedValueOnce(new Response("throttled", {
        status: 429,
        headers: { "Retry-After": "0" },
      }))
      .mockResolvedValueOnce(Response.json({
        choices: [{ message: { content: "Class 11 and Class 12 notes, labs, and exam preparation." } }],
      }));
    const url = await mountGuide();

    const result = await send(url);

    expect(result).toEqual({
      status: 200,
      body: {
        reply: "Class 11 and Class 12 notes, labs, and exam preparation.",
        provider: "agnes",
      },
    });
    expect(upstream).toHaveBeenCalledTimes(2);
  });

  it("retries a dropped connection once", async () => {
    const upstream = vi.mocked(fetch)
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(Response.json({
        choices: [{ message: { content: "Browse Class 11 and Class 12 study resources." } }],
      }));
    const url = await mountGuide();

    const result = await send(url);

    expect(result.status).toBe(200);
    expect(result.body.reply).toBe("Browse Class 11 and Class 12 study resources.");
    expect(upstream).toHaveBeenCalledTimes(2);
  });

  it("returns the existing unavailable response after repeated throttling", async () => {
    const upstream = vi.mocked(fetch)
      .mockResolvedValue(new Response("throttled", {
        status: 429,
        headers: { "Retry-After": "0" },
      }));
    const url = await mountGuide();

    const result = await send(url);

    expect(result.status).toBe(502);
    expect(result.body.error).toBe("Guide unavailable");
    expect(upstream).toHaveBeenCalledTimes(2);
  });
});
