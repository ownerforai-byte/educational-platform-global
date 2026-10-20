#!/usr/bin/env node
/**
 * Generate the Physics XI Academic Companion document set.
 *
 * The canonical dataset (frontend/public/data/physics-xi-academic/units.json)
 * is rendered into one HTML file and one Word-compatible .doc file per unit
 * and published into the resources tree:
 *
 *   frontend/public/resources/physics-xi/  → served live at /resources/physics-xi/…
 *   public/resources/physics-xi/          → the repository's published resources tree
 *
 * The .doc assets are HTML with the Word namespaces so they open in Word,
 * LibreOffice and Google Docs — the convention already used by the paired
 * documents in public/resources.
 *
 * Usage:
 *   node scripts/generate-physics-academic-docs.mjs           # write the documents
 *   node scripts/generate-physics-academic-docs.mjs --check   # fail if out of date
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATASET_PATH = path.join(
  ROOT,
  "frontend",
  "public",
  "data",
  "physics-xi-academic",
  "units.json"
);
const TARGET_DIRS = [
  path.join(ROOT, "frontend", "public", "resources", "physics-xi"),
  path.join(ROOT, "public", "resources", "physics-xi"),
];

const WORD_NAMESPACES =
  'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
  'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
  'xmlns="http://www.w3.org/TR/REC-html40"';

const HTML_STYLE = `body{font-family:Georgia,'Times New Roman',serif;line-height:1.55;color:#111;max-width:52em;margin:0 auto;padding:2em 1.5em}h1{font-size:1.7em;margin:0 0 .2em}h2{font-size:1.2em;margin:1.6em 0 .5em;border-bottom:1px solid #ccc;padding-bottom:.2em}h3{font-size:1em;margin:1.1em 0 .35em}.meta{color:#444;font-size:.92em}.summary{font-size:1.05em;font-style:italic;color:#222}ol,ul{margin:.4em 0 .8em;padding-left:1.4em}li{margin:.35em 0}table{border-collapse:collapse;width:100%;margin:.5em 0 1em}td,th{border:1px solid #999;padding:.45em .6em;text-align:left;vertical-align:top}th{background:#eee}.mystery{border-left:3px solid #888;padding:.1em 0 .1em .8em;margin:.8em 0}.status{font-size:.85em;color:#555;text-transform:uppercase;letter-spacing:.04em}a{color:#0b4f9c}.note{font-size:.88em;color:#444;border-top:1px solid #ccc;padding-top:.7em;margin-top:2em}@media print{body{max-width:none;padding:0}.mystery{page-break-inside:avoid}}`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function unitBody(unit, dataset) {
  const facts = unit.facts
    .map((fact) => `<li>${esc(fact)}</li>`)
    .join("");
  const conditions = unit.conditions
    .map((condition) => `<li>${esc(condition)}</li>`)
    .join("");
  const keyNumbers = unit.keyNumbers
    .map(
      (item) =>
        `<tr><td>${esc(item.label)}</td><td>${esc(item.value)}</td></tr>`
    )
    .join("");
  const mysteries = unit.mysteries
    .map(
      (mystery) =>
        `<div class="mystery"><p><b>${esc(mystery.question)}</b></p>` +
        `<p class="status">${esc(mystery.status)}</p>` +
        `<p>${esc(mystery.note)}</p></div>`
    )
    .join("");
  const prompts = unit.prompts
    .map((prompt) => `<li>${esc(prompt)}</li>`)
    .join("");
  const sources = unit.sources
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.label)}</a></li>`
    )
    .join("");

  return [
    `<h1>Unit ${unit.unitNo}: ${esc(unit.unitName)}</h1>`,
    `<p class="meta">${esc(dataset.course)} &nbsp;•&nbsp; Content area: ${esc(
      unit.contentArea
    )}</p>`,
    `<p class="summary">${esc(unit.summary)}</p>`,
    `<h2>What the model asserts</h2><ol>${facts}</ol>`,
    `<h2>Conditions, assumptions and limits</h2><ul>${conditions}</ul>`,
    `<h2>Key numbers</h2><table><tr><th>Quantity</th><th>Value</th></tr>${keyNumbers}</table>`,
    `<h2>Open questions and mysteries</h2>${mysteries}`,
    `<h2>Inquiry prompts</h2><ol>${prompts}</ol>`,
    `<h2>Further reading</h2><ul>${sources}</ul>`,
    `<p class="note">${esc(
      dataset.title
    )} — a companion brief, not a replacement for the prescribed NEB text. The open questions describe live research frontiers; they are enrichment, not a claim that the established school-level model is invalid. Check the prescribed text and syllabus for examinable scope.</p>`,
  ].join("");
}

function renderHtml(unit, dataset) {
  return (
    `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">\n` +
    `<title>Physics XI Unit ${unit.unitNo}: ${esc(unit.unitName)} — Academic Companion</title>\n` +
    `<meta name="description" content="${esc(unit.summary)}">\n` +
    `<style>${HTML_STYLE}</style>\n</head>\n<body>\n` +
    unitBody(unit, dataset) +
    `\n</body>\n</html>\n`
  );
}

function renderDoc(unit, dataset) {
  return (
    `<!DOCTYPE html>\n<html ${WORD_NAMESPACES}>\n<head>\n<meta charset="utf-8">\n` +
    `<title>Physics XI Unit ${unit.unitNo}: ${esc(unit.unitName)} — Academic Companion</title>\n` +
    `</head>\n<body>\n` +
    unitBody(unit, dataset) +
    `\n</body>\n</html>\n`
  );
}

if (!fs.existsSync(DATASET_PATH)) {
  throw new Error(`Physics XI academic dataset not found: ${DATASET_PATH}`);
}
const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, "utf8"));
if (!Array.isArray(dataset.units) || dataset.units.length === 0) {
  throw new Error("Physics XI academic dataset has no units");
}

const checkOnly = process.argv.includes("--check");
const written = [];
const stale = [];

for (const unit of dataset.units) {
  const files = [
    { name: `${unit.slug}.html`, content: renderHtml(unit, dataset) },
    { name: `${unit.slug}.doc`, content: renderDoc(unit, dataset) },
  ];
  for (const dir of TARGET_DIRS) {
    for (const file of files) {
      const target = path.join(dir, file.name);
      if (checkOnly) {
        if (
          !fs.existsSync(target) ||
          fs.readFileSync(target, "utf8") !== file.content
        ) {
          stale.push(path.relative(ROOT, target));
        }
        continue;
      }
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(target, file.content, "utf8");
      written.push(path.relative(ROOT, target));
    }
  }
}

if (checkOnly) {
  if (stale.length > 0) {
    throw new Error(
      `Physics XI academic documents are missing or out of date:\n  ${stale.join(
        "\n  "
      )}\nRun: node scripts/generate-physics-academic-docs.mjs`
    );
  }
  console.log(
    `Validated ${dataset.units.length} Physics XI academic documents in ${TARGET_DIRS.length} trees.`
  );
} else {
  console.log(
    `Generated ${written.length} Physics XI academic document files (${dataset.units.length} units × html/doc × ${TARGET_DIRS.length} trees).`
  );
}
