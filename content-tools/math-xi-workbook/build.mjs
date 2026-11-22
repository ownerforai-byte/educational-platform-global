#!/usr/bin/env node
/**
 * Mathematics XI — A4 workbook builder.
 *
 * Source of truth: `content-tools/math-xi-workbook/data/unit-0N.mjs`.
 * Output:
 *   frontend/public/resources/mathematics-xi/chapters/<slug>.html
 *   frontend/public/resources/mathematics-xi/chapters/index.html
 *   frontend/lib/streams/mathematics-xi-chapters.ts   (generated registry)
 *
 * Layout contract: 3 columns × 4 rows = 12 solved questions per A4 sheet.
 * A chapter with more than 12 items produces multiple sheets.
 *
 * Usage: node content-tools/math-xi-workbook/build.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "../..");
const DATA_DIR = path.join(ROOT, "content-tools/math-xi-workbook/data");
const OUT_DIR = path.join(ROOT, "frontend/public/resources/mathematics-xi/chapters");
const REGISTRY = path.join(ROOT, "frontend/lib/streams/mathematics-xi-chapters.ts");

const PER_SHEET = 12; // 3 columns × 4 rows
const COLS = 3;
const ROWS = 4;
const STREAM = "NEB Grade 11 · Mathematics (Mat. 007)";
const BOOK = "Mathematics XI — Topic Workbook";

const errors = [];
const fail = (msg) => errors.push(msg);

const esc = (value) =>
  String(value)
    .replace(/&(?!#?\w+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/* ------------------------------------------------------------------ */
/* load + validate data                                               */
/* ------------------------------------------------------------------ */

const files = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".mjs"))
  .sort();

if (files.length === 0) fail("no data files found in content-tools/math-xi-workbook/data");

const chapters = [];
for (const file of files) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.CHAPTERS ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported CHAPTERS array`);
    continue;
  }
  for (const chapter of list) chapters.push({ ...chapter, dataFile: file });
}

const indexByUnit = new Map();
for (const chapter of chapters) {
  const list = indexByUnit.get(chapter.unitNo) ?? [];
  list.push(chapter);
  indexByUnit.set(chapter.unitNo, list);
}

for (const [unitNo, list] of [...indexByUnit.entries()].sort((a, b) => a[0] - b[0])) {
  list.forEach((chapter, i) => {
    chapter.chapterNo = i + 1;
    chapter.code = `${unitNo}.${i + 1}`;
  });
}

const seenSlugs = new Set();
for (const chapter of chapters) {
  const where = `${chapter.dataFile} → ${chapter.slug ?? "(no slug)"}`;
  if (!chapter.slug) fail(`${where}: missing slug`);
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(chapter.slug)) fail(`${where}: slug must be kebab-case`);
  else if (seenSlugs.has(chapter.slug)) fail(`${where}: duplicate slug`);
  else seenSlugs.add(chapter.slug);

  if (!chapter.title) fail(`${where}: missing title`);
  if (!chapter.unitName) fail(`${where}: missing unitName`);
  if (!Number.isInteger(chapter.unitNo)) fail(`${where}: missing unitNo`);
  if (!Array.isArray(chapter.topics) || chapter.topics.length === 0)
    fail(`${where}: topics must be a non-empty array`);
  if (!Array.isArray(chapter.items) || chapter.items.length === 0) {
    fail(`${where}: items must be a non-empty array`);
    continue;
  }
  if (chapter.items.length % PER_SHEET !== 0)
    fail(
      `${where}: ${chapter.items.length} items — must be a multiple of ${PER_SHEET} to fill whole sheets`,
    );

  chapter.items.forEach((item, i) => {
    const at = `${where} Q${i + 1}`;
    if (!Array.isArray(item) || item.length < 3) {
      fail(`${at}: expected [question, working, answer, topicIndex?, marks?]`);
      return;
    }
    const [q, work, ans, topicIndex = 0, marks] = item;
    for (const [label, value] of [
      ["question", q],
      ["working", work],
      ["answer", ans],
    ]) {
      if (typeof value !== "string" || value.trim() === "")
        fail(`${at}: ${label} must be a non-empty string`);
    }
    if (topicIndex !== null && topicIndex !== undefined) {
      if (!Number.isInteger(topicIndex) || topicIndex < 0 || topicIndex >= chapter.topics.length)
        fail(`${at}: topicIndex ${topicIndex} out of range (${chapter.topics.length} topics)`);
    }
    if (marks !== undefined && ![1, 2, 3, 4, 5, 6, 7, 8].includes(marks))
      fail(`${at}: marks ${marks} is not a sensible NEB mark value`);
  });
}

if (errors.length) {
  console.error("✗ workbook build failed\n");
  for (const error of errors) console.error("  • " + error);
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* render                                                             */
/* ------------------------------------------------------------------ */

const cellHtml = (cell, chapter, no) => {
  const topicIndex = cell.length > 3 ? cell[3] : 0;
  const marks = cell.length > 4 ? cell[4] : null;
  const [q, work, ans] = cell;
  const topic = topicIndex === null ? "" : chapter.topics[topicIndex] ?? "";
  return `<div class="cell">
