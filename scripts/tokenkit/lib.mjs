// scripts/tokenkit/lib.mjs
// Shared helpers for the token-optimization toolkit.
// Zero new dependencies: Node built-ins + the repo's existing `typescript`.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, "..", "..");
export const GRAPH_PATH = path.join(REPO_ROOT, "graphify-out", "graph.json");

// --- path + token basics -------------------------------------------------
export function normPath(p) {
  return String(p).replace(/\\/g, "/").replace(/^\.\//, "");
}
/** Repo-relative path from an absolute path ("" if outside). */
export function toRel(abs) {
  let r = path.relative(REPO_ROOT, abs);
  if (r.startsWith("..")) r = abs;
  return normPath(r);
}
/** Heuristic token estimate: ~4 chars/token + 1 per 4 newlines. */
export function estTokens(text) {
  if (!text) return 0;
  const s = String(text);
  return Math.ceil(s.length / 4) + Math.ceil((s.match(/\n/g) || []).length / 4);
}
/** Short stable 8-hex FNV-style digest for cache/identity keys. */
export function shortHash(s) {
  return crypto.createHash("sha1").update(String(s)).digest("hex").slice(0, 8);
}

// --- repo source discovery (respects common ignore dirs) -----------------
const IGNORED = new Set([
  "node_modules", ".next", "out", "build", "dist", "public",
  "content", "graphify-out", "play-store", "visuals-py",
]);
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"]);
function shouldWalk(dirName) {
  return !IGNORED.has(dirName) && !dirName.startsWith(".");
}
/** Recursively list code files under relRoot, honoring IGNORED dirs. */
export function listCodeFiles(relRoot = "") {
  const rootAbs = path.join(REPO_ROOT, relRoot);
  const out = [];
  (function walk(d) {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) { if (shouldWalk(e.name)) walk(full); continue; }
      if (CODE_EXT.has(path.extname(e.name))) out.push(toRel(full));
    }
  })(rootAbs);
  return out;
}

// --- lazy knowledge graph ------------------------------------------------
let _graph = null;
export function loadGraph() {
  if (_graph) return _graph;
  _graph = JSON.parse(fs.readFileSync(GRAPH_PATH, "utf8"));
  return _graph;
}

// --- TypeScript parser (fallback-safe) ----------------------------------
let _ts;
export function loadTS() {
  if (_ts !== undefined) return _ts;
  try {
    const req = createRequire(path.join(REPO_ROOT, "package.json"));
    _ts = req("typescript");
  } catch {
    _ts = false;
  }
  return _ts;
}
/**
 * parseSymbols(fileAbs, rel, ts): returns
 * [{ name, kind, startLine, endLine, signature, startOffset?, endOffset? }]
 * Uses the TS Compiler API when available; otherwise a regex heuristic.
 */
export function parseSymbols(fileAbs, rel, ts) {
  const src = fs.readFileSync(fileAbs, "utf8");
  if (ts) {
    const out = [];
    const sf = ts.createSourceFile(
      rel, src, ts.ScriptTarget.Latest, true,
      fileAbs.endsWith(".tsx") ? ts.ScriptKind.TSX
        : fileAbs.endsWith(".jsx") ? ts.ScriptKind.JSX
        : /\.[cm]?js$/.test(fileAbs) ? ts.ScriptKind.JS : ts.ScriptKind.TS,
    );
    (function visit(node) {
      if (ts.isFunctionDeclaration(node) && node.name) {
        out.push(mkSym(node.name.text, "fn", node, src));
      } else if (ts.isClassDeclaration(node) && node.name) {
        out.push(mkSym(node.name.text, "class", node, src));
      } else if (ts.isInterfaceDeclaration(node) && node.name) {
        out.push(mkSym(node.name.text, "interface", node, src));
      } else if (ts.isTypeAliasDeclaration(node) && node.name) {
        out.push(mkSym(node.name.text, "type", node, src));
      } else if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          if (ts.isIdentifier(decl.name) && decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
            out.push(mkSym(decl.name.text, "const-fn", decl, src));
          }
        }
      }
      ts.forEachChild(node, visit);
    })(sf);
    return out;
  }
  // Fallback heuristic: named function/class/interface/const-arrow.
  const out = [];
  const re = /(^|\n)(?:export\s+)?(?:default\s+)?(function|class|interface|type|const|let|var)\s+([A-Za-z_$][\w$]*)/g;
  const lines = src.split("\n");
  let m;
  while ((m = re.exec(src))) {
    const name = m[3];
    const kind = m[2] === "class" ? "class"
      : (m[2] === "interface" || m[2] === "type") ? "type"
      : m[2] === "const" || m[2] === "let" || m[2] === "var" ? "var" : "fn";
    const lineNo = lines.slice(0, m.index).reduce((a, l) => a + l.length + 1, 0);
    out.push({ name, kind, startLine: lineNo, signature: m[0].replace(/\s+/g, " ").trim().slice(0, 80) });
  }
  return out;
}
function lineAt(offset, src) {
  let n = 1, i = 0;
  while (i < offset && i < src.length) { if (src[i] === "\n") n++; i++; }
  return n;
}
function mkSym(name, kind, node, src) {
  const start = node.getStart ? node.getStart() : 0;
  const end = node.getEnd ? node.getEnd() : start;
  const sig = src.slice(start, Math.min(end, start + 120)).split("\n")[0];
  return {
    name, kind,
    startLine: lineAt(start, src), endLine: lineAt(end, src),
    startOffset: start, endOffset: end,
    signature: sig.slice(0, 100),
  };
}

export { fs, path };
