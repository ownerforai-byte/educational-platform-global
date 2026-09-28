import fs from "node:fs";

const path = "frontend/lib/visual-concept-map.tsx";
const s = fs.readFileSync(path, "utf8");
const lines = s.split("\n");

// Unit keys live at 2-space indentation:   "slug": {
const keys = [];
lines.forEach((ln, i) => {
  const m = ln.replace(/\r$/, "").match(/^ {2}"([a-z0-9-]+)": \{$/);
  if (m) keys.push({ slug: m[1], line: i + 1 });
});

const count = (str, needle) => str.split(needle).length - 1;

console.log("UNIT_CONCEPTS keys: " + keys.length);
for (const k of keys) console.log("  L" + k.line + "  " + k.slug);

console.log("");
console.log("--- leaf ids per unit (id | title) ---");
for (let i = 0; i < keys.length; i++) {
  const start = keys[i].line - 1;
  const end = i + 1 < keys.length ? keys[i + 1].line - 1 : s.indexOf("\n};", start);
  const slice = lines.slice(start, end).join("\n");
  console.log("");
  console.log("### " + keys[i].slug);
  const leafRe = /leaf\("([^"]+)",\s*"([^"]+)"/g;
  let m;
  while ((m = leafRe.exec(slice)) !== null) {
    console.log("   " + m[1].padEnd(22) + " " + m[2]);
  }
  const subRe = /sub\("([^"]+)",\s*"([^"]+)"/g;
  const subs = [];
  while ((m = subRe.exec(slice)) !== null) subs.push(m[1]);
  console.log("   subbranches: " + subs.join(", "));
  const brRe = /br\("([^"]+)",\s*"([^"]+)"/g;
  const brs = [];
  while ((m = brRe.exec(slice)) !== null) brs.push(m[1] + " = " + m[2]);
  console.log("   branches: " + brs.join(" | "));
}
