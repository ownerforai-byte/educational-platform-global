const fs = require('fs');
const path = require('path');

const filesToFix = [
    'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json'
];

filesToFix.forEach(relativePath => {
    const fullPath = path.join(__dirname, relativePath);
    let buf = fs.readFileSync(fullPath);

    if (buf[0] === 0x22) {
        let outer = JSON.parse(buf.toString('utf8'));
        console.log(`Fixed ${path.basename(relativePath)}: outer wrapper parsed, type=${typeof outer}`);
        if (typeof outer === 'string') {
            // Unescape control characters and invalid JSON escapes
            let inner = outer.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
            // Fix bad control characters (like standalone \n not followed by n)
            // In JSON, control characters must be escaped as \uXXXX
            inner = inner.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, '\\\\');
            try {
                let obj = JSON.parse(inner);
                fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2), 'utf8');
                console.log(`  -> Successfully parsed.`);
            } catch (e) {
                console.error(`  -> Parse failed:`, e.message);
                // Try manual extraction
                let fixed = inner.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
                try {
                    let obj = JSON.parse(fixed);
                    fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2), 'utf8');
                    console.log(`  -> Fixed with extra replacements.`);
                } catch (e2) {
                    console.error(`  -> Still failing:`, e2.message);
                }
            }
        } else if (Array.isArray(outer)) {
            let items = outer.map(item => typeof item === 'string' ? JSON.parse(item) : item);
            fs.writeFileSync(fullPath, JSON.stringify(items[0], null, 2), 'utf8');
            console.log(`  -> Array unwrapped.`);
        }
    } else {
        let content = buf.toString('utf8');
        let fixed = content.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        try {
            let obj = JSON.parse(fixed);
            fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2), 'utf8');
            console.log(`Fixed ${path.basename(relativePath)}.`);
        } catch (e) {
            console.error(`Failed: ${path.basename(relativePath)}:`, e.message);
        }
    }
});
