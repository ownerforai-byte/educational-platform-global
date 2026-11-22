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
const HARD_OUT_DIR = path.join(OUT_DIR, "hard");
const LONG_OUT_DIR = path.join(OUT_DIR, "long");
const CONCEPT_OUT_DIR = path.join(OUT_DIR, "concept");
const PAPER_OUT_DIR = path.join(OUT_DIR, "papers");
const REGISTRY = path.join(ROOT, "frontend/lib/streams/mathematics-xi-chapters.ts");

const PER_SHEET = 12; // 3 columns × 4 rows
const COLS = 3;
const ROWS = 4;

/* hard sheets: 2 columns × 3 rows = 6 problems, each with a hint ladder */
const HARD_PER_SHEET = 6;
const HARD_COLS = 2;
const HARD_ROWS = 3;

/* concept sheets: 2 columns × 3 rows = 6 conceptual questions with answers */
const CONCEPT_PER_SHEET = 6;
const CONCEPT_COLS = 2;
const CONCEPT_ROWS = 3;

/* long-answer sheets: one full-length question per A4 page */
const LONG_PER_SHEET = 1;
const LONG_COLS = 1;
const LONG_ROWS = 1;

/* NEB model papers: 75 marks in 3 hours, split 11 × 1 + 8 × 5 + 3 × 8 */
const PAPER_GROUPS = [
  { key: "A", label: "Group A — Tick the correct option", per: 1, count: 11 },
  { key: "B", label: "Group B — Short answer questions", per: 5, count: 8 },
  { key: "C", label: "Group C — Long answer questions", per: 8, count: 3 },
];
const PAPER_MARKS = PAPER_GROUPS.reduce((sum, group) => sum + group.per * group.count, 0);
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
  .filter(
    (name) =>
      name.endsWith(".mjs") &&
      !name.endsWith(".more.mjs") &&
      !name.endsWith(".hard.mjs") &&
      !name.endsWith(".long.mjs") &&
      !name.endsWith(".concept.mjs") &&
      !name.endsWith(".paper.mjs"),
  )
  .sort();
const extraFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".more.mjs") && !name.endsWith(".hard.mjs") && !name.endsWith(".long.mjs"))
  .sort();
const hardFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".hard.mjs"))
  .sort();
const longFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".long.mjs"))
  .sort();
const conceptFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".concept.mjs"))
  .sort();
const paperFiles = fs
  .readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".paper.mjs"))
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

/* extra sets: `*.more.mjs` exports EXTENSIONS keyed by chapter slug and is
   appended after the core sheet, so a chapter grows to a second A4 page. */
for (const file of extraFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.EXTENSIONS ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported EXTENSIONS array`);
    continue;
  }
  for (const extension of list) {
    const chapter = chapters.find((candidate) => candidate.slug === extension.slug);
    if (!chapter) {
      fail(`${file}: no chapter with slug "${extension.slug}"`);
      continue;
    }
    if (!Array.isArray(extension.items) || extension.items.length === 0) {
      fail(`${file} → ${extension.slug}: items must be a non-empty array`);
      continue;
    }
    chapter.items = [...chapter.items, ...extension.items];
  }
}

/* hard sets: `*.hard.mjs` exports HARD keyed by chapter slug. These live on
   their own A4 pages with 6 problems per sheet and a three-step hint ladder. */
for (const file of hardFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.HARD ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported HARD array`);
    continue;
  }
  for (const entry of list) {
    const chapter = chapters.find((candidate) => candidate.slug === entry.slug);
    if (!chapter) {
      fail(`${file}: no chapter with slug "${entry.slug}"`);
      continue;
    }
    if (!Array.isArray(entry.items) || entry.items.length === 0) {
      fail(`${file} → ${entry.slug}: hard items must be a non-empty array`);
      continue;
    }
    chapter.hard = entry.items;
  }
}

for (const [unitNo, list] of [...indexByUnit.entries()].sort((a, b) => a[0] - b[0])) {
  list.forEach((chapter, i) => {
    chapter.chapterNo = i + 1;
    chapter.code = `${unitNo}.${i + 1}`;
  });
}

/* long-answer sets: `*.long.mjs` exports LONG with one full-length question
   per chapter, printed on its own A4 page with a formal NEB script. */
