const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');

// State machine with detailed logging
let i = 0;
let inString = false;
let prevBackslash = false;

while (i < c.length) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') {
      console.log(`[${i}] ENTER string: next=${JSON.stringify(c.substring(i+1,i+6))}`);
      inString = true;
      prevBackslash = false;
    } else if (ch === '\\') {
      prevBackslash = true;
    } else {
      prevBackslash = false;
    }
    i++;
  } else {
    if (prevBackslash) {
      prevBackslash = false;
      i++;
    } else if (ch === '\\') {
      prevBackslash = true;
      i++;
    } else if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const nextChar = j < c.length ? c[j] : 'END';
      if (j >= c.length || nextChar === ',' || nextChar === ']' || nextChar === '}') {
        console.log(`[${i}] EXIT string (terminator): next=${nextChar}`);
        inString = false;
        i++;
      } else {
        console.log(`[${i}] UNESCAPED QUOTE inside string: next=${JSON.stringify(nextChar)}`);
        i += 2; // skip past escaped quote
      }
    } else {
      prevBackslash = false;
      i++;
    }
  }
}
