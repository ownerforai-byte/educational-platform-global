const fs = require('fs');
const { globSync } = require('glob');

// Get list of all JSON files
const allFiles = globSync('content/ravikishan/**/*.json', { absolute: true });

// Find invalid files
const invalidFiles = [];
for (const file of allFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
    } catch (e) {
        invalidFiles.push(file);
    }
}

console.log(`Found ${invalidFiles.length} invalid files.`);

// Fix each invalid file
for (const file of invalidFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Step 1: Replace \" with "
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Fix internal quotes using state machine
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
    
    try {
        const parsed = JSON.parse(result);
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.log(`Failed to fix: ${file}`);
        console.log(e.message);
    }
}
