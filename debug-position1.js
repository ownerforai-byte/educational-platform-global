const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);
console.log('First 50 chars:', JSON.stringify(content.substring(0, 50)));
console.log('Byte values:', Array.from(content.substring(0, 50)).map(c => c.charCodeAt(0)));

// Check what's at position 1
console.log('\nChar at position 1:', JSON.stringify(content[1]));
console.log('Char code at position 1:', content.charCodeAt(1));

// Try replacing \" with "
let fixed = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ", length:', fixed.length);
console.log('First 50 chars:', JSON.stringify(fixed.substring(0, 50)));
console.log('Byte values:', Array.from(fixed.substring(0, 50)).map(c => c.charCodeAt(0)));

// Check what's at position 1 now
console.log('\nChar at position 1 after replace:', JSON.stringify(fixed[1]));
console.log('Char code at position 1 after replace:', fixed.charCodeAt(1));
