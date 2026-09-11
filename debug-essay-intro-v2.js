const fs = require('fs');

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

// Show last 100 chars
console.log('\nLast 100 chars:');
console.log(JSON.stringify(content.substring(content.length - 100)));