for (const file of longFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.LONG ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported LONG array`);
    continue;
  }
  for (const entry of list) {
    const chapter = chapters.find((candidate) => candidate.slug === entry.slug);
    if (!chapter) {
      fail(`${file}: no chapter with slug "${entry.slug}"`);
      continue;
    }
    if (!Array.isArray(entry.items) || entry.items.length === 0) {
      fail(`${file} → ${entry.slug}: long items must be a non-empty array`);
      continue;
    }
    chapter.long = entry.items;
  }
}

/* concept sheets: `*.concept.mjs` exports CONCEPT with two-mark questions and
   their model answers, printed six to a sheet. */
for (const file of conceptFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.CONCEPT ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported CONCEPT array`);
    continue;
  }
  for (const entry of list) {
    const chapter = chapters.find((candidate) => candidate.slug === entry.slug);
    if (!chapter) {
      fail(`${file}: no chapter with slug "${entry.slug}"`);
      continue;
    }
    if (!Array.isArray(entry.items) || entry.items.length === 0) {
      fail(`${file} → ${entry.slug}: concept items must be a non-empty array`);
      continue;
    }
    chapter.concept = entry.items;
  }
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
    const kind = item[5];
    if (kind !== undefined && (typeof kind !== "string" || kind.trim() === ""))
      fail(`${at}: question type must be a non-empty string when present`);
  });

  if (chapter.hard === undefined) continue;

  const hardWhere = `${chapter.slug} (hard)`;
  if (chapter.hard.length % HARD_PER_SHEET !== 0)
    fail(
      `${hardWhere}: ${chapter.hard.length} hard items — must be a multiple of ${HARD_PER_SHEET}`,
    );

  chapter.hard.forEach((item, i) => {
    const at = `${hardWhere} H${i + 1}`;
    if (!Array.isArray(item) || item.length < 4) {
      fail(`${at}: expected [question, hints[], working, answer, marks?, topicIndex?, kind?]`);
      return;
    }
    const [q, hints, work, ans, marks, topicIndex = 0, kind] = item;
    for (const [label, value] of [
      ["question", q],
      ["working", work],
      ["answer", ans],
    ]) {
      if (typeof value !== "string" || value.trim() === "")
        fail(`${at}: ${label} must be a non-empty string`);
    }
    if (!Array.isArray(hints) || hints.length < 2)
      fail(`${at}: hints must be an array with at least two steps`);
    else if (hints.some((hint) => typeof hint !== "string" || hint.trim() === ""))
      fail(`${at}: every hint must be a non-empty string`);
    if (Number.isInteger(topicIndex) && (topicIndex < 0 || topicIndex >= chapter.topics.length))
      fail(`${at}: topicIndex ${topicIndex} out of range (${chapter.topics.length} topics)`);
    if (marks !== undefined && ![1, 2, 3, 4, 5, 6, 7, 8].includes(marks))
      fail(`${at}: marks ${marks} is not a sensible NEB mark value`);
    if (kind !== undefined && (typeof kind !== "string" || kind.trim() === ""))
      fail(`${at}: question type must be a non-empty string when present`);
  });

  if (chapter.long === undefined) continue;

  chapter.long.forEach((item, i) => {
    const at = `${chapter.slug} (long) L${i + 1}`;
    if (!Array.isArray(item) || item.length < 4) {
      fail(`${at}: expected [question, hints[], working, answer, marks?, topicIndex?, kind?, marking?, pitfall?]`);
      return;
    }
    const [q, hints, work, ans, marks, topicIndex = 0, kind, marking, pitfall] = item;
    for (const [label, value] of [
      ["question", q],
      ["working", work],
      ["answer", ans],
    ]) {
      if (typeof value !== "string" || value.trim() === "")
        fail(`${at}: ${label} must be a non-empty string`);
    }
    if (!Array.isArray(hints) || hints.length !== 3)
      fail(`${at}: long answers carry exactly three hints`);
    if (Number.isInteger(topicIndex) && (topicIndex < 0 || topicIndex >= chapter.topics.length))
      fail(`${at}: topicIndex ${topicIndex} out of range (${chapter.topics.length} topics)`);
    if (marks !== undefined && ![1, 2, 3, 4, 5, 6, 7, 8].includes(marks))
      fail(`${at}: marks ${marks} is not a sensible NEB mark value`);
    if (kind !== undefined && (typeof kind !== "string" || kind.trim() === ""))
      fail(`${at}: question type must be a non-empty string when present`);
    if (marking !== undefined && typeof marking !== "string")
      fail(`${at}: marking must be a string when present`);
    if (pitfall !== undefined && typeof pitfall !== "string")
      fail(`${at}: pitfall must be a string when present`);
  });

  if (chapter.concept === undefined) continue;

  chapter.concept.forEach((item, i) => {
    const at = `${chapter.slug} (concept) C${i + 1}`;
    if (!Array.isArray(item) || item.length < 2) {
      fail(`${at}: expected [question, answer, marks?, topicIndex?, kind?]`);
      return;
    }
    const [q, a, marks = 2, topicIndex = 0, kind] = item;
    if (typeof q !== "string" || q.trim() === "") fail(`${at}: empty question`);
    if (typeof a !== "string" || a.trim() === "") fail(`${at}: empty answer`);
    if (marks !== 2) fail(`${at}: conceptual answers are worth exactly 2 marks`);
    if (Number.isInteger(topicIndex) && (topicIndex < 0 || topicIndex >= chapter.topics.length))
      fail(`${at}: topicIndex ${topicIndex} out of range (${chapter.topics.length} topics)`);
    if (kind !== undefined && (typeof kind !== "string" || kind.trim() === ""))
      fail(`${at}: kind must be a non-empty string when present`);
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
  const kind = cell.length > 5 ? cell[5] : null;
  const [q, work, ans] = cell;
  const topic = topicIndex === null ? "" : chapter.topics[topicIndex] ?? "";
  return `<div class="cell">
<p class="tag">${esc(topic)}${kind ? ` <span class="kind">${esc(kind)}</span>` : ""}</p>
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
<p class="note">NEB answer style — given → statement → working → answer. ${PER_SHEET} questions per sheet, 3 per row.${
    chapter.hard
      ? ` <a class="hardlink" href="/resources/mathematics-xi/chapters/hard/${chapter.slug}.html">Hardest set with hints →</a>`
      : ""
  }${
    chapter.long
      ? ` <a class="hardlink" href="/resources/mathematics-xi/chapters/long/${chapter.slug}.html">Full-length answer →</a>`
      : ""
  }${
    chapter.concept
      ? ` <a class="hardlink" href="/resources/mathematics-xi/chapters/concept/${chapter.slug}.html">Conceptual answers →</a>`
      : ""
  }</p>
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

const hardCellHtml = (cell, chapter, no) => {
  const [q, hints, work, ans, marks, topicIndex = 0, kind] = cell;
  const topic = chapter.topics[topicIndex] ?? "";
  const hintItems = hints
    .map((hint, i) => `<li><b>H${i + 1}.</b> ${esc(hint)}</li>`)
    .join("\n");
  return `<div class="cell">
<p class="tag"><span>${esc(topic)}</span>${kind ? ` <span class="kind">${esc(kind)}</span>` : ""} <span class="level">hard</span></p>
<p class="q"><span class="n">H${no}.</span>${esc(q)}${
    marks ? `&nbsp;<span class="mk">[${marks}]</span>` : ""
  }</p>
<ol class="hints">
${hintItems}
</ol>
<p class="work">${esc(work)}</p>
<p class="ans">${esc(ans)}</p>
</div>`;
};

const hardSheetHtml = (chapter, sheetIndex, sheetCount) => {
  const start = sheetIndex * HARD_PER_SHEET;
  const slice = chapter.hard.slice(start, start + HARD_PER_SHEET);
  const cells = slice.map((item, i) => hardCellHtml(item, chapter, start + i + 1));
  const continued = sheetIndex > 0 ? " · continued" : "";
  return `<section class="sheet" aria-label="${esc(chapter.title)} — hard sheet ${sheetIndex + 1}">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · hard set</span></div>
<h1>${esc(chapter.code)} · ${esc(chapter.title)} — hardest questions${continued}</h1>
<p class="topics"><b>Topics</b> ${chapter.topics.map(esc).join(" · ")}</p>
<p class="note">NEB answer style. Each problem gives three escalating hints, then the full solution: given → statement → working → answer. ${HARD_PER_SHEET} problems per sheet, 2 per row.</p>
</header>
<div class="grid hard" data-cols="${HARD_COLS}" data-rows="${HARD_ROWS}">
${cells.join("\n")}
</div>
<footer class="foot">
<span>Unit ${chapter.unitNo} · ${esc(chapter.unitName)}</span>
<span class="mid">${esc(chapter.title)} · hard set</span>
<span>Sheet ${sheetIndex + 1} of ${sheetCount} · ${HARD_PER_SHEET} problems with hints</span>
</footer>
</section>`;
};

const hardChapterHtml = (chapter) => {
  const sheetCount = Math.ceil(chapter.hard.length / HARD_PER_SHEET);
  const sheets = Array.from({ length: sheetCount }, (_, i) => hardSheetHtml(chapter, i, sheetCount));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(chapter.code)} ${esc(chapter.title)} — hardest questions (Mathematics XI)</title>
<meta name="description" content="${esc(
    chapter.title,
  )} — ${chapter.hard.length} hardest NEB-style problems with a three-step hint ladder, worked solution and answer.">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
</head>
<body>
${sheets.join("\n")}
</body>
</html>
`;
};

const hardIndexHtml = () => {
  const withHard = chapters.filter((chapter) => chapter.hard);
  const units = [...new Set(withHard.map((chapter) => chapter.unitNo))].sort((a, b) => a - b);
  const total = withHard.reduce((sum, chapter) => sum + chapter.hard.length, 0);
  const sheets = withHard.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.hard.length / HARD_PER_SHEET),
    0,
  );
  const blocks = units
    .map((unitNo) => {
      const list = withHard.filter((chapter) => chapter.unitNo === unitNo);
      const items = list
        .map(
          (chapter) =>
            `<li><a href="/resources/mathematics-xi/chapters/hard/${chapter.slug}.html">${esc(
              chapter.code,
            )} ${esc(chapter.title)}</a> <span>· ${chapter.hard.length} hard Q</span></li>`,
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
<title>Mathematics XI — hardest questions with hints</title>
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
</head>
<body>
<section class="sheet index">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · hard set</span></div>
<h1>Hardest questions — contents</h1>
<p class="topics"><b>Coverage</b> ${withHard.length} chapters · ${total} hard problems · ${sheets} A4 sheets · 3 hints each</p>
<p class="note">Every problem on these sheets is a full-mark NEB item. Read H1, try it; read H2, try again; H3 is the last nudge before the worked solution.</p>
</header>
${blocks}
<footer class="foot">
<span>Units ${units.join(", ")}</span>
<span class="mid">${withHard.length} chapters</span>
<span>${total} problems · ${sheets} sheets</span>
</footer>
</section>
</body>
</html>
`;
};

const longCellHtml = (cell, chapter, no) => {
  const [q, hints, work, ans, marks, topicIndex = 0, kind, marking, pitfall] = cell;
  const topic = chapter.topics[topicIndex] ?? "";
  const hintItems = hints
    .map((hint, i) => `<li><b>H${i + 1}.</b> ${esc(hint)}</li>`)
    .join("\n");
  const notes = [
    marking ? `<div><b>Marking split</b> — ${esc(marking)}</div>` : "",
    pitfall ? `<div class="warn"><b>Common pitfall</b> — ${esc(pitfall)}</div>` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `<div class="cell">
<p class="tag"><span>${esc(topic)}</span>${kind ? ` <span class="kind">${esc(kind)}</span>` : ""} <span class="level">long answer</span></p>
<p class="q"><span class="n">L${no}.</span>${esc(q)}${
    marks ? `&nbsp;<span class="mk">[${marks}]</span>` : ""
  }</p>
<ol class="hints">
${hintItems}
</ol>
<p class="work">${esc(work)}</p>
<p class="ans">${esc(ans)}</p>
${notes ? `<div class="marking">\n${notes}\n</div>` : ""}
</div>`;
};

const longSheetHtml = (chapter, index, count) => {
  const cell = chapter.long[index];
  return `<section class="sheet" aria-label="${esc(chapter.title)} — long answer ${index + 1}">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · long answer</span></div>
<h1>${esc(chapter.code)} · ${esc(chapter.title)} — full-length answer${count > 1 ? ` (${index + 1}/${count})` : ""}</h1>
<p class="topics"><b>Topics</b> ${chapter.topics.map(esc).join(" · ")}</p>
<p class="note">Complete NEB script: three hints, then Given → Required → Solution → Conclusion, with the marking split and the usual pitfall. One full-mark question per A4 page.</p>
</header>
<div class="grid hard long" data-cols="${LONG_COLS}" data-rows="${LONG_ROWS}">
${longCellHtml(cell, chapter, index + 1)}
</div>
<footer class="foot">
<span>Unit ${chapter.unitNo} · ${esc(chapter.unitName)}</span>
<span class="mid">${esc(chapter.title)} · long answer</span>
<span>Page ${index + 1} of ${count}</span>
</footer>
</section>`;
};

const longChapterHtml = (chapter) => {
  const count = Math.ceil(chapter.long.length / LONG_PER_SHEET);
  const sheets = Array.from({ length: count }, (_, i) => longSheetHtml(chapter, i, count));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(chapter.code)} ${esc(chapter.title)} — full-length answer (Mathematics XI)</title>
<meta name="description" content="${esc(
    chapter.title,
  )} — a full-mark NEB long answer with hints, a complete worked script, the marking split and the common pitfall.">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/long.css">
</head>
<body>
${sheets.join("\n")}
</body>
</html>
`;
};

const longIndexHtml = () => {
  const withLong = chapters.filter((chapter) => chapter.long);
  const units = [...new Set(withLong.map((chapter) => chapter.unitNo))].sort((a, b) => a - b);
  const blocks = units
    .map((unitNo) => {
      const list = withLong.filter((chapter) => chapter.unitNo === unitNo);
      const items = list
        .map(
          (chapter) =>
            `<li><a href="/resources/mathematics-xi/chapters/long/${chapter.slug}.html">${esc(
              chapter.code,
            )} ${esc(chapter.title)}</a> <span>· ${chapter.long.length} long answer</span></li>`,
        )
        .join("\n");
      return `<h2>Unit ${unitNo} · ${esc(list[0].unitName)}</h2>
<ol>
${items}
</ol>`;
    })
    .join("\n");
  const total = withLong.reduce((sum, chapter) => sum + chapter.long.length, 0);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mathematics XI — full-length answers</title>
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/long.css">
</head>
<body>
<section class="sheet index">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · long answer</span></div>
<h1>Full-length answers — contents</h1>
<p class="topics"><b>Coverage</b> ${withLong.length} chapters · ${total} full-mark questions · ${total} A4 pages</p>
<p class="note">One complete NEB script per chapter: hints, Given → Solution → Conclusion, marking split and the common pitfall.</p>
</header>
${blocks}
<footer class="foot">
<span>Units ${units.join(", ")}</span>
<span class="mid">${withLong.length} chapters</span>
<span>${total} long answers</span>
</footer>
</section>
</body>
</html>
`;
};

/* ---- NEB model papers ---- */
const papers = [];
for (const file of paperFiles) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  const list = mod.PAPERS ?? mod.default;
  if (!Array.isArray(list) || list.length === 0) {
    fail(`${file}: expected an exported PAPERS array`);
    continue;
  }
  for (const paper of list) {
    const at = `paper unit ${paper.unitNo}`;
    const unitChapters = chapters.filter((chapter) => chapter.unitNo === paper.unitNo);
    if (unitChapters.length === 0) {
      fail(`${at}: no chapters registered for this unit`);
      continue;
    }
    let order = 0;
    for (const group of PAPER_GROUPS) {
      const items = paper[group.key];
      if (!Array.isArray(items) || items.length !== group.count) {
        fail(`${at} group ${group.key}: expected ${group.count} questions`);
        continue;
      }
      for (const item of items) {
        order += 1;
        if (!Array.isArray(item) || item.length < 3) {
          fail(`${at} group ${group.key}: expected [question, work|options, answer]`);
          continue;
        }
        const [q, second, third] = item;
        if (typeof q !== "string" || q.trim() === "") fail(`${at} Q${order}: empty question`);
        if (group.key === "A") {
          if (!Array.isArray(second) || second.length !== 4)
            fail(`${at} Q${order}: multiple-choice items need four options`);
          if (![1, 2, 3, 4].includes(third))
            fail(`${at} Q${order}: answer index must be 1-4`);
        } else if (typeof second !== "string" || typeof third !== "string") {
          fail(`${at} Q${order}: working and answer must be strings`);
        }
      }
    }
    const set = (paper.set ?? "A").toUpperCase();
    if (!["A", "B", "C"].includes(set)) {
      fail(`${at}: set must be A, B or C`);
      continue;
    }
    if (papers.some((other) => other.unitNo === paper.unitNo && other.set === set)) {
      fail(`${at}: set ${set} is defined twice`);
      continue;
    }
    papers.push({
      ...paper,
      set,
      unitName: unitChapters[0].unitName,
      chapters: unitChapters,
    });
  }
}
papers.sort((a, b) => a.unitNo - b.unitNo || a.set.localeCompare(b.set));

/** File stem for a paper: set A keeps the plain unit name. */
const paperStem = (paper) =>
  paper.set === "A"
    ? `unit-${String(paper.unitNo).padStart(2, "0")}`
    : `unit-${String(paper.unitNo).padStart(2, "0")}-set-${paper.set.toLowerCase()}`;

/* ── conceptual answer sheets ────────────────────────────────────────── */

const conceptCellHtml = (cell, chapter, no) => {
  const [q, a, marks = 2, topicIndex = 0, kind] = cell;
  const topic = chapter.topics[topicIndex] ?? "";
  return `<div class="cell">
<p class="tag"><span>${esc(topic)}</span>${
    kind ? ` <span class="kind">${esc(kind)}</span>` : ""
  } <span class="level">${marks} marks</span></p>
<p class="q"><span class="n">C${no}.</span> ${esc(q)}&nbsp;<span class="mk">[${marks}]</span></p>
<p class="ansblock"><b>Ans.</b> ${esc(a)}</p>
</div>`;
};

const conceptSheetHtml = (chapter, index, count, items) => {
  const first = index * CONCEPT_PER_SHEET;
  const cells = items
    .slice(first, first + CONCEPT_PER_SHEET)
    .map((cell, i) => conceptCellHtml(cell, chapter, first + i + 1))
    .join("\n");
  return `<section class="sheet" aria-label="${esc(chapter.title)} — conceptual answers ${index + 1}">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · conceptual answers</span></div>
<h1>${esc(chapter.code)} · ${esc(chapter.title)} — two-mark conceptual answers${
    count > 1 ? ` (${index + 1}/${count})` : ""
  }</h1>
<p class="topics"><b>Topics</b> ${chapter.topics.map(esc).join(" · ")}</p>
<p class="note">Each question is the two-mark kind NEB asks at the start of the paper; the model answer is one or two precise sentences.</p>
</header>
<div class="grid hard concept" data-cols="${CONCEPT_COLS}" data-rows="${CONCEPT_ROWS}">
${cells}
</div>
<footer class="foot">
<span>Unit ${chapter.unitNo} · ${esc(chapter.unitName)}</span>
<span class="mid">${esc(chapter.title)} · conceptual</span>
<span>Page ${index + 1} of ${count}</span>
</footer>
</section>`;
};

const conceptChapterHtml = (chapter) => {
  const count = Math.ceil(chapter.concept.length / CONCEPT_PER_SHEET);
  const sheets = Array.from({ length: count }, (_, i) =>
    conceptSheetHtml(chapter, i, count, chapter.concept),
  );
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(chapter.code)} ${esc(chapter.title)} — conceptual answers (Mathematics XI)</title>
<meta name="description" content="${esc(
    chapter.title,
  )} conceptual questions with model two-mark answers, six to an A4 sheet.">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/concept.css">
</head>
<body>
${sheets.join("\n")}
</body>
</html>
`;
};

const conceptIndexHtml = () => {
  const list = chapters.filter((chapter) => chapter.concept);
  const units = [...new Set(list.map((chapter) => chapter.unitNo))].sort((a, b) => a - b);
  const blocks = units
    .map((unitNo) => {
      const group = list.filter((chapter) => chapter.unitNo === unitNo);
      const items = group
        .map(
          (chapter) =>
            `<li><a href="/resources/mathematics-xi/chapters/concept/${chapter.slug}.html">${esc(
              chapter.code,
            )} ${esc(chapter.title)}</a> <span>· ${chapter.concept.length} Q&amp;A</span></li>`,
        )
        .join("\n");
      return `<h2>Unit ${unitNo} · ${esc(group[0].unitName)}</h2>
<ol>
${items}
</ol>`;
    })
    .join("\n");
  const total = list.reduce((sum, chapter) => sum + chapter.concept.length, 0);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mathematics XI — conceptual answers</title>
<link rel="stylesheet" href="/resources/mathematics-xi/a4/hard.css">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/concept.css">
</head>
<body>
<section class="sheet index">
<header class="masthead">
<div class="stream"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · conceptual answers</span></div>
<h1>Conceptual answers — contents</h1>
<p class="topics"><b>Coverage</b> ${list.length} chapters · ${total} two-mark questions · ${list.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.concept.length / CONCEPT_PER_SHEET),
    0,
  )} A4 sheets</p>
<p class="note">Six questions per sheet with the model answer underneath, in the wording a two-mark answer needs.</p>
</header>
${blocks}
<footer class="foot">
<span>Units ${units.join(", ")}</span>
<span class="mid">${list.length} chapters</span>
<span>${total} Q&amp;A</span>
</footer>
</section>
</body>
</html>
`;
};

/* ── NEB model papers ─────────────────────────────────────────────────── */

const PAPER_LETTERS = ["a", "b", "c", "d"];
const PAPER_INSTRUCTIONS = [
  "Candidates are required to give their answers in their own words as far as practicable.",
  "The figures in the margin indicate full marks.",
  "Write the answers in a tidy order, and label every part (a), (b), (c).",
];

const mcqHtml = (item, no) => {
  const [q, options, answer] = item;
  const opts = options
    .map((option, i) => `<span><i>(${PAPER_LETTERS[i]})</i> ${esc(option)}</span>`)
    .join(" ");
  return `<li><span class="qtext">${esc(q)}</span><span class="opts">${opts}</span></li>`;
};

const mcqKeyHtml = (item, no) => {
  const [q, options, answer, why] = item;
  return `<li><span class="ans">${no}. (${PAPER_LETTERS[answer - 1]}) ${esc(options[answer - 1])}</span>${
    why ? ` — ${esc(why)}` : ""
  }</li>`;
};

const writtenKeyHtml = (item, no) => {
  const [q, work, ans] = item;
  return `<li><span class="num">${no}.</span> <span class="body">${esc(work)}</span><span class="ans">Ans. ${esc(
    ans,
  )}</span></li>`;
};

const paperHtml = (paper) => {
  const groups = PAPER_GROUPS.map((group) => {
    const items = paper[group.key];
    if (group.key === "A") {
      return `<div class="qgroup">
<h2>${esc(group.label)} <span class="marks">${group.count} × ${group.per} = ${group.count * group.per}</span></h2>
<ol class="mcq">
${items.map(mcqHtml).join("\n")}
</ol>
</div>`;
    }
    const cls = group.key === "C" ? "written long" : "written";
    return `<div class="qgroup">
<h2>${esc(group.label)} <span class="marks">${group.count} × ${group.per} = ${group.count * group.per}</span></h2>
<ol class="${cls}">
${items
  .map(
    ([q]) =>
      `<li><span class="qtext">${esc(q)}</span> <span class="mk">[${group.per}]</span></li>`,
  )
  .join("\n")}
</ol>
</div>`;
  }).join("\n");

  const keyA = paper.A.map((item, i) => mcqKeyHtml(item, i + 1)).join("\n");
  const keyB = paper.B.map((item, i) => writtenKeyHtml(item, i + 12)).join("\n");
  const keyC = paper.C.map((item, i) => writtenKeyHtml(item, i + 20)).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Unit ${paper.unitNo} ${esc(paper.title ?? paper.unitName)} Set ${paper.set} — NEB model paper (Mathematics XI)</title>
<meta name="description" content="Model NEB question paper for Unit ${paper.unitNo} of Mathematics XI: 75 marks, 3 hours, with the full answer key and marking notes.">
<link rel="stylesheet" href="/resources/mathematics-xi/a4/paper.css">
</head>
<body>
<section class="paper">
<header class="phead">
<div class="row"><span>NEB · Grade XI · Compulsory Mathematics</span><span>Model paper · Unit ${paper.unitNo} · Set ${paper.set}</span></div>
<h1>${esc(paper.title ?? paper.unitName)}</h1>
<p class="sub"><b>Time: 3 hours</b> · <b>Full marks: ${PAPER_MARKS}</b> · Pass marks: 27 · Code 0071 ‘M’</p>
<ul class="instructions">
${PAPER_INSTRUCTIONS.map((line) => `<li>${esc(line)}</li>`).join("\n")}
</ul>
<table class="pgrid">
<thead><tr><th>Group</th><th>Type</th><th>Questions</th><th>Marks each</th><th>Total</th></tr></thead>
<tbody>
${PAPER_GROUPS.map(
  (group) =>
    `<tr><td>${group.key}</td><td>${esc(group.label.split("—")[1].trim())}</td><td>${group.count}</td><td>${group.per}</td><td>${group.count * group.per}</td></tr>`,
).join("\n")}
<tr><th colspan="4">Total</th><th>${PAPER_MARKS}</th></tr>
</tbody>
</table>
</header>
${groups}
<footer class="foot">
<span>Unit ${paper.unitNo} · ${esc(paper.unitName)}</span>
<span>${paper.chapters.map((chapter) => esc(chapter.title)).join(" · ")}</span>
</footer>
</section>

<section class="paper key">
<header class="phead">
<div class="row"><span>NEB · Grade XI · Compulsory Mathematics</span><span>Answer key · Unit ${paper.unitNo} · Set ${paper.set}</span></div>
<h1>Answer key and marking notes — ${esc(paper.title ?? paper.unitName)}, Set ${paper.set}</h1>
<p class="sub"><b>${PAPER_MARKS} marks</b> · Group A 1 mark each · Group B 5 marks each · Group C 8 marks each</p>
</header>
${paper.note ? `<p class="legend">${esc(paper.note)}</p>` : ""}
<h2 class="keyhead">Group A</h2>
<ol class="keysol">
${keyA}
</ol>
<h2 class="keyhead">Group B</h2>
<ol class="keysol">
${keyB}
</ol>
<h2 class="keyhead">Group C</h2>
<ol class="keysol long">
${keyC}
</ol>
<footer class="foot">
<span>Full marks ${PAPER_MARKS}</span>
<span class="mid">marking: method 60% · accuracy 30% · presentation 10%</span>
<span>Unit ${paper.unitNo}</span>
</footer>
</section>
</body>
</html>
`;
};

