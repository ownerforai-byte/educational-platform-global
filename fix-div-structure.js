const fs = require('fs');
const f = 'frontend/components/lab/chemistry-lab.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Remove the stray <div on line 784 (index 783) that got left behind
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '<div' && i > 0 && lines[i-1].trim() === ')') {
    // This is the stray <div before the block filter UI
    // Check if next non-empty line is the block filter UI
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (lines[j] && lines[j].includes('!activeClass')) {
      console.log('Removing stray <div at line', i + 1);
      lines.splice(i, 1);
      break;
    }
  }
}

// Now fix: the container div attributes (ref, className, style, />) need to be wrapped in <div
// Find the line with ref={containerRef} and add <div before it
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().startsWith('ref={containerRef}')) {
    console.log('Found containerRef at line', i + 1);
    // Insert <div before this line
    lines.splice(i, 0, '            <div');
    // Find the closing /> and add </div> after it
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trim() === '/>') {
        console.log('Found closing /> at line', j + 1);
        lines.splice(j + 1, 0, '            </div>');
        break;
      }
    }
    break;
  }
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Done');
