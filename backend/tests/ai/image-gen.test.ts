/**
 * IMAGE-GEN — unit tests for the live figure engine's pure core (no network):
 *
 *   FigureStreamFilter        → fences are stripped from the student stream
 *                               and captured as figure specs
 *   resolveFiguresInText     → a finished answer's fences become markdown
 *                               images (with a fake generator: zero network)
 *   withFigureToolInstruction → the prompt contract appears only when
 *                               image generation is enabled
 */
import { describe, it, expect, afterEach } from "vitest";
import {
  FigureStreamFilter,
  FIGURE_FENCE,
  FIGURE_TOOL_INSTRUCTION,
  resolveFiguresInText,
  withFigureToolInstruction,
} from "../../src/ai/image-gen";

const fence = (brief: string) => ["```" + FIGURE_FENCE, brief, "```"].join("\n");

/**
 * Drive a whole answer through the filter the way the real transport does —
 * arbitrary chunk boundaries — and return everything that would reach the
 * student (forwarded chunks + the flush tail) plus the captured figures.
 */
function streamThrough(answer: string, chunkSize = 7) {
  const filter = new FigureStreamFilter();
  let forwarded = "";
  const figureStarts: Array<{ prompt: string }> = [];
  let i = 0;
  while (i < answer.length) {
    const { chunks, figureStarts: starts } = filter.push(answer.slice(i, i + chunkSize));
    i += chunkSize;
    forwarded += chunks.join("");
    for (const s of starts) figureStarts.push(s);
  }
  const flushed = filter.flush();
  return {
    student: forwarded + flushed.tail,
    figures: [...filter.figures, ...flushed.figureStarts],
    startsInStream: figureStarts,
  };
}

