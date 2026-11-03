import express from "express";
import cookieParser from "cookie-parser";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * Spark-gated content reveal: the REAL router, with only the session guard,
 * the tier-override read and the credits/supabase layer stubbed. The credits
 * spend function is asserted to be NEVER called by reveal/verify.
 */

const spend = vi.fn();
const ensure = vi.fn();

vi.mock("../src/utils/credits", () => ({
  spendCredits: (...a: unknown[]) => spend(...a),
  ensureDailyCredits: (...a: unknown[]) => ensure(...a),
  isCoinGateEnabled: async () => true,
}));
vi.mock("../src/utils/sectionTiers", () => ({ readSectionMinTiers: async () => ({}) }));
vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: { role: "member", credits: 5, premium_status: false }, error: null }),
        }),
      }),
    }),
  },
}));

let current: { id: string; email: string; role: string; plan: string } | null = null;
vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  return {
    ...actual,
    requireAuth: (req: Request, res: Response, next: () => void) => {
      if (!current) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      (req as unknown as { user: unknown }).user = current;
      next();
    },
  };
});

import contentRoutes from "../src/api/content";
import userRoutes from "../src/api/user";
import { signGrant } from "../src/utils/contentGrant";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/content", contentRoutes);
app.use("/api/user", userRoutes);

let server: Server;
let base: string;
beforeAll(async () => {
  await new Promise<void>((r) => {
    server = app.listen(0, "127.0.0.1", r);
  });
  const a = server.address();
  if (!a || typeof a === "string") throw new Error("no port");
  base = `http://127.0.0.1:${a.port}`;
});
afterAll(async () => {
  await new Promise((r) => server?.close(r));
});

const NOTE = {
  kind: "note",
  subject: "physics",
  unit: "alternating-current",
  filename: "01-ac-voltage-applied-to-resistor-inductor-and-capacitor.json",
};
const KEY = "route:/class-11-notes/physics";
const future = () => Math.floor(Date.now() / 1000) + 600;

async function reveal(body: unknown, grant?: string) {
  return fetch(`${base}/api/content/reveal`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(grant ? { "X-Unlock-Grant": grant } : {}) },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  spend.mockReset();
  ensure.mockReset();
  current = { id: "u1", email: "student@example.com", role: "member", plan: "member" };
});

describe("POST /api/content/reveal", () => {
  test("401 when unauthenticated", async () => {
    current = null;
    const res = await reveal({ ...NOTE, moduleKey: KEY }, signGrant("u1", KEY, future()));
    expect(res.status).toBe(401);
  });

  test("200 with the exact file body when granted and in tier", async () => {
    const res = await reveal({ ...NOTE, moduleKey: KEY }, signGrant("u1", KEY, future()));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toContain("no-store");
    const disk = readFileSync(
      path.join(__dirname, "..", "..", "frontend", "public", "data", "syllabus-notes", "physics", NOTE.unit, NOTE.filename),
      "utf8",
    );
    expect(await res.text()).toBe(disk);
    expect(spend).not.toHaveBeenCalled();
  });

  test("403 with an EMPTY body: no grant, expired, other user, other moduleKey, garbage", async () => {
    const cases: Array<string | undefined> = [
      undefined,
      signGrant("u1", KEY, Math.floor(Date.now() / 1000) - 5),
      signGrant("someone-else", KEY, future()),
      signGrant("u1", "route:/class-11-notes/chemistry", future()),
      "garbage.token",
      signGrant("u1", KEY, future()).replace(/.$/, "A") + "x",
    ];
    for (const g of cases) {
      const res = await reveal({ ...NOTE, moduleKey: KEY }, g);
      expect(res.status).toBe(403);
      expect(await res.text()).toBe("");
    }
    expect(spend).not.toHaveBeenCalled();
    expect(ensure).not.toHaveBeenCalled();
  });

  test("403 empty body for a member on /srs (below tier) even with a valid grant", async () => {
    const res = await reveal({ ...NOTE, moduleKey: "route:/srs" }, signGrant("u1", "route:/srs", future()));
    expect(res.status).toBe(403);
    expect(await res.text()).toBe("");
    expect(spend).not.toHaveBeenCalled();
  });

  test("a plus user passes /srs with a grant", async () => {
    current = { id: "u2", email: "p@example.com", role: "member", plan: "plus" };
    const res = await reveal({ ...NOTE, moduleKey: "route:/srs" }, signGrant("u2", "route:/srs", future()));
    expect(res.status).toBe(200);
  });

  test("404 for an unknown file once authorized", async () => {
    const res = await reveal({ ...NOTE, filename: "nope.json", moduleKey: KEY }, signGrant("u1", KEY, future()));
    expect(res.status).toBe(404);
  });

  test("path traversal and unsafe segments are rejected (400)", async () => {
    const g = signGrant("u1", KEY, future());
    for (const bad of [
      { subject: ".." },
      { unit: "../../x" },
      { filename: "../../../package.json" },
      { filename: "a/b.json" },
      { subject: "phys%2f..", unit: "a\\b" },
      { filename: "_manifest.json" },
      { filename: "x.txt" },
    ]) {
      const res = await reveal({ ...NOTE, ...bad, moduleKey: KEY }, g);
      expect(res.status).toBe(400);
    }
    expect((await reveal({ ...NOTE, kind: "../etc", moduleKey: KEY }, g)).status).toBe(400);
    expect((await reveal({ ...NOTE, kind: "constructor", moduleKey: KEY }, g)).status).toBe(400);
  });
});

describe("POST /api/content/verify", () => {
  const verify = (grant?: string, moduleKey = KEY) =>
    fetch(`${base}/api/content/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(grant ? { "X-Unlock-Grant": grant } : {}) },
      body: JSON.stringify({ moduleKey }),
    });

  test("200 empty with a valid grant, 403 empty without", async () => {
    const ok = await verify(signGrant("u1", KEY, future()));
    expect(ok.status).toBe(200);
    const no = await verify();
    expect(no.status).toBe(403);
    expect(await no.text()).toBe("");
    expect(spend).not.toHaveBeenCalled();
  });
});

describe("POST /api/user/credits/unlock grants", () => {
  const unlock = (body: unknown) =>
    fetch(`${base}/api/user/credits/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  test("tier-denied unlock: 403, no grant, no spend", async () => {
    const res = await unlock({ category: "reference", moduleKey: "route:/srs" });
    expect(res.status).toBe(403);
    expect(await res.json()).not.toHaveProperty("grant");
    expect(spend).not.toHaveBeenCalled();
    expect(ensure).not.toHaveBeenCalled();
  });

  test("successful paid unlock returns a grant that reveal accepts", async () => {
    ensure.mockResolvedValue({ credits: 3, unlimited: false });
    spend.mockResolvedValue(2);
    const res = await unlock({ category: "theory", moduleKey: KEY });
    expect(res.status).toBe(200);
    const json = (await res.json()) as { grant?: string; credits: number };
    expect(json.credits).toBe(2);
    expect(typeof json.grant).toBe("string");
    expect(spend).toHaveBeenCalledTimes(1);
    const r = await reveal({ ...NOTE, moduleKey: KEY }, json.grant);
    expect(r.status).toBe(200);
    expect(spend).toHaveBeenCalledTimes(1); // reveal spent nothing
  });

  test("free categories issue no grant", async () => {
    const res = await unlock({ category: "visuals", moduleKey: "route:/lab" });
    expect(res.status).toBe(200);
    expect(await res.json()).not.toHaveProperty("grant");
  });
});
