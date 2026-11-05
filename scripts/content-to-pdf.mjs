#!/usr/bin/env node
/**
 * Render every study-content JSON under `content/` as a printable A4 PDF
 * handout, in the style of a bound exercise booklet (Exercise 3.1):
 * ruled header, numbered questions, worked solutions, page footers.
 *
 * Two document shapes exist in the corpus and are detected automatically:
 *   notes shape      { title, notes[], numericals[], formulas[], mcs[], summary }
 *   questions shape  { title, examSource?, questions[{ question, solution, … }] }
 *
 * Usage
 *   node scripts/content-to-pdf.mjs                    # whole corpus
 *   node scripts/content-to-pdf.mjs --only=chemistry   # path filter
 *   node scripts/content-to-pdf.mjs --limit=5          # smoke test
 *   node scripts/content-to-pdf.mjs --whatif           # list, write nothing
 *
 * Writes `exports/pdf/<path with content/ stripped>.pdf` and an index.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
// playwright lives in the frontend workspace, not at the repo root
const { chromium } = createRequire(path.join(ROOT, "frontend", "package.json"))(
  "playwright",
);
const OUT = path.join(ROOT, "exports", "pdf");
const WEB = path.join(ROOT, "exports", "web");
/** true while exporting the continuous HTML reading pages instead of PDFs */
let WEB_MODE = false;
/** prev / index / next links injected into the current page */
let NAV = "";
/** "class-11/chemistry" → "Chemistry" */
let SUBJECT_NAMES = new Map();
const args = process.argv.slice(2);
const opt = (name, fallback = null) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const has = (name) => args.includes(`--${name}`);
/** set while re-rendering a document Chrome refused to print with figures */
let DROP_FIGURES = false;
const ONLY = opt("only");
const LIMIT = Number(opt("limit", "0")) || 0;

const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

/* ── corpus walk ─────────────────────────────────────────────────────── */
const SKIP_DIR = new Set(["visuals", "archive", "journal", "ravikishan", "lessons"]);
const SKIP_FILE = new Set(["_index.json", "content-export.json"]);

// markdown lessons are documents too; repo readmes and any .md that already has
// a JSON sibling (the JSON is the authoritative copy) are left alone
const DOC_MD = /^(AGENTS|README)\.md$/i;
function isLessonMd(abs) {
  const name = path.basename(abs);
  if (!name.endsWith(".md") || name.endsWith(".md.json") || DOC_MD.test(name)) return false;
  return !fs.existsSync(abs.replace(/\.md$/, ".json"));
}

function walk(dir, out = [], { all = false } = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      // `all` converts every JSON in the corpus, including figure specs and
      // archived records; the document modes keep their study-content subset
      if (!all && SKIP_DIR.has(entry.name)) continue;
      if (!all && entry.name === "exports") continue;
      walk(path.join(dir, entry.name), out, { all });
    } else if (entry.name.endsWith(".json") && (all || !SKIP_FILE.has(entry.name))) {
      out.push(path.join(dir, entry.name));
    } else if (all && isLessonMd(path.join(dir, entry.name))) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

/* ── offline image cache ─────────────────────────────────────────────── */
// Remote images (Wikimedia) are fetched once and inlined as data URIs, so a
// print job never waits on the network mid-batch.
const IMG = new Map();
const IMG_DIR = path.join(ROOT, "exports", ".imagecache");

// 1×1 transparent GIF, used for figures that never made it into the cache
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

async function primeImages(files, { offline = false } = {}) {
  const urls = new Set();
  for (const f of files) {
    let s = "";
    try {
      s = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const m of s.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) urls.add(m[1]);
  }
  if (!urls.size) return;
  fs.mkdirSync(IMG_DIR, { recursive: true });
  let ok = 0;
  // Wikimedia answers 429 to bursts: one at a time, with backoff.
  for (const url of urls) {
    const key = path.join(IMG_DIR, Buffer.from(url).toString("base64url").slice(0, 80));
    let buf = null;
    let type = "image/png";
    try {
      if (fs.existsSync(key)) {
        buf = fs.readFileSync(key);
        ({ type } = JSON.parse(fs.readFileSync(`${key}.meta`, "utf8")));
      } else if (offline) {
        // cached runs must not reach the network; leave an empty frame instead
        IMG.set(url, BLANK);
        continue;
      } else {
        for (let attempt = 0; attempt < 8 && !buf; attempt += 1) {
          try {
            const res = await fetch(url, {
              redirect: "follow",
              headers: { "user-agent": "Mozilla/5.0 (compatible; notes-export/1.0)" },
              signal: AbortSignal.timeout(30000),
            });
            if (res.ok) {
              type = res.headers.get("content-type") || type;
              buf = Buffer.from(await res.arrayBuffer());
            } else {
              await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
            }
          } catch {
            await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
          }
          if (!buf) await new Promise((r) => setTimeout(r, 1200));
        }
        if (buf) {
          fs.writeFileSync(key, buf);
          fs.writeFileSync(`${key}.meta`, JSON.stringify({ type, url }));
        }
        await new Promise((r) => setTimeout(r, 900));
      }
      if (buf) {
        IMG.set(url, `data:${type};base64,${buf.toString("base64")}`);
        ok += 1;
      } else {
        console.warn(`  ! image ${url}`);
      }
    } catch (err) {
      console.warn(`  ! image ${url}: ${err.message}`);
    }
  }
  console.log(`images: ${ok}/${urls.size} cached`);
}

/* ── math: pre-render LaTeX with KaTeX at build time ─────────────────── */
// Pages stay static and offline: the LaTeX is converted to KaTeX HTML here and
// the KaTeX stylesheet plus its woff2 fonts are copied beside the pages.
const requireFrontend = createRequire(path.join(ROOT, "frontend", "package.json"));
let katex = null;
try {
  katex = requireFrontend("katex");
} catch {
  console.warn("  ! katex unavailable — math will fall back to plain text");
}

const MATH = [];
const mathToken = (tex, display) => {
  if (!katex) return tex;
  let html;
  try {
    // the corpus stores LaTeX with JSON-escaped double backslashes
    const clean = String(tex).trim().replace(/\\\\/g, "\\");
    html = katex.renderToString(clean, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
      output: "html",
    });
  } catch {
    return tex;
  }
  MATH.push(html);
  return `@@KATEX${MATH.length - 1}@@`;
};

/** replace $…$, $$…$$, \(…\) and \[…\] with pre-rendered placeholders */
function protectMath(src) {
  if (!katex) return String(src ?? "");
  let t = String(src ?? "");
  t = t.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => mathToken(tex, true));
  t = t.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) => mathToken(tex, true));
  t = t.replace(/\\\(([\s\S]+?)\\\)/g, (_, tex) => mathToken(tex, false));
  t = t.replace(/(^|[^\\$])\$([^$\n]+?)\$(?!\$)/g, (m, pre, tex) => pre + mathToken(tex, false));
  return t;
}

const restoreMath = (html) =>
  String(html).replace(/@@KATEX(\d+)@@/g, (m, i) => MATH[Number(i)] ?? m);

