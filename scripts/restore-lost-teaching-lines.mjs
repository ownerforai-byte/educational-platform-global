#!/usr/bin/env node
/**
 * restore-lost-teaching-lines — one-off repair (2026-11-29).
 *
 * The bio-visuals enhancer engine classified "**Fact.** …", "**Scope.** …"
 * and "**Tested.** …" notes as junk and silently dropped them from the
 * source tree when packs were re-run. The shipped corpus manifest still has
 * every line, so this script restores each missing line AT SOURCE, in
 * manifest order, appended to the end of the affected array.
 *
 * Mirrors the TEACHING_FIELDS comparison of build-content-corpus.mjs and
 * also repairs enrichedContent.notes when it lost lines.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "frontend", "public", "data", "content", "manifest.json");

const TEACHING_FIELDS = [
  "notes",
  "keyPoints",
  "importantNotes",
  "importantStatements",
  "examShortTricks",
  "importantConcepts",
  "universalFacts",
  "blocks",
];

const lineKey = (line) => (typeof line === "string" ? line : JSON.stringify(line));

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
let filesChanged = 0;
let linesRestored = 0;

for (const entry of manifest) {
  if (!entry?.path?.startsWith("notes/concepts/") || !entry?.data) continue;
  const abs = path.join(ROOT, "content", entry.path);
  if (!fs.existsSync(abs)) continue;
  const src = JSON.parse(fs.readFileSync(abs, "utf8"));
  let changed = false;

  const restore = (container, label) => {
    for (const field of TEACHING_FIELDS) {
      const before = Array.isArray(container?.[field]) ? container[field] : null;
      if (!before) continue;
      const after = Array.isArray(src?.[field]) ? src[field] : [];
      // same-field comparison only when the container IS the top level
      const target =
        label === "top" ? src[field] : container[field];
      if (!Array.isArray(target)) continue;
      const present = new Set(target.map(lineKey));
      const missing = before.filter((l) => !present.has(lineKey(l)));
      if (missing.length === 0) continue;
      target.push(...missing);
      linesRestored += missing.length;
      changed = true;
      console.log(`  ${entry.path} [${label}.${field}] +${missing.length}`);
    }
  };

  restore(entry.data, "top");
  if (src.enrichedContent && entry.data.enrichedContent) {
    restore(entry.data.enrichedContent, "top"); // no-op guard: compare below
  }
  // enrichedContent: compare manifest's enrichedContent vs source's
  if (src.enrichedContent && entry.data.enrichedContent) {
    for (const field of TEACHING_FIELDS) {
      const before = entry.data.enrichedContent[field];
      const target = src.enrichedContent[field];
      if (!Array.isArray(before) || !Array.isArray(target)) continue;
      const present = new Set(target.map(lineKey));
      const missing = before.filter((l) => !present.has(lineKey(l)));
      if (missing.length === 0) continue;
      target.push(...missing);
      linesRestored += missing.length;
      changed = true;
      console.log(`  ${entry.path} [enriched.${field}] +${missing.length}`);
    }
  }

  if (changed) {
    fs.writeFileSync(abs, JSON.stringify(src, null, 2) + "\n");
    filesChanged++;
  }
}

console.log(`\nrestored ${linesRestored} line(s) across ${filesChanged} file(s)`);
