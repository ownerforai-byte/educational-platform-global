import { afterEach, describe, expect, it, vi } from "vitest";
import { buildProfessorContext } from "../src/ai/prompts";
import {
  DIAGRAM_LIMIT,
  buildDiagramQuery,
  diagramSearchEnabled,
  fetchDiagramContext,
  fetchDiagrams,
  formatDiagramBlock,
  parseCommonsImages,
  plainText,
  questionTerms,
  relevanceOf,
} from "../src/ai/diagram-search";

/** A Commons reply in the shape `formatversion=2` returns. */
const commonsPayload = (pages: Array<Record<string, unknown>>) => ({ query: { pages } });

const page = (
  title: string,
  index: number,
  info: Partial<Record<string, unknown>> = {},
) => ({
  title,
  index,
  imageinfo: [
    {
      url: `https://upload.wikimedia.org/wikipedia/commons/full/${title.replace(/^File:/, "")}`,
      thumburl: `https://upload.wikimedia.org/wikipedia/commons/thumb/${title.replace(/^File:/, "")}/900px.png`,
      mime: "image/svg+xml",
      width: 1200,
      height: 800,
      extmetadata: { LicenseShortName: { value: "CC BY-SA 4.0" } },
      ...info,
    },
  ],
});

describe("questionTerms — which words are worth searching", () => {
  it("keeps the concept and drops the question scaffolding", () => {
    const terms = questionTerms("What is the structure of a nephron in class 11?");
    expect(terms).toContain("nephron");
    expect(terms).toContain("structure");
    expect(terms).not.toContain("what");
    expect(terms).not.toContain("class");
    expect(terms).not.toContain("the");
  });

  it("drops words too short to discriminate and de-duplicates", () => {
    expect(questionTerms("draw the ray of a ray diagram")).toEqual(["draw"]);
    expect(questionTerms("prism prism PRISM")).toEqual(["prism"]);
    expect(questionTerms("")).toEqual([]);
  });

  it("builds a search string biased towards drawn figures", () => {
    expect(buildDiagramQuery("explain refraction through a glass prism")).toBe(
      "refraction glass prism diagram",
    );
    expect(buildDiagramQuery("what is it")).toBe("");
  });
});

describe("relevanceOf — related to context, or not attached at all", () => {
  const terms = questionTerms("how does a nephron filter blood");

  it("scores a file whose name carries the concept", () => {
    expect(relevanceOf("File:Nephron.svg", terms)).toBeGreaterThan(0);
    // More of the question's words in the name ranks the file higher.
    expect(relevanceOf("File:Nephron filter blood.svg", terms)).toBeGreaterThan(
      relevanceOf("File:Nephron.svg", terms),
    );
    expect(relevanceOf("File:Structure of a nephron.svg", terms)).toBeGreaterThanOrEqual(1);
  });

  it("scores an unrelated file at zero so it is never attached", () => {
    expect(relevanceOf("File:Sunset over Pokhara.jpg", terms)).toBe(0);
  });
});

describe("parseCommonsImages — only real, relevant, licensed files", () => {
  it("keeps the relevant files and drops the rest", () => {
    const images = parseCommonsImages(
      commonsPayload([
        page("File:Sunset over Pokhara.jpg", 1),
        page("File:Nephron structure.svg", 2),
        page("File:Nephron diagram.svg", 3),
      ]),
      "structure of a nephron",
    );
    expect(images.map((i) => i.file)).toEqual([
      "File:Nephron structure.svg",
      "File:Nephron diagram.svg",
    ]);
    expect(images[0].url).toContain("upload.wikimedia.org");
    expect(images[0].license).toBe("CC BY-SA 4.0");
  });

  it("refuses formats and sizes that are not figures", () => {
    const images = parseCommonsImages(
      commonsPayload([
        page("File:Nephron scan.tiff", 1, { mime: "image/tiff" }),
        page("File:Nephron icon.png", 2, { mime: "image/png", width: 40, height: 40 }),
        page("File:Nephron.svg", 3),
      ]),
      "the nephron",
    );
    expect(images).toHaveLength(1);
    expect(images[0].file).toBe("File:Nephron.svg");
  });

  it("prefers the thumbnail that Wikimedia actually serves", () => {
    const images = parseCommonsImages(commonsPayload([page("File:Nephron.svg", 1)]), "nephron");
    expect(images[0].url).toContain("/thumb/");
  });

  it("reads the older object-shaped response too", () => {
    const images = parseCommonsImages(
      {
        query: {
          pages: {
            "11": page("File:Nephron.svg", 1),
          },
        },
      },
      "nephron",
    );
    expect(images).toHaveLength(1);
  });

  it("survives an empty or malformed payload", () => {
    expect(parseCommonsImages({}, "nephron")).toEqual([]);
    expect(parseCommonsImages(null, "nephron")).toEqual([]);
    expect(parseCommonsImages(commonsPayload([{ title: "File:Nephron.svg" }]), "nephron")).toEqual([]);
  });

  it("strips the markup Wikimedia wraps around metadata", () => {
    expect(plainText("<p>A <b>nephron</b> &amp; its parts</p>")).toBe("A nephron & its parts");
  });
});

