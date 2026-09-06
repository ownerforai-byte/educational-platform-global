const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
const buffer = fs.readFileSync(file);
const content = buffer.toString('utf8');

console.log('=== RAW ANALYSIS ===');
console.log('First 100 chars (raw):');
for (let i = 0; i < 100; i++) {
    console.log(`[${i}]: ${content.charCodeAt(i)} = ${JSON.stringify(content[i])}`);
}

// The key insight: the file contains literal backslash characters (92) followed by quote characters (34)
// When we do .replace(/\\"/g, '"'), we're replacing \" (backslash-quote) with " (just quote)
// But the regex /\\"/ matches a literal backslash followed by a quote

// Let's check what the regex actually matches
const test = '\\"';
console.log('\nTest string:', JSON.stringify(test), 'length:', test.length);
console.log('Test char codes:', Array.from(test).map(c => c.charCodeAt(0)));

const replaced = content.replace(/\\"/g, '"');
console.log('\nAfter replace, first 50 chars:');
console.log(JSON.stringify(replaced.substring(0, 50)));

// Check if the replacement worked
let changed = false;
for (let i = 0; i < 50; i++) {
    if (content[i] !== replaced[i]) {
        changed = true;
        console.log(`Changed at position ${i}: ${JSON.stringify(content[i])} -> ${JSON.stringify(replaced[i])}`);
    }
}
if (!changed) console.log('No changes made!');
