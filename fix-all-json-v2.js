const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

// Find all JSON files
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
    
    // Step 1: Replace \" with " (this handles both key and value escapes)
    content = content.replace(/\\"/g, '"');
    
    // Step 2: Fix multiple consecutive quotes
    content = content.replace(/""+/g, '"');
    
    // Step 3: Try to parse
    try {
        const parsed = JSON.parse(content);
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
        console.log(`Fixed: ${path.basename(file)}`);
    } catch (e) {
        console.log(`Failed: ${path.basename(file)}`);
        console.log(e.message);
        
        // Debug: find the problematic quote
        const m = /position (\d+)/.exec(e.message);
        if (m) {
            const pos = parseInt(m[1]);
            console.log(`Error at position ${pos}`);
            console.log(`Context: ${JSON.stringify(content.substring(pos - 30, pos + 30))}`);
        }
    }
}
