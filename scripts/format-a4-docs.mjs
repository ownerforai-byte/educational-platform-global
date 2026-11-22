#!/usr/bin/env node
/**
 * format-a4-docs.mjs — put every rendered study document on A4 paper.
 *
 * The static documents under public/resources/ (and the two long-form guides in
 * public/materials/) are served straight from disk, so their renderer is CSS.
 * `a4-document.css` — the shared sheet — owns page geometry, typography, tables
 * and print rules for all of them.
 *
 * The sheet is authored once at frontend/public/resources/a4-document.css (the
 * tree the Next app serves) and mirrored byte-for-byte into the published tree
 * at public/resources/a4-document.css, so neither tree has to reach outside its
 * own root to find it.
 *
 * This script links the sheet into every document that does not link it yet.
 * It is deliberately additive and repeatable:
 *
 *   - the <link> is inserted at the END of <head>, after any inline <style>, so
 *     the shared A4 rules win over a legacy `max-width: 52em` body block while
 *     the document keeps whatever class-specific styles it still needs;
 *   - files that already link the sheet (directly or through the per-subject
 *     sheet that @imports it) are left byte-identical;
 *   - navigation pages (hubs, mindmaps, workbook sheets, lab UI) are skipped:
 *     they are app surfaces, not paper.
 *
 * Usage:
 *   node scripts/format-a4-docs.mjs           format everything
 *   node scripts/format-a4-docs.mjs --check    report only, exit 1 if unformatted
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHEET = "a4-document.css";

/** Authored copy, and the mirror the published tree links. */
const SHEET_SOURCE = "frontend/public/resources/a4-document.css";
const SHEET_MIRROR = "public/resources/a4-document.css";

/** Document trees that must render as A4 paper. */
const TREES = [
  "frontend/public/resources/physics-xi", // served live by the Next app
  "frontend/public/resources/mathematics-xi",
  "public/resources", // published copy of the resources tree
  "frontend/public/materials", // long-form guides
];

/** Files that are navigation or interactive surfaces, never printed. */
const SKIP = [
  /\/materials\/[A-Z_]+_HUB\.html$/, // subject hubs (tabs, galleries)
  /\/materials\/topics-mindmap\//, // mindmap viewers
  /\/resources\/mathematics-xi\/a4\//, // workbook sheets bring their own sheet css
  /\/resources\/mathematics-xi\/chapters\//, // same workbook sheets
  /^\/(?:frontend\/public|public)\/(?:ad-p-table|engineering|ioe|loksewa)\.html$/,
];

/** Sheets that already resolve to the shared A4 base (directly or via @import). */
const A4_SHEETS = [/a4-document\.css/, /physics-xi-solutions\.css/, /math-xi-solutions\.css/];

/** Interactive markup that must not be forced onto paper. */
const APP_MARKERS = /class="[^"]*(?:rounded-(?:xl|lg|full)|text-xs|mindmap|treemap|subdia|chip)/;

function listHtml(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) out.push(full);
    }
  };
  walk(abs);
  return out;
}

/** The sheet a document in this tree can reach without leaving its root. */
function sheetFor(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  return rel.startsWith("public/") ? SHEET_MIRROR : SHEET_SOURCE;
}

function planned(file) {
  const rel = "/" + path.relative(ROOT, file).split(path.sep).join("/");
  if (SKIP.some((re) => re.test(rel))) return { action: "skip", reason: "not paper" };

  const html = fs.readFileSync(file, "utf8");
  if (APP_MARKERS.test(html)) return { action: "skip", reason: "interactive surface" };
  if (A4_SHEETS.some((re) => re.test(html))) return { action: "ok" };
  if (!/<head>/i.test(html) || !/<\/head>/i.test(html)) return { action: "skip", reason: "no head" };

  const href = path
    .relative(path.dirname(file), path.join(ROOT, sheetFor(file)))
    .split(path.sep)
    .join("/");
  const tag = `<link rel="stylesheet" href="${href}">`;

  // after the last </style> when there is one, so the shared sheet wins the cascade
  const styleEnd = html.lastIndexOf("</style>");
  const headEnd = html.lastIndexOf("</head>");
  const at = styleEnd !== -1 && styleEnd < headEnd ? styleEnd + "</style>".length : headEnd;
  let next = html.slice(0, at) + tag + html.slice(at);

  // bring the viewport meta along if the document predates mobile
  if (!/name="viewport"/i.test(next)) {
    const charset = next.match(/<meta\s+charset=["']?utf-8["']?\s*>/i);
    if (charset) {
      next =
        next.slice(0, charset.index + charset[0].length) +
        '<meta name="viewport" content="width=device-width, initial-scale=1">' +
        next.slice(charset.index + charset[0].length);
    }
  }

  return { action: "link", file, next };
}

function main() {
  const check = process.argv.includes("--check");
  const source = path.join(ROOT, SHEET_SOURCE);
  const mirror = path.join(ROOT, SHEET_MIRROR);
  const sheet = fs.readFileSync(source, "utf8");
  const mirrorStale = !fs.existsSync(mirror) || fs.readFileSync(mirror, "utf8") !== sheet;

  const files = TREES.flatMap(listHtml).sort();
  const linked = [];
  const already = [];
  const skipped = [];

  for (const file of files) {
    const plan = planned(file);
    if (plan.action === "skip") skipped.push([file, plan.reason]);
    else if (plan.action === "ok") already.push(file);
    else {
      linked.push(file);
      if (!check) fs.writeFileSync(plan.file, plan.next, "utf8");
    }
  }

  if (!check && mirrorStale) {
    fs.mkdirSync(path.dirname(mirror), { recursive: true });
    fs.writeFileSync(mirror, sheet, "utf8");
    console.log(`mirrored   ${SHEET_MIRROR}`);
  }

  const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");
  for (const f of linked) console.log(`${check ? "would link" : "linked"}     ${rel(f)}`);
  for (const [f, why] of skipped) console.log(`skipped    ${rel(f)}  (${why})`);

  console.log(
    `\n${check ? "checked" : "formatted"}: ${linked.length} ${
      check ? "missing" : "updated"
    } · ${already.length} already on A4 · ${skipped.length} skipped · ${files.length} html files`,
  );
  if (check && (linked.length || mirrorStale)) process.exit(1);
}

main();
