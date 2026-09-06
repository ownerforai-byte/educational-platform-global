const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original first 200 chars:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 1: Remove backslashes BEFORE newlines and then replace them
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

console.log('\nAfter replacing literal \\r and \\n:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 2: Remove ALL remaining backslashes
content = content.replace(/\\/g, '');

console.log('\nAfter removing all backslashes:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 3: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');

console.log('\nAfter fixing multiple quotes:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 4: Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated.');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
