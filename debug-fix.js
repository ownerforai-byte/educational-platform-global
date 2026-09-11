const fs = require('fs');
const { globSync } = require('glob');

// Tokenize and fix only invalid escapes inside strings
function fixJSON(content) {
    let result = '';
    let i = 0;

    while (i < content.length) {
        const ch = content[i];

        if (ch === '"') {
            // Start of string - find the end
            i++;
            let strContent = '';
            let escape = false;

            while (i < content.length) {
                const c = content[i];
                if (escape) {
                    strContent += c;
                    escape = false;
                } else if (c === '\\') {
                    strContent += c;
                    escape = true;
                } else if (c === '"') {
                    // End of string
                    i++;
                    // Now fix the string content
                    let fixed = '';
                    let j = 0;
                    while (j < strContent.length) {
                        const sc = strContent[j];
                        if (sc === '\\' && j + 1 < strContent.length) {
                            const nc = strContent[j + 1];
                            if (['"', '\\', '/', 'b', 'f', 'n', 'r', 't'].includes(nc)) {
                                fixed += sc + nc;
                                j += 2;
                                continue;
                            } else if (nc === 'u' && j + 5 < strContent.length) {
                                const hex = strContent.substring(j + 2, j + 6);
                                if (/^[0-9a-fA-F]{4}$/.test(hex)) {
                                    fixed += sc + nc;
                                    j += 6;
                                    continue;
                                }
                            }
                            // Invalid escape - double the backslash
                            fixed += '\\\\' + nc;
                            j += 2;
                        } else {
                            fixed += sc;
                            j++;
                        }
                    }
                    result += '"' + fixed + '"';
                    break;
                } else {
                    strContent += c;
                }
                i++;
            }
        } else {
            result += ch;
            i++;
        }
    }

    return result;
}

const files = globSync('content/ravikishan/**/*.json', { absolute: true });
console.log(`Found ${files.length} files to process.`);

for (const file of files) {
    try {
        const original = fs.readFileSync(file, 'utf8');
        const fixed = fixJSON(original);
        
        // Verify it parses
        JSON.parse(fixed);
        
        fs.writeFileSync(file, fixed);
        console.log(`Fixed: ${file}`);
    } catch (e) {
        console.error(`Failed to fix/verify: ${file}. Error: ${e.message}`);
    }
}
