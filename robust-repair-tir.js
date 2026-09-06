const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove systemic leading quotes in keys/values
// Replace "\"KEY" with "KEY"
// Replace "\"VALUE" with "VALUE"

// A robust way to fix the "KEY": "VALUE structure:
// Replace any occurance of "\" at the beginning of a key or value
// This is tricky.
// Let's try replacing `"` followed by `"` with just `"`
content = content.replace(/""/g, '"');

// 2. Specific fix for the internal quote issue in TIR
// Pattern: \"total"
// Fix: \"total\"
content = content.replace(/\\\"total\\"/g, '\\\"total\\\"');

// 3. Ensure no unescaped internal quotes remain
// If we have "something "something else" something", we need to escape the inner quotes
// This is very hard.

// What if I use JSON5 or a less strict parser? No, the user wants standard JSON.

// Let's try to just remove the problematic quotes if they are causing syntax errors
// In "**Why TIR is "total":**", if I remove the quotes around "total", it becomes "**Why TIR is total:**", which is valid JSON.
content = content.replace(/"total"/g, 'total');

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
