import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  MATH_XI_CHAPTERS,
  MATH_XI_CONCEPT_PER_SHEET,
  MATH_XI_HARD_PER_SHEET,
  MATH_XI_LONG_PER_SHEET,
  MATH_XI_PAPERS,
  MATH_XI_PAPER_GROUPS,
  MATH_XI_PAPER_MARKS,
  MATH_XI_QUESTIONS_PER_SHEET,
  MATH_XI_REVISION_MINUTES,
  MATH_XI_REVISION_PAPERS,
  MATH_XI_WORKBOOK_TOTALS,
  mathXiChapterPath,
  mathXiChapterUrl,
  mathXiChaptersByUnit,
  mathXiConceptChapters,
  mathXiConceptPath,
  mathXiConceptUrl,
  mathXiHardChapters,
  mathXiHardPath,
  mathXiHardUrl,
  mathXiLongChapters,
  mathXiLongPath,
  mathXiLongUrl,
  mathXiPaperPath,
  mathXiRevisionPath,
  mathXiRevisionUrl,
  mathXiPaperUrl,
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

  it("gives every chapter a second sheet of mixed question types", () => {
    const known = [
      "MCQ",
      "True/False",
      "Fill in",
      "Spot the error",
      "Assertion–reason",
      "Explain",
      "Match",
      "Word problem",
      "Case study",
    ];

    for (const chapter of MATH_XI_CHAPTERS) {
      const html = read(mathXiChapterPath(chapter));
      const kinds = [...html.matchAll(/<span class="kind">(.*?)<\/span>/g)].map((m) => m[1]);

      expect(chapter.sheetCount, `${chapter.slug}: sheets`).toBe(2);
      expect(kinds.length, `${chapter.slug}: typed questions`).toBeGreaterThanOrEqual(12);
      for (const kind of kinds) {
        expect(known, `${chapter.slug}: unknown type ${kind}`).toContain(kind);
      }
      expect(new Set(kinds).size, `${chapter.slug}: type variety`).toBeGreaterThanOrEqual(6);
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

describe("Mathematics XI — hard sets with hint ladders", () => {
  it("prints 6 problems per A4 sheet, each with three escalating hints", () => {
    expect(MATH_XI_HARD_PER_SHEET).toBe(6);

    let problems = 0;
    let sheets = 0;

    for (const chapter of mathXiHardChapters()) {
      const html = read(mathXiHardPath(chapter));
      const sectionCount = (html.match(/<section class="sheet"/g) ?? []).length;
      const cells = html.match(/<div class="cell">/g) ?? [];
      const answerLines = html.match(/<p class="ans">/g) ?? [];
      const workLines = html.match(/<p class="work">/g) ?? [];
      const hintItems = html.match(/<li><b>H\d+\.<\/b>/g) ?? [];

      expect(sectionCount, `${chapter.slug}: hard sheets`).toBe(chapter.hardSheetCount);
      expect(cells.length, `${chapter.slug}: hard problems`).toBe(chapter.hardCount);
      expect(answerLines.length).toBe(chapter.hardCount);
      expect(workLines.length).toBe(chapter.hardCount);
      expect(hintItems.length, `${chapter.slug}: one hint per step`).toBe(chapter.hardCount * 3);
      expect(cells.length % MATH_XI_HARD_PER_SHEET).toBe(0);
      expect(html).toContain("/resources/mathematics-xi/a4/hard.css");
      expect(html).not.toContain("<style");

      problems += chapter.hardCount;
      sheets += chapter.hardSheetCount;
    }

    expect(problems).toBe(MATH_XI_WORKBOOK_TOTALS.hardQuestions);
    expect(sheets).toBe(MATH_XI_WORKBOOK_TOTALS.hardSheets);
    expect(problems).toBeGreaterThan(0);
  });

  it("covers every unit and links back from each chapter sheet", () => {
    const units = new Set(mathXiHardChapters().map((chapter) => chapter.unitNo));
    expect([...units].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(mathXiHardChapters().length).toBe(MATH_XI_CHAPTERS.length);

    for (const chapter of mathXiHardChapters()) {
      expect(existsSync(resolve(ROOT, mathXiHardPath(chapter)))).toBe(true);
      expect(mathXiHardUrl(chapter)).toBe(`/resources/mathematics-xi/chapters/hard/${chapter.slug}.html`);
      expect(read(mathXiChapterPath(chapter))).toContain(mathXiHardUrl(chapter));
    }
  });

  it("lists every hard set on the generated hard contents sheet", () => {
    const index = read("public/resources/mathematics-xi/chapters/hard/index.html");
    for (const chapter of mathXiHardChapters()) {
      expect(index).toContain(`/resources/mathematics-xi/chapters/hard/${chapter.slug}.html`);
      expect(index).toContain(`${chapter.hardCount} hard Q`);
    }
    expect(index).toContain("3 hints each");
  });

  it("gives every chapter one full-length answer on its own A4 page", () => {
    let answers = 0;
    for (const chapter of MATH_XI_CHAPTERS) {
      expect(chapter.longCount, `${chapter.slug}: long answers`).toBe(1);
      expect(chapter.longSheetCount).toBe(Math.ceil(chapter.longCount / MATH_XI_LONG_PER_SHEET));

      const html = read(mathXiLongPath(chapter));
      const sheets = html.match(/<section class="sheet"/g) ?? [];
      const questions = html.match(/<p class="q">/g) ?? [];
      const hints = html.match(/<li><b>H\d+\.<\/b>/g) ?? [];

      expect(sheets.length, `${chapter.slug}: one page per answer`).toBe(chapter.longSheetCount);
      expect(questions.length).toBe(chapter.longCount);
      expect(hints.length, `${chapter.slug}: three hints`).toBe(chapter.longCount * 3);
      expect(html).toContain("Given:");
      expect(html).toContain("Required:");
      expect(html).toContain("<p class=\"ans\">");
      expect(html).toContain("Marking split");
      expect(html).toContain("Common pitfall");
      expect(html).toContain("/resources/mathematics-xi/a4/long.css");
      expect(html).not.toContain("<style");

      answers += chapter.longCount;
    }
    expect(answers).toBe(MATH_XI_WORKBOOK_TOTALS.longQuestions);
    expect(mathXiLongChapters().length).toBe(MATH_XI_CHAPTERS.length);
  });

  it("gives every unit a timed revision paper with its answer key on page 2", () => {
    expect(MATH_XI_REVISION_PAPERS.length).toBe(MATHEMATICS_XI_UNITS.length);
    let questions = 0;
    for (const paper of MATH_XI_REVISION_PAPERS) {
      expect(paper.questionCount, `unit ${paper.unitNo}: questions`).toBe(24);
      expect(paper.marks, `unit ${paper.unitNo}: marks`).toBe(50);
      expect(paper.minutes).toBe(MATH_XI_REVISION_MINUTES);

      const html = read(mathXiRevisionPath(paper.unitNo));
      const blame = `unit ${paper.unitNo}: `;
      expect((html.match(/<section class="sheet"/g) ?? []).length, blame).toBe(2);
      expect((html.match(/class="rq"/g) ?? []).length, blame).toBe(paper.questionCount * 2);
      expect((html.match(/<span class="no">\d+\.<\/span>/g) ?? []).length, blame).toBe(
        paper.questionCount * 2,
      );
      expect(html, blame).toContain("answer key");
      expect(html, blame).toContain("/resources/mathematics-xi/a4/revision.css");
      expect(html, blame).not.toContain("<style");

      questions += paper.questionCount;
    }
    expect(questions).toBe(MATH_XI_WORKBOOK_TOTALS.revisionQuestions);

    const index = read("public/resources/mathematics-xi/chapters/revision/index.html");
    for (const paper of MATH_XI_REVISION_PAPERS) {
      expect(mathXiRevisionUrl(paper.unitNo)).toBe(
        `/resources/mathematics-xi/chapters/revision/unit-${String(paper.unitNo).padStart(2, "0")}.html`,
      );
      expect(existsSync(resolve(ROOT, mathXiRevisionPath(paper.unitNo)))).toBe(true);
      expect(index).toContain(mathXiRevisionUrl(paper.unitNo));
    }
  });

  it("pairs every chapter with six two-mark conceptual answers on one A4 sheet", () => {
    let total = 0;
    for (const chapter of MATH_XI_CHAPTERS) {
      expect(chapter.conceptCount, `${chapter.slug}: concept Q&A`).toBe(6);
      expect(chapter.conceptSheetCount).toBe(
        Math.ceil(chapter.conceptCount / MATH_XI_CONCEPT_PER_SHEET),
      );

      const html = read(mathXiConceptPath(chapter));
      const blame = `${chapter.slug}: `;
      expect((html.match(/<section class="sheet"/g) ?? []).length, blame).toBe(
        chapter.conceptSheetCount,
      );
      expect((html.match(/<p class="q"><span class="n">C\d+\.<\/span>/g) ?? []).length, blame).toBe(
        chapter.conceptCount,
      );
      expect((html.match(/<p class="ansblock">/g) ?? []).length, blame).toBe(chapter.conceptCount);
      expect(html).toContain("2 marks");
      expect(html).toContain('data-cols="2"');
      expect(html).toContain('data-rows="3"');
      expect(html).toContain("/resources/mathematics-xi/a4/concept.css");
      expect(html).not.toContain("<style");
      expect(html).not.toContain("<script");

      total += chapter.conceptCount;
    }
    expect(total).toBe(MATH_XI_WORKBOOK_TOTALS.conceptQuestions);
    expect(mathXiConceptChapters().length).toBe(MATH_XI_CHAPTERS.length);
  });

  it("links the concept sheet from the chapter sheet and from its contents page", () => {
    const index = read("public/resources/mathematics-xi/chapters/concept/index.html");
    for (const chapter of mathXiConceptChapters()) {
      expect(existsSync(resolve(ROOT, mathXiConceptPath(chapter)))).toBe(true);
      expect(mathXiConceptUrl(chapter)).toBe(
        `/resources/mathematics-xi/chapters/concept/${chapter.slug}.html`,
      );
      expect(read(mathXiChapterPath(chapter))).toContain(mathXiConceptUrl(chapter));
      expect(index).toContain(mathXiConceptUrl(chapter));
    }
    expect(index).toContain("Q&amp;A");
  });

  it("links the long answer from its chapter sheet and from the contents pages", () => {
    const index = read("public/resources/mathematics-xi/chapters/long/index.html");
    for (const chapter of mathXiLongChapters()) {
      expect(existsSync(resolve(ROOT, mathXiLongPath(chapter)))).toBe(true);
      expect(mathXiLongUrl(chapter)).toBe(
        `/resources/mathematics-xi/chapters/long/${chapter.slug}.html`,
      );
      expect(read(mathXiChapterPath(chapter))).toContain(mathXiLongUrl(chapter));
      expect(index).toContain(mathXiLongUrl(chapter));
    }
    expect(index).toContain("1 long answer");
  });

  it("publishes two 75-mark NEB model paper sets per unit, each with a full answer key", () => {
    expect(MATH_XI_PAPERS.length).toBe(MATHEMATICS_XI_UNITS.length * 2);
    for (const unit of MATHEMATICS_XI_UNITS) {
      const sets = MATH_XI_PAPERS.filter((paper) => paper.unitNo === unit.unitNo).map(
        (paper) => paper.set,
      );
      expect(sets, `unit ${unit.unitNo}: sets`).toEqual(["A", "B"]);
    }
    expect(MATH_XI_PAPER_MARKS).toBe(75);
    expect(MATH_XI_PAPER_GROUPS.map((group) => [group.count, group.per])).toEqual([
      [11, 1],
      [8, 5],
      [3, 8],
    ]);

    const index = read("public/resources/mathematics-xi/chapters/papers/index.html");
    for (const paper of MATH_XI_PAPERS) {
      const html = read(mathXiPaperPath(paper.unitNo, paper.set));
      const mcq = html.match(/<ol class="mcq">([\s\S]*?)<\/ol>/)?.[1] ?? "";
      const written = html.match(/<ol class="written">([\s\S]*?)<\/ol>/)?.[1] ?? "";
      const long = html.match(/<ol class="written long">([\s\S]*?)<\/ol>/)?.[1] ?? "";
      const keyed = html.match(/<li><span class="num">\d+\.<\/span>/g) ?? [];

      expect((mcq.match(/<li>/g) ?? []).length, `unit ${paper.unitNo}: 11 mcq`).toBe(11);
      expect((mcq.match(/<i>\([a-d]\)<\/i>/g) ?? []).length).toBe(44);
      expect((written.match(/<li>/g) ?? []).length, `unit ${paper.unitNo}: 8 short`).toBe(8);
      expect((long.match(/<li>/g) ?? []).length, `unit ${paper.unitNo}: 3 long`).toBe(3);
      expect(keyed.length, `unit ${paper.unitNo}: keyed answers`).toBe(11);
      expect((html.match(/<span class="ans">/g) ?? []).length).toBe(22);
      expect(html).toContain("Full marks: 75");
      expect(html).toContain("/resources/mathematics-xi/a4/paper.css");
      expect(html).not.toContain("<style");
      expect(index).toContain(mathXiPaperUrl(paper.unitNo, paper.set));
      expect(html).toContain(`Set ${paper.set}`);
    }

    expect(MATH_XI_PAPERS.every((paper) => paper.marks === 75)).toBe(true);
    expect(MATH_XI_PAPERS.reduce((sum, paper) => sum + paper.questionCount, 0)).toBe(22 * 14);
    expect(mathXiPaperUrl(7, "B")).toBe(
      "/resources/mathematics-xi/chapters/papers/unit-07-set-b.html",
    );
    expect(mathXiPaperPath(7)).toBe(
      "public/resources/mathematics-xi/chapters/papers/unit-07.html",
    );
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
