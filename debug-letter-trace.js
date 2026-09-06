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
        i++;
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

// Test on letter-writing file
const path = 'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json';
const content = fs.readFileSync(path, 'utf8');

console.log('=== Letter-writing file fix test ===');
console.log('Original length:', content.length);

const fixed = fixJSON(content);
console.log('Fixed length:', fixed.length);
console.log('Same content?', content === fixed);

try {
  JSON.parse(fixed);
  console.log('Fixed: VALID');
} catch (e) {
  console.log('Fixed: BROKEN -', e.message.substring(0, 80));
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at position:', pos);
    console.log('Result context:', JSON.stringify(fixed.substring(Math.max(0, pos-30), pos+30)));
  }
}

// Now compare the two around position 6491
console.log('\n=== Comparison around position 6491 ===');
console.log('Original:', JSON.stringify(content.substring(6480, 6510)));
console.log('Fixed:   ', JSON.stringify(fixed.substring(6480, 6510)));

// Trace through the fix logic manually for this region
console.log('\n=== Manual trace of state machine ===');
let result = '';
let i = 0;
let inString = false;
for (; i < 6520 && i < content.length; i++) {
  const ch = content[i];
  const code = ch.charCodeAt(0);
  const chr = code < 32 ? `\\x${code.toString(16)}` : ch;
  
  if (!inString) {
    if (ch === '"') { inString = true; result += ch; console.log(`[${i}] OUT->IN`); }
    else { result += ch; console.log(`[${i}] OUT: '${chr}'`); }
  } else {
    if (code === 13) { result += '\\r'; console.log(`[${i}] IN: CR -> \\r`); }
    else if (code === 10) { result += '\\n'; console.log(`[${i}] IN: LF -> \\n`); }
    else if (ch === '"') {
      let j = i + 1;
      while (j < content.length && /\s/.test(content[j])) j++;
      const isTerm = j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':';
      if (isTerm) { result += ch; inString = false; console.log(`[${i}] IN: TERM quote`); }
      else { result += '\\"'; console.log(`[${i}] IN: ESC quote`); }
    } else if (ch === '\\') {
      let j = i + 1;
      while (j < content.length && content[j] === '\\') j++;
      const count = j - i;
      if (count % 2 === 1) {
        if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
          result += '\\'.repeat(count); result += content[j]; console.log(`[${i}] IN: ESC_SEQ '${content[j]}'`); i = j; // extra i++ at loop end
        } else {
          result += '\\'.repeat(count + 1); console.log(`[${i}] IN: BAD_ESC`); i = j - 1;
        }
      } else {
        result += '\\'.repeat(count); console.log(`[${i}] IN: PAIR_BS(${count})`); i = j - 1;
      }
    } else if (code < 0x20) {
      result += '\\u' + code.toString(16).padStart(4, '0'); console.log(`[${i}] IN: CONTROL`);
    } else {
      result += ch; console.log(`[${i}] IN: '${ch}'`);
    }
  }
}
console.log('\nResult snippet:', JSON.stringify(result.substring(result.length - 50)));

// Check if result parses
try {
  JSON.parse(result);
  console.log('Manual trace: VALID');
} catch (e) {
  console.log('Manual trace: BROKEN -', e.message);
}
