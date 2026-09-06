const fs = require('fs');
const path = require('path');

// These two files are double-stringified: the entire JSON is wrapped in a JSON string
// Pattern: "{\n  \"title\": \"...\"" -> needs outer quote removed, then inner unescaped
const trickyFiles = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json'
];

trickyFiles.forEach(fp => {
    const buf = fs.readFileSync(fp);
    // File starts with " then {\n  \"title\" — it's a string containing a JSON object
    // The outermost quotes are part of the JSON encoding
    // Remove outermost quotes: first char is ", last char is "
    let s = buf.toString('utf8');
    console.log(`${path.basename(fp)}: first byte=${s.charCodeAt(0)}, last byte=${s.charCodeAt(s.length-1)}, len=${s.length}`);
    
    // The raw file content when printed as JSON shows:
    // "{\n  \"\\\"title\": \"\\\"Floral Diversity â€\" Three Domains..."
    // Which means the raw file is: {\n  \"title\": \"Floral Diversity â€ Three Domains...
    // Wait no - if raw has \"title\", JSON.stringify would show \\\"title\"
    // Since JSON.stringify shows \"\\\"title\", that means raw has \\"title"
    // A literal backslash followed by a quote... that's an escaped quote in a JSON string!
    
    // Let me just try to parse it as-is first
    try {
        let obj = JSON.parse(s);
        console.log(`  Direct parse OK, keys: ${Object.keys(obj).slice(0,5)}`);
    } catch(e) {
        console.log(`  Direct parse failed: ${e.message}`);
    }
    
    // If it starts with "{" and has \" sequences, it's a double-escaped JSON
    // Try: remove outer quotes if file is literally "\"{\n\" etc.
    // Check if file is wrapped in outer quotes
    if (s[0] === '"') {
        // It's a string - unwrap
        s = s.slice(1, -1); // remove outer quotes
        console.log(`  Unwrapped outer string, new len=${s.length}`);
        // Now s contains: {\n  \"title\": \"...\"
        // Replace \" with " to fix keys
        s = s.replace(/\\"/g, '"');
        try {
            let obj = JSON.parse(s);
            fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
            console.log(`  FIXED by unwrapping outer string.`);
        } catch(e) {
            console.log(`  Still failed after unwrap: ${e.message}`);
            console.log(`  First 100 chars: ${JSON.stringify(s.slice(0, 100))}`);
        }
    }
});
