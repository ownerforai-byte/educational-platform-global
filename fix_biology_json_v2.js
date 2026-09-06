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

    if (content.startsWith('"[')) {
        console.log(`Fixing faunal file: ${relativePath}`);
        // Remove outer quotes
        let clean = content.slice(1, -1);
        // The file content is "[\n{...}]". Replacing \" with " might be enough if it's just escaped quotes.
        // Let's try to unescape the whole string.
        let unescaped = clean.replace(/\\"/g, '"').replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
        // Now parse it.
        try {
            let arr = JSON.parse(unescaped);
            fs.writeFileSync(fullPath, JSON.stringify(arr[0], null, 2));
            console.log(`  Fixed.`);
        } catch (e) {
            console.error(`  Failed to fix ${relativePath}:`, e);
        }
    } else {
        console.log(`Fixing floral file: ${relativePath}`);
        // If it starts with a quote, remove outer quotes
        let clean = content;
        if (clean.startsWith('"')) clean = clean.slice(1, -1);
        // Unescape \" -> "
        let unescaped = clean.replace(/\\"/g, '"');
        
        try {
            let obj = JSON.parse(unescaped);
            fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2));
            console.log(`  Fixed.`);
        } catch (e) {
            console.error(`  Failed to fix ${relativePath}:`, e);
        }
    }
});
