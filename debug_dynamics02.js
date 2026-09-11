const fs = require('fs');
const b = fs.readFileSync('content/ravikishan/class-11-notes/physics/dynamics/concepts/02-conservation-linear-momentum.json', 'utf8');
const lines = b.split('\n');
console.log('Total lines:', lines.length);
console.log('Total bytes:', b.length);

// Show first 50 lines with their char counts
for (let i = 0; i < Math.min(50, lines.length); i++) {
  console.log(`${i+1} (${lines[i].length}): ${JSON.stringify(lines[i].slice(0, 120))}`);
}

console.log('\n--- Lines 40-45 (around error) ---');
for (let i = 39; i < 45 && i < lines.length; i++) {
  console.log(`${i+1} (${lines[i].length}): ${JSON.stringify(lines[i].slice(0, 160))}`);
}

// Find byte offset of line 41
let offset = 0;
for (let i = 0; i < 40; i++) offset += lines[i].length + 1;
console.log(`\nLine 41 starts at byte ${offset}`);
console.log(`Error is at byte 5694, which is line: `);
let lineNum = 1;
let bytePos = 0;
for (let i = 0; i < lines.length; i++) {
  if (bytePos + lines[i].length >= 5694) {
    console.log(`  Line ${i+1}, col ${5694 - bytePos}`);
    break;
  }
  bytePos += lines[i].length + 1;
  lineNum = i + 2;
}

// Check for unbalanced quotes - find string boundaries
console.log('\n--- Quote analysis ---');
let inStr = false;
let esc = false;
let strStart = 0;
let issues = [];
for (let i = 0; i < b.length; i++) {
  const c = b[i];
  if (esc) { esc = false; continue; }
  if (c === '\\') { esc = true; continue; }
  if (c === '"') {
    if (!inStr) {
      inStr = true;
      strStart = i;
    } else {
      inStr = false;
      // Check the content of this string
      const content = b.slice(strStart + 1, i);
      // Count newlines in string content
      const nlCount = (content.match(/\n/g) || []).length;
      if (nlCount > 0) {
        issues.push(`Multi-line string at ${strStart}: ends with "${content.slice(-30)}"`);
      }
    }
  }
}
if (issues.length > 0) {
  console.log('Issues found:');
  issues.forEach(i => console.log(' ', i));
} else {
  console.log('No multi-line string issues found.');
}

// Check if there's a BOM or weird chars
console.log('\n--- First 10 bytes hex ---');
const buf = fs.readFileSync('content/ravikishan/class-11-notes/physics/dynamics/concepts/02-conservation-linear-momentum.json');
console.log(buf.slice(0, 10).toString('hex'));
console.log('Last 10 bytes hex:', buf.slice(-10).toString('hex'));

// Try to find where the parse really fails by checking char by char
console.log('\n--- Characters around pos 5694 ---');
for (let i = 5680; i < 5710; i++) {
  console.log(`  ${i}: '${b[i]}' (0x${b.charCodeAt(i).toString(16)})`);
}
