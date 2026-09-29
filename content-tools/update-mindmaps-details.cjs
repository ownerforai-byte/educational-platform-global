const fs = require('fs');
const path = require('path');

const baseDir = path.join('C:', 'Users', 'ASUS', 'Desktop', 'rn', 'content', 'ravikishan', 'class-11-notes', 'chemistry');

// More detailed branching for specific units
const detailedMindmaps = {
    'stoichiometry': {
        "centralConcept": "STOICHIOMETRY",
        "branches": [
            { "topic": "Laws", "subtopics": [{ "name": "Fundamental Laws", "points": ["Conservation of Mass", "Definite Proportions", "Multiple Proportions"] }] },
            { "topic": "Mole Concept", "subtopics": [{ "name": "Calculations", "points": ["Molar Mass", "Avogadro's Number", "Molar Volume at STP"] }] },
            { "topic": "Reactions", "subtopics": [{ "name": "Limiting Reactant", "points": ["Theoretical Yield", "Actual Yield", "Percent Yield"] }] }
        ]
    },
    'chemical-bonding': {
        "centralConcept": "CHEMICAL BONDING",
        "branches": [
            { "topic": "Bond Types", "subtopics": [{ "name": "Primary", "points": ["Ionic", "Covalent", "Coordinate"] }] },
            { "topic": "Shapes", "subtopics": [{ "name": "Theories", "points": ["VSEPR Theory", "Hybridization (sp, sp², sp³)", "Molecular Orbital Theory"] }] },
            { "topic": "Forces", "subtopics": [{ "name": "Intermolecular", "points": ["Hydrogen Bonding", "van der Waals Forces"] }] }
        ]
    }
    // ... I will add a generic detailed structure for others
};

function getDetailedMindmapData(unit) {
    if (detailedMindmaps[unit]) return detailedMindmaps[unit];

    return {
        "centralConcept": unit.replace(/-/g, ' ').toUpperCase(),
        "branches": [
            { "topic": "Core Concepts", "subtopics": [{ "name": "Fundamentals", "points": ["Key Definitions", "Basic Theories", "Historical Context"] }] },
            { "topic": "Properties", "subtopics": [{ "name": "Physical", "points": ["State", "Melting/Boiling Points"] }, { "name": "Chemical", "points": ["Reactivity", "Periodic Trends"] }] },
            { "topic": "Applications", "subtopics": [{ "name": "Industrial", "points": ["Manufacturing Processes", "Practical Uses", "Environmental Impact"] }] }
        ]
    };
}

// Recursively find mindmap files
function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file === 'mindmap.json') {
            const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            
            // Add UI config
            data.uiConfig = {
                "allowZoom": true,
                "showRefresh": true
            };
            
            // Add more details
            const unit = data.unitSlug;
            data.mindmap = getDetailedMindmapData(unit);
            
            fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
            console.log(`Updated Mindmap: ${fullPath}`);
        }
    });
}

walk(baseDir);
console.log('Finished updating mindmaps.');
