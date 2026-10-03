import { describe, expect, test } from "vitest";
import {
  buildFigureBrief,
  captionForFigure,
  cleanCaption,
  classifyFigureKind,
  extractSvgFigure,
  figureParts,
  FIGURE_ARCHETYPE_GUIDE,
  FIGURE_ARCHETYPES,
  FIGURE_WRITER_SYSTEM,
  isVectorFigureKind,
  subjectOfFigure,
  type FigureKind,
} from "../src/ai/academic-figures";

/**
 * Owner request 2026-10-03: "agnes image is just drawing rough image ---- train
 * it for all kind of academic images like lifecycle, labelling, all parts name
 * with their interface with supporting details which opens after hovering".
 *
 * These assertions pin the engine behind that request: every academic request
 * lands on a real archetype (never a generic sketch), the brief carries the
 * labelling + hover contract, and only a figure the renderer can actually show
 * is ever accepted.
 */

describe("academic figure archetypes", () => {
  test("every archetype is catalogued with a drawing law", () => {
    const kinds = Object.keys(FIGURE_ARCHETYPES) as FigureKind[];
    expect(kinds.length).toBeGreaterThanOrEqual(12);
    for (const kind of kinds) {
      expect(FIGURE_ARCHETYPES[kind].label.length).toBeGreaterThan(0);
      expect(FIGURE_ARCHETYPES[kind].must.length).toBeGreaterThan(40);
    }
  });

  test("each kind is classified from the words of the request", () => {
    const cases: Array<[string, FigureKind]> = [
      ["draw the life cycle of Plasmodium with ploidy", "lifecycle"],
      ["alternation of generations in a fern", "lifecycle"],
      ["labelled diagram of the human heart", "labelled"],
      ["structure of a flower", "labelled"],
      ["photorealistic snow leopard at dawn", "illustration"],
      ["a watercolour plate of a dhaka topi", "illustration"],
      ["ray diagram of a convex lens with F and C", "ray"],
      ["circuit with a battery, ammeter and two resistors", "circuit"],
      ["free-body diagram of a block on an incline", "free-body"],
      ["titration apparatus set-up", "apparatus"],
      ["graph of binding energy versus mass number", "graph"],
      ["unit circle with radian values", "geometry"],
      ["mind map of the animal kingdom classification", "hierarchy"],
      ["comparison of plant cell and animal cell", "comparison"],
      ["timeline of the discovery of the atom", "timeline"],
      ["the process of glycolysis step by step", "process"],
    ];

    for (const [request, expected] of cases) {
      expect(classifyFigureKind(request), request).toBe(expected);
    }
  });

  test("a bare academic request is a labelled figure, not a picture", () => {
    expect(classifyFigureKind("nephron")).toBe("labelled");
    expect(classifyFigureKind("")).toBe("labelled");
  });

  test("only illustrations route away from the vector writer", () => {
    expect(isVectorFigureKind("illustration")).toBe(false);
    expect(isVectorFigureKind("lifecycle")).toBe(true);
    expect(isVectorFigureKind("labelled")).toBe(true);
  });

  test("the subject is read from the request when it is stated", () => {
    expect(subjectOfFigure("ray diagram of a convex lens")).toBe("Physics");
    expect(subjectOfFigure("titration of oxalic acid")).toBe("Chemistry");
    expect(subjectOfFigure("labelled diagram of the nephron")).toBe("Biology");
    expect(subjectOfFigure("conic sections")).toBe("Mathematics");
    expect(subjectOfFigure("something entirely neutral")).toBe("");
  });
});

describe("the shared archetype guide", () => {
  test("names the twelve shapes and the hover contract", () => {
    for (const label of [
      "LIFE CYCLE",
      "LABELLED STRUCTURE",
      "APPARATUS",
      "PROCESS / MECHANISM",
      "GRAPH",
      "CIRCUIT",
      "RAY DIAGRAM",
      "FREE-BODY",
      "GEOMETRY / MATH",
      "HIERARCHY / CLASSIFICATION",
      "COMPARISON",
      "TIMELINE",
    ]) {
      expect(FIGURE_ARCHETYPE_GUIDE).toContain(label);
    }
    expect(FIGURE_ARCHETYPE_GUIDE).toContain("UNIVERSAL LAW");
    expect(FIGURE_ARCHETYPE_GUIDE).toContain("NAME — what it does and how it links to the parts around it");
  });
});

