#!/usr/bin/env node
// scripts/tokenkit/harmony-mcp.mjs
// Harmony-style MCP server over stdio (JSON-RPC 2.0), zero dependencies.
// Exposes the token-optimization toolkit to any MCP client so the model can:
//   - pack_context      : pack a dir/files into a token-optimized context blob
//   - semantic_search   : local (no LLM) code search before spending tokens
//   - symbol_jump       : graph-aware definition + consumers
//   - token_budget      : plan a context budget, pick a model tier, filter prompt
//   - format_output     : enforce diff/patch/JSON output shapes
//
// Run:  node scripts/tokenkit/harmony-mcp.mjs
// Wire into an MCP client:
//   {"command":"node","args":["scripts/tokenkit/harmony-mcp.mjs"]}
// (point at repo root; the server is idempotent + offline)

import {
  REPO_ROOT, fs, path, loadTS, parseSymbols, listCodeFiles,
  estTokens, shortHash, normPath, loadGraph,
} from "./lib.mjs";
import { buildPack } from "./pack-core.mjs";
import { searchLocal } from "./grep-core.mjs";
import { jump, consumersOf } from "./graph-core.mjs";

// --- minimal MCP (JSON-RPC 2.0) over stdio ------------------------------
const TOOLS = [
  { name: "pack_context", description: "Pack a path/directory into a single token-optimized context file and return {rawTokens,packedTokens,savingsPct,preview}.", inputSchema: { type: "object", properties: { target: { type: "string" }, bodies: { type: "integer", description: "lines of symbol body to include (default 0)" }, symbolsOnly: { type: "boolean" } }, required: ["target"] } },
  { name: "semantic_search", description: "Local, no-LLM code search by hashed token vectors. Returns ranked {file,score,symbols}.", inputSchema: { type: "object", properties: { query: { type: "string" }, top: { type: "integer" }, pathFilter: { type: "string" } }, required: ["query"] } },
  { name: "symbol_jump", description: "Knowledge-graph jump-to a symbol: definition file/line, imports, consumers.", inputSchema: { type: "object", properties: { symbol: { type: "string" }, depth: { type: "integer" }, body: { type: "boolean" } }, required: ["symbol"] } },
  { name: "token_budget", description: "Given a goal + available context, return a token budget plan, recommended model tier (local vs flagship), and a filtered prompt.", inputSchema: { type: "object", properties: { goal: { type: "string" }, availableTokens: { type: "integer" }, content: { type: "string" } }, required: ["goal"] } },
  { name: "format_output", description: "Constrain a requested answer into diff/patch/JSON shape to minimize generation tokens.", inputSchema: { type: "object", properties: { mode: { type: "string", enum: ["diff", "patch", "json"] }, instruction: { type: "string" }, draft: { type: "string" } }, required: ["mode"] } },
];

