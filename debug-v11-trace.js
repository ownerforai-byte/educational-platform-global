const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
let c = fs.readFileSync(path, 'utf8');

// Trace state machine
let i = 0;
let inString = false;
let prevBackslash = false;
let issues = [];

while (i < c.length) {
  const ch = c[i];
  
  if (!inString) {
    if (ch === '"') {
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
      while (j < c.length && /[\s]/.test(c[j])) j++;
      if (j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}') {
        inString = false;
        i++;
      } else {
        issues.push({ pos: i, char: c[i], nextChars: c.substring(i+1, i+20) });
        console.log('ISSUE at', i, ':', JSON.stringify(c.substring(i-5, i+20)));
        // Simulate fix
        c = c.substring(0, i) + '\\' + c.substring(i);
        console.log('Fixed - new string around pos:', JSON.stringify(c.substring(i-5, i+22)));
        i += 2;
      }
    } else {
      prevBackslash = false;
      i++;
    }
  }
}

console.log('\nTotal issues found:', issues.length);

// Now try to parse the fixed version
try {
  JSON.parse(c);
  console.log('After fixing issues, PARSES OK');
} catch(e) {
  console.log('After fixing issues, still FAILS:', e.message);
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const p = parseInt(m[1]);
    console.log('Next issue at', p, ':', JSON.stringify(c.substring(p-10, p+20)));
  }
}
