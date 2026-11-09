#!/usr/bin/env node
/**
 * pro-surface-audit — Phase P0 of plan-pro-app.md: the machine half of the
 * surface-by-surface verdict.
 *
 *   node scripts/pro-surface-audit.mjs                 # write the report
 *   node scripts/pro-surface-audit.mjs --self-test     # comparator test
 *
 * What it does (measurement, never guessing):
 *   • walks every `page.tsx` under frontend/app and derives its route;
 *   • classifies each route into a plan-pro-app Part-A domain;
 *   • records per-route SIGNALS only a file walk can know:
 *       - stub: renders the UnderDevelopment shell (dead-end ratchet's signal);
 *       - thin: page file under 20 lines (a pure wrapper — legal, recorded);
 *       - redirect: page body is only a Next redirect call;
 *       - client: page (or its imports) is a client component;
 *       - discoverable: route string appears in navigation.ts or site-index.ts;
 *   • emits reports/pro-surface-verdicts.json with a MACHINE verdict per route:
 *       stub | redirect | review   (the human verdict pass upgrades these).
 *
 * The human verdict table lives in plan-pro-app.md Part E; this report is its
 * input. The script never rates a page "pro" or "poor" — that needs a render.
 */
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP = path.join(ROOT, "frontend", "app");
const NAV = path.join(ROOT, "frontend", "lib", "navigation.ts");
const SITE_INDEX = path.join(ROOT, "frontend", "lib", "site-index.ts");
const TIER_INTERFACES = path.join(ROOT, "frontend", "components", "home", "tier-interfaces.tsx");
const REPORT = path.join(ROOT, "reports", "pro-surface-verdicts.json");

// plan-pro-app.md Part A domains, matched most-specific first.
const DOMAINS = [
  ["system", /^\/(4|5)\d\d$/],
  ["ai", /^\/(ai|ai-quiz|chat|ask|mind-studio)/],
  ["lab-3d", /^\/lab|\/periodic-table/],
  ["practice", /^\/(practice|quiz|results|mock-exams|leaderboard|srs|analytics|report-card|exams|revision|exam-countdown)/],
  ["learning-core", /^\/(class-1[12](-notes)?|pyqs|formulas|mindmap|theorems|derivations|graphs|science-graph-bank|practical|syllabus|levels|legend|topics|tags|knowledge|loksewa|world-knowledge|lessons|resources|pdfs|downloads|notes|my-notes|bookmarks|subjects|teachers|parents)/],
  ["progress", /^\/(dashboard|progress|goals|planner|schedule|streaks|achievements|journal|r1|certificates|profile)/],
  ["community", /^\/(community|announcements|feedback|referrals|network)/],
  ["platform", /^\/(owner|billing|credits|plans|settings|onboarding|welcome|login|signup|forgot-password|reset-password|auth|search|site-index|sitemap-page|status|changelog|help|legal|admin|controller|r1-access|notice|notifications|offline)/],
  ["public", /^\/(about|features|how-it-works|contact|school|blog|neb-updates|what-it-has|ad-p-table)/],
  ["home", /^\/(home|$)/],
];

function domainFor(route) {
  for (const [domain, re] of DOMAINS) if (re.test(route)) return domain;
  return "other";
}

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

function signalsFor(file, src, discoverable) {
  const lines = src.split("\n").length;
  const body = src.replace(/^[\s\S]*?export default function[\s\S]*?return\s*\(/, "return (");
  return {
    lines,
    stub: /UnderDevelopment/.test(src),
    redirect: /^\s*(return\s+)?redirect\(/m.test(body) && lines < 25,
    clientComponent: /"use client"/.test(src),
    dynamicParams: /\[[^\]]+\]/.test(file.replace(/\\/g, "/")),
    discoverable,
  };
}

function machineVerdict(s) {
  if (s.stub) return "stub";
  if (s.redirect) return "redirect";
  return "review";
}

function collect() {
  const navSrc = fs.readFileSync(NAV, "utf8") + fs.readFileSync(SITE_INDEX, "utf8");
  const rows = [];
  for (const file of walk(APP)) {
    const src = fs.readFileSync(file, "utf8");
    const route = routeFor(file);
    // Dynamic-segment routes can't be matched literally; match their static prefix.
    const discoverable =
      navSrc.includes(`"${route}"`) ||
      navSrc.includes(`'${route}'`) ||
      navSrc.includes(route.replace(/\[[^\]]+\]/g, "")); // prefix form for dynamic routes
    const signals = signalsFor(file, src, discoverable);
    rows.push({
      route,
      domain: domainFor(route),
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      signals,
      machineVerdict: machineVerdict(signals),
    });
  }
  return rows.sort((a, b) => a.route.localeCompare(b.route));
}

