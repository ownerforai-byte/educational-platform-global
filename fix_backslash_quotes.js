// fix_backslash_quotes.js — fix files with \" corruption at byte level
// Strategy: remove ALL backslashes from the file content.
// These files have no legitimate JSON escapes (\n, \t, etc.) — all backslashes
// are structural corruption (\" in keys and values).
// After removing all \:
//   Before: "\"title\": \"Linear...\""
//   After:  ""title": "Linear..."" — still broken!
//
// Better strategy: parse the file character-by-character.
// When we see a backslash, the NEXT character (always a quote) is also corruption.
// Skip both characters. When we see a standalone quote that is structural, keep it.
//
// Even better: the corruption adds an EXTRA layer of quoting.
// Before: "\"title\": \"value\"" (corrupted)
//   Bytes: 22 5c 22 title 22 3a 20 22 5c 22 value 22
// We want: "title": "value"
//   Bytes: 22 title 22 3a 20 22 value 22
//
// The pattern at each boundary is: 22 5c 22 (quote, backslash, quote)
// We want: 22 (just one quote)
// So replace each occurrence of [22 5c 22] with [22]
const fs = require('fs');
const path = require('path');

function fixFile(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  // Replace the 3-byte sequence quote+backslash+quote with just quote
  const fixed = raw.replace(/"\\"/g, '"');
  try {
    return JSON.parse(fixed);
  } catch (e) {
    // Fallback: try another pattern
    // Maybe the corruption is: \\" (backslash+backslash+quote) = 5c 5c 22
    const fixed2 = raw.replace(/\\\\"/g, '"');
    try {
      return JSON.parse(fixed2);
    } catch (e2) {
      return null;
    }
  }
}

// Test on one file first
const SRC = path.join(__dirname, 'content', 'ravikishan', 'class-11-notes', 'physics');
const testFile = path.join(SRC, 'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json');

console.log('=== Testing on thermal-expansion/01 ===');
const raw = fs.readFileSync(testFile, 'utf8');

// Show first 40 bytes
console.log('First 40 bytes hex:');
for (let i = 0; i < Math.min(40, raw.length); i++) {
  const ch = raw.charCodeAt(i);
  const ascii = (ch >= 32 && ch <= 126) ? String.fromCharCode(ch) : '?';
  process.stdout.write(`${ch.toString(16).padStart(2,'0')}${ascii} `);
  if ((i+1) % 20 === 0) console.log('');
}
console.log('\n');

// The pattern at byte level is: 22 5c 22 (quote, backslash, quote)
// In the UTF-8 string, this is three characters: " \ "
// Try: replace each "\" with just '"'
console.log('Try replace /"\\"/g with \'"\':');
const fixed1 = raw.replace(/"\\"/g, '"');
console.log('  First 80:', JSON.stringify(fixed1.slice(0, 80)));
try {
  const o = JSON.parse(fixed1);
  console.log('  PARSE OK! topicSlug:', o.topicSlug, 'title:', o.title);
} catch(e) {
  console.log('  PARSE FAIL:', e.message.slice(0, 60));
}

// Or maybe it's: backslash then quote-as-two-chars: 5c 22
// In UTF-8 string, this is TWO characters: \
// Try: replace each \" with '"'
console.log('\nTry replace /\\\\"/g with \'"\':');
const fixed2 = raw.replace(/\\\\"/g, '"');
console.log('  First 80:', JSON.stringify(fixed2.slice(0, 80)));
try {
  const o = JSON.parse(fixed2);
  console.log('  PARSE OK! topicSlug:', o.topicSlug, 'title:', o.title);
} catch(e) {
  console.log('  PARSE FAIL:', e.message.slice(0, 60));
}

// Try: replace each \" with '"' using a function
console.log('\nTry function replace:');
let matchCount = 0;
const fixed3 = raw.replace(/\\\\/g, (match, offset) => {
  matchCount++;
  return '';
});
console.log(`  Removed ${matchCount} backslashes`);
console.log('  First 80:', JSON.stringify(fixed3.slice(0, 80)));
try {
  const o = JSON.parse(fixed3);
  console.log('  PARSE OK! topicSlug:', o.topicSlug, 'title:', o.title);
} catch(e) {
  console.log('  PARSE FAIL:', e.message.slice(0, 60));
}
