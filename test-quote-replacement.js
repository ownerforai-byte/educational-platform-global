const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original:');
console.log(content.substring(0, 100));

// Try replacing \" with "
content = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ":');
console.log(content.substring(0, 100));

// Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
