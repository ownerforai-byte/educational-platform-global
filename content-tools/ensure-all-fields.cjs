const fs = require('fs');
const path = require('path');

const baseDir = path.join('C:', 'Users', 'ASUS', 'Desktop', 'rn', 'content', 'ravikishan', 'class-11-notes');
const subjects = ['chemistry', 'biology'];

const requiredFields = [
    'duplicateType', 'tabGroup', 'notes', 'confusion', 'practice', 'universalFacts', 'animation3D', 
    'motionGraphics', 'examples', 'practiceQuestions', 'formulas', 'keyPoints', 'summary', 
    'specialNotes', 'importantStatements', 'importantNotes', 'examShortTricks', 'examNotes', 
    'mcs', 'mcqs', 'importantConcepts', 'importantTasks'
];

const templates = {
    'duplicateType': 2,
    'tabGroup': 'general',
    'notes': ["Real content for this topic."],
    'confusion': ["❌ Placeholder. ✅ Real content needed."],
    'practice': ["Practice problems for this topic."],
    'universalFacts': ["A universal fact about this topic."],
    'animation3D': "none",
    'motionGraphics': "none",
    'examples': ["Example 1", "Example 2"],
    'practiceQuestions': ["Question 1", "Question 2"],
    'formulas': ["Formula 1", "Formula 2"],
    'keyPoints': ["Point 1", "Point 2"],
    'summary': "Summary for this topic.",
    'specialNotes': ["Special note for this topic."],
    'importantStatements': ["Important statement 1."],
    'importantNotes': ["Important note 1."],
    'examShortTricks': ["Trick 1"],
    'examNotes': ["Exam note 1."],
    'mcs': [{ "question": "Question?", "options": ["A", "B", "C", "D"], "answer": "A" }],
    'mcqs': [{ "question": "Question?", "options": ["A", "B", "C", "D"], "answer": "A" }],
    'importantConcepts': ["Concept 1"],
    'importantTasks': ["Task 1"]
};

function processFile(filePath, unit, topic) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { return; }

    let changed = false;

    requiredFields.forEach(field => {
        if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0) || data[field] === "" || data[field] === null) {
            data[field] = templates[field];
            if (field === 'tabGroup') data[field] = topic;
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated: ${filePath}`);
    }
}

subjects.forEach(subject => {
    const subjectDir = path.join(baseDir, subject);
    if (!fs.existsSync(subjectDir)) return;

    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (fullPath.endsWith('.json') && !fullPath.includes('mindmap') && !fullPath.includes('plan.json')) {
                const unit = fullPath.split(path.sep).slice(-3, -2)[0];
                const topic = path.basename(fullPath, '.json');
                processFile(fullPath, unit, topic);
            }
        });
    }
    walk(subjectDir);
});
console.log('Finished ensuring all fields exist in chemistry and biology.');
