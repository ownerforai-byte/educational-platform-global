import { describe, expect, it } from "vitest";
import {
  FORMULA_SUBJECTS,
  getFormulaSheetSummaries,
  getSubjectFormulaSheet,
  getUnitFormulaSheet,
  isFormulaSubjectSlug,
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
