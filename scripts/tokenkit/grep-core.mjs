// scripts/tokenkit/grep-core.mjs
// Shared local semantic search for grepai.mjs + harmony-mcp.
// searchLocal({ query, top, pathFilter, rebuild }) -> { query, results:[{file,score,symbols}] }

import { REPO_ROOT, fs, path, loadTS, parseSymbols, listCodeFiles, estTokens, normPath } from "./lib.mjs";

const INDEX_PATH = path.join(REPO_ROOT, "graphify-out", "tokenkit-index.json");
const STOP = new Set(["the","and","for","with","from","import","export","type","let","const","var","function","return","if","else","new","this","null","true","false","undefined","void","as","interface","class","extends","implements","super","switch","case","break","continue","try","catch","finally","throw","yield","async","await","in","of","do","while","is","are","was","were","has","have","had","can","will","would","should","could","that","then","when","than","so","but","not"]);

function splitTokens(t) {
  return String(t).toLowerCase().split(/[^a-z0-9_]+/).filter((x) => x.length > 1 && !STOP.has(x));
}
function expandIdent(t) {
  const parts = String(t).match(/[A-Za-z0-9]+/g);
  return parts ? [String(t), ...parts] : [String(t)];
}
function symbolTokens(sym, src) {
  const set = new Set();
  for (const p of expandIdent(sym.name)) for (const t of splitTokens(p)) set.add(t);
  if (sym.signature) for (const t of splitTokens(sym.signature)) set.add(t);
  const specs = extractImportSpecsLocal(src || "");
  for (const s of specs) for (const t of splitTokens(s.replace(/^\.+/, "").replace(/.*[\\/]/, ""))) set.add(t);
  return [...set];
}
const IMPORT_LOCAL = /(?:import\s+(?:[\s\S]*?from\s+)?|export\s+(?:[\s\S]*?from\s+)?)["']([^"']+)["']/g;
function extractImportSpecsLocal(src) {
  const out = new Set(); IMPORT_LOCAL.lastIndex = 0; let m;
  while ((m = IMPORT_LOCAL.exec(src))) out.add(m[1]);
  const bare = /import\s+["']([^"']+)["']/g; while ((m = bare.exec(src))) out.add(m[1]);
  return [...out];
}

export function buildIndex() {
  const ts = loadTS();
  const files = listCodeFiles();
  const docs = [];
  for (const rel of files) {
    const abs = path.join(REPO_ROOT, rel);
    let src = ""; try { src = fs.readFileSync(abs, "utf8"); } catch { continue; }
    const syms = parseSymbols(abs, rel, ts);
    const fileToks = new Set(splitTokens(src));
    const docToks = new Set(fileToks);
    for (const s of syms) for (const t of symbolTokens(s, src)) docToks.add(t);
    docs.push({ rel, tokens: [...docToks], symbols: syms.map((s) => ({ n: s.name, k: s.kind, l: s.startLine })) });
  }
  const inv = new Map();
  docs.forEach((d, di) => { for (const t of d.tokens) { if (!inv.has(t)) inv.set(t, []); inv.get(t).push(di); } });
  const idx = {
    builtAt: Date.now(),
    fileCount: docs.length,
    inv: Object.fromEntries(inv),
    docs: docs.map((d) => ({ rel: d.rel, tokenCount: d.tokens.length, symbols: d.symbols })),
  };
  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(idx));
  return idx;
}
export function loadIndex(rebuild) {
  if (!rebuild && fs.existsSync(INDEX_PATH)) {
    try { const c = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8")); if (c.builtAt) return c; } catch {}
  }
  return buildIndex();
}
export function rankQuery(idx, query, topN, pathFilter) {
  const qtoks = new Set();
  for (const p of query.toLowerCase().match(/[a-z0-9_]+/g) || []) qtoks.add(p);
  for (const raw of (query.match(/[A-Za-z0-9_]+/g) || [])) for (const p of expandIdent(raw)) { const t = splitTokens(p)[0]; if (t) qtoks.add(t); }
  const qvSize = qtoks.size || 1;
  const scores = new Map();
  const inv = (idx.inv && idx.inv.constructor === Map) ? idx.inv : new Map(Object.entries(idx.inv || {}));
  for (const [t, diList] of inv.entries()) {
    if (!qtoks.has(t)) continue;
    for (const di of diList) {
      const d = idx.docs[di];
      scores.set(di, (scores.get(di) || 0) + 1 / Math.sqrt(qvSize * d.tokenCount));
    }
  }
  let entries = [...scores.entries()].map(([di, s]) => ({ ...idx.docs[di], score: s }));
  if (pathFilter) entries = entries.filter((e) => e.rel.includes(pathFilter));
  entries.sort((a, b) => b.score - a.score);
  return entries.slice(0, topN);
}
export function searchLocal({ query, top = 10, pathFilter, rebuild = false }) {
  const idx = loadIndex(rebuild);
  const top_ = rankQuery(idx, query, top, pathFilter);
  return {
    query,
    results: top_.map((e) => ({ file: e.rel, score: +e.score.toFixed(4), symbols: e.symbols.slice(0, 20) })),
  };
}
