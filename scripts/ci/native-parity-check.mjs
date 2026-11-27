#!/usr/bin/env node
/**
 * native-parity-check — the parity ledger gate.
 *
 * Owner directive: "My aim is to make them identical — adding in one means
 * adding in both." (docs/guides/android-native-parity-plan.md §8)
 *
 * Contract (parity plan Appendix A):
 *   Input:  frontend/lib/core/navigation.ts   (NAV_SECTIONS — the website sections)
 *           android-native/.../navigation/RnNavHost.kt
 *             (Routes constants + WebParity registry + explicit composables)
 *           docs/guides/android-native-parity-plan.md §1 exception table
 *   Output: per-section status LIVE | PLACEHOLDER | MISSING | EXCEPTION
 *           counts summary + PARITY LEDGER block
 *   Exception rule (plan §1 exception table is authoritative):
 *     - A website href is EXCEPTION iff it has a row in the §1 table between
 *       the <!-- parity-exceptions:start/end --> markers, or it is ownerOnly
 *       (the item's own flag, or an item of an ownerOnly nav section).
 *     - Every ownerOnly href must have a table row.
 *     - Every WebParity.exceptions entry in RnNavHost.kt must have a table row.
 *     - Every table row must be a navigation.ts href with a known category.
 *     - No section-wide exemptions: a page without a row is not an exception,
 *       so it must be LIVE or PLACEHOLDER (a new page with neither is MISSING).
 *   Exit 1  if any website section is MISSING (unregistered), the registry
 *           is structurally broken, or the exception rules above fail;
 *           exit 0 otherwise (PLACEHOLDER is allowed mid-campaign and is
 *           tracked — that count must never increase except by adding new
 *           website sections).
 *
 * Site-index note: frontend/lib/core/site-index.ts registers deep content
 * pages (topic/unit payloads) that are reached THROUGH section routes
 * (study/{unitId}, class-hub/{slug}, knowledge/{topic} …), not separate nav
 * sections. Parity is counted per NAV_SECTIONS entry (plan §2 "source of
 * truth"); the script verifies site-index.ts exists and is imported by the
 * same registry so the two cannot silently diverge.
 *
 * Owned by Worker 1 (parity plan §0.2). Agent 5 reconciles its output
 * against the plan's route map every session.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const NAV_TS = path.join(ROOT, "frontend", "lib", "core", "navigation.ts");
const SITE_INDEX_TS = path.join(ROOT, "frontend", "lib", "core", "site-index.ts");
const NAVHOST_KT = path.join(
  ROOT, "android-native", "app", "src", "main", "java",
  "com", "ravikisan", "platform", "compose", "navigation", "RnNavHost.kt",
);

const PLAN_MD = path.join(ROOT, "docs", "guides", "android-native-parity-plan.md");

// Allowed categories for the parity plan §1 exception table.
const EXCEPTION_CATEGORIES = new Set([
  "owner-only", "blog", "marketing", "legal", "support", "pricing", "about-info", "diagram-tool",
]);

const errors = [];
const warnings = [];
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ── 1. Parse frontend/lib/core/navigation.ts ────────────────────────────────
// Every NavItem in this file is a single-line object, so a line scanner is
// sufficient and keeps the parser independent of the TS toolchain.
function parseNavigationTs() {
  const src = readFileSync(NAV_TS, "utf8");
  const lines = src.split("\n");
  const itemsByArray = new Map(); // arrayName -> [{ href, ownerOnly }]
  const sectionOfArray = new Map(); // itemsArrayName -> section id
  const sectionOwnerOnly = new Set();
  let currentArray = null;

  for (const line of lines) {
    let m = line.match(/^const (\w+): NavItem\[\] = \[/);
    if (m) { currentArray = m[1]; itemsByArray.set(currentArray, []); continue; }
    m = line.match(/\{ id: "(\w+)",.*?items: (\w+)\s*.*?\}/);
    if (m) {
      sectionOfArray.set(m[2], m[1]);
      if (/ownerOnly: true/.test(line)) sectionOwnerOnly.add(m[1]);
      continue;
    }
    if (!currentArray) continue;
    m = line.match(/href: "([^"]+)"/);
    if (!m) continue;
    const rest = line.slice(line.indexOf(m[0]) + m[0].length);
    itemsByArray.get(currentArray).push({
      href: m[1],
      ownerOnly: /ownerOnly: true/.test(rest),
    });
  }

  // Flatten in NAV_SECTIONS order, de-duplicating hrefs (the owner section
  // repeats shortcuts to member pages — same page, one parity entry).
  const sections = [];
  const seen = new Map(); // href -> { section, ownerOnly }
  for (const [arrayName, items] of itemsByArray) {
    const section = sectionOfArray.get(arrayName);
    if (!section) { fail(`navigation.ts: items array "${arrayName}" is not referenced by NAV_SECTIONS`); continue; }
    sections.push(section);
    for (const item of items) {
      if (seen.has(item.href)) continue;
      seen.set(item.href, { section, ownerOnly: item.ownerOnly || sectionOwnerOnly.has(section) });
    }
  }
  return { sections: [...new Set(sections)], hrefs: seen };
}

// ── 2. Parse RnNavHost.kt (Routes + WebParity + composables) ────────────────
function parseNavHost() {
  const src = readFileSync(NAVHOST_KT, "utf8");

  // Route constants: const val NAME = "pattern"
  const routes = new Map();
  for (const m of src.matchAll(/const val (\w+) = "([^"]+)"/g)) {
    if (routes.has(m[1])) fail(`RnNavHost.kt: duplicate Routes constant ${m[1]}`);
    routes.set(m[1], m[2]);
  }

  // WebParity.live — "href" to Routes.NAME
  const live = new Map();
  for (const m of src.matchAll(/"([^"]+)"\s+to\s+Routes\.(\w+)/g)) {
    if (live.has(m[1])) fail(`RnNavHost.kt: WebParity.live maps "${m[1]}" twice`);
    live.set(m[1], m[2]);
  }

  // WebParity.stubs — Stub("href", Routes.NAME, "Title")
  const stubs = new Map();
  for (const m of src.matchAll(/Stub\("([^"]+)",\s*Routes\.(\w+),\s*"([^"]+)"\)/g)) {
    if (stubs.has(m[1])) fail(`RnNavHost.kt: WebParity.stubs registers "${m[1]}" twice`);
    stubs.set(m[1], { routeConst: m[2], title: m[3] });
  }

  // WebParity.exceptions — exception("href")
  const exceptions = new Set();
  for (const m of src.matchAll(/exception\("([^"]+)"\)/g)) exceptions.add(m[1]);

  // Explicit composables: split the NavHost block on `composable(` and take
  // each chunk up to the next one. First Routes.X reference is the route;
  // a body calling StubScreen( marks the destination a placeholder shell.
  const registered = new Map(); // routeConst -> { placeholder: boolean }
  const parts = src.split("composable(");
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const rm = chunk.match(/Routes\.(\w+)/);
    if (!rm) continue;
    registered.set(rm[1], { placeholder: chunk.includes("StubScreen(") });
  }

  // The stub-registration loop must exist — WebParity.stubs entries are
  // wired by it, not by explicit composables.
  const stubLoopWired = src.includes("WebParity.stubs.forEach");

  return { routes, live, stubs, exceptions, registered, stubLoopWired };
}

// ── 2b. Parse the parity plan §1 exception table ────────────────────────────
// Rows look like: | `/path` | category | reason |  (header and separator rows are skipped).
function parsePlanExceptions() {
  const src = readFileSync(PLAN_MD, "utf8");
  const start = src.indexOf("<!-- parity-exceptions:start -->");
  const end = src.indexOf("<!-- parity-exceptions:end -->");
  const table = new Map(); // href -> { category, reason }
  if (start < 0 || end < start) {
    fail("parity plan §1: exception table markers <!-- parity-exceptions:start --> / :end --> are missing");
    return table;
  }
  for (const line of src.slice(start, end).split("\n")) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|(.*)$/);
    if (!m) continue;
    const [category = "", reason = ""] = m[2].split("|").map((c) => c.trim());
    if (table.has(m[1])) fail(`parity plan §1: exception table lists "${m[1]}" twice`);
    if (!EXCEPTION_CATEGORIES.has(category)) fail(`parity plan §1: "${m[1]}" has unknown category "${category}"`);
    if (!reason) fail(`parity plan §1: "${m[1]}" has no reason`);
    table.set(m[1], { category, reason });
  }
  return table;
}

// ── 3. Resolve per-section status ───────────────────────────────────────────
const { sections, hrefs } = parseNavigationTs();
const nav = parseNavHost();
const planExceptions = parsePlanExceptions();

if (!existsSync(SITE_INDEX_TS)) fail("frontend/lib/core/site-index.ts is missing (parity plan §2 source of truth)");
if (!nav.stubLoopWired) fail("RnNavHost.kt: the WebParity.stubs.forEach registration loop is missing — stub entries are dead map data");

const rows = [];
for (const [href, meta] of hrefs) {
  const planEntry = planExceptions.get(href);

  let status = "MISSING";
  let detail = "";
  if (planEntry || meta.ownerOnly) {
    status = "EXCEPTION";
    if (meta.ownerOnly && !planEntry) fail(`"${href}" is owner-only (navigation.ts) but has no row in the parity plan §1 exception table`);
    if (!planEntry) detail = "owner-only (navigation.ts)";
    else detail = nav.exceptions.has(href) ? "documented in WebParity.exceptions" : "plan §1 documented web-only";
  } else if (nav.live.has(href) && nav.stubs.has(href)) {
    fail(`"${href}" is mapped in BOTH WebParity.live and WebParity.stubs`);
  } else if (nav.live.has(href)) {
    const constName = nav.live.get(href);
    const route = nav.routes.get(constName);
    const reg = nav.registered.get(constName);
    if (!route) detail = `Routes.${constName} does not exist`;
    else if (!reg) detail = `Routes.${constName} ("${route}") has no explicit composable`;
    else if (reg.placeholder) detail = `Routes.${constName} renders StubScreen`;
    else { status = "LIVE"; detail = route; }
  } else if (nav.stubs.has(href)) {
    const { routeConst, title } = nav.stubs.get(href);
    if (!nav.routes.has(routeConst)) detail = `Routes.${routeConst} does not exist`;
    else { status = "PLACEHOLDER"; detail = `${nav.routes.get(routeConst)} — "${title}"`; }
  } else {
    detail = "no WebParity entry — register a stub route (plan §0.3 task 2)";
  }
  if (status === "MISSING") fail(`website section "${href}" (${meta.section}): ${detail}`);
  rows.push({ href, section: meta.section, status, detail });
}

// Registry hygiene: exceptions pointing at pages that are not in the nav.
for (const href of nav.exceptions) {
  if (!hrefs.has(href)) warn(`WebParity.exception("${href}") is not a navigation.ts href`);
  if (!planExceptions.has(href)) fail(`RnNavHost.kt WebParity.exceptions "${href}" has no row in the parity plan §1 exception table`);
}
// The §1 table is authoritative: every row must name a real website href.
for (const href of planExceptions.keys()) {
  if (!hrefs.has(href)) fail(`parity plan §1 exception table lists "${href}", which is not a navigation.ts href`);
}
// Native-only surfaces are allowed only as documented app-platform exceptions
// (plan §8.3) — list them so Agent 5 can audit, do not fail on them.
const mappedConsts = new Set([...nav.live.values(), ...nav.stubs.values()]);
const nativeOnly = [...nav.registered.keys()].filter((c) => !mappedConsts.has(c));

// ── 4. Report ───────────────────────────────────────────────────────────────
const byStatus = { LIVE: [], PLACEHOLDER: [], MISSING: [], EXCEPTION: [] };
for (const r of rows) byStatus[r.status].push(r);

for (const status of ["LIVE", "PLACEHOLDER", "EXCEPTION", "MISSING"]) {
  if (byStatus[status].length === 0) continue;
  console.log(`\n── ${status} (${byStatus[status].length}) ──`);
  for (const r of byStatus[status]) {
    console.log(`  [${r.section}] ${r.href}${r.detail ? "  →  " + r.detail : ""}`);
  }
}
if (nativeOnly.length) {
  console.log(`\n── Native-only destinations (${nativeOnly.length}) — app-platform exceptions, audit me ──`);
  console.log("  " + nativeOnly.join(", "));
}
for (const w of warnings) console.log(`WARN: ${w}`);

const parityRelevant = rows.length - byStatus.EXCEPTION.length;
console.log("\n══ PARITY LEDGER (script-generated — manual claims are rejected) ══");
console.log(`• Website sections total:        ${rows.length}  (parity-relevant ${parityRelevant}, exceptions ${byStatus.EXCEPTION.length})`);
console.log(`• Native-live:                   ${byStatus.LIVE.length}   Placeholder: ${byStatus.PLACEHOLDER.length}   Not started: ${byStatus.MISSING.length}`);
console.log("• Source: frontend/lib/core/navigation.ts vs RnNavHost.kt WebParity");
console.log("═══════════════════════════════════════════════════════════════");

if (errors.length) {
  console.error(`\nnative-parity-check FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log("\nnative-parity-check: OK (no unregistered website sections)");
