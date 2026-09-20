/**
 * Postinstall guard: pins rehype-katex's import of
 * hast-util-from-html-isomorphic to an explicit relative path.
 *
 * Why: with a workspace-root node_modules present, Next's bundler rewrites the
 * bare specifier to the deep `lib/index.js` path, which the package's exports
 * map forbids -> "Module not found" on every server page rendering math
 * (graphs, legend, theorems). The explicit relative path bypasses the exports
 * map entirely.
 *
 * Idempotent: safe to run on every `npm install`. Wired as the package.json
 * `postinstall` hook so a fresh checkout self-heals.
 */
const fs = require("fs");
const path = require("path");

const target = path.join(__dirname, "..", "node_modules", "rehype-katex", "lib", "index.js");
const BARE = "from 'hast-util-from-html-isomorphic'";
const FIXED = "from '../../hast-util-from-html-isomorphic/index.js'";

if (!fs.existsSync(target)) {
  console.log("[patch-rehype-katex] rehype-katex not installed yet — skipping.");
  process.exit(0);
}

let src = fs.readFileSync(target, "utf8");
if (src.includes(FIXED)) {
  console.log("[patch-rehype-katex] already patched.");
  process.exit(0);
}

if (!src.includes(BARE)) {
  console.log("[patch-rehype-katex] unexpected rehype-katex layout — leaving untouched.");
  process.exit(0);
}

src = src.replace(BARE, FIXED);
fs.writeFileSync(target, src);
console.log("[patch-rehype-katex] patched: bare import -> explicit relative path.");
