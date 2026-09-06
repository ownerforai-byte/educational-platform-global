const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);
console.log('Original first 150:', JSON.stringify(content.substring(0, 150)));

// Step 1: Remove all backslashes that precede quotes
content = content.replace(/\\/g, ''); // Remove ALL backslashes!

console.log('\nAfter removing all backslashes:');
console.log(JSON.stringify(content.substring(0, 150)));

// Step 2: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');

console.log('\nAfter fixing multiple quotes:');
console.log(JSON.stringify(content.substring(0, 150)));

// Step 3: Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
