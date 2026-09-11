const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Replace all \" with "
content = content.replace(/\\"/g, '"');

// Replace all multiple quotes with single quotes
content = content.replace(/""+/g, '"');

console.log('After replacements:');
console.log(content.substring(0, 200));

try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
