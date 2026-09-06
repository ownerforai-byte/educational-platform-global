const fs = require('fs');
const { globSync } = require('glob');

function repair(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Try 100 times to fix parsing errors
  for (let i = 0; i < 100; i++) {
    try {
      JSON.parse(content);
      fs.writeFileSync(filePath, content, 'utf8');
      return true; // Fixed!
    } catch (e) {
      const match = e.message.match(/position (\d+)/);
      if (!match) break; // Cannot auto-fix
      
      const pos = parseInt(match[1], 10);
      
      // Simple strategy: escape the character that causes the issue.
      // This works well for quotes inside strings, and control characters.
      content = content.substring(0, pos) + '\\' + content.substring(pos);
    }
  }
  return false;
}

const files = globSync('content/ravikishan/**/*.json');
let fixed = 0, failed = 0;
for (const file of files) {
  try {
     JSON.parse(fs.readFileSync(file, 'utf8'));
     continue; // Already valid
  } catch (e) {
      if (repair(file)) {
        fixed++;
        console.log('Fixed:', file);
      } else {
        failed++;
        console.log('Failed:', file);
      }
  }
}
console.log(`\nDone: Fixed ${fixed}, failed ${failed}`);
