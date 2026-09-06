const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Apply fixes
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');
content = content.replace(/\\"/g, '"');
content = content.replace(/""+/g, '"');

console.log('Content around position 8289:');
console.log(JSON.stringify(content.substring(8270, 8320)));
console.log('\nLines around that area:');
const lines = content.split('\n');
for (let i = 40; i < 50 && i < lines.length; i++) {
    console.log(`Line ${i}: ${lines[i]}`);
}
