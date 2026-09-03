const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
const tv = path.join(base, "components/lab/topic-visuals");

// Maps from filename (without .tsx) to the exact named export expected by topic-3d-map.ts
const NAME_MAP = {
  "optics-reflection-3d": "OpticsReflection3d",
  "optics-refraction-3d": "OpticsRefraction3d",
  "optics-tir-3d": "OpticsTIR3d",
  "optics-lens-3d": "OpticsLens3d",
  "optics-prism-3d": "OpticsPrism3d",
  "optics-dispersion-3d": "OpticsDispersion3d",
  "optics-power-3d": "OpticsPower3d",
  "optics-lens-maker-3d": "OpticsLensMaker3d",
  "optics-telescope-3d": "OpticsTelescope3d",
  "optics-microscope-3d": "OpticsMicroscope3d",
};

for (const [file, compName] of Object.entries(NAME_MAP)) {
  const fp = path.join(tv, file + ".tsx");
  if (!fs.existsSync(fp)) { console.log("MISSING: " + fp); continue; }
  let t = fs.readFileSync(fp, "utf8");
  let changed = false;

  // Fix 1: "import CollapsibleControls from ..." -> "import { CollapsibleControls } from ..."
  if (t.includes('import CollapsibleControls from "@/components/lab/collapsible-controls"')) {
    t = t.replace(
      'import CollapsibleControls from "@/components/lab/collapsible-controls"',
      'import { CollapsibleControls } from "@/components/lab/collapsible-controls"'
    );
    changed = true;
  }
  // Fix 2: "import WebGLFallback from ..." -> "import { WebGLFallback } from ..."
  if (t.includes('import WebGLFallback from "@/components/lab/webgl-fallback"')) {
    t = t.replace(
      'import WebGLFallback from "@/components/lab/webgl-fallback"',
      'import { WebGLFallback } from "@/components/lab/webgl-fallback"'
    );
    changed = true;
  }
  // Fix 3: add named re-export if not present
  if (!t.includes(`export { ${compName} }`)) {
    t += `\n\nexport { ${compName} };\n`;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, t);
    console.log("FIXED: " + file + " -> " + compName);
  } else {
    console.log("OK:    " + file);
  }
}
console.log("\nDone.");
