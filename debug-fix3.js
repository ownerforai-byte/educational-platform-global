const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');

// Find line 22 to see context
const lines = c.split('\r\n');
console.log('Line count:', lines.length);
console.log('Line 22 length:', lines[21]?.length);
console.log('Line 22 col 255 char:', JSON.stringify(lines[21][254]));
console.log('Line 22 context:', JSON.stringify(lines[21].substring(240, 270)));

// Now find the exact position in the full string
let pos = 0;
for (let l = 0; l < 21; l++) pos += lines[l].length + 2; // +2 for \r\n
console.log('Start of line 22 at pos:', pos);
console.log('Error at pos 4675, line 22 offset:', 4675 - pos);
console.log('Char at 4675:', JSON.stringify(c[4675]));
console.log('Char before:', JSON.stringify(c[4674]));

// Trace string state from start of file up to position 4675
let inString = false;
let esc = false;
for (let i = 0; i < 4675; i++) {
  if (esc) { esc = false; continue; }
  if (c[i] === '\\') { esc = true; continue; }
  if (c[i] === '"') { inString = !inString; console.log('Quote at', i, 'now inString=' + inString); }
}
console.log('Final inString at 4675:', inString);

// Find the problematic area - show chars from line 22 start
console.log('\nLine 22 chars 0-300:');
for (let i = 0; i < Math.min(300, lines[21].length); i++) {
  const ch = lines[21][i];
  if (ch === '"' || ch === '\\') {
    console.log(`  [${i}] ${JSON.stringify(ch)} (${ch.charCodeAt(0).toString(16)})`);
  }
}
