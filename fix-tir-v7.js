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

// Write result to a temp file and try to parse it
const tempFile = 'temp-result.json';
fs.writeFileSync(tempFile, result);

try {
    const parsed = JSON.parse(result);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
    console.log('File written successfully.');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    
    // Try reading from temp file
    try {
        const tempContent = fs.readFileSync(tempFile, 'utf8');
        const parsed = JSON.parse(tempContent);
        console.log('Parsing from temp file successful!');
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
        console.log('File written successfully.');
    } catch (e2) {
        console.log('Parsing from temp file also failed:', e2.message);
    }
}
