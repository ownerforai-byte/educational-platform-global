const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');
const lines = c.split('\r\n');

// Show ALL chars on line 22 with indices
const line22 = lines[21];
console.log('Line 22 full text:');
console.log(line22);
console.log('\nAll quote and backslash positions:');
for (let i = 0; i < line22.length; i++) {
  if (line22[i] === '"' || line22[i] === '\\') {
    console.log(`  offset ${i}: ${JSON.stringify(line22[i])} (charCode ${line22[i].charCodeAt(0)})`);
  }
}

// Show hex dump of line 22
console.log('\nHex dump of line 22 (first 400 chars):');
const hex = Buffer.from(line22.substring(0, 400)).toString('hex');
console.log(hex);

// Check around offset 250-280
console.log('\nRaw around offset 250-280:');
for (let i = 250; i < Math.min(280, line22.length); i++) {
  const ch = line22[i];
  const code = ch.charCodeAt(0);
  console.log(`  [${i}] char=${JSON.stringify(ch)} code=0x${code.toString(16).padStart(2,'0')} (${code})`);
}
