const fs = require('fs');
const path = require('path');

const unitsWithPlaceholderMindmaps = [
    'atomic-structure', 'basic-concept-organic', 'chemical-bonding', 'classification-of-elements',
    'fundamental-principles-organic', 'hydrocarbons', 'modern-manufactures', 'oxidation-reduction',
    'applied-chemistry', 'bio-inorganic-chemistry', 'chemistry-of-metals', 'chemistry-of-non-metals',
    'states-of-matter', 'stoichiometry', 'chemical-equilibrium', 'oxidation-and-reduction', 'basic-concept-of-organic-chemistry'
];

function getMindmapData(unit) {
    // Return a basic mindmap structure for each unit
    return {
        "centralConcept": unit.replace(/-/g, ' ').toUpperCase(),
        "branches": [
            { "topic": "Core Concepts", "subtopics": [{ "name": "Introduction", "points": ["Basic definitions"] }] },
            { "topic": "Key Applications", "subtopics": [{ "name": "Processes", "points": ["Practical uses"] }] }
        ]
    };
}

const baseDir = path.join('C:', 'Users', 'ASUS', 'Desktop', 'rn', 'content', 'ravikishan', 'class-11-notes', 'chemistry');

unitsWithPlaceholderMindmaps.forEach(unit => {
    const mindmapPath = path.join(baseDir, unit, 'mindmap', 'mindmap.json');
    if (fs.existsSync(mindmapPath)) {
        const content = {
            title: `${unit.replace(/-/g, ' ')} Mindmap`,
            unitSlug: unit,
            topicSlug: `${unit}-mindmap`,
            topicTitle: `${unit.replace(/-/g, ' ')} interactive concept map`,
            relevance: 0,
            notes: [`Study of ${unit.replace(/-/g, ' ')} concepts.`],
            mindmap: getMindmapData(unit)
        };
        fs.writeFileSync(mindmapPath, JSON.stringify(content, null, 2));
        console.log(`Updated: ${mindmapPath}`);
    }
});
