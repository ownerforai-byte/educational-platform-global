const fs = require('fs');
const path = require('path');

// The tricky files have \" sequences that are LITERAL backslash+quote in the JSON.
// Raw content: {\n  \"title\": \"Floral Diversity â€\" Three Domains...
// These \" are NOT valid JSON escapes inside a string value — they're literal backslashes
// followed by quotes, making the JSON invalid.
// Fix: remove backslashes that immediately precede property name quotes and value quotes.
// Actually the pattern is: all \" should become " (unescape the double-escape).
// But we must be careful with \" inside string VALUES.

const trickyFiles = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json'
];

trickyFiles.forEach(fp => {
    let content = fs.readFileSync(fp, 'utf8');
    console.log(`${path.basename(fp)}: len=${content.length}, first5=${JSON.stringify(content.slice(0,5))}`);

    // Strategy: The file is a JSON object where ALL quotes (both structural and within strings)
    // are double-escaped as \". We need to unescape them properly.
    // BUT we can't just replace all \" with " because \" inside strings should be ".
    // Actually in valid JSON, \" inside a string means a literal quote.
    // Here the ENTIRE file has \" everywhere — even structural quotes.
    // This means the file content is: it was JSON.stringified twice, then the outer quotes were removed.
    // Let's try: parse it as a JSON string first (wrap in quotes), then parse the result.
    
    // Check: does the file start with "{" and end with "}"?
    const trimmed = content.trim();
    console.log(`  starts with: ${JSON.stringify(trimmed[0])}, ends with: ${JSON.stringify(trimmed[trimmed.length-1])}`);
    
    // If it starts with { and ends with }, try double-parse
    if (trimmed[0] === '{' && trimmed[trimmed.length-1] === '}') {
        // Try wrapping in quotes and parsing
        const wrapped = '"' + content.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
        // That won't work. Let's try a different approach:
        // The content has \" everywhere. In a double-escaped JSON, the outer layer is a string
        // that contains a valid JSON with escaped quotes.
        // So the actual content is: the raw text with \" is meant to be read as "
        // Simplest fix: just replace all \" with "
        let fixed = content.replace(/\\"/g, '"');
        
        try {
            let obj = JSON.parse(fixed);
            fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
            console.log(`  FIXED! topicSlug: ${obj.topicSlug}`);
        } catch (e) {
            console.log(`  Replace failed: ${e.message}`);
            // Maybe there are also \n sequences we need to handle
            fixed = content.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
            try {
                let obj = JSON.parse(fixed);
                fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
                console.log(`  FIXED with newline handling! topicSlug: ${obj.topicSlug}`);
            } catch (e2) {
                console.log(`  Still failed: ${e2.message}`);
                console.log(`  After replace first 300: ${JSON.stringify(fixed.slice(0, 300))}`);
            }
        }
    }
});
