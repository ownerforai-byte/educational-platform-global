const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// 1. Repair: Remove ALL leading backslashes that were added to quotes in keys and values
// The current content is like:
//   "\"title": "\"Total Internal Reflection"
// I need to change this to:
//   "title": "Total Internal Reflection"
// Note that the existing regex `content = content.replace(/\\"/g, '"');` might be turning these into `""title": ""Total...`

// Let's first restore to a known state by reading the raw content again,
// but since I can't easily undo, I will work with the current state:
// The current state is "title": "Total... (Wait, no, look at the error)
// The output of test-fix-tir-regex.js says: "title": \"Total In"... is not valid JSON
// This means the quotes are still escaped as \"

// Let's try a different regex approach:
// Remove all backslashes that are followed by a quote.
content = content.replace(/\\"/g, '"');
// Now we have ""title": "Total Internal Reflection" (two quotes at start)

// Then, replace "" with "
content = content.replace(/""/g, '"');
// Now we have "title": "Total Internal Reflection" (this should be valid for keys/values)

// Now, handle the internal quotes like "total" in: "**Why TIR is "total":**"
// We need to find the specific "total" and escape it: \"total\"

content = content.replace(/"total"/g, '\\"total\\"');

// Try parsing
try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
