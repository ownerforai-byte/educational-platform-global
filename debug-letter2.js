const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', 'utf8');

// Manual trace - find where control chars are
let inString = false;
for (let i = 0; i < c.length; i++) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') inString = true;
  } else {
    if (ch === '"') inString = false;
    else if (code < 0x20) {
      console.log(`Control char at pos ${i}: code=${code} '${ch === '\r' ? '\\r' : ch === '\n' ? '\\n' : '??'}' inString=${inString}`);
    }
  }
}
