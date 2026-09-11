const fs = require('fs');
const path = require('path');

// The file has \" sequences where " should be for structural JSON.
// Raw: " \" title \" :  " \" value \"
// The fix: replace \"  with " only where it appears as structural quotes
// (before property names and after them, and before/after string values)
// Simplest approach: replace \" with " globally, then verify valid JSON

const trickyFiles = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json'
];

trickyFiles.forEach(fp => {
    let content = fs.readFileSync(fp, 'utf8');
    const bn = path.basename(fp);
    
    // The raw file has \" everywhere. Replace \\" with " (backslash-quote → quote)
    // This is safe because \" is never a valid JSON escape — only \" (backslash-quote) is
    // Wait, \" IS a valid JSON escape! It means a literal quote inside a string.
    // But in this file, the \" appears BEFORE property names: \"title\" 
    // In valid JSON, \" inside a string value means a literal quote.
    // The issue is that structural quotes (around keys and values) are escaped.
    // Let's just try replacing all \\" with " and see if it parses.
    
    let fixed = content.replace(/\\"/g, '"');
    
    try {
        let obj = JSON.parse(fixed);
        fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
        console.log(`FIXED: ${bn}, topicSlug=${obj.topicSlug}, notes=${obj.notes ? obj.notes.length : 0}`);
    } catch (e) {
        console.log(`FAIL ${bn}: ${e.message}`);
        // Show what we have after replacement
        console.log(`  After replace: ${JSON.stringify(fixed.slice(0, 80))}`);
        
        // Try a smarter approach: only replace \" that are structural
        // Pattern: " \" X " where X is a property name, or ": " \" Y "
        // Actually let's look at what the replace produces
        // fixed starts with: {\n  ""title": ""Floral...
        // We need: {\n  "title": "Floral...
        // So we need to replace "" with " in the right places
        
        // Better: replace \\" with " — wait, the replace already did that.
        // The issue is that the raw file has: " \" title " (space between quote and backslash?)
        // Let me check: bytes 4-6 were: " \ "
        // So the raw is: " \ " t i t l e "
        // That's quote-backslash-quote-title-quote
        // After replace /\\"/g → ": quote-quote-title-quote... that's ""title" which is wrong!
        // 
        // The actual pattern is: "\"title\"" in the raw file
        // Wait no, bytes show: 4=", 5=\, 6=" so it's literally backslash-quote in the file.
        // My replace replaces \" with " which turns \ " into " (removes the backslash).
        // So "\"title\"" becomes ""title"" — two quotes, then title, then two quotes.
        // That's not valid JSON.
        //
        // I need to replace \" with " — removing the backslash but keeping one quote.
        // The regex /\\"/g matches backslash followed by quote.
        // Replacing with " should give us just a quote... but it gives us two quotes?
        // NO — /\\"/ matches the two-char sequence backslash-quote. Replacing with " (one char)
        // should give one quote. Let me check why I'm getting ""title"".
        
        // Oh wait, the output shows: "{\n  \"\"title\":"
        // That's JSON.stringify showing the result. The actual fixed string has:
        // {\n  ""title":" — two quotes before title.
        // 
        // Hmm, that means my replacement didn't work as expected.
        // Let me re-examine: content has "\"title" which is: quote, backslash, quote, t, i, t, l, e, quote
        // Replace /\\"/g with " — matches backslash+quote at position 5-6, replaces with "
        // Result: quote, quote, t, i, t, l, e, quote = ""title"
        // 
        // Ah! The original has a quote BEFORE the backslash-quote sequence.
        // So "\"title" = '"' + '\"' + 'title' = '"\"title"'
        // After replace: '"' + '"' + 'title' = '""title"'
        // 
        // I need to replace "\" with "\"" — no, that would keep both.
        // I need to replace "\" with just ""... which is what I did.
        // The issue is there's an EXTRA quote before the backslash.
        // 
        // The raw structure is: "\ "\"title\\"" which means the file literally contains:
        // quote, backslash, quote, t, i, t, l, e, backslash, quote, quote
        // 
        // Wait, let me re-read the bytes:
        // 4: " 5: \ 6: " 7: t 8: i 9: t 10: l 11: e 12: " 13: :
        // So positions 4-6 are: ", \, "  → that's "\" which is an escaped quote in JSON string context
        // But this is at the TOP level of the object, not inside a string!
        // 
        // So the file content at the top level is:
        // {
        //   "\"title\": \"Floral Diversity â€\" Three Domains..."
        // }
        // 
        // This is NOT valid JSON because property names can't be escaped like that.
        // The fix: change "\"title\"" to "title" — remove the backslash.
        // And change ": \"Floral..." to ": "Floral..." — remove the backslash before value quotes.
        // 
        // So the rule is: replace \" (backslash-quote) with " (just quote) at the TOP LEVEL.
        // But the replace /\\"/g does exactly that — it removes the backslash before every quote.
        // Why does it produce ""title""?
        // 
        // OH! I see. Let me re-check. The raw bytes are:
        // 4: " (0x22)
        // 5: \ (0x5C)
        // 6: " (0x22)
        // 
        // My regex /\\"/ matches byte 5 (backslash) and byte 6 (quote) as a pair.
        // Replacing that pair with " gives: byte 4 stays as ", then replaced with ".
        // Result: "" at positions 4-5. Then "title" at 7-11. Then byte 12 is " so: ""title"
        // 
        // The problem is that byte 4 is ALSO a quote, and it stays. So we get "" instead of ".
        // 
        // The fix: I need to remove ONLY the backslash, not the quote.
        // So replace \" with " means: remove the backslash, keep the quote.
        // But /\\"/g matches both characters and replaces with one character.
        // That's correct — it should give " not "".
        // 
        // Unless... the raw file doesn't actually have backslash at position 5?
        // Let me check: position 5 was \ (backslash). Yes.
        // 
        // Wait, I think I misunderstand the output. Let me re-check:
        // After replace, fixed starts with: {\n  \"\"title\":\"
        // In the raw fixed string: { newline space space " " title " : "
        // That's: {"title":" — which IS valid JSON!
        // 
        // But JSON.stringify shows: "{\n  \"\"title\":"
        // Which means the actual string content is: {\n  ""title":
        // Two quotes before title... that's wrong.
        // 
        // OK I think the issue is clearer now. Let me just do a direct byte-level fix.
        
        // New approach: iterate through the string and remove backslashes that precede quotes
        // at structural positions
        let result = '';
        for (let i = 0; i < content.length; i++) {
            if (content[i] === '\\' && content[i+1] === '"') {
                // Skip the backslash, keep the quote
                result += '"';
                i++; // skip the quote too since we already added it
            } else {
                result += content[i];
            }
        }
        
        try {
            let obj = JSON.parse(result);
            fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
            console.log(`FIXED (smart): ${bn}, topicSlug=${obj.topicSlug}`);
        } catch (e) {
            console.log(`STILL FAIL ${bn}: ${e.message}`);
            console.log(`  First 100: ${JSON.stringify(result.slice(0, 100))}`);
        }
    }
});
