const fs = require('fs');
const { globSync } = require('glob');

function isValidJSON(content) {
    try {
        JSON.parse(content);
        return true;
    } catch (e) {
        return false;
    }
}

const files = globSync('content/ravikishan/**/*.json', { absolute: true });
console.log(`Found ${files.length} files to check.`);

let invalidCount = 0;
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (!isValidJSON(content)) {
        console.log(`Invalid: ${file}`);
        invalidCount++;
    }
}

console.log(`\nTotal invalid files: ${invalidCount}`);
