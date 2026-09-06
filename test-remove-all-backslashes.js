const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original first 30 chars:');
console.log(JSON.stringify(content.substring(0, 30)));

// Step 1: Replace literal \r and \n with control characters
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

console.log('\nAfter control char replacement:');
console.log(JSON.stringify(content.substring(0, 30)));

// Step 2: Remove all backslashes
content = content.replace(/\\/g, '');

console.log('\nAfter removing all backslashes:');
console.log(JSON.stringify(content.substring(0, 30)));

// Step 3: Collapse multiple consecutive quotes
content = content.replace(/""+/g, '"');

console.log('\nAfter collapsing quotes:');
console.log(JSON.stringify(content.substring(0, 30)));

// Step 4: Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated successfully.');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
