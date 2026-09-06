/**
 * build-syllabus-notes.js
 *
 * Builds the runtime data consumed by RavikishanTopicResources:
 *   frontend/public/data/syllabus-notes/<subject>/_manifest.json
 *   frontend/public/data/syllabus-notes/<subject>/<unit>/<filename>.json
 *
 * Sources scanned:  content/ravikishan/class-11-notes/<subject>/<unit>/concepts/*.json
 *
 * Tab typing (Type 1 / Type 2 …):
 *   - A concept file WITHOUT a "duplicateType" field is Type 1 (Original).
 *   - A file WITH "duplicateType": 2 and "tabGroup": "<originalTopicSlug>"
 *     is paired with the file whose topicSlug === tabGroup and becomes
 *     "Type 2 (Duplicated)" in the UI tabs.
 *
 * Usage:  node content-tools/build-syllabus-notes.js [subject ...]
 *         (default: all subjects found under class-11-notes)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "content", "ravikishan", "class-11-notes");
const DEST = path.join(ROOT, "frontend", "public", "data", "syllabus-notes");

function readJsonSafe(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    console.warn("  ! skipped (invalid JSON):", path.relative(ROOT, p));
    return null;
  }
}

function buildSubject(subject) {
  const subjectDir = path.join(SRC, subject);
  if (!fs.existsSync(subjectDir)) return;
  const units = fs
    .readdirSync(subjectDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const manifest = [];
  let copied = 0;
  let skipped = 0;

  for (const unit of units) {
    const conceptsDir = path.join(subjectDir, unit, "concepts");
    if (!fs.existsSync(conceptsDir)) continue;
    const outUnitDir = path.join(DEST, subject, unit);
    fs.mkdirSync(outUnitDir, { recursive: true });

    const files = fs
      .readdirSync(conceptsDir)
      .filter((f) => f.endsWith(".json"));

    // Group: original = no duplicateType; variant = duplicateType + tabGroup
    const originals = new Map(); // topicSlug -> {file, data}
    for (const f of files) {
      const data = readJsonSafe(path.join(conceptsDir, f));
      if (!data) { skipped++; continue; }
      if (!data.duplicateType) originals.set(data.topicSlug, { file: f, data });
    }

    for (const f of files) {
      const data = readJsonSafe(path.join(conceptsDir, f));
      if (!data) continue;
      const isVariant = Boolean(data.duplicateType && data.tabGroup);
      const paired = isVariant && originals.has(data.tabGroup);
      const duplicateType = isVariant
        ? (paired ? data.duplicateType : 1)
        : 1;
      const topicSlug = isVariant && paired ? data.tabGroup : data.topicSlug;

      const filename = paired
        ? f.replace(/\.json$/, `-${data.duplicateType}.json`)
        : f;
      fs.writeFileSync(
        path.join(outUnitDir, filename),
        JSON.stringify(data, null, 2)
      );
      copied++;

      manifest.push({
        unitSlug: unit,
        topicSlug,
        title: data.title || data.topicTitle || topicSlug,
        noteCount: 1,
        source: "ravikishan",
        duplicateType,
        filename,
      });
    }
  }

  manifest.sort(
    (a, b) =>
      (a.unitSlug || "").localeCompare(b.unitSlug || "") ||
      (a.topicSlug || "").localeCompare(b.topicSlug || "") ||
      (a.duplicateType ?? 1) - (b.duplicateType ?? 1)
  );

  fs.mkdirSync(path.join(DEST, subject), { recursive: true });
  fs.writeFileSync(
    path.join(DEST, subject, "_manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(
    `${subject}: ${manifest.length} manifest entries, ${copied} files copied, ${skipped} skipped`
  );
}

const args = process.argv.slice(2);
const subjects = args.length
  ? args
  : fs.readdirSync(SRC).filter((d) => fs.statSync(path.join(SRC, d)).isDirectory());

for (const s of subjects) buildSubject(s);
console.log("Done.");
