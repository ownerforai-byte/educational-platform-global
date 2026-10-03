import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/config — the public runtime flags the chat UI mirrors.
 *
 * Regression guard for the owner report 2026-10-03 ("coin gate on/off not
 * working"): the server honored the gate, but the client had no way to read
 * it, so students at 0 credits stayed locked even with the gate OFF. The
 * endpoint must always answer with the live flag, never be cached, and never
 * pretend the platform is free when the settings read fails.
 */

const gate = { enabled: true, fail: false };

vi.mock("../src/utils/credits", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/utils/credits")>();
  return {
    ...actual,
    isCoinGateEnabled: vi.fn(async () => {
      if (gate.fail) throw new Error("settings unavailable");
      return gate.enabled;
    }),
  };
});

import configRoutes from "../src/api/config";

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
  test("reports the gate ON with the live billing constants", async () => {
    gate.enabled = true;
    gate.fail = false;

    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      coinGateEnabled: true,
      dailyCreditPool: 4,
      aiMessageCost: 1,
    });
  });

  test("reports free mode once the owner turns the gate OFF", async () => {
    gate.enabled = false;

    const res = await fetch(`${baseUrl}/api/config`);
    const body = (await res.json()) as { coinGateEnabled: boolean };
    expect(res.status).toBe(200);
    expect(body.coinGateEnabled).toBe(false);
  });

  test("never caches the flag (a toggle must be visible immediately)", async () => {
    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  test("surfaces a settings failure instead of silently freeing the platform", async () => {
    gate.fail = true;

    const res = await fetch(`${baseUrl}/api/config`);
    expect(res.status).toBe(500);
    gate.fail = false;
  });
});
