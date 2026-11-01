#!/usr/bin/env node
// scripts/tokenkit/grepai.mjs
// 100% LOCAL semantic-ish code search — no LLM, no network.
// Builds a hashed bag-of-tokens vector per symbol/file and ranks queries by
// cosine similarity + exact-symbol boosts. Index is cached to disk so repeat
// queries are instant. Run this BEFORE burning LLM tokens.
//
// Usage:
//   node scripts/tokenkit/grepai.mjs index            # (re)build local index
//   node scripts/tokenkit/grepai.mjs search "query" [--top n] [--path filter] [--json]
//   node scripts/tokenkit/grepai.mjs search "query" --rebuild   # force index rebuild

import { normPath, REPO_ROOT } from "./lib.mjs";
import { buildIndex, loadIndex, searchLocal } from "./grep-core.mjs";

const args = process.argv.slice(2);
const opts = {}; const pos = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") opts.json = true;
  else if (a === "--top") opts.top = +args[++i] || 10;
  else if (a === "--path") opts.path = args[++i];
  else if (a === "--rebuild") opts.rebuild = true;
  else pos.push(a);
}
const [cmd] = pos;
if (cmd === "index") {
  const idx = buildIndex();
  const out = { status: "indexed", files: idx.fileCount, tokens: Object.keys(idx.inv).length, cache: normPath("graphify-out/tokenkit-index.json") };
  console.log(opts.json ? JSON.stringify(out, null, 2) : `indexed ${idx.fileCount} files, ${Object.keys(idx.inv).length} tokens -> ${out.cache}`);
} else if (cmd === "search") {
  const q = pos[1];
  if (!q) { console.error('usage: grepai search "query" [--top n] [--path f] [--rebuild] [--json]'); process.exit(1); }
  const res = opts.rebuild ? searchLocal({ query: q, top: opts.top, pathFilter: opts.path, rebuild: true }) : searchLocal({ query: q, top: opts.top, pathFilter: opts.path });
  if (opts.json) {
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(`# grepai local results for: "${q}"  (top ${res.results.length})`);
    for (const e of res.results) {
      const symList = (e.symbols || []).slice(0, 8).map((s) => s.n).join(", ");
      console.log(`  ${e.score.toFixed(3)}  ${e.file}   [${symList}]`);
    }
  }
} else {
  console.error("commands: index | search <q> [--top n] [--path f] [--rebuild] [--json]");
  process.exit(1);
}
