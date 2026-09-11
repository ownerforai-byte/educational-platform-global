// Wire the optics components into the lab registry:
//   1) add imports (WaveOpticsSuite3D, Vectors3D/Optics3D/Refraction3D, OpticsInterferenceLab)
//   2) retarget ph-3d-vectors -> Vectors3D, ph-3d-optics -> Optics3D, ph-3d-refraction -> Refraction3D
//   3) add two new advanced entries: ph-3d-wave-suite, ph-3d-interference
const fs = require("fs");
const f = "frontend/lib/lab-registry.tsx";
let s = fs.readFileSync(f, "utf8");

// ---- 1) imports ----
const impAnchor = 'import { MolecularBuilder3D } from "@/components/lab/molecular-builder-3d";\n';
if (s.includes(impAnchor) && !s.includes("physics-3d-wave-optics")) {
  s = s.replace(impAnchor, impAnchor +
    'import { WaveOpticsSuite3D } from "@/components/lab/physics-3d-wave-optics";\n' +
    'import { Vectors3D, Optics3D, Refraction3D } from "@/components/lab/physics-vectors-optics-3d";\n' +
    'import { OpticsInterferenceLab } from "@/components/lab/optics-interference-lab";\n');
  console.log("imports added");
} else {
  console.log("imports: skipped");
}

// ---- 2) retarget components ----
function setComponent(id, comp) {
  const i = s.indexOf('id: "' + id + '"');
  if (i < 0) { console.log("setComponent: NOT FOUND " + id); return false; }
  const j = s.indexOf("component: ", i);
  if (j < 0) { console.log("setComponent: no component after " + id); return false; }
  const k = s.indexOf("\n", j);
  s = s.slice(0, j) + "component: " + comp + "," + s.slice(k);
  console.log("setComponent: " + id + " -> " + comp);
  return true;
}
setComponent("ph-3d-vectors", "Vectors3D");
setComponent("ph-3d-optics", "Optics3D");
setComponent("ph-3d-refraction", "Refraction3D");

// ---- 3) new advanced entries after the ph-3d-refraction block ----
const newEntries =
  '  {\n' +
  '    id: "ph-3d-wave-suite",\n' +
  '    title: "Wave Optics Suite 3D",\n' +
  '    description: "Young\'s double slit, single-slit diffraction, and Brewster polarisation in interactive 3D.",\n' +
  '    category: "physics",\n' +
  '    type: "3d" as const,\n' +
  '    status: "new",\n' +
  '    color: "#3b82f6",\n' +
  '    unit: "Unit: Optics",\n' +
  '    component: WaveOpticsSuite3D,\n' +
  '  },\n' +
  '  {\n' +
  '    id: "ph-3d-interference",\n' +
  '    title: "Double-Slit Interference",\n' +
  '    description: "Live wavefront interference with fringe spacing readout — adjust wavelength, slit gap and screen distance.",\n' +
  '    category: "physics",\n' +
  '    type: "3d" as const,\n' +
  '    status: "new",\n' +
  '    color: "#3b82f6",\n' +
  '    unit: "Unit: Optics",\n' +
  '    component: OpticsInterferenceLab,\n' +
  '  },\n';

if (!s.includes('id: "ph-3d-wave-suite"')) {
  const idx = s.indexOf('id: "ph-3d-refraction"');
  if (idx < 0) { console.log("refraction anchor missing"); process.exit(1); }
  const blockEnd = s.indexOf("  },\n", idx);
  if (blockEnd < 0) { console.log("block end missing"); process.exit(1); }
  s = s.slice(0, blockEnd + 5) + "\n" + newEntries + s.slice(blockEnd + 5);
  console.log("new entries inserted");
} else {
  console.log("new entries: already present");
}

fs.writeFileSync(f, s, "utf8");
console.log("registry written: " + s.length + " chars");