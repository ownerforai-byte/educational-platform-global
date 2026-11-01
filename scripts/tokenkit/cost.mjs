#!/usr/bin/env node
// scripts/tokenkit/cost.mjs
// Token budgeting + model routing + output-format constraints, as a CLI.
// Decides which tier (local / mid / flagship) a task should run on, how much
// context to keep, and the output shape to enforce — so flagship calls are
// reserved for genuinely hard reasoning.
//
// Usage:
//   node scripts/tokenkit/cost.mjs route "<goal>" [--tokens N] [--json]
//   node scripts/tokenkit/cost.mjs budget --goal "<goal>" --tokens N [--content-file f] [--json]
//   node scripts/tokenkit/cost.mjs format --mode diff|patch|json [--instruction i] [--draft-file f] [--json]

import { REPO_ROOT, fs, path, estTokens } from "./lib.mjs";
import { budgetMcp, formatMcp, tierFor } from "./harmony-mcp.mjs";

const TIER = {
  local: { model: "ollama/qwen2.5:1.5b", goodFor: "search, file resolution, formatting, symbol jump, small diffs", cap: 8192 },
  mid:   { model: "ollama/qwen2.5:14b", goodFor: "moderate reasoning, single-file edits", cap: 32768 },
  flag:  { model: "flagship (your configured model)", goodFor: "complex multi-file reasoning, architecture", cap: 128000 },
};
function routeCmd(argv, opts) {
  const goal = argv[0];
  if (!goal) { console.error("usage: cost route \"<goal>\" [--tokens N]"); process.exit(1); }
  const available = opts.tokens || 32768;
  const key = tierFor(goal, available);
  const out = { goal, tierKey: key, tier: TIER[key], availableTokens: available, route: key === "flag" ? "flagship-only" : "local-first" };
  console.log(opts.json ? JSON.stringify(out, null, 2) : `route "${goal}" -> ${key} (${out.tier.model})  [${out.route}]`);
}
function budgetCmd(argv, opts) {
  const goal = opts.goal;
  if (!goal) { console.error('usage: cost budget --goal "<g>" [--tokens N] [--content-file f]'); process.exit(1); }
  let content = "";
  if (opts["content-file"]) { try { content = fs.readFileSync(path.join(REPO_ROOT, opts["content-file"]), "utf8"); } catch {} }
  const out = budgetMcp({ goal, availableTokens: opts.tokens || 32768, content });
  console.log(opts.json ? JSON.stringify(out, null, 2)
    : `tier ${out.tierKey} (${out.tier.model})\ncontext ${out.contextTokens} + output ${out.reservedForOutput} (of ${out.budgetTokens})\nfiltered prompt ~${out.filteredPromptTokens} tokens`);
}
function formatCmd(argv, opts) {
  let draft = "";
  if (opts["draft-file"]) { try { draft = fs.readFileSync(path.join(REPO_ROOT, opts["draft-file"]), "utf8"); } catch {} }
  const out = formatMcp({ mode: opts.mode || "json", instruction: opts.instruction, draft });
  console.log(opts.json ? JSON.stringify(out, null, 2) : `# format ${out.mode}\n${out.output}`);
}
// arg parse
const raw = process.argv.slice(2);
const opts = {}; const pos = [];
for (let i = 0; i < raw.length; i++) {
  const a = raw[i];
  if (a === "--json") opts.json = true;
  else if (a === "--tokens") opts.tokens = +raw[++i];
  else if (a === "--goal") opts.goal = raw[++i];
  else if (a === "--mode") opts.mode = raw[++i];
  else if (a === "--instruction") opts.instruction = raw[++i];
  else if (a === "--content-file") opts["content-file"] = raw[++i];
  else if (a === "--draft-file") opts["draft-file"] = raw[++i];
  else pos.push(a);
}
const [cmd, ...rest] = pos;
({ route: routeCmd, budget: budgetCmd, format: formatCmd })[cmd] ? (cmd === "route" ? routeCmd(rest, opts) : cmd === "budget" ? budgetCmd(rest, opts) : formatCmd(rest, opts))
  : (console.error("commands: route <goal> | budget | format"), process.exit(1));
