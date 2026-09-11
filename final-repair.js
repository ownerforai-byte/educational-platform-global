const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace literal \r and \n
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Step 2: Replace \" with "
content = content.replace(/\\"/g, '"');

// Step 3: Use jsonrepair to fix any remaining issues
try {
    const parsed = jsonrepair(content);
    console.log('Repair successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File updated successfully.');
} catch (e) {
    console.log('Repair failed:', e.message);
}
