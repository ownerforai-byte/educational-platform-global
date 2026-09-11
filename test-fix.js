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
    return content.replace(/[\x00-\x1f]/g, (match) => {
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

// Test on one file first
const testFile = 'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json';
console.log(`Testing on: ${testFile}`);
const original = fs.readFileSync(testFile, 'utf8');
console.log(`Original length: ${original.length}`);
console.log(`Original first 100 chars: ${JSON.stringify(original.substring(0, 100))}`);

const fixed = fixJSONContent(original);
console.log(`\nFixed length: ${fixed.length}`);
console.log(`Fixed first 100 chars: ${JSON.stringify(fixed.substring(0, 100))}`);

try {
    JSON.parse(fixed);
    console.log('\n✓ Valid JSON!');
} catch (e) {
    console.log(`\n✗ Invalid: ${e.message}`);
    const pos = parseInt(e.message.match(/position (\d+)/)?.[1]);
    console.log(`Context around position ${pos}: ${JSON.stringify(fixed.substring(pos - 10, pos + 10))}`);
}
