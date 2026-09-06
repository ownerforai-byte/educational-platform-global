const fs = require('fs');
const path = require('path');

// Delete extra non-plan concept files in floral-diversity and faunal-diversity
const planFiles = {
    'floral-diversity': ['01-life-classification.json','02-fungi.json','03-algae.json','04-bryophytes.json','05-pteridophytes.json','06-gymnosperms.json','07-angiosperms.json'],
    'faunal-diversity': ['01-protista-protozoa.json','02-animalia-phyla.json','03-earthworm.json','04-frog.json']
};

for (const [unit, allowed] of Object.entries(planFiles)) {
    const dir = path.join('content', 'ravikishan', 'class-11-notes', 'biology', unit, 'concepts');
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const extra = files.filter(f => !allowed.includes(f));
    console.log(`${unit}: allowed=${allowed.length}, found=${files.length}, extra=${extra.length}`);
    for (const f of extra) {
        console.log(`  EXTRA: ${f}`);
        // Check if it's a corrupt file we should delete
        const fp = path.join(dir, f);
        const buf = fs.readFileSync(fp);
        if (buf[0] === 0x22 || (buf[0] === 0x7b && buf[2] === 0x22)) {
            console.log(`    -> CORRUPT, deleting`);
            fs.unlinkSync(fp);
        } else {
            console.log(`    -> OK, keeping`);
        }
    }
}
