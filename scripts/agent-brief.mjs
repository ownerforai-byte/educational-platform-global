#!/usr/bin/env node
/**
 * agent-brief — pre-edit orientation without reading source.
 *
 *   node scripts/agent-brief.mjs brief <keywords...>   # where do I edit for this task?
 *   node scripts/agent-brief.mjs impact <file> [--deep] # what breaks if I edit this file?
 *   ... [--json]                                       # machine-readable output
 *
 * `brief` ranks graph symbols/files against the task words and prints the
 * candidate edit points (file + symbol + line), the scoped guide to read, and
 * the tests that exercise them. `impact` walks the file-level dependency graph
 * in REVERSE from one file and lists its dependents and affected tests.
 *
 * Data source is graphify-out/graph.json (no LLM, no network). The graph is
 * symbol-level; edges are collapsed to file level here. If it is missing or
 * stale the tool says so — run `npm run graphify:update` and re-run.
 *
 * This narrows the edit loop. It never replaces `npm run check:all`.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GRAPH_PATH = path.join(ROOT, "graphify-out", "graph.json");

const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const DEEP = args.includes("--deep");
const positional = args.filter((a) => !a.startsWith("--"));
const command = positional.shift();

const DEPENDENCY_RELATIONS = new Set([
  "imports",
  "imports_from",
  "dynamic_import",
  "re_exports",
  "calls",
  "indirect_call",
  "references",
  "uses",
  "executes",
  "triggers",
  "extends",
  "implements",
  "inherits",
]);

const GUIDES = [
  ["backend/tests/", "backend/tests/AGENTS.md"],
  ["backend/", "backend/AGENTS.md"],
  ["frontend/", "frontend/AGENTS.md"],
  ["content/", "content/AGENTS.md"],
  ["scripts/", "scripts/AGENTS.md"],
];

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "of", "for", "to", "in", "on", "with", "how",
  "where", "what", "which", "is", "are", "does", "do", "add", "fix", "update",
  "make", "change", "implement", "when", "i", "we", "it", "this", "that",
]);

function fail(message) {
  console.error(`[agent-brief] ${message}`);
  process.exit(1);
}

function loadGraph() {
  if (!fs.existsSync(GRAPH_PATH)) {
    fail("graphify-out/graph.json not found. Run `npm run graphify:update` first.");
  }
  const graph = JSON.parse(fs.readFileSync(GRAPH_PATH, "utf8"));
  try {
    const head = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
    if (graph.built_at_commit && graph.built_at_commit !== head) {
      console.error(
        `[agent-brief] graph is from ${graph.built_at_commit.slice(0, 8)}, HEAD is ${head.slice(0, 8)} — results may be stale (\`npm run graphify:update\`).`,
      );
    }
  } catch {
    // Not in a git repo or git unavailable: the graph is still usable.
  }
  return graph;
}

/** Collapse the symbol graph into file-level dependency edges. */
function buildFileIndex(graph) {
  const nodeFile = new Map();
  const fileSymbols = new Map();
  for (const node of graph.nodes) {
    const file = node.source_file;
    if (!file) continue;
    nodeFile.set(node.id, file);
    if (!fileSymbols.has(file)) fileSymbols.set(file, []);
    fileSymbols.get(file).push(node);
  }
  const dependsOn = new Map(); // file -> files it imports/calls
  const dependedBy = new Map(); // file -> files that import/call it
  for (const link of graph.links) {
    if (!DEPENDENCY_RELATIONS.has(link.relation)) continue;
    const from = nodeFile.get(link.source);
    const to = nodeFile.get(link.target);
    if (!from || !to || from === to) continue;
    if (!isCodeFile(from) || !isCodeFile(to)) continue;
    if (!dependsOn.has(from)) dependsOn.set(from, new Set());
    dependsOn.get(from).add(to);
    if (!dependedBy.has(to)) dependedBy.set(to, new Set());
    dependedBy.get(to).add(from);
  }
  return { nodeFile, fileSymbols, dependsOn, dependedBy };
}

// Documents and CI YAML "cite" code in this graph; they are not dependents.
const isCodeFile = (file) => /\.[cm]?[jt]sx?$/.test(file);

const isTestFile = (file) =>
  /(^|\/)(tests?|__tests__)\//.test(file) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(file);

function workspaceOf(file) {
  if (file.startsWith("frontend/")) return "frontend";
  if (file.startsWith("backend/")) return "backend";
  return null;
}

