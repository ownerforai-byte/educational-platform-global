import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";
import path from "path";

/**
 * GET /api/mobile/formulas (+ /file) — cursor-paginated formula-sheet catalog
 * for the native formula reader (Agent 2, parity batch P1). Reads the same
 * generated content manifest the website's formula sheets build from;
 * plus-tier gated exactly like the /formulas section.
 * The manifest loads from a test fixture so the contract does not depend on
 * curriculum content in the repo.
 */

const FIXTURE_DIR = path.join(__dirname, "..", "fixtures", "mobile", "manifest");

vi.mock("../../src/utils/paths", () => ({
  resolveDataPath: (...subpaths: string[]) => {
    const segs = subpaths[0] === "content" ? subpaths.slice(1) : subpaths;
    return path.join(FIXTURE_DIR, "content", ...segs);
  },
}));

vi.mock("../../src/lib/cache.js", () => ({
  CONTENT_CACHE_TTL_MS: 60_000,
  CONTENT_CDN_CACHE_CONTROL: "public, max-age=60, s-maxage=300",
  contentCache: {
    getOrLoad: async <T>(_key: string, _ttl: number, loader: () => Promise<T>) => loader(),
  },
}));

vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (_a: unknown, _b: unknown, c: unknown) => c(),
  requireTier: () => (_a: unknown, _b: unknown, c: unknown) => c(),
}));

import formulasRouter from "../../src/api/mobile/formulas";

const app = express();
app.use("/api/mobile/formulas", formulasRouter);

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
  await new Promise<void>((resolve) => server?.close(resolve));
});

interface FormulaItem {
  id: string;
  class: string;
  subject: string;
  unit: string;
  title: string;
  formulaCount: number;
}

interface Page {
  ok: boolean;
  data: { items: FormulaItem[]; nextCursor: string | null };
}

async function getPage(query: string): Promise<Page> {
  const res = await fetch(`${baseUrl}/api/mobile/formulas${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as Page;
}

describe("GET /api/mobile/formulas", () => {
  test("returns only formula entries with derived coordinates", async () => {
    const body = await getPage("");
    expect(body.ok).toBe(true);
    expect(body.data.items).toHaveLength(2); // PYQ and notes/ entries are excluded
    expect(body.data.items[0]).toMatchObject({
      id: "formulas/class-11/mathematics/algebra/01-derivatives.json",
      class: "class-11",
      subject: "mathematics",
      unit: "algebra",
      title: "Derivatives",
      formulaCount: 2,
    });
  });

  test("filters by class, subject and unit", async () => {
    const bySubject = await getPage("?subject=physics");
    expect(bySubject.data.items).toHaveLength(1);
    expect(bySubject.data.items[0]).toMatchObject({
      unit: "heat-and-temperature",
      formulaCount: 3,
    });

    const byUnit = await getPage("?unit=algebra");
    expect(byUnit.data.items).toHaveLength(1);
    expect(byUnit.data.items[0]?.subject).toBe("mathematics");

    const byClass = await getPage("?class=class-12");
    expect(byClass.data.items).toHaveLength(0);
  });

  test("paginates with the shared cursor convention", async () => {
    const page1 = await getPage("?limit=1");
    expect(page1.data.items).toHaveLength(1);
    expect(page1.data.nextCursor).not.toBeNull();

    const page2 = await getPage(`?limit=1&cursor=${encodeURIComponent(page1.data.nextCursor as string)}`);
    expect(page2.data.items).toHaveLength(1);
    expect(page2.data.nextCursor).toBeNull();
    expect(page2.data.items[0]?.id).not.toBe(page1.data.items[0]?.id);
  });
});

describe("GET /api/mobile/formulas/file", () => {
  test("returns one sheet's formula lines", async () => {
    const res = await fetch(
      `${baseUrl}/api/mobile/formulas/file?path=${encodeURIComponent(
        "formulas/class-11/physics/heat-and-temperature/01-key-equations.json",
      )}`,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      data: { path: string; title: string; formulas: string[] };
    };
    expect(body.ok).toBe(true);
    expect(body.data.title).toBe("Key Equations — Thermodynamics");
    expect(body.data.formulas).toHaveLength(3);
    expect(body.data.formulas[0]).toContain("Delta U");
  });

  test("rejects paths outside the formulas section or with traversal", async () => {
    for (const bad of [
      "practice/questions/class-11/physics/heat-and-temperature/01-neb-2023.json",
      "formulas/../../secrets.json",
      "not-a-path",
    ]) {
      const res = await fetch(`${baseUrl}/api/mobile/formulas/file?path=${encodeURIComponent(bad)}`);
      expect(res.status).toBe(400);
    }
  });
});
