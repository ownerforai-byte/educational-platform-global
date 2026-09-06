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

try {
    const parsed = JSON.parse(repaired);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
    const m = /position (\d+)/.exec(e.message);
    if (m) {
        const pos = parseInt(m[1]);
        console.log('Context:', repaired.substring(pos - 50, pos + 50));
        console.log('Byte values at error:');
        for (let i = pos; i < pos + 20; i++) {
            console.log(`  [${i}]: ${repaired.charCodeAt(i)} (${JSON.stringify(repaired[i])})`);
        }
    }
}
