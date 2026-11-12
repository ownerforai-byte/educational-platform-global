#!/usr/bin/env node
/**
 * mobile-responsive-check — the automated gate MOBILE_RESPONSIVE_CHECKLIST.md
 * said was missing. It enforces the checklist's mechanically checkable rules so
 * the regressions those rules exist to prevent cannot quietly re-enter:
 *
 *   R1  No non-existent Tailwind variants (`xs:`, `2xs:`, `xxs:` …). This exact
 *       bug shipped once (user-nav used `xs:`, which Tailwind silently drops).
 *   R2  Fixed chrome must respect the safe area: a `fixed` element with a raw
 *       `bottom-<N>` (N >= 1) must use the `bottom-safe` utility; a flush
 *       `bottom-0` bar must carry `pb-safe` padding (home-indicator overlap).
 *   R3  A hard `min-w-[Npx]` wider than 375px must live in a file that also
 *       contains an `overflow-x-auto` container (wrap, don't clip).
 *   R4  A file that renders a raw `<table>` with `whitespace-nowrap` cells
 *       (the combination that forces a table wider than the phone) must also
 *       provide an `overflow-x-auto` / `overflow-y-auto` container.
 *
 * The visual "does it look right at 375px" pass cannot be automated; this gate
 * covers only what is unambiguous in the source. An entire file can opt out
 * with a `mobile-check: allow` comment, but expect that to be questioned.
 *
 *   node scripts/mobile-responsive-check.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["frontend/app", "frontend/components", "frontend/features", "frontend/lib"];
const SKIP_DIRS = new Set(["node_modules", ".next", "dist"]);
const ALLOW_MARKER = "mobile-check: allow";
const MIN_VIEWPORT = 375;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (/\.(tsx|ts)$/.test(entry.name)) {
      if (/\.(test|spec)\.tsx?$/.test(entry.name)) continue;
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const files = SCAN_DIRS.flatMap((dir) => walk(path.join(ROOT, dir)));
const violations = [];

function report(file, line, rule, detail) {
  violations.push({
    file: path.relative(ROOT, file).split(path.sep).join("/"),
    line,
    rule,
    detail,
  });
}

// Source line for a character index (1-based), for readable findings.
function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

const CLASS_ATTR = /(?:className|class)\s*=\s*(?:"([^"]*)"|`([^`]*)`|\{`([^`]*)`\})/g;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  if (text.includes(ALLOW_MARKER)) continue;

  // R1 — invalid responsive/state variants.
  const invalidVariant = /(^|[^a-z0-9-])(2xs|3xs|xxs|xs):/g;
  for (const m of text.matchAll(invalidVariant)) {
    report(file, lineAt(text, m.index), "R1", `non-existent Tailwind variant "${m[2]}:"`);
  }

  // R2 — fixed chrome and the safe area.
  for (const m of text.matchAll(CLASS_ATTR)) {
    const classes = m[1] ?? m[2] ?? m[3] ?? "";
    if (!/(^|\s)fixed(\s|$)/.test(classes)) continue;
    const bottom = classes.match(/(^|\s)bottom-(\d+)(\s|$)/);
    if (!bottom) continue;
    const n = Number(bottom[2]);
    if (n >= 1 && !/(^|\s)bottom-safe(\s|$)/.test(classes)) {
      report(file, lineAt(text, m.index), "R2", `fixed bottom-${n} must use the bottom-safe utility`);
    }
    if (n === 0 && !/(^|\s)pb-safe/.test(classes)) {
      report(file, lineAt(text, m.index), "R2", "fixed bottom-0 bar must carry pb-safe padding");
    }
  }

  // R3 — hard minimum widths wider than a 375px phone.
  const wide = /min-w-\[(\d+)px\]/g;
  if (!text.includes("overflow-x-auto")) {
    for (const m of text.matchAll(wide)) {
      if (Number(m[1]) >= MIN_VIEWPORT) {
        report(file, lineAt(text, m.index), "R3", `min-w-[${m[1]}px] without an overflow-x-auto container`);
      }
    }
  }

  // R4 — width-forcing tables get a scroll container.
  if (
    text.includes("<table") &&
    text.includes("whitespace-nowrap") &&
    !/overflow-(x|y)-auto/.test(text)
  ) {
    report(file, lineAt(text, text.indexOf("<table")), "R4", "nowrap table cells without an overflow container");
  }
}

if (violations.length > 0) {
  console.error(`mobile-responsive-check FAILED — ${violations.length} violation(s) across ${files.length} files:`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule}] ${v.detail}`);
  }
  console.error("\nRules and fixes are documented in MOBILE_RESPONSIVE_CHECKLIST.md.");
  process.exit(1);
}

console.log(`mobile-responsive-check passed — ${files.length} source files clean (R1 variants, R2 safe-area chrome, R3 wide minimums, R4 tables).`);
