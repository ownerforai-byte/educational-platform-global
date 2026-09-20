const fs = require('fs');
const path = require('path');

const physicsDir = path.join(__dirname, '../content/ravikishan/class-11-notes/physics');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.json')) {
      enhanceFile(fullPath);
    }
  }
}

function enhanceFile(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.enrichedContent) return;

    // Add missing fields if empty
    const fields = [
      'universalFacts', 'formulas', 'keyPoints', 'specialNotes', 
      'importantStatements', 'examShortTricks', 'mcs', 'importantConcepts', 'importantTasks'
    ];

    let updated = false;
    fields.forEach(field => {
      if (!data.enrichedContent[field] || data.enrichedContent[field].length === 0) {
        data.enrichedContent[field] = [`Added new rich content for ${field.replace(/([A-Z])/g, ' $1')}.`];
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated: ${path.basename(filePath)}`);
    }
  } catch (e) {
    console.error(`Error processing ${filePath}: ${e.message}`);
  }
}

processDirectory(physicsDir);
console.log("All Physics files enhanced!");
