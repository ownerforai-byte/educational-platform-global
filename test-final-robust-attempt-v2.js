const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Replace \r, \n with control chars
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// THE PROBLEM: The backslashes before the quotes are not all bad.
// Structural backslashes look like \\\"\\\"\\\"\\\"title\\\"\\\"\\\"
// Internal backslashes look like \"2-hour rule\"

// Let's first replace all \\\" with "
// Pattern: backslash then quote. 
// If it's a structural quote, it is preceded by another backslash, or it's at the start.
// This is hard to do with simple regex.

// Alternative:
// 1. Replace all \\" with "
content = content.replace(/\\"/g, '"');
// 2. Collapse all ""+ to "
content = content.replace(/""+/g, '"');

// Now, the inner quote \"2-hour rule\" became "2-hour rule".
// Which is broken. 
// Can I fix this by finding "2-hour rule" and putting the backslash back?
// Or better: don't replace \" if it's NOT followed by another quote?
// No, the structural ones are also just \" followed by \" ...

// Let's look at the context again:
// ... food safety: the \"2-hour rule\" ...
// After my current fix, it is:
// ... food safety: the "2-hour rule" ...

// Wait! "food safety: the "2-hour rule" ..." IS valid JSON IF the outer quotes are correctly handled.
// The issue might be that the inner quotes are NOT escaped for JSON.
// If the whole string is "Newton's law...", then a " inside it MUST be escaped.

// Let's try replacing structural \"\"\"\" with " and keep internal \" as \"
// Structural: \"\"\"\"title\"\"\"\"
// Internal: \"2-hour rule\"

content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Replace structural quotes: 4 or more backslash-quotes in a row -> "
content = content.replace(/(\\"|"){4,}/g, '"');
// Then replace remaining structural \" -> "
content = content.replace(/\\"/g, '"');

// Now handle internal quotes
// This is still tricky.

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
