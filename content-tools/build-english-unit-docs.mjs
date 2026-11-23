#!/usr/bin/env node
/**
 * build-english-unit-docs — generate one self-contained HTML study document
 * per authored class-12 English language-development unit, for the platform's
 * Resources tab (docs catalog → DOC_LOCATIONS → chapter Documents & PDFs).
 *
 * Source: content/notes/concepts/class-12/english/language-development/*.json
 *   (the authored 7-block deep-dive notes; blocks are markdown).
 * Output: frontend/public/materials/english/unit-XX-<slug>.html
 *
 * Additive only — never modifies the source JSONs.
 * Run:  node content-tools/build-english-unit-docs.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC_DIR = "content/notes/concepts/class-12/english/language-development";
const OUT_DIR = "frontend/public/materials/english";

const UNITS = [
  "01-unit-1-critical-thinking",
  "02-unit-2-family",
  "03-unit-3-sports",
  "04-unit-4-technology",
  "05-unit-5-education",
  "06-unit-6-money-and-economy",
  "07-unit-7-humour",
  "08-unit-8-human-culture",
  "09-unit-9-ecology-and-environment",
  "10-unit-10-career-opportunities",
  "11-unit-11-hobbies",
  "12-unit-12-animal-world",
];

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Inline markdown: bold, italics, code — order matters. */
function inline(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

/** Block-level markdown: headings, tables, lists, paragraphs. */
function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^###\s+/.test(line)) {
      out.push(`<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`);
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      out.push(`<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`);
      i++;
      continue;
    }
    if (/^#\s+/.test(line)) {
      out.push(`<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`);
      i++;
      continue;
    }
    // table: a line with | ... | followed by a |---| separator
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const header = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push('<div class="tablewrap"><table><thead><tr>');
      for (const h of header) out.push(`<th>${inline(h)}</th>`);
      out.push("</tr></thead><tbody>");
      for (const r of rows) {
        out.push("<tr>");
        for (const c of r) out.push(`<td>${inline(c)}</td>`);
        out.push("</tr>");
      }
      out.push("</tbody></table></div>");
      continue;
    }
    // list
    if (/^\s*[-*]\s+/.test(line)) {
      out.push("<ul>");
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        out.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i++;
      }
      out.push("</ul>");
      continue;
    }
    // paragraph (skip blanks)
    if (line.trim().length > 0) {
      const para = [];
      while (i < lines.length && lines[i].trim().length > 0 && !/^(#{1,3}\s|\s*[-*]\s|\s*\|)/.test(lines[i])) {
        para.push(lines[i].trim());
        i++;
      }
      out.push(`<p>${inline(para.join(" "))}</p>`);
      continue;
    }
    i++;
  }
  return out.join("\n");
}

const CSS = `
:root { --bg:#fafaf9; --fg:#1c1917; --muted:#57534e; --line:#e7e5e4; --accent:#0f766e; --head:#f5f5f4; }
@media (prefers-color-scheme: dark) {
  :root { --bg:#0c0a09; --fg:#e7e5e4; --muted:#a8a29e; --line:#292524; --accent:#2dd4bf; --head:#1c1917; }
}
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--fg); font-family: Georgia, 'Times New Roman', serif; line-height:1.65; }
main { max-width: 860px; margin: 0 auto; padding: 2.5rem 1.25rem 5rem; }
h1 { font-size: 1.9rem; line-height:1.25; border-bottom: 3px solid var(--accent); padding-bottom: .5rem; margin: 0 0 1.5rem; }
h2 { font-size: 1.35rem; margin: 2.5rem 0 .9rem; color: var(--accent); }
h3 { font-size: 1.08rem; margin: 1.6rem 0 .5rem; }
p { margin: .7rem 0; }
ul { margin: .5rem 0 .9rem 1.2rem; padding: 0; }
li { margin: .3rem 0; }
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: .85em; background: var(--head); padding: .1em .35em; border-radius: 4px; }
.tablewrap { overflow-x: auto; margin: 1rem 0 1.4rem; }
table { border-collapse: collapse; width: 100%; font-size: .93rem; }
th, td { border: 1px solid var(--line); padding: .5rem .7rem; text-align: left; vertical-align: top; }
th { background: var(--head); font-family: ui-sans-serif, system-ui, sans-serif; font-size: .82rem; text-transform: uppercase; letter-spacing: .04em; }
tbody tr:nth-child(odd) { background: color-mix(in srgb, var(--head) 45%, transparent); }
footer { margin-top: 4rem; padding-top: 1rem; border-top: 1px solid var(--line); color: var(--muted); font-size: .8rem; font-family: ui-sans-serif, system-ui, sans-serif; }
`;

function pageHtml(doc) {
  const body = doc.notes.map(mdToHtml).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(doc.title)} — NEB Class 12 English</title>
<style>${CSS}</style>
</head>
<body>
<main>
<h1>${esc(doc.title)}</h1>
${body}
<footer>NEB Class 12 English · ${esc(doc.title)} · authored deep-dive study notes for the ${esc(doc.unitSlug)} unit.</footer>
</main>
</body>
</html>
`;
}

mkdirSync(OUT_DIR, { recursive: true });
for (const slug of UNITS) {
  const file = path.join(SRC_DIR, `${slug}.json`);
  const doc = JSON.parse(readFileSync(file, "utf-8"));
  const out = path.join(OUT_DIR, `${slug}.html`);
  writeFileSync(out, pageHtml(doc), "utf-8");
  const chars = doc.notes.reduce((s, n) => s + n.length, 0);
  console.log(`${path.basename(out)}: ${doc.title} (${doc.notes.length} blocks, ${chars} chars)`);
}
console.log("done");
