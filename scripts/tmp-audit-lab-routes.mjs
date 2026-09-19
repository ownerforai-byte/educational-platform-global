import fs from "fs";
import path from "path";

const root = process.cwd();
const regSrc = fs.readFileSync(path.join(root, "frontend/lib/lab-registry.tsx"), "utf8");

// Parse registry entries: capture id + component reference per entry block
const entryRe = /\{\s*id:\s*["']([^"']+)["']([\s\S]*?)component:\s*([^,}]+),/g;
const byComponent = new Map(); // componentExpr -> [ids]
const regIds = [];
let m;
while ((m = entryRe.exec(regSrc)) !== null) {
  const id = m[1];
  const comp = m[3].trim().replace(/\s+/g, " ");
  regIds.push(id);
  if (!byComponent.has(comp)) byComponent.set(comp, []);
  byComponent.get(comp).push(id);
}
const regIdSet = new Set(regIds);

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name === "page.tsx") out.push(p);
  }
  return out;
}

const dirs = [
  "app/(app)/lab/physics",
  "app/(app)/lab/chemistry",
  "app/(app)/lab/biology",
  "app/(app)/lab/math",
  "app/(app)/lab/class11",
  "app/(app)/lab/heat-determinations",
  "app/(app)/lab/[labId]",
];

const duplicates = []; // static slug -> registry id (same component)
const unique = []; // static pages whose component is in NO registry entry
const hubs = [];

for (const d of dirs) {
  const abs = path.join(root, "frontend", d);
  if (!fs.existsSync(abs)) continue;
  for (const p of walk(abs)) {
    const rel = path.relative(abs, p).replace(/[\\/]page\.tsx$/, "").split(path.sep).join("/");
    const src = fs.readFileSync(p, "utf8");
    if (rel === "" || !regIdSet.size) hubs.push(rel || "(hub) " + d);
    if (rel === "") continue; // subject hub page
    if (d.includes("[labId]") && rel === "") continue;
    if (rel === "" ) continue;

    // direct id hit?
    if (regIdSet.has(rel)) {
      duplicates.push(`${rel}  →  ${rel} (same id)`);
      continue;
    }
    // find imported lab components in this page
    const comps = [...src.matchAll(/import\s*(?:\{([^}]*)\}|\w+)\s*from\s*"@\/components\/lab\/([^"]+)"/g)]
      .flatMap(mm => (mm[1] || "").split(",").map(s => s.trim().split(" as ")[0]).filter(Boolean))
      .filter(c => /3D|Lab|Suite|Simulator|Builder|Symbols|Animation|Motion/i.test(c));
    // map components to registry ids
    const regHits = new Set();
    for (const c of comps) {
      for (const [compExpr, ids] of byComponent.entries()) {
        if (compExpr.includes(c)) ids.forEach(i => regHits.add(i));
      }
    }
    if (regHits.size > 0) {
      duplicates.push(`${rel}  →  registry: ${[...regHits].join(", ")}`);
    } else {
      unique.push(`${rel}  (${d.split("/").pop()})  comps: ${comps.join(", ") || "none"}`);
    }
  }
}

console.log("== DUPLICATE ROUTES (static slug resolves to a registry entry) ==");
duplicates.forEach(x => console.log("  ", x));
console.log("\n== UNIQUE CONTENT (component not in any registry entry) ==");
unique.forEach(x => console.log("  ", x));
