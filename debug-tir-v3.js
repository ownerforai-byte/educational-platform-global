const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Step 1: Show the area around the problem
console.log('Original content around the problem:');
console.log(JSON.stringify(content.substring(1450, 1600)));

// Step 2: Replace all \" with "
content = content.replace(/\\"/g, '"');
console.log('\nAfter replacing \" with ":');
console.log(JSON.stringify(content.substring(1450, 1600)));

// Step 3: Run the state machine and capture the repaired string
let repaired = '';
let inString = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const pos = i;

    if (char === '"') {
        if (!inString) {
            inString = true;
            repaired += char;
        } else {
            // It's a quote. Check if it's a terminator
            let j = i + 1;
            while (j < content.length && (content[j] === ' ' || content[j] === '\r' || content[j] === '\n')) j++;
            const nextChar = content[j];

            if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || j >= content.length) {
                // Terminator
                inString = false;
                repaired += char;
            } else {
                // Internal quote, needs to be escaped
                repaired += '\\"';
            }
        }
    } else {
        repaired += char;
    }
}

console.log('\nRepaired content around the problem:');
console.log(JSON.stringify(repaired.substring(1450, 1600)));

// Now, let's manually fix the specific issue around the problem area.
// The issue is that the state machine is producing a string that ends prematurely.
// We need to find where the string should end and ensure it does.

// Let's try to parse the repaired string and see where it fails.
try {
    const parsed = JSON.parse(repaired);
    console.log('\nParsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('\nParsing failed:', e.message);
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Error at position:', pos);
        console.log('Context in repaired string:', repaired.substring(pos - 50, pos + 50));
        
        // Let's try to manually fix the repaired string around the error position.
        // The issue seems to be that the string ends too early.
        // We need to find the correct end of string position.
        
        // Let's look at the area around the error position in the ORIGINAL content.
        console.log('\nOriginal content around the error position:');
        console.log(JSON.stringify(content.substring(pos - 50, pos + 50)));
    }
}
