const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);
const CONCEPTS_DIR = path.join(ROOT, 'content', 'ravikishan', 'class-11-notes', 'biology', 'floral-diversity', 'concepts');

// The botany5-1.json file is completely wrong - all content is HTML with broken keys.
// Let's just delete it and regenerate from the chapter data.
const f = path.join(CONCEPTS_DIR, 'botany5-1.json');
if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log('Deleted corrupted botany5-1.json');
}

// Check if there's a plan entry for this topic
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'ravikishan', 'class-11-notes', 'biology', 'floral-diversity', 'plan.json'), 'utf8'));
console.log('Plan topics:', plan.topics.map(t => t.file));
