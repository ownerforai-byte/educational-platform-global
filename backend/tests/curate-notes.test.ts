import { describe, it, expect } from "vitest";

import {
  buildCurateNotesMessages,
  parseCuratedNotes,
  placeLabel,
} from "../src/ai/curate-notes";

/**
 * Curated Notes (owner 2026-11-09): the AI behind "Curate my notes" is Agnes
 * (AGNES_API_KEY, server-side only) and it must be place-aware with a 20–80
 * bullet band. These tests pin the prompt's place-consciousness and the
 * parser's contract; the Agnes transport itself is exercised live.
 */
describe("curate notes prompt", () => {
  const place = {
    surface: "chapter-tab",
    classLevel: "Class 12",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Projectile Motion",
  };

  it("tells Agnes exactly where the student is standing", () => {
    const messages = buildCurateNotesMessages(place);
    const system = messages[0].content as string;

    expect(system).toContain("Projectile Motion · Mechanics · Physics · Class 12");
    expect(system).toContain("chapter's Curated Notes tab");
    expect(system).toContain("FOR THAT PLACE");
    expect(system).toContain("20 to 80 bullet points");
    expect(messages[1].content).toContain("Projectile Motion");
  });

  it("labels places without context as the whole syllabus", () => {
    expect(placeLabel({ surface: "veer-chat" })).toBe("your syllabus");
  });
});

describe("curate notes parser", () => {
  it("groups bullets under headings and counts them", () => {
    const notes = parseCuratedNotes(
      ["## Key terms", "- Trajectory is parabolic.", "- Range is max at 45°.", "", "## Mistakes", "- Wrong sign of g."].join("\n"),
      { surface: "chapter-tab", subject: "Physics" },
    );

    expect(notes.provider).toBe("agnes");
    expect(notes.sections).toHaveLength(2);
    expect(notes.sections[0]).toMatchObject({ heading: "Key terms" });
    expect(notes.sections[0].bullets).toHaveLength(2);
    expect(notes.bulletCount).toBe(3);
  });

  it("clamps a runaway answer to the promised 80-bullet band", () => {
    const flood = Array.from({ length: 120 }, (_, i) => `- Bullet number ${i + 1}.`).join("\n");
    const notes = parseCuratedNotes(flood, { surface: "chapter-tab" });

    expect(notes.bulletCount).toBe(80);
  });

  it("survives a heading-less plain-bullet answer", () => {
    const notes = parseCuratedNotes("- First fact.\n- Second fact.", { surface: "veer-chat" });

    expect(notes.sections).toHaveLength(1);
    expect(notes.bulletCount).toBe(2);
  });
});
