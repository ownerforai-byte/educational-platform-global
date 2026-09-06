const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';

function scan(d) {
    let bad = [];
    fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const p = path.join(d, e.name);
        if (e.isDirectory()) {
            bad = bad.concat(scan(p));
        } else if (e.name.endsWith('.json') && e.name !== 'plan.json') {
            let b;
            try {
                b = fs.readFileSync(p, 'utf8');
                JSON.parse(b);
            } catch (err) {
                bad.push({ file: path.relative(SRC, p), error: err.message.slice(0, 60) });
            }
        }
    });
    return bad;
}

const all = scan(SRC);
console.log('Broken:', all.length);
all.forEach(f => console.log(' ', f.file, '-', f.error));

// Also check: which files have \" in string VALUES (valid escapes we must preserve)?
console.log('\n--- Files with escaped quotes in string values ---');
function scanEscaped(d) {
    let hits = [];
    fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const p = path.join(d, e.name);
        if (e.isDirectory()) {
            hits = hits.concat(scanEscaped(p));
        } else if (e.name.endsWith('.json') && e.name !== 'plan.json') {
            try {
                const b = fs.readFileSync(p, 'utf8');
                const obj = JSON.parse(b);
                // Check if any string value contains a literal \" (double backslash + quote)
                const str = JSON.stringify(obj);
                if (str.includes('\\"')) {
                    hits.push(path.relative(SRC, p));
                }
            } catch (err) {
                // ignore broken files
            }
        }
    });
    return hits;
}
const esc = scanEscaped(SRC);
console.log('Files with \\" in string values:', esc.length);
esc.forEach(f => console.log(' ', f));
