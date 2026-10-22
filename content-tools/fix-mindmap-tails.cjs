// Truncates corrupted mindmap.json files at the end of their first valid top-level
// JSON object (removes dangling tail left behind by an earlier enhancement script).
const fs = require('fs');

const files = [
  'content/ravikishan/visuals/mindmaps/class-11/mathematics/algebra/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/mathematics/calculus/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/mathematics/statistics-and-probability/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/mathematics/trigonometry/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/mathematics/vectors/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/physics/elasticity/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/physics/gravitation/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/physics/kinematics/mindmap.json',
  'content/ravikishan/visuals/mindmaps/class-11/physics/work-energy-and-power/mindmap.json',
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
