// debug_bytes.js - read and show exact byte layout of corrupted file
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content/ravikishan/class-11-notes/physics/thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json');
const buf = fs.readFileSync(fp);

// Show first 60 bytes as hex with ASCII
for (let i = 0; i < Math.min(60, buf.length); i++) {
  const ch = buf[i];
  const hex = ch.toString(16).padStart(2, '0');
  const ascii = (ch >= 32 && ch <= 126) ? String.fromCharCode(ch) : '.';
  process.stdout.write(`${hex} `);
  if ((i + 1) % 20 === 0) process.stdout.write('\n');
}
console.log('\n');

// Now try to fix with buffer operations
// The pattern is: quote(22) backslash(5c) quote(22) -- these three bytes
// where the middle two bytes are "escaped" quotes that are just corruption.
// We want: just quote(22) quote(22) ... but that gives ""title"
// 
// Wait - let me re-read the file carefully
const raw = buf.toString('utf8');
console.log('First 80 chars repr:', JSON.stringify(raw.slice(0, 80)));
console.log('');

// What we NEED for valid JSON: 
//   "title": "Linear Expansion..."
// What we HAVE:
//   "\"title\": "\"Linear Expansion..."
// 
// To go from "\"title\"" to "title":
// - First quote (position 0 of key): this is a CORRUPTED structural quote - should stay as "
// - Backslash+quote (positions 1-2): this is a CORRUPTED escape - remove entirely  
// - "title" (positions 3-8): the actual key name
// - Backslash+quote (positions 9-10): another CORRUPTED escape - remove entirely
// - Second quote: this is a CORRUPTED structural quote - should stay as "
//
// Wait no. The original has: " + \" + title + \"
// We want: " + title + "
// So: remove each \" (backslash+quote) occurrence entirely

// Let me verify by replacing the 3-byte sequence [34, 92, 34] with [34]
// No wait - the sequence is:
// [34] [92 34] title [92 34]
// Replace [92 34] with empty? No - that removes the closing quote too
//
// Actually let me check: what's the exact byte layout at the KEY boundary?
// Is it: 22 5c 22 title 22 5c 22  or  22 5c 22 title 5c 22  ?
// From hex: 22 5c 22 74 69 74 6c 65 22 = " + \ + " + title + "
// So: " + "title + "
// We want: " + title + "
// This means: keep the first 22, remove 5c 22 (backslash-quote), keep title, keep last 22
// Wait that gives: " + title + " which is correct!
//
// But earlier replacement of [5c 22] with [22] gave ""title"
// That's because: 22 5c 22 -> 22 22 (quote replaced the backslash position)
// We want: 22 5c 22 -> 22 (remove both the backslash AND the quote)
// So replace [5c 22] with nothing (empty)

const target = Buffer.from([0x5c, 0x22]); // \"
let result = Buffer.alloc(0);
let lastEnd = 0;
let count = 0;

while (true) {
  const idx = result.length > 0 
    ? result.indexOf(target, lastEnd)
    : buf.indexOf(target, lastEnd);
    
  if (idx === -1) {
    // Copy remaining
    if (lastEnd === 0) result = buf;
    else result = Buffer.concat([result, buf.slice(lastEnd)]);
    break;
  }
  
  if (lastEnd === 0) {
    result = buf.slice(0, idx);
  } else {
    result = Buffer.concat([result, buf.slice(lastEnd, idx)]);
  }
  lastEnd = idx + 2; // skip the [5c 22]
  count++;
}

console.log(`Replaced ${count} occurrences (removed \\")`);
const fixed = result.toString('utf8');
console.log('First 80 chars:', JSON.stringify(fixed.slice(0, 80)));

try {
  const obj = JSON.parse(fixed);
  console.log('topicSlug:', obj.topicSlug);
  console.log('title:', obj.title);
} catch (e) {
  console.log('Parse FAIL:', e.message.slice(0, 80));
}
