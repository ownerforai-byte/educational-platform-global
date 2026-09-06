const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json', { absolute: true });

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Step 1: Replace \" with "
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Fix internal quotes by escaping them
    // We need to find quotes that are inside strings and escape them.
    // Let's use a simple approach: find " followed by a word (not a terminator)
    // and escape the quote.
    
    // Actually, let's write a proper parser.
    let result = '';
    let inString = false;
    let i = 0;
    
    while (i < content.length) {
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
        
        i++;
    }
    
    return result;
}

for (const file of files) {
    try {
        let fixed = fixFile(file);
        JSON.parse(fixed);
        fs.writeFileSync(file, JSON.stringify(JSON.parse(fixed), null, 2));
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.log(`Failed to fix: ${file}`);
        console.log(e.message);
    }
}
