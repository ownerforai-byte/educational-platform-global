const fs = require("fs"), path = require("path");
const SUBJECT = process.argv[2]; // chemistry | physics | mathematics | nepali | english
if (!SUBJECT) { console.error("usage: node list-canonical-any.cjs <subject>"); process.exit(2); }
const sy = fs.readFileSync("frontend/lib/core/syllabus.ts", "utf8");
function topics(cls) {
  const start = sy.indexOf('slug: "class-' + cls + '-notes"');
  const next = sy.indexOf('slug: "class-', start + 10);
  const seg = sy.slice(start, next < 0 ? sy.length : next);
  const sStart = seg.indexOf('slug: "' + SUBJECT + '"');
  if (sStart < 0) return [];
  const sEnd = seg.indexOf('slug: "', sStart + 10);
  const sub = seg.slice(sStart, sEnd < 0 ? seg.length : sEnd);
  const out = [];
  const re = /topics:\s*\[([\s\S]*?)\]/g;
  let m;
  while ((m = re.exec(sub))) {
    const strs = m[1].match(/"([^"]*)"/g) || [];
    for (const s of strs) out.push(s.slice(1, -1));
  }
  return out;
}
const t11 = topics("11"), t12 = topics("12");
console.log(SUBJECT, "class-11 topics:", t11.length, "| class-12 topics:", t12.length);
function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) r = r.concat(walk(p));
    else if (f.name.endsWith(".json")) r.push(p);
  }
  return r;
}
const files = walk("content/notes/concepts").filter((f) => f.split(path.sep).includes(SUBJECT));
const titles = new Map();
for (const t of t11) titles.set(t, "class-11");
for (const t of t12) titles.set(t, "class-12");
const canon = [], extra = [];
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(f, "utf8"));
  if (titles.has(d.topicTitle)) canon.push({ f: f.split(path.sep).join("/"), cls: titles.get(d.topicTitle) });
  else extra.push(f.split(path.sep).join("/"));
}
console.log("canonical files:", canon.length, "| extra files:", extra.length);
const stats = {};
for (const x of canon) {
  const d = JSON.parse(fs.readFileSync(x.f, "utf8"));
  const txt = (d.notes || []).join("\n");
  const tb = (txt.match(/\|---/g) || []).length, sv = (txt.match(/```svg/g) || []).length;
  const u = x.f.split(SUBJECT + "/")[1].split("/")[0];
  const k = x.cls + ":" + u;
  stats[k] = stats[k] || [0, 0, 0];
  stats[k][0]++; if (tb < 2) stats[k][1]++; if (sv === 0) stats[k][2]++;
}
for (const k of Object.keys(stats).sort()) console.log(k, "files / <2tables / 0svg :", stats[k].join(" / "));
fs.writeFileSync("reports/" + SUBJECT + "-canonical-files.json", JSON.stringify(canon, null, 1));
fs.writeFileSync("reports/" + SUBJECT + "-extra-files.json", JSON.stringify(extra, null, 1));
