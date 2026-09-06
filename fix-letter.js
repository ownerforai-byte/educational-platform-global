const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', 'utf8');

// Fix: escape control chars and handle unescaped quotes
let result = '';
let i = 0;
let inString = false;
let prevBS = false;

while (i < c.length) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    result += ch;
    if (ch === '"') inString = true;
    prevBS = false;
    i++;
  } else {
    if (prevBS) {
      result += ch;
      prevBS = false;
      i++;
    } else if (ch === '\\') {
      // Count consecutive backslashes
      let j = i + 1;
      while (j < c.length && c[j] === '\\') j++;
      const count = j - i;
      if (count % 2 === 1) {
        // Odd: last backslash escapes next char
        if (j >= c.length || !'\"\\/bfnrtu'.includes(c[j])) {
          // Invalid escape - double the backslash
          result += '\\'.repeat(count + 1);
          i = j;
        } else {
          result += '\\'.repeat(count);
          i = j;
        }
      } else {
        result += '\\'.repeat(count);
        i = j;
      }
    } else if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const isTerminator = j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':';
      if (isTerminator) {
        result += ch;
        inString = false;
        i++;
      } else {
        result += '\\"';
        i++;
      }
    } else if (code < 0x20) {
      result += '\\u' + code.toString(16).padStart(4, '0');
      i++;
    } else {
      result += ch;
      i++;
    }
  }
}

fs.writeFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', result, 'utf8');

try {
  JSON.parse(result);
  console.log('FIXED: Letter-writing intro now parses OK');
} catch(e) {
  console.log('STILL BROKEN:', e.message);
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const p = parseInt(m[1]);
    console.log('Context:', JSON.stringify(result.substring(Math.max(0,p-20), p+20)));
  }
}