const paperIndexHtml = () => {
  const units = [...new Set(papers.map((paper) => paper.unitNo))].sort((a, b) => a - b);
  const rows = units.map((unitNo) => {
    const list = papers.filter((paper) => paper.unitNo === unitNo);
    const links = list
      .map(
        (paper) =>
          `<a href="/resources/mathematics-xi/chapters/papers/${paperStem(paper)}.html">Set ${paper.set}</a>`,
      )
      .join(" · ");
    return `<li><span class="qtext">Unit ${unitNo} · ${esc(list[0].title ?? list[0].unitName)}</span> <span class="mk">${links} · ${list[0].questionCount} questions · ${PAPER_MARKS} marks</span></li>`;
  });
  const sets = [...new Set(papers.map((paper) => paper.set))].sort().join(" and ");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mathematics XI — NEB model papers</title>
<link rel="stylesheet" href="/resources/mathematics-xi/a4/paper.css">
</head>
<body>
<section class="paper">
<header class="phead">
<div class="row"><span>${esc(STREAM)}</span><span>${esc(BOOK)} · model papers</span></div>
<h1>NEB model question papers — contents</h1>
<p class="sub"><b>${papers.length} papers</b> in sets ${esc(sets)} · ${PAPER_MARKS} marks each · 3 hours each · full answer key included</p>
</header>
<ol class="written">
${rows.join("\n")}
</ol>
<footer class="foot">
<span>Units ${units.join(", ")}</span>
<span class="mid">NEB split 11 × 1 + 8 × 5 + 3 × 8</span>
<span>${papers.length} papers</span>
</footer>
</section>
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
            )} ${esc(chapter.title)}</a> <span>· ${chapter.items.length} Q</span>${
              chapter.hard
                ? ` <span>· <a href="/resources/mathematics-xi/chapters/hard/${chapter.slug}.html">${chapter.hard.length} hard with hints</a></span>`
                : ""
            }${
              chapter.long
                ? ` <span>· <a href="/resources/mathematics-xi/chapters/long/${chapter.slug}.html">full-length answer</a></span>`
                : ""
            }${
              chapter.concept
                ? ` <span>· <a href="/resources/mathematics-xi/chapters/concept/${chapter.slug}.html">conceptual</a></span>`
                : ""
            }</li>`,
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
    hardCount: ${chapter.hard ? chapter.hard.length : 0},
    hardSheetCount: ${chapter.hard ? Math.ceil(chapter.hard.length / HARD_PER_SHEET) : 0},
    longCount: ${chapter.long ? chapter.long.length : 0},
    longSheetCount: ${chapter.long ? Math.ceil(chapter.long.length / LONG_PER_SHEET) : 0},
    conceptCount: ${chapter.concept ? chapter.concept.length : 0},
    conceptSheetCount: ${chapter.concept ? Math.ceil(chapter.concept.length / CONCEPT_PER_SHEET) : 0},
  },`,
    )
    .join("\n");
  const total = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
  const sheets = chapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.items.length / PER_SHEET),
    0,
  );
  const hardTotal = chapters.reduce((sum, chapter) => sum + (chapter.hard?.length ?? 0), 0);
  const hardSheets = chapters.reduce(
    (sum, chapter) => sum + (chapter.hard ? Math.ceil(chapter.hard.length / HARD_PER_SHEET) : 0),
    0,
  );
  const longTotal = chapters.reduce((sum, chapter) => sum + (chapter.long?.length ?? 0), 0);
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
export const MATH_XI_HARD_PER_SHEET = ${HARD_PER_SHEET};
export const MATH_XI_LONG_PER_SHEET = ${LONG_PER_SHEET};
export const MATH_XI_CONCEPT_PER_SHEET = ${CONCEPT_PER_SHEET};
export const MATH_XI_PAPER_MARKS = ${PAPER_MARKS};

