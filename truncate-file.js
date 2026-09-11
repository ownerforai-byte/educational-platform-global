const fs = require("fs");
const f = "c:/Users/ASUS/Desktop/rn/content-tools/fix-placeholders.js";
let lines = fs.readFileSync(f, "utf8").split("\n");
lines.splice(327);
fs.writeFileSync(f, lines.join("\n") + "\n");
console.log("Truncated to 327 lines. Total: " + lines.length);