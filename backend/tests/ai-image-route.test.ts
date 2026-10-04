import express from "express";
import cookieParser from "cookie-parser";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * POST /api/ai/image — the Image Hub's drawing endpoint (owner request
 * 2026-10-02: "replace the mind console with agnes 2.1 flash and js to
 * generate image"; opened to every signed-in user 2026-10-04).
 *
 * Auth wiring is pinned at the source (the route file must keep `requireAuth`
 * and must NOT carry the former owner gate — the Image Hub is every student's
 * now, and the key is protected by the ai-image rate-limit tier instead); the
 * handler contract itself is probed with the guards stubbed and the engine
 * mocked, so no key and no network are ever touched.
 */

vi.mock("../src/ai/image-gen", () => ({
  generateVeerImage: vi.fn(),
}));

vi.mock("../src/middleware/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/middleware/auth")>();
  return {
    ...actual,
    // Stub the guard: the SOURCE test below pins that it is wired.
    requireAuth: (req: Request, _res: Response, next: () => void) => {
      (req as unknown as { user: { id: string; role: string } }).user = {
        id: "user-test",
        role: "STUDENT",
      };
      next();
    },
  };
});

import aiImageRoutes from "../src/api/ai-image";
import { generateVeerImage } from "../src/ai/image-gen";

const mockedGenerate = vi.mocked(generateVeerImage);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/ai/image", aiImageRoutes);

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
  const res = await fetch(`${baseUrl}/api/ai/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: (await res.json()) as Record<string, unknown> };
}

beforeEach(() => {
  mockedGenerate.mockReset();
});

describe("POST /api/ai/image", () => {
  test("is guarded by requireAuth and open to EVERY signed-in user (source pin)", () => {
    const src = readFileSync(
      path.resolve(__dirname, "../src/api/ai-image.ts"),
      "utf8",
    );
    expect(src).toContain("requireAuth");
    // The owner gate is gone by design (owner request 2026-10-04: "enable
    // saving of image for every user") — it must not creep back in.
    expect(src).not.toContain("requireOwner");
    // Every successful draw is hardcoded to save into the user's history.
    expect(src).toContain("saveImageHistoryRow");
  });

  test("rejects a missing or blank prompt with 400", async () => {
    expect((await post({})).status).toBe(400);
    expect((await post({ prompt: "   " })).status).toBe(400);
    expect(mockedGenerate).not.toHaveBeenCalled();
  });

  test("answers 200 with the picture URL and the model that drew it", async () => {
    mockedGenerate.mockResolvedValue({
      url: "https://img.example/pic.png",
      model: "agnes-image-2.1-flash",
    });

    const { status, json } = await post({ prompt: "a snow leopard" });

    expect(status).toBe(200);
    expect(json).toEqual({ url: "https://img.example/pic.png", model: "agnes-image-2.1-flash" });
    expect(mockedGenerate).toHaveBeenCalledWith("a snow leopard");
  });

  test("answers 503 + reason when the whole Agnes chain failed (client falls back to puter.js)", async () => {
    mockedGenerate.mockResolvedValue({ reason: "all image models failed" });

    const { status, json } = await post({ prompt: "anything" });

    expect(status).toBe(503);
    expect(json.error).toBe("Image engines unavailable");
    expect(json.reason).toBe("all image models failed");
  });
});
