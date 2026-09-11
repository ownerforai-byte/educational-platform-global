const fs = require('fs');
const path = require('path');

function unescapeJson(content) {
    // The file has literal \" (backslash + quote) everywhere instead of just "
    // This makes it invalid JSON. We need to remove the backslash before each quote.
    // Use a proper JSON parser approach: scan char by char, remove backslashes before quotes
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

const files = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json'
];

files.forEach(fp => {
    const raw = fs.readFileSync(fp);
    const content = raw.toString('utf8');
    const bn = path.basename(fp);

    console.log(`${bn}: len=${content.length}`);
    
    // The raw bytes show \" at positions. Let's check the first few raw chars
    const first30 = raw.slice(0, 30);
    console.log(`  Raw bytes 0-30: ${first30.toString('hex')}`);
    
    // Decode to see actual chars
    console.log(`  As string: ${JSON.stringify(content.slice(0, 40))}`);
    
    // Count backslash chars (0x5C) before quotes (0x22)
    let bsBeforeQuote = 0;
    for (let i = 0; i < content.length - 1; i++) {
        if (content.charCodeAt(i) === 0x5C && content.charCodeAt(i + 1) === 0x22) bsBeforeQuote++;
    }
    console.log(`  Backslash-before-quote count: ${bsBeforeQuote}`);
    
    // Count standalone backslashes
    let totalBs = 0;
    for (let i = 0; i < content.length; i++) {
        if (content.charCodeAt(i) === 0x5C) totalBs++;
    }
    console.log(`  Total backslash count: ${totalBs}`);
    
    // Approach: replace all \" with " (remove backslash before every quote)
    let fixed = content.replace(/\\\"/g, '"');
    console.log(`  After replace first 40: ${JSON.stringify(fixed.slice(0, 40))}`);
    
    try {
        let obj = JSON.parse(fixed);
        console.log(`  SUCCESS! keys: ${Object.keys(obj).slice(0, 5)}`);
        console.log(`  topicSlug: ${obj.topicSlug}, title: ${obj.title ? obj.title.slice(0, 50) : 'undefined'}`);
        
        // Verify all required fields
        const req = ['title', 'unitSlug', 'topicSlug', 'notes'];
        const missing = req.filter(k => obj[k] === undefined);
        if (missing.length > 0) {
            console.log(`  Missing: ${missing.join(', ')}`);
        }
        
        fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
        console.log(`  Written!`);
    } catch (e) {
        console.log(`  FAILED: ${e.message}`);
        // Find the exact location
        const m = e.message.match(/position (\d+)/);
        if (m) {
            const pos = parseInt(m[1]);
            console.log(`  Context: ${JSON.stringify(fixed.slice(Math.max(0, pos-30), pos+30))}`);
            // Show raw bytes
            const rawCtx = raw.slice(Math.max(0, pos-30), pos+30);
            console.log(`  Raw bytes: ${rawCtx.toString('hex')}`);
        }
    }
});
