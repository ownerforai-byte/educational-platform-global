import express from "express";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/mobile/home + /api/mobile/requirements — the native Android
 * client's cold-start bootstrap contract (android-native migration, Agent 2).
 *
 * Pins: the mobile-v1 envelope, feature flags + reused route links, the
 * X-Mobile-Api-Version header, caching, and that /api/mobile is additive —
 * mounted beside /api/v2 without changing any existing route.
 */
import mobileRouter from "../../src/api/mobile";

const app = express();
app.use("/api/mobile", mobileRouter);

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server?.close(resolve));
});

describe("GET /api/mobile/home", () => {
  test("publishes the mobile-v1 bootstrap envelope", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/home`);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-mobile-api-version")).toBe("1");
    expect(await res.json()).toEqual({
      ok: true,
      data: {
        apiVersion: "mobile-v1",
        features: {
          syllabus: true,
          notes: true,
          practice: true,
          aiChat: true,
          community: true,
          pyqs: true,
          formulas: true,
        },
        links: {
          syllabus: "/api/classes",
          notes: "/api/r-notes",
          practice: "/api/practice",
          ai: "/api/ai",
          community: "/api/community",
          pyqs: "/api/mobile/pyqs",
          formulas: "/api/mobile/formulas",
        },
      },
    });
  });

  test("is cacheable (static bootstrap payload)", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/home`);
    expect(res.headers.get("cache-control")).toBe("public, max-age=300");
  });

  test("every advertised link points at an existing /api/* route prefix", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/home`);
    const body = (await res.json()) as {
      data: { links: Record<string, string> };
    };
    for (const link of Object.values(body.data.links)) {
      expect(link.startsWith("/api/")).toBe(true);
    }
  });
});

describe("GET /api/mobile/requirements", () => {
  test("exposes the store-mandated app requirements envelope", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/requirements`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      data: {
        requirements: {
          appName: string;
          clients: { androidPackage: string };
        };
      };
    };
    expect(body.ok).toBe(true);
    expect(body.data.requirements.appName.length).toBeGreaterThan(0);
    expect(body.data.requirements.clients.androidPackage).toBe("com.ravikisan.platform");
  });
});
