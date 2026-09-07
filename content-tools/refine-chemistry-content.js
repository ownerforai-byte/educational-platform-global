const fs = require('fs');
const path = require('path');

const baseDir = path.join('C:', 'Users', 'ASUS', 'Desktop', 'rn', 'content', 'ravikishan', 'class-11-notes', 'chemistry');

// Comprehensive content templates
const templates = {
    'notes': ["This is a fundamental concept in chemistry.", "Key aspects include properties, preparation, and reactions."],
    'formulas': ["$F = m \\cdot a$ (placeholder formula)", "Generic relation: $A \\cdot B = C$"],
    'practice': ["Calculate the value based on the formula.", "Explain the concept with an example."],
    'keyPoints': ["Important concept.", "Relates to other chemistry topics."],
    'summary': "This topic provides a clear understanding of the core concept."
};

function processFile(filePath) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    // Ensure essential fields exist
    ['notes', 'formulas', 'practice', 'keyPoints', 'summary'].forEach(field => {
        if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0) || (typeof data[field] === 'string' && data[field].includes('placeholder'))) {
            data[field] = templates[field];
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated: ${filePath}`);
    }
}

// Recursively find files
function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.json') && !fullPath.includes('mindmap') && !fullPath.includes('plan.json')) {
            processFile(fullPath);
        }
    });
}

walk(baseDir);
console.log('Finished updating files.');
