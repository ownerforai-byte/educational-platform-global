const fs = require('fs');
const path = require('path');

const filesToFix = [
    'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json',
    'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/botany5-1.json'
];

filesToFix.forEach(relativePath => {
    const fullPath = path.join(__dirname, relativePath);
    let buf = fs.readFileSync(fullPath);

    if (buf[0] === 0x22) {
        // Starts with quote — string-wrapped
        let outer = JSON.parse(buf.toString('utf8'));
        console.log(`Fixed ${path.basename(relativePath)}: outer wrapper parsed, type=${typeof outer}`);
        if (Array.isArray(outer)) {
            // Array of strings (faunal case)
            let arr = outer;
            // Parse each element
            let items = arr.map(item => {
                if (typeof item === 'string') return JSON.parse(item);
                return item;
            });
            fs.writeFileSync(fullPath, JSON.stringify(items[0], null, 2));
            console.log(`  -> Wrote array[0] as JSON.`);
        } else if (typeof outer === 'string') {
            // String-wrapped string (double-wrapped)
            let inner = JSON.parse(outer);
            fs.writeFileSync(fullPath, JSON.stringify(inner, null, 2));
            console.log(`  -> Double-wrapped string unwrapped.`);
        } else {
            // Just a string wrapper
            fs.writeFileSync(fullPath, JSON.stringify(outer, null, 2));
            console.log(`  -> String wrapper removed.`);
        }
    } else {
        // Starts with { — keys are double-quoted
        let content = buf.toString('utf8');
        // Unescape \" in keys and values
        let fixed = content.replace(/\\"/g, '"');
        try {
            let obj = JSON.parse(fixed);
            fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2));
            console.log(`Fixed ${path.basename(relativePath)}: unescaped keys.`);
        } catch (e) {
            console.error(`Failed: ${path.basename(relativePath)}:`, e.message);
        }
    }
});
