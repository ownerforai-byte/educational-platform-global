import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildGoogleImageQuery,
  fetchGoogleDiagrams,
  formatGoogleDiagramBlock,
  googleDiagramsEnabled,
  googleRelevanceOf,
  hostOf,
  parseGoogleImages,
} from "../src/ai/google-diagrams";

/**
 * GOOGLE IMAGE DIAGRAMS — unit tests for the pure core, plus the request shape.
 *
 * The module is optional and key-gated, so the first thing to pin is that it
 * stays SILENT (never throws, never fetches) when the owner has not configured
 * it — a key-gated source that leaks a request without a key is a bug.
 */

const item = (over: Record<string, unknown> = {}) => ({
  title: "Labelled nephron diagram",
  link: "https://example.edu/img/nephron.png",
  snippet: "Structure of a nephron for class 11 biology",
  mime: "image/png",
  image: {
    contextLink: "https://example.edu/nephron",
    width: 1200,
    height: 800,
  },
  ...over,
});

describe("googleDiagramsEnabled — silent without credentials", () => {
  afterEach(() => {
    delete process.env.GOOGLE_CSE_API_KEY;
    delete process.env.GOOGLE_CSE_CX;
    delete process.env.GOOGLE_DIAGRAMS;
  });

  it("is off by default and on only with BOTH key and cx", () => {
    expect(googleDiagramsEnabled()).toBe(false);
    process.env.GOOGLE_CSE_API_KEY = "k";
    expect(googleDiagramsEnabled()).toBe(false);
    process.env.GOOGLE_CSE_CX = "cx";
    expect(googleDiagramsEnabled()).toBe(true);
  });

  it("GOOGLE_DIAGRAMS=off wins even with both credentials", () => {
    process.env.GOOGLE_CSE_API_KEY = "k";
    process.env.GOOGLE_CSE_CX = "cx";
    process.env.GOOGLE_DIAGRAMS = "off";
    expect(googleDiagramsEnabled()).toBe(false);
  });
});

describe("parseGoogleImages — only real, image-typed, relevant results", () => {
  const terms = ["nephron"];

  it("keeps a relevant image result", () => {
    const images = parseGoogleImages({ items: [item()] }, terms);
    expect(images).toHaveLength(1);
    expect(images[0].url).toBe("https://example.edu/img/nephron.png");
    expect(images[0].page).toBe("https://example.edu/nephron");
    expect(images[0].width).toBe(1200);
  });

  it("drops irrelevant, non-image, tiny and malformed results", () => {
    const images = parseGoogleImages(
      {
        items: [
          item({ title: "Sunset over Pokhara", snippet: "", link: "https://x.test/a.png" }),
          item({ mime: "text/html", link: "https://x.test/page" }),
          item({ image: { width: 40, height: 40, contextLink: "" } }),
          { link: "not-a-url" },
        ],
      },
      terms,
    );
    expect(images).toEqual([]);
  });

  it("de-duplicates by URL and survives a malformed payload", () => {
    const images = parseGoogleImages({ items: [item(), item()] }, terms);
    expect(images).toHaveLength(1);
    expect(parseGoogleImages({}, terms)).toEqual([]);
    expect(parseGoogleImages(null, terms)).toEqual([]);
  });
});

describe("helpers", () => {
  it("builds a trimmed image query from the diagram query", () => {
    expect(buildGoogleImageQuery("  refraction glass prism diagram  ")).toBe(
      "refraction glass prism diagram",
    );
  });

  it("matches relevance only on 3+ character terms", () => {
    expect(googleRelevanceOf("a nephron diagram", ["nephron"])).toBe(true);
    expect(googleRelevanceOf("something else", ["nephron"])).toBe(false);
    expect(googleRelevanceOf("in a cell", ["in"])).toBe(false);
    expect(googleRelevanceOf("anything", [])).toBe(false);
  });

  it("reads a hostname for credit and tolerates a bad URL", () => {
    expect(hostOf("https://www.example.edu/a/b.png")).toBe("example.edu");
    expect(hostOf("nonsense")).toBe("");
  });
});

describe("fetchGoogleDiagrams — the request we actually send", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.GOOGLE_CSE_API_KEY;
    delete process.env.GOOGLE_CSE_CX;
  });

  it("does not fetch at all without credentials", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchGoogleDiagrams("nephron diagram", ["nephron"])).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("asks the Custom Search JSON API for images, safely", async () => {
    process.env.GOOGLE_CSE_API_KEY = "test-key";
    process.env.GOOGLE_CSE_CX = "test-cx";
    const fetchMock = vi.fn(
      async () => new Response(JSON.stringify({ items: [item()] }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const images = await fetchGoogleDiagrams("nephron diagram", ["nephron"], 2);

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("googleapis.com/customsearch/v1");
    expect(url).toContain("searchType=image");
    expect(url).toContain("safe=active");
    expect(url).toContain("key=test-key");
    expect(url).toContain("cx=test-cx");
    expect(images).toHaveLength(1);
  });

  it("raises on a failed request so the caller can degrade", async () => {
    process.env.GOOGLE_CSE_API_KEY = "test-key";
    process.env.GOOGLE_CSE_CX = "test-cx";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("quota", { status: 429 })));
    await expect(fetchGoogleDiagrams("nephron diagram", ["nephron"])).rejects.toThrow(/429/);
  });
});

describe("formatGoogleDiagramBlock — visual reference, never a fact source", () => {
  it("is silent when there is nothing", () => {
    expect(formatGoogleDiagramBlock([])).toBe("");
  });

  it("frames the images as reference only and defers facts to the allowlist", () => {
    const block = formatGoogleDiagramBlock([
      {
        url: "https://example.edu/img/nephron.png",
        page: "https://example.edu/nephron",
        title: "Labelled nephron diagram",
        width: 1200,
        height: 800,
      },
    ]);
    expect(block).toContain("[REFERENCE IMAGES ATTACHED — GOOGLE IMAGES · VISUAL REFERENCE ONLY]");
    expect(block).toContain("NOT a source of facts");
    expect(block).toContain("official allowlist");
    expect(block).toContain("never embed these URLs");
    expect(block).toContain("via example.edu");
    expect(block).toContain("[END OF REFERENCE IMAGES]");
  });
});