const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Step 0 - Original (first 150 chars):');
console.log(JSON.stringify(content.substring(0, 150)));

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');
console.log('\nStep 1 - After \\" -> ":');
console.log(JSON.stringify(content.substring(0, 150)));

// Step 2: Replace ""+ with "
content = content.replace(/""+/g, '"');
console.log('\nStep 2 - After ""+ -> ":');
console.log(JSON.stringify(content.substring(0, 150)));

// Step 3: Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
