const fs = require('fs');

// Let's try a different approach: state-machine based repair
const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace literal \r and \n
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Step 2: Use state machine to find and fix quotes
// State: 'outside' or 'inside'
let result = '';
let inString = false;
let i = 0;
while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') {
        // Check what's next
        const next = content[i + 1];
        if (next === '"') {
            // This is an escaped quote. 
            // If we're in a string, keep it escaped.
            // If we're outside, this might be structural corruption.
            if (inString) {
                result += ch; // Keep the backslash
            } else {
                // Structural quote - skip the backslash
                i++;
                continue;
            }
        } else {
            result += ch;
        }
    } else if (ch === '"') {
        inString = !inString;
        result += ch;
    } else {
        result += ch;
    }
    i++;
}

try {
    const parsed = JSON.parse(result);
    console.log('Parsing successful!');
    console.log('Title:', parsed.title);
} catch (e) {
    console.log('Parsing failed:', e.message);
    console.log('Context:', JSON.stringify(result.substring(0, 200)));
}