const KATEX_SRC = path.join(ROOT, "frontend", "node_modules", "katex", "dist");
let ASSET_CSS_VERSION = 0;
/** copy the KaTeX stylesheet + fonts once, next to the generated pages */
async function ensureKatexAssets(baseDir) {
  const dest = path.join(baseDir, "_assets", "katex");
  try {
    if (!katex) return;
    await fs.promises.mkdir(path.join(dest, "fonts"), { recursive: true });
    await fs.promises.copyFile(
      path.join(KATEX_SRC, "katex.min.css"),
      path.join(dest, "katex.min.css"),
    );
    const fonts = await fs.promises.readdir(path.join(KATEX_SRC, "fonts"));
    for (const f of fonts.filter((f) => f.endsWith(".woff2"))) {
      await fs.promises.copyFile(
        path.join(KATEX_SRC, "fonts", f),
        path.join(dest, "fonts", f),
      );
    }
    ASSET_CSS_VERSION = 1;
  } catch (err) {
    console.warn(`  ! katex assets: ${err.message}`);
  }
}

/* ── tiny markdown → html ────────────────────────────────────────────── */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function inline(s) {
  let t = esc(protectMath(s));
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  t = t.replace(
    /\[([^\]]+)\]\((https?:[^)\s]+)\)/g,
    '<a href="$2">$1</a>',
  );
  return t;
}

function mdToHtml(src) {
  const lines = String(protectMath(src) ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const out = [];
  let i = 0;
  let list = null; // "ul" | "ol"
  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced block
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      closeList();
      const lang = (fence[1] || "").toLowerCase();
      const buf = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i += 1;
      const body = buf.join("\n");
      if (lang === "svg") {
        if (!DROP_FIGURES) out.push(`<div class="fig authored">${body}</div>`);
      } else {
        out.push(`<pre><code>${esc(body)}</code></pre>`);
      }
      continue;
    }

    // table
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || "")) {
      closeList();
      const cells = (row) =>
        row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<table><thead><tr>${head
          .map((c) => `<th>${inline(c)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map(
            (r) =>
              `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`,
          )
          .join("")}</tbody></table>`,
      );
      continue;
    }

    // image on its own line
    const img = line.match(/^\s*!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      closeList();
      if (!DROP_FIGURES)
        out.push(
          `<figure><img src="${IMG.get(img[2]) ?? img[2]}" alt="${esc(img[1])}" onerror="this.style.display='none'" />` +
            `<figcaption>${inline(img[1])}</figcaption></figure>`,
        );
      i += 1;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      closeList();
      const level = Math.min(h[1].length + 1, 4); // # → h2 inside a section body
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i += 1;
      continue;
    }

    // hr
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      closeList();
      out.push("<hr />");
      i += 1;
      continue;
    }

    // blockquote
    if (/^\s*>\s?/.test(line)) {
      closeList();
      const buf = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i]))
        buf.push(lines[i++].replace(/^\s*>\s?/, ""));
      out.push(`<blockquote>${mdToHtml(buf.join("\n"))}</blockquote>`);
      continue;
    }

    // lists
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      const want = ul ? "ul" : "ol";
      if (list !== want) {
        closeList();
        out.push(`<${want}>`);
        list = want;
      }
      out.push(`<li>${inline((ul || ol)[1])}</li>`);
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i += 1;
      continue;
    }

    closeList();
    const buf = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4}\s|```|>|\s*[-*+]\s|\s*\d+[.)]\s)/.test(lines[i]) &&
      !/^\s*\|/.test(lines[i])
    )
      buf.push(lines[i++]);
    // never leave the cursor where it was: a stray `|` line, a `#`-less
    // heading remnant, etc. must still be consumed as its own paragraph
    if (!buf.length) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  closeList();
  return restoreMath(out.join("\n"));
}

/* ── document helpers ────────────────────────────────────────────────── */
const asText = (v) =>
  typeof v === "string"
    ? v
    : Array.isArray(v)
      ? v.map(asText).join("\n")
      : v && typeof v === "object"
        ? Object.entries(v)
            .map(([k, val]) =>
              typeof val === "string" ? `**${k}:** ${val}` : asText(val),
            )
            .join("\n\n")
        : String(v ?? "");

const arr = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

function crumbs(rel) {
  // content/notes/concepts/class-11/chemistry/<unit>/<topic>.json → readable chips
  const parts = rel.split(/[\\/]/).filter(Boolean);
  const cls = parts.find((p) => /^class-\d+/.test(p)) || "";
  const subject = parts[parts.indexOf(cls) + 1] || "";
  const topicIdx = parts.findIndex((p) => p === "concepts");
  let unit = "";
  if (topicIdx > -1 && parts.length > topicIdx + 3) unit = parts[parts.length - 2];
  return {
    cls: cls.replace("class-", "Class "),
    subject: subject ? subject[0].toUpperCase() + subject.slice(1) : "",
    unit: unit
      ? unit.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "",
  };
}

/** Race a promise against a guard that is always cleared (a dangling timer
 *  keeps the Node process alive for its full duration). */
async function withWatchdog(promise, ms, label) {
  let timer;
  const guard = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error(label)), ms);
  });
  try {
    return await Promise.race([promise, guard]);
  } finally {
    clearTimeout(timer);
  }
}

const CSS = `
  @page { size: A4; }
  * { box-sizing: border-box; }
  html { background: #fff; }
  body {
    margin: 0; color: #14161a; background: #fff; color-scheme: light;
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 10.5pt; line-height: 1.55;
  }
  .sheet { padding: 0 2mm; }
  header.masthead { border-bottom: 2.5pt double #14161a; padding-bottom: 6pt; margin-bottom: 12pt; }
  .kicker {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 7.8pt; letter-spacing: .14em;
    text-transform: uppercase; color: #6b7280; margin-bottom: 3pt;
  }
  h1.doc { font-size: 20pt; line-height: 1.2; margin: 3pt 0 5pt; font-weight: 700; }
  .meta {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 8.4pt; color: #4b5563;
    display: flex; flex-wrap: wrap; gap: 4pt 10pt;
  }
  .meta span::before { content: "·"; margin-right: 6pt; color: #c3c7cf; }
  .meta span:first-child::before { content: none; margin: 0; }
  h2 {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 12.4pt; margin: 15pt 0 6pt;
    padding-bottom: 3pt; border-bottom: .6pt solid #d6d9de; break-after: avoid;
  }
  h3 { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.8pt; margin: 11pt 0 4pt; break-after: avoid; }
  h4 { font-family: "Segoe UI", Arial, sans-serif; font-size: 10pt; margin: 9pt 0 3pt; break-after: avoid; }
  p { margin: 0 0 6pt; }
  strong { font-weight: 700; }
  em { font-style: italic; }
  a { color: #1d4ed8; text-decoration: none; }
  code {
    font-family: "Consolas", monospace; font-size: 8.8pt; background: #f3f4f6;
    padding: .5pt 2.5pt; border-radius: 2pt;
  }
  pre {
    background: #f7f8fa; border-left: 2pt solid #cbd0d8; padding: 6pt 8pt;
    font-family: "Consolas", monospace; font-size: 8.4pt; line-height: 1.45;
    white-space: pre-wrap; break-inside: avoid; margin: 6pt 0 8pt;
  }
  pre code { background: none; padding: 0; }
  ul, ol { margin: 0 0 7pt; padding-left: 15pt; }
  li { margin-bottom: 2.5pt; }
  table { width: 100%; border-collapse: collapse; margin: 7pt 0 9pt; font-size: 9.2pt; break-inside: avoid; }
  th, td { border: .5pt solid #cfd4dc; padding: 3.5pt 5pt; text-align: left; vertical-align: top; }
  th { background: #eef1f5; font-family: "Segoe UI", Arial, sans-serif; font-size: 8.8pt; }
  blockquote {
    margin: 7pt 0; padding: 6pt 9pt; background: #f6f8fb; border-left: 2.5pt solid #9aa7bd;
    font-size: 9.8pt;
  }
  blockquote p:last-child { margin-bottom: 0; }
  hr { border: 0; border-top: .5pt solid #d6d9de; margin: 10pt 0; }
  figure { margin: 8pt 0 10pt; break-inside: avoid; text-align: center; }
  figure img { max-width: 100%; max-height: 78mm; }
  figcaption { font-family: "Segoe UI", Arial, sans-serif; font-size: 8pt; color: #6b7280; margin-top: 3pt; }
  .fig.authored { text-align: center; margin: 8pt 0 10pt; break-inside: avoid; }
  .fig.authored svg { max-width: 100%; height: auto; }
  .m { font-style: italic; font-family: "Cambria Math", Georgia, serif; }
  section.block { break-inside: auto; }
  .q { break-inside: avoid; margin: 0 0 11pt; padding-left: 24pt; position: relative; }
  .q .n {
    position: absolute; left: 0; top: 0; font-family: "Segoe UI", Arial, sans-serif;
    font-size: 9pt; font-weight: 700; color: #111827;
  }
  .q .stem { margin-bottom: 4pt; }
  .q .sol {
    border-left: 1.6pt solid #b9c2d0; padding: 1pt 0 1pt 8pt; color: #1f2430;
  }
  .q .sol .lbl, .lbl {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 7.6pt; letter-spacing: .1em;
    text-transform: uppercase; color: #6b7280; display: block; margin-bottom: 2pt;
  }
  .tags { font-family: "Segoe UI", Arial, sans-serif; font-size: 7.8pt; color: #6b7280; margin-top: 3pt; }
  .note {
    background: #f7f9fc; border: .5pt solid #dde3ec; border-radius: 2pt;
    padding: 5pt 7pt; margin-top: 4pt; font-size: 9.4pt;
  }
  .mcq { break-inside: avoid; margin-bottom: 9pt; }
  .mcq .opts { margin: 3pt 0 0; padding-left: 14pt; }
  .mcq .opts li { margin-bottom: 1.5pt; }
  .mcq .ans { font-family: "Segoe UI", Arial, sans-serif; font-size: 8.6pt; font-weight: 700; color: #14532d; margin-top: 2pt; }
  .toc-note { font-family: "Segoe UI", Arial, sans-serif; font-size: 8pt; color: #6b7280; margin-top: 10pt; }
`;

