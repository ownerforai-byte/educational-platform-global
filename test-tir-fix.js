const fs = require('fs');

// Test on the TIR file
const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);
console.log('First 200:', content.substring(0, 200));

// Step 1: Replace \" with "
let fixed = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ", length:', fixed.length);
console.log('First 200:', fixed.substring(0, 200));

// Step 2: Fix multiple consecutive quotes
fixed = fixed.replace(/""+/g, '"');
console.log('\nAfter fixing multiple quotes, length:', fixed.length);
console.log('First 200:', fixed.substring(0, 200));

// Try to parse
try {
    JSON.parse(fixed);
    console.log('\nFixed content is VALID!');
} catch (e) {
    console.log('\nFixed content is INVALID:', e.message);
    // Find the error location
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', fixed.substring(pos - 30, pos + 30));
    }
}
