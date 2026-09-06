// test_replace.js — figure out the right replacement for corrupted files
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';

// Pick one corrupted file and inspect raw bytes + try fixes
const rel = 'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json';
const fp = path.join(SRC, rel);
const raw = fs.readFileSync(fp, 'utf8');

console.log('=== RAW FILE INSPECTION ===');
console.log('First 80 chars (string repr):', JSON.stringify(raw.slice(0, 80)));
console.log('');

// Find position of first backslash
const bsIdx = raw.indexOf('\\');
console.log('First backslash at index:', bsIdx);
if (bsIdx >= 0) {
  console.log('Char before BS:', JSON.stringify(raw[bsIdx - 1]));
  console.log('Char at BS (code):', raw.charCodeAt(bsIdx));
  console.log('Char after BS (code):', raw.charCodeAt(bsIdx + 1));
  console.log('Chars around BS:', JSON.stringify(raw.slice(bsIdx - 2, bsIdx + 3)));
}
console.log('');

// Try different replacements
console.log('=== TRYING FIXES ===');

// Fix 1: replace /\\"/g with '"'
const r1 = raw.replace(/\\"/g, '"');
console.log('Fix1 (replace /\\\\\"/g with \'"\' ): first 60 chars:', JSON.stringify(r1.slice(0, 60)));
try { JSON.parse(r1); console.log('  → PARSED OK'); } catch(e) { console.log('  → PARSE FAIL:', e.message.slice(0, 60)); }

// Fix 2: replace \\\" with " (two backslashes then quote in regex)
const r2 = raw.replace(/\\\\"/g, '"');
console.log('Fix2 (replace /\\\\\\\"/g with \'"\' ): first 60 chars:', JSON.stringify(r2.slice(0, 60)));
try { JSON.parse(r2); console.log('  → PARSED OK'); } catch(e) { console.log('  → PARSE FAIL:', e.message.slice(0, 60)); }

// Fix 3: use a function-based replace to log each match
let matches = 0;
const r3 = raw.replace(/\\/g, (m) => { matches++; return ''; });
console.log(`Fix3 (remove all backslashes, ${matches} matches): first 60 chars:`, JSON.stringify(r3.slice(0, 60)));
try { JSON.parse(r3); console.log('  → PARSED OK'); } catch(e) { console.log('  → PARSE FAIL:', e.message.slice(0, 60)); }

// Fix 4: remove both backslashes and the quotes adjacent to them (i.e., keep one quote)
// The pattern is: \"  needs to become "  (the backslash is the extra char)
// So: replace each \ with nothing (done above) - that removes ALL backslashes
// But what if string VALUES contain real backslashes?
// Check: are there any real escapes in the raw content?
const hasRealEscape = raw.includes('\\n') || raw.includes('\\t') || raw.includes('\\r') || raw.includes('\\\\');
console.log(`Has real JSON escapes (\\n \\t \\r \\\\): ${hasRealEscape}`);

// Fix 5: more targeted - only remove backslash before a quote
const r5 = raw.replace(/\\(?=")/g, '');
console.log('Fix5 (remove BS only before quote): first 60 chars:', JSON.stringify(r5.slice(0, 60)));
try { JSON.parse(r5); console.log('  → PARSED OK'); } catch(e) { console.log('  → PARSE FAIL:', e.message.slice(0, 60)); }
