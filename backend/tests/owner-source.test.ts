import { describe, expect, it } from "vitest";
import type { CorpusEntry } from "../src/ai/curriculum-corpus";
import {
  OWNER_SLOT_QUOTA,
  gradeStrength,
  selectHits,
  type CurriculumHit,
} from "../src/ai/curriculum-retrieval";

/**
 * OWNER BOOKS AS A SOURCE (owner request 2026-09-30).
 *
 * The ingestion side is covered in book-ingest.test.ts. What these pin is the
 * half that decides whether the owner's material actually REACHES the answer,
 * because that is where the feature silently failed in practice:
 *
 *   · a book matches only inside its BODY (a curated note matches in its
 *     TITLE, six times the weight), so the book lost the ranking; and
 *   · it lost the character budget too — curated records run ~15k characters,
 *     the ceiling is 48k, and whatever is attached last never arrives.
 *
 * The two rules below are the fix: an owner drop-in that carries EVERY content
 * term of the question is graded STRONG even without a title match, and owner
 * material is attached FIRST. Neither rule lowers the bar for junk: a record
 * missing even one content term stays weak and is never promoted.
 */

function entry(overrides: Partial<CorpusEntry> = {}): CorpusEntry {
  return {
    id: "kb/books/physics/chapter-3.json",
    classLevel: "class-12",
    subject: "physics",
    unit: "Chapter 3 Motion in a Straight Line",
    title: "Chapter 3 Motion in a Straight Line",
    topicSlug: "",
    relevance: 0,
    sections: [],
    haystack: "newton first law motion inertia",
    source: "kb/books/physics/chapter-3.json",
    dropIn: true,
    contentChars: 4000,
    filler: false,
    ...overrides,
  };
}

function hit(overrides: Partial<CurriculumHit> = {}): CurriculumHit {
  return {
    entry: entry(),
    score: 10,
    matched: ["newton", "first", "law", "motion"],
    positionTokens: [],
    strength: "strong",
    ...overrides,
  };
}

const TARGET = ["newton", "motion"];

describe("gradeStrength — an owner's own book counts as coverage", () => {
  it("grades an owner drop-in strong on a body match alone", () => {
    // The book case: every content term is present, none of them in the title,
    // because a chapter is named after the chapter and not after the concept.
    expect(gradeStrength(hit(), TARGET, 6)).toBe("strong");
  });

  it("still refuses an owner record that is missing a content term", () => {
    const partial = hit({ matched: ["newton"], entry: entry({ haystack: "newton" }) });
    expect(gradeStrength(partial, TARGET, 6)).toBe("weak");
  });

  it("leaves curated records exactly as they were", () => {
    const curated = hit({ entry: entry({ dropIn: false }) });
    // Same match, no title position, not an owner record: still a passing
    // mention, exactly as before this change.
    expect(gradeStrength(curated, TARGET, 6)).toBe("weak");
    const named = hit({
      entry: entry({ dropIn: false, title: "Newton's Laws of Motion" }),
      positionTokens: ["newton"],
    });
    expect(gradeStrength(named, TARGET, 6)).toBe("strong");
  });

  it("does not call a stray word coverage", () => {
    const noisy = hit({
      matched: ["newton"],
      entry: entry({ haystack: "newton" }),
    });
    expect(gradeStrength(noisy, TARGET, 6)).toBe("weak");
  });
});

describe("selectHits — owner material is attached, and attached first", () => {
  const curated = (title: string, score: number) =>
    hit({ entry: entry({ dropIn: false, title, id: title }), score, positionTokens: ["newton"] });
  const owner = hit({ entry: entry(), score: 4 });

  it("promotes an owner match out of last place to the front", () => {
    const ranked = [curated("A", 30), curated("B", 20), curated("C", 10), owner];
    const chosen = selectHits(ranked, 3);
    expect(chosen[0]).toBe(owner);
    expect(chosen).toHaveLength(3);
    // The two best curated hits survive; only the weakest slot was taken.
    expect(chosen.map((h) => h.entry.title)).toEqual([
      "Chapter 3 Motion in a Straight Line",
      "A",
      "B",
    ]);
  });

  it("never promotes a weak owner record", () => {
    const weakOwner = hit({ entry: entry(), score: 1, strength: "weak" });
    const ranked = [curated("A", 30), curated("B", 20), weakOwner];
    expect(selectHits(ranked, 3).map((h) => h.entry.title)).toEqual(["A", "B", "Chapter 3 Motion in a Straight Line"]);
    expect(selectHits(ranked, 2)).toHaveLength(2);
    expect(selectHits(ranked, 2).some((h) => h === weakOwner)).toBe(false);
  });

  it("keeps the curated order when there is no owner material", () => {
    const ranked = [curated("A", 30), curated("B", 20), curated("C", 10)];
    expect(selectHits(ranked, 3)).toEqual(ranked);
  });

  it("honours the limit and the quota", () => {
    const owners = [1, 2, 3].map((n) =>
      hit({ entry: entry({ id: `book-${n}`, title: `Book ${n}` }), score: 1 }),
    );
    const ranked = [...owners, curated("A", 30)];
    expect(selectHits(ranked, 2)).toHaveLength(2);
    // Only OWNER_SLOT_QUOTA books may take a slot, so curated material is not
    // crowded out by one long book that happens to match everywhere.
    const atFour = selectHits(ranked, 4);
    expect(atFour.filter((h) => h.entry.dropIn)).toHaveLength(OWNER_SLOT_QUOTA);
    expect(atFour.filter((h) => !h.entry.dropIn)).toHaveLength(1);
    // The quota is a ceiling, not a floor: it can be turned off entirely.
    expect(selectHits(ranked, 4, 0)).toHaveLength(4);
  });
});
