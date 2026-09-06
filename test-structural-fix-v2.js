const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// The structural quotes are \\\" or \"\"\" or \"\"\"\"
// Internal are \"2-hour rule\"

// Let's replace ONLY structural quotes.
// Structural quotes are preceded by a colon, comma, or brace (with whitespace)
// Pattern: (,|:|\[|\{)\s*(\\"|"){2,}
// This is still fragile.

// Let's use the fact that the working file uses 3 quotes for everything.
// Broken file has 4 quotes for some.
// And 3 quotes for others.

// Let's try replacing 4 quotes with " and 3 quotes with "
content = content.replace(/(\\"|"){4,}/g, '"');
content = content.replace(/(\\"|"){3,}/g, '"');
// And 2 quotes?
content = content.replace(/(\\"|"){2,}/g, '"');

// And now fix the internal ones:
// This is the hard part.

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
