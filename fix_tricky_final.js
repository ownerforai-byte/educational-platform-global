const fs = require('fs');
const path = require('path');

// The file contains \" (backslash + quote) as structural JSON delimiters.
// This is invalid JSON. We need to REMOVE the backslash before each quote, keeping the quote.
// The fix: replace \" (two chars: backslash + quote) with " (one char: quote only)
// BUT my earlier attempt produced "" (two quotes) because...
// Actually wait, let me re-examine.
// Raw file has: position 4=", 5=\, 6=" 
// Replace /\\"/g with ":
// - Match at position 5-6: \ and " → replace with " 
// - Result: position 4 stays as ", position 5 becomes " (replacement)
// - Total: "" at positions 4-5 → TWO QUOTES!
// That's the bug. I need to replace \" with "" (empty string) — remove BOTH characters.
// OR: remove only the backslash at position 5, keep the quote at position 6.
// Let's use a different approach: skip backslashes that are before quotes.

function removeEscapedQuotes(content) {
    let result = '';
    for (let i = 0; i < content.length; i++) {
        const ch = content[i];
        // If current char is backslash and next is quote, skip the backslash
        if (ch === '\\' && i + 1 < content.length && content[i + 1] === '"') {
            // Skip the backslash, include the quote
            result += '"';
            i++; // skip the quote too since we already added it
        } else {
            result += ch;
        }
    }
    return result;
}

const files = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json'
];

files.forEach(fp => {
    let content = fs.readFileSync(fp, 'utf8');
    const bn = path.basename(fp);
    
    console.log(`${bn}: len=${content.length}`);
    
    let fixed = removeEscapedQuotes(content);
    console.log(`  After fix: ${JSON.stringify(fixed.slice(0, 40))}`);
    
    try {
        let obj = JSON.parse(fixed);
        console.log(`  SUCCESS! topicSlug: ${obj.topicSlug}, title: ${(obj.title || '').slice(0, 40)}`);
        console.log(`  Keys: ${Object.keys(obj).join(', ')}`);
        
        // Verify required fields
        const req = ['title', 'unitSlug', 'topicSlug', 'topicTitle', 'relevance', 'notes'];
        const missing = req.filter(k => obj[k] === undefined);
        if (missing.length > 0) console.log(`  MISSING: ${missing.join(', ')}`);
        
        fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
        console.log(`  Written successfully!`);
    } catch (e) {
        console.log(`  FAILED: ${e.message}`);
        const m = e.message.match(/position (\d+)/);
        if (m) {
            const pos = parseInt(m[1]);
            console.log(`  Context: ${JSON.stringify(fixed.slice(Math.max(0, pos-30), pos+30))}`);
        }
    }
});
