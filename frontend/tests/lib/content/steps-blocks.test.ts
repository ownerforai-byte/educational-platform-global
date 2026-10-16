import { describe, it, expect } from "vitest";
import { parseStepBlock, splitStepBlocks } from "@/lib/content/steps-blocks";

describe("parseStepBlock", () => {
  it("opens one card per ### heading, in order", () => {
    const cards = parseStepBlock(
      "### Find the net force\nAdd the vectors.\n### Apply F = ma\n$F = ma$ gives the acceleration.",
    );
    expect(cards.map((c) => c.title)).toEqual(["Find the net force", "Apply F = ma"]);
    expect(cards[0].body).toBe("Add the vectors.");
    expect(cards[1].body).toBe("$F = ma$ gives the acceleration.");
  });

  it("keeps text before the first heading as an untitled lead card", () => {
    const cards = parseStepBlock("Start here.\n### Second\nbody");
    expect(cards[0]).toEqual({ title: "", body: "Start here." });
    expect(cards[1].title).toBe("Second");
  });

  it("returns no cards for an empty fence", () => {
    expect(parseStepBlock("   \n  ")).toEqual([]);
  });

  it("treats ## and #### lines as body text, not card headings", () => {
    const cards = parseStepBlock("### Real step\n## not a card\n#### also not");
    expect(cards).toHaveLength(1);
    expect(cards[0].body).toContain("## not a card");
  });
});

describe("splitStepBlocks", () => {
  it("returns a single text segment when there is no steps fence", () => {
    expect(splitStepBlocks("Just prose.")).toEqual([{ kind: "text", text: "Just prose." }]);
  });

  it("splits prose, steps and trailing prose in order", () => {
    const reply = [
      "Here is the method.",
      "```steps Newton's second law",
      "### Identify forces",
      "Draw the free-body diagram.",
      "### Solve",
      "Divide by mass.",
      "```",
      "That is the whole method.",
    ].join("\n");

    const segments = splitStepBlocks(reply);
    expect(segments.map((s) => s.kind)).toEqual(["text", "steps", "text"]);
    const steps = segments[1];
    expect(steps.kind === "steps" && steps.steps.map((c) => c.title)).toEqual([
      "Identify forces",
      "Solve",
    ]);
    expect(segments[0]).toEqual({ kind: "text", text: "Here is the method." });
    expect(segments[2]).toEqual({ kind: "text", text: "That is the whole method." });
  });

  it("keeps a steps fence with no usable card as plain prose", () => {
    const reply = "Before\n```steps\n\n```\nAfter";
    const segments = splitStepBlocks(reply);
    expect(segments).toEqual([{ kind: "text", text: reply }]);
  });

  it("leaves an unclosed steps fence (mid-stream) as prose", () => {
    const reply = "Working on it\n```steps\n### Partial";
    expect(splitStepBlocks(reply)).toEqual([{ kind: "text", text: reply }]);
  });

  it("keeps a nested svg figure inside a step body", () => {
    const reply = [
      "```steps",
      "### Draw the lens",
      "```svg Ray diagram",
      '<svg viewBox="0 0 640 400"><line x1="0" y1="0" x2="10" y2="10"/></svg>',
      "```",
      "```",
    ].join("\n");

    const segments = splitStepBlocks(reply);
    const first = segments[0];
    expect(first.kind).toBe("steps");
    if (first.kind !== "steps") return;
    expect(first.steps[0].title).toBe("Draw the lens");
    expect(first.steps[0].body).toContain("```svg Ray diagram");
  });
});
