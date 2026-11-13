#!/usr/bin/env node
/**
 * apply-mindmaps.cjs — write researched concept trees into concept JSONs.
 *
 * The `mindmap` field on a topic's concept JSON is what TopicDocView draws as
 * the concept tree at the top of the document. This script takes a researched
 * dictionary (see mindmap-physics-11.json) and merges each entry into the
 * matching JSON file without disturbing any other field or the file's
 * formatting.
 *
 * Usage (from repo root):
 *   node content-tools/enhancers/apply-mindmaps.cjs content-tools/enhancers/mindmap-physics-11.json
 *
 * Key format: "<class-dir>/<subject>/<unit>/<topic-slug>", e.g.
 *   "class-11/physics/kinematics/projectile-motion-and-its-applications"
 *
 * Safety:
 *   - never overwrites an existing `mindmap` unless --force is passed;
 *   - reports applied / skipped / unmatched, and unmatched must end at 0;
 *   - writes JSON with the same 2-space indent the corpus uses;
 *   - validates the shape before writing (branches need topic + points).
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const CONCEPTS = path.join(ROOT, "content", "notes", "concepts");

function walkJson(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJson(p, out);
    else if (entry.name.endsWith(".json")) out.push(p);
  }
  return out;
}

/** "class-11/physics/kinematics/some-topic" -> { classDir, subject, unit, slug } */
function parseKey(key) {
  const parts = String(key).split("/");
  if (parts.length !== 4) return null;
  const [classDir, subject, unit, slug] = parts;
  if (!classDir || !subject || !unit || !slug) return null;
  return { classDir, subject, unit, slug };
}

function validate(entry) {
  if (!entry || typeof entry !== "object") return "not an object";
  if (typeof entry.centralConcept !== "string" || !entry.centralConcept.trim()) {
    return "missing centralConcept";
  }
  if (!Array.isArray(entry.branches) || entry.branches.length < 2) {
    return "needs at least 2 branches";
  }
  for (const branch of entry.branches) {
    if (!branch || typeof branch.topic !== "string" || !branch.topic.trim()) {
      return "a branch is missing its topic";
    }
    const details = Array.isArray(branch.details) ? branch.details : [];
    const subs = Array.isArray(branch.subtopics) ? branch.subtopics : [];
    if (details.length === 0 && subs.length === 0) {
      return `branch "${branch.topic}" has no details or subtopics`;
    }
  }
  return null;
}

/**
 * Load the syllabus topic path for a file so a key can be matched even when
 * the filename differs slightly from the topic slug.
 */
function topicKeyForFile(file) {
  const rel = path.relative(CONCEPTS, file).split(path.sep);
  if (rel.length !== 4) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const slug = String(raw.topicSlug || "").trim();
  if (!slug) return null;
  return `${rel[0]}/${rel[1]}/${rel[2]}/${slug}`;
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const dictPath = args.find((a) => !a.startsWith("--"));
  if (!dictPath) {
    console.error("usage: node apply-mindmaps.cjs <dictionary.json> [--force]");
    process.exit(1);
  }

  const dict = JSON.parse(fs.readFileSync(path.resolve(dictPath), "utf8"));
  const keys = Object.keys(dict);
  if (keys.length === 0) {
    console.error("dictionary is empty");
    process.exit(1);
  }

  // Index concept files by "<class>/<subject>/<unit>/<topicSlug>".
  const byKey = new Map();
  for (const file of walkJson(CONCEPTS)) {
    const key = topicKeyForFile(file);
    if (key && !byKey.has(key)) byKey.set(key, file);
  }

  let applied = 0;
  let skipped = 0;
  const unmatched = [];
  const invalid = [];

  for (const key of keys) {
    const parsed = parseKey(key);
    if (!parsed) {
      invalid.push(`${key} (key must be class/subject/unit/slug)`);
      continue;
    }
    const entry = dict[key];
    const problem = validate(entry);
    if (problem) {
      invalid.push(`${key} (${problem})`);
      continue;
    }

    const file = byKey.get(key);
    if (!file) {
      unmatched.push(key);
      continue;
    }

    const doc = JSON.parse(fs.readFileSync(file, "utf8"));
    if (doc.mindmap && !force) {
      skipped += 1;
      continue;
    }

    // Merge only the researched tree; leave every other field untouched.
    doc.mindmap = {
      centralConcept: entry.centralConcept.trim(),
      branches: entry.branches.map((b) => {
        const out = { topic: String(b.topic).trim() };
        if (Array.isArray(b.details) && b.details.length) {
          out.details = b.details.map((d) => String(d).trim()).filter(Boolean);
        }
        if (Array.isArray(b.subtopics) && b.subtopics.length) {
          out.subtopics = b.subtopics.map((s) => ({
            name: String(s.name).trim(),
            points: (Array.isArray(s.points) ? s.points : []).map((p) => String(p).trim()).filter(Boolean),
          }));
        }
        return out;
      }),
    };

    fs.writeFileSync(file, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
    applied += 1;
  }

  console.log(`dictionary entries : ${keys.length}`);
  console.log(`applied            : ${applied}`);
  console.log(`skipped (existing) : ${skipped}`);
  console.log(`unmatched          : ${unmatched.length}`);
  console.log(`invalid            : ${invalid.length}`);
  if (unmatched.length) {
    console.log("\nUnmatched keys:");
    unmatched.forEach((k) => console.log(`  ${k}`));
  }
  if (invalid.length) {
    console.log("\nInvalid entries:");
    invalid.forEach((k) => console.log(`  ${k}`));
  }
  if (unmatched.length || invalid.length) process.exit(1);
}

main();
