const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');

// Step 2: Fix multiple consecutive quotes (e.g., "" -> ")
content = content.replace(/""+/g, '"');

// Step 3: Now fix internal quotes
// An internal quote is one that's not followed by structural characters (: , } ])
let result = '';
let inString = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === '"') {
        if (!inString) {
            inString = true;
            result += char;
        } else {
            // Check what follows this quote
            let j = i + 1;
            while (j < content.length && (content[j] === ' ' || content[j] === '\r' || content[j] === '\n')) j++;
            const nextChar = content[j];

            if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || j >= content.length) {
                // Terminator - end string
                result += char;
                inString = false;
            } else {
                // Internal quote - must escape it
                result += '\\"';
            }
        }
    } else if (char === '\r') {
        // Only escape carriage return if inside a string
        if (inString) {
            result += '\\r';
        } else {
            result += char;
        }
    } else if (char === '\n') {
        // Only escape newline if inside a string
        if (inString) {
            result += '\\n';
        } else {
            result += char;
        }
    } else {
        result += char;
    }
}

console.log('Result (first 300 chars):', result.substring(0, 300));

// Try parsing
try {
    const parsed = JSON.parse(result);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', result.substring(pos - 30, pos + 30));
    }
}
