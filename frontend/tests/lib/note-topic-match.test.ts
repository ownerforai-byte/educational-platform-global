import { describe, it, expect } from "vitest";
import {
  compactSlug,
  noteMatchQuality,
  noteMatchesTopic,
  pickCanonicalNoteEntry,
} from "@/lib/note-topic-match";

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

describe("noteMatchQuality + pickCanonicalNoteEntry", () => {
  it("ranks exact slug above filename above prefix, 0 for no match", () => {
    const topic = "alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane";
    expect(noteMatchQuality(topic, "05-other.json", topic)).toBe(3);
    expect(noteMatchQuality("other-topic", `05-${topic}.json`, topic)).toBe(2);
    expect(noteMatchQuality("alkynes", "03-alkynes.json", topic)).toBe(1);
    expect(noteMatchQuality("dna", "01.json", topic)).toBe(0);
  });

  it("a detailed exact match beats a prefix-matched stub even when the stub is first and duplicateType 1", () => {
    // The real chemistry-manifest case: the 4-block "alkynes" stub used to win
    // the 11-block detailed note purely by manifest order.
    const topic = "alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane";
    const winner = pickCanonicalNoteEntry(
      [
        { topicSlug: "alkynes", filename: "03-alkynes.json", duplicateType: 1 },
        {
          topicSlug: topic,
          filename: "05-alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane.json",
          duplicateType: 1,
        },
      ],
      topic,
    );
    expect(winner?.filename).toBe("05-alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane.json");
  });

  it("breaks same-quality ties by duplicateType, then manifest order", () => {
    const topic = "cell-division";
    const entries = [
      { topicSlug: topic, filename: "a.json", duplicateType: 2 },
      { topicSlug: topic, filename: "b.json", duplicateType: 1 },
      { topicSlug: topic, filename: "c.json", duplicateType: 1 },
    ];
    expect(pickCanonicalNoteEntry(entries, topic)?.filename).toBe("b.json");
  });

  it("breaks same-quality ties by richness (noteChars) before duplicateType", () => {
    const topic = "cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells";
    // Corpus reality: two files share the exact slug; the deep-dive (15k chars)
    // must beat the shallow stub list (1.7k chars) regardless of order.
    const entries = [
      { topicSlug: topic, filename: "02-cell-introduction-prokaryotic-and-eukaryotic.json", noteChars: 1769 },
      { topicSlug: topic, filename: "02-cell-introduction-of-cell-concepts.json", noteChars: 15618 },
    ];
    expect(pickCanonicalNoteEntry(entries, topic)?.filename).toBe(
      "02-cell-introduction-of-cell-concepts.json",
    );
  });

  it("returns undefined when nothing matches", () => {
    expect(pickCanonicalNoteEntry([{ topicSlug: "dna", filename: "01.json" }], "photosynthesis")).toBeUndefined();
  });
});