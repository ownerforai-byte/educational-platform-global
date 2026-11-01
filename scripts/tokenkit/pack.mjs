#!/usr/bin/env node
// scripts/tokenkit/pack.mjs
// Repomix-style AST/structured packing: fold a directory or file list into ONE
// context file (default tokenkit-out/context.md) that is dramatically smaller
// than the raw source, for cheap LLM context. Reports raw vs packed tokens.
//
// Output structure (token-optimized):
//   - header (manifest, file list, total tokens)
//   - per file: path + imports + exported symbols (signatures only, not bodies)
//   - optional --bodies: include symbol bodies truncated to N lines
//   - optional --symbols-only: skip import/ident detail
//
// Usage:
//   node scripts/tokenkit/pack.mjs <relPathOrDir> [--out f] [--bodies n] [--symbols-only] [--json]

import { REPO_ROOT, fs, path, normPath } from "./lib.mjs";
import { buildPack } from "./pack-core.mjs";

const OUT_DIR = path.join(REPO_ROOT, "tokenkit-out");
const DEFAULT_OUT = path.join(OUT_DIR, "context.md");

const args = process.argv.slice(2);
const opts = {}; const pos = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--json") opts.json = true;
  else if (a === "--out") opts.out = args[++i];
  else if (a === "--bodies") opts.bodies = +args[++i] || 0;
  else if (a === "--symbols-only") opts.symbolsOnly = true;
  else pos.push(a);
}
const target = pos[0];
if (!target) { console.error("usage: pack <pathOrDir> [--out f] [--bodies n] [--symbols-only] [--json]"); process.exit(1); }

const r = buildPack({ target, bodies: opts.bodies, symbolsOnly: !!opts.symbolsOnly });
const outFile = opts.out ? path.join(REPO_ROOT, opts.out) : DEFAULT_OUT;
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, r.text);

if (opts.json) {
  console.log(JSON.stringify({
    status: "ok", target, files: r.files,
    outFile: normPath(outFile),
    rawTokens: r.rawTokens, packedTokens: r.packedTokens,
    savingsPct: r.savingsPct, bytes: r.bytes,
  }, null, 2));
} else {
  console.log(`packed ${r.files} files -> ${normPath(outFile)}`);
  console.log(`raw ${r.rawTokens} -> packed ${r.packedTokens} tokens (${r.savingsPct}% savings, ${r.bytes} bytes)`);
}
