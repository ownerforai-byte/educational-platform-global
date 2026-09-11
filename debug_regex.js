// debug_regex.js — figure out exactly what each regex does
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'content', 'ravikishan', 'class-11-notes', 'physics/thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json');
const raw = fs.readFileSync(fp, 'utf8');

// Test 1: /"\\"/g  → what does this regex match?
// In a regex literal, the /g applies to the whole pattern
// /"\\"/g means: match quote, then backslash, then quote
// In the raw string, the 3-char sequence is: 22 5c 22 = " \ "
// So this matches the 3-byte sequence "\"
const t1 = raw.replace(/"\\"/g, '"');
console.log('Test1 /"\\"/g → "');
console.log('  First 60:', JSON.stringify(t1.slice(0, 60)));
try { const o = JSON.parse(t1); console.log('  PARSE OK:', o.topicSlug, o.title); }
catch(e) { console.log('  FAIL:', e.message.slice(0,60)); }

// Test 2: /\\\\"/g  → what does this regex match?
// In a regex literal, \\ matches one backslash, \" matches one quote
// So this matches: backslash then quote (2-byte sequence)
const t2 = raw.replace(/\\\\"/g, '"');
console.log('\nTest2 /\\\\"/g → "');
console.log('  First 60:', JSON.stringify(t2.slice(0, 60)));
try { const o = JSON.parse(t2); console.log('  PARSE OK:', o.topicSlug, o.title); }
catch(e) { console.log('  FAIL:', e.message.slice(0,60)); }

// Let me be very explicit about what's in the raw file
console.log('\n=== Raw file analysis ===');
// Show chars 4-14 with their char codes
for (let i = 4; i < 14; i++) {
  console.log(`  pos ${i}: code=${raw.charCodeAt(i)} char=${JSON.stringify(raw[i])}`);
}

// The key question: does raw contain [34,92,34] (\"\\\")
// or [34,92,92,34] ("\\\\")?
console.log('\nByte-level check:');
console.log('  raw[4] code:', raw.charCodeAt(4), '(should be 34 = quote)');
console.log('  raw[5] code:', raw.charCodeAt(5), '(should be 92 = backslash)');
console.log('  raw[6] code:', raw.charCodeAt(6), '(should be 34 = quote)');
console.log('  raw[7] code:', raw.charCodeAt(7), '(should be 116 = t)');
