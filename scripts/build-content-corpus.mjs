#!/usr/bin/env node
/**
 * build-content-corpus — regenerate the classified corpus manifest
 * (`frontend/public/data/content/manifest.json`) from the source tree
 * (`content/notes/concepts/<class>/<subject>/<unit>/*.json`).
 *
 * Why this exists (2026-11-08): the topic workspace's supplementary branch and
 * the server "coming soon" decider both read this manifest, but NOTHING in the
 * pipeline wrote it — it was assembled by hand / one-off tooling and went
 * stale. Measured impact: 20 authored class-12 English notes
 * (`language-development/01-unit-1-critical-thinking.json` …) were on disk and
 * invisible, because their entries had never been added; stale entries also
 * pointed at files that no longer existed (a renamed Nepali typo slug). Every
 * run of `content:build` now has this companion so the corpus cannot drift
 * from the source tree again.
 *
 * Behaviour:
 *   • every source note JSON under `notes/concepts` (any depth) is upserted
 *     as { path, data } — the entry shape the readers already expect (path is
 *     repo-relative to `content/`);
 *   • `notes/concepts` entries whose files are GONE are pruned (stale
 *     copies cannot resurrect renamed/removed content);
 *   • every other section of the manifest (other content families, index
 *     files) is left exactly as it is.
 *
 * Usage:  node scripts/build-content-corpus.mjs [--check]
 *   --check  report drift and exit 1 instead of writing (CI guard).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content");
const MANIFEST = path.join(ROOT, "frontend", "public", "data", "content", "manifest.json");
const CHECK_ONLY = process.argv.includes("--check");

/** Every source note file under content/notes/concepts, as corpus paths. */
function collectSourceFiles() {
  const base = path.join(SRC, "notes", "concepts");
  const found = new Map(); // corpus path -> absolute file
  if (!fs.existsSync(base)) return found;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(abs);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        const rel = path.relative(SRC, abs).split(path.sep).join("/");
        found.set(rel, abs);
      }
    }
  };
  walk(base);
  return found;
}

function main() {
  const sourceFiles = collectSourceFiles();
  const manifest = fs.existsSync(MANIFEST)
    ? JSON.parse(fs.readFileSync(MANIFEST, "utf-8"))
    : [];
  if (!Array.isArray(manifest)) {
    console.error("content/manifest.json is not an array — refusing to touch it.");
    process.exit(1);
  }

  const existing = new Map(manifest.map((item, index) => [item.path, index]));
  const next = [];
  const kept = new Set();
  let unchanged = 0;
  let refreshed = 0;

  // 1. Retain existing entries in their current order; refresh the
  //    notes/concepts ones from disk, prune the ones whose file is gone.
  let pruned = 0;
  for (const item of manifest) {
    const isCorpus = typeof item.path === "string" && item.path.startsWith("notes/concepts/");
    if (!isCorpus) {
      next.push(item);
      continue;
    }
    const file = sourceFiles.get(item.path);
    if (!file) {
      pruned += 1;
      continue;
    }
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    if (JSON.stringify(item.data) === JSON.stringify(data)) {
      unchanged += 1;
    } else {
      refreshed += 1;
    }
    next.push({ ...item, data });
    kept.add(item.path);
  }

  // 2. Append corpus files the manifest has never seen (the stale-manifest bug).
  const added = [];
  for (const [rel, abs] of [...sourceFiles.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (kept.has(rel) || existing.has(rel)) continue;
    added.push({ path: rel, data: JSON.parse(fs.readFileSync(abs, "utf-8")) });
  }
  next.push(...added);

  console.log(
    `content corpus: ${sourceFiles.size} source files · ${added.length} added · ${refreshed} refreshed · ${unchanged} unchanged · ${pruned} stale pruned · ${next.length} entries total`,
  );

  if (CHECK_ONLY) {
    const drift = added.length + refreshed + pruned;
    if (drift > 0) {
      console.error(`DRIFT: the corpus manifest is out of date (${drift} changes pending).`);
      process.exit(1);
    }
    console.log("corpus manifest in sync.");
    return;
  }

  const body = `${JSON.stringify(next, null, 2).replace(/\n/g, "\r\n")}\r\n`;
  fs.writeFileSync(MANIFEST, body, "utf-8");
  console.log(`wrote ${path.relative(ROOT, MANIFEST)}`);
}

main();
