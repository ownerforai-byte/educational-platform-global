#!/usr/bin/env node
/**
 * paperize-language-notes.mjs — turn the two language note apps into paper.
 *
 * materials/WRITING_HUB.html (English) and materials/NEPALI_HUB.html were built
 * as dark screen apps: a sticky sidebar, one tab rendered at a time, a navy
 * palette and quiz controls. They are study notes, not navigation surfaces, so
 * they belong on the same A4 page contract as every other resource document.
 *
 * This script, idempotently:
 *
 *   1. converts the sidebar's links into a printed contents list and drops the
 *      sidebar itself,
 *   2. makes every tab section visible at once (paper has no tabs),
 *   3. replaces the dark inline stylesheet with language-notes.css, and
 *   4. removes what only worked on screen: scripts, event handlers, inputs,
 *      score bars and "check" buttons, plus the dark palette's inline colours.
 *
 * Typography is rewritten from px to pt so the words keep their intended
 * hierarchy on the 9.6pt paper body. Then scripts/format-a4-docs.mjs links the
 * A4 sheet and the paginator, and a4-paginate.js lays the document out as pages.
 *
 * Usage: node scripts/paperize-language-notes.mjs [--check]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NOTES = ["frontend/public/materials/WRITING_HUB.html", "frontend/public/materials/NEPALI_HUB.html"];
const MARKER = 'data-paper="language-notes"';

/** Dark palette → paper palette. Property independent; applied to style="…". */
const PALETTE = [
  // surfaces
  ["#0a0e17", "#ffffff"],
  ["#0f1420", "#f5f7fb"],
  ["#111827", "#f5f7fb"],
  ["#131a28", "#f5f7fb"],
  ["#16203a", "#f7f8fb"],
  ["#1b2333", "#f5f7fb"],
  ["#1d2740", "#f5f7fb"],
  ["#12201a", "#f1f8f4"],
  ["#1a1212", "#fdf4f4"],
  ["#5c1e1e", "#fdf0f0"],
  // rules and borders
  ["#232c44", "#d3d8e0"],
  ["#2c3752", "#d3d8e0"],
  ["#2547a8", "#e6eef9"],
  // text
  ["#cdd6e8", "#14161a"],
  ["#8ea0c0", "#565d68"],
  ["#7ea6ff", "#0b4f9c"],
  ["#9db9ff", "#0b4f9c"],
  ["#4cc38a", "#0f5c3c"],
  ["#6fd3b8", "#0f5c3c"],
  ["#ffd166", "#7a3b00"],
  ["#ff6b6b", "#8c2222"],
  ["#ff9c9c", "#8c2222"],
  ["#128161", "#eef7f2"],
  ["#128220", "#eef7f2"],
  ["#127919", "#eef7f2"],
];

const pxToPt = (px) => {
  const pt = Math.round(Number(px) * 0.75 * 10) / 10;
  return Math.min(Math.max(pt, 6), 20);
};

function rewriteInlineStyles(html) {
  return html.replace(/style="([^"]*)"/g, (whole, body) => {
    const kept = [];

    for (const piece of body.split(";")) {
      const decl = piece.trim();
      if (!decl) continue;

      const [rawProp, ...rest] = decl.split(":");
      const prop = (rawProp ?? "").trim().toLowerCase();
      let value = rest.join(":").trim();
      if (!prop || !value) continue;

      // screen-only layout that breaks paper flow
      if (prop === "white-space") continue;
      if (prop === "cursor") continue;
      if (prop === "position" && /sticky|fixed/.test(value)) continue;
      if (prop === "overflow" && /auto|scroll|hidden/.test(value)) continue;

      // px → pt so the type sits on the paper scale
      if (prop === "font-size" && /px$/.test(value)) {
        value = `${pxToPt(parseFloat(value))}pt`;
      }

      let done = false;
      for (const [dark, paper] of PALETTE) {
        if (value.toLowerCase().includes(dark)) {
          value = value.replace(new RegExp(dark, "gi"), paper);
          done = true;
        }
      }

      // white is text on the old dark header rows, background almost never
      if (prop === "color" && /^#fff(f{3})?$/i.test(value.trim())) value = "#14161a";

      if (!done && prop === "background" && /#fff/i.test(value)) value = "#ffffff";

      kept.push(`${prop}:${value.replace(/\s+/g, " ")}`);
    }

    return kept.length ? `style="${kept.join(";")}"` : "";
  });
}

