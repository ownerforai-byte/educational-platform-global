const fs = require("fs");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
// Check the two files mentioned in errors
for (const f of ["lib/theory-content.ts", "lib/topic-3d-map.ts"]) {
  const t = fs.readFileSync(base + "/" + f, "utf8");
  const lines = t.split("\n");
  // Look for duplicate exports or keys
  const dup = {};
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/export const THEORY_CONTENT|export const/i.test(l)) console.log(f + ":" + (i+1) + " -> " + l.trim().slice(0,80));
  }
  // For topic-3d-map, look for repeated keys around line 684
  if (f === "lib/topic-3d-map.ts") {
    console.log("--- lines 675-695 ---");
    console.log(lines.slice(674, 695).map((l,i)=>(675+i)+": "+l).join("\n"));
  }
}
