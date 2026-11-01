#!/usr/bin/env node
// scripts/tokenkit/codegraph.mjs
// Local code-graph jump-to + import closure. Knowledge-graph-backed, so you
// inspect only the relevant symbols, not the whole tree. Strict JSON output.
//
// Usage:
//   node scripts/tokenkit/codegraph.mjs jump <Symbol> [--body] [--depth n] [--json]
//   node scripts/tokenkit/codegraph.mjs imports <fileOrSymbol> [--json]
//   node scripts/tokenkit/codegraph.mjs consumers <fileOrSymbol> [--json]
//   node scripts/tokenkit/codegraph.mjs god-nodes [--top n] [--json]

import { REPO_ROOT, fs, path, loadGraph, loadTS, parseSymbols, listCodeFiles, normPath, estTokens } from "./lib.mjs";
import { jump, consumersOf } from "./graph-core.mjs";

function emit(obj, opts) {
  if (opts.json) { console.log(JSON.stringify(obj, null, 2)); return; }
  console.log(JSON.stringify(obj, null, 2));
}
function die(msg) { console.error(msg); process.exit(1); }

function readSymbolBody(file, n) {
  const src = fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
  const lines = src.split("\n");
  const m = n.source_location && /L(\d+)/.exec(n.source_location);
  if (m) return lines.slice(Math.max(0, +m[1] - 1), +m[1] - 1 + 24).join("\n");
  return null;
}

function cmdJump(argv, opts) {
  const sym = argv[0];
  if (!sym) die("usage: codegraph jump <Symbol> [--body] [--depth n]");
  let out = jump({ symbol: sym, body: opts.body, depth: opts.depth ?? 5 });
  if (out.status === "ok" && opts.body) out.definition.body = readSymbolBody(out.definition.file, { source_location: out.definition.location });
  emit(out, opts);
}
function importTargets(relFile) {
  // shared import resolver (kept here for the imports/consumers subcommands)
  const fsCache = new Map();
  const read = (r) => { if (!fsCache.has(r)) { let t = null; try { t = fs.readFileSync(path.join(REPO_ROOT, r), "utf8"); } catch {} fsCache.set(r, t); } return fsCache.get(r); };
  const EXT = [".ts", ".tsx", ".js", ".jsx", ".mts", ".cts", ".mjs", ".cjs"];
  const resolve = (fromFile, spec) => {
    if (!spec || !spec.startsWith(".")) return null;
    const base = path.posix.normalize(path.posix.join(path.dirname(fromFile), spec.replace(/\\/g, "/")));
    if (read(base) != null) return base;
    for (const ext of EXT) { if (read(base + ext) != null) return base + ext; for (const e of EXT) if (read(base + "/index" + e) != null) return base + "/index" + e; }
    return null;
  };
  const src = read(relFile);
  if (src == null) return [];
  const specs = new Set();
  const re = /(?:import\s+(?:[\s\S]*?from\s+)?|export\s+(?:[\s\S]*?from\s+)?)["']([^"']+)["']/g;
  let m; while ((m = re.exec(src))) specs.add(m[1]);
  const bare = /import\s+["']([^"']+)["']/g; while ((m = bare.exec(src))) specs.add(m[1]);
  const out = [];
  for (const s of specs) { const t = resolve(relFile, s); if (t) out.push({ file: t, exports: exportNames(t, read) }); }
  return out;
}
function exportNames(relFile, read) {
  const src = read(relFile);
  if (src == null) return [];
  const names = new Set();
  const re = /export\s+(?:default\s+)?(?:async\s+)?(function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;
  let m; while ((m = re.exec(src))) names.add(m[2]);
  return [...names];
}
function fileOf(q) {
  if (q.includes("/")) return normPath(q);
  // symbol -> file via graph
  const out = jump({ symbol: q });
  return out.status === "ok" ? out.definition.file : normPath(q);
}
function cmdImports(argv, opts) {
  const q = argv[0]; if (!q) die("usage: codegraph imports <fileOrSymbol>");
  const file = fileOf(q);
  const up = importTargets(file);
  emit({ status: "ok", file, imports: up, tokenEstimate: estTokens(JSON.stringify(up)) }, opts);
}
function cmdConsumers(argv, opts) {
  const q = argv[0]; if (!q) die("usage: codegraph consumers <fileOrSymbol>");
  const file = fileOf(q);
  const down = consumersOf(file).map((c) => c.file);
  emit({ status: "ok", file, consumers: down, tokenEstimate: estTokens(JSON.stringify(down)) }, opts);
}
function cmdGodNodes(argv, opts) {
  const g = loadGraph();
  const byFile = new Map();
  for (const n of g.nodes) {
    if (n.file_type !== "code" || !n.source_file) continue;
    if (!byFile.has(n.label)) byFile.set(n.label, new Set());
    byFile.get(n.label).add(n.source_file);
  }
  const ranked = [...byFile.entries()]
    .map(([label, set]) => ({ label, degree: set.size, files: [...set].slice(0, 8) }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, argv.find((a) => /^\d+$/.test(a)) ? +[...argv].find((a) => /^\d+$/.test(a)) : 15);
  emit({ status: "ok", godNodes: ranked }, opts);
}

// --- args ----------------------------------------------------------------
const raw = process.argv.slice(2);
const opts = {};
const argv = [];
for (let i = 0; i < raw.length; i++) {
  const a = raw[i];
  if (a === "--json") opts.json = true;
  else if (a === "--body") opts.body = true;
  else if (a === "--depth") opts.depth = +raw[++i];
  else if (a === "--top") opts.top = +raw[++i];
  else argv.push(a);
}
const [cmd, ...rest] = argv;
const run = { jump: cmdJump, imports: cmdImports, consumers: cmdConsumers, "god-nodes": cmdGodNodes };
if (!run[cmd]) die("unknown command: " + cmd + "\n  " + Object.keys(run).join("\n  "));
run[cmd](rest, opts);
