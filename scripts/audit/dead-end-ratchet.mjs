#!/usr/bin/env node
/**
 * dead-end-ratchet — stop new 🚧 placeholder routes from shipping.
 *
 *   node scripts/dead-end-ratchet.mjs                    # gate: fail on NEW stubs
 *   node scripts/dead-end-ratchet.mjs --write-baseline  # record the current list
 *   node scripts/dead-end-ratchet.mjs --self-test       # test the comparator
 *
 * `frontend/components/ui/under-development.tsx` is a legitimate empty-state
 * shell for routes awaiting content, but a PWA/TWA full of them reads as an
 * unfinished app. This gate records the known placeholders and fails when a
 * new page adopts the shell; fixing a page removes it from the list and
 * (after --write-baseline) permanently lowers the ceiling.
 */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const APP = path.join(ROOT, "frontend", "app");
const BASELINE = path.join(ROOT, "scripts", "dead-end-baseline.json");
const REPORT = path.join(ROOT, "reports", "dead-end-routes.json");
const WRITE = process.argv.includes("--write-baseline");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/^page\.tsx?$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function routeFor(file) {
  const rel = path.relative(APP, file).replace(/\\/g, "/");
  const segments = rel.split("/").slice(0, -1).filter((s) => !/^\(.*\)$/.test(s));
  return "/" + segments.join("/");
}

function collect() {
  const found = [];
  for (const file of walk(APP)) {
    const src = fs.readFileSync(file, "utf8");
    if (!/UnderDevelopment|under-development/.test(src)) continue;
    found.push({ route: routeFor(file), file: path.relative(ROOT, file).replace(/\\/g, "/") });
  }
  return found.sort((a, b) => a.route.localeCompare(b.route));
}

function compare(current, baseline) {
  const known = new Set(baseline.routes ?? []);
  return current.filter((item) => !known.has(item.route));
}

if (process.argv.includes("--self-test")) {
  const base = { routes: ["/a", "/b"] };
  assert.deepEqual(compare([{ route: "/a" }], base), [], "known routes must pass");
  assert.equal(compare([{ route: "/a" }, { route: "/new" }], base).length, 1, "new stub must fail");
  assert.deepEqual(compare([], base), [], "fixing all stubs must pass");
  console.log("dead-end-ratchet: self-test PASS (known / new / fixed)");
  process.exit(0);
}

const current = collect();
const routes = current.map((item) => item.route);
const payload = {
  note: "Routes rendering the UnderDevelopment shell. Fix one, then --write-baseline to lower the ceiling.",
  generatedAt: new Date().toISOString().slice(0, 10),
  routes,
};

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, JSON.stringify(current, null, 2) + "\n", "utf8");

if (WRITE) {
  fs.writeFileSync(BASELINE, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`dead-end-ratchet: baseline written (${routes.length} known placeholder routes).`);
  process.exit(0);
}

if (!fs.existsSync(BASELINE)) {
  console.error("dead-end-ratchet: no baseline. Run with --write-baseline once.");
  process.exit(1);
}

let baseline;
try {
  baseline = JSON.parse(fs.readFileSync(BASELINE, "utf8"));
} catch {
  console.error("dead-end-ratchet: baseline is not valid JSON.");
  process.exit(1);
}

const added = compare(current, baseline);
if (added.length) {
  console.error(`dead-end-ratchet: GATE FAIL — ${added.length} NEW placeholder route(s):`);
  for (const item of added) console.error(`  - ${item.route} (${item.file})`);
  console.error("Build a real page or remove the route; do not raise the baseline.");
  process.exit(1);
}

const fixed = (baseline.routes ?? []).length - routes.length;
console.log(
  `dead-end-ratchet: GATE PASS — ${routes.length} known placeholder routes (${fixed} fixed since baseline). Report -> reports/dead-end-routes.json`,
);
if (fixed > 0) console.log("Re-run with --write-baseline to lock in the lower ceiling.");