/* screen overrides: one continuous rectangular reading column, no page boxes */
const WEB_CSS = `
  @page { size: auto; margin: 0; }
  html, body { background: #e9ebef; }
  body { margin: 0; font-size: 11.5pt; }
  .sheet {
    max-width: 900px; margin: 0 auto; padding: 30px 54px 52px; background: #fff;
    border: 1px solid #e1e5eb; box-shadow: 0 2px 14px rgba(17, 24, 39, .06);
  }
  header.masthead {
    position: sticky; top: 0; z-index: 3; background: #fff; padding-top: 6px;
  }
  h2 { break-after: auto; }
  .q, .mcq, figure, pre, table, .fig.authored, section.block, .note { break-inside: auto; }
  .q:hover .n { color: #1d4ed8; }
  .pager {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    margin-top: 34px; padding-top: 12px; border-top: .5pt solid #d6d9de;
    font-family: "Segoe UI", Arial, sans-serif; font-size: 9pt; color: #4b5563;
  }
  .pager a {
    max-width: 42%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .pager a:hover { text-decoration: underline; }
  .pager .mid { flex: 0 0 auto; color: #6b7280; letter-spacing: .04em; }
  @media (max-width: 760px) {
    .sheet { padding: 20px 18px 36px; border: 0; }
    .pager { font-size: 8.4pt; }
  }
  /* literal JSON view: one section per key, compact label/value pairs */
  section.field { margin: 30px 0 0; }
  section.field > h2 {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5pt; letter-spacing: .1em;
    text-transform: uppercase; color: #6b7280; margin: 0 0 8px;
    border-bottom: .5pt solid #e5e7eb; padding-bottom: 5px;
  }
  dl.obj { margin: 0; }
  dl.obj > div.kv { margin: 10px 0 0; }
  dl.obj > div.kv > dt, .kv > .k {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 8.6pt; letter-spacing: .08em;
    text-transform: uppercase; color: #8b93a1; margin: 0 0 3px;
  }
  dd { margin: 0; }
  .item { display: flex; gap: 9px; margin: 8px 0; }
  .item > .idx { color: #9aa1ac; font-size: 9pt; min-width: 1.4em; padding-top: 2px; }
  .item > .body { flex: 1 1 auto; min-width: 0; }
  section.field ul { margin: 6px 0; padding-left: 20px; }
  section.field ul li { margin: 4px 0; }
  p.empty { color: #b6bcc6; margin: 4px 0; }
  /* labelled diagrams embedded from the record */
  figure.diagram {
    margin: 14px 0; padding: 12px; border: .5pt solid #dfe3e8; background: #fbfcfd;
    break-inside: avoid;
  }
  figure.diagram svg, figure.diagram img {
    display: block; margin: 0 auto; max-width: 100%; height: auto;
  }
  figure.diagram figcaption {
    font-family: "Segoe UI", Arial, sans-serif; font-size: 8.6pt; color: #5b6472;
    margin-top: 8px; text-align: center;
  }
  /* KaTeX sizing inside prose */
  .katex { font-size: 1.02em; }
  .katex-display { margin: 12px 0; overflow-x: auto; overflow-y: hidden; }
`;

/** Windows caps paths at 260 chars; shorten the leaf and keep it unique. */
function outPathFor(relPosix, baseDir = OUT, ext = ".pdf") {
  const rel = relPosix.replace(/\.(json|md)$/, ext);
  const abs = path.join(baseDir, rel);
  if (abs.length <= 240) return abs;
  const parts = rel.split("/");
  const base = parts.pop().replace(/\.\w+$/, "");
  const dir = parts.join("/");
  const hash = Buffer.from(rel).toString("base64url").replace(/[^a-z0-9]/gi, "").slice(0, 6);
  const room = Math.max(24, 240 - path.join(baseDir, dir).length - 8 - hash.length);
  return path.join(baseDir, dir, `${base.slice(0, room)}-${hash}${ext}`);
}

let ASSET_HREF = "";

function shell({ crumbLine, title, meta, body }) {
  return `<!doctype html><html><head><meta charset="utf-8">${
    WEB_MODE ? `<title>${esc(title)}</title><meta name="viewport" content="width=device-width, initial-scale=1">` : ""
  }${
    ASSET_HREF ? `<link rel="stylesheet" href="${esc(ASSET_HREF)}">` : ""
  }<style>${CSS}${
    WEB_MODE ? WEB_CSS : ""
  }</style></head>
<body><div class="sheet">
  <header class="masthead">
    <div class="kicker">${esc(crumbLine)}</div>
    <h1 class="doc">${esc(title)}</h1>
    <div class="meta">${meta.map((m) => `<span>${esc(m)}</span>`).join("")}</div>
  </header>
  ${body}
  ${NAV}
</div></body></html>`;
}

