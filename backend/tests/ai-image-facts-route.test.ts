import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * /api/ai/image-facts — the facts half of the Image Hub's details interface
 * (owner request 2026-10-04: "best detailed, info fact and create the details
 * interface"): Veer writes a short official-syllabus facts card about whatever
 * the opened picture shows.
 *
 * Pinned here:
 *   · the router keeps `requireAuth` AND the owner gate (source pin) — it
 *     spends an LLM call;
 *   · 400 without a subject;
 *   · bullet / numbering / bold noise is stripped into clean fact lines and
 *     the card is capped at six lines;
 *   · a prose answer still degrades to a usable card (sentence split);
 *   · "no LLM" contracts → 402, never a 200 with junk: a provider throw and
 *     the keyless internal engine's "Quick take:" reply are both 402.
 */

const chatMock = vi.fn();

vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  const ownerEmail = [...actual.OWNER_EMAILS][0] as string;
  return {
    ...actual,
    requireAuth: (req: Request, _res: Response, next: () => void) => {
      (req as unknown as { user: { id: string; email: string; role: string } }).user = {
        id: (req.headers["x-test-user"] as string) || "user-a",
        email: ownerEmail,
        role: "STUDENT",
      };
      next();
    },
  };
});

vi.mock("../src/ai/service", () => ({
  createAIService: () => ({ chat: chatMock }),
}));

import imageFactsRoutes, { parseFactLines } from "../src/api/ai-image-facts";

const app = express();
app.use(express.json());
app.use("/api/ai/image-facts", imageFactsRoutes);

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

async function postFacts(body: unknown) {
  const res = await fetch(`${baseUrl}/api/ai/image-facts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-test-user": "user-a" },
    body: JSON.stringify(body),
  });
  return {
    status: res.status,
    json: (await res.json().catch(() => ({}))) as Record<string, any>,
  };
}

describe("parseFactLines — model noise → clean card", () => {
  test("strips bullets, numbering and bold, caps at six lines", () => {
    const facts = parseFactLines(
      [
        "1. **The nephron** is the functional unit of the kidney.",
        "- Filtration happens in the glomerulus.",
        "*2) The loop of Henle concentrates urine.",
        "",
        "4. **ADH** increases water reabsorption.",
        "5. Urine travels nephron → collecting duct → renal pelvis.",
        "6. A kidney has about one million nephrons.",
        "7. This seventh line must be cut.",
      ].join("\n"),
    );
    expect(facts).toHaveLength(6);
    expect(facts[0]).toBe("The nephron is the functional unit of the kidney.");
    expect(facts[0]).not.toContain("**");
    expect(facts.some((f) => f.includes("seventh"))).toBe(false);
  });

  test("drops a bare label line like 'Facts:'", () => {
    const facts = parseFactLines("Key facts:\n- Gravity at the surface is 9.8 m/s².");
    expect(facts).toEqual(["Gravity at the surface is 9.8 m/s²."]);
  });

  test("splits a prose answer into sentences when there are no line breaks", () => {
    const facts = parseFactLines(
      "Newton's law of gravitation states that every mass attracts every other mass. The force is proportional to the product of the masses. It follows the inverse-square law.",
    );
    expect(facts.length).toBeGreaterThanOrEqual(3);
    expect(facts[0]).toMatch(/Newton/);
  });
});

describe("/api/ai/image-facts", () => {
  test("is guarded by requireAuth (source pin)", () => {
    const src = readFileSync(
      path.resolve(__dirname, "../src/api/ai-image-facts.ts"),
      "utf8",
    );
    expect(src).toMatch(/router\.post\("[^"]*", requireAuth/);
  });

  test("400 without a subject", async () => {
    const { status } = await postFacts({ q: "   " });
    expect(status).toBe(400);
  });

  test("returns the cleaned facts card and asks for syllabus truth only", async () => {
    chatMock.mockResolvedValueOnce(
      ["**The nephron** filters blood.", "1. Urea is removed here.", ""].join("\n"),
    );

    const { status, json } = await postFacts({ q: "labelled diagram of a nephron" });
    expect(status).toBe(200);
    expect(json.facts).toEqual([
      "The nephron filters blood.",
      "Urea is removed here.",
    ]);

    // The system prompt must pin the platform's fact policy: official
    // allowlist only, and the picture is never the source of truth.
    const [, messages] = chatMock.mock.calls[0] as [string, { role: string; content: string }[]];
    const system = messages.find((m) => m.role === "system")?.content ?? "";
    expect(system).toMatch(/Official syllabus truth ONLY/);
    expect(system).toMatch(/never guess from the picture/);
  });

  test("402 when the provider throws (no LLM available)", async () => {
    chatMock.mockRejectedValueOnce(new Error("quota"));
    const { status } = await postFacts({ q: "human heart" });
    expect(status).toBe(402);
  });

  test("402 for the keyless internal engine's non-answer", async () => {
    chatMock.mockResolvedValueOnce(
      "Quick take: nephron isn't in the vault — see https://example.test/notes",
    );
    const { status } = await postFacts({ q: "nephron" });
    expect(status).toBe(402);
  });
});
