const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// The file seems to have been mangled by some process that escaped everything.
// Let's try to just use a regex that matches the structural pattern: \"\"\"\"
// And replace it with a single "

// The structural pattern is \"\"\"\"title\"\"\"\"
// Internal pattern is \"2-hour rule\"

content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// This regex matches any sequence of 4 or more \"
content = content.replace(/(\\"|"){4,}/g, '"');

// Now we still have 2 or 3 \" in some places.
content = content.replace(/(\\"|"){2,}/g, '"');

// And finally replace remaining \"
content = content.replace(/\\"/g, '"');

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