/* ── shape renderers ─────────────────────────────────────────────────── */
function renderNotes(doc, rel) {
  const c = crumbs(rel);
  const body = [];

  const notes = arr(doc.notes);
  if (notes.length) {
    body.push('<section class="block">');
    for (const n of notes) body.push(mdToHtml(asText(n)));
    body.push("</section>");
  }

  const numericals = arr(doc.numericals ?? doc.numerical);
  if (numericals.length) {
    body.push("<h2>Worked numericals</h2>");
    numericals.forEach((n, k) => {
      body.push(
        `<div class="q"><span class="n">${k + 1}.</span>${mdToHtml(asText(n))}</div>`,
      );
    });
  }

  const formulas = arr(doc.formulas);
  if (formulas.length) {
    body.push("<h2>Formulas</h2>");
    for (const f of formulas) body.push(mdToHtml(asText(f)));
  }

  const mcs = arr(doc.mcs).concat(arr(doc.mcqs));
  if (mcs.length) {
    body.push("<h2>Multiple choice</h2>");
    mcs.forEach((m, k) => {
      if (typeof m === "string") {
        body.push(`<div class="mcq">${mdToHtml(m)}</div>`);
        return;
      }
      const opts = arr(m.options);
      body.push(`<div class="mcq"><div><strong>${k + 1}.</strong> ${inline(asText(m.question ?? ""))}</div>`);
      if (opts.length)
        body.push(
          `<ol class="opts" type="A">${opts
            .map((o) => `<li>${inline(asText(o))}</li>`)
            .join("")}</ol>`,
        );
      if (m.answer) body.push(`<div class="ans">Answer: ${esc(asText(m.answer))}</div>`);
      if (m.explanation)
        body.push(`<div class="note">${mdToHtml(asText(m.explanation))}</div>`);
      body.push("</div>");
    });
  }

  const summary = arr(doc.summary);
  if (summary.length) {
    body.push("<h2>Summary</h2>");
    for (const s of summary) body.push(mdToHtml(asText(s)));
  }

  const keyPoints = arr(doc.keyPoints);
  if (keyPoints.length) {
    body.push("<h2>Key points</h2>");
    for (const s of keyPoints) body.push(mdToHtml(asText(s)));
  }

  if (!body.length) body.push("<p>No content fields found in this record.</p>");

  const meta = [c.cls, c.subject, c.unit, doc.source === "authored-v2" ? "Authored notes" : null]
    .filter(Boolean);
  return shell({
    crumbLine: [c.cls, c.subject, c.unit].filter(Boolean).join("  /  ") || "Notes",
    title: doc.title || doc.topicTitle || path.basename(rel, ".json"),
    meta,
    body: body.join("\n"),
  });
}

function renderQuestions(doc, rel) {
  const c = crumbs(rel);
  const qs = arr(doc.questions);
  const body = [];
  const totalMarks = qs.reduce((s, q) => s + (Number(q?.marks) || 0), 0);

  body.push("<h2>Questions</h2>");
  qs.forEach((q, k) => {
    const bits = [];
    if (q.type) bits.push(String(q.type));
    if (q.marks) bits.push(`${q.marks} mark${Number(q.marks) === 1 ? "" : "s"}`);
    if (q.difficulty) bits.push(String(q.difficulty));
    const sol = asText(q.solution ?? "");
    const note = asText(q.knowledgeNote ?? q.concept ?? q.hint ?? "");
    body.push(
      `<div class="q"><span class="n">${k + 1}.</span>` +
        `<div class="stem">${mdToHtml(asText(q.question ?? ""))}</div>` +
        (bits.length ? `<div class="tags">${esc(bits.join("  ·  "))}</div>` : "") +
        (sol.trim()
          ? `<div class="sol"><span class="lbl">Solution</span>${mdToHtml(sol)}</div>`
          : "") +
        (note.trim() ? `<div class="note">${mdToHtml(note)}</div>` : "") +
        `</div>`,
    );
  });
  if (!qs.length) body.push("<p>No questions in this record.</p>");

  const meta = [
    c.cls,
    c.subject,
    c.unit,
    doc.examSource,
    doc.year ? String(doc.year) : null,
    qs.length ? `${qs.length} questions` : null,
    totalMarks ? `${totalMarks} marks` : null,
  ].filter(Boolean);

  return shell({
    crumbLine: [c.cls, c.subject, c.unit].filter(Boolean).join("  /  ") || "Practice",
    title: doc.title || path.basename(rel, ".json"),
    meta,
    body: body.join("\n"),
  });
}

function render(rel, doc) {
  // some guide files are a bare markdown string
  if (typeof doc === "string") {
    const c = crumbs(rel);
    const [first, ...rest] = doc.split(/\r?\n/);
    const heading = first.replace(/^#+\s*/, "").trim();
    return shell({
      crumbLine: [c.cls, c.subject, c.unit].filter(Boolean).join("  /  ") || "Guide",
      title: heading || path.basename(rel, ".json"),
      meta: [c.cls, c.subject].filter(Boolean),
      body: mdToHtml(rest.join("\n")),
    });
  }
  if (Array.isArray(doc?.questions)) return renderQuestions(doc, rel);
  if (Array.isArray(doc?.notes) || doc?.notes) return renderNotes(doc, rel);
  // anything else is rendered field by field so nothing is lost
  return renderLiteral(rel, doc);
}

/* ── literal JSON → HTML, full fidelity ─────────────────────────────── */
// Nothing is dropped: every key, every array element and every nested object in
// the record is rendered, so the page is the JSON in readable form.
const labelOf = (key) =>
  String(key)
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b(id|url|slug|neb|pyq|mcq|mcqs)\b/gi, (m) => m.toUpperCase())
    .replace(/^./, (c) => c.toUpperCase());

const DIAGRAM_KEYS = ["diagram", "diagramSvg", "figureSvg", "visualSvg"];
const CAPTION_KEYS = ["diagramCaption", "figureCaption", "diagramTitle"];

/** a labelled figure: an inline <svg> authored in the record, or a cached image */
function diagramHtml(obj) {
  if (!obj || typeof obj !== "object") return "";
  const svg = DIAGRAM_KEYS.map((k) => obj[k]).find(
    (v) => typeof v === "string" && v.trim().startsWith("<svg"),
  );
  const src = ["figure", "image", "img", "diagramUrl"]
    .map((k) => obj[k])
    .find((v) => typeof v === "string" && v.trim());
  const caption = CAPTION_KEYS.map((k) => obj[k]).find((v) => typeof v === "string" && v.trim()) || "";
  if (!svg && !src) return "";
  const media = svg
    ? svg
    : `<img src="${esc(IMG.get(src) ?? src)}" alt="${esc(caption)}" onerror="this.style.display='none'" />`;
  return `<figure class="diagram">${media}${
    caption ? `<figcaption>${inline(caption)}</figcaption>` : ""
  }</figure>`;
}

const isQuestionish = (v) =>
  v && typeof v === "object" && !Array.isArray(v) && typeof v.question === "string";

const para = (s) => mdToHtml(String(s));
const inlineOnly = (s) => para(s).replace(/^\s*<p>/, "").replace(/<\/p>\s*$/, "");

