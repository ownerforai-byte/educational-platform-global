const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/physicshub.github.io";

// Read package.json
const pkg = JSON.parse(fs.readFileSync(path.join(base, "package.json"), "utf8"));
console.log("=== package.json ===");
console.log("name:", pkg.name);
console.log("scripts:", JSON.stringify(pkg.scripts, null, 2));
console.log("deps:", Object.keys(pkg.dependencies || {}).join(", "));
console.log("devDeps:", Object.keys(pkg.devDependencies || {}).join(", "));

// Read README
const readme = fs.readFileSync(path.join(base, "README.md"), "utf8");
console.log("\n=== README (first 50 lines) ===");
readme.split("\n").slice(0, 50).forEach((l,i) => console.log((i+1)+": "+l));

// List app structure
console.log("\n=== app/ structure ===");
function walk(d, depth=0) {
  const maxDepth = 3;
  if (depth > maxDepth) return;
  let entries;
  try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch(e) { return; }
  for (const e of entries) {
    const indent = "  ".repeat(depth);
    const isDir = e.isDirectory();
    console.log(indent + (isDir ? "[DIR] " : "     ") + e.name);
    if (isDir && e.name !== "." && e.name !== "..") {
      walk(path.join(d, e.name), depth+1);
    }
  }
}
walk(path.join(base, "app"));

// Check content
console.log("\n=== content/ structure ===");
walk(path.join(base, "content"));
