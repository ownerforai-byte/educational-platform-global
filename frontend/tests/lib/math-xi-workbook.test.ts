import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MATH_XI_CHAPTERS,
  MATH_XI_QUESTIONS_PER_SHEET,
  MATH_XI_WORKBOOK_TOTALS,
  mathXiChapterPath,
  mathXiChapterUrl,
  mathXiChaptersByUnit,
} from "@/lib/streams/mathematics-xi-chapters";
import { MATHEMATICS_XI_UNITS } from "@/lib/streams/mathematics-xi-solutions";

const ROOT = process.cwd();
const read = (path: string) => readFileSync(resolve(ROOT, path), "utf8");

const DETAILS: { slug: string; code: string }[] = [];
for (const unit of MATHEMATICS_XI_UNITS) {
  for (const chapter of mathXiChaptersByUnit(unit.unitNo)) {
    DETAILS.push({ slug: chapter.slug, code: `unit ${unit.unitNo}` });
  }
}

describe("Mathematics XI — A4 chapter workbook", () => {
  it("publishes exactly one sheet document per registered chapter", () => {
    expect(MATH_XI_CHAPTERS.length).toBeGreaterThanOrEqual(35);

    for (const chapter of MATH_XI_CHAPTERS) {
      const path = mathXiChapterPath(chapter);
      expect(existsSync(resolve(ROOT, path)), `missing ${path}`).toBe(true);
      expect(mathXiChapterUrl(chapter)).toBe(
        `/resources/mathematics-xi/chapters/${chapter.slug}.html`,
      );
    }

    expect(existsSync(resolve(ROOT, "public/resources/mathematics-xi/chapters/index.html"))).toBe(
      true,
    );
    expect(
      existsSync(resolve(ROOT, "public/resources/mathematics-xi/a4/workbook.css")),
    ).toBe(true);
  });

  it("keeps every chapter mapped to a real syllabus unit, in curriculum order", () => {
    const unitIds = MATHEMATICS_XI_UNITS.map((unit) => unit.unitId);
    expect(MATH_XI_WORKBOOK_TOTALS.units).toBe(unitIds.length);

    for (const chapter of MATH_XI_CHAPTERS) {
      expect(unitIds).toContain(chapter.unitId);
      const unit = MATHEMATICS_XI_UNITS.find((candidate) => candidate.unitId === chapter.unitId);
      expect(unit?.unitNo).toBe(chapter.unitNo);
      expect(chapter.topics.length).toBeGreaterThan(0);
    }

    for (const unit of MATHEMATICS_XI_UNITS) {
      expect(mathXiChaptersByUnit(unit.unitNo).length, `unit ${unit.unitNo} has no chapters`).toBeGreaterThan(0);
    }

    // codes look like "3.2" and restart at 1 for each unit
    for (const unit of MATHEMATICS_XI_UNITS) {
      const chapters = mathXiChaptersByUnit(unit.unitNo);
      chapters.forEach((chapter, index) => {
        expect(chapter.code).toBe(`${unit.unitNo}.${index + 1}`);
      });
    }
  });

  it("renders 12 solved questions per A4 sheet in a 3 × 4 grid", () => {
    expect(MATH_XI_QUESTIONS_PER_SHEET).toBe(12);

    let totalQuestions = 0;
    let totalSheets = 0;

    for (const chapter of MATH_XI_CHAPTERS) {
      const html = read(mathXiChapterPath(chapter));
      const sheets = html.match(/<section class="sheet"/g) ?? [];
      const cells = html.match(/<div class="cell">/g) ?? [];
      const grids = html.match(/<div class="grid" data-cols="3" data-rows="4">/g) ?? [];
      const answers = html.match(/<p class="ans">/g) ?? [];
      const workings = html.match(/<p class="work">/g) ?? [];

      expect(sheets.length, `${chapter.slug}: sheet count`).toBe(chapter.sheetCount);
      expect(grids.length, `${chapter.slug}: grid count`).toBe(chapter.sheetCount);
      expect(cells.length, `${chapter.slug}: question cells`).toBe(chapter.questionCount);
      expect(answers.length, `${chapter.slug}: answer lines`).toBe(chapter.questionCount);
      expect(workings.length, `${chapter.slug}: working blocks`).toBe(chapter.questionCount);
      expect(cells.length % MATH_XI_QUESTIONS_PER_SHEET).toBe(0);
      expect(cells.length / MATH_XI_QUESTIONS_PER_SHEET).toBe(chapter.sheetCount);
      expect(html).toContain("/resources/mathematics-xi/a4/workbook.css");

      totalQuestions += chapter.questionCount;
      totalSheets += chapter.sheetCount;
    }

    expect(totalQuestions).toBe(MATH_XI_WORKBOOK_TOTALS.questions);
    expect(totalSheets).toBe(MATH_XI_WORKBOOK_TOTALS.sheets);
  });

  it("numbers questions continuously and prints every topic on the masthead", () => {
    for (const chapter of MATH_XI_CHAPTERS) {
      const html = read(mathXiChapterPath(chapter));
      const numbers = [...html.matchAll(/<span class="n">Q(\d+)\.<\/span>/g)].map((match) =>
        Number(match[1]),
      );

      expect(numbers.length, `${chapter.slug}: numbered questions`).toBe(chapter.questionCount);
      numbers.forEach((value, index) => expect(value).toBe(index + 1));

      for (const topic of chapter.topics) {
        const escaped = topic.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        expect(html, `${chapter.slug} missing topic ${topic}`).toContain(escaped);
      }
    }
  });

  it("links every chapter from the generated contents sheet", () => {
    const index = read("public/resources/mathematics-xi/chapters/index.html");

    for (const chapter of MATH_XI_CHAPTERS) {
      expect(index).toContain(`/resources/mathematics-xi/chapters/${chapter.slug}.html`);
    }
    expect(index).toContain(`${MATH_XI_WORKBOOK_TOTALS.questions} solved questions`);
    expect(index).toContain(`${MATH_XI_WORKBOOK_TOTALS.sheets} A4 sheets`);
  });

  it("declares A4 print rules once, in the shared stylesheet", () => {
    const css = read("public/resources/mathematics-xi/a4/workbook.css");
    expect(css).toContain("@page");
    expect(css).toContain("size: A4 portrait");
    expect(css).toContain("grid-template-columns: repeat(3");
    expect(css).toContain("grid-template-rows: repeat(4");

    for (const chapter of MATH_XI_CHAPTERS) {
      const html = read(mathXiChapterPath(chapter));
      // layout lives in the shared sheet — no per-document page styling
      expect(html).not.toContain("<style");
    }
  });
});

describe("Mathematics XI — chapter registry hygiene", () => {
  it("has unique slugs that match their file names", () => {
    const slugs = MATH_XI_CHAPTERS.map((chapter) => chapter.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(DETAILS.length).toBe(slugs.length);
  });

  it("covers every unit of the syllabus, and every unit has its chapters", () => {
    const covered = new Set(MATH_XI_CHAPTERS.map((chapter) => chapter.unitNo));
    for (const unit of MATHEMATICS_XI_UNITS) expect(covered.has(unit.unitNo)).toBe(true);
  });
});
