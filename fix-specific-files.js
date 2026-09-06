const fs = require('fs');
const path = require('path');

const files = [
    'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
    'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json',
    'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json'
];

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Step 1: Replace \" with "
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Escape internal quotes inside strings
    // This is the tricky part. Let's write a simple parser.
    let result = '';
    let inString = false;
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        if (char === '"') {
            if (!inString) {
                inString = true;
                result += char;
            } else {
                // Check what comes after this quote
                let j = i + 1;
                while (j < content.length && content[j] === ' ') j++;
                const nextChar = content[j];
                
                // If it's a terminator, this is the end of the string
                if (nextChar === ':' || nextChar === ',' || nextChar === '}' || nextChar === ']' || nextChar === '\n' || nextChar === '\r') {
                    result += char;
                    inString = false;
                } else {
                    // It's an internal quote - escape it
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
    
    return result;
}

for (const file of files) {
    try {
        let fixed = fixFile(file);
        console.log(`Fixed content for ${file}:`);
        console.log(fixed.substring(0, 200));
        console.log('---');
        // Now parse it
        const parsed = JSON.parse(fixed);
        console.log('Parsed successfully!');
        // Write it back with proper formatting
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.log(`Failed to fix: ${file}`);
        console.log(e.message);
        // Debug: show the first few characters
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/\\"/g, '"');
        content = content.replace(/""+/g, '"');
        console.log('Content after basic repair:', content.substring(0, 200));
        console.log('Byte values:', Array.from(content.substring(0, 200)).map(c => c.charCodeAt(0)));
    }
}