function buildToc(navHtml) {
  const items = [...navHtml.matchAll(/<a[^>]*class="[^"]*nav-item[^"]*"[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  if (!items.length) return "";

  const rows = items
    .map(([, id, label]) => {
      const text = label.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      return `      <li><a href="#${id}">${text}</a></li>`;
    })
    .join("\n");

  return `<nav class="notation-toc">
  <b>Contents — every section of this note</b>
  <ol>
${rows}
  </ol>
</nav>

`;
}

function paperize(rel) {
  const file = path.join(ROOT, rel);
  const html = fs.readFileSync(file, "utf8");

  if (html.includes(MARKER)) return { rel, action: "already paper", changed: false };

  const navMatch = html.match(/<nav>([\s\S]*?)<\/nav>/);
  const toc = navMatch ? buildToc(navMatch[1]) : "";

  let next = html
    // the sidebar is replaced by the printed contents list
    .replace(/<nav>[\s\S]*?<\/nav>\s*/, "")
    // the dark screen stylesheet gives way to the paper sheet
    .replace(/<style>[\s\S]*?<\/style>\s*/, '<link rel="stylesheet" href="language-notes.css">\n')
    // no scripts on paper: tabs, quizzes and score bars are screen machinery
    .replace(/<script[\s\S]*?<\/script>\s*/g, "")
    // every section visible, no tab state
    .replace(/class="page show"/g, 'class="page"')
    // details closed on screen must be open on paper
    .replace(/<details(?![^>]*\bopen\b)/g, "<details open")
    // event handlers without scripts are dead weight
    .replace(/\s+on(?:input|change|click|keyup|keydown)="[^"]*"/g, "")
    // mastery checkboxes and their "mastered" labels carry no meaning on paper
    .replace(/<label[^>]*>\s*<input[^>]*>[^<]*<\/label>\s*/g, "")
    .replace(/<input[^>]*>\s*/g, "");

  next = rewriteInlineStyles(next);

  // the contents list opens the document
  next = next.replace(/(<main[^>]*>\s*)/, `$1${toc}`);

  // the app shell and its <main> only existed to host the sidebar: on paper the
  // sections are top-level blocks, so the paginator can break between them
  next = next
    .replace(/<div id="app">\s*/, "")
    .replace(/<main[^>]*>\s*/, "")
    .replace(/\s*<\/main>\s*<\/div>\s*(?=<\/body>)/, "\n");

  // mark it, and put the paper class on the body
  next = next
    .replace(/<html([^>]*)>/, `<html$1 ${MARKER}>`)
    .replace(/<body([^>]*)>/, (whole, attrs) =>
      /class="/.test(attrs)
        ? `<body${attrs.replace(/class="([^"]*)"/, 'class="$1 language-note"')}>`
        : `<body${attrs} class="language-note">`,
    );

  return { rel, action: "paperized", changed: true, next, file };
}

const check = process.argv.includes("--check");
let changed = 0;

for (const rel of NOTES) {
  const result = paperize(rel);
  if (!result.changed) {
    console.log(`ok         ${rel} (already paper)`);
    continue;
  }
  changed++;
  if (!check) {
    fs.writeFileSync(result.file, result.next, "utf8");
    console.log(`paperized  ${rel}`);
  } else {
    console.log(`would paperize ${rel}`);
  }
}

console.log(
  `\n${check ? "checked" : "done"}: ${changed} of ${NOTES.length} language notes converted · ` +
    `next: node scripts/format-a4-docs.mjs`,
);
if (check && changed) process.exit(1);
