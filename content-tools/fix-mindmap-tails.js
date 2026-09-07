// Truncates corrupted mindmap.json files at the end of their first valid top-level
// JSON object (removes dangling tail left behind by an earlier enhancement script).
const fs = require('fs');

const files = [
  'content/ravikishan/class-11-notes/mathematics/algebra/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/mathematics/calculus/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/mathematics/statistics-and-probability/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/mathematics/trigonometry/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/mathematics/vectors/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/physics/elasticity/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/physics/gravitation/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/physics/kinematics/mindmap/mindmap.json',
  'content/ravikishan/class-11-notes/physics/work-energy-and-power/mindmap/mindmap.json',
];

for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (c === '"') { inStr = !inStr; }
    else if (!inStr) {
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
    }
  }
  if (end > 0 && end < t.length) {
    fs.writeFileSync(f, t.slice(0, end) + '\n');
    try { JSON.parse(fs.readFileSync(f, 'utf8')); console.log('FIXED + valid:', f); }
    catch (e) { console.log('TRUNCATED BUT STILL INVALID:', f, e.message); }
  } else if (end === -1) {
    console.log('NO COMPLETE OBJECT FOUND:', f);
  } else {
    console.log('already clean:', f);
  }
}
