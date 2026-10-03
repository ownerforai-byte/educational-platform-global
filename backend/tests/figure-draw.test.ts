import { describe, expect, test, vi } from "vitest";
import { drawAcademicFigure } from "../src/ai/figure-draw";
import type { AIChatMessage } from "../src/ai/service";

/**
 * The vector figure writer (owner request 2026-10-03). The model call is always
 * injected, so these tests pin the FLOW — classify, draw, repair once, fall back
 * with a reason, never throw — without a network or a key.
 */

const FIGURE = `<svg viewBox="0 0 900 640">
  <g><title>Stage 1 (2n) — the zygote; mitosis begins the next stage</title><circle cx="100" cy="100" r="40" stroke="#0f172a"/></g>
  <g><title>Stage 2 (n) — meiosis halves the chromosome number</title><circle cx="300" cy="100" r="40" stroke="#0f172a"/></g>
</svg>`;

const NO_PARTS = '<svg viewBox="0 0 900 640"><text x="20" y="40" font-size="16">A figure without parts</text></svg>';

function reply(text: string) {
  return async () => text;
}

describe("drawAcademicFigure", () => {
  test("returns the drawing, its parts and the archetype on the first reply", async () => {
    const chat = vi.fn(reply("```svg Life cycle of Plasmodium\n" + FIGURE + "\n```"));

    const drawn = await drawAcademicFigure("draw the life cycle of Plasmodium", { chat });

    expect(drawn.kind).toBe("lifecycle");
    expect(drawn.caption).toBe("Life cycle of Plasmodium");
    expect(drawn.attempts).toBe(1);
    expect(drawn.reason).toBeUndefined();
    expect(drawn.svg).toContain("<svg");
    expect(drawn.parts).toEqual([
      { name: "Stage 1 (2n)", detail: "the zygote; mitosis begins the next stage" },
      { name: "Stage 2 (n)", detail: "meiosis halves the chromosome number" },
    ]);
    expect(chat).toHaveBeenCalledTimes(1);
  });

  test("asks once for a repair when the figure came back without hoverable parts", async () => {
    const chat = vi
      .fn()
      .mockResolvedValueOnce(NO_PARTS)
      .mockResolvedValueOnce("```svg Labelled nephron\n" + FIGURE + "\n```");

    const drawn = await drawAcademicFigure("labelled diagram of the nephron", { chat });

    expect(chat).toHaveBeenCalledTimes(2);
    expect(drawn.attempts).toBe(2);
    expect(drawn.parts.length).toBe(2);
    // The repair message must carry the grouping law, not just "try again".
    const repair = chat.mock.calls[1][0] as AIChatMessage[];
    expect(repair[repair.length - 1].content).toContain("<title>");
  });

  test("repairs a reply that carried no drawing at all", async () => {
    const chat = vi
      .fn()
      .mockResolvedValueOnce("I cannot draw that right now.")
      .mockResolvedValueOnce("```svg Ray diagram\n" + FIGURE + "\n```");

    const drawn = await drawAcademicFigure("ray diagram of a convex lens", { chat });

    expect(drawn.attempts).toBe(2);
    expect(drawn.svg).toBeDefined();
  });

  test("gives up with a reason after the second miss, never throwing", async () => {
    const chat = vi.fn(reply("still nothing usable"));

    const drawn = await drawAcademicFigure("graph of binding energy versus mass number", { chat });

    expect(chat).toHaveBeenCalledTimes(2);
    expect(drawn.svg).toBeUndefined();
    expect(drawn.kind).toBe("graph");
    expect(drawn.reason).toContain("complete figure");
  });

  test("a pictorial request never spends a model call — it belongs to the raster engine", async () => {
    const chat = vi.fn(reply("unused"));

    const drawn = await drawAcademicFigure("photorealistic snow leopard at dawn", { chat });

    expect(chat).not.toHaveBeenCalled();
    expect(drawn.kind).toBe("illustration");
    expect(drawn.attempts).toBe(0);
    expect(drawn.reason).toContain("raster");
  });

  test("a blank request is refused before any model call", async () => {
    const chat = vi.fn(reply("unused"));

    const drawn = await drawAcademicFigure("   ", { chat });

    expect(chat).not.toHaveBeenCalled();
    expect(drawn.reason).toContain("no figure request");
  });

  test("a thrown model error becomes a reason, not an exception", async () => {
    const chat = vi.fn(async () => {
      throw new Error("gateway 500");
    });

    const drawn = await drawAcademicFigure("apparatus for titration", { chat });

    expect(drawn.svg).toBeUndefined();
    expect(drawn.reason).toBe("gateway 500");
    expect(drawn.kind).toBe("apparatus");
  });
});