function litFields(obj, skip = []) {
  const hidden = skip.concat(DIAGRAM_KEYS, CAPTION_KEYS);
  return (
    Object.entries(obj)
      .filter(([k]) => !hidden.includes(k) && obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
      .map(
        ([k, v]) =>
          `<div class="kv"><div class="k">${esc(labelOf(k))}</div><div class="v">${litValue(v, 1)}</div></div>`,
      )
      .join("") + diagramHtml(obj)
  );
}

function litValue(v, depth = 0) {
  if (v === undefined || v === null || v === "") return '<p class="empty">—</p>';
  if (typeof v === "string") return para(v);
  if (typeof v === "number" || typeof v === "boolean")
    return `<p><code>${esc(String(v))}</code></p>`;
  if (Array.isArray(v)) {
    if (!v.length) return '<p class="empty">—</p>';
    if (v.every((x) => typeof x === "string"))
      return `<ul>${v.map((x) => `<li>${inlineOnly(x)}</li>`).join("")}</ul>`;
    if (v.every(isQuestionish))
      return v
        .map(
          (q, i) =>
            `<div class="q"><span class="n">${i + 1}.</span><div class="stem">${para(
              asText(q.question),
            )}</div>${litFields(q, ["question"])}</div>`,
        )
        .join("");
    return v
      .map(
        (x, i) =>
          `<div class="item"><span class="idx">${i + 1}.</span><div class="body">${litValue(
            x,
            depth + 1,
          )}</div></div>`,
      )
      .join("");
  }
  const entries = Object.entries(v);
  if (!entries.length) return '<p class="empty">—</p>';
  return `<dl class="obj">${entries
    .filter(([, x]) => x !== undefined && x !== null && x !== "")
    .map(([k, x]) => `<div class="kv"><dt>${esc(labelOf(k))}</dt><dd>${litValue(x, depth + 1)}</dd></div>`)
    .join("")}</dl>`;
}

// keys promoted into the masthead instead of repeated as a body field
const TITLE_KEYS = ["title", "topicTitle"];

const titleCase = (s) => (s ? s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) : "");

// class / subject / unit chips for the masthead; markdown lessons live outside
// a class folder, so they are labelled from their own path
function crumbPieces(rel) {
  const parts = String(rel).split(/[\\/]/).filter(Boolean);
  const ci = parts.findIndex((p) => /^class-\d+$/.test(p));
  if (ci >= 0)
    return {
      cls: parts[ci].replace("class-", "Class "),
      subject: titleCase(parts[ci + 1]),
      unit: parts.length > ci + 3 ? titleCase(parts[parts.length - 2]) : "",
    };
  const lm = LESSON.exec(String(rel));
  if (lm) return { cls: "Class 11", subject: titleCase(lm[1]), unit: "Lessons" };
  return { cls: "", subject: titleCase(parts[1] || ""), unit: "" };
}

function renderLiteral(rel, doc) {
  const c = crumbPieces(rel);
  const fallback = path.basename(rel, ".json");
  let title = fallback;
  let body;

  if (typeof doc === "string") {
    const [first, ...rest] = doc.split(/\r?\n/);
    const heading = first.replace(/^#+\s*/, "").trim();
    title = heading || fallback;
    body = mdToHtml([rest.join("\n") || first].join("\n"));
  } else if (Array.isArray(doc)) {
    const first = doc.find((x) => x && typeof x === "object" && (x.title || x.question));
    title = doc.title || first?.title || first?.question || fallback;
    if (typeof title !== "string") title = fallback;
    body = `<section class="field">${litValue(doc)}</section>`;
  } else {
    title = asText(doc?.title || doc?.topicTitle || fallback) || fallback;
    const entries = Object.entries(doc ?? {}).filter(([k]) => !TITLE_KEYS.includes(k));
    body = entries
      .map(
        ([k, v]) =>
          `<section class="field"><h2>${esc(labelOf(k))}</h2>${
            DIAGRAM_KEYS.includes(k) && typeof v === "string" && v.trim().startsWith("<svg")
              ? diagramHtml(doc)
              : litValue(v)
          }</section>`,
      )
      .join("\n");
    if (!body) body = '<p class="empty">This record has no fields.</p>';
  }

  const meta = [c.cls, c.subject, c.unit].filter(Boolean);
  return shell({
    crumbLine: [c.cls, c.subject, c.unit].filter(Boolean).join("  /  ") || "Content record",
    title,
    meta,
    body,
  });
}

/* ── continuous HTML (“stream”) export ──────────────────────────────── */
// Every record becomes one scrollable page at the mirrored path: same masthead
// and body as the handout, but one continuous rectangle, chained to its
// neighbours in the unit so a reader can flow through a whole topic.
const readDoc = (f) =>
  f.endsWith(".md") ? fs.readFileSync(f, "utf8") : JSON.parse(fs.readFileSync(f, "utf8"));

const titleOf = (rel, doc) => {
  if (typeof doc === "string") {
    const first = (doc.split(/\r?\n/, 1)[0] || "").replace(/^#+\s*/, "").trim();
    if (first) return first;
  } else {
    const t = doc?.title || doc?.topicTitle;
    if (t) return String(t);
  }
  return path.basename(rel, ".json");
};

const clip = (s, n = 46) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const TYPE_ORDER = ["notes", "practice", "pyqs", "drills", "formulas", "practicals", "resources"];
const TYPE_LABEL = {
  notes: "Notes",
  practice: "Practice & solutions",
  pyqs: "Past questions",
  drills: "Drills",
  formulas: "Formulas",
  practicals: "Practicals",
  resources: "Resources",
};
const pretty = (slug) =>
  String(slug || "")
    .replace(/[-_]/g, " ")
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());

/** where a record sits in the curriculum: class → subject → unit → type */
const LESSON = /^notes\/lessons\/([a-z0-9-]+)\//;
function locate(rel) {
  const lesson = LESSON.exec(String(rel));
  if (lesson)
    return {
      cls: "class-11",
      subject: lesson[1],
      unit: "Lessons",
      type: "lessons",
      key: `class-11/${lesson[1]}`,
      hub: `subjects/class-11-${lesson[1]}.html`,
    };
  const parts = String(rel).split("/");
  const ci = parts.findIndex((s) => /^class-\d+$/.test(s));
  const cls = ci >= 0 ? parts[ci] : "general";
  // loose files directly under a top-level folder belong to a shared library
  const subject = ci >= 0 ? parts[ci + 1] || "misc" : parts.length > 2 ? parts[1] : "library";
  const dirs = ci >= 0 ? parts.slice(ci + 2, -1) : parts.slice(2, -1);
  return {
    cls,
    subject,
    unit: dirs[0] || "",
    // a file sitting directly in content/ has no type folder
    type: parts.length > 1 ? parts[0] : "resources",
    key: `${cls}/${subject}`,
    hub: `subjects/${cls}-${subject}.html`,
  };
}

/** unit + subject order, read from the curriculum source of truth */
function readSyllabus() {
  const plan = { subjects: new Map(), units: new Map(), titles: new Map(), names: new Map() };
  let lines = [];
  try {
    lines = fs
      .readFileSync(path.join(ROOT, "frontend", "lib", "syllabus.ts"), "utf8")
      .split(/\r?\n/);
  } catch {
    return plan;
  }
  let cls = null;
  let subject = null;
  let unit = null;
  let m;
  for (const line of lines) {
    if ((m = /^ {4}slug: "class-(\d+)-notes"/.exec(line))) {
      cls = `class-${m[1]}`;
      subject = null;
      unit = null;
      continue;
    }
    if (cls && (m = /^ {8}slug: "([a-z0-9-]+)"/.exec(line))) {
      subject = m[1];
      unit = null;
      plan.subjects.set(cls, [...(plan.subjects.get(cls) ?? []), subject]);
      continue;
    }
    if (subject && (m = /^ {8}name: "([^"]+)"/.exec(line))) {
      plan.names.set(`${cls}/${subject}`, m[1]);
      continue;
    }
    if (subject && (m = /^ {12}id: "([a-z0-9-]+)"/.exec(line))) {
      unit = m[1];
      const key = `${cls}/${subject}`;
      plan.units.set(key, [...(plan.units.get(key) ?? []), unit]);
      continue;
    }
    if (unit && (m = /^ {12}title: "([^"]+)"/.exec(line))) {
      plan.titles.set(`${cls}/${subject}/${unit}`, m[1]);
    }
  }
  return plan;
}

