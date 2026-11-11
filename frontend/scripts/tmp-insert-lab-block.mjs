import fs from "node:fs";

const TARGET = "lib/lab-visual-index.ts";
const BLOCK = "C:/Users/ASUS/AppData/Local/Temp/opencode/lab-index-block.txt";

let src = fs.readFileSync(TARGET, "utf8");
if (src.includes("MANUAL EXTENSION")) {
  console.log("already inserted");
  process.exit(0);
}

const anchor =
  '  { labId: "PoissonDistVisual", kind: "direct-visual", entranceTopic: "Poisson Distribution", slugs: ["poisson-distribution-definition-mean-variance"] },';
if (!src.includes(anchor)) {
  console.error("anchor not found");
  process.exit(1);
}

let block = fs.readFileSync(BLOCK, "utf8");
// ASCII-only header (avoid console/encoding mangling of box-drawing chars).
block = block.replace(
  /\/\* [^\n]*MANUAL EXTENSION[^\n]*\*\//,
  "/* ---- MANUAL EXTENSION (2026-11-11) ----------------------------------------",
);
block = block.replace(
  /\n\s*\*\{10,}\*\//,
  "\n   */",
);

src = src.replace(anchor, anchor + "\n" + block);
fs.writeFileSync(TARGET, src);
console.log("inserted; new bytes:", src.length);
