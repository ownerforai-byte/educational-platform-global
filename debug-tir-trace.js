const fs = require('fs');

function fixJSON(content) {
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
      } else {
        result += ch;
        i++;
      }
    } else {
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        const isTerminator = j >= content.length || 
          content[j] === ',' || content[j] === ']' || 
          content[j] === '}' || content[j] === ':';
        
        if (isTerminator) {
          result += ch;
          inString = false;
          i++;
        } else {
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1;
          } else {
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          result += '\\'.repeat(count);
          i = j;
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
  
  if (inString) result += '"';
  return result;
}

const path = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(path, 'utf8');
console.log('Original length:', content.length);

try {
  JSON.parse(content);
  console.log('Original: VALID');
} catch (e) {
  console.log('Original: BROKEN -', e.message.substring(0, 80));
}

const result = fixJSON(content);
console.log('Result length:', result.length);

try {
  JSON.parse(result);
  console.log('Result: VALID');
} catch (e) {
  console.log('Result: BROKEN -', e.message.substring(0, 80));
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at position:', pos);
    console.log('Result context:', JSON.stringify(result.substring(Math.max(0, pos-40), pos+40)));
  }
}

// Now let's trace character by character around position 1510-1540
console.log('\n=== Step-by-step trace around 1510-1540 ===');
let r = '';
let i = 0;
let inStr = false;
for (let idx = 1500; idx < 1550; idx++) {
  const ch = content[idx];
  const code = ch.charCodeAt(0);
  const chr = code < 32 ? `\\x${code.toString(16)}` : ch;
  
  if (!inStr) {
    if (ch === '"') { inStr = true; r += ch; }
    else { r += ch; }
  } else {
    if (code === 13) { r += '\\r'; }
    else if (code === 10) { r += '\\n'; }
    else if (ch === '"') {
      let j = idx + 1;
      while (j < content.length && /\s/.test(content[j])) j++;
      const isTerm = j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':';
      if (isTerm) { r += ch; inStr = false; }
      else { r += '\\"'; }
    } else if (ch === '\\') {
      let j2 = idx + 1;
      while (j2 < content.length && content[j2] === '\\') j2++;
      const count = j2 - idx;
      if (count % 2 === 1) {
        if (j2 < content.length && '\"\\/bfnrtu'.includes(content[j2])) {
          r += '\\'.repeat(count); r += content[j2]; idx = j2; // idx will be incremented by loop
        } else {
          r += '\\'.repeat(count + 1);
        }
      } else {
        r += '\\'.repeat(count);
        idx = j2 - 1; // will be incremented
      }
    } else {
      r += ch;
    }
  }
  
  if (idx >= 1508 && idx <= 1542) {
    console.log(`pos ${idx}: char='${chr}' inString=${inStr} result_so_far_end='${JSON.stringify(r.slice(-20))}'`);
  }
}

console.log('\nFinal result snippet:', JSON.stringify(r.slice(-50)));
