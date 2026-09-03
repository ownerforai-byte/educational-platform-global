const fs = require("fs");
const path = require("path");
const base = "C:/Users/ASUS/Desktop/rn/frontend";

const map = fs.readFileSync(path.join(base, "lib/topic-3d-map.ts"), "utf8");
const imports = [...map.matchAll(/import\s+\{([^}]+)\}\s+from\s+"(@\/[^"]+)"/g)];
let problems = 0;
const results = [];
for (const m of imports) {
  const names = m[1].split(",").map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
  let modPath = m[2].replace("@/", "");
  let fp = path.resolve(base, modPath + ".tsx");
  if (!fs.existsSync(fp)) fp = path.resolve(base, modPath + ".ts");
  if (!fs.existsSync(fp)) {
    results.push(modPath + " -> FILE NOT FOUND");
    continue;
  }
  const t = fs.readFileSync(fp, "utf8");
  const named = new Set(
    [...t.matchAll(/export\s+(?:async\s+)?(?:function|class|const|interface|type|enum)\s+([A-Za-z0-9_$]+)/g)]
      .map(x => x[1])
  );
  for (const ex of t.matchAll(/export\s+\{([^}]+)\}/g)) {
    ex[1].split(",").map(s => s.trim().split(/\s+as\s+/).pop().trim()).filter(Boolean).forEach(n => named.add(n));
  }
  const hasDefault = /export\s+default/.test(t);
  const missing = names.filter(n => !named.has(n));
  if (missing.length > 0) {
    problems++;
    results.push(modPath + " -> MISSING: " + missing.join(", ") + " | hasDefault:" + hasDefault + " | named:" + [...named].join(","));
  }
}
console.log("Imports checked: " + imports.length + " | files with missing named exports: " + problems);
results.forEach(r => console.log("  " + r));