describe("FigureStreamFilter", () => {
  it("strips a complete fence and records the figure spec once", () => {
    const answer = `The concept explained.\n\n${fence("draw a labelled ray through a prism")}\n\nMore teaching after.`;
    const { student, figures } = streamThrough(answer);

    expect(student).not.toContain(FIGURE_FENCE);
    expect(student).not.toContain("draw a labelled ray through a prism");
    expect(student).toContain("The concept explained.");
    expect(student).toContain("More teaching after.");
    expect(figures).toHaveLength(1);
    expect(figures[0].prompt).toBe("draw a labelled ray through a prism");
  });

  it("closes a dangling fence on flush — nothing lost, nothing half-shown", () => {
    // Stream dies right after the closing fence line is NOT delivered.
    const answer = `Text first.\n\n${fence("draw a circuit diagram")}`.replace(/\n```$/, "");
    const { student, figures } = streamThrough(answer);

    expect(student).not.toContain(FIGURE_FENCE);
    expect(student).toContain("Text first.");
    expect(figures).toHaveLength(1);
    expect(figures[0].prompt).toBe("draw a circuit diagram");
  });

  it("passes a plain answer through unchanged, byte for byte", () => {
    const answer = "Plain answer.\n\n- bullet one\n- bullet two";
    const { student, figures } = streamThrough(answer);
    expect(student).toBe(answer);
    expect(figures).toHaveLength(0);
  });

  it("does not collide with the existing svg/diagram fence languages", () => {
    const answer = "```svg\n<rect x=\"0\" y=\"0\" width=\"10\" height=\"10\"/>\n```\nText after.";
    const { student, figures } = streamThrough(answer);
    // The existing model-drawn SVG fence must be treated as ordinary text here
    // (it has its own channel in visuals.ts) — no figure is captured.
    expect(figures).toHaveLength(0);
    expect(student).toContain("```svg");
  });
});

/**
 * TOKEN-LEVEL EMISSION (owner 2026-10-01): the filter must never hold ordinary
 * prose back. The old line-buffered version emitted only complete lines, so a
 * paragraph arrived as one lump and the reply looked like it landed at once —
 * Claude/ChatGPT behaviour is text appearing as it is written.
 */
describe("FigureStreamFilter — token-level emission", () => {
  it("forwards every prose delta immediately, one push in → one chunk out", () => {
    const filter = new FigureStreamFilter();
    const words = ["The ", "cell ", "is ", "the ", "unit ", "of ", "life."];
    for (const word of words) {
      // Each push returns that word right away: no waiting for a newline.
      expect(filter.push(word).chunks).toEqual([word]);
    }
    expect(filter.flush().tail).toBe("");
  });

  it("stays ready to type during a long single-line paragraph", () => {
    const filter = new FigureStreamFilter();
    let silent = 0;
    for (let i = 0; i < 60; i += 1) {
      if (filter.push("word ").chunks.length === 0) silent += 1;
    }
    expect(silent).toBe(0);
  });

  it("holds only a tail that could still become a figure opener", () => {
    const filter = new FigureStreamFilter();
    expect(filter.push("``").chunks).toEqual([]); // could still be the fence
    expect(filter.push("`").chunks).toEqual([]); // still could be the fence
    expect(filter.push("j").chunks).toEqual(["```j"]); // diverged → real text
    expect(filter.push("s code").chunks).toEqual(["s code"]);
    expect(filter.flush().tail).toBe("");
  });

  it("types the prose that precedes a fence before the fence closes", () => {
    const filter = new FigureStreamFilter();
    expect(filter.push("Answer: ").chunks).toEqual(["Answer: "]);
    expect(filter.push("```veer").chunks).toEqual([]); // possible opener
    expect(filter.push("-image\n").chunks).toEqual([]); // opener swallowed
    expect(filter.push("draw a cube\n").chunks).toEqual([]); // brief hidden
    // The closing fence (with its newline) ends the figure: nothing of it or
    // its brief ever reached the student.
    const closed = filter.push("```\n");
    expect(closed.chunks).toEqual([]);
    expect(closed.figureStarts).toHaveLength(1);
    expect(closed.figureStarts[0].prompt).toBe("draw a cube");
    expect(filter.push("\nDone.").chunks.join("")).toBe("\nDone.");
  });

  it("releases a fence-looking line that turns out to be ordinary text", () => {
    const filter = new FigureStreamFilter();
    expect(filter.push("```").chunks).toEqual([]);
    const next = filter.push("js\nconst x = 1;\n");
    expect(next.chunks.join("")).toBe("```js\nconst x = 1;\n");
    expect(filter.figures).toHaveLength(0);
  });
});

describe("resolveFiguresInText", () => {
  it("swaps each fence for a drawn picture (fake generator, no network)", async () => {
    const answer = `Explain first.\n\n${fence("a blue flat circle")}\n\nExplain last.`;
    const { text, figures } = await resolveFiguresInText(answer, async () => ({
      url: "https://example.test/img.png",
    }));
    expect(text).toContain("![a blue flat circle](https://example.test/img.png)");
    expect(text).not.toContain(FIGURE_FENCE);
    expect(text).toContain("Explain first.");
    expect(text).toContain("Explain last.");
    expect(figures).toHaveLength(1);
    expect(figures[0].url).toBe("https://example.test/img.png");
  });

  it("ships an honest inline note when drawing fails — never a raw fence", async () => {
    const answer = `Before.\n\n${fence("impossible brief")}`;
    const { text, figures } = await resolveFiguresInText(answer, async () => ({
      reason: "all image models failed",
    }));
    expect(text).not.toContain(FIGURE_FENCE);
    expect(text).toMatch(/Figure not drawn/);
    expect(figures).toHaveLength(1);
    expect(figures[0].url).toBeUndefined();
  });

  it("returns an unchanged answer when it carries no fences", async () => {
    const answer = "Just prose, no pictures requested.";
    const { text, figures } = await resolveFiguresInText(answer, async () => ({
      url: "https://example.test/never.png",
    }));
    expect(text).toBe(answer);
    expect(figures).toHaveLength(0);
  });
});

describe("withFigureToolInstruction", () => {
  const KEY = "AGNES_API_KEY";

  afterEach(() => {
    delete process.env[KEY];
    delete process.env.AI_IMAGE_GEN;
  });

  it("adds the figure contract only when enabled", () => {
    process.env[KEY] = "test-key";
    const on = withFigureToolInstruction("base context");
    expect(on).toContain("base context");
    expect(on).toContain(FIGURE_FENCE);
    expect(on).toContain(FIGURE_TOOL_INSTRUCTION);
    expect(on).toContain("PHYSICS");
    expect(on).toContain("NEPALI");
    expect(on).toContain("Universal drawing law");

    delete process.env[KEY];
    expect(withFigureToolInstruction("base context")).toBe("base context");
  });

  it("AI_IMAGE_GEN=off kills it even with a key", () => {
    process.env[KEY] = "test-key";
    process.env.AI_IMAGE_GEN = "off";
    expect(withFigureToolInstruction("base context")).toBe("base context");
  });
});
