const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Replace all \" with "
content = content.replace(/\\"/g, '"');

// Now, repair internal quotes
let repaired = '';
let inString = false;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    console.log(`[${i}]: ${JSON.stringify(char)} inString=${inString}`);

    if (char === '"') {
        if (!inString) {
            inString = true;
            repaired += char;
            console.log(`  -> Start string`);
        } else {
            // It's a quote. Check if it's a terminator
            let j = i + 1;
            while (j < content.length && (content[j] === ' ' || content[j] === '\r' || content[j] === '\n')) j++;
            const nextChar = content[j];
            console.log(`  -> Found quote. Next non-space: ${JSON.stringify(nextChar)}`);

            if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || j >= content.length) {
                // Terminator
                inString = false;
                repaired += char;
                console.log(`  -> End string`);
            } else {
                // Internal quote, needs to be escaped
                console.log(`  -> Internal quote, escaping`);
                repaired += '\\"';
            }
        }
    } else {
        repaired += char;
    }
}

console.log('\nFinal repaired string:');
console.log(repaired);
