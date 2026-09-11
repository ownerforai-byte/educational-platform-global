const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json', { absolute: true });

// Find the broken files
const brokenFiles = [];
for (const file of files) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
    } catch (e) {
        brokenFiles.push(file);
    }
}

console.log(`Found ${brokenFiles.length} broken files.`);

function fixContent(content) {
    // Step 1: Replace \" with "
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Fix internal quotes and control characters
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
        } else if (char === '\n') {
            // Skip actual newlines inside strings (they should be \n)
            // But wait, we already escaped \r, so \n might still be there
            // Let's just leave \n as is for now
            result += char;
        } else {
            result += char;
        }
    }
    
    return result;
}

for (const file of brokenFiles) {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let fixed = fixContent(content);
        
        // Try to parse
        const parsed = JSON.parse(fixed);
        
        // Write back with proper formatting
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.log(`Failed to fix: ${file}`);
        console.log(e.message);
    }
}
