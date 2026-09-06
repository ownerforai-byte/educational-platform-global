const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original first 150 chars:');
console.log(JSON.stringify(content.substring(0, 150)));

// Fix quotes: ""+ -> "
content = content.replace(/""+/g, '"');

// Replace literal \r with \\r (JSON escape)
content = content.replace(/\\r/g, '\\\\r');

// Replace literal \n with \\n (JSON escape)
content = content.replace(/\\n/g, '\\\\n');

// Replace remaining \" with "
content = content.replace(/\\"/g, '"');

console.log('\nAfter cleanup, first 150 chars:');
console.log(JSON.stringify(content.substring(0, 150)));

// Now try to parse
try {
    const parsed = JSON.parse(content);
    console.log('\nParsing successful!');
    // fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
}
