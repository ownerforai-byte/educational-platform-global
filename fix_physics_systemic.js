// fix_physics_systemic.js
// Fixes three systemic issues in physics concept JSON files:
// 1. Double-escaped keys ("title" -> "title") in multiple subjects
// 2. Array-typed files that should be objects (need to extract object from array)
// 3. Invalid JSON in dynamics momentum file
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content/ravikishan/class-11-notes/physics');

function fixDoubleEscapedKeys(content) {
    // Pattern: files where keys appear as "\"title\"" (backslash-escaped quotes)
    // The file parses but keys have leading backslash: "\"title\"" -> "\"title\""
    // We need to remove the backslash before every quote that precedes a property name
    let result = '';
    let i = 0;
    while (i < content.length) {
        const ch = content[i];
        if (ch === '\\' && i + 1 < content.length && content[i + 1] === '"') {
            // Remove the backslash, keep the quote
            result += '"';
            i += 2;
        } else {
            result += ch;
            i++;
        }
    }
    return result;
}

function getFileType(filePath) {
    const raw = fs.readFileSync(filePath);
    const s = raw.toString('utf8');
    const trimmed = s.trim();
    
    // Check if it starts with "["
    if (trimmed[0] === '[') return 'array';
    // Check for double-escaped keys
    if (trimmed.includes('\\"')) return 'double-escaped';
    // Check for invalid JSON
    try {
        const obj = JSON.parse(s);
        if (Array.isArray(obj)) return 'array';
        return 'object';
    } catch (e) {
        return 'invalid';
    }
}

// Collect all files to fix
const filesToFix = [];
function scan(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
        const fp = path.join(dir, d.name);
        if (d.isDirectory()) {
            scan(fp);
        } else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
            const type = getFileType(fp);
            if (type !== 'object') {
                filesToFix.push({ fp, type, rel: path.relative(SRC, fp) });
            }
        }
    });
}
scan(SRC);

console.log(`Found ${filesToFix.length} problematic files:\n`);
filesToFix.forEach(f => console.log(`  ${f.type}: ${f.rel}`));
console.log('');

let fixed = 0;
let skipped = 0;

for (const { fp, type, rel } of filesToFix) {
    let content = fs.readFileSync(fp, 'utf8');
    let obj;
    
    if (type === 'invalid') {
        // Try to fix by removing \\" sequences first
        content = fixDoubleEscapedKeys(content);
        try {
            obj = JSON.parse(content);
        } catch (e) {
            console.log(`  SKIP (still invalid): ${rel} — ${e.message.slice(0, 80)}`);
            skipped++;
            continue;
        }
    } else if (type === 'double-escaped') {
        content = fixDoubleEscapedKeys(content);
        try {
            obj = JSON.parse(content);
        } catch (e) {
            console.log(`  SKIP (parse fail after unescape): ${rel} — ${e.message.slice(0, 80)}`);
            skipped++;
            continue;
        }
    } else if (type === 'array') {
        try {
            obj = JSON.parse(content);
            if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object') {
                // Take the first object from the array
                obj = obj[0];
                console.log(`  ARRAY->OBJ: ${rel} (array with ${obj.length} elements, took first)`);
            } else {
                console.log(`  SKIP (array not convertible): ${rel}`);
                skipped++;
                continue;
            }
        } catch (e) {
            console.log(`  SKIP (array parse fail): ${rel} — ${e.message.slice(0, 80)}`);
            skipped++;
            continue;
        }
    }
    
    // Ensure topicSlug exists
    if (!obj.topicSlug && obj.title) {
        obj.topicSlug = obj.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
    
    fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
    fixed++;
}

console.log(`\nFixed: ${fixed}, Skipped: ${skipped}`);

// Verify circular-motion is clean
console.log('\n--- Circular-motion verification ---');
const cmDir = path.join(SRC, 'circular-motion/concepts');
const cmFiles = fs.readdirSync(cmDir).filter(f => f.endsWith('.json') && f !== 'plan.json');
cmFiles.forEach(f => {
    try {
        const o = JSON.parse(fs.readFileSync(path.join(cmDir, f), 'utf8'));
        console.log(`  OK: ${f} — topicSlug=${o.topicSlug}, notes=${o.notes?.length ?? 0}, sim=${!!o.simulation}, mm=${!!o.mindmap}`);
    } catch (e) {
        console.log(`  ERR: ${f} — ${e.message.slice(0, 60)}`);
    }
});
