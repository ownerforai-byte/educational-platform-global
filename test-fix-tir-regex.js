const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace all \" with "
content = content.replace(/\\"/g, '"');

// Step 2: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');

// Step 3: Manually fix internal quotes that cause JSON parsing errors
// The issue is around "total" - it's an internal quote inside a string
// Pattern: "**Why TIR is "total":**" - the quotes around total should be escaped

// Let's find and fix the specific pattern
// Look for "word" where word is not followed by : or , or } or ]
content = content.replace(/"([^"]+)"([^:,\]\}])/g, (match, word, nextChar) => {
    // Only escape if the quote is likely an internal one
    // This is a heuristic - we'll refine it
    return '"' + word + '\\"' + nextChar;
});

// Try to parse
try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
    // Show context
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', content.substring(pos - 30, pos + 30));
    }
}
