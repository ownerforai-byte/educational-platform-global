import fs from 'fs';
import path from 'path';

const rootApp = 'app';
const frontendApp = 'frontend/app';

function walkSync(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walkSync(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

const rootFiles = walkSync(rootApp);
let count = 0;

for (const rootFile of rootFiles) {
  const relative = path.relative(rootApp, rootFile);
  const frontendFile = path.join(frontendApp, relative);
  
  if (!fs.existsSync(frontendFile)) continue;
  
  const rootContent = fs.readFileSync(rootFile, 'utf8');
  const frontendContent = fs.readFileSync(frontendFile, 'utf8');
  
  // If frontend file is minified (single line) and root file is formatted, copy root version
  if (frontendContent.includes('\n') === false && rootContent.includes('\n') === true) {
    fs.writeFileSync(frontendFile, rootContent);
    count++;
  }
}

console.log(`Reformatted ${count} files`);
