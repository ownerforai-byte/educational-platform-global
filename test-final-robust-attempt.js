const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace literal "\r" (backslash + r) and "\n" (backslash + n)
// The file has raw backslash+r (ASCII 92, 114), etc.
// Regex needs to match a literal backslash followed by 'r' or 'n'
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Step 2: Now we have a string that still has backslashes before quotes.
// The pattern is \" -> "
// We want to remove the backslash only if it is before a quote.
content = content.replace(/\\"/g, '"');

// Step 3: Now fix the multiple consecutive quotes ""+ -> "
content = content.replace(/""+/g, '"');

// Step 4: Fix the specific issue found earlier:
// "food safety: the \"2-hour rule\" for perishable foods"
// After removing backslashes, this became:
// "food safety: the "2-hour rule" for perishable foods"
// Which is broken JSON. We need the inner quotes to remain escaped!
// Wait, if I replace \" with " globally, I destroy inner escaped quotes.
// I need to ONLY replace the structural backslashes, not the ones inside strings.

// Actually, the easiest way might be to just do a structural repair
// and then fix the broken internal quotes.

console.log('Parsing result:');
try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
    // Find the error position in the content
    const pos = parseInt(e.message.match(/position (\d+)/)[1]);
    console.log('Context:', JSON.stringify(content.substring(pos - 50, pos + 50)));
}
