/**
 * Physics XI — A4 workbook builder.
 *
 * Renders the chapter-sheet layer of the Class XI Physics workbook: 12 solved
 * NEB-style questions per A4 sheet in a 3 × 4 grid, with the given → working →
 * answer shape. Content lives in `data/` next to this file:
 *
 *   data/chapters.mjs   unit + chapter registry (slug, code, title, topics)
 *   data/unit-NN.mjs    export const CHAPTERS = [{ slug, items }]
 *
 * Output goes to `frontend/public/resources/physics-xi/chapters/` and the typed
 * registry to `frontend/lib/streams/physics-xi-chapters.ts`. Run with
 * `npm run build:physics-xi-workbook`.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "content-tools/physics-xi-workbook/data");
const OUT_DIR = path.join(ROOT, "frontend/public/resources/physics-xi/chapters");
const REGISTRY = path.join(ROOT, "frontend/lib/streams/physics-xi-chapters.ts");

const STREAM = "NEB · Class XI";
const BOOK = "Physics (Phy. 101)";
const BASE = "/resources/physics-xi";

const QUESTIONS_PER_SHEET = 12;
const COLS = 3;
const ROWS = 4;
const SHEET_COUNTS = [12, 24, 36, 48];

const failures = [];
const fail = (message) => failures.push(message);
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ── load chapters ─────────────────────────────────────────────────────── */

const { UNITS } = await import(pathToFileURL(path.join(DATA_DIR, "chapters.mjs")).href);

const chapters = [];
const dataFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => /^unit-\d+\.mjs$/.test(name))
  .sort();

for (const file of dataFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.CHAPTERS;
  if (!Array.isArray(list)) {
    fail(`${file}: expected an exported CHAPTERS array`);
    continue;
  }
  const unitNo = Number(file.match(/unit-(\d+)/)[1]);
  const unit = UNITS.find((candidate) => candidate.unitNo === unitNo);
  if (!unit) {
    fail(`${file}: no unit ${unitNo} in chapters.mjs`);
    continue;
  }
  for (const entry of list) {
    const meta = unit.chapters.find((candidate) => candidate.slug === entry.slug);
    if (!meta) {
      fail(`${file}: chapter "${entry.slug}" is not declared in chapters.mjs`);
      continue;
    }
    if (!Array.isArray(entry.items) || entry.items.length === 0) {
      fail(`${file} → ${entry.slug}: items must be a non-empty array`);
      continue;
    }
    if (!SHEET_COUNTS.includes(entry.items.length)) {
      fail(
        `${file} → ${entry.slug}: ${entry.items.length} items — every chapter must hold a whole number of ${QUESTIONS_PER_SHEET}-question sheets (${SHEET_COUNTS.join(", ")})`,
      );
    }
    chapters.push({
      unitNo,
      unitId: unit.unitId,
      unitName: unit.unitName,
      slug: entry.slug,
      code: meta.code,
      title: meta.title,
      topics: meta.topics,
      items: entry.items,
    });
  }
}

const declared = UNITS.flatMap((unit) => unit.chapters.map((chapter) => chapter.slug));
for (const slug of declared) {
  if (!chapters.some((chapter) => chapter.slug === slug)) {
    fail(`chapters.mjs declares "${slug}" but no data file supplies it`);
  }
}
chapters.sort((a, b) => a.unitNo - b.unitNo || a.code.localeCompare(b.code));

/* ── validate items ────────────────────────────────────────────────────── */

for (const chapter of chapters) {
  const seen = new Set();
  chapter.items.forEach((item, i) => {
    const at = `${chapter.slug} Q${i + 1}`;
    if (!Array.isArray(item) || item.length < 3) {
      fail(`${at}: expected [question, working, answer, marks?, topicIndex?]`);
      return;
    }
    const [q, work, ans, marks, topicIndex = 0] = item;
    if (typeof q !== "string" || q.trim() === "") fail(`${at}: empty question`);
    if (typeof work !== "string" || work.trim() === "") fail(`${at}: empty working`);
    if (typeof ans !== "string" || ans.trim() === "") fail(`${at}: empty answer`);
    if (marks !== undefined && (typeof marks !== "string" || marks.trim() === ""))
      fail(`${at}: marks must be a non-empty string when present`);
    if (Number.isInteger(topicIndex) && (topicIndex < 0 || topicIndex >= chapter.topics.length))
      fail(`${at}: topicIndex ${topicIndex} out of range (${chapter.topics.length} topics)`);
    if (seen.has(q)) fail(`${at}: duplicate question`);
    seen.add(q);
  });

  for (let i = 0; i < chapter.topics.length; i += 1) {
    if (!chapter.items.some((item) => (item[4] ?? 0) === i)) {
      fail(`${chapter.slug}: no question tagged with topic ${i} (“${chapter.topics[i]}”)`);
    }
  }
}

