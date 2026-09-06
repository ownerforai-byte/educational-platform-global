const fs = require('fs');
const path = require('path');

// Fix floral-diversity extra files with double-escaped keys
const floralExtra = [
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/02-fungi-general-introduction-and-characteristic-features.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/04-bryophyta-general-introduction-characteristic-features-of-liverworts-hornworts-and-moss-morphological-structure-and-reproduction-of-marchantia-economic-importance-of-bryophytes.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/05-pteridophyta-general-introduction-characteristic-features-of-pteridophytes-morphological-structure-and-reproduction-of-dryopteris-economic-importance-of-pteridophytes.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/06-gymnosperm-general-introduction-characteristic-features-of-gymnosperms-morphology-and-reproduction-of-pinus-economic-importance-of-gymnosperm.json',
    'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/07-angiosperm-morphology-and-taxonomic-study.json'
];

floralExtra.forEach(fp => {
    let buf = fs.readFileSync(fp);
    let content = buf.toString('utf8');
    // Keys are like \"title\" and values are like \"content\" (with leading \")
    // Need to: remove \" from start of keys, remove \" from start of values
    // Pattern: "key": "\"value" -> "key": "value"
    let fixed = content
        .replace(/\\\"(\w+)\\\":/g, '"$1":')   // fix keys: \"title\" → "title"
        .replace(/:\\s*\\\"/g, ': "')            // fix values: ": \" → ": "
        .replace(/\\\"$/g, '"')                   // fix trailing quotes
        .replace(/\\"/g, '"');                    // fix any remaining escaped quotes
    
    try {
        let obj = JSON.parse(fixed);
        // Verify it has topicSlug
        if (!obj.topicSlug) {
            console.log(`WARN: ${path.basename(fp)} missing topicSlug:`, Object.keys(obj));
        }
        fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
        console.log(`FIXED: ${path.basename(fp)}`);
    } catch (e) {
        console.error(`FAIL: ${path.basename(fp)}:`, e.message);
        // Dump first 200 chars for debugging
        console.log('  First 200:', JSON.stringify(content.slice(0, 200)));
    }
});