function summarize(rows) {
  const byDomain = {};
  const byVerdict = {};
  for (const r of rows) {
    byDomain[r.domain] = (byDomain[r.domain] ?? 0) + 1;
    byVerdict[r.machineVerdict] = (byVerdict[r.machineVerdict] ?? 0) + 1;
  }
  return { total: rows.length, byDomain, byVerdict };
}

/**
 * Traffic proxy until real analytics exist (plan Phase 8): navigation
 * prominence. Score = 3×(nav-section mentions) + 2×(tier-home spotlight
 * mentions) + 1×(site-index presence). Reproducible, honest about being a
 * proxy, and replaced by measured traffic once analytics land.
 */
function prominenceScores() {
  const nav = fs.readFileSync(NAV, "utf8");
  const site = fs.readFileSync(SITE_INDEX, "utf8");
  const home = fs.readFileSync(TIER_INTERFACES, "utf8");
  const scores = new Map();
  const bump = (src, re, weight) => {
    for (const m of src.matchAll(re)) {
      const route = m[1].replace(/\/[a-z-]+\/[a-z-]+$/, (d) => (d.includes("[") ? d : d));
      scores.set(route, (scores.get(route) ?? 0) + weight);
    }
  };
  bump(nav, /href: "([^"]+)"/g, 3);
  bump(home, /href: "([^"]+)"/g, 2);
  bump(site, /"(\/[a-z0-9-]+)"/g, 1);
  return scores;
}

function topRoutes(rows, n) {
  const scores = prominenceScores();
  return rows
    .filter((r) => r.machineVerdict === "review") // redirects/stubs need no render audit
    .map((r) => ({ ...r, prominence: scores.get(r.route) ?? 0 }))
    .sort((a, b) => b.prominence - a.prominence || a.route.localeCompare(b.route))
    .slice(0, n);
}

if (process.argv.includes("--self-test")) {
  assert.equal(domainFor("/ai/deep-dive"), "ai");
  assert.equal(domainFor("/chat/grammar"), "ai");
  assert.equal(domainFor("/lab/3d"), "lab-3d");
  assert.equal(domainFor("/class-11-notes/physics/kinematics"), "learning-core");
  assert.equal(domainFor("/quiz/physics/kinematics"), "practice");
  assert.equal(domainFor("/owner/users"), "platform");
  assert.equal(domainFor("/blog/some-slug"), "public");
  assert.equal(domainFor("/home/member"), "home");
  assert.equal(domainFor("/404"), "system");
  assert.equal(domainFor("/500"), "system");
  assert.equal(domainFor("/mind-studio"), "ai");
  assert.equal(domainFor("/subjects"), "learning-core");
  assert.equal(domainFor("/notifications"), "platform");
  assert.equal(domainFor("/definitely-unknown"), "other");
  const s = { lines: 5, stub: false, redirect: true, clientComponent: false, dynamicParams: false, discoverable: false };
  assert.equal(machineVerdict(s), "redirect");
  assert.equal(machineVerdict({ ...s, stub: true }), "stub");
  assert.equal(machineVerdict({ ...s, redirect: false }), "review");
  console.log("pro-surface-audit: self-test PASS");
  process.exit(0);
}

const rows = collect();
const payload = {
  note: "Phase P0 machine pass (plan-pro-app.md). Signals only — human verdicts land in plan-pro-app.md Part E.",
  generatedAt: new Date().toISOString(),
  summary: summarize(rows),
  routes: rows,
};
fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, JSON.stringify(payload, null, 2) + "\n", "utf8");
const s = payload.summary;
console.log(
  `pro-surface-audit: ${s.total} routes · stub ${s.byVerdict.stub ?? 0} · redirect ${s.byVerdict.redirect ?? 0} · review ${s.byVerdict.review ?? 0}`,
);
for (const [d, n] of Object.entries(s.byDomain).sort()) console.log(`  ${d}: ${n}`);

if (process.argv.includes("--top")) {
  const idx = process.argv.indexOf("--top");
  const n = Number(process.argv[idx + 1]) || 25;
  console.log(`\nRender-audit queue (top ${n} by navigation prominence):`);
  for (const r of topRoutes(rows, n)) {
    console.log(`  ${String(r.prominence).padStart(3)}  ${r.route}  (${r.domain})`);
  }
}
