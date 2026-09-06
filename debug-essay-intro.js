const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\writing\\essay-writing\\notes\\introduction.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);

// Remove BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.substring(1);
}

// Remove leading quote if present
if (content.startsWith('"')) {
    content = content.substring(1);
}

// Remove trailing quote if present
if (content.endsWith('"')) {
    content = content.substring(0, content.length - 1);
}

console.log('After cleanup length:', content.length);

// Multiple repair passes
for (let pass = 0; pass < 5; pass++) {
    content = content.replace(/\\r/g, '\r');
    content = content.replace(/\\n/g, '\n');
    content = content.replace(/\\"/g, '"');
    content = content.replace(/""+/g, '"');
}

console.log('After fix length:', content.length);

// Find what's at position 12994
console.log('\nChar at 12994:', JSON.stringify(content[12994]), '(code:', content.charCodeAt(12994) + ')');

// Show context around that position
console.log('\nContext around 12994:');
console.log(JSON.stringify(content.substring(12985, 13010)));

// Try to parse
try {
    const parsed = jsonrepair(content);
    console.log('\nSuccess!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nError:', e.message);
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        console.log('Context at error:', JSON.stringify(content.substring(pos - 30, pos + 30)));
    }
}
