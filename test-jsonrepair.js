const fs = require('fs');
const { parse } = require('jsonrepair');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');
content = content.replace(/\\"/g, '"');

try {
    const parsed = parse(content);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated successfully.');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