describe("fetchDiagrams — the request we actually send", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.DIAGRAM_SEARCH;
  });

  const ok = (payload: unknown) =>
    vi.fn(async () => new Response(JSON.stringify(payload), { status: 200 }));

  it("asks Commons for files in the File namespace, with a thumbnail and a licence", async () => {
    const fetchMock = ok(commonsPayload([page("File:Nephron.svg", 1)]));
    vi.stubGlobal("fetch", fetchMock);

    const images = await fetchDiagrams("explain the nephron", 3, { drawingOnly: true });

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("commons.wikimedia.org/w/api.php");
    expect(url).toContain("gsrnamespace=6");
    expect(url).toContain("iiurlwidth=900");
    expect(url).toContain(encodeURIComponent("nephron diagram filetype:drawing"));
    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    // Wikimedia throttles anonymous default agents, so the agent is explicit.
    expect(headers["User-Agent"]).toContain("Ravikisan");
    expect(images).toHaveLength(1);
  });

  it("does not search when the question has no searchable words", async () => {
    const fetchMock = ok(commonsPayload([]));
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchDiagrams("what is it")).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("raises on a failed request so the caller can degrade", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 429 })));
    await expect(fetchDiagrams("explain the nephron")).rejects.toThrow(/429/);
  });

  it("caps the result count", async () => {
    vi.stubGlobal(
      "fetch",
      ok(
        commonsPayload(
          Array.from({ length: 8 }, (_, i) => page(`File:Nephron part ${i}.svg`, i + 1)),
        ),
      ),
    );
    const images = await fetchDiagrams("nephron", 3);
    expect(images).toHaveLength(3);
    expect(DIAGRAM_LIMIT).toBeGreaterThan(0);
  });
});

describe("formatDiagramBlock — the contract the model reads", () => {
  it("hands over real URLs with file names and licences", () => {
    const block = formatDiagramBlock([
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/Nephron.svg/900px.png",
        file: "File:Nephron.svg",
        license: "CC BY-SA 4.0",
        width: 1200,
        height: 800,
      },
    ]);
    expect(block).toContain("[REAL DIAGRAM FILES ATTACHED — WIKIMEDIA COMMONS]");
    expect(block).toContain("https://upload.wikimedia.org/wikipedia/commons/thumb/Nephron.svg/900px.png");
    expect(block).toContain("File:Nephron.svg");
    expect(block).toContain("CC BY-SA 4.0");
    expect(block).toContain("never invent an image URL");
  });

  it("is silent when there is nothing to attach", () => {
    expect(formatDiagramBlock([])).toBe("");
  });
});

describe("fetchDiagramContext — best effort, never a broken reply", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.DIAGRAM_SEARCH;
  });

  it("is off during a test run unless it is asked for", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(diagramSearchEnabled()).toBe(false);
    expect(await fetchDiagramContext("explain the nephron")).toBe("");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back to an unfiltered search when no drawing matched", async () => {
    process.env.DIAGRAM_SEARCH = "on";
    const fetchMock = vi.fn(async (url: string) =>
      new Response(
        JSON.stringify(
          // The request URL is percent-encoded, so decode before inspecting it.
          decodeURIComponent(String(url)).includes("filetype:drawing")
            ? commonsPayload([])
            : commonsPayload([page("File:Nephron.svg", 1)]),
        ),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const block = await fetchDiagramContext("explain the nephron in full");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(block).toContain("[REAL DIAGRAM FILES ATTACHED");
  });

  it("returns nothing — never throws — when Wikimedia is unreachable", async () => {
    process.env.DIAGRAM_SEARCH = "on";
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("network down");
    }));
    await expect(fetchDiagramContext("explain the nephron")).resolves.toBe("");
  });

  it("reaches the model as part of the assembled context", async () => {
    // The end-to-end wire: a real question, a real context build, only the
    // network stubbed. Guards against the module existing while nothing calls
    // it — which is exactly how a "fetch diagrams" feature silently dies.
    process.env.DIAGRAM_SEARCH = "on";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify(commonsPayload([page("File:Nephron.svg", 1)])), {
          status: 200,
        }),
      ),
    );

    const context = await buildProfessorContext("explain the structure of a nephron");

    expect(context).toContain("[REAL DIAGRAM FILES ATTACHED — WIKIMEDIA COMMONS]");
    expect(context).toContain("https://upload.wikimedia.org/");
    expect(context).toContain("File:Nephron.svg");
  }, 30_000);
});
