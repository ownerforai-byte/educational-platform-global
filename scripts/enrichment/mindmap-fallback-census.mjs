// mindmap-census — list the leaf ids declared INSIDE topic-mindmap.tsx itself.
// Those are the generic subject-level fallback trees: any syllabus unit that
// is not in visual-concept-map.tsx's UNIT_CONCEPTS renders one of them, so
// they are what most topics on the site actually show.
import fs from "node:fs";

const s = fs.readFileSync("frontend/components/lab/topic-mindmap.tsx", "utf8");
const lines = s.split("\n");

// The fallback block runs from the first `if (s.includes(...))` after the
// registry lookup to the end of the useMemo.
const startLine = lines.findIndex((l) => /if \(s\.includes\("bio"\)\)/.test(l));
const endLine = lines.findIndex((l, i) => i > startLine && /^\s{2}\}, \[subjectSlug, unitId/.test(l));
console.log("fallback block: lines " + (startLine + 1) + " .. " + (endLine + 1));
const slice = lines.slice(startLine, endLine).join("\n");

const leafRe = /id:\s*"([a-z0-9-]+)",\s*\n\s*title:\s*"([^"]*)"/g;
let m;
const byPrefix = new Map();
while ((m = leafRe.exec(slice)) !== null) {
  const prefix = m[1].split("-").slice(0, 2).join("-");
  if (!byPrefix.has(prefix)) byPrefix.set(prefix, []);
  byPrefix.get(prefix).push(m[1] + "  |  " + m[2]);
}

console.log("");
for (const [prefix, ids] of byPrefix) {
  console.log("### " + prefix + "  (" + ids.length + ")");
  for (const id of ids) console.log("    " + id);
  console.log("");
}
console.log("total fallback leaves:", (slice.match(/id:\s*"[a-z0-9-]+",\s*\n\s*title:/g) || []).length);
