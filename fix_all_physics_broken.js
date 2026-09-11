// fix_all_physics_broken.js — comprehensive fix for all broken physics concept files
// Patterns:
//   A: Double-encoded string (parse outer JSON string → inner JSON) — e.g. temperature-scales.json
//   B: Backslash-escaped structural quotes (\"title\" → "title") — 14 files
//      Fix: raw.replace(/\\\\"/g, '"')  — replaces each literal \" with "
//   C: Key soup / unfixable — e.g. 07-newtons-law-rate-of-fall...
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content', 'ravikishan', 'class-11-notes', 'physics');

function ensureSlug(obj, unitSlug) {
  if (!obj.topicSlug && obj.title) {
    obj.topicSlug = obj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (!obj.title && obj.topicTitle) {
    obj.title = obj.topicTitle;
  }
  if (!obj.unitSlug) obj.unitSlug = unitSlug;
  return obj;
}

function scan(dir) {
  const results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const fp = path.join(dir, d.name);
    if (d.isDirectory()) results.push(...scan(fp));
    else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
      const raw = fs.readFileSync(fp, 'utf8');
      try {
        const obj = JSON.parse(raw);
        if (!obj.topicSlug) {
          const rel = path.relative(SRC, fp);
          const unitSlug = rel.split(path.sep)[0];
          results.push({ file: rel, fp, raw, obj, unitSlug });
        }
      } catch (e) {
        results.push({ file: path.relative(SRC, fp), action: 'parse-error', error: e.message.slice(0, 80) });
      }
    }
  });
  return results;
}

const issues = scan(SRC);
console.log(`Found ${issues.length} files missing topicSlug\n`);

let fixed = 0, skipped = 0;

for (const item of issues) {
  if (item.action === 'parse-error') {
    console.log(`PARSE ERROR: ${item.file} — ${item.error}`);
    skipped++;
    continue;
  }

  const { fp, raw, obj, unitSlug } = item;
  let fixedObj = null;
  let pattern = '';

  // Pattern A: double-encoded string
  if (typeof obj === 'string') {
    try {
      const inner = JSON.parse(obj);
      if (typeof inner === 'object' && inner !== null && !Array.isArray(inner)) {
        fixedObj = inner;
        pattern = 'double-encoded';
      }
    } catch (e) { /* not double-encoded */ }
  }

  // Pattern B: backslash-escaped structural quotes (keys start with '"')
  if (!fixedObj && typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    const hasEscapedKeys = keys.some(k => k.startsWith('"'));
    if (hasEscapedKeys) {
      const corrected = raw.replace(/\\\\"/g, '"');
      try {
        fixedObj = JSON.parse(corrected);
        pattern = 'double-escaped-keys';
      } catch (e) {
        console.log(`FIX FAIL: ${item.file} — ${e.message.slice(0, 80)}`);
        skipped++;
        continue;
      }
    }
  }

  // Pattern C: key soup — unfixable
  if (!fixedObj) {
    const keys = Object.keys(obj);
    const allNonEmpty = keys.length > 0 && keys.every(k => k !== '');
    const allEmptyVals = Object.values(obj).every(v => v === '');
    if (allNonEmpty && allEmptyVals) {
      console.log(`SKIP (unfixable key-soup): ${item.file}`);
      console.log(`  Keys: ${keys.join(', ')}`);
      skipped++;
      continue;
    }
    console.log(`SKIP (unknown pattern): ${item.file}`);
    skipped++;
    continue;
  }

  ensureSlug(fixedObj, unitSlug);
  fs.writeFileSync(fp, JSON.stringify(fixedObj, null, 2), 'utf8');
  console.log(`FIXED [${pattern}] ${item.file}: topicSlug="${fixedObj.topicSlug}", title="${(fixedObj.title || '').slice(0, 40)}"`);
  fixed++;
}

console.log(`\nFixed: ${fixed}, Skipped: ${skipped}`);
