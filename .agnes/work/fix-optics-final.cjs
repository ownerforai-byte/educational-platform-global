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
  const lines = t.split("\n");
  let changed = false;

  // Fix imports on lines 7 and 9
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('import CollapsibleControls from "@/components/lab/collapsible-controls"')) {
      lines[i] = 'import { CollapsibleControls } from "@/components/lab/collapsible-controls";';
      changed = true;
    }
    if (lines[i].includes('import WebGLFallback from "@/components/lab/webgl-fallback"')) {
      lines[i] = 'import { WebGLFallback } from "@/components/lab/webgl-fallback";';
      changed = true;
    }
  }

  // Add named export at end if missing
  const name = f.replace(/\.tsx$/, "").replace("optics-", "Optics").replace("-", "").replace(/3d$/, "3d");
  // e.g., optics-dispersion-3d.tsx -> OpticsDispersion3d
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  
  if (!t.includes(`export { ${componentName} }`)) {
    lines.push("");
    lines.push(`export { ${componentName} };`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, lines.join("\n"));
    console.log("Fixed " + f + " -> " + componentName);
  } else {
    console.log("OK " + f);
  }
}
console.log("\nAll 10 optics files processed.");
