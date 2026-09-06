const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Reproduce fixOnePass with detailed logging at position 1498
function fixOnePass(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let changed = false;
  
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
        console.log(`pos ${i}: quote, isTerm=${isTerm}, next='${content[j]||'END'}' (${j})`);
        if (isTerm) {
          result += ch;
          inString = false;
          i++;
        } else {
          console.log(`  -> ESCAPING quote at ${i}`);
          result += '\\"';
          i++;
          changed = true;
        }
      } else if (ch === '\\') {
        result += ch;
        i++;
      } else if (code < 0x20) {
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
        changed = true;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  return { content: result, changed };
}

const { content: fixed, changed } = fixOnePass(c);
console.log('Changed:', changed);
