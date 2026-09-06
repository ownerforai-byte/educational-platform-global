const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original first 30 chars with codes:');
for (let i = 0; i < 30 && i < content.length; i++) {
    console.log(`  [${i}]: ${content.charCodeAt(i)} = ${JSON.stringify(content[i])}`);
}

// Check what the regex actually matches
const testStr = content.substring(0, 50);
console.log('\nTest string:', JSON.stringify(testStr));

// Try different regex patterns
const patterns = [
    /\\\"/g,   // backslash-quote
    /\\""/g,   // backslash-backslash-quote
    /\\\\"/g,  // backslash-backslash-quote-quote
    /\\"""/g,  // backslash-backslash-quote-quote-quote
];

patterns.forEach((pat, i) => {
    const matches = testStr.match(pat);
    console.log(`Pattern ${i}: ${pat.source} -> ${matches ? matches.length + ' matches' : 'no matches'}`);
});
