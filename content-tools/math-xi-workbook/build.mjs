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
const REGISTRY = path.join(ROOT, "frontend/lib/streams/mathematics-xi-chapters.ts");

const PER_SHEET = 12; // 3 columns × 4 rows
const COLS = 3;
const ROWS = 4;

/* hard sheets: 2 columns × 3 rows = 6 problems, each with a hint ladder */
const HARD_PER_SHEET = 6;
const HARD_COLS = 2;
const HARD_ROWS = 3;

/* long-answer sheets: one full-length question per A4 page */
const LONG_PER_SHEET = 1;
const LONG_COLS = 1;
const LONG_ROWS = 1;
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
      !name.endsWith(".long.mjs"),
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

export function mathXiLongChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.longCount > 0);
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
for (const [unitNo, list] of [...indexByUnit.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(
    `  unit ${unitNo}: ${list.length} chapters, ${list.reduce(
      (sum, chapter) => sum + chapter.items.length,
      0,
    )} questions`,
  );
}
