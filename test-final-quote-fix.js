// Let's understand the exact pattern
// In the file, we have: backslash-backslash-quote-quote (4 chars)
const test = '\\\\\\"title\\\\\\"';
console.log('Test string:', JSON.stringify(test));
console.log('Test string length:', test.length);
console.log('Characters:');
for (let i = 0; i < test.length; i++) {
    console.log(`  [${i}]: ${test.charCodeAt(i)} = ${JSON.stringify(test[i])}`);
}

// What we want to match: backslash-backslash-quote-quote (4 chars)
// In regex: /\\\\"/g
const result = test.replace(/\\\\"/g, '"');
console.log('\nAfter replacement:', JSON.stringify(result));

// Also test with the actual content
const fs = require('fs');
const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace literal \r and \n with control characters
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Step 2: Fix the corrupted quote patterns
content = content.replace(/\\\\"/g, '"');  // \"\" -> "

console.log('\nAfter fixing quotes:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 3: Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated successfully.');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
