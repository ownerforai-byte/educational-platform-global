const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);
console.log('Original first 200:', content.substring(0, 200));

// Step 1: Replace \" with "
content = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \\" with ", length:', content.length);
console.log('First 200:', content.substring(0, 200));

// Step 2: Fix multiple consecutive quotes
content = content.replace(/""+/g, '"');
console.log('\nAfter fixing multiple quotes, length:', content.length);
console.log('First 200:', content.substring(0, 200));

// Step 3: Run state machine to escape internal quotes
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
            while (j < content.length && content[j] === ' ') j++;
            const nextChar = content[j];
            
            if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || nextChar === '\n' || nextChar === '\r' || j >= content.length) {
                // String terminator
                result += char;
                inString = false;
            } else {
                // Internal quote - escape it
                result += '\\"';
            }
        }
    } else if (char === '\r') {
        // Escape carriage return
        result += '\\r';
    } else {
        result += char;
    }
}

console.log('\nAfter state machine, length:', result.length);
console.log('First 200:', result.substring(0, 200));

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
    }
}
