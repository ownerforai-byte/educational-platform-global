/**
 * Lifts nested enrichedContent / originalContent fields to the top level
 * of every biology concept JSON under content/ravikishan/class-11-notes/biology.
 *
 * Strategy per field:
 *   1. If the top-level field already has real content, keep it.
 *   2. Otherwise lift enrichedContent[field], else originalContent[field]
 *      (deep-cloned).
 *
 * Run:  node content-tools/lift-bio-fields.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BIO = path.join(ROOT, 'content', 'ravikishan', 'class-11-notes', 'biology');

// Fields the UI (topic-vertical-notes.tsx) reads at the top level
const FIELDS = [
  'notes', 'confusion', 'practice', 'universalFacts', 'examples',
  'practiceQuestions', 'formulas', 'keyPoints', 'summary', 'specialNotes',
  'importantStatements', 'importantNotes', 'examShortTricks', 'examNotes',
  'mcs', 'mcqs', 'importantConcepts', 'importantTasks', 'exercises'
];

const DRY = process.argv.includes('--dry');

// Generator-produced boilerplate patterns (from ensure-all-fields.js templates
// and earlier populate scripts). Anything matching these is NOT real content.
const PLACEHOLDER_PATTERNS = [
  /^Real content for this topic/i,
  /Placeholder/i,
  /^Question \?/i,
  /^Point \d/i,
  /^Formula \d/i,
  /^Example \d/i,
  /^Task \d/i,
  /^Trick \d/i,
  /^Note \d/i,
  /^Statement \d/i,
  /Detailed notes on \d+/i,
  /Practice exercise for \d+/i,
  /Universal scientific fact for \d+/i,
  /Misconception about \d+/i,
  /Core point for \d+/i,
  /Summary of \d+/i,
  /Specialized insight for \d+/i,
  /Key statement for \d+/i,
  /Important note for \d+/i,
  /Short trick for \d+/i,
  /Exam tip for \d+/i,
  /Exam note for \d+/i,
  /Real-world example of \d+/i,
  /Practice question for \d+/i,
  /Relevant formula for \d+/i,
  /^Key Point \d/i,
  /^Key Formula \d/i,
  /^Example \d:/i,
  /^Q\d+\.\s/i,
  /^\*{0,2}(Scope|Summary)\.\*{0,2}.*This topic covers the fundamental/i,
];

function isPlaceholderString(s) {
  if (typeof s !== 'string') return false;
  if (s.trim().length < 20) return true; // too short to be meaningful on its own
  return PLACEHOLDER_PATTERNS.some((re) => re.test(s));
}

function hasRealContent(v) {
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) {
    if (v.length === 0) return false;
    return v.some((x) => {
      const s = typeof x === 'string' ? x : JSON.stringify(x);
      return s.length > 20 && !isPlaceholderString(s);
    });
  }
  if (typeof v === 'string') return !isPlaceholderString(v);
  if (typeof v === 'object' && !Array.isArray(v)) return Object.keys(v).length > 0;
  return false;
}

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'concepts') {
        for (const cf of fs.readdirSync(p)) if (cf.endsWith('.json')) out.push(path.join(p, cf));
      } else walk(p, out);
    }
  }
  return out;
}

const files = walk(BIO);
let liftedFields = 0;
let changedFiles = 0;

for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const en = j.enrichedContent || {};
  const oc = j.originalContent || {};
  let changed = false;

  for (const field of FIELDS) {
    if (hasRealContent(j[field])) continue; // keep existing real top-level value

    let src;
    if (hasRealContent(en[field])) src = en[field];
    else if (hasRealContent(oc[field])) src = oc[field];
    else continue; // nothing real anywhere

    j[field] = JSON.parse(JSON.stringify(src)); // deep clone
    liftedFields++;
    changed = true;
    if (DRY) process.stdout.write(`    + ${field}\n`);
  }

  if (changed) {
    changedFiles++;
    console.log(`${DRY ? '[DRY] ' : ''}${path.relative(ROOT, f)}`);
    if (!DRY) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8');
  }
}

console.log(`\n${DRY ? '[DRY RUN] ' : ''}files: ${files.length} | changed: ${changedFiles} | field lifts: ${liftedFields}`);