if (failures.length > 0) {
  console.error(`✗ ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  · ${failure}`);
  process.exit(1);
}

/* ── render ────────────────────────────────────────────────────────────── */

const cellHtml = (cell, chapter, no) => {
  const [q, work, ans, marks, topicIndex = 0] = cell;
  const topic = chapter.topics[topicIndex] ?? "";
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
  const start = sheetIndex * QUESTIONS_PER_SHEET;
  const cells = chapter.items
    .slice(start, start + QUESTIONS_PER_SHEET)
    .map((item, i) => cellHtml(item, chapter, `Q${start + i + 1}`))
    .join("\n");
  return `<section class="sheet" aria-label="${esc(chapter.title)} — sheet ${sheetIndex + 1}">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)}</span></div>
<h1>${esc(chapter.code)} · ${esc(chapter.title)}${
    sheetIndex > 0 ? " · continued" : ""
  }</h1>
<p class="topics"><b>Topics</b> ${chapter.topics.map(esc).join(" · ")}</p>
<p class="note">NEB answer style — formula → substitution → answer with the unit. ${QUESTIONS_PER_SHEET} questions per sheet, 3 per row.</p>
</header>
<div class="grid" data-cols="${COLS}" data-rows="${ROWS}">
${cells}
</div>
<footer class="foot">
<span>Unit ${chapter.unitNo} · ${esc(chapter.unitName)}</span>
<span class="mid">${esc(chapter.title)}</span>
<span>Sheet ${sheetIndex + 1} of ${sheetCount} · ${QUESTIONS_PER_SHEET} solved questions</span>
</footer>
</section>`;
};

const chapterHtml = (chapter) => {
  const sheetCount = Math.ceil(chapter.items.length / QUESTIONS_PER_SHEET);
  const sheets = Array.from({ length: sheetCount }, (_, i) => sheetHtml(chapter, i, sheetCount));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(chapter.code)} ${esc(chapter.title)} — Physics XI workbook</title>
<meta name="description" content="${esc(chapter.title)} — ${
    chapter.items.length
  } solved NEB-style questions covering ${esc(chapter.topics.join(", "))}.">
<link rel="stylesheet" href="${BASE}/a4/workbook.css">
</head>
<body>
${sheets.join("\n")}
</body>
</html>
`;
};

const indexHtml = () => {
  const byUnit = new Map();
  for (const chapter of chapters) {
    if (!byUnit.has(chapter.unitNo)) byUnit.set(chapter.unitNo, []);
    byUnit.get(chapter.unitNo).push(chapter);
  }
  const total = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
  const sheets = chapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.items.length / QUESTIONS_PER_SHEET),
    0,
  );
  const blocks = [...byUnit.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([unitNo, list]) => {
      const items = list
        .map(
          (chapter) =>
            `<li><a href="${BASE}/chapters/${chapter.slug}.html">${esc(chapter.code)} ${esc(
              chapter.title,
            )}</a> <span>· ${chapter.items.length} Q</span></li>`,
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
<title>Physics XI — A4 workbook</title>
<link rel="stylesheet" href="${BASE}/a4/workbook.css">
</head>
<body>
<section class="sheet index">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)}</span></div>
<h1>A4 workbook — chapter sheets</h1>
<p class="topics"><b>Coverage</b> ${chapters.length} chapters · ${total} solved questions · ${sheets} sheets</p>
<p class="note">Print A4 portrait: ${QUESTIONS_PER_SHEET} questions per sheet in a ${COLS} × ${ROWS} grid, each with its working and answer line.</p>
</header>
${blocks}
<footer class="foot">
<span>Units ${[...byUnit.keys()].join(", ")}</span>
<span class="mid">${chapters.length} chapters</span>
<span>${total} solved questions</span>
</footer>
</section>
</body>
</html>
`;
};