/** Tests that depend on the file, plus the same-basename convention test. */
function affectedTests(file, dependedBy) {
  const tests = new Set();
  const seen = new Set([file]);
  const queue = [file];
  while (queue.length) {
    const current = queue.shift();
    for (const dependent of dependedBy.get(current) ?? []) {
      if (seen.has(dependent)) continue;
      seen.add(dependent);
      if (isTestFile(dependent)) tests.add(dependent);
      else queue.push(dependent);
    }
  }
  const ws = workspaceOf(file);
  if (ws) {
    const base = path.basename(file).replace(/\.[cm]?[jt]sx?$/, "");
    const testDir = path.join(ROOT, ws, "tests");
    if (fs.existsSync(testDir)) {
      const stack = [testDir];
      while (stack.length) {
        const dir = stack.pop();
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) stack.push(full);
          else if (entry.name === `${base}.test.ts` || entry.name === `${base}.test.tsx`) {
            tests.add(path.relative(ROOT, full).split(path.sep).join("/"));
          }
        }
      }
    }
  }
  return [...tests].sort();
}

const guideFor = (file) => GUIDES.find(([prefix]) => file.startsWith(prefix))?.[1] ?? "AGENTS.md";

function cmdImpact(target, index) {
  const file = target.split(path.sep).join("/").replace(/^\.\//, "");
  if (!index.fileSymbols.has(file) && !fs.existsSync(path.join(ROOT, file))) {
    fail(`unknown file: ${file}`);
  }
  const direct = [...(index.dependedBy.get(file) ?? [])].sort();
  const deepTests = affectedTests(file, index.dependedBy);
  const result = {
    file,
    guide: guideFor(file),
    directDependents: direct,
    tests: deepTests,
    imports: [...(index.dependsOn.get(file) ?? [])].sort(),
  };
  if (JSON_OUT) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`# Impact of editing ${file}`);
  console.log(`Read first: ${result.guide}`);
  console.log(`\n## Directly depends on this file (${direct.length})`);
  for (const d of direct.slice(0, 30)) console.log(`  ${d}`);
  if (direct.length > 30) console.log(`  … ${direct.length - 30} more (use --json)`);
  console.log(`\n## Tests that exercise it (${deepTests.length})`);
  for (const t of deepTests.slice(0, 20)) console.log(`  ${t}`);
  if (deepTests.length > 20) console.log(`  … ${deepTests.length - 20} more`);
  if (deepTests.length) {
    console.log(`\nRun: npm run test:affected -- ${file}`);
  }
  console.log(`\nGate before push: npm run check:all`);
}

function cmdBrief(keywords, index, graph) {
  const terms = keywords
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
  if (!terms.length) fail("give at least one meaningful keyword, e.g. `brief professor widget`");

  const scored = new Map(); // file -> {score, symbols[]}
  for (const node of graph.nodes) {
    if (node.file_type !== "code" || !node.source_file) continue;
    if (isTestFile(node.source_file)) continue;
    const label = (node.norm_label || node.label || "").toLowerCase();
    const file = node.source_file.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (label === term) score += 6;
      else if (label.includes(term)) score += 3;
      if (file.includes(term)) score += 2;
    }
    if (!score) continue;
    const entry = scored.get(node.source_file) ?? { score: 0, symbols: [] };
    entry.score += score;
    entry.symbols.push({ label: node.label, location: node.source_location, score });
    scored.set(node.source_file, entry);
  }

  const top = [...scored.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 6);
  if (!top.length) fail(`no graph symbols matched: ${terms.join(", ")}`);

  const files = top.map(([file]) => file);
  const tests = [...new Set(files.flatMap((f) => affectedTests(f, index.dependedBy)))].sort();
  const result = {
    terms,
    candidates: top.map(([file, entry]) => ({
      file,
      guide: guideFor(file),
      directDependents: (index.dependedBy.get(file) ?? new Set()).size,
      symbols: entry.symbols.sort((a, b) => b.score - a.score).slice(0, 4),
    })),
    tests,
  };
  if (JSON_OUT) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`# Brief: ${terms.join(" ")}`);
  for (const c of result.candidates) {
    console.log(`\n${c.file}  (${c.directDependents} dependents)`);
    for (const s of c.symbols) console.log(`   ${s.label} ${s.location ?? ""}`);
    console.log(`   guide: ${c.guide}`);
  }
  console.log(`\n## Tests covering these files (${tests.length})`);
  for (const t of tests.slice(0, 12)) console.log(`  ${t}`);
  if (tests.length > 12) console.log(`  … ${tests.length - 12} more`);
  console.log(`\nNext: node scripts/agent-brief.mjs impact <file>`);
  console.log(`Pack signatures instead of reading bodies: npm run tokenkit:pack -- <file>`);
}

const graph = loadGraph();
const index = buildFileIndex(graph);

if (command === "impact") {
  if (!positional.length) fail("usage: agent-brief impact <file> [--json]");
  cmdImpact(positional[0], index);
} else if (command === "brief") {
  cmdBrief(positional, index, graph);
} else {
  console.log(`agent-brief — orientation without reading source

  brief <keywords...>     candidate edit points + guides + tests for a task
  impact <file>           dependents and affected tests for one file
  options: --json (machine output), --deep (accepted for compatibility)

Examples:
  node scripts/agent-brief.mjs brief professor streaming widget
  node scripts/agent-brief.mjs impact backend/src/middleware/auth.ts`);
}
