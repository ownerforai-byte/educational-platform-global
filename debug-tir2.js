const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Manual trace of state machine through positions 1470-1510
let inString = false;
let prevBackslash = false;

for (let i = 0; i < c.length; i++) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') {
      inString = true;
      prevBackslash = false;
    } else if (ch === '\\') {
      prevBackslash = true;
    } else {
      prevBackslash = false;
    }
  } else {
    if (prevBackslash) {
      prevBackslash = false;
    } else if (ch === '\\') {
      prevBackslash = true;
    } else if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const isTerminator = j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':';
      if (!isTerminator) {
        console.log(`Position ${i}: UNESCAPED QUOTE detected! next_char='${c[j]||'END'}' code=${c[j]?.charCodeAt(0)}`);
      }
      inString = !isTerminator; // if not terminator, we stay in string
    } else if (code < 0x20) {
      // control char - would escape
    } else {
      prevBackslash = false;
    }
  }
  
  if (i >= 1470 && i <= 1510) {
    console.log(`pos ${i}: '${ch}' code=${code} inString=${inString} prevBS=${prevBackslash}`);
  }
}
