// rails-missing-diagnose.mjs — why do current-naming cards lack the row?
import fs from "node:fs";
import path from "node:path";

const data = JSON.parse(fs.readFileSync("reports/rails-table-missing.json", "utf8"));
const delimRe = /^\|?[ :\-\-|]+\|?$/;
let ok = 0, enrOnly = 0, pyqOnly = 0, noSrc = 0, err = 0;
const samples = { enrOnly: [], pyqOnly: [] };
for (const p of data.current) {
  const parts = p.split("/");
  const dir = ["content", "notes", "concepts", parts[3], parts[4], parts[5]].join("/");
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  const m = (j.agentNotes || "").match(/concepts\/(.+?\.json)/);
  if (!m) { noSrc++; continue; }
  const stem = m[1].replace(/\.json$/, "");
  let files = [];
  try {
    files = fs.readdirSync(dir).filter((x) => x.endsWith(".json") && (x === m[1] || x.startsWith(stem.slice(0, 30))));
  } catch { err++; continue; }
  if (files.length !== 1) { err++; continue; }
  const r = JSON.parse(fs.readFileSync(path.join(dir, files[0]), "utf8"));
  const count = (arr) => {
    const lines = arr.join("\n").split("\n");
    let t = 0, q = 0;
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].includes("|") && delimRe.test(lines[i + 1].trim())) {
        if (/\byear\b/i.test(lines[i])) q++; else t++;
      }
    }
    return { t, q };
  };
  const a = count(Array.isArray(r.notes) ? r.notes : []);
  const b = count(Array.isArray((r.enrichedContent || {}).notes) ? r.enrichedContent.notes : []);
  if (a.t > 0) ok++;
  else if (b.t > 0) { enrOnly++; if (samples.enrOnly.length < 5) samples.enrOnly.push(p); }
  else if (a.q + b.q > 0) { pyqOnly++; if (samples.pyqOnly.length < 5) samples.pyqOnly.push(p); }
  else err++;
}
console.log({ ok, enrOnly, pyqOnly, noSrc, err });
console.log("enrOnly samples:\n" + samples.enrOnly.join("\n"));
console.log("pyqOnly samples:\n" + samples.pyqOnly.join("\n"));
