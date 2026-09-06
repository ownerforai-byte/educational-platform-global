const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace literal \r and \n with control characters
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Step 2: Remove ALL remaining backslashes
content = content.replace(/\\/g, '');

// Step 3: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');

console.log('Content around position 7917:');
console.log(JSON.stringify(content.substring(7900, 7950)));
console.log('\nFull content around that area (with line numbers):');
const lines = content.substring(7000, 8500).split('\n');
lines.forEach((line, i) => console.log(`Line ${i}: ${line}`));
