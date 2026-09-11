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
while (content.endsWith('"') || content.endsWith('\"')) {
    if (content.endsWith('"')) {
        content = content.substring(0, content.length - 1);
    } else {
        break;
    }
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

// Check if it ends with ]
console.log('Last 10 chars:', JSON.stringify(content.substring(content.length - 10)));

// Try to parse
try {
    const parsed = jsonrepair(content);
    console.log('\nSuccess!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated successfully.');
} catch (e) {
    console.log('\nError:', e.message);
}
