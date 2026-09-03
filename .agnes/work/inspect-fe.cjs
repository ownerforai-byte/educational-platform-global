const fs = require("fs");
const fe = "C:/Users/ASUS/Desktop/rn/frontend";
console.log("frontend/content exists:", fs.existsSync(fe + "/content"));
try {
  const st = fs.lstatSync(fe + "/content");
  console.log("isSymlink:", st.isSymbolicLink(), "isDir:", st.isDirectory());
} catch (e) {
  console.log("lstat failed:", e.message);
}
let n = 0, bytes = 0;
function walk(d) {
  let es;
  try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of es) {
    const p = d + "/" + e.name;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".json")) { n++; bytes += fs.statSync(p).size; }
  }
}
walk(fe + "/content");
console.log("json files under frontend/content:", n, "total:", Math.round(bytes / 1024) + "KB");
// also check theorems page usage of snippets in subjectSlug page
const p2 = fs.readFileSync(fe + '/app/(app)/theorems/[classSlug]/[subjectSlug]/page.tsx', 'utf8');
console.log("subjectSlug page uses entry.snippets:", p2.includes("snippets"));
const p1 = fs.readFileSync(fe + '/app/(app)/theorems/[classSlug]/[subjectSlug]/[topicSlug]/page.tsx', 'utf8');
console.log("topicSlug page imports:", p1.split("\n").slice(0,8).join(" | "));