/** Shape of the NEB paper — 11 × 1, 8 × 5, 3 × 8 marks. */
export const MATH_XI_PAPER_GROUPS = [
${PAPER_GROUPS.map(
  (group) => `  { key: "${group.key}", label: ${JSON.stringify(group.label)}, per: ${group.per}, count: ${group.count} },`,
).join("\n")}
] as const;

/** One NEB model paper per unit. */
export const MATH_XI_PAPERS = [
${papers
  .map(
    (paper) =>
      `  { unitNo: ${paper.unitNo}, set: ${JSON.stringify(paper.set)}, title: ${JSON.stringify(
        paper.title ?? paper.unitName,
      )}, unitName: ${JSON.stringify(paper.unitName)}, questionCount: ${
        paper.A.length + paper.B.length + paper.C.length
      }, marks: ${PAPER_MARKS}, url: \`\${MATH_XI_WORKBOOK_BASE}/papers/${paperStem(paper)}.html\`, path: \`public/resources/mathematics-xi/chapters/papers/${paperStem(paper)}.html\` },`,
  )
  .join("\n")}
] as const;

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
  /** Hardest-question problems (hint ladder + full solution). 0 when unauthored. */
  hardCount: number;
  /** A4 hard sheets (6 problems each). */
  hardSheetCount: number;
  /** Full-length NEB answers (one per A4 page). 0 when unauthored. */
  longCount: number;
  longSheetCount: number;
  /** Two-mark conceptual questions with model answers. 0 when unauthored. */
  conceptCount: number;
  conceptSheetCount: number;
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
  hardChapters: MATH_XI_CHAPTERS.filter((chapter) => chapter.hardCount > 0).length,
  hardQuestions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.hardCount, 0),
  hardSheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.hardSheetCount, 0),
  hardPerSheet: MATH_XI_HARD_PER_SHEET,
  conceptChapters: MATH_XI_CHAPTERS.filter((chapter) => chapter.conceptCount > 0).length,
  conceptQuestions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.conceptCount, 0),
  conceptSheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.conceptSheetCount, 0),
  conceptPerSheet: MATH_XI_CONCEPT_PER_SHEET,
  longChapters: MATH_XI_CHAPTERS.filter((chapter) => chapter.longCount > 0).length,
  longQuestions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.longCount, 0),
  longSheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.longSheetCount, 0),
  longPerSheet: MATH_XI_LONG_PER_SHEET,
};

