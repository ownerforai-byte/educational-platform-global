const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
const buffer = fs.readFileSync(file);

console.log('Raw bytes (first 200):');
for (let i = 0; i < 200 && i < buffer.length; i++) {
    const byte = buffer[i];
    const char = String.fromCharCode(byte);
    console.log(`[${i}]: ${byte} (${char === '\n' ? 'LF' : char === '\r' ? 'CR' : char === '"' ? 'QUOTE' : char === '\\' ? 'BACKSLASH' : JSON.stringify(char)})`);
}
