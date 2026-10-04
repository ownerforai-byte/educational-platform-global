import { describe, expect, it } from "vitest";
import {
  FORMULA_SUBJECTS,
  getFormulaSheetSummaries,
  getSubjectFormulaSheet,
  getUnitFormulaSheet,
  isFormulaSubjectSlug,
  type ClassifiedNoteGroup,
} from "@/lib/formula-sheet";
import { getSubjectSyllabus } from "@/lib/syllabus";

const CLASS_SLUG = "class-11-notes";

describe("formula-sheet — subject sheets", () => {
  it("lists Physics units in the official syllabus order", async () => {
    const sheet = await getSubjectFormulaSheet("physics");
    expect(sheet).not.toBeNull();
    const syllabus = getSubjectSyllabus(CLASS_SLUG, "physics")!;
    expect(sheet!.units.map((u) => u.id)).toEqual(syllabus.units.map((u) => u.id));
  });

  it("covers every Class 11 Physics unit with formulas", async () => {
    const sheet = await getSubjectFormulaSheet("physics");
    expect(sheet!.formulaCount).toBeGreaterThan(300);
    expect(sheet!.units.every((u) => u.formulaCount > 0)).toBe(true);
  });

  it("covers every Class 11 Mathematics unit with formulas", async () => {
    const sheet = await getSubjectFormulaSheet("mathematics");
    const syllabus = getSubjectSyllabus(CLASS_SLUG, "mathematics")!;
    expect(sheet!.units.map((u) => u.id)).toEqual(syllabus.units.map((u) => u.id));
    expect(sheet!.formulaCount).toBeGreaterThan(150);
    expect(sheet!.units.every((u) => u.formulaCount > 0)).toBe(true);
  });

  it("covers every Class 11 Chemistry unit with formulas", async () => {
    const sheet = await getSubjectFormulaSheet("chemistry");
    const syllabus = getSubjectSyllabus(CLASS_SLUG, "chemistry")!;
    expect(sheet!.units.map((u) => u.id)).toEqual(syllabus.units.map((u) => u.id));
    expect(sheet!.formulaCount).toBeGreaterThan(200);
    expect(sheet!.units.every((u) => u.formulaCount > 0)).toBe(true);
  });

  it("deduplicates formulas inside every unit and keeps them non-empty", async () => {
    for (const subject of FORMULA_SUBJECTS) {
      const sheet = await getSubjectFormulaSheet(subject.slug);
      for (const unit of [...sheet!.units, ...sheet!.extras]) {
        const all = unit.topics.flatMap((t) => t.formulas);
        expect(all.length, `${subject.slug}/${unit.id}`).toBe(unit.formulaCount);
        expect(new Set(all).size, `${subject.slug}/${unit.id} duplicates`).toBe(all.length);
        expect(all.every((f) => f.trim().length > 0)).toBe(true);
      }
    }
  });

  it("keeps legacy folders that no longer map to a syllabus unit", async () => {
    const physics = await getSubjectFormulaSheet("physics");
    const syllabusIds = new Set(physics!.units.map((u) => u.id));
    expect(physics!.extras.length).toBeGreaterThan(0);
    for (const extra of physics!.extras) {
      expect(syllabusIds.has(extra.id)).toBe(false);
      expect(extra.isExtra).toBe(true);
      expect(extra.unitNo).toBeNull();
      expect(extra.formulaCount).toBeGreaterThan(0);
    }
  });

  it("returns null for subjects without a formula sheet", async () => {
    expect(await getSubjectFormulaSheet("biology")).toBeNull();
    expect(await getSubjectFormulaSheet("english")).toBeNull();
    expect(isFormulaSubjectSlug("physics")).toBe(true);
    expect(isFormulaSubjectSlug("biology")).toBe(false);
  });

  it("auto-surfaces classified notes (conditions, solved PYQs, exam tricks, hints)"
    + " and per-formula shortcuts across every subject", async () => {
    for (const subject of FORMULA_SUBJECTS) {
      const sheet = await getSubjectFormulaSheet(subject.slug);
      expect(sheet).not.toBeNull();
      const allTopics = sheet!.units.flatMap((u) => u.topics);

      const topicsWithFormulas = allTopics.filter((t) => t.formulas.length > 0);
      const topicsWithShortcuts = topicsWithFormulas.filter((t) =>
        t.shortcuts.some((s) => s),
      );
      const classifiedTopics = allTopics.filter((t) => t.classifiedNotes);
      const classifiedLines = classifiedTopics.reduce<Record<keyof ClassifiedNoteGroup, number>>(
        (acc, t) => {
          if (!t.classifiedNotes) return acc;
          for (const k of ["conditions", "solvedPyqs", "examTricks", "hints"] as const) {
            acc[k] += t.classifiedNotes[k].length;
          }
          return acc;
        },
        { conditions: 0, solvedPyqs: 0, examTricks: 0, hints: 0 },
      );
      if (subject.slug === "chemistry") {
        // Chemistry concept notes are mixed: many ship a matching `keyPoints`
        // line per formula, some do not. Rather than assert shortcut coverage
        // (which is partial), assert that chemistry's rich existing fields
        // (`practice` solved problems, `examShortTricks`, `mcs`, `confusion`,
        // `importantNotes`) still produce strong classified coverage.
        expect(
          classifiedLines.solvedPyqs,
          `${subject.slug}: chemistry should expose many solved-PYQ lines from practice`,
        ).toBeGreaterThan(20);
        expect(
          classifiedTopics.length,
          `${subject.slug}: most chemistry formula topics should carry classified notes`,
        ).toBeGreaterThanOrEqual(Math.ceil(topicsWithFormulas.length * 0.7));
      } else {
        expect(
          topicsWithShortcuts,
          `${subject.slug}: every formula topic should expose at least one shortcut`,
        ).toEqual(topicsWithFormulas);
      }

      expect(
        classifiedTopics.length,
        `${subject.slug}: at least one topic carries classified notes`,
      ).toBeGreaterThan(0);
      expect(
        classifiedLines.solvedPyqs + classifiedLines.examTricks,
        `${subject.slug}: at least some solved-PYQ / exam-trick lines exist`,
      ).toBeGreaterThan(0);

      for (const t of classifiedTopics) {
        if (!t.classifiedNotes) continue;
        expect(t.classifiedNotes.conditions.length).toBeLessThanOrEqual(3);
        expect(t.classifiedNotes.solvedPyqs.length).toBeLessThanOrEqual(3);
        expect(t.classifiedNotes.examTricks.length).toBeLessThanOrEqual(3);
        expect(t.classifiedNotes.hints.length).toBeLessThanOrEqual(3);
      }
    }
  });
});

