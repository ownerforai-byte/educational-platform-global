const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'moecdc-extraction', 'out-biology');

// Improved regex
const HEADING_RE = /^(\d+\.\d+|CHAPTER|SECTION)\s/i;
// Only match all-caps lines that aren't too long, to avoid catching paragraph text
const ALL_CAPS_RE = /^[A-Z][A-Z\s\-]{5,50}[A-Z]$/;

function parseChapter(chapterFilePath) {
    const text = fs.readFileSync(chapterFilePath, 'utf8');
    const lines = text.split('\n');
    const topics = [];
    let currentTopic = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (HEADING_RE.test(trimmed) || ALL_CAPS_RE.test(trimmed)) {
            if (currentTopic) {
                topics.push(currentTopic);
            }
            currentTopic = {
                title: trimmed,
                content: []
            };
        } else if (currentTopic) {
            currentTopic.content.push(line);
        }
    }
    if (currentTopic) topics.push(currentTopic);
    return topics;
}

// Example: Parse one chapter to verify structure
const topics = parseChapter(path.join(OUT_DIR, 'chapter-03-introduction-to-microbiology.md'));
console.log(JSON.stringify(topics.map(t => t.title), null, 2));