function handle(method, params = {}) {
  switch (method) {
    case "initialize":
      return { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "tokenkit-harmony", version: "1.0.0" } };
    case "tools/list":
      return { tools: TOOLS };
    case "tools/call": {
      const name = params.name;
      const a = params.arguments || {};
      let result;
      switch (name) {
        case "pack_context":
          result = packMcp(a); break;
        case "semantic_search":
          result = searchMcp(a); break;
        case "symbol_jump":
          result = jumpMcp(a); break;
        case "token_budget":
          result = budgetMcp(a); break;
        case "format_output":
          result = formatMcp(a); break;
        default:
          return { isError: true, content: [{ type: "text", text: `unknown tool ${name}` }] };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    default:
      return null;
  }
}
function packMcp(a) {
  const r = buildPack({ target: a.target, bodies: a.bodies || 0, symbolsOnly: !!a.symbolsOnly });
  return { ...r, preview: r.text.slice(0, 800) };
}
function searchMcp(a) { return searchLocal({ query: a.query, top: a.top || 10, pathFilter: a.pathFilter }); }
function jumpMcp(a) { return jump({ symbol: a.symbol, body: !!a.body, depth: a.depth }); }

// --- token budgeting + model routing + prompt filtering -----------------
const TIER = {
  local: { model: "ollama/qwen2.5:1.5b", goodFor: "search, file resolution, formatting, symbol jump, small diffs", cap: 8192 },
  mid:   { model: "ollama/qwen2.5:14b", goodFor: "moderate reasoning, single-file edits", cap: 32768 },
  flag:  { model: "flagship (your configured model)", goodFor: "complex multi-file reasoning, architecture", cap: 128000 },
};
function tierFor(goal, availableTokens) {
  const g = String(goal).toLowerCase();
  const complex = /(architec|refactor|redesign|multi-file|cross-cut|algorithm|prove|architecture)/.test(g);
  const localish = /(search|find|locate|format|jump|symbol|diff|import|which|where|token)/.test(g);
  if (complex) return "flag";
  if (localish || (availableTokens && availableTokens < 32768)) return "local";
  return "mid";
}
function budgetMcp(a) {
  const available = a.availableTokens || 32768;
  const tier = tierFor(a.goal, available);
  // Filter the content down to what serves the goal (drop stopword noise, cap).
  let filtered = a.content ? String(a.content) : "";
  const goalWords = new Set((String(a.goal).toLowerCase().match(/[a-z0-9_]+/g) || []).filter((w) => w.length > 2));
  if (filtered && goalWords.size) {
    const lines = filtered.split("\n").map((l) => l.trim()).filter(Boolean);
    const kept = lines.filter((l) => l.length < 600 && l.toLowerCase().split(/\W+/).some((w) => goalWords.has(w)));
    filtered = (kept.length ? kept : lines).slice(0, Math.max(1, Math.floor(available / 4)))
      .join("\n");
    if (filtered.length > available * 3) filtered = filtered.slice(0, available * 3);
  }
  return {
    goal: a.goal,
    tier: TIER[tier],
    tierKey: tier,
    budgetTokens: available,
    reservedForOutput: Math.max(256, Math.floor(available * 0.2)),
    contextTokens: Math.max(0, available - Math.max(256, Math.floor(available * 0.2))),
    filteredPromptTokens: estTokens(filtered),
    filteredPrompt: filtered,
    guidance: "Feed the filteredPrompt (not the raw content) + the packed context; run local tier for search/format, flag only for the complex reasoning step.",
  };
}
function formatMcp(a) {
  const inst = a.instruction || "";
  const draft = a.draft || "";
  if (a.mode === "json") {
    // Force a tight JSON envelope; strip prose.
    const stripped = draft.replace(/```json?/g, "").replace(/```/g, "").trim();
    let parsed = null; try { parsed = JSON.parse(stripped); } catch {}
    const envelope = parsed
      ? { ok: true, payload: parsed }
      : { ok: false, instruction: inst, raw: stripped.slice(0, 400) };
    return { mode: "json", output: JSON.stringify(envelope) };
  }
  if (a.mode === "diff" || a.mode === "patch") {
    const marker = a.mode === "diff" ? "diff --git" : "Index:";
    const body = draft.includes(marker) ? draft : `# ${inst}\n${draft}`;
    return { mode: a.mode, output: body, hint: "Prefer unified-diff hunks over full-file rewrites; keep unchanged lines out of the output." };
  }
  return { mode: a.mode, output: draft };
}

// --- stdio JSON-RPC loop ------------------------------------------------
let buf = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf("\n")) !== -1) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let req; try { req = JSON.parse(line); } catch { continue; }
    if (req.method === "notifications/initialized") continue;
    if (req.id === undefined) continue; // notification
    const res = handle(req.method, req.params);
    const out = res === null
      ? { jsonrpc: "2.0", id: req.id, error: { code: -32601, message: "Method not found" } }
      : { jsonrpc: "2.0", id: req.id, result: res };
    process.stdout.write(JSON.stringify(out) + "\n");
  }
});

// re-export for testing
export { budgetMcp, formatMcp, tierFor };
