const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";
const tv = path.join(base, "components/lab/topic-visuals");
// Dump first 80 lines of one fixed file to see syntax around my change
const t = fs.readFileSync(path.join(tv, "optics-reflection-3d.tsx"), "utf8").split("\n");
for (let i = 0; i < Math.min(t.length, 200); i++) console.log((i + 1) + ": " + t[i]);
