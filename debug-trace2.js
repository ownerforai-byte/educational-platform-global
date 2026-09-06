const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Full state trace showing every transition
let inString = false;
for (let i = 0; i < c.length; i++) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') {
      inString = true;
      if (i >= 1470 && i <= 1510) console.log(`pos ${i}: ENTER string ('")`);
    }
  } else {
    if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const isTerm = j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':';
      if (i >= 1470 && i <= 1510) {
        console.log(`pos ${i}: '${ch}' isTerm=${isTerm} next='${c[j]||'END'}' -> ${isTerm ? 'EXIT string' : 'STAY in string'}`);
      }
      if (!isTerm) {
        // This would be escaped in the fix
        if (i >= 1470 && i <= 1510) console.log(`  -> Would escape this quote!`);
      }
      inString = isTerm;
    }
  }
}
