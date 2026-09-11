const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const c = fs.readFileSync(path, 'utf8');
try { JSON.parse(c); console.log('Original parses OK'); } catch(e) {
  const m = e.message.match(/position (\d+)/);
  console.log('Original error:', e.message);
  if (m) console.log('Original ctx:', JSON.stringify(c.substring(parseInt(m[1])-15, parseInt(m[1])+15)));
}
console.log('Total length:', c.length);
