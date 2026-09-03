const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
// Check theory-content.ts for duplicate declarations
const t = fs.readFileSync(path.join(base, "lib/theory-content.ts"), "utf8");
const lines = t.split("\n");
let count = 0;
for (let i = 0; i < lines.length; i++) {
  if (/export const THEORY_CONTENT/.test(lines[i])) {
    count++;
    console.log("Line " + (i+1) + ": " + lines[i].trim().slice(0,60));
  }
}
console.log("Total THEORY_CONTENT declarations: " + count);
// Check topic-3d-map.ts for duplicate keys
const m = fs.readFileSync(path.join(base, "lib/topic-3d-map.ts"), "utf8");
const keys = [...m.matchAll(/"\s*([^"]+)\s*":\s*make/g)].map(r => r[1]);
const dups = keys.filter((k,i)=>keys.indexOf(k) !== i);
if (dups.length > 0) console.log("Duplicate keys in TOPIC_3D_MAP:", dups.slice(0,5).join(", "));
