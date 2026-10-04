import express from "express";
import cookieParser from "cookie-parser";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * POST /api/ai/figure — the Image Hub's vector academic-figure endpoint
 * (owner request 2026-10-03: lifecycle / labelling / all parts named, with the
 * details opening on hover; opened to every signed-in user 2026-10-04).
 *
 * Same boundary as /api/ai/image: the route must keep `requireAuth` and must
 * NOT carry the former owner gate at the source, while the handler contract is
 * probed with the guard stubbed and the writer mocked.
 */

vi.mock("../src/ai/figure-draw", () => ({
  drawAcademicFigure: vi.fn(),
}));

vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  return {
    ...actual,
    requireAuth: (req: Request, _res: Response, next: () => void) => {
      (req as unknown as { user: { id: string; role: string } }).user = {
        id: "user-test",
        role: "STUDENT",
      };
      next();
    },
  };
});

import aiFigureRoutes from "../src/api/ai-figure";
import { drawAcademicFigure } from "../src/ai/figure-draw";

const mockedDraw = vi.mocked(drawAcademicFigure);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/ai/figure", aiFigureRoutes);

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

async function post(body: unknown) {
  const res = await fetch(`${baseUrl}/api/ai/figure`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: (await res.json()) as Record<string, unknown> };
}

beforeEach(() => {
  mockedDraw.mockReset();
});

describe("POST /api/ai/figure", () => {
  test("is guarded by requireAuth and open to EVERY signed-in user (source pin)", () => {
    const src = readFileSync(path.resolve(__dirname, "../src/api/ai-figure.ts"), "utf8");
    expect(src).toContain("requireAuth");
    // The owner gate is gone by design (owner request 2026-10-04) — the
    // ai-image rate-limit tier protects the key instead.
    expect(src).not.toContain("requireOwner");
    // Every drawn figure is hardcoded to save into the user's history.
    expect(src).toContain("saveImageHistoryRow");
  });

  test("rejects a missing or blank prompt with 400 and no model call", async () => {
    expect((await post({})).status).toBe(400);
    expect((await post({ prompt: "   " })).status).toBe(400);
    expect(mockedDraw).not.toHaveBeenCalled();
  });

  test("answers 200 with the drawing, its caption, archetype and hover legend", async () => {
    mockedDraw.mockResolvedValue({
      svg: "<svg viewBox=\"0 0 900 640\"><g><title>Nucleus — control centre</title></g></svg>",
      caption: "Labelled animal cell",
      kind: "labelled",
      parts: [{ name: "Nucleus", detail: "control centre" }],
      attempts: 1,
    });

    const { status, json } = await post({ prompt: "labelled animal cell" });

    expect(status).toBe(200);
    expect(json.kind).toBe("labelled");
    expect(json.caption).toBe("Labelled animal cell");
    expect(json.parts).toEqual([{ name: "Nucleus", detail: "control centre" }]);
    expect(String(json.svg)).toContain("<title>");
    expect(mockedDraw).toHaveBeenCalledWith("labelled animal cell", {
      kind: undefined,
      classLevel: undefined,
    });
  });

  test("honours an explicit archetype and ignores an unknown one", async () => {
    mockedDraw.mockResolvedValue({
      svg: "<svg/>",
      caption: "x",
      kind: "lifecycle",
      parts: [],
      attempts: 1,
    });

    await post({ prompt: "the malarial parasite", kind: "lifecycle" });
    expect(vi.mocked(mockedDraw).mock.calls[0][1]?.kind).toBe("lifecycle");

    await post({ prompt: "the malarial parasite", kind: "not-a-kind" });
    expect(mockedDraw.mock.calls[1][1]?.kind).toBeUndefined();
  });

  test("answers 503 + reason so the hub can fall back to the raster engine", async () => {
    mockedDraw.mockResolvedValue({
      caption: "x",
      kind: "illustration",
      parts: [],
      attempts: 0,
      reason: "pictorial request — the raster engine draws this",
    });

    const { status, json } = await post({ prompt: "a snow leopard at dawn" });

    expect(status).toBe(503);
    expect(json.error).toBe("Figure engine unavailable");
    expect(json.reason).toContain("raster");
    expect(json.kind).toBe("illustration");
  });
});