<p class="tag">${esc(topic)}</p>
<p class="q"><span class="n">${no}.</span>${esc(q)}${
    marks ? `&nbsp;<span class="mk">[${marks}]</span>` : ""
  }</p>
<p class="work">${esc(work)}</p>
<p class="ans">${esc(ans)}</p>
</div>`;
};

const sheetHtml = (chapter, sheetIndex, sheetCount) => {
  const start = sheetIndex * PER_SHEET;
  const slice = chapter.items.slice(start, start + PER_SHEET);
  const cells = slice.map((item, i) => cellHtml(item, chapter, `Q${start + i + 1}`));
  const continued = sheetIndex > 0 ? " · continued" : "";
  return `<section class="sheet" aria-label="${esc(chapter.title)} — sheet ${sheetIndex + 1}">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)}</span></div>
<h1>${esc(chapter.code)} · ${esc(chapter.title)}${continued}</h1>
<p class="topics"><b>Topics</b> ${chapter.topics.map(esc).join(" · ")}</p>
<p class="note">NEB answer style — given → statement → working → answer. ${PER_SHEET} questions per sheet, 3 per row.</p>
</header>
<div class="grid" data-cols="${COLS}" data-rows="${ROWS}">
${cells.join("\n")}
</div>
<footer class="foot">
<span>Unit ${chapter.unitNo} · ${esc(chapter.unitName)}</span>
<span class="mid">${esc(chapter.title)}</span>
<span>Sheet ${sheetIndex + 1} of ${sheetCount} · ${PER_SHEET} solved questions</span>
</footer>
</section>`;
};

const chapterHtml = (chapter) => {
  const sheetCount = Math.ceil(chapter.items.length / PER_SHEET);
  const sheets = Array.from({ length: sheetCount }, (_, i) => sheetHtml(chapter, i, sheetCount));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(chapter.code)} ${esc(chapter.title)} — Mathematics XI workbook</title>
<meta name="description" content="${esc(
    chapter.title,
  )} — ${chapter.items.length} solved NEB-style questions covering ${esc(
    chapter.topics.join(", "),
  )}.">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/workbook.css">
</head>
<body>
${sheets.join("\n")}
</body>
</html>
`;
};

