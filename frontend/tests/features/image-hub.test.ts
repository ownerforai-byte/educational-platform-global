import { describe, it, expect, vi } from "vitest";
import { requestHubFigure, requestHubImage } from "@/features/image-hub/generate-image";

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

/**
 * Academic figures (owner request 2026-10-03: "train it for all kind of
 * academic images like lifecycle, labelling, all parts name with their
 * interface with supporting details which opens after hovering").
 *
 * A raster painter cannot spell, so the VECTOR writer is tried first and the
 * raster chain only takes over when it draws nothing.
 */
describe("Image Hub academic figures", () => {
  const FIGURE = {
    svg: '<svg viewBox="0 0 900 640"><g><title>Nucleus — controls the cell</title></g></svg>',
    caption: "Labelled animal cell",
    kind: "labelled",
    parts: [{ name: "Nucleus", detail: "controls the cell" }],
  };

  it("draws the vector figure first and never touches the raster engines", async () => {
    const server = vi.fn(async () => ({ url: "https://img.example/x.png" }));
    const puter = vi.fn(async () => "data:image/png;base64,AAA");
    const fails: string[] = [];

    const res = await requestHubFigure("labelled animal cell", {
      requestFigure: async () => FIGURE,
      requestServer: server,
      drawWithPuter: puter,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res?.kind).toBe("figure");
    expect(res).toMatchObject({
      caption: "Labelled animal cell",
      archetype: "labelled",
      engine: "vector",
    });
    expect(res && res.kind === "figure" ? res.parts : []).toEqual([
      { name: "Nucleus", detail: "controls the cell" },
    ]);
    expect(server).not.toHaveBeenCalled();
    expect(puter).not.toHaveBeenCalled();
    expect(fails).toEqual([]);
  });

  it("falls back to the Agnes raster chain when the vector writer draws nothing", async () => {
    const fails: string[] = [];

    const res = await requestHubFigure("a snow leopard at dawn", {
      requestFigure: async () => null,
      requestServer: async () => ({
        url: "https://img.example/x.png",
        model: "agnes-image-2.1-flash",
      }),
      drawWithPuter: async () => "unused",
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toEqual({
      url: "https://img.example/x.png",
      engine: "agnes",
      label: "agnes-image-2.1-flash",
    });
    expect(fails).toEqual(["figure"]);
  });

  it("reports every engine in order when nothing could draw", async () => {
    const fails: string[] = [];

    const res = await requestHubFigure("anything at all", {
      requestFigure: async () => null,
      requestServer: async () => null,
      drawWithPuter: async () => null,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toBeNull();
    expect(fails).toEqual(["figure", "agnes", "puter"]);
  });

  it("ignores a blank figure prompt without calling any engine", async () => {
    const figure = vi.fn(async () => FIGURE);

    expect(await requestHubFigure("  \n ", { requestFigure: figure })).toBeNull();
    expect(figure).not.toHaveBeenCalled();
  });
});
