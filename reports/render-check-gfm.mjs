// render-check-gfm.mjs — run remark-parse + remark-gfm + remark-html (the
// same GFM core the app pipeline uses) over appended table blocks and assert
// real <table> output.
import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify);

const subjects = [
  "class-11/biology", "class-11/chemistry", "class-11/physics", "class-11/mathematics", "class-11/english", "class-11/nepali",
  "class-12/biology", "class-12/chemistry", "class-12/physics", "class-12/mathematics", "class-12/english", "class-12/nepali",
];
let checked = 0, fail = 0;
for (const s of subjects) {
  const dir = path.join("content/notes/concepts", s);
  const units = fs.readdirSync(dir).filter((u) => fs.statSync(path.join(dir, u)).isDirectory());
  for (const unit of units.slice(0, 2)) {
    const udir = path.join(dir, unit);
    for (const f of fs.readdirSync(udir).filter((x) => x.endsWith(".json"))) {
      const j = JSON.parse(fs.readFileSync(path.join(udir, f), "utf8"));
      const notes = [...(j.notes || []), ...((j.enrichedContent || {}).notes || [])];
      for (const n of notes) {
        if (!n.includes("|---")) continue;
        const html = String(processor.processSync(n).value);
        checked++;
        if (!html.includes("<table")) { fail++; console.log("NO TABLE:", s + "/" + unit + "/" + f); }
        if (html.includes("|---")) { fail++; console.log("DELIMITER LEAK:", s + "/" + unit + "/" + f); }
      }
    }
  }
}
console.log("table blocks rendered:", checked, "| failures:", fail);
process.exit(fail ? 1 : 0);
