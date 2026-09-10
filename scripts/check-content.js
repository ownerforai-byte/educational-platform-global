const fs = require("fs"), path = require("path");
const targets = [
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-comprehension-and-unseen-passage.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-essay-writing-argumentative-descriptive-narrative-expository.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-grammar-for-writing-sentences-clauses-punctuation.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-paragraph-writing.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-report-writing-and-summarisation.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-speech-writing.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-story-writing.json",
  "content/ravikishan/class-11/english/writing-and-composition/concepts/01-summary-and-note-making.json",
  "content/ravikishan/class-11-notes/english/grammar/determiners/notes/introduction.json",
  "content/ravikishan/class-11-notes/english/reading-and-comprehension/comprehension-skills/notes/introduction.json",
  "content/ravikishan/class-11-notes/nepali/bhasha-ra-vyakarana/concepts/shabda-srot.json",
];
function cleanStr(s) {
  // strip stray literal quote chars that corrupt prose (leading/trailing only)
  let out = s.replace(/^"\s*/, "").replace(/\s*"$/, "");
  return out;
}
function repair(v) {
  if (typeof v === "string") return cleanStr(v);
  if (Array.isArray(v)) return v.map(repair);
  if (v && typeof v === "object") {
    const out = {};
    for (const [k, val] of Object.entries(v)) {
      out[k.replace(/["\\]/g, "")] = repair(val);
    }
    return out;
  }
  return v;
}
for (const f of targets) {
  const raw = fs.readFileSync(f, "utf8");
  const data = repair(JSON.parse(raw));
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + "\n", "utf8");
  const d = JSON.parse(fs.readFileSync(f, "utf8"));
  console.log("fixed: " + f + " | title=" + (d.title ? "OK" : "MISSING") + " | keys=" + Object.keys(d).length);
}