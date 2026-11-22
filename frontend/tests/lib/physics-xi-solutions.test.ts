import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PHYSICS_XI_SOLUTION_TOTALS,
  PHYSICS_XI_SOLUTION_UNITS,
  getPhysicsXiSolutionUnit,
  physicsXiSolutionDocKey,
  physicsXiSolutionPath,
  physicsXiSolutionUrl,
} from "@/lib/physics-xi-solutions";
import { SYLLABUS } from "@/lib/core/syllabus";
import { CLASS_11, getChapterDocs } from "@/lib/chapter-resources";

const ROOT = process.cwd();

function read(unit: (typeof PHYSICS_XI_SOLUTION_UNITS)[number]): string {
  const path = join(ROOT, physicsXiSolutionPath(unit));
  expect(existsSync(path), `missing published document: ${path}`).toBe(true);
  return readFileSync(path, "utf8");
}

const physicsXi = SYLLABUS.find((c) => c.slug === "class-11-notes")?.subjects.find(
  (s) => s.slug === "physics",
);

describe("Physics XI exercise solutions registry", () => {
  it("covers every unit of the official Physics XI syllabus, in order", () => {
    expect(physicsXi, "class-11 physics syllabus missing").toBeDefined();
    const syllabusIds = physicsXi!.units.map((u) => u.id);
    expect(PHYSICS_XI_SOLUTION_UNITS.map((u) => u.unitId)).toEqual(syllabusIds);
    expect(PHYSICS_XI_SOLUTION_UNITS.map((u) => u.unitNo)).toEqual(
      syllabusIds.map((_, i) => i + 1),
    );
    expect(PHYSICS_XI_SOLUTION_UNITS.map((u) => u.hours)).toEqual(
      physicsXi!.units.map((u) => u.hours ?? 0),
    );
  });

  it("names each document after its syllabus unit id", () => {
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      expect(unit.file).toBe(
        `unit-${String(unit.unitNo).padStart(2, "0")}-${unit.unitId}-solutions.html`,
      );
    }
  });

  it("every unit has a published document with the expected answer blocks", () => {
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      const html = read(unit);
      const exercises = (html.match(/<b>Q\d+\./g) ?? []).length;
      const conceptual = (html.match(/<b>C\d+\./g) ?? []).length;
      const longAnswers = (html.match(/<b>L\d+\./g) ?? []).length;

      expect(exercises, `${unit.file} exercise count`).toBe(unit.exerciseCount);
      expect(conceptual, `${unit.file} conceptual count`).toBe(unit.conceptualCount);
      expect(longAnswers, `${unit.file} long-answer count`).toBe(unit.longAnswerCount);
    }
  });

  it("reports totals that agree with the per-unit numbers", () => {
    expect(PHYSICS_XI_SOLUTION_TOTALS.units).toBe(PHYSICS_XI_SOLUTION_UNITS.length);
    expect(PHYSICS_XI_SOLUTION_TOTALS.units).toBe(26);
    expect(PHYSICS_XI_SOLUTION_TOTALS.exercises).toBe(
      PHYSICS_XI_SOLUTION_UNITS.reduce((sum, u) => sum + u.exerciseCount, 0),
    );
    expect(PHYSICS_XI_SOLUTION_TOTALS.conceptual).toBe(
      PHYSICS_XI_SOLUTION_UNITS.reduce((sum, u) => sum + u.conceptualCount, 0),
    );
    expect(PHYSICS_XI_SOLUTION_TOTALS.longAnswers).toBe(
      PHYSICS_XI_SOLUTION_UNITS.reduce((sum, u) => sum + u.longAnswerCount, 0),
    );
  });

  it("links to the static document under public/resources", () => {
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      expect(physicsXiSolutionUrl(unit)).toBe(`/resources/physics-xi/${unit.file}`);
      expect(physicsXiSolutionPath(unit)).toContain("public/resources/physics-xi/");
    }
  });

  it("resolves a unit by id and rejects an unknown one", () => {
    expect(getPhysicsXiSolutionUnit("gravitation")?.unitName).toBe("Gravitation");
    expect(getPhysicsXiSolutionUnit("not-a-unit")).toBeUndefined();
  });

  it("declares the shared stylesheet the documents import", () => {
    const css = join(ROOT, "public/resources/physics-xi/physics-xi-solutions.css");
    expect(existsSync(css)).toBe(true);
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      expect(read(unit)).toContain('href="physics-xi-solutions.css"');
    }
  });

  it("files each document in its own unit's stream block, with no leakage", () => {
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      const ids = getChapterDocs(CLASS_11, "physics", unit.unitId).map((doc) => doc.id);
      expect(ids, `${unit.unitId} stream block`).toContain(
        physicsXiSolutionDocKey(unit),
      );
    }

    // The Gravitation document must never appear in the Vectors block.
    const vectors = getChapterDocs(CLASS_11, "physics", "vectors").map((doc) => doc.id);
    expect(vectors).not.toContain("physics-xi-u7-gravitation-solutions");
  });

  it("leaves no escaped-newline artefacts in the published documents", () => {
    for (const unit of PHYSICS_XI_SOLUTION_UNITS) {
      const html = read(unit);
      expect(html.includes("\\n"), `${unit.file} contains a literal backslash-n`).toBe(false);
      expect(html.includes('\\"'), `${unit.file} contains an escaped quote`).toBe(false);
    }
  });
});
