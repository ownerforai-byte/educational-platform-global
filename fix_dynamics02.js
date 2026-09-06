const fs = require('fs');
const fp = 'content/ravikishan/class-11-notes/physics/dynamics/concepts/02-conservation-linear-momentum.json';
let b = fs.readFileSync(fp, 'utf8');
const lines = b.split('\n');

console.log('Total lines:', lines.length);
console.log('Lines 38-46:');
for (let i = 37; i < 46 && i < lines.length; i++) {
  console.log(`  ${i+1}: ${JSON.stringify(lines[i])}`);
}

// Remove lines 41-44 (0-indexed: 40-43): the 3 orphan strings + the stray ],
// Line 40 (index 39): "  ],"  <- closes universalFacts — KEEP
// Line 41 (index 40): orphan string — REMOVE
// Line 42 (index 41): orphan string — REMOVE
// Line 43 (index 42): orphan string — REMOVE
// Line 44 (index 43): "  ],"  <- stray close — REMOVE
// Line 45 (index 44): "  \"confusion\": [" — KEEP

lines.splice(40, 4); // remove 4 lines starting at index 40
console.log('\nTotal lines after:', lines.length);
console.log('Lines 38-42:');
for (let i = 37; i < 42 && i < lines.length; i++) {
  console.log(`  ${i+1}: ${JSON.stringify(lines[i])}`);
}

b = lines.join('\n');

try {
  const obj = JSON.parse(b);
  console.log('\nParse OK!');
  console.log('topicSlug:', obj.topicSlug);
  console.log('notes:', obj.notes?.length);
  console.log('confusion:', obj.confusion?.length);
  console.log('Keys:', Object.keys(obj));
  fs.writeFileSync(fp, b, 'utf8');
  console.log('Fixed.');
} catch (e) {
  console.log('Still broken:', e.message);
  const m = e.message.match(/position\s+(\d+)/);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Context:', JSON.stringify(b.slice(pos - 50, pos + 50)));
  }
}
