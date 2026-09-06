const fs = require('fs');
const { globSync } = require('glob');

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
    return content.replace(/,\s*([}\]])/g, '$1');
}

function fixControlCharacters(content) {
    return content.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, (match) => {
        const code = match.charCodeAt(0);
        if (code === 0x0d) return '\\r';
        if (code === 0x0a) return '\\n';
        return `\\u00${code.toString(16).padStart(2, '0')}`;
    });
}

function fixUnicodeQuirks(content) {
    // Fix HTML entities that look like quotes but break JSON parsing
    // â€" is the UTF-8 bytes E2 80 9D (right double quotation mark) misread as individual chars
    // Common patterns: â€" and â€™ (single quote)
    return content
        .replace(/\u00e2\u0080\u009d/g, '\u201d')   // â€" → " (right double quote)
        .replace(/\u00e2\u0080\u009c/g, '\u201c')   // â€œ → " (left double quote)
        .replace(/\u00e2\u0080\u0099/g, '\u2019')   // â€™ → ' (right single quote)
        .replace(/\u00e2\u0080\u0093/g, '\u2013')   // â€“ → – (en dash)
        .replace(/\u00e2\u0080\u0094/g, '\u2014')   // — → — (em dash)
        .replace(/\u00c2\u00a0/g, '\u00a0');        // Â -> non-breaking space
}

function fixTripleQuotes(content) {
    // Fix """key""": """value""" -> "key": "value"
    // Pattern: triple-quoted keys and values
    return content
        .replace(/"""/g, '"')
        .replace(/"""/g, '"');
}

function fixJSONContent(content) {
    content = fixUnicodeQuirks(content);
    content = fixControlCharacters(content);
    content = fixTripleQuotes(content);
    content = fixJSON(content);
    content = removeTrailingCommas(content);
    return content;
}

const files = globSync('content/ravikishan/**/*.json', { absolute: true });
console.log(`Found ${files.length} files to process.`);

let fixedCount = 0;
let failedCount = 0;
const failedList = [];

for (const file of files) {
    try {
        const original = fs.readFileSync(file, 'utf8');
        try {
            JSON.parse(original);
            // Already valid, skip
            continue;
        } catch (parseErr) {
            // Need to fix
        }
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
        failedList.push({ file, error: e.message });
        failedCount++;
    }
}

console.log(`\nDone: ${fixedCount} fixed, ${failedCount} failed`);
if (failedList.length > 0) {
    console.log('\n--- Failed files ---');
    failedList.forEach(f => console.log(`${f.error.substring(0,80)} | ${f.file}`));
}
