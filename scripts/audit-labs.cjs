// Lab content audit: which pages render real components vs empty shells?
const fs = require("fs"), path = require("path");
const labDir = "frontend/app/(app)/lab";
const out = { real: [], suspicious: [] };
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === "page.tsx") {
      const s = fs.readFileSync(p, "utf8");
      const imports = [...s.matchAll(/import\s*{([^}]+)}\s*from\s*["']@\/components\/lab/g)]
        .map(m => m[1].replace(/[{}\s]/g, "").split(",").filter(Boolean)).flat();
      const rendered = [...new Set([...s.matchAll(/<([A-Z]\w+)/g)].map(m => m[1]))];
      const ui = new Set(["Link", "ArrowLeft", "Cuboid", "BookOpen", "Calculator", "LucideIcon"]);
      const meaningful = rendered.filter(c => !ui.has(c));
      const route = p.replace(/\\/g, "/").replace("frontend/app/(app)", "").replace("/page.tsx", "");
      if (imports.length === 0) {
        out.suspicious.push(route + " :: NO lab component | renders: " + meaningful.slice(0, 4).join(","));
      } else {
        out.real.push(route + " -> " + imports.join(","));
      }
    }
  }
})(labDir);
console.log("== PAGES WITH LAB COMPONENTS: " + out.real.length);
console.log("== EMPTY/SUSPICIOUS: " + out.suspicious.length);
out.suspicious.forEach(s => console.log("  " + s));
console.log("== component coverage ==");
const counts = {};
out.real.forEach(r => { const c = r.split(" -> ")[1]; c.split(",").forEach(x => counts[x] = (counts[x] || 0) + 1); });
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log("  " + k + ": " + v));

// Registry: which labs point at placeholders?
const reg = fs.readFileSync("frontend/lib/lab-registry.tsx", "utf8");
const entries = [...reg.matchAll(/id:\s*["']([a-z0-9-]+)["'][\s\S]{0,800}?component:\s*(?:\(\)\s*=>\s*)?<?([A-Za-z_.]+)/g)];
const placeholders = entries.filter(m => /placeholder|null|undefined/i.test(m[2]));
console.log("== REGISTRY total entries: " + entries.length + ", placeholder/null components: " + placeholders.length);
placeholders.forEach(m => console.log("  " + m[1] + " -> " + m[2]));