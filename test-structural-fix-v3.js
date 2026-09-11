const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Let's think about this differently.
// The file has \" everywhere.
// Structural quotes: \"\"\"\"title\"\"\"\"
// Internal quotes: \"2-hour rule\"

// What if I just replace \" with " everywhere, 
// then re-parse with JSON.parse, and if it fails,
// try a different approach?

// Actually, let me look at the ACTUAL raw bytes again.
// The file shows \" (backslash + quote).
// What if I replace ALL backslash + quote with just quote?
content = content.replace(/\\"/g, '"');

// Now we have lots of consecutive quotes.
// Structural: ""title"" (should be "title")
// Internal: "2-hour rule" (should be \"2-hour rule\")

// The problem is we can't tell them apart with regex.

// Alternative approach:
// Replace \"\"\"\" with " (structural)
// Replace \"\"\" with " (structural)
// Replace \"\" with " (structural)
// And leave \" alone? No, that leaves internal quotes broken.

// Actually, wait.
// What if the whole file is just malformed JSON?
// What if I just try to fix it by:
// 1. Removing ALL backslashes
// 2. Collapsing all quote sequences
// 3. Then using a JSON repair library?

// Or... what if I manually fix the known issues?
// The error is at position 8289. Let's look at that.
console.log('Content around 8289:');
console.log(JSON.stringify(content.substring(8270, 8320)));

// After replacing \" with ", this area would be:
// food safety: the "2-hour rule" for perishable foods
// Which is valid IF the whole string is quoted correctly.
// The issue might be elsewhere.

// Let's just try to parse and see what happens.
try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
    // Get context
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        console.log('Context:', JSON.stringify(content.substring(pos - 50, pos + 50)));
    }
}
