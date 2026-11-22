import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PHYSICS_XI_CHAPTERS,
  PHYSICS_XI_QUESTIONS_PER_SHEET,
  PHYSICS_XI_WORKBOOK_BASE,
  PHYSICS_XI_WORKBOOK_TOTALS,
  physicsXiChapterPath,
  physicsXiChapterUrl,
  physicsXiChaptersByUnit,
} from "@/lib/streams/physics-xi-chapters";
import { PHYSICS_XI_SOLUTION_UNITS } from "@/lib/streams/physics-xi-solutions";
import { getSubjectSyllabus } from "@/lib/core/syllabus";

const ROOT = process.cwd();
const read = (path: string) => readFileSync(resolve(ROOT, path), "utf8");

const physicsSubject = getSubjectSyllabus("class-11-notes", "physics");
const physicsXiUnits = (physicsSubject?.units ?? []).map((unit) => ({
  id: unit.id,
  title: unit.title,
}));

describe("physics xi A4 workbook", () => {
  it("keeps chapter units in NEB syllabus order", () => {
    const unitIds = physicsXiChaptersByUnit().map((block) => block.chapters[0].unitId);
    const expected = physicsXiUnits
      .slice(0, unitIds.length)
      .map((unit) => unit.id);
    expect(unitIds).toEqual(expected);

    for (const chapter of PHYSICS_XI_CHAPTERS) {
      const unit = physicsXiUnits.find((candidate) => candidate.id === chapter.unitId);
      expect(unit, `${chapter.slug}: unit id`).toBeTruthy();
      expect(chapter.unitName, `${chapter.slug}: unit title`).toBe(unit!.title);
      const solution = PHYSICS_XI_SOLUTION_UNITS.find(
        (candidate) => candidate.unitId === chapter.unitId,
      );
      expect(solution, `${chapter.slug}: solutions entry`).toBeTruthy();
      expect(chapter.unitNo).toBe(solution!.unitNo);
    }
  });

  it("publishes 3 × 4 chapter sheets of 12 solved questions each", () => {
    let total = 0;
    for (const chapter of PHYSICS_XI_CHAPTERS) {
      expect(chapter.questionCount, `${chapter.slug}: whole sheets`).toBe(
        Math.ceil(chapter.questionCount / PHYSICS_XI_QUESTIONS_PER_SHEET) *
          PHYSICS_XI_QUESTIONS_PER_SHEET,
      );
      expect(chapter.sheetCount).toBe(chapter.questionCount / PHYSICS_XI_QUESTIONS_PER_SHEET);

      const html = read(physicsXiChapterPath(chapter));
      const blame = `${chapter.slug}: `;
      expect((html.match(/<section class="sheet"/g) ?? []).length, blame).toBe(
        chapter.sheetCount,
      );
      expect((html.match(/<div class="cell">/g) ?? []).length, blame).toBe(
        chapter.questionCount,
      );
      expect((html.match(/<p class="work">/g) ?? []).length, blame).toBe(chapter.questionCount);
      expect((html.match(/<p class="ans">/g) ?? []).length, blame).toBe(chapter.questionCount);
      expect(html, blame).toContain('data-cols="3"');
      expect(html, blame).toContain('data-rows="4"');
      expect(html, blame).toContain(`${PHYSICS_XI_WORKBOOK_BASE}/a4/workbook.css`);
      expect(html, blame).not.toContain("<style");
      expect(html, blame).not.toContain("<script");

      for (const topic of chapter.topics) {
        expect(html, `${chapter.slug}: topic ${topic}`).toContain(topic);
      }

      total += chapter.questionCount;
    }
    expect(total).toBe(PHYSICS_XI_WORKBOOK_TOTALS.questions);
  });

  it("lists every chapter on the workbook contents page", () => {
    const index = read("public/resources/physics-xi/chapters/index.html");
    for (const chapter of PHYSICS_XI_CHAPTERS) {
      expect(existsSync(resolve(ROOT, physicsXiChapterPath(chapter)))).toBe(true);
      expect(physicsXiChapterUrl(chapter)).toBe(
        `/resources/physics-xi/chapters/${chapter.slug}.html`,
      );
      expect(index).toContain(physicsXiChapterUrl(chapter));
      expect(index).toContain(`${chapter.questionCount} Q`);
    }
    expect(PHYSICS_XI_WORKBOOK_TOTALS.units).toBe(physicsXiChaptersByUnit().length);
  });
});
