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
    let content = fs.readFileSync(fullPath, 'utf8');

    // Fix double-wrapped stringified array
    if (content.startsWith('"[')) {
        console.log(`Fixing faunal file: ${relativePath}`);
        // Remove outer quotes, unescape \"
        let clean = content.slice(1, -1).replace(/\\"/g, '"');
        let arr = JSON.parse(clean);
        // The array might contain stringified objects - we need to parse them
        let fixedArr = arr.map(item => (typeof item === 'string' ? JSON.parse(item) : item));
        fs.writeFileSync(fullPath, JSON.stringify(fixedArr[0], null, 2));
    } else {
        // Fix double-escaped quotes
        console.log(`Fixing floral file: ${relativePath}`);
        // Remove outer quotes if present
        let clean = content;
        if (clean.startsWith('"')) clean = clean.slice(1, -1);
        // Unescape \" -> "
        clean = clean.replace(/\\"/g, '"');
        // The read_file tool result shows keys like "title" -> "\""title\"" in the JSON object? 
        // No, the read_file tool result shows keys as "title": ... with escaped quotes around keys, 
        // which means the JSON itself contains \"title\".
        // Let's parse it and see if it works.
        try {
            let obj = JSON.parse(clean);
            fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2));
        } catch (e) {
            console.error(`Failed to parse ${relativePath}:`, e);
        }
    }
});
