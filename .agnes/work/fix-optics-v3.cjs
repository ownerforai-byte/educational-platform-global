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

  // Fix 1: Default imports → named imports for shared components
  t = t.replace(
    /^import\s+CollapsibleControls\s+from\s+("@\/components\/lab\/collapsible-controls");$/,
    'import { CollapsibleControls } from "$1";'
  );
  t = t.replace(
    /^import\s+WebGLFallback\s+from\s+("@\/components\/lab\/webgl-fallback");$/,
    'import { WebGLFallback } from "$1";'
  );

  // Fix 2: Add named export alongside default so topic-3d-map.ts imports work
  const m = t.match(/^export\s+default\s+function\s+([A-Za-z0-9_$]+)/m);
  if (m && !/\bexport\s+\{\s*\1\s*\}/.test(t)) {
    const name = m[1];
    // Insert "export { Name };" right after the default function line
    t = t.replace(
      new RegExp("^(export\\s+default\\s+function\\s+" + name.replace("$", "\\$").replace("^", "^") + ")"),
      "$1\n\nexport { " + name + " };"
    );
  }

  fs.writeFileSync(fp, t);
  console.log("Fixed " + f);
}
console.log("Done. All 10 optics files fixed.");
