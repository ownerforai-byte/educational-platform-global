const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(file, 'utf8');

console.log('File length:', content.length);
console.log('First 200 chars:', content.substring(0, 200));

// Check if file already has \" or just "
const backslashQuoteCount = (content.match(/\\"/g) || []).length;
const quoteCount = (content.match(/"/g) || []).length;

console.log('\nBackslash-quote count:', backslashQuoteCount);
console.log('Quote count:', quoteCount);

// Try to parse as-is
try {
    JSON.parse(content);
    console.log('\nFile is VALID JSON');
} catch (e) {
    console.log('\nFile is INVALID:', e.message);
}

// Now try replacing \" with "
let fixed = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ", length:', fixed.length);

// Try to parse
try {
    JSON.parse(fixed);
    console.log('Fixed file is VALID');
} catch (e) {
    console.log('Fixed file is INVALID:', e.message);
    // Show context around error
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', fixed.substring(pos - 30, pos + 30));
    }
}
