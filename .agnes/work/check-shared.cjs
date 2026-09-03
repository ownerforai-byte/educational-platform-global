const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";

for (const f of ["components/lab/collapsible-controls.tsx", "components/lab/webgl-fallback.tsx"]) {
  const t = fs.readFileSync(path.join(base, f), "utf8");
  const named = [...t.matchAll(/export\s+(?:async\s+)?(?:function|class|const)\s+([A-Za-z0-9_$]+)/g)].map(x => x[1]);
  console.log(f, "-> named:", named.join(", "), "| default:", /export\s+default/.test(t));
  console.log(t.split("\n").filter(l => /export/.test(l)).join("\n"));
  console.log("---");
}
// How do OTHER (non-optics) topic-visuals import these?
const tv = path.join(base, "components/lab/topic-visuals");
const sample = fs.readdirSync(tv).filter(f => f === "wave-optics-3d.tsx" || f === "nuclear-physics-3d.tsx" || f === "gravitation-orbit-3d.tsx");
for (const f of sample) {
  const t = fs.readFileSync(path.join(tv, f), "utf8");
  const lines = t.split("\n").filter(l => /CollapsibleControls|WebGLFallback/.test(l) && /import/.test(l));
  console.log(f, "->", lines.join(" | "));
}
