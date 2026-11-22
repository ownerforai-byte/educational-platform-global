import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MATHEMATICS_XI_SOLUTIONS,
  MATHEMATICS_XI_TOTALS,
  MATHEMATICS_XI_UNITS,
  getMathXiUnit,
  mathXiSolutionPath,
  mathXiSolutionUrl,
} from "@/lib/mathematics-xi-solutions";
import { SYLLABUS } from "@/lib/core/syllabus";

const ROOT = process.cwd();

function read(unit: (typeof MATHEMATICS_XI_UNITS)[number]): string {
  const path = join(ROOT, mathXiSolutionPath(unit));
  expect(existsSync(path), `missing published document: ${path}`).toBe(true);
  return readFileSync(path, "utf8");
}

const mathematicsXi = SYLLABUS.find((c) => c.slug === "class-11-notes")?.subjects.find(
  (s) => s.slug === "mathematics",
);

describe("Mathematics XI exercise solutions registry", () => {
  it("covers every unit of the official Mathematics XI syllabus, in order", () => {
    expect(mathematicsXi, "class-11 mathematics syllabus missing").toBeDefined();
    const syllabusIds = mathematicsXi!.units.map((u) => u.id);
    expect(MATHEMATICS_XI_UNITS.map((u) => u.unitId)).toEqual(syllabusIds);
    expect(MATHEMATICS_XI_UNITS.map((u) => u.unitNo)).toEqual(
      syllabusIds.map((_, i) => i + 1),
    );
    expect(MATHEMATICS_XI_UNITS.map((u) => u.hours)).toEqual(
      mathematicsXi!.units.map((u) => u.hours ?? 0),
    );
  });

  it("every unit has a published document with the expected answer blocks", () => {
    for (const unit of MATHEMATICS_XI_UNITS) {
      const html = read(unit);
      const exercises = (html.match(/<b>Q\d+\./g) ?? []).length;
      const conceptual = (html.match(/<b>C\d+\./g) ?? []).length;
      const longAnswers = (html.match(/<b>L\d+\./g) ?? []).length;

      expect(exercises, `${unit.file} exercise count`).toBe(unit.exerciseCount);
      expect(conceptual, `${unit.file} conceptual count`).toBe(unit.conceptualCount);
      expect(longAnswers, `${unit.file} long-answer count`).toBe(unit.longAnswerCount);
    }
  });

  it("matches the advertised total item count", () => {
    const total =
      MATHEMATICS_XI_TOTALS.exercises +
      MATHEMATICS_XI_TOTALS.conceptual +
      MATHEMATICS_XI_TOTALS.longAnswers;
    expect(total).toBe(MATHEMATICS_XI_SOLUTIONS.totalItems);
  });

  it("links to the static document under public/resources", () => {
    for (const unit of MATHEMATICS_XI_UNITS) {
      expect(mathXiSolutionUrl(unit)).toBe(`/resources/mathematics-xi/${unit.file}`);
      expect(mathXiSolutionPath(unit)).toContain("public/resources/mathematics-xi/");
    }
  });

  it("resolves a unit by id and rejects an unknown one", () => {
    expect(getMathXiUnit("calculus")?.unitName).toBe("Calculus");
    expect(getMathXiUnit("not-a-unit")).toBeUndefined();
  });

  it("declares the shared stylesheet the documents import", () => {
    const css = join(ROOT, "public/resources/mathematics-xi/math-xi-solutions.css");
    expect(existsSync(css)).toBe(true);
    for (const unit of MATHEMATICS_XI_UNITS) {
      expect(read(unit)).toContain('href="math-xi-solutions.css"');
    }
  });
});
