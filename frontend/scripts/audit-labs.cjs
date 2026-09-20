// Audit: which registry entries are type "theory" and which "3d" entries
// mount real WebGL. Run: node scripts/audit-labs.cjs (from frontend/)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync("lib/lab-registry.tsx", "utf8");

const entries = [];
// Split at each entry start, then take fields within the chunk (up to next id:)
const starts = [...src.matchAll(/\n    id: "([^"]+)",/g)];
for (let i = 0; i < starts.length; i++) {
  const chunk = src.slice(starts[i].index, i + 1 < starts.length ? starts[i + 1].index : undefined);
  const id = starts[i][1];
  const cat = (chunk.match(/category:\s*"([^"]+)"/) || [])[1];
  const type = (chunk.match(/type:\s*"([a-z0-9]+)" as const/) || [])[1];
  const comp = (chunk.match(/component:\s*([A-Za-z0-9_.]+),/) || [])[1];
  // component may be defined before or after type; if comp missing, look in a wider slice
  const compFallback = comp || (chunk.match(/component:\s*([A-Za-z0-9_.]+)/) || [])[1];
  entries.push({ id, cat, type, comp: compFallback });
}

const theory = entries.filter((e) => e.type === "theory");
const three = entries.filter((e) => e.type === "3d");
console.log(`parsed=${entries.length} theory=${theory.length} 3d=${three.length}`);

// Map each component import name -> its source file
const imports = {};
const impRe = /import\s*(?:\{([^}]*)\}|\w+|\*\s+as\s+(\w+))\s*from\s*"([^"]+lab[^"]*)"/g;
while ((m = impRe.exec(src)) !== null) {
  const names = m[1] ? m[1].split(",").map((s) => s.trim().split(/\s+as\s+/).pop()) : [m[2]];
  names.forEach((n) => { if (n) imports[n.trim()] = m[3]; });
}

function resolvesTo(file) {
  const base = file.replace("@/", "frontend/").replace(/^\//, "");
  const cands = [
    path.join("..", base + ".tsx"),
    path.join("..", base + ".ts"),
    path.join("..", base, "index.tsx"),
  ];
  for (const c of cands) if (fs.existsSync(c)) return c;
  return null;
}

function usesWebGL(file, depth = 0) {
  if (!file || depth > 4) return { webgl: false, reason: "unresolvable-or-deep" };
  let code;
  try { code = fs.readFileSync(file, "utf8"); } catch { return { webgl: false, reason: "unreadable" }; }
  if (/createThreeScene|new THREE\.WebGLRenderer|useThree\(/.test(code)) return { webgl: true, reason: "direct" };
  if (/is2D|svg|SVG|canvas2d|getContext\("2d"\)/i.test(code) && !/three/i.test(code)) {
    return { webgl: false, reason: "2D/SVG" };
  }
  // follow local imports
  const localImp = /import[^"']*from\s*"\.\/([^"]+)"|import[^"']*from\s*"@\/components\/([^"]+)"/g;
  let im;
  while ((im = localImp.exec(code)) !== null) {
    const target = im[1] ? path.join(path.dirname(file), im[1]) : path.join("..", "frontend", "components", im[2]);
    for (const ext of [".tsx", ".ts", "/index.tsx"]) {
      if (fs.existsSync(target + ext)) {
        const r = usesWebGL(target + ext, depth + 1);
        if (r.webgl) return { webgl: true, reason: "via " + path.basename(target + ext) };
      }
    }
  }
  return { webgl: false, reason: "no-webgl-found" };
}

console.log("\n=== THEORY ENTRIES ===");
theory.forEach((e) => console.log(`${e.id} | ${e.cat} | comp=${e.comp}`));

console.log("\n=== 3D ENTRIES WITHOUT REAL WEBGL ===");
const seen = new Map();
for (const e of three) {
  if (seen.has(e.comp)) { continue; }
  const file = imports[e.comp] ? resolvesTo(imports[e.comp]) : null;
  const r = usesWebGL(file);
  if (!r.webgl) seen.set(e.comp, { ids: [], file: file || "(unresolved import)", reason: r.reason });
  if (seen.has(e.comp)) seen.get(e.comp).ids.push(e.id);
}
if (seen.size === 0) console.log("(none — all 3D entries reach WebGL)");
for (const [comp, info] of seen) {
  console.log(`${comp} (${info.reason}) file=${info.file}`);
  console.log(`   entries: ${info.ids.join(", ")}`);
}

console.log("\n=== THEORY COUNT PER SUBJECT ===");
const perSub = {};
theory.forEach((e) => { perSub[e.cat] = (perSub[e.cat] || 0) + 1; });
console.log(JSON.stringify(perSub));
