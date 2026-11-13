import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/config — the public runtime flags the UI mirrors.
 *
 * The owner ON/OFF coin gate was removed 2026-11-06: access is decided by the
 * tier section registry (and SparkGate), never by a billing switch, so the
 * endpoint no longer publishes `coinGateEnabled`. These tests pin the remaining
 * contract: the live billing constants, the owner-set section minimums, no
 * caching, and a hard failure instead of silently pretending everything is free.
 */

const minTiers: Record<string, string> = {};
const state = { fail: false };

vi.mock("../../src/utils/sectionTiers", () => ({
  readSectionMinTiers: vi.fn(async () => {
    if (state.fail) throw new Error("settings unavailable");
    return { ...minTiers };
  }),
}));

import configRoutes from "../../src/api/admin/config.controller";

const app = express();
app.use("/api/config", configRoutes);

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

describe("GET /api/config", () => {
  test("publishes the live billing constants and no gate switch", async () => {
    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      dailyCreditPool: 4,
      aiMessageCost: 0,
      sectionMinTiers: {},
    });
  });

  test("publishes owner-set section minimums alongside the flags", async () => {
    minTiers.pdfs = "owner";

    const res = await fetch(`${baseUrl}/api/config`);
    const body = (await res.json()) as { sectionMinTiers: Record<string, string> };
    expect(res.status).toBe(200);
    expect(body.sectionMinTiers).toEqual({ pdfs: "owner" });
    delete minTiers.pdfs;
  });

  test("never caches the config (an owner save must be visible immediately)", async () => {
    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  test("surfaces a settings failure instead of silently freeing the platform", async () => {
    state.fail = true;

    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.status).toBe(500);
    state.fail = false;
  });
});
