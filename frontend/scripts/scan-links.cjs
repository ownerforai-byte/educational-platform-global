/**
 * Dead-link + empty-route scanner.
 * Extracts internal hrefs from app/(app) pages & components, resolves them
 * against dynamic routes in the filesystem, and reports:
 *  - dead hrefs (no matching static or dynamic route)
 *  - hrefs that exist via a dynamic route (worked out from the [slug] tree)
 * Usage: node scripts/scan-links.cjs
 */
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "app", "(app)");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
  return out;
}

// 1. collect static routes
const staticRoutes = new Set();
const dynamicSegments = new Map(); // parent dir -> [":param"]
(function collectRoutes(dir, urlPrefix) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "page.tsx") {
      staticRoutes.add(urlPrefix || "/");
    }
    if (e.isDirectory()) {
      const isDyn = /^\[.+\]$/.test(e.name);
      const seg = isDyn ? "*DYN*" : e.name;
      const child = path.join(dir, e.name);
      if (isDyn) {
        const key = urlPrefix || "/";
        if (!dynamicSegments.has(key)) dynamicSegments.set(key, []);
        dynamicSegments.get(key).push(e.name.replace(/^\[|\]$/g, ""));
      }
      collectRoutes(child, urlPrefix + "/" + seg);
    }
  }
})(APP, "");

// 2. extract hrefs
const files = walk(APP).concat(walk(path.join(__dirname, "..", "components")));
const hrefRe = /(?:href|push|replace|navigate\()\s*[:=]?\s*[`"']([\/#][^`"'?#\s]*)/g;
const hrefs = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  let m;
  while ((m = hrefRe.exec(src)) !== null) {
    let h = m[1];
    if (h === "/" || h === "#") continue;
    if (h.startsWith("/#")) continue;
    h = h.replace(/\/+$/, "") || "/";
    if (!hrefs.has(h)) hrefs.set(h, []);
    hrefs.get(h).push(path.relative(path.join(__dirname, ".."), f));
  }
}

// 3. resolve each href against routes
function exists(href) {
  if (staticRoutes.has(href)) return { ok: true };
  // walk segment by segment allowing dynamic substitution
  const segs = href.split("/").filter(Boolean);
  // BFS over route tree
  const tree = {};
  for (const r of staticRoutes) {
    // not used for tree; use dynamicSegments walk below
  }
  // build route tree from static routes + dynamic segments
  // simpler: try to match href against known static routes with wildcards
  for (const r of staticRoutes) {
    const rSegs = r.split("/").filter(Boolean);
    if (rSegs.length !== segs.length) continue;
    let ok = true;
    for (let i = 0; i < segs.length; i++) {
      if (rSegs[i] === "*DYN*") continue;
      if (rSegs[i] !== segs[i]) { ok = false; break; }
    }
    if (ok) return { ok: true, via: r };
  }
  return { ok: false };
}

const dead = [];
const viaDyn = [];
for (const [href, files] of [...hrefs.entries()].sort()) {
  if (href.startsWith("/api")) continue;
  const r = exists(href);
  if (r.ok && r.via && r.via.includes("*DYN*")) { viaDyn.push({ href, via: r.via, n: files.length }); continue; }
  if (!r.ok) dead.push({ href, files: [...new Set(files)].slice(0, 3) });
}

console.log("=== STATIC ROUTES:", staticRoutes.size, "| HREFS:", hrefs.size, "===");
console.log("\n=== DYNAMIC (verified by route pattern):", viaDyn.length, "===");
console.log("\n=== DEAD HREFS:", dead.length, "===");
for (const d of dead) console.log(d.href, "   ←", d.files.join(", "));
