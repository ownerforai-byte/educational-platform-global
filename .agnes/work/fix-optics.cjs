const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
const tv = path.join(base, "components/lab/topic-visuals");

const opticsFiles = [
  "optics-reflection-3d.tsx",
  "optics-refraction-3d.tsx",
  "optics-tir-3d.tsx",
  "optics-lens-3d.tsx",
  "optics-prism-3d.tsx",
  "optics-dispersion-3d.tsx",
  "optics-power-3d.tsx",
  "optics-lens-maker-3d.tsx",
  "optics-telescope-3d.tsx",
  "optics-microscope-3d.tsx",
];

for (const f of opticsFiles) {
  const fp = path.join(tv, f);
  let t = fs.readFileSync(fp, "utf8");
  let changed = 0;

  // 1) Convert default imports of the two shared components to named imports
  const beforeA = t;
  t = t.replace(
    /^import\s+CollapsibleControls\s+from\s+("@\/components\/lab\/collapsible-controls");/m,
    'import { CollapsibleControls } from "$1";'
  );
  t = t.replace(
    /^import\s+WebGLFallback\s+from\s+("@\/components\/lab\/webgl-fallback");/m,
    'import { WebGLFallback } from "$1";'
  );
  if (t !== beforeA) changed++;

  // 2) Add a named re-export alongside the existing default export so that
  //    `import { OpticsX3d } from "..."` in lib/topic-3d-map.ts resolves.
  const m = t.match(/export\s+default\s+function\s+([A-Za-z0-9_$]+)/);
  if (m && !new RegExp("\\bexport\\s*\\{[^}]*\\b" + m[1] + "\\b[^}]*\\}").test(t)) {
    t = t.replace(
      /export\s+default\s+function\s+([A-Za-z0-9_$]+)/,
      "export default function $1"
    );
    t = t + "\n\nexport { " + m[1] + " };\n";
    changed++;
  }

  if (changed > 0) {
    fs.writeFileSync(fp, t);
    console.log("fixed " + f + " (" + changed + " change(s))");
  } else {
    console.log("OK " + f + " (already fine)");
  }
}
