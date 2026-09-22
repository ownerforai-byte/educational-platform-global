/**
 * Route audit — lists every static route in the app and separates:
 *   - TRUE ORPHANS   : no literal link, and no template href that could build it
 *   - DYNAMIC-LINKED : linked through a template (e.g. `${basePath}/theory`)
 *   - LINKED         : a literal href somewhere in the source tree
 *
 * Run from frontend/:  node scripts/route-audit.cjs
 */
const fs = require("fs");
const path = require("path");

const appDir = path.join("app", "(app)");

const routes = [];
function walk(d) {
  const ents = fs.readdirSync(d, { withFileTypes: true });
  if (ents.some((e) => e.isFile() && e.name === "page.tsx")) {
    const r = d.split(path.sep).slice(2).join("/");
    if (!r.includes("[")) routes.push(r === "" ? "/" : "/" + r);
  }
  for (const e of ents) if (e.isDirectory()) walk(path.join(d, e.name));
}
walk(appDir);

const sources = [];
function walkSrc(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (!["node_modules", ".next", ".git"].includes(e.name)) walkSrc(p);
    } else if (/\.(tsx|ts|mdx)$/.test(e.name)) sources.push(p);
  }
}
walkSrc(".");
const blob = sources.map((f) => fs.readFileSync(f, "utf8")).join("\n");

const orphans = [];
const dynamic = [];
const linked = [];

for (const r of routes.slice().sort()) {
  if (r === "/") continue;
  const literal = [`"${r}"`, `'${r}'`, "`" + r + "`", r + "/"].some((a) => blob.includes(a));
  if (literal) {
    linked.push(r);
    continue;
  }
  // A template href can build this route: look for `.../<last segment>` inside
  // a template literal, e.g. `${basePath}/theory` producing /class-11-notes/physics/theory.
  const last = r.split("/").filter(Boolean).pop();
  const re = new RegExp("`[^`\\n]*\\/" + last.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[`/]");
  if (re.test(blob)) dynamic.push(r);
  else orphans.push(r);
}

const show = (label, list) => {
  console.log(`--- ${label} (${list.length}) ---`);
  list.forEach((r) => console.log("   " + r));
};

console.log("STATIC_ROUTES=" + routes.length);
show("LINKED", linked);
show("DYNAMIC-LINKED", dynamic);
show("TRUE ORPHANS", orphans);
