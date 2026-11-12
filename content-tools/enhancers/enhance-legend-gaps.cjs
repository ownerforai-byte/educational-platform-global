#!/usr/bin/env node
/**
 * Enhancer: wires authored legend-gap content (examShortTricks, keyPoints,
 * practiceQuestions) into concept JSONs for syllabus topics whose legend page
 * would otherwise show an honest empty state.
 *
 * Usage: node content-tools/enhancers/enhance-legend-gaps.cjs [content-file.json ...]
 * Default: all content-tools/enhancers/legend-gap-content-*.json
 *
 * Matching: dictionary key = <classSlug>/<subjectSlug>/<unitId>/<syllabusTopicSlug>.
 * Target file = concept JSON in the unit whose number-stripped slug matches the
 * syllabus topic slug exactly, else best token overlap, else lowest-numbered file.
 * Never overwrites a field that already holds content.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CONCEPTS = path.join(ROOT, 'content', 'notes', 'concepts');

const defaultFiles = fs
  .readdirSync(__dirname)
  .filter((f) => /^legend-gap-content-.*\.json$/.test(f))
  .map((f) => path.join(__dirname, f));
const files = process.argv.slice(2).length ? process.argv.slice(2) : defaultFiles;

const dictionaries = files.map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));

function cleanSlug(fileSlug) {
  return fileSlug.replace(/^\d+[.\-_ ]+/, '').toLowerCase();
}

function tokenize(slug) {
  return new Set(slug.split('-').filter((w) => w.length > 2 && w !== 'and' && w !== 'the' && w !== 'of'));
}

function overlapScore(fileSlug, targetSlug) {
  const a = tokenize(fileSlug);
  const b = tokenize(targetSlug);
  if (a.size === 0 || b.size === 0) return 0;
  let hits = 0;
  for (const w of b) {
    if (a.has(w)) { hits++; continue; }
    for (const x of a) {
      if (w.length > 4 && x.length > 4 && (w.startsWith(x) || x.startsWith(w))) { hits++; break; }
    }
  }
  return hits / b.size;
}

function pickTargetFile(unitDir, topicSlug) {
  const files = fs.readdirSync(unitDir).filter((f) => f.endsWith('.json'));
  let best = null;
  let bestScore = -1;
  for (const f of files) {
    const score = overlapScore(cleanSlug(f.replace(/\.json$/, '')), topicSlug);
    if (score > bestScore) { bestScore = score; best = f; }
  }
  // exact match preferred
  for (const f of files) {
    if (cleanSlug(f.replace(/\.json$/, '')) === topicSlug) return { file: f, score: 1 };
  }
  return { file: bestScore >= 0.4 ? best : null, score: bestScore };
}

const FIELD_LABEL = {
  examShortTricks: 'examShortTricks',
  keyPoints: 'keyPoints',
  practiceQuestions: 'practiceQuestions',
};

let applied = 0;
let skippedHasContent = 0;
let unmatched = [];
const touchedFiles = new Set();

for (const dict of dictionaries) {
  for (const [key, content] of Object.entries(dict)) {
    const [classSlug, subjectSlug, unitId, topicSlug] = key.split('/');
    const cls = classSlug.replace(/-notes$/, '');
    const unitDir = path.join(CONCEPTS, cls, subjectSlug, unitId);
    if (!fs.existsSync(unitDir)) { unmatched.push(key + ' (no unit dir)'); continue; }
    const picked = pickTargetFile(unitDir, topicSlug);
    if (!picked.file) { unmatched.push(key + ' (no file match)'); continue; }
    const filePath = path.join(unitDir, picked.file);
    let data;
    try { data = JSON.parse(fs.readFileSync(filePath, 'utf8')); }
    catch (e) { unmatched.push(key + ' (unparseable: ' + filePath + ')'); continue; }
    let changed = false;
    for (const [field, values] of Object.entries(content)) {
      if (!FIELD_LABEL[field]) continue;
      const existing = data[field];
      if (Array.isArray(existing) && existing.length > 0) { skippedHasContent++; continue; }
      data[field] = values;
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      applied++;
      touchedFiles.add(filePath);
    }
  }
}

console.log('applied to files:', applied);
console.log('fields skipped (already had content):', skippedHasContent);
console.log('unmatched keys:', unmatched.length);
unmatched.forEach((u) => console.log('  -', u));
