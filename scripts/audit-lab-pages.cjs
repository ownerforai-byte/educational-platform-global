const fs = require("fs"), path = require("path");
const root = "frontend/app/(app)/lab";
let rows = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === "page.tsx") {
      const c = fs.readFileSync(p, "utf8");
      const imports = [...c.matchAll(/components\/lab\/([^"]+)"/g)].map(m => m[1]);
      rows.push({
        route: p.replace(root, "").replace(/\\/g, "/").replace("/page.tsx", "") || "/lab",
        bytes: c.length,
        comp: imports.join(",") || "NO-LAB-COMPONENT",
      });
    }
  }
})(root);
rows.sort((a, b) => a.bytes - b.bytes);
rows.forEach(r => console.log(String(r.bytes).padStart(5) + "  " + r.route + "  -> " + r.comp));
console.log("total pages: " + rows.length);