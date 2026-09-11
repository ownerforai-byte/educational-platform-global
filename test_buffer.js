// test_buffer.js — use Buffer to do byte-level replacement
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';
const rel = 'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json';
const fp = path.join(SRC, rel);
const buf = fs.readFileSync(fp);

// Raw bytes: 5c 22 = backslash(92) + quote(34)
// We want to replace each occurrence of bytes [92, 34] with byte [34]
const target = Buffer.from([0x5c, 0x22]); // \"
const replacement = Buffer.from([0x22]);   // "

let result = buf;
let offset = 0;
let count = 0;
while ((offset = result.indexOf(target, offset)) !== -1) {
  result = Buffer.concat([result.slice(0, offset), replacement, result.slice(offset + target.length)]);
  offset += replacement.length;
  count++;
}

console.log(`Replaced ${count} occurrences`);
const fixed = result.toString('utf8');
console.log('First 80 chars:', JSON.stringify(fixed.slice(0, 80)));

try {
  const obj = JSON.parse(fixed);
  console.log('topicSlug:', obj.topicSlug);
  console.log('title:', obj.title);
  console.log('keys:', Object.keys(obj).slice(0, 5));
} catch (e) {
  console.log('Parse FAIL:', e.message.slice(0, 80));
}
