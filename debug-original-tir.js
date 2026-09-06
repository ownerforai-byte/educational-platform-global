const fs = require('fs');

// Show raw bytes around the error in the ORIGINAL file
const path = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(path, 'utf8');

console.log('=== Original file byte analysis ===');
console.log('File length:', content.length);

// Find position 1538
const pos = 1538;
console.log('\nOriginal content around position', pos, ':');
console.log('Chars:', JSON.stringify(content.substring(Math.max(0, pos-20), pos+20)));

// Show raw bytes
console.log('\nRaw bytes around error:');
for (let i = Math.max(0, pos-20); i < Math.min(content.length, pos+20); i++) {
  const c = content.charCodeAt(i);
  const chr = c < 32 ? `\\x${c.toString(16)}` : content[i];
  console.log(`  ${i}: '${chr}' (${c})`);
}

// Also show the full content around that area
console.log('\n=== Full content from pos 1500 to 1560 ===');
for (let i = 1500; i < 1560; i++) {
  const c = content.charCodeAt(i);
  const chr = c < 32 ? `\\x${c.toString(16)}` : content[i];
  console.log(`${i}: '${chr}'`);
}
