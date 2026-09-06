const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Minimal trace: just show inString state around pos 1476-1510
let inString = false;
for (let i = 1470; i <= 1510; i++) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') inString = true;
  } else {
    if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const isTerm = j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':';
      console.log(`pos ${i}: '${ch}' inString=${inString} -> isTerm=${isTerm}, next='${c[j]||'END'}'`);
      inString = !isTerm;
    } else if (code < 0x20) {
      console.log(`pos ${i}: control char ${code}`);
    } else {
      // normal char
    }
  }
}
