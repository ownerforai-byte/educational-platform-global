const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
const buffer = fs.readFileSync(file);

console.log('Raw bytes at start:');
for (let i = 0; i < 30 && i < buffer.length; i++) {
    console.log(`  [${i}]: ${buffer[i]} = ${String.fromCharCode(buffer[i])}`);
}

// Check what pattern we have
const content = buffer.toString('utf8');
console.log('\nContent as string:', JSON.stringify(content.substring(0, 30)));

// Check if we have \" or \\"
const backslashQuoteIndex = content.indexOf('\\"');
const doubleBackslashQuoteIndex = content.indexOf('\\"');
console.log(`\nIndex of \\" (backslash-quote): ${backslashQuoteIndex}`);
console.log(`Index of \\" (backslash-backslash-quote): ${doubleBackslashQuoteIndex}`);
