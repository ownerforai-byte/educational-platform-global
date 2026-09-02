import { readFileSync, writeFileSync } from "fs";

const gaps = readFileSync("C:/Users/ASUS/desktop/rn/gaps-list.txt", "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const mapSrc = readFileSync("C:/Users/ASUS/desktop/rn/frontend/lib/topic-3d-map.ts", "utf8");
let keys = [...mapSrc.matchAll(/"([a-z0-9][a-z0-9-]{2,})":/g)].map((m) => m[1]);
// keys added at runtime via arrays: CHEMISTRY_11_XXX.forEach((slug, i) => { CHEMISTRY_11[slug] = ... })
for (const arr of mapSrc.matchAll(/const (\w+) = \[([\s\S]*?)\];/g)) {
  for (const el of arr[2].matchAll(/"([a-z0-9][a-z0-9-]{2,})"/g)) keys.push(el[1]);
}
const keySet = new Set(keys);
const makeSlugs = new Set([...mapSrc.matchAll(/make\("([^"]+)"/g)].map((m) => m[1]));

// Candidate resolution pipeline (mirrors planned resolveTopic3DKey):
function resolve(slug) {
  const cands = [slug, slug.replace(/-s-/g, "s-")];
  for (const c of cands) {
    if (keySet.has(c)) return { how: "exact", key: c };
  }
  // normalized apostrophe form against all keys: compare de-apostrophed both sides
  const norm = (s) => s.replace(/-s-/g, "s-");
  const nSlug = norm(slug);
  let hit = keys.find((k) => norm(k) === nSlug);
  if (hit) return { how: "norm", key: hit };
  // prefix: map key starts the topic slug (combined syllabus topics)
  hit = keys.filter((k) => nSlug.startsWith(norm(k)) && norm(k).length >= 10)
    .sort((a, b) => norm(b).length - norm(a).length)[0];
  if (hit) return { how: "prefix", key: hit };
  // reverse prefix: topic slug starts a map key (already covered) OR key starts topic slug
  hit = keys.filter((k) => norm(k).startsWith(nSlug) && nSlug.length >= 10)
    .sort((a, b) => a.length - b.length)[0];
  if (hit) return { how: "rev-prefix", key: hit };
  // make() routing slugs
  for (const c of cands) if (makeSlugs.has(c)) return { how: "make", key: c };
  return null;
}

let resolved = 0; const unresolved = [];
let out = "";
for (const g of gaps) {
  const r = resolve(g);
  if (r) { resolved++; out += `${r.how.toUpperCase()} ${g}\n    -> ${r.key}\n`; }
  else unresolved.push(g);
}
out += `\nResolved: ${resolved}/${gaps.length}\n`;
out += `Unresolved (${unresolved.length}):\n` + unresolved.map((u) => "  " + u).join("\n") + "\n";
writeFileSync("C:/Users/ASUS/desktop/rn/scripts/resolve-check.txt", out);

