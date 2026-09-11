const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(file, 'utf8');

console.log('File length:', content.length);
console.log('First 300 chars:', content.substring(0, 300));

// Check byte by byte at the start
console.log('\nByte values at start:');
for (let i = 0; i < 30; i++) {
    console.log(`  [${i}]: ${content.charCodeAt(i)} (${JSON.stringify(content[i])})`);
}

// Check for BOM
if (content.charCodeAt(0) === 0xFEFF) {
    console.log('\nFile has BOM');
}

// Try replacing \" with " and see what happens
let step1 = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ":');
console.log('First 300 chars:', step1.substring(0, 300));

// Check byte by byte after replacement
console.log('\nByte values after replacement:');
for (let i = 0; i < 30; i++) {
    console.log(`  [${i}]: ${step1.charCodeAt(i)} (${JSON.stringify(step1[i])})`);
}
