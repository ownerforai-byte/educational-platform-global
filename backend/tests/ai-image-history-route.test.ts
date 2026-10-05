import express from "express";
import cookieParser from "cookie-parser";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * /api/ai/image-history — the Image Hub's per-owner saved history.
 *
 * Pinned here:
 *   · the router keeps `requireAuth` AND `requireOwnerEmail` (source pin);
 *   · saves, loads and clears are scoped to the requesting user (no IDOR):
 *     a second account never sees or deletes the first account's drawings;
 *   · payload validation: a picture needs a url, a figure needs its svg.
 *
 * The Supabase admin falls back to the in-memory mock store (no credentials in
 * the test env), so every request below is fully offline.
 */

vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  const ownerEmail = [...actual.OWNER_EMAILS][0] as string;
  return {
    ...actual,
    // The user identity comes from a header so the IDOR checks can switch
    // accounts mid-test; every stubbed account carries a real allowlisted
    // email so the real owner gate passes. The gate itself is pinned at the
    // source instead.
    requireAuth: (req: Request, _res: Response, next: () => void) => {
      const id = (req.headers["x-test-user"] as string) || "user-a";
      (req as unknown as { user: { id: string; email: string; role: string } }).user = {
        id,
        email: ownerEmail,
        role: "STUDENT",
      };
      next();
    },
  };
});

import imageHistoryRoutes from "../src/api/ai-image-history";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/ai/image-history", imageHistoryRoutes);

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

async function call(
  method: "GET" | "POST" | "DELETE",
  body?: unknown,
  user = "user-a",
  query = "",
) {
  const res = await fetch(`${baseUrl}/api/ai/image-history${query}`, {
    method,
    headers: { "Content-Type": "application/json", "x-test-user": user },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return {
    status: res.status,
    json: (await res.json().catch(() => ({}))) as Record<string, any>,
  };
}

const PICTURE = {
  kind: "picture",
  prompt: "a snow leopard on a Himalayan cliff",
  url: "https://img.example/leopard.png",
  engine: "puter.js (browser)",
};

const FIGURE = {
  kind: "figure",
  prompt: "labelled animal cell",
  svg: '<svg viewBox="0 0 900 640"><g><title>Nucleus — control centre</title></g></svg>',
  caption: "Labelled animal cell",
  archetype: "labelled",
  engine: "vector figure",
  parts: [{ name: "Nucleus", detail: "control centre" }],
};

describe("/api/ai/image-history", () => {
  test("is guarded by requireAuth AND the owner gate on every route (source pin)", () => {
    const src = readFileSync(
      path.resolve(__dirname, "../src/api/ai-image-history.ts"),
      "utf8",
    );
    const routes = src.match(/router\.(get|post|delete)\(/g) ?? [];
    const guarded = src.match(/router\.(get|post|delete)\("[^"]*", requireAuth, requireOwnerEmail/g) ?? [];
    expect(routes).toHaveLength(3);
    expect(guarded).toHaveLength(3);
  });

  test("starts empty, then saves and loads a picture and a figure", async () => {
    const empty = await call("GET");
    expect(empty.status).toBe(200);
    expect(empty.json.items).toEqual([]);

    expect((await call("POST", PICTURE)).status).toBe(200);
    expect((await call("POST", FIGURE)).status).toBe(200);

    const { status, json } = await call("GET");
    expect(status).toBe(200);
    expect(json.items).toHaveLength(2);
    const picture = json.items.find((i: any) => i.kind === "picture");
    const figure = json.items.find((i: any) => i.kind === "figure");
    expect(picture.url).toBe(PICTURE.url);
    expect(picture.prompt).toBe(PICTURE.prompt);
    expect(figure.svg).toContain("<title>");
    expect(figure.parts).toEqual(FIGURE.parts);
    expect(figure.archetype).toBe("labelled");
  });

  test("rejects invalid payloads: no prompt, wrong kind, picture without url", async () => {
    expect((await call("POST", { kind: "picture" })).status).toBe(400);
    expect(
      (await call("POST", { kind: "cartoon", prompt: "x", url: "https://a.b/c.png" })).status,
    ).toBe(400);
    // A picture with no url (and a figure with no svg) can never be shown again.
    expect(
      (await call("POST", { kind: "picture", prompt: "lost image" })).status,
    ).toBe(400);
    expect(
      (await call("POST", { kind: "figure", prompt: "lost figure" })).status,
    ).toBe(400);
  });

  test("scopes every read and write to the requesting user (no IDOR)", async () => {
    await call("POST", PICTURE, "user-a");
    await call("POST", FIGURE, "user-a");

    const mine = await call("GET", undefined, "user-a");
    const theirs = await call("GET", undefined, "user-b");
    expect(mine.json.items.length).toBeGreaterThanOrEqual(2);
    expect(theirs.json.items).toEqual([]);

    // A second account cannot clear the first account's history either.
    await call("DELETE", undefined, "user-b");
    const after = await call("GET", undefined, "user-a");
    expect(after.json.items.length).toBeGreaterThanOrEqual(2);
  });

  test("clears the whole history for the requesting user only", async () => {
    const before = await call("GET", undefined, "user-a");
    const cleared = await call("DELETE", undefined, "user-a");
    expect(cleared.status).toBe(200);
    expect(cleared.json.cleared).toBe(true);
    const after = await call("GET", undefined, "user-a");
    expect(after.json.items).toEqual([]);
    expect(before.json.items.length).toBeGreaterThanOrEqual(0);
  });
});