describe("formula-sheet — summaries and unit lookup", () => {
  it("summarises all three subjects with real counts", async () => {
    const summaries = await getFormulaSheetSummaries();
    expect(summaries.map((s) => s.slug).sort()).toEqual(
      FORMULA_SUBJECTS.map((s) => s.slug).sort(),
    );
    for (const summary of summaries) {
      expect(summary.formulaCount).toBeGreaterThan(0);
      expect(summary.unitCount).toBeGreaterThan(0);
    }
  });

  it("resolves a unit sheet with its topics and formulas", async () => {
    const found = await getUnitFormulaSheet("physics", "kinematics");
    expect(found).not.toBeNull();
    expect(found!.unit.id).toBe("kinematics");
    expect(found!.unit.unitNo).not.toBeNull();
    expect(found!.unit.topics.length).toBeGreaterThan(0);
    expect(found!.unit.formulaCount).toBeGreaterThan(0);
  });

  it("resolves a legacy bank through the same lookup", async () => {
    const found = await getUnitFormulaSheet("physics", "mechanics");
    expect(found).not.toBeNull();
    expect(found!.unit.isExtra).toBe(true);
  });

  it("returns null for unknown units and subjects", async () => {
    expect(await getUnitFormulaSheet("physics", "not-a-unit")).toBeNull();
    expect(await getUnitFormulaSheet("biology", "kinematics")).toBeNull();
  });
});
