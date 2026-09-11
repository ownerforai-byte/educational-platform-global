const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
const buffer = fs.readFileSync(file);

// Check the raw bytes around position 105 (where \r\n should be)
console.log('Bytes around position 105:');
for (let i = 100; i < 120 && i < buffer.length; i++) {
    console.log(`[${i}]: ${buffer[i]} = ${String.fromCharCode(buffer[i])}`);
}

// Also check at the end of first line
console.log('\nBytes around position 110-120:');
for (let i = 108; i < 120 && i < buffer.length; i++) {
    console.log(`[${i}]: ${buffer[i]} = ${String.fromCharCode(buffer[i])}`);
}
