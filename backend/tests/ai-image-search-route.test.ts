import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * /api/ai/image-search — direct Google Images presenting in the Image Hub
 * (owner request 2026-10-04: "the image produced are too low, so direct
 * presenting from google is best").
 *
 * Pinned here:
 *   · the router keeps `requireAuth` (source pin) — a search costs the
 *     platform's CSE quota, so it is never anonymous;
 *   · the honest `{ configured: false }` answer when no GOOGLE_CSE key exists,
 *     with NO upstream fetch (a key-gated source that leaks a request without
 *     a key is the bug this module exists to prevent);
 *   · the success shape the details interface consumes: url, page, host,
 *     title, snippet, width, height;
 *   · Google's own query ranking is trusted (requireRelevance off) — a good
 *     image whose title words the query differently still reaches the hub;
 *   · 400 without q, 503 when Google fails (quota/network).
 *
 * NOTE on the stub: the test drives the router over real HTTP through the
 * global `fetch`, so stubbing `fetch` outright would hijack the test's own
 * client (the mock would answer the HTTP call instead of the server). The
 * helper below delegates same-host calls to the real fetch and only fakes
 * requests that go to Google.
 */

vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  return {
    ...actual,
    requireAuth: (req: Request, _res: Response, next: () => void) => {
      (req as unknown as { user: { id: string; role: string } }).user = {
        id: (req.headers["x-test-user"] as string) || "user-a",
        role: "STUDENT",
      };
      next();
    },
  };
});

import imageSearchRoutes from "../src/api/ai-image-search";

const app = express();
app.use("/api/ai/image-search", imageSearchRoutes);

let server: Server;
let baseUrl: string;
/** Captured BEFORE any stubbing — the test's own HTTP client. */
let realFetch: typeof globalThis.fetch;
let fetchMock: ReturnType<typeof vi.fn>;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
  realFetch = globalThis.fetch;
});

afterAll(async () => {
  await new Promise((resolve) => server?.close(resolve));
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.GOOGLE_CSE_API_KEY;
  delete process.env.GOOGLE_CSE_CX;
  delete process.env.GOOGLE_DIAGRAMS;
});

/** Fake only the outbound Google calls; localhost calls reach the server. */
function stubGoogleFetch(handler: () => Response): void {
  fetchMock = vi.fn(async (input: unknown, init?: RequestInit) => {
    if (String(input).startsWith(baseUrl)) return realFetch(input, init);
    return handler();
  });
  vi.stubGlobal("fetch", fetchMock);
}

/** Outbound calls that were meant for Google. */
function googleCalls(): unknown[][] {
  return (fetchMock?.mock.calls ?? []).filter(
    ([input]) => !String(input).startsWith(baseUrl),
  );
}

async function search(query: string) {
  const res = await fetch(`${baseUrl}/api/ai/image-search${query}`, {
    headers: { "x-test-user": "user-a" },
  });
  return {
    status: res.status,
    json: (await res.json().catch(() => ({}))) as Record<string, any>,
  };
}

/** A well-formed CSE image item whose title does NOT echo the query words. */
const CSE_ITEM = {
  title: "Kidney tubule cross-section, labelled plate",
  link: "https://school.example/img/nephron.png",
  snippet: "Cross-section of a nephron with parts numbered for class 11.",
  mime: "image/png",
  image: {
    contextLink: "https://school.example/nephron-plate",
    width: 1600,
    height: 1000,
  },
};

describe("/api/ai/image-search", () => {
  test("is guarded by requireAuth (source pin)", () => {
    const src = readFileSync(
      path.resolve(__dirname, "../src/api/ai-image-search.ts"),
      "utf8",
    );
    expect(src).toMatch(/router\.get\("[^"]*", requireAuth/);
  });

  test("answers configured:false WITHOUT touching Google when no key exists", async () => {
    stubGoogleFetch(() => new Response("{}"));

    const { status, json } = await search("?q=nephron%20diagram");
    expect(status).toBe(200);
    expect(json.configured).toBe(false);
    expect(json.results).toEqual([]);
    expect(googleCalls()).toHaveLength(0);
  });

  test("returns the details-interface shape for a good result", async () => {
    process.env.GOOGLE_CSE_API_KEY = "test-key";
    process.env.GOOGLE_CSE_CX = "test-cx";
    stubGoogleFetch(
      () => new Response(JSON.stringify({ items: [CSE_ITEM] }), { status: 200 }),
    );

    const { status, json } = await search("?q=nephron+diagram&limit=6");
    expect(status).toBe(200);
    expect(json.configured).toBe(true);
    expect(json.results).toHaveLength(1);

    const image = json.results[0];
    expect(image.url).toBe("https://school.example/img/nephron.png");
    expect(image.page).toBe("https://school.example/nephron-plate");
    expect(image.host).toBe("school.example");
    expect(image.title).toContain("Kidney tubule");
    expect(image.snippet).toContain("class 11");
    expect(image.width).toBe(1600);
    expect(image.height).toBe(1000);

    const requestUrl = String(googleCalls()[0][0]);
    expect(requestUrl).toContain("searchType=image");
    expect(requestUrl).toContain("safe=active");
    expect(requestUrl).toContain("q=nephron%20diagram");
    expect(requestUrl).toContain("num=10");
  });

  test("trusts Google's ranking — relevance words are not required", async () => {
    process.env.GOOGLE_CSE_API_KEY = "test-key";
    process.env.GOOGLE_CSE_CX = "test-cx";
    stubGoogleFetch(
      () => new Response(JSON.stringify({ items: [CSE_ITEM] }), { status: 200 }),
    );

    // "human heart" shares no word with the title above; the chat's strict
    // reference filter would drop it, the hub must not.
    const { json } = await search("?q=human+heart+diagram");
    expect(json.configured).toBe(true);
    expect(json.results).toHaveLength(1);
  });

  test("400 without q", async () => {
    const { status } = await search("");
    expect(status).toBe(400);
  });

  test("503 when Google fails (quota/network) — the hub keeps the query", async () => {
    process.env.GOOGLE_CSE_API_KEY = "test-key";
    process.env.GOOGLE_CSE_CX = "test-cx";
    stubGoogleFetch(() => new Response("quota", { status: 429 }));

    const { status, json } = await search("?q=nephron");
    expect(status).toBe(503);
    expect(json.error).toMatch(/unavailable/i);
  });
});