export function mathXiHardUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return \`\${MATH_XI_WORKBOOK_BASE}/hard/\${chapter.slug}.html\`;
}

export function mathXiHardPath(chapter: Pick<MathXiChapter, "slug">): string {
  return \`public/resources/mathematics-xi/chapters/hard/\${chapter.slug}.html\`;
}

export function mathXiHardChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.hardCount > 0);
}

export function mathXiLongUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return \`\${MATH_XI_WORKBOOK_BASE}/long/\${chapter.slug}.html\`;
}

export function mathXiLongPath(chapter: Pick<MathXiChapter, "slug">): string {
  return \`public/resources/mathematics-xi/chapters/long/\${chapter.slug}.html\`;
}

export function mathXiConceptUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return \`\${MATH_XI_WORKBOOK_BASE}/concept/\${chapter.slug}.html\`;
}

export function mathXiConceptPath(chapter: Pick<MathXiChapter, "slug">): string {
  return \`public/resources/mathematics-xi/chapters/concept/\${chapter.slug}.html\`;
}

export function mathXiConceptChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.conceptCount > 0);
}

export function mathXiLongChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.longCount > 0);
}

/** Paper URL for a unit and set (set A is the default). */
export function mathXiPaperUrl(unitNo: number, set = "A"): string {
  const stem =
    set === "A"
      ? \`unit-\${String(unitNo).padStart(2, "0")}\`
      : \`unit-\${String(unitNo).padStart(2, "0")}-set-\${set.toLowerCase()}\`;
  return \`\${MATH_XI_WORKBOOK_BASE}/papers/\${stem}.html\`;
}

export function mathXiPaperPath(unitNo: number, set = "A"): string {
  return \`public/resources/mathematics-xi/chapters/papers/\${mathXiPaperUrl(unitNo, set).split("/papers/")[1]}\`;
}

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

const hardChapters = chapters.filter((chapter) => chapter.hard);
if (hardChapters.length > 0) {
  fs.mkdirSync(HARD_OUT_DIR, { recursive: true });
  for (const chapter of hardChapters) {
    fs.writeFileSync(
      path.join(HARD_OUT_DIR, `${chapter.slug}.html`),
      hardChapterHtml(chapter),
      "utf8",
    );
  }
  fs.writeFileSync(path.join(HARD_OUT_DIR, "index.html"), hardIndexHtml(), "utf8");
}

const longChapters = chapters.filter((chapter) => chapter.long);
if (longChapters.length > 0) {
  fs.mkdirSync(LONG_OUT_DIR, { recursive: true });
  for (const chapter of longChapters) {
    fs.writeFileSync(
      path.join(LONG_OUT_DIR, `${chapter.slug}.html`),
      longChapterHtml(chapter),
      "utf8",
    );
  }
  fs.writeFileSync(path.join(LONG_OUT_DIR, "index.html"), longIndexHtml(), "utf8");
}

const conceptChapters = chapters.filter((chapter) => chapter.concept);
if (conceptChapters.length > 0) {
  fs.mkdirSync(CONCEPT_OUT_DIR, { recursive: true });
  for (const chapter of conceptChapters) {
    fs.writeFileSync(
      path.join(CONCEPT_OUT_DIR, `${chapter.slug}.html`),
      conceptChapterHtml(chapter),
      "utf8",
    );
  }
  fs.writeFileSync(path.join(CONCEPT_OUT_DIR, "index.html"), conceptIndexHtml(), "utf8");
}

if (conceptChapters.length > 0) {
  const conceptTotal = conceptChapters.reduce((sum, chapter) => sum + chapter.concept.length, 0);
  const conceptSheets = conceptChapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.concept.length / CONCEPT_PER_SHEET),
    0,
  );
  console.log(
    `✓ ${conceptChapters.length} concept sheets · ${conceptTotal} two-mark Q&A · ${conceptSheets} A4 pages`,
  );
}
if (papers.length > 0) {
  fs.mkdirSync(PAPER_OUT_DIR, { recursive: true });
  for (const paper of papers) {
    fs.writeFileSync(path.join(PAPER_OUT_DIR, `${paperStem(paper)}.html`), paperHtml(paper), "utf8");
  }
  fs.writeFileSync(path.join(PAPER_OUT_DIR, "index.html"), paperIndexHtml(), "utf8");
}

fs.writeFileSync(REGISTRY, registrySource(), "utf8");

const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.items.length, 0);
const totalSheets = chapters.reduce(
  (sum, chapter) => sum + Math.ceil(chapter.items.length / PER_SHEET),
  0,
);

console.log(
  `✓ ${chapters.length} chapter sheets · ${totalQuestions} solved questions · ${totalSheets} A4 pages`,
);
if (hardChapters.length > 0) {
  const hardTotal = hardChapters.reduce((sum, chapter) => sum + chapter.hard.length, 0);
  const hardSheets = hardChapters.reduce(
    (sum, chapter) => sum + Math.ceil(chapter.hard.length / HARD_PER_SHEET),
    0,
  );
  console.log(
    `✓ ${hardChapters.length} hard sets · ${hardTotal} hardest problems · ${hardSheets} A4 pages (with hint ladders)`,
  );
}
if (longChapters.length > 0) {
  const longTotal = longChapters.reduce((sum, chapter) => sum + chapter.long.length, 0);
  console.log(
    `✓ ${longChapters.length} long answers · ${longTotal} full-mark questions · ${longTotal} A4 pages (formal scripts)`,
  );
}
if (papers.length > 0) {
  console.log(
    `✓ ${papers.length} model papers in sets ${[...new Set(papers.map((paper) => paper.set))].sort().join(", ")} · ${PAPER_GROUPS.map((group) => `${group.count}×${group.per}`).join(" + ")} = ${PAPER_MARKS} marks each`,
  );
}
for (const [unitNo, list] of [...indexByUnit.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(
    `  unit ${unitNo}: ${list.length} chapters, ${list.reduce(
      (sum, chapter) => sum + chapter.items.length,
      0,
    )} questions`,
  );
}