/* ── write ─────────────────────────────────────────────────────────────── */

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const chapter of chapters) {
  fs.writeFileSync(path.join(OUT_DIR, `${chapter.slug}.html`), chapterHtml(chapter), "utf8");
}
fs.writeFileSync(path.join(OUT_DIR, "index.html"), indexHtml(), "utf8");

const totals = {
  chapters: chapters.length,
  units: new Set(chapters.map((chapter) => chapter.unitNo)).size,
  questions: chapters.reduce((sum, chapter) => sum + chapter.items.length, 0),
  sheets: chapters.reduce((sum, chapter) => sum + Math.ceil(chapter.items.length / QUESTIONS_PER_SHEET), 0),
};

const registry = `/**
 * Physics XI — A4 workbook registry.
 *
 * GENERATED by \`content-tools/physics-xi-workbook/build.mjs\`. Do not edit by
 * hand: change the data in \`content-tools/physics-xi-workbook/data/\` and rerun
 * \`npm run build:physics-xi-workbook\`.
 */

export const PHYSICS_XI_WORKBOOK_BASE = "${BASE}";
export const PHYSICS_XI_QUESTIONS_PER_SHEET = ${QUESTIONS_PER_SHEET};

export interface PhysicsXiChapter {
  slug: string;
  code: string;
  title: string;
  unitNo: number;
  unitId: string;
  unitName: string;
  topics: string[];
  questionCount: number;
  sheetCount: number;
}

export const PHYSICS_XI_CHAPTERS: PhysicsXiChapter[] = ${JSON.stringify(
  chapters.map((chapter) => ({
    slug: chapter.slug,
    code: chapter.code,
    title: chapter.title,
    unitNo: chapter.unitNo,
    unitId: chapter.unitId,
    unitName: chapter.unitName,
    topics: chapter.topics,
    questionCount: chapter.items.length,
    sheetCount: Math.ceil(chapter.items.length / QUESTIONS_PER_SHEET),
  })),
  null,
  2,
)};

export const PHYSICS_XI_WORKBOOK_TOTALS = ${JSON.stringify(
  { ...totals, perSheet: QUESTIONS_PER_SHEET },
  null,
  2,
)} as const;

export function physicsXiChapterUrl(chapter: Pick<PhysicsXiChapter, "slug">): string {
  return \`\${PHYSICS_XI_WORKBOOK_BASE}/chapters/\${chapter.slug}.html\`;
}

export function physicsXiChapterPath(chapter: Pick<PhysicsXiChapter, "slug">): string {
  return \`public/resources/physics-xi/chapters/\${chapter.slug}.html\`;
}

export function physicsXiChaptersByUnit(): { unitNo: number; unitName: string; chapters: PhysicsXiChapter[] }[] {
  const byUnit = new Map<number, PhysicsXiChapter[]>();
  for (const chapter of PHYSICS_XI_CHAPTERS) {
    if (!byUnit.has(chapter.unitNo)) byUnit.set(chapter.unitNo, []);
    byUnit.get(chapter.unitNo)!.push(chapter);
  }
  return [...byUnit.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([unitNo, list]) => ({ unitNo, unitName: list[0].unitName, chapters: list }));
}
`;

fs.mkdirSync(path.dirname(REGISTRY), { recursive: true });
fs.writeFileSync(REGISTRY, registry, "utf8");

console.log(
  `✓ ${totals.chapters} chapter sheets · ${totals.questions} solved questions · ${totals.sheets} A4 pages`,
);
for (const block of [...new Set(chapters.map((chapter) => chapter.unitNo))]) {
  const list = chapters.filter((chapter) => chapter.unitNo === block);
  console.log(
    `  unit ${block}: ${list.length} chapters, ${list.reduce(
      (sum, chapter) => sum + chapter.items.length,
      0,
    )} questions`,
  );
}
