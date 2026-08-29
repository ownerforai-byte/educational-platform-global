/**
 * Content pipeline: rebuilds the Ravikishan note manifests from the source
 * JSON files and syncs every derived artifact into public/data so the
 * edge runtime can fetch them at request time (no fs access on edge).
 *
 * Outputs (all written by this single command):
 *   - content/ravikishan/manifest.json      (pretty-printed, dedup-classified)
 *   - content/ravikishan/_index.json        (minified {path: data} lookup)
 *   - public/data/ravikishan/manifest.json  (copy for runtime fetch)
 *   - public/data/ravikishan/_index.json    (copy for runtime fetch)
 *   - public/data/r-export/manifest.json    (copied from content/r-export)
 *
 * Replaces scripts/import-ravikishan-notes.py with identical hashing/dedup
 * rules plus the previously manual copy into public/data.
 */
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const RAV_SOURCE = join(ROOT, "content", "ravikishan");
const R_EXPORT_SOURCE = join(ROOT, "content", "r-export", "manifest.json");
const PUBLIC_RAV = join(ROOT, "public", "data", "ravikishan");
const PUBLIC_REXP = join(ROOT, "public", "data", "r-export");

/** Mirrors scripts/import-ravikishan-notes.py normalize(). */
function normalize(text) {
  return text.toLowerCase().split(/\s+/).filter(Boolean).join(" ");
}

/**
 * Mirrors the Python content_hash(), including its quirk of joining the
 * normalized notes text character-by-character with spaces.
 */
function contentHash(record) {
  const title = normalize(record.title ?? "");
  const joinedNotes = normalize((record.notes ?? []).join("\n"));
  const spacedNotes = [...joinedNotes].join(" ");
  return createHash("sha1")
    .update(`${title}|${spacedNotes}`, "utf8")
    .digest("hex");
}

function walkJsonFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walkJsonFiles(full);
    if (!entry.name.endsWith(".json")) return [];
    if (entry.name === "manifest.json" || entry.name === "_index.json") return [];
    return [full];
  });
}

// ── Build ravikishan manifest ──────────────────────────────────────────────
const items = walkJsonFiles(RAV_SOURCE).map((full) => ({
  rel: relative(RAV_SOURCE, full),
  data: JSON.parse(readFileSync(full, "utf8")),
}));

if (items.length === 0) {
  console.error(`No source notes found under ${RAV_SOURCE}`);
  process.exit(1);
}
for (const item of items) item.hash = contentHash(item.data);

const groups = new Map();
for (const item of items) {
  const group = groups.get(item.hash) ?? [];
  group.push(item);
  groups.set(item.hash, group);
}

const manifest = [];
for (const group of groups.values()) {
  group.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  const [canonical, ...dupes] = group;
  canonical.dupType = 1;
  manifest.push(canonical);
  dupes.forEach((item, i) => {
    item.dupType = Math.min(i + 2, 3);
    item.duplicateOf = canonical.rel;
    manifest.push(item);
  });
}
manifest.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));

const manifestOut = manifest.map(({ rel, data, hash, dupType, duplicateOf }) => ({
  path: rel,
  data,
  hash,
  ...(dupType !== undefined ? { dupType } : {}),
  ...(duplicateOf !== undefined ? { duplicateOf } : {}),
}));

// ── Build _index.json (flat forward-slash keyed lookup, minified) ─────────
const indexOut = {};
for (const { rel, data } of manifest) indexOut[rel.split(sep).join("/")] = data;

// ── Write everything ───────────────────────────────────────────────────────
mkdirSync(PUBLIC_RAV, { recursive: true });

const eol = process.platform === "win32" ? "\r\n" : "\n";
const manifestPath = join(RAV_SOURCE, "manifest.json");
const indexPath = join(RAV_SOURCE, "_index.json");
writeFileSync(manifestPath, JSON.stringify(manifestOut, null, 2).replaceAll("\n", eol), "utf8");
writeFileSync(indexPath, JSON.stringify(indexOut), "utf8");
cpSync(manifestPath, join(PUBLIC_RAV, "manifest.json"));
cpSync(indexPath, join(PUBLIC_RAV, "_index.json"));

let rexpNote = "r-export manifest not found, skipped";
if (existsSync(R_EXPORT_SOURCE)) {
  mkdirSync(PUBLIC_REXP, { recursive: true });
  cpSync(R_EXPORT_SOURCE, join(PUBLIC_REXP, "manifest.json"));
  rexpNote = `Synced -> ${relative(ROOT, PUBLIC_REXP)}\\manifest.json`;
}

console.log(
  [
    `Ravikishan notes: ${items.length} scanned, ${manifest.length} in manifest`,
    `Index entries: ${Object.keys(indexOut).length}`,
    `Wrote content/ravikishan/{manifest.json,_index.json}`,
    `Synced -> public/data/ravikishan/{manifest.json,_index.json}`,
    rexpNote,
  ].join("\n"),
);