const HUB_CSS = `
  :root { color-scheme: light; }
  body { font: 15px/1.6 Georgia, "Times New Roman", serif; max-width: 900px; margin: 0 auto;
    padding: 28px 22px 64px; color: #14161a; background: #fff; }
  a { color: #1d4ed8; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .kicker { font-family: "Segoe UI", Arial, sans-serif; font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; color: #6b7280; }
  h1 { font-size: 30px; line-height: 1.15; margin: 6px 0 8px; }
  .lede { color: #4b5563; margin: 0 0 26px; font-size: 13.5px; }
  .blocks { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px; }
  .block { display: block; border: 1px solid #e1e5eb; border-radius: 4px; padding: 14px 16px;
    background: #fff; box-shadow: 0 1px 2px rgba(17,24,39,.04); }
  .block:hover { border-color: #b9c2d0; text-decoration: none; }
  .block .cls { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5px; letter-spacing: .12em;
    text-transform: uppercase; color: #6b7280; }
  .block .subj { font-size: 20px; margin: 4px 0 8px; }
  .block .meta { font-family: "Segoe UI", Arial, sans-serif; font-size: 11.5px; color: #4b5563; }
  .block .types { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5px; color: #8b93a1;
    margin-top: 6px; }
  section.unit { margin: 34px 0 0; }
  section.unit > h2 { font-family: "Segoe UI", Arial, sans-serif; font-size: 15px; margin: 0 0 2px;
    border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
  section.unit > h2 .n { color: #6b7280; font-weight: 400; margin-right: 8px; }
  section.unit > h2 em { float: right; font-style: normal; color: #9aa1ac; font-size: 11.5px; }
  h3 { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5px; letter-spacing: .1em;
    text-transform: uppercase; color: #6b7280; margin: 16px 0 4px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { padding: 4px 0; border-bottom: 1px dotted #eef0f3; display: flex; gap: 10px;
    align-items: baseline; justify-content: space-between; }
  li code { font-size: 11px; color: #9aa1ac; white-space: nowrap; }
  .back { font-family: "Segoe UI", Arial, sans-serif; font-size: 12px; margin-bottom: 22px; }
  .foot { margin-top: 46px; padding-top: 12px; border-top: 1px solid #e5e7eb;
    font-family: "Segoe UI", Arial, sans-serif; font-size: 11.5px; color: #8b93a1; }
`;

