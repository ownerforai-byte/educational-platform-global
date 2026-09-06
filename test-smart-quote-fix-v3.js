const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original first 200 chars:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 1: Replace literal \r and \n with control characters
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

console.log('\nAfter control char replacement:');
console.log(JSON.stringify(content.substring(0, 200)));

// Step 2: Fix the corrupted quote patterns
// The files have \"\"\"\" (backslash-backslash-quote-quote) around keys
// We need to collapse multiple quote pairs down to single quotes
content = content.replace(/\\""/g, '"');  // \"\" -> " (backslash-backslash-quote-quote becomes just a quote)

console.log('\nAfter quote fixing:');
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
