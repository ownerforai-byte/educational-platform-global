const fs = require('fs');
const f = 'frontend/components/lab/chemistry-lab.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Remove stray <div on line 784 (index 783) - it's "<div " with trailing space before block UI
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '<div' && i + 1 < lines.length && lines[i + 1].trim().startsWith('{!activeClass')) {
    console.log('Removing stray <div at line', i + 1);
    lines.splice(i, 1);
    break;
  }
}

// Also check for any leftover "<div " (with space) before the block UI
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '<div ' && i + 1 < lines.length && lines[i + 1].trim().startsWith('{!activeClass')) {
    console.log('Removing stray <div  at line', i + 1);
    lines.splice(i, 1);
    break;
  }
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Done');
