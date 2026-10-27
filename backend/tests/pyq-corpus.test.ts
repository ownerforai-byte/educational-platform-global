import { beforeAll, describe, expect, test } from "vitest";

import {
  getCorpus,
  resetCorpusCache,
  type CorpusEntry,
} from "../src/ai/curriculum-corpus";
import { retrieveCurriculum } from "../src/ai/curriculum-retrieval";

/**
 * PYQ-bank grounding contract (`content/pyqs/` — one folder per subject).
 *
 * The bank exists for two consumers: the quiz engine (which reads the content
 * index — covered by `frontend/tests/lib/pyq-bank.test.ts`) and the AI tutor
 * (which reads this corpus). A bank file is a `questions[]` array of objects,
 * a shape the generic corpus reader would otherwise see as ZERO records
 * (no teachable string fields), so the `questionBank` root expands each
 * question into its own Q&A record. These tests lock that down:
 *
 *  1. every subject's banks reach the corpus with correct coordinates;
 *  2. no raw bank envelope leaks in as a junk record;
 *  3. the records actually ground answers (retrieval finds them).
 */
let pyqs: CorpusEntry[] = [];
let drills: CorpusEntry[] = [];
let practicals: CorpusEntry[] = [];

// Full-corpus load takes several seconds and grows with the bank — allow it.
beforeAll(() => {
  resetCorpusCache();
  const entries = getCorpus().entries;
  pyqs = entries.filter((e) => e.source.startsWith("content/pyqs/"));
  drills = entries.filter((e) => e.source.startsWith("content/drills/"));
  practicals = entries.filter((e) => e.source.startsWith("content/practicals/"));
}, 120_000);

describe("pyq bank — corpus expansion", () => {
  test("all six subjects are grounded", () => {
    const subjects = new Set(pyqs.map((e) => e.subject));
    for (const s of ["physics", "chemistry", "biology", "mathematics", "english", "nepali"]) {
      expect(subjects.has(s), `missing subject ${s}`).toBe(true);
    }
  });

  test("class levels resolve from the bank path", () => {
    const levels = new Set(pyqs.map((e) => e.classLevel));
    expect(levels.has("class-11")).toBe(true);
    expect(levels.has("class-12")).toBe(true);
    expect(levels.has("unknown")).toBe(false);
  });

  test("no raw bank envelope leaks in as a record", () => {
    // Expanded questions carry `id`s of the form `bank path#question-id`; a
    // bare bank path means the envelope itself was indexed (its only string
    // is `examSource`). `source` is always the bare file path by design.
    for (const e of pyqs) expect(e.id, e.id).toContain("#");
  });

  test("each record carries a question and an answer section", () => {
    expect(pyqs.length).toBeGreaterThanOrEqual(60);
    for (const e of pyqs) {
      const labels = e.sections.map((s) => s.label.toLowerCase());
      expect(labels, e.id).toContain("question");
      expect(labels, e.id).toContain("answer");
    }
  });

  test("detailed solutions survive as substantive (grounding) records", () => {
    const substantive = pyqs.filter((e) => !e.filler);
    // 4-mark class-12 solutions run well past the teachable floor.
    expect(substantive.length).toBeGreaterThanOrEqual(40);
  });
});

describe("concept drills — corpus grounding", () => {
  test("every subject has drills in both classes", () => {
    for (const subject of ["physics", "chemistry", "biology", "mathematics", "english", "nepali"]) {
      const sub = drills.filter((e) => e.subject === subject);
      expect(sub.length, `missing drills for ${subject}`).toBeGreaterThan(0);
      expect(new Set(sub.map((e) => e.classLevel)), subject).toEqual(new Set(["class-11", "class-12"]));
    }
  });

  test("each drill carries a question and a clearing explanation", () => {
    expect(drills.length).toBeGreaterThanOrEqual(40);
    for (const e of drills) {
      const labels = e.sections.map((s) => s.label.toLowerCase());
      expect(labels, e.id).toContain("question");
      expect(labels, e.id).toContain("answer");
    }
  });

  test("a misconception query grounds on the drills", () => {
    // Concept notes rightly outrank drills for teaching; the drills must be
    // inside the wider grounding window the tutor actually pulls.
    const hits = retrieveCurriculum("why is electric field zero inside a conductor", 25);
    expect(hits.some((h) => h.entry.source.startsWith("content/drills/"))).toBe(true);
  });
});

describe("practicals — corpus grounding", () => {
  test("every subject has practicals in both classes", () => {
    for (const subject of ["physics", "chemistry", "biology", "mathematics", "english", "nepali"]) {
      const sub = practicals.filter((e) => e.subject === subject);
      expect(sub.length, `missing practicals for ${subject}`).toBeGreaterThan(0);
      expect(new Set(sub.map((e) => e.classLevel)), subject).toEqual(new Set(["class-11", "class-12"]));
    }
  });

  test("practical records carry their own syllabus unit", () => {
    expect(practicals.length).toBeGreaterThanOrEqual(100);
    for (const e of practicals) {
      // A subject-level file must never leak its filename as the unit.
      expect(e.unit, e.id).not.toMatch(/\.json$/);
      expect(e.unit.length).toBeGreaterThan(2);
      const labels = e.sections.map((s) => s.label.toLowerCase());
      expect(labels, e.id).toContain("question");
      expect(labels, e.id).toContain("answer");
    }
  });

  test("no raw practical envelope leaks in as a record", () => {
    for (const e of practicals) expect(e.id, e.id).toContain("#");
  });

  test("a real-world query grounds on the practicals", () => {
    const hits = retrieveCurriculum("why do power lines sag in summer thermal expansion", 25);
    expect(hits.some((h) => h.entry.source.startsWith("content/practicals/"))).toBe(true);
  });
});

describe("pyq bank — retrieval reaches the bank", () => {
  // Concept notes rightly outrank past questions for teaching (their titles
  // name the concept), so these use a wider window: the bank must be *in*
  // the grounding set a tutor pulls, not necessarily top-3.
  test("a projectile-range question grounds on the mechanics bank", () => {
    const hits = retrieveCurriculum("projectile motion time of flight horizontal range", 12);
    expect(hits.some((h) => h.entry.source.startsWith("content/pyqs/"))).toBe(true);
  });

  test("a Kirchhoff-balance question grounds on the current-electricity bank", () => {
    const hits = retrieveCurriculum("Wheatstone bridge balance condition Kirchhoff voltage law", 12);
    expect(hits.some((h) => h.entry.source.startsWith("content/pyqs/"))).toBe(true);
  });

  test("an NEB-tagged question finds the bank first", () => {
    // "NEB 2023" lives in the bank path/title, not in concept notes.
    const hits = retrieveCurriculum("NEB 2023 projectile range question", 6);
    expect(hits.some((h) => h.entry.source.startsWith("content/pyqs/"))).toBe(true);
  });
});
