// scripts/tokenkit/graph-core.mjs
// Shared knowledge-graph jump-to for codegraph.mjs + harmony-mcp.
// jump({ symbol, body, depth }) -> { status, symbol, definition, imports, consumers, tokenEstimate }

import { REPO_ROOT, fs, path, loadGraph, loadTS, parseSymbols, listCodeFiles, normPath, estTokens } from "./lib.mjs";

const EXT_CANDIDATES = [".ts", ".tsx", ".js", ".jsx", ".mts", ".cts", ".mjs", ".cjs"];
const fsCache = new Map();
function readFileSafe(rel) {
  if (fsCache.has(rel)) return fsCache.get(rel);
  let text = null;
  try { text = fs.readFileSync(path.join(REPO_ROOT, rel), "utf8"); } catch {}
  fsCache.set(rel, text);
  return text;
}
function resolveSpecifier(fromFile, spec) {
  if (!spec || !spec.startsWith(".")) return null;
  const fromDir = path.dirname(fromFile);
  const base = path.posix.normalize(path.posix.join(fromDir, spec.replace(/\\/g, "/")));
  if (readFileSafe(base) != null) return base;
  for (const ext of EXT_CANDIDATES) {
    if (readFileSafe(base + ext) != null) return base + ext;
    for (const e2 of EXT_CANDIDATES) if (readFileSafe(base + "/index" + e2) != null) return base + "/index" + e2;
  }
  return null;
}
const IMPORT_RE = /(?:import\s+(?:[\s\S]*?from\s+)?|export\s+(?:[\s\S]*?from\s+)?)["']([^"']+)["']/g;
const REQUIRE_RE = /require\(\s*["']([^"']+)["']\s*\)/g;
const DYN_RE = /import\(\s*["']([^"']+)["']\s*\)/g;
function extractImportSpecs(source) {
  const specs = new Set();
  for (const re of [IMPORT_RE, REQUIRE_RE, DYN_RE]) { re.lastIndex = 0; let m; while ((m = re.exec(source))) specs.add(m[1]); }
  const bare = /import\s+["']([^"']+)["']/g; let b; while ((b = bare.exec(source))) specs.add(b[1]);
  return [...specs];
}
function importTargets(relFile) {
  const src = readFileSafe(relFile);
  if (src == null) return [];
  const out = [];
  for (const s of extractImportSpecs(src)) { const t = resolveSpecifier(relFile, s); if (t) out.push(t); }
  return out;
}
function exportNames(relFile) {
  const src = readFileSafe(relFile);
  if (src == null) return [];
  const names = new Set();
  const re = /export\s+(?:default\s+)?(?:async\s+)?(function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;
  let m; while ((m = re.exec(src))) names.add(m[2]);
  const star = /export\s*\*\s*as\s+([A-Za-z_$][\w$]*)/.exec(src); if (star) names.add(star[1]);
  return [...names];
}
const _consumerCache = new Map();
export function consumersOf(relFile) {
  if (_consumerCache.has(relFile)) return _consumerCache.get(relFile);
  const out = [];
  for (const f of listCodeFiles()) {
    if (f === relFile) continue;
    const src = readFileSafe(f);
    if (src == null) continue;
    if (extractImportSpecs(src).some((s) => resolveSpecifier(f, s) === relFile)) out.push({ file: f });
  }
  _consumerCache.set(relFile, out);
  return out;
}

let _byNorm = null, _byLabel = null;
function ensureIndexes() {
  if (_byNorm) return;
  const g = loadGraph();
  _byNorm = new Map(); _byLabel = new Map();
  for (const n of g.nodes) {
    if (n.file_type !== "code") continue;
    if (n.norm_label) _byNorm.set(n.norm_label, n);
    if (n.label) _byLabel.set(n.label.toLowerCase(), n);
  }
}
function findSymbol(query) {
  ensureIndexes();
  const q = query.toLowerCase();
  let n = _byNorm.get(q) || _byLabel.get(q);
  if (!n) for (const key of _byLabel.keys()) if (key.endsWith("." + q)) { n = _byLabel.get(key); break; }
  return n || null;
}

function readSymbolBody(file, n) {
  const src = readFileSafe(file);
  if (src == null) return null;
  const lines = src.split("\n");
  const m = n.source_location && /L(\d+)/.exec(n.source_location);
  if (m) return lines.slice(Math.max(0, +m[1] - 1), +m[1] - 1 + 24).join("\n");
  return null;
}

export function jump({ symbol, body = false, depth = 5 }) {
  const n = findSymbol(symbol);
  if (!n) {
    // source-file fallback scan (bounded)
    const ts = loadTS();
    for (const f of listCodeFiles()) {
      const src = readFileSafe(f);
      if (src == null) continue;
      const syms = parseSymbols(path.join(REPO_ROOT, f), f, ts);
      if (syms.find((s) => s.name.toLowerCase() === symbol.toLowerCase())) {
        return { status: "miss-graph", symbol, file: f, note: "found via source scan; add to knowledge graph for full links" };
      }
    }
    return { status: "miss", symbol };
  }
  const file = n.source_file;
  const up = importTargets(file).map((t) => ({ file: t, exports: exportNames(t) }));
  const down = consumersOf(file).slice(0, depth).map((c) => c.file);
  const result = {
    status: "ok",
    symbol: n.label,
    kind: n._callable_class ? "class" : "function/symbol",
    definition: { file, location: n.source_location, community: n.community_name, body: body ? readSymbolBody(file, n) : null },
    imports: up,
    consumers: down,
  };
  result.tokenEstimate = estTokens(JSON.stringify(result));
  return result;
}
