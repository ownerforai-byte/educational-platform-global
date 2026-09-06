// fix_physics_double_escaped.js
// The physics files have \" (backslash + quote) BETWEEN structural quotes.
// Pattern in raw file: " \ " t i t l e \ " "  (quote, backslash, quote, title, backslash, quote, quote)
// This should be:         "  t i t l e "                 (quote, title, quote)
//
// Fix: remove backslashes that appear immediately between two quotes.
// More precisely: replace the sequence "\" with just "" at all positions.
// Since the file has quotes as structural delimiters AND escaped quotes,
// we need to identify when a backslash sits between two quote characters.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content/ravikishan/class-11-notes/physics');

function fixDoubleEscapedKeys(content) {
    // Replace every occurrence of \" (backslash immediately followed by quote) with " (just quote)
    // But we must NOT break valid JSON string escapes like \n, \t, \", etc.
    // In these files, \" appears as a structural corruption, not as a string-internal escape.
    // Strategy: scan char by char; if we see backslash followed by quote, remove the backslash.
    let result = '';
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '\\' && i + 1 < content.length && content[i + 1] === '"') {
            // Skip the backslash, keep the quote
            result += '"';
            i++; // skip the quote since we already added it
        } else {
            result += content[i];
        }
    }
    return result;
}

function tryFix(content) {
    // Approach 1: remove backslash before quote (structural fix)
    let fixed = fixDoubleEscapedKeys(content);
    try {
        const obj = JSON.parse(fixed);
        return { ok: true, obj, method: 'remove-bs-before-quote' };
    } catch (e) {
        // Approach 2: try to parse the raw content first to see what's wrong
        // Maybe the file is wrapped in outer quotes
        const trimmed = fixed.trim();
        if (trimmed[0] === '"' && trimmed[trimmed.length - 1] === '"') {
            try {
                const unwrapped = JSON.parse(trimmed);
                if (typeof unwrapped === 'object' && unwrapped !== null && !Array.isArray(unwrapped)) {
                    return { ok: true, obj: unwrapped, method: 'unwrap-outer-string' };
                }
            } catch (e2) {
                // fall through
            }
        }
        // Approach 3: remove ALL backslashes before quotes AND remove duplicate quotes
        // Pattern: ""title"" -> "title"
        fixed = fixed.replace(/""/g, '"');
        try {
            const obj = JSON.parse(fixed);
            return { ok: true, obj, method: 'remove-double-quotes' };
        } catch (e3) {
            return { ok: false, error: e3.message, lastFixed: fixed.slice(0, 100) };
        }
    }
}

let fixed = 0, skipped = 0;

function scan(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
        const fp = path.join(dir, d.name);
        if (d.isDirectory()) {
            scan(fp);
        } else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
            let content = fs.readFileSync(fp, 'utf8');
            
            // Only attempt fix if file contains \" pattern or has no topicSlug
            const hasBackslashQuote = content.includes('\\"');
            let obj;
            try {
                obj = JSON.parse(content);
                if (obj.topicSlug) return; // already fine
            } catch (e) {
                // invalid JSON, try to fix
            }
            
            if (!hasBackslashQuote && obj?.topicSlug) return;
            
            const result = tryFix(content);
            if (result.ok) {
                // Ensure topicSlug exists
                if (!result.obj.topicSlug && result.obj.title) {
                    result.obj.topicSlug = result.obj.title.toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '');
                }
                fs.writeFileSync(fp, JSON.stringify(result.obj, null, 2), 'utf8');
                console.log(`FIXED: ${path.relative(SRC, fp)} [${result.method}]`);
                fixed++;
            } else {
                console.log(`SKIP: ${path.relative(SRC, fp)} — ${result.error?.slice(0, 80)}`);
                skipped++;
            }
        }
    });
}

scan(SRC);
console.log(`\nFixed: ${fixed}, Skipped: ${skipped}`);
