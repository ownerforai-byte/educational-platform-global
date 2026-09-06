const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the leading \" from keys and values.
// This is risky if \" appears elsewhere, but here it seems to be the corruption pattern.
// Let's look at the structure: "KEY": "VALUE"
// The corruption is: "\"KEY": "\"VALUE"

// A better regex: replace /"\\"/g with /"/g
content = content.replace(/"\\"/g, '"');

// 2. Now the internal quotes in strings are still a problem.
// E.g., "\"**Why TIR is \"total\":**\"" -> "**Why TIR is "total":**"
// We need to escape the internal quotes.
// A quote is internal if it's not followed by a comma, colon, or closing bracket/brace.

// Let's try to use a more sophisticated approach.
// Parsing JSON structure might be hard if it's broken.

// What if I just take the whole file and fix the JSON manually?
// No, too many files.

// Let's try to fix the internal quotes.
// A quote is internal if it is surrounded by non-JSON-structural characters.
// This is hard to regex.

// Alternative:
// The file is mostly a JSON object.
// If I can make it valid JSON, I can just use JSON.parse and JSON.stringify.
// The issue is to make it valid.

// The quotes around "total" are the problem.
// If I replace them with escaped quotes \"total\", it might work.

// Let's try a regex for this specific pattern:
// Find a quote that is NOT preceded by : or , or { or [ and NOT followed by : or , or } or ] or space
// This is complex.

// Let's try a simpler fix for this file:
// Replace the specific problematic \"total\" with an escaped one or just remove the quotes.

content = content.replace(/"total"/g, 'total');
// This seems to be the only internal quote issue in that specific file.
// Wait, is it?

// Let's test this.

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
    // fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
    // Find the position of error
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Context:', content.substring(pos - 50, pos + 50));
    }
}