async function exportWeb(files) {
  WEB_MODE = true;
  // `--inplace` writes each page next to its JSON inside content/ instead of the
  // exports/web mirror, so the HTML sits at its own content path
  const inplace = has("inplace");
  const BASE = inplace ? path.join(ROOT, "content") : WEB;
  const SUBDIR = inplace ? "_subjects" : "subjects";
  fs.mkdirSync(BASE, { recursive: true });
  await ensureKatexAssets(BASE);
  if (!has("no-prime")) await primeImages(files, { offline: has("offline") });
  const plan = readSyllabus();
  SUBJECT_NAMES = plan.names;

  // pass 1 — titles and output paths, so the pager can name its neighbours
  const entries = [];
  for (const f of files) {
    const rel = path.relative(path.join(ROOT, "content"), f).split(path.sep).join("/");
    let doc;
    try {
      doc = readDoc(f);
    } catch (err) {
      console.warn(`  ! parse ${rel}: ${err.message}`);
      continue;
    }
    if (doc === null || doc === undefined) continue;
    const loc = locate(rel);
    const out = outPathFor(rel, BASE, ".html");
    entries.push({
      f,
      rel,
      dir: path.posix.dirname(rel),
      title: titleOf(rel, doc),
      out,
      outRel: path.relative(BASE, out).split(path.sep).join("/"),
      ...loc,
      hub: `${SUBDIR}/${loc.cls}-${loc.subject}.html`,
    });
  }

  const byDir = new Map();
  for (const e of entries) {
    if (!byDir.has(e.dir)) byDir.set(e.dir, []);
    byDir.get(e.dir).push(e);
  }
  const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true });
  for (const list of byDir.values()) list.sort((a, b) => natural(a.rel, b.rel));

  const link = (fromOutRel, toOutRel) =>
    path.posix.relative(path.posix.dirname(fromOutRel), toOutRel);

  let done = 0;
  for (const e of entries) {
    let doc;
    try {
      doc = readDoc(e.f);
    } catch {
      continue;
    }
    const siblings = byDir.get(e.dir);
    const at = siblings.indexOf(e);
    const prev = siblings[at - 1];
    const next = siblings[at + 1];
    // the middle link opens the document's own subject hub, not a global list
    const home = link(e.outRel, e.hub);
    NAV =
      '<nav class="pager">' +
      (prev
        ? `<a href="${esc(link(e.outRel, prev.outRel))}" title="${esc(prev.title)}">‹ ${esc(clip(prev.title))}</a>`
        : "<span></span>") +
      `<a class="mid" href="${esc(home)}">${esc(SUBJECT_NAMES.get(e.key) || pretty(e.subject))}</a>` +
      (next
        ? `<a href="${esc(link(e.outRel, next.outRel))}" title="${esc(next.title)}">${esc(clip(next.title))} ›</a>`
        : "<span></span>") +
      "</nav>";
    ASSET_HREF = ASSET_CSS_VERSION
      ? path.posix.relative(path.posix.dirname(e.outRel), "_assets/katex/katex.min.css")
      : "";
    try {
      fs.mkdirSync(path.dirname(e.out), { recursive: true });
      fs.writeFileSync(e.out, inplace ? renderLiteral(e.rel, doc) : render(e.rel, doc));
      done += 1;
      if (done % 200 === 0) console.log(`  ${done}/${entries.length} … ${e.outRel}`);
    } catch (err) {
      console.warn(`  ! write ${e.outRel}: ${err.message}`);
    } finally {
      NAV = "";
    }
  }

  // catalogue is rebuilt from the previous manifest + this run's pages, so an
  // incremental `--missing` / `--only` pass never shrinks the index
  const manifest = path.join(WEB, inplace ? "index-inplace.json" : "index.json");
  const known = new Map();
  try {
    const prev = JSON.parse(fs.readFileSync(manifest, "utf8"));
    for (const e of prev.files ?? [])
      known.set(e.path, { html: e.html.replace(/^(?:exports\/web|content)\//, ""), title: e.title });
  } catch {}
  for (const e of entries) known.set(e.rel, { html: e.outRel, title: e.title });
  const catalog = [...known]
    .filter(([, v]) => fs.existsSync(path.join(BASE, v.html)))
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([rel, v]) => ({ rel, ...v, ...locate(rel) }));

  // ── subject blocks, units in official curriculum order ────────────────
  const clsRank = (cls) => (cls === "general" ? 90 : Number((cls.match(/\d+/) || [0])[0]));
  const subjRank = (cls, subject) => {
    const list = plan.subjects.get(cls) ?? [];
    const i = list.indexOf(subject);
    return i < 0 ? 900 : i;
  };
  const unitsOf = (cls, subject) => plan.units.get(`${cls}/${subject}`) ?? [];
  const unitRank = (cls, subject, unit) => {
    const i = unitsOf(cls, subject).indexOf(unit);
    return i < 0 ? 900 : i;
  };
  const unitName = (cls, subject, unit) =>
    plan.titles.get(`${cls}/${subject}/${unit}`) || pretty(unit) || "Overview";
  const subjectName = (cls, subject) =>
    plan.names.get(`${cls}/${subject}`) || (subject === "library" ? "Library" : pretty(subject));

  const books = new Map(); // "class-11/chemistry" → { cls, subject, units: Map(unit → docs) }
  for (const e of catalog) {
    const key = e.key;
    if (!books.has(key)) books.set(key, { key, cls: e.cls, subject: e.subject, units: new Map() });
    const book = books.get(key);
    const list = book.units.get(e.unit) ?? [];
    list.push(e);
    book.units.set(e.unit, list);
  }
  const bookList = [...books.values()].sort(
    (a, b) =>
      clsRank(a.cls) - clsRank(b.cls) ||
      subjRank(a.cls, a.subject) - subjRank(b.cls, b.subject) ||
      natural(a.subject, b.subject),
  );

  const docsIn = (book) => [...book.units.values()].reduce((n, l) => n + l.length, 0);
  const typeCounts = (docs) => {
    const m = new Map();
    for (const d of docs) m.set(d.type, (m.get(d.type) ?? 0) + 1);
    return m;
  };

  fs.mkdirSync(path.join(BASE, SUBDIR), { recursive: true });
  for (const book of bookList) {
    const hubRel = `${SUBDIR}/${book.cls}-${book.subject}.html`;
    const units = [...book.units.entries()].sort(
      (a, b) =>
        unitRank(book.cls, book.subject, a[0]) - unitRank(book.cls, book.subject, b[0]) ||
        natural(a[0], b[0]),
    );
    const total = docsIn(book);
    const sections = units
      .map(([unit, docs]) => {
        const rank = unitRank(book.cls, book.subject, unit);
        const byType = new Map();
        for (const d of docs) {
          if (!byType.has(d.type)) byType.set(d.type, []);
          byType.get(d.type).push(d);
        }
        const blocks = [...byType.entries()]
          .sort((a, b) => {
            const ia = TYPE_ORDER.indexOf(a[0]);
            const ib = TYPE_ORDER.indexOf(b[0]);
            return (ia < 0 ? 90 : ia) - (ib < 0 ? 90 : ib) || natural(a[0], b[0]);
          })
          .map(([type, list]) => {
            const rows = list
              .sort((a, b) => natural(a.rel, b.rel))
              .map(
                (d) =>
                  `<li><a href="${esc(link(hubRel, d.html))}">${esc(d.title)}</a><code>${esc(
                    path.posix.basename(d.rel, ".json"),
                  )}</code></li>`,
              )
              .join("\n");
            return `<h3>${esc(TYPE_LABEL[type] || pretty(type))}</h3><ul>${rows}</ul>`;
          })
          .join("\n");
        const head =
          rank < 900
            ? `<span class="n">Unit ${rank + 1}</span>${esc(unitName(book.cls, book.subject, unit))}`
            : esc(unitName(book.cls, book.subject, unit));
        return `<section class="unit"><h2>${head}<em>${docs.length} ${docs.length === 1 ? "document" : "documents"}</em></h2>${blocks}</section>`;
      })
      .join("\n");

    fs.writeFileSync(
      path.join(BASE, hubRel),
      `<!doctype html><meta charset="utf-8"><title>${esc(subjectName(book.cls, book.subject))} · ${
        book.cls === "general" ? "Library" : book.cls.replace("-", " ")
      }</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>${HUB_CSS}</style>
<nav class="back"><a href="${esc(link(hubRel, "index.html"))}">← all subjects</a></nav>
<div class="kicker">${esc(book.cls === "general" ? "Library" : book.cls.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()))} · ${esc(
        subjectName(book.cls, book.subject),
      )}</div>
<h1>${esc(subjectName(book.cls, book.subject))}</h1>
<p class="lede">${total} documents · ${units.length} ${units.length === 1 ? "unit" : "units"} · curriculum order</p>
${sections}
<p class="foot">Generated ${new Date().toISOString().slice(0, 10)} from <code>content/</code>. Pages open as continuous scroll; each ends with ‹ previous · ${esc(
        subjectName(book.cls, book.subject),
      )} · next ›.</p>`,
    );
  }

  const blocks = bookList
    .map((book) => {
      const docs = [...book.units.values()].flat();
      const types = typeCounts(docs);
      const mix = [...types.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([t, n]) => `${(TYPE_LABEL[t] || pretty(t)).toLowerCase()} ${n}`)
        .join(" · ");
      return `<a class="block" href="${esc(
        link("index.html", `${SUBDIR}/${book.cls}-${book.subject}.html`),
      )}"><div class="cls">${esc(
        book.cls === "general" ? "Library" : book.cls.replace("-", " "),
      )}</div><div class="subj">${esc(subjectName(book.cls, book.subject))}</div><div class="meta">${docsIn(
        book,
      )} documents · ${book.units.size} ${book.units.size === 1 ? "unit" : "units"}</div><div class="types">${esc(mix)}</div></a>`;
    })
    .join("\n");

  fs.writeFileSync(
    manifest,
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        count: catalog.length,
        subjects: bookList.map((b) => ({
          key: b.key,
          class: b.cls,
          subject: b.subject,
          name: subjectName(b.cls, b.subject),
          html: `${inplace ? "content" : "exports/web"}/${SUBDIR}/${b.cls}-${b.subject}.html`,
          documents: docsIn(b),
          units: [...b.units.entries()]
            .sort(
              (a, c) =>
                unitRank(b.cls, b.subject, a[0]) - unitRank(b.cls, b.subject, c[0]) ||
                natural(a[0], c[0]),
            )
            .map(([u, d]) => ({
              id: u,
              title: unitName(b.cls, b.subject, u),
              documents: d.length,
            })),
        })),
        files: catalog.map((e) => ({
          path: e.rel,
          html: `${inplace ? "content" : "exports/web"}/${e.html}`,
          title: e.title,
          subject: e.key,
          unit: e.unit,
          type: e.type,
        })),
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(BASE, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>Content library</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>${HUB_CSS}
  .grid2 { margin-top: 34px; }
</style>
<div class="kicker">NEB notes · curriculum library</div>
<h1>Content library</h1>
<p class="lede">${catalog.length} documents in ${bookList.length} subject blocks. Each block opens that subject, with its units in official curriculum order. Generated ${new Date().toISOString().slice(0, 10)}.</p>
<div class="blocks">${blocks}</div>
<p class="foot">Machine-readable index: <a href="index.json">index.json</a></p>`,
  );

  console.log(`done: ${done} pages, ${bookList.length} subjects → ${path.relative(ROOT, BASE)}`);
}

/* ── batch ───────────────────────────────────────────────────────────── */
async function main() {
  const files = walk(path.join(ROOT, "content"), [], { all: has("inplace") })
    .filter((f) => (ONLY ? f.toLowerCase().includes(ONLY.toLowerCase()) : true))
    .sort();
  let targets = LIMIT ? files.slice(0, LIMIT) : files;
  if (has("missing")) {
    const web = has("web");
    targets = targets.filter((f) => {
      const relOut = path.relative(path.join(ROOT, "content"), f).split(path.sep).join("/");
      if (has("inplace"))
        return !fs.existsSync(outPathFor(relOut, path.join(ROOT, "content"), ".html"));
      return !fs.existsSync(web ? outPathFor(relOut, WEB, ".html") : outPathFor(relOut));
    });
  }

  console.log(`files: ${targets.length}${ONLY ? ` (filter "${ONLY}")` : ""}`);
  if (has("whatif")) {
    for (const f of targets.slice(0, 20)) console.log("  " + path.relative(ROOT, f));
    console.log(`  … ${targets.length} total`);
    return;
  }

  if (has("html")) {
    // debug: dump the printable HTML for the first match instead of PDFs
    const file = targets[0];
    const rel = path.relative(path.join(ROOT, "content"), file).split(path.sep).join("/");
    const doc = JSON.parse(fs.readFileSync(file, "utf8"));
    const out = path.join(ROOT, "scratch", "content-preview.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, render(rel, doc));
    console.log(`html → ${path.relative(ROOT, out)} (${rel})`);
    return;
  }

  if (has("web") || has("inplace")) {
    await exportWeb(targets);
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  await ensureKatexAssets(OUT);
  const jobs = Math.max(1, Number(opt("jobs", "4")) || 1);
  if (!has("no-prime")) await primeImages(targets);
  let browser = null;
  for (let attempt = 0; attempt < 3 && !browser; attempt += 1) {
    try {
      browser = await chromium.launch({ executablePath: CHROME, headless: true });
    } catch (err) {
      console.warn(`  ! browser launch ${attempt + 1}: ${err.message.split("\n")[0]}`);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  if (!browser) throw new Error("could not launch Chrome");

  const index = [];
  let done = 0;
  let failed = 0;
  let cursor = 0;

  async function newPage() {
    const p = await browser.newPage();
    // all images are data URIs by now; block anything that would reach the net
    await p.route(/^https?:/, (route) => route.abort());
    return p;
  }

  async function printDoc(page, relPosix, doc, outPath, { figures = true } = {}) {
    DROP_FIGURES = !figures;
    // the KaTeX stylesheet lives beside the PDFs, so the print job styles math
    const relOut = path.relative(OUT, outPath).split(path.sep).join("/");
    ASSET_HREF = ASSET_CSS_VERSION
      ? path.posix.relative(path.posix.dirname(relOut), "_assets/katex/katex.min.css")
      : "";
    try {
      await withWatchdog(
        (async () => {
          await page.setContent(render(relPosix, doc), {
            waitUntil: "domcontentloaded",
            timeout: 15000,
          });
          await page.evaluate(() => document.fonts.ready);
        })(),
        30000,
        "setContent watchdog",
      );
      await withWatchdog(
        page.pdf({
          path: outPath,
          format: "A4",
          printBackground: true,
          margin: { top: "16mm", bottom: "16mm", left: "15mm", right: "15mm" },
          displayHeaderFooter: figures,
          headerTemplate: `<div style="font-family:Segoe UI,Arial;font-size:7pt;color:#9aa1ac;width:100%;padding:0 15mm;">${
            doc.title ?? ""
          }</div>`,
          footerTemplate:
            '<div style="font-family:Segoe UI,Arial;font-size:7pt;color:#9aa1ac;width:100%;padding:0 15mm;display:flex;justify-content:space-between;"><span>NEB Notes</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
        }),
        60000,
        "pdf watchdog",
      );
    } finally {
      DROP_FIGURES = false;
    }
  }

  async function worker() {
    let page = await newPage();
    while (cursor < targets.length) {
      const file = targets[cursor++];
      const rel = path.relative(path.join(ROOT, "content"), file);
      const relPosix = rel.split(path.sep).join("/");
      const outPath = outPathFor(relPosix);

      let doc;
      try {
        doc = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch (err) {
        failed += 1;
        console.error(`  ! parse ${relPosix}: ${err.message}`);
        continue;
      }
      if (!doc || Array.isArray(doc)) continue;

      const quiet = !process.env.PDF_TRACE;
      try {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        if (process.env.PDF_TRACE) console.log(`  > ${relPosix}`);
        await printDoc(page, relPosix, doc, outPath, { figures: true });
      } catch (err) {
        // Chrome refuses some documents (huge inline SVG / image payloads).
        // Retry once without figures and without running headers.
        try {
          await page.close();
        } catch {}
        page = await newPage();
        try {
          await printDoc(page, relPosix, doc, outPath, { figures: false, quiet });
          console.warn(`  ~ text-only ${relPosix}`);
        } catch (err2) {
          failed += 1;
          console.error(`  ! render ${relPosix}: ${err.message} / ${err2.message}`);
          try {
            await page.close();
          } catch {}
          page = await newPage();
          continue;
        }
      }

      try {
        const size = fs.statSync(outPath).size;
        index.push({ path: relPosix, pdf: path.relative(ROOT, outPath).split(path.sep).join("/"), bytes: size, title: doc.title ?? "" });
        done += 1;
        if (done % 50 === 0) console.log(`  ${done}/${targets.length} … ${relPosix}`);
      } catch {
        failed += 1;
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(jobs, targets.length) }, () => worker()),
  );

  await browser.close();

  // index is rebuilt from disk, so incremental `--missing` runs stay complete
  const onDisk = [];
  const onDiskTitles = new Map();
  // titles captured by earlier (including incremental) runs, keyed by pdf path
  const knownTitles = new Map();
  try {
    const prev = JSON.parse(fs.readFileSync(path.join(OUT, "index.json"), "utf8"));
    for (const e of prev.files ?? []) knownTitles.set(e.path, e.title);
  } catch {}
  (function scan(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scan(p);
      else if (e.name.endsWith(".pdf")) onDisk.push(p);
    }
  })(OUT);
  for (const pdf of onDisk) {
    const relPdf = path.relative(OUT, pdf).split(path.sep).join("/");
    const srcJson = path.join(ROOT, "content", relPdf.replace(/\.pdf$/, ".json"));
    let title = knownTitles.get(relPdf) || path.basename(relPdf, ".pdf");
    try {
      const d = JSON.parse(fs.readFileSync(srcJson, "utf8"));
      title = (typeof d === "string" ? "" : d.title || d.topicTitle) || title;
    } catch {}
    onDiskTitles.set(relPdf, { title, bytes: fs.existsSync(pdf) ? fs.statSync(pdf).size : 0 });
  }
  const manifestPath = path.join(OUT, "index.json");
  fs.writeFileSync(manifestPath, JSON.stringify({ generated: new Date().toISOString(), count: onDiskTitles.size, files: [...onDiskTitles].map(([p, m]) => ({ path: p, pdf: `exports/pdf/${p}`, bytes: m.bytes, title: m.title })) }, null, 2));
  index.length = 0;
  for (const [p, m] of onDiskTitles)
    index.push({ path: p, pdf: `exports/pdf/${p}`, bytes: m.bytes, title: m.title });
  const rows = index
    .map(
      (e) =>
        `<tr><td><a href="${e.pdf.replace(/^exports\/pdf\//, "")}">${esc(e.title || e.path)}</a></td><td><code>${esc(e.path)}</code></td><td>${Math.round(e.bytes / 1024)} KB</td></tr>`,
    )
    .join("\n");
  fs.writeFileSync(
    path.join(OUT, "index.html"),
    `<!doctype html><meta charset="utf-8"><title>Content PDFs</title>
<style>body{font:14px/1.5 -apple-system,Segoe UI,Arial;margin:32px;color:#111}table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #e5e7eb;padding:6px 8px;text-align:left;vertical-align:top}code{font-size:12px;color:#555}</style>
<h1>Content PDFs</h1><p>${index.length} handouts generated ${new Date().toISOString().slice(0, 10)}.</p>
<table><thead><tr><th>Title</th><th>Source JSON</th><th>Size</th></tr></thead><tbody>${rows}</tbody></table>`,
  );

  console.log(`done: ${done} pdfs, ${failed} failed → ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
