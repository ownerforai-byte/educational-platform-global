const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');
// Step 2: Replace ""+ with "
content = content.replace(/""+/g, '"');

console.log('After cleanup, first 200 chars:');
console.log(JSON.stringify(content.substring(0, 200)));

// Find position 84 and check context
console.log('\nAt position 84:');
console.log(JSON.stringify(content.substring(70, 100)));

// Check byte values at position 84
console.log('\nByte values around position 84:');
for (let i = 75; i < 95 && i < content.length; i++) {
    console.log(`  [${i}]: ${content.charCodeAt(i)} = ${JSON.stringify(content[i])}`);
}

// Now try to parse
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    
    // Let's also check what's in the file by looking at more context
    console.log('\nFull content around error (chars 70-100):');
    for (let i = 70; i < 100 && i < content.length; i++) {
        console.log(`[${i}]: ${JSON.stringify(content[i])}`);
    }
}
