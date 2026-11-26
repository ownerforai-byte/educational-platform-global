
import { readFileSync } from "node:fs";
import { renderNoteHtml } from "../frontend/lib/content/pipeline";
const files = process.argv.slice(2);
let fail = 0, checked = 0;
for (const f of files) {
  const j = JSON.parse(readFileSync(f, "utf8"));
  const notes = [...(j.notes || []), ...((j.enrichedContent || {}).notes || [])];
  for (const n of notes) {
    if (!n.includes("|")) continue;
    const html = renderNoteHtml(n);
    if (n.includes("|---")) {
      checked++;
      if (!html.includes("<table")) { fail++; console.log("NO TABLE:", f, "::", n.slice(0, 60)); }
      if (html.includes("|---")) { fail++; console.log("RAW DELIMITER LEAKED:", f); }
    }
  }
}
console.log("checked table blocks:", checked, "failures:", fail);
process.exit(fail ? 1 : 0);
