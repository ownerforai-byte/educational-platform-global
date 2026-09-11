const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\heat-and-temperature\\concepts\\temperature-scales.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);

// Apply fixes
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.substring(1);
}
if (content.startsWith('"')) {
    content = content.substring(1);
}

for (let pass = 0; pass < 5; pass++) {
    content = content.replace(/\\r/g, '\r');
    content = content.replace(/\\n/g, '\n');
    content = content.replace(/\\"/g, '"');
    content = content.replace(/""+/g, '"');
}

console.log('Fixed length:', content.length);

// Find what's at position 6479
console.log('Char at 6479:', JSON.stringify(content[6479]), '(code:', content.charCodeAt(6479) + ')');

// Show context around that position
console.log('\nContext around 6479:');
console.log(JSON.stringify(content.substring(6470, 6490)));

// Try to find where the actual problem is
// Let's search for unescaped quotes
let inString = false;
let quoteCount = 0;
for (let i = 0; i < content.length; i++) {
    if (content[i] === '"' && (i === 0 || content[i-1] !== '\\')) {
        quoteCount++;
        if (quoteCount % 2 !== 0) {
            inString = !inString;
        }
    }
}
console.log('\nTotal quotes:', quoteCount, 'In string at end:', inString);

// Let's try to parse and see exact error
try {
    const parsed = jsonrepair(content);
    console.log('Success!');
} catch (e) {
    console.log('\nError:', e.message);
    // Get context
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        console.log('Context at error:', JSON.stringify(content.substring(pos - 30, pos + 30)));
    }
}
