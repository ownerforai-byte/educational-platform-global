const fs = require("fs");
const p = "C:/Users/ASUS/Desktop/rn/frontend/lib/theorems.ts";
const t = fs.readFileSync(p, "utf8").split("\n");
console.log(t.map((l, i) => (i + 1) + ": " + l).join("\n"));
