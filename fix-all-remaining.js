const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json', { absolute: true });

function fixContent(content) {
    // Step 1: Replace \" with "
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Escape internal quotes inside strings
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
        let content = fs.readFileSync(file, 'utf8');
        let fixed = fixContent(content);
        
        // Parse and re-stringify to fix formatting
        const parsed = JSON.parse(fixed);
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.log(`Failed to fix: ${file}`);
        console.log(e.message);
    }
}
