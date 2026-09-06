// test_fix2.js — verify Fix2 works correctly
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';

const rel = 'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json';
const fp = path.join(SRC, rel);
const raw = fs.readFileSync(fp, 'utf8');

// Fix2: replace each \" (backslash+quote) with " (quote)
const fixed = raw.replace(/\\\\"/g, '"');

// Verify by parsing
const obj = JSON.parse(fixed);
console.log('topicSlug:', obj.topicSlug);
console.log('title:', obj.title);
console.log('keys:', Object.keys(obj).slice(0, 5));

// Verify the fixed string has clean quotes (not escaped)
const line2 = fixed.split('\n')[1];
console.log('Line 2 raw:', JSON.stringify(line2));
// Check char codes at position 6 (first char of key)
console.log('First char of key (code):', line2.charCodeAt(2)); // should be 34 (")
