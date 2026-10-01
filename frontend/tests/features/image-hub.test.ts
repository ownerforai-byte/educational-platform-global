import { describe, it, expect, vi } from "vitest";
import { requestHubImage } from "@/features/image-hub/generate-image";

// The default deps talk to /api/ai/image and puter.js — this suite pins the
// ORDER and the failure reporting, never the network.
vi.mock("@/lib/api-client", () => ({ apiFetch: vi.fn() }));

describe("Image Hub engine order (owner request 2026-10-02)", () => {
  it("draws through the Agnes server chain first and never touches puter.js on success", async () => {
    const puter = vi.fn(async () => "unused");
    const fails: string[] = [];

    const res = await requestHubImage("a snow leopard at dawn", {
      requestServer: async () => ({
        url: "https://img.example/x.png",
        model: "agnes-image-2.1-flash",
      }),
      drawWithPuter: puter,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toEqual({
      url: "https://img.example/x.png",
      engine: "agnes",
      label: "agnes-image-2.1-flash",
    });
    expect(puter).not.toHaveBeenCalled();
    expect(fails).toEqual([]);
  });

  it("retries the same prompt through puter.js when the server fails", async () => {
    const fails: string[] = [];

    const res = await requestHubImage("nebula sketch", {
      requestServer: async () => null,
      drawWithPuter: async () => "data:image/png;base64,AAA",
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toEqual({
      url: "data:image/png;base64,AAA",
      engine: "puter",
      label: "puter.js (browser)",
    });
    expect(fails).toEqual(["agnes"]);
  });

  it("returns null only when BOTH engines failed, reporting each", async () => {
    const fails: string[] = [];

    const res = await requestHubImage("anything", {
      requestServer: async () => null,
      drawWithPuter: async () => null,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toBeNull();
    expect(fails).toEqual(["agnes", "puter"]);
  });

  it("ignores blank prompts without calling any engine", async () => {
    const server = vi.fn(async () => ({ url: "nope" }));
    const puter = vi.fn(async () => "nope");

    expect(await requestHubImage("   \n ", { requestServer: server, drawWithPuter: puter })).toBeNull();
    expect(server).not.toHaveBeenCalled();
    expect(puter).not.toHaveBeenCalled();
  });
});
