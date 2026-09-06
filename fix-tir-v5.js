const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');

// Step 2: Fix multiple consecutive quotes (e.g., "" -> ")
content = content.replace(/""+/g, '"');

// Step 3: Run state machine to escape internal quotes and control characters
let result = '';
let inString = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '"') {
        if (!inString) {
            inString = true;
            result += char;
        } else {
            // Look ahead to see if this is a string terminator
            let j = i + 1;
            while (j < content.length && (content[j] === ' ' || content[j] === '\r' || content[j] === '\n')) j++;
            const nextChar = content[j];
            
            if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || j >= content.length) {
                // String terminator
                result += char;
                inString = false;
            } else {
                // Internal quote - escape it
                result += '\\"';
            }
        }
    } else if (char === '\r') {
        // Escape carriage return as JSON escape sequence \r (two chars: \ and r)
        result += '\\r';
    } else if (char === '\n') {
        // Escape newline as JSON escape sequence \n (two chars: \ and n)
        result += '\\n';
    } else {
        result += char;
    }
}

console.log('After state machine, length:', result.length);
console.log('First 100 chars:', JSON.stringify(result.substring(0, 100)));

// Try to parse
try {
    const parsed = JSON.parse(result);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File written successfully.');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context:', result.substring(pos - 50, pos + 50));
        console.log('Byte values at error:');
        for (let i = pos; i < pos + 10; i++) {
            console.log(`  [${i}]: ${result.charCodeAt(i)} (${JSON.stringify(result[i])})`);
        }
    }
}
