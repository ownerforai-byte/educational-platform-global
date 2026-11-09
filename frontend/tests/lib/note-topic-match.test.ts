import { describe, it, expect } from "vitest";
import { compactSlug, noteMatchesTopic } from "@/lib/note-topic-match";

/**
 * The shared topic ↔ note matcher (2026-11-08 pass: "notes exist but the page
 * says under progress"). Pins the near-miss slugs found in the real corpus:
 * `alkanes` vs `alkanes-conformations-…`, `mendels-laws-of-inheritance` vs the
 * apostrophe-split `mendel-s-laws-…`, and Devanagari prefix pairs.
 */

describe("compactSlug", () => {
  it("folds hyphens from apostrophes and separators away", () => {
    expect(compactSlug("mendel-s-laws-of-inheritance")).toBe("mendelslawsofinheritance");
    expect(compactSlug("Mendel's Laws — of Inheritance")).toBe("mendelslawsofinheritance");
  });

  it("keeps Devanagari letters and digits", () => {
    expect(compactSlug("पाठ-१-वीर-पुर्खा")).toBe("पाठ१वीरपुर्खा");
  });
});

describe("noteMatchesTopic", () => {
  it("matches the exact slug and filenames carrying the slug", () => {
    expect(noteMatchesTopic("alkanes", "01-alkanes.json", "alkanes")).toBe(true);
    expect(noteMatchesTopic(undefined, "03-mendels-laws.json", "mendels-laws")).toBe(true);
  });

  it("matches long-form syllabus slugs to short corpus slugs (prefix)", () => {
    expect(
      noteMatchesTopic(
        "alkanes",
        "01-alkanes.json",
        "alkanes-conformations-combustion-free-radical-halogenation",
      ),
    ).toBe(true);
    expect(
      noteMatchesTopic(
        undefined,
        "alkynes.json",
        "alkynes-preparation-acidic-character-addition-reactions",
      ),
    ).toBe(true);
  });

  it("matches slugs split differently by the apostrophe rule", () => {
    expect(
      noteMatchesTopic(
        "mendels-laws-of-inheritance",
        "03-mendels-laws-of-inheritance.json",
        "mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross",
      ),
    ).toBe(true);
  });

  it("matches Devanagari prefix pairs", () => {
    expect(
      noteMatchesTopic(
        "पत्र-लेखन-आधिकारिक-र-अनौपचारिक",
        "02.json",
        "पत्र-लेखन-आधिकारिक-र-अनौपचारिक-व्यावसायिक-पत्र-सहित",
      ),
    ).toBe(true);
  });

  it("does not match related-but-different topics or stub prefixes", () => {
    // Shared tail words are not a match — only prefix relations are.
    expect(
      noteMatchesTopic(
        "mendels-laws-of-inheritance",
        "03.json",
        "molecular-basis-of-inheritance-dna-structure-replication",
      ),
    ).toBe(false);
    // Two different NEB sub-lists under the same preparation heading.
    expect(
      noteMatchesTopic(
        "alkynes-preparation-from-carbon-and-hydrogen",
        "04.json",
        "alkynes-preparation-acidic-character-addition-reactions",
      ),
    ).toBe(false);
    // Stub slugs cannot claim topics.
    expect(noteMatchesTopic("dna", "01.json", "dna-structure-replication")).toBe(false);
    expect(noteMatchesTopic("", "", "")).toBe(false);
  });
});