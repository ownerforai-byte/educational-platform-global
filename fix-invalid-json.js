const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fixJSON(content) {
    let result = '';
    let i = 0;
    while (i < content.length) {
        const ch = content[i];
        if (ch === '"') {
            let strStart = i; i++;
            let strContent = '';
            let escape = false;
            while (i < content.length) {
                const c = content[i];
                if (escape) { strContent += c; escape = false; }
                else if (c === '\\') { strContent += c; escape = true; }
                else if (c === '"') { i++; break; }
                else { strContent += c; }
                i++;
            }
            // Fix invalid escapes in strContent
            let fixed = '';
            let j = 0;
            while (j < strContent.length) {
                const sc = strContent[j];
                if (sc === '\\' && j + 1 < strContent.length) {
                    const nc = strContent[j + 1];
                    if (['"', '\\', '/', 'b', 'f', 'n', 'r', 't'].includes(nc)) {
                        fixed += sc + nc; j += 2; continue;
                    } else if (nc === 'u' && j + 5 < strContent.length) {
                        const hex = strContent.substring(j + 2, j + 6);
                        if (/^[0-9a-fA-F]{4}$/.test(hex)) { fixed += sc + nc; j += 6; continue; }
                    }
                    fixed += '\\\\' + nc; j += 2;
                } else { fixed += sc; j++; }
            }
            result += '"' + fixed + '"';
        } else { result += ch; i++; }
    }
    return result;
}

function removeTrailingCommas(content) {
    // Remove trailing commas in arrays and objects
    return content.replace(/,\s*([}\]])/g, '$1');
}

function fixControlCharacters(content) {
    // Replace control characters with literal backslash-u sequences
    return content
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, (match) => {
            const hex = match.charCodeAt(0).toString(16).padStart(2, '0');
            return `\\u00${hex}`;
        });
}

function fixJSONContent(content) {
    content = fixJSON(content);
    content = removeTrailingCommas(content);
    content = fixControlCharacters(content);
    return content;
}

// Get list of invalid files
const checkScript = `const fs = require('fs');
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
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (!isValidJSON(content)) {
        console.log(file);
    }
}`;

fs.writeFileSync('check-invalid.js', checkScript);

const invalidFiles = execSync('node check-invalid.js', { encoding: 'utf8' })
    .split('\n')
    .filter(line => line.length > 0);

console.log(`Found ${invalidFiles.length} invalid files to process.`);

let fixedCount = 0;
let failedCount = 0;

for (const file of invalidFiles) {
    try {
        const original = fs.readFileSync(file, 'utf8');
        const fixed = fixJSONContent(original);
        
        // Verify it parses
        JSON.parse(fixed);
        
        if (original !== fixed) {
            fs.writeFileSync(file, fixed);
            console.log(`Fixed: ${file}`);
            fixedCount++;
        }
    } catch (e) {
        console.error(`Failed to fix/verify: ${file}. Error: ${e.message}`);
        failedCount++;
    }
}

console.log(`\nDone: ${fixedCount} fixed, ${failedCount} failed`);