const indexHtml = () => {
  const units = [...indexByUnit.entries()].sort((a, b) => a[0] - b[0]);
  const total = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
  const sheets = chapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.items.length / PER_SHEET),
    0,
  );
  const blocks = units
    .map(([unitNo, list]) => {
      const items = list
        .map(
          (chapter) =>
            `<li><a href="/resources/mathematics-xi/chapters/${chapter.slug}.html">${esc(
              chapter.code,
            )} ${esc(chapter.title)}</a> <span>· ${chapter.items.length} Q</span></li>`,
        )
        .join("\n");
      return `<h2>Unit ${unitNo} · ${esc(list[0].unitName)}</h2>
<ol>
${items}
</ol>`;
    })
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mathematics XI — Topic Workbook</title>
<link rel="stylesheet" href="/resources/mathematics-xi/a4/workbook.css">
</head>
<body>
<section class="sheet index">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)}</span></div>
<h1>Topic Workbook — contents</h1>
<p class="topics"><b>Coverage</b> ${chapters.length} chapters · ${total} solved questions · ${sheets} A4 sheets</p>
<p class="note">One document per chapter. Each sheet prints 12 solved questions in a 3 × 4 grid, in NEB answer style.</p>
</header>
${blocks}
<footer class="foot">
<span>Unit 1–${units.length} complete</span>
<span class="mid">${chapters.length} chapters</span>
<span>${total} questions · ${sheets} sheets</span>
</footer>
</section>
</body>
</html>
`;
};

/* ------------------------------------------------------------------ */
/* generated registry                                                 */
/* ------------------------------------------------------------------ */

const registrySource = () => {
  const entries = chapters
    .map(
      (chapter) => `  {
    slug: ${JSON.stringify(chapter.slug)},
    code: ${JSON.stringify(chapter.code)},
    unitId: ${JSON.stringify(chapter.unitId)},
    unitNo: ${chapter.unitNo},
    unitName: ${JSON.stringify(chapter.unitName)},
    title: ${JSON.stringify(chapter.title)},
    topics: ${JSON.stringify(chapter.topics)},
    questionCount: ${chapter.items.length},
    sheetCount: ${Math.ceil(chapter.items.length / PER_SHEET)},
  },`,
    )
    .join("\n");
  const total = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
  const sheets = chapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.items.length / PER_SHEET),
    0,
  );
  return `/**
 * Mathematics XI — chapter workbook registry.
 *
 * GENERATED FILE — do not edit by hand.
 * Rebuild with: node content-tools/math-xi-workbook/build.mjs
 *
 * One entry per chapter document under
 * \`frontend/public/resources/mathematics-xi/chapters/<slug>.html\`.
 * Every question count below is emitted from the source data, and
 * \`frontend/tests/lib/math-xi-workbook.test.ts\` re-checks each count against
 * the rendered HTML.
 */

export const MATH_XI_WORKBOOK_BASE = "/resources/mathematics-xi/chapters";
export const MATH_XI_QUESTIONS_PER_SHEET = ${PER_SHEET};

export interface MathXiChapter {
  /** URL and file slug. */
  slug: string;
  /** Curriculum code, e.g. \`3.2\`. */
  code: string;
  /** Syllabus unit id — matches \`frontend/lib/core/syllabus.ts\`. */
  unitId: string;
  unitNo: number;
  unitName: string;
  title: string;
  /** Sub-topics covered by the chapter sheet, in teaching order. */
  topics: string[];
  /** Solved questions with NEB-style answers. */
  questionCount: number;
  /** A4 sheets (12 questions each) produced for the chapter. */
  sheetCount: number;
}

export const MATH_XI_CHAPTERS: MathXiChapter[] = [
${entries}
];

export const MATH_XI_WORKBOOK_TOTALS = {
  chapters: MATH_XI_CHAPTERS.length,
  units: new Set(MATH_XI_CHAPTERS.map((chapter) => chapter.unitId)).size,
  questions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.questionCount, 0),
  sheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.sheetCount, 0),
  perSheet: MATH_XI_QUESTIONS_PER_SHEET,
};

export function mathXiChapterUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return \`\${MATH_XI_WORKBOOK_BASE}/\${chapter.slug}.html\`;
}

export function mathXiChapterPath(chapter: Pick<MathXiChapter, "slug">): string {
  return \`public/resources/mathematics-xi/chapters/\${chapter.slug}.html\`;
}

export function getMathXiChapter(slug: string): MathXiChapter | undefined {
  return MATH_XI_CHAPTERS.find((chapter) => chapter.slug === slug);
}

export function mathXiChaptersByUnit(unitNo: number): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.unitNo === unitNo);
}

`;
};

/* ------------------------------------------------------------------ */
/* write                                                              */
/* ------------------------------------------------------------------ */

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const chapter of chapters) {
  fs.writeFileSync(path.join(OUT_DIR, `${chapter.slug}.html`), chapterHtml(chapter), "utf8");
}
fs.writeFileSync(path.join(OUT_DIR, "index.html"), indexHtml(), "utf8");
fs.writeFileSync(REGISTRY, registrySource(), "utf8");

const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
const totalSheets = chapters.reduce(
  (sum, chapter) => sum + Math.ceil(chapter.items.length / PER_SHEET),
  0,
);

console.log(
  `✓ ${chapters.length} chapter sheets · ${totalQuestions} solved questions · ${totalSheets} A4 pages`,
);
for (const [unitNo, list] of [...indexByUnit.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(
    `  unit ${unitNo}: ${list.length} chapters, ${list.reduce(
      (sum, chapter) => sum + chapter.items.length,
      0,
    )} questions`,
  );
}