describe("the vector writer's brief", () => {
  test("carries the request, the archetype law and the drawing rules", () => {
    const brief = buildFigureBrief({
      request: "labelled diagram of the human heart",
      kind: "labelled",
    });

    expect(brief).toContain("labelled diagram of the human heart");
    expect(brief).toContain("LABELLED STRUCTURE");
    expect(brief).toContain(FIGURE_ARCHETYPES.labelled.must);
    expect(brief).toContain('viewBox="0 0 900 640"');
    expect(brief).toContain("<title>");
    expect(brief).toContain("leader line");
    expect(brief).toContain("NEB Class 11/12");
  });

  test("names the subject and the level when they are known", () => {
    const brief = buildFigureBrief({
      request: "ray diagram of a concave mirror",
      kind: "ray",
      classLevel: "Class 12",
    });

    expect(brief).toContain("Class 12");
    expect(brief).toContain("Physics");
  });

  test("the writer system prompt locks the element list and the output shape", () => {
    expect(FIGURE_WRITER_SYSTEM).toContain("```svg");
    expect(FIGURE_WRITER_SYSTEM).toContain("FORBIDDEN");
    expect(FIGURE_WRITER_SYSTEM).toContain("no prose");
  });
});

describe("figure extraction and validation", () => {
  const good = `<svg viewBox="0 0 900 640">
    <g><title>Nucleus — controls the cell and holds the DNA</title><circle cx="100" cy="100" r="40" fill="#93c5fd" fill-opacity="0.3" stroke="#0f172a" stroke-width="2"/></g>
    <text x="10" y="30" font-size="16">Nucleus</text>
  </svg>`;

  test("pulls one complete drawing out of a fenced reply and keeps the caption", () => {
    const drawn = extractSvgFigure("Here you go:\n\n```svg Labelled animal cell\n" + good + "\n```\n");

    expect(drawn).not.toBeNull();
    expect(drawn?.svg.startsWith("<svg")).toBe(true);
    expect(drawn?.svg.endsWith("</svg>")).toBe(true);
    expect(drawn?.caption).toBe("Labelled animal cell");
  });

  test("accepts a bare <svg> run with no fence and no caption", () => {
    const drawn = extractSvgFigure(`Sure. ${good}`);

    expect(drawn?.svg).toContain("<title>");
    expect(drawn?.caption).toBe("");
  });

  test("reads a fence whose caption and opening tag share one line", () => {
    // This is the shape the real draughtsman writes — and assuming the fence
    // line was caption-only threw away every honest figure.
    const reply =
      '```svg Figure 1: Labelled Diagram of the Human Heart <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg">' +
      // The draughtsman also names its groups (id="label-…"); the renderer drops
      // the id but keeps the group and its title.
      '\n<!-- Right Atrium -->\n<g id="label-right-atrium"><title>Right Atrium — receives deoxygenated blood from the body</title>' +
      '<rect x="1" y="1" width="9" height="9" fill="#93c5fd"/></g>\n</svg>\n```';

    const drawn = extractSvgFigure(reply);

    expect(drawn).not.toBeNull();
    expect(drawn?.caption).toBe("Labelled Diagram of the Human Heart");
    expect(drawn?.svg.startsWith("<svg")).toBe(true);
    expect(drawn?.svg.endsWith("</svg>")).toBe(true);
    expect(drawn?.svg).not.toContain("xmlns");
    expect(figureParts(drawn?.svg ?? "")[0]).toEqual({
      name: "Right Atrium",
      detail: "receives deoxygenated blood from the body",
    });
  });

  test("ignores prose the model writes around the fence", () => {
    const reply =
      "Certainly! Here is the figure.\n\n```svg Labelled human heart\n<svg viewBox=\"0 0 10 10\"><g><title>Heart — pumps blood</title></g></svg>\n```\n\nWant the valves in more detail?";

    const drawn = extractSvgFigure(reply);

    expect(drawn?.caption).toBe("Labelled human heart");
    expect(drawn?.svg).toBe('<svg viewBox="0 0 10 10"><g><title>Heart — pumps blood</title></g></svg>');
  });

  test("accepts the standard xmlns declaration and strips it", () => {
    // Every model writes the XML namespace on the opening tag. It is an
    // identifier, not a network reference, and the renderer drops it — so it
    // must never make a real drawing look invalid (it did, once).
    const drawn = extractSvgFigure(
      '```svg Figure 1: Labelled human heart\n<svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg">' +
        "<g><title>Right atrium — receives deoxygenated blood from the body</title><circle r=\"4\"/></g></svg>\n```",
    );

    expect(drawn).not.toBeNull();
    expect(drawn?.svg).not.toContain("xmlns");
    expect(drawn?.svg).toContain("<g>");
    // …and the numbered prefix is dropped from the caption.
    expect(drawn?.caption).toBe("Labelled human heart");
  });

  test("refuses a figure that reaches for the network", () => {
    expect(extractSvgFigure('<svg><rect href="other.svg"/></svg>')).toBeNull();
    expect(extractSvgFigure('<svg><img src="x.png" width="1" height="1"/></svg>')).toBeNull();
    expect(extractSvgFigure('<svg><rect fill="url(https://evil.test/g.svg)"/></svg>')).toBeNull();
    expect(extractSvgFigure('<svg><rect fill="url(data:image/svg+xml;base64,AAA)"/></svg>')).toBeNull();
  });

  test("gives the drawing a coordinate system when the model forgot one", () => {
    const drawn = extractSvgFigure('<svg width="640" height="400"><circle cx="1" cy="2" r="3"/></svg>');

    expect(drawn?.svg).toContain('viewBox="0 0 640 400"');
  });

  test("refuses anything the renderer would drop", () => {
    expect(extractSvgFigure("no figure here")).toBeNull();
    expect(extractSvgFigure("<svg><script>alert(1)</script></svg>")).toBeNull();
    expect(extractSvgFigure('<svg><rect fill="url(#g)"/></svg>')).toBeNull();
    expect(extractSvgFigure('<svg><image href="https://x.test/a.png"/></svg>')).toBeNull();
    expect(extractSvgFigure('<svg><g onclick="x()"><rect/></g></svg>')).toBeNull();
    // A truncated drawing must be refused, never shown half-drawn.
    expect(extractSvgFigure("<svg viewBox=\"0 0 900 640\"><rect")).toBeNull();
  });

  test("fence-line captions lose their numbering, quotes and stray brackets", () => {
    expect(cleanCaption("`Figure 1: Labelled human heart.`")).toBe("Labelled human heart");
    expect(cleanCaption("<Human heart labelled diagram for NEB Biology>")).toBe(
      "Human heart labelled diagram for NEB Biology",
    );
    expect(cleanCaption('"Life cycle of Plasmodium"')).toBe("Life cycle of Plasmodium");
  });

  test("a caption is cleaned and short", () => {
    expect(captionForFigure("life cycle of the malarial parasite in the mosquito", "lifecycle")).toBe(
      "life cycle of the malarial parasite in the mosquito",
    );
    expect(captionForFigure("", "apparatus")).toBe("Apparatus");
  });
});

describe("the hover legend", () => {
  test("every <g> with a direct <title> becomes a named part with its detail", () => {
    const parts = figureParts(`<svg>
      <g><title>Pulmonary artery — carries deoxygenated blood from the right ventricle to the lungs</title><path d="M0 0"/></g>
      <g><title>Alveolus: site of gaseous exchange</title><circle r="4"/></g>
      <g><title>Diaphragm</title><line/></g>
      <path d="M1 1"/>
    </svg>`);

    expect(parts).toEqual([
      {
        name: "Pulmonary artery",
        detail: "carries deoxygenated blood from the right ventricle to the lungs",
      },
      { name: "Alveolus", detail: "site of gaseous exchange" },
      { name: "Diaphragm", detail: "" },
    ]);
  });

  test("entities are decoded so the legend reads as plain text", () => {
    const parts = figureParts("<svg><g><title>Vas deferens &amp; epididymis — stores sperm</title></g></svg>");
    expect(parts[0].name).toBe("Vas deferens & epididymis");
  });

  test("a figure with no grouped parts yields an empty legend", () => {
    expect(figureParts('<svg><text x="1" y="1">hello</text></svg>')).toEqual([]);
  });
});
