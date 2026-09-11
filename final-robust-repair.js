const fs = require('fs');
const { globSync } = require('glob');

const allFiles = globSync('content/ravikishan/**/*.json', { absolute: true });
const failedFiles = [];

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // Robust repair steps
    // 1. Remove systemic leading quotes in keys/values
    content = content.replace(/""+/g, '"');
    
    // 2. Specific fix for TIR (and maybe others)
    content = content.replace(/"total"/g, 'total');

    // 3. Fix unescaped control chars if any (basic approach)
    content = content.replace(/\r\n/g, '\\r\\n');
    content = content.replace(/\n/g, '\\n');
    content = content.replace(/\r/g, '\\r');

    try {
        const parsed = JSON.parse(content);
        fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
        console.log(`Fixed: ${file.split('\\').pop()}`);
    } catch (e) {
        failedFiles.push(file);
        console.log(`Failed: ${file.split('\\').pop()}`);
    }
}

console.log(`\nRemaining failed files (${failedFiles.length}):`);
failedFiles.forEach(f => console.log(f));
