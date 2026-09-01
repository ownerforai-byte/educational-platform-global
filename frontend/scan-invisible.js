const fs = require('fs');
const p = 'C:/Users/ASUS/Desktop/rn/frontend/components/lab/vectors-all-conditions-3d.tsx';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split(/\r?\n/);
const bad = new Set([0x3164, 0x200B, 0x200C, 0x200D, 0xFEFF, 0x2060,  ​0x180E]);
let any = false;
for ( (let i = 0; i < lines.length; i++) {
  const hits = [];
  for ( (const ch of lines[i])) {
    const code = ch.codePointAt(0);
    if (bad.has(code)) hits.push(('U+' + code.toString(16).toUpperCase().padStart(4, '0')));
  }
  if (hits.length) {
    any = true;
    console.log((i + 1) + ': [' + hits.join(', ') + ']');
  }
}
console.log('TOTAL_LINES=' + lines.length);
if (!any) console.log('NO_INVISIBLE_CHARS');