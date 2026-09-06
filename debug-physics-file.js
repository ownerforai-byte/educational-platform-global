const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original:');
console.log(JSON.stringify(content.substring(0, 300)));

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ":');
console.log(JSON.stringify(content.substring(0, 300)));

// Step 2: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');
console.log('\nAfter fixing multiple quotes:');
console.log(JSON.stringify(content.substring(0, 300)));

// Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    
    // Find error position
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', JSON.stringify(content.substring(pos - 30, pos + 30)));
        
        // Check byte values
        console.log('\nByte values at error:');
        for (let i = pos; i < pos + 20 && i < content.length; i++) {
            console.log(`  [${i}]: ${content.charCodeAt(i)} (${JSON.stringify(content[i])})`);
        }
    }
}
