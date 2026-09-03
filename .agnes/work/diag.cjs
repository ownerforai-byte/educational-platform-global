const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
const tv = path.join(base, "components/lab/topic-visuals");
for (const f of ["optics-dispersion-3d.tsx", "optics-lens-3d.tsx"]) {
  const t = fs.readFileSync(path.join(tv, f), "utf8");
  const named = [...t.matchAll(/export\s+(?:async\s+)?(?:function|class|const)\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
  const hasDefault = /export\s+default/.test(t);
  console.log(f, "->", "named:", named.join(", "), "| default:", hasDefault);
}
// What does topic-3d-map import?
const map = fs.readFileSync(path.join(base, "lib/topic-3d-map.ts"), "utf8");
const imp = map.match(/import[^;]*from\s+["']\.[^"']*optics-dispersion-3d[^"']*["']/g);
console.log("map import for dispersion:", imp ? imp[0] : "(none / dynamic)");
// Is there a .next cache?
console.log(".next exists:", fs.existsSync(path.join(base, ".next")));
const nm = path.join(base, "node_modules");
console.log("frontend node_modules exists:", fs.existsSync(nm));
const rootNm = path.join(base, "..", "node_modules");
console.log("root node_modules exists:", fs.existsSync(rootNm));
// next version
try {
  const np = JSON.parse(fs.readFileSync(path.join(rootNm, "next/package.json"), "utf8"));
  console.log("root next version:", np.version);
} catch (e) { console.log("root next pkg read failed:", e.message); }
