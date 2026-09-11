const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
const buffer = fs.readFileSync(file);

// Find the string "title"
const titleBuffer = Buffer.from('title');
const titleIndex = buffer.indexOf(titleBuffer);

console.log('Title found at:', titleIndex);

console.log('Bytes around "title":');
for (let i = titleIndex - 10; i < titleIndex + 20 && i < buffer.length; i++) {
    console.log(`[${i}]: ${buffer[i]} = ${String.fromCharCode(buffer[i])}`);
}
