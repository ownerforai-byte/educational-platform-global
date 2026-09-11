const fs = require("fs"), path = require("path");
// Mojibake repair: UTF-8 bytes mis-decoded as CP1252 (from PowerShell writes)
const MAP = [
  ["\u00E2\u20AC\u201D", "\u2014"], // â€" -> em dash
  ["\u00E2\u20AC\u201C", "\u2013"], // â€“ -> en dash
  ["\u00E2\u20AC\u2122", "\u2019"], // â€™ -> right single quote
  ["\u00E2\u20AC\u0153", "\u201C"], // â€œ -> left double quote
  ["\u00E2\u20AC\x9D", "\u201D"],   // â€ -> right double quote
  ["\u00E2\u20AC\u00A6", "\u2026"], // â€¦ -> ellipsis
  ["\u00C2", ""],                   // stray Â
];
let fixedFiles = 0, fixedCount = 0;
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(f.name)) {
      const raw = fs.readFileSync(p, "utf8");
      let out = raw, n = 0;
      for (const [bad, good] of MAP) {
        const parts = out.split(bad);
        if (parts.length > 1) { n += parts.length - 1; out = parts.join(good); }
      }
      if (n > 0) { fs.writeFileSync(p, out, "utf8"); fixedFiles++; fixedCount += n; console.log("fixed " + n + " in " + p); }
    }
  }
}
walk("frontend/app");
walk("frontend/components");
walk("frontend/lib");
console.log("DONE files=" + fixedFiles + " replacements=" + fixedCount);