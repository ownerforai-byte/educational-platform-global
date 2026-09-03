const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";

// Find ALL default imports (import X from "..." / import X, { y } from "...")
// that point at files whose target lacks a default export.
const files = [];
(function walk(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    if (e.name === "node_modules" || e.name === ".next" || e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(path.join(base, "lib"));
walk2:
function walk2(d) {}
(function walkDir(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(path.join(base, "components"));
(function walkDir(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    if (e.name === "node_modules" || e.name === ".next" || e.name === "app") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(path.join(base, "features"));
(function walkDir(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
  }
})(path.join(base, "app"));

const tsFiles = new Set(files);
const problems = [];

function resolveTarget(spec, fromFile) {
  let p;
  if (spec.startsWith("@/")) p = path.resolve(base, spec.slice(2));
  else if (spec.startsWith(".")) p = path.resolve(path.dirname(fromFile), spec);
  else return null; // external
  for (const cand of [p + ".tsx", p + ".ts", p + "/index.tsx", p + "/index.ts", p]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

for (const f of tsFiles) {
  const t = fs.readFileSync(f, "utf8");
  // default imports: import Default from "..."   or  import Default, { a } from "..."
  for (const m of t.matchAll(/import\s+([A-Za-z_$][\w$]*)\s*(?:,\s*\{[^}]*\})?\s*from\s*"([^"]+)"/g)) {
    const target = resolveTarget(m[2], f);
    if (!target) continue;
    const tt = fs.readFileSync(target, "utf8");
    if (!/export\s+default/.test(tt)) {
      problems.push(path.relative(base, f) + " imports default '" + m[1] + "' from " + m[2] + " -> " + path.relative(base, target));
    }
  }
}
console.log("Default-import problems:", problems.length);
problems.slice(0, 50).forEach(p => console.log("  " + p));
