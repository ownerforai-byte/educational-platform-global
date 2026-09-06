const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// The issue is that \\r and \\n are literal backslash sequences, not control characters
// Let's replace them with actual control characters
content = content.replace(/\\\\r/g, '\r');  // Replace \\r with actual CR
content = content.replace(/\\\\n/g, '\n');  // Replace \\n with actual LF

console.log('After converting escaped sequences:');
console.log(JSON.stringify(content.substring(0, 200)));

// Now do the quote fixes
content = content.replace(/\\"/g, '"');
content = content.replace(/""+/g, '"');

console.log('\nAfter quote fixes:');
console.log(JSON.stringify(content.substring(0, 200)));

try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
