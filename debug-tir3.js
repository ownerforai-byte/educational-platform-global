const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Reproduce fixOnePass with extra logging
function fixOnePass(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let changed = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      result += ch;
      i++;
    } else {
      if (ch === '"') {
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':') {
          result += ch;
          inString = false;
          i++;
        } else {
          console.log(`Escaping quote at ${i}, next char: '${ch}' '${content[j]}'`);
          result += '\\"';
          i++;
          changed = true;
        }
      } else if (ch === '\\') {
        const nextCh = content[i + 1];
        if (nextCh === undefined) {
          result += '\\\\'; i++; changed = true;
        } else if ('\"\\/bfnrtu'.includes(nextCh)) {
          result += ch + nextCh; i += 2;
        } else if (nextCh === '\\') {
          let j = i;
          while (j < content.length && content[j] === '\\') j++;
          const count = j - i;
          if (count % 2 === 1) { result += '\\'.repeat(count + 1); i = j; changed = true; }
          else { result += '\\'.repeat(count); i = j; }
        } else {
          result += '\\\\'; i++; changed = true;
        }
      } else if (code < 0x20) {
        result += '\\u' + code.toString(16).padStart(4, '0'); i++; changed = true;
      } else {
        result += ch; i++;
      }
    }
  }
  
  return { content: result, changed };
}

console.log('Original length:', c.length);
const { content: fixed, changed } = fixOnePass(c);
console.log('Changed:', changed);
console.log('Fixed length:', fixed.length);

// Check diff
let diffCount = 0;
for (let i = 0; i < Math.max(c.length, fixed.length); i++) {
  if (c[i] !== fixed[i]) { diffCount++; console.log(`Diff at ${i}: orig='${c[i]}' fixed='${fixed[i]}'`); }
}
console.log('Total diffs:', diffCount);

try { JSON.parse(fixed); console.log('Fixed: PARSES OK'); } catch(e) { console.log('Fixed: FAIL -', e.message); }
