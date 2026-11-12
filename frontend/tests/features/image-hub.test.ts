import { describe, it, expect, vi } from "vitest";
import { requestHubFigure, requestHubImage } from "@/features/image-hub/generate-image";

// Drawing is entirely server-side: the default deps talk to /api/ai/image and
// /api/ai/figure. This suite pins the ORDER and the failure reporting, never
// the network and never a browser AI runtime.
vi.mock("@/lib/api-client", () => ({ apiFetch: vi.fn() }));

describe("Diagram Hub server engines (owner request 2026-10-02)", () => {
  it("draws through the server engine and returns the neutral badge", async () => {
    const fails: string[] = [];

    const res = await requestHubImage("a snow leopard at dawn", {
      requestServer: async () => ({
        url: "https://img.example/x.png",
        model: "server-image-v2",
      }),
      onEngineFail: (e) => fails.push(e),
    });

    // `model` is the provider's own model id on the wire, but the gallery badge
    // is the hub's wording — no vendor name reaches the UI (owner 2026-10-07).
    expect(res).toEqual({
      url: "https://img.example/x.png",
      engine: "diagram",
      label: "Diagram",
    });
    expect(fails).toEqual([]);
  });

  it("returns null and reports the failure when the server cannot draw", async () => {
    const fails: string[] = [];

    const res = await requestHubImage("nebula sketch", {
      requestServer: async () => null,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toBeNull();
    expect(fails).toEqual(["diagram"]);
  });

  it("ignores blank prompts without calling the server", async () => {
    const server = vi.fn(async () => ({ url: "nope" }));

    expect(await requestHubImage("   \n ", { requestServer: server })).toBeNull();
    expect(server).not.toHaveBeenCalled();
  });
});

/**
 * Academic figures (owner request 2026-10-03: "train it for all kind of
 * academic images like lifecycle, labelling, all parts name with their
 * interface with supporting details which opens after hovering").
 *
 * A raster painter cannot spell, so the VECTOR writer is tried first and the
 * server raster chain only takes over when it draws nothing.
 */
describe("Diagram Hub academic figures", () => {
  const FIGURE = {
    svg: '<svg viewBox="0 0 900 640"><g><title>Nucleus — controls the cell</title></g></svg>',
    caption: "Labelled animal cell",
    kind: "labelled",
    parts: [{ name: "Nucleus", detail: "controls the cell" }],
  };

  it("draws the vector figure first and never touches the raster engine", async () => {
    const server = vi.fn(async () => ({ url: "https://img.example/x.png" }));
    const fails: string[] = [];

    const res = await requestHubFigure("labelled animal cell", {
      requestFigure: async () => FIGURE,
      requestServer: server,
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
    expect(fails).toEqual([]);
  });

  it("falls back to the server raster chain when the vector writer draws nothing", async () => {
    const fails: string[] = [];

    const res = await requestHubFigure("a snow leopard at dawn", {
      requestFigure: async () => null,
      requestServer: async () => ({
        url: "https://img.example/x.png",
        model: "server-image-v2",
      }),
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toEqual({
      url: "https://img.example/x.png",
      engine: "diagram",
      label: "Diagram",
    });
    expect(fails).toEqual(["figure"]);
  });

  it("reports every server engine in order when nothing could draw", async () => {
    const fails: string[] = [];

    const res = await requestHubFigure("anything at all", {
      requestFigure: async () => null,
      requestServer: async () => null,
      onEngineFail: (e) => fails.push(e),
    });

    expect(res).toBeNull();
    expect(fails).toEqual(["figure", "diagram"]);
  });

  it("ignores a blank figure prompt without calling any engine", async () => {
    const figure = vi.fn(async () => FIGURE);

    expect(await requestHubFigure("  \n ", { requestFigure: figure })).toBeNull();
    expect(figure).not.toHaveBeenCalled();
  });
});
