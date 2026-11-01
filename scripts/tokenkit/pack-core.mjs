// scripts/tokenkit/pack-core.mjs
// Shared packing logic for pack.mjs CLI + harmony-mcp.
// buildPack({ target, bodies, symbolsOnly }) -> { text, rawTokens, packedTokens, savingsPct, bytes, files }

import { REPO_ROOT, fs, path, loadTS, parseSymbols, listCodeFiles, estTokens, normPath } from "./lib.mjs";

function importSpecs(src) {
  const out = new Set();
  const re = /(?:import\s+(?:[\s\S]*?from\s+)?|export\s+(?:[\s\S]*?from\s+)?)["']([^"']+)["']/g;
  let m; while ((m = re.exec(src))) out.add(m[1]);
  const bare = /import\s+["']([^"']+)["']/g; while ((m = bare.exec(src))) out.add(m[1]);
  const dyn = /import\(\s*["']([^"']+)["']\s*\)/g; while ((m = dyn.exec(src))) out.add(m[1]);
  return [...out];
}
function exportsOf(src) {
  const names = new Set();
  const re = /export\s+(?:default\s+)?(?:async\s+)?(function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;
  let m; while ((m = re.exec(src))) names.add(m[2]);
  return [...names];
}
function collectFiles(target) {
  const t = normPath(target);
  const direct = path.join(REPO_ROOT, t);
  if (t.includes("/") && fs.existsSync(direct) && fs.statSync(direct).isFile()) return [t];
  const files = listCodeFiles(t);
  return files.length ? files : [t];
}

export function buildPack({ target, bodies = 0, symbolsOnly = false }) {
  const ts = loadTS();
  const files = collectFiles(target);
  const sections = [];
  let rawTokens = 0, packedTokens = 0;
  for (const rel of files) {
    const abs = path.join(REPO_ROOT, rel);
    let src = ""; try { src = fs.readFileSync(abs, "utf8"); } catch { continue; }
    rawTokens += estTokens(src);
    const syms = parseSymbols(abs, rel, ts);
    let block = `## ${rel}\n`;
    const imp = importSpecs(src), exp = exportsOf(src);
    if (!symbolsOnly) block += `imports: ${imp.length ? imp.join(", ") : "(none)"}\n`;
    block += `exports: ${exp.length ? exp.join(", ") : "(none)"}\n`;
    if (bodies && syms.length) {
      const lines = src.split("\n");
      for (const s of syms.slice(0, 24)) {
        if (s.startLine) {
          const end = s.endLine || s.startLine;
          const body = lines.slice(s.startLine - 1, s.startLine - 1 + Math.min(bodies, end - s.startLine + 1)).join("\n");
          block += `\n### ${s.kind} ${s.name} (L${s.startLine})\n\`\`\`\n${body}\n\`\`\`\n`;
        } else block += `\n### ${s.kind} ${s.name} L${s.startLine}\n`;
      }
    }
    packedTokens += estTokens(block);
    sections.push(block);
  }
  const text = `# TokenKit packed context for: ${normPath(target)}\n` +
    `files: ${files.length}   raw-est: ${rawTokens}   packed-est: ${packedTokens}\n` +
    `savings: ${Math.max(0, Math.round((1 - packedTokens / Math.max(1, rawTokens)) * 100))}%\n\n` +
    sections.join("\n---\n");
  return {
    text, files: files.length, rawTokens, packedTokens,
    savingsPct: Math.max(0, Math.round((1 - packedTokens / Math.max(1, rawTokens)) * 100)),
    bytes: text.length,
  };
}
