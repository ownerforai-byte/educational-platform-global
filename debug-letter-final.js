const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', 'utf8');

// Trace control chars in letter-writing file
// The fix should escape \r\n inside strings as \u000d \u000a
function fixOnePass(content) {
  let result = '';
  let i = 0;
  let inString = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        result += ch;
      } else if (ch === '\\') {
        result += ch;
      } else {
        result += ch;
      }
      i++;
    } else {
      if (ch === '"') {
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        const isTerm = j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':';
        if (isTerm) {
          result += ch;
          inString = false;
          i++;
        } else {
          result += '\\"';
          inString = false;
          i++;
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j >= content.length || !'\"\\/bfnrtu'.includes(content[j])) {
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
      } else if (code < 0x20) {
        console.log(`Control char at ${i}: code=${code} -> \\u${code.toString(16).padStart(4,'0')}`);
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  return result;
}

const fixed = fixOnePass(c);
console.log('\norig:', c.length, 'fixed:', fixed.length);

try { JSON.parse(fixed); console.log('Fixed: PARSES OK'); } catch(e) { console.log('Fixed: FAIL', e.message.substring(0, 80)); }
