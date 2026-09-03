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
  let changed = false;

  // Fix the double-quoted imports my earlier script created
  t = t.replace(/from\s+""(@\/[^"]+)""/g, 'from "$1"');

  // Now ensure named exports are added (idempotent)
  const m = t.match(/export\s+default\s+function\s+([A-Za-z0-9_$]+)/);
  if (m && !new RegExp("\\bexport\\s*\\{[^}]*\\b" + m[1] + "\\b[^}]*\\}").test(t)) {
    t += "\n\nexport { " + m[1] + " };\n";
    changed = true;
  }

  fs.writeFileSync(fp, t);
  console.log(f + ": " + (changed ? "fixed (named export added)" : "already had named export"));
}
