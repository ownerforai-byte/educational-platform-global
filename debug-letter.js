const fs = require('fs');

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
          result += '\\"';
          i++;
          changed = true;
        }
      } else if (ch === '\\') {
        const nextCh = content[i + 1];
        if (nextCh === undefined) {
          result += '\\\\';
          i++;
          changed = true;
        } else if ('\"\\/bfnrtu'.includes(nextCh)) {
          result += ch + nextCh;
          i += 2;
        } else if (nextCh === '\\') {
          let j = i;
          while (j < content.length && content[j] === '\\') j++;
          const count = j - i;
          if (count % 2 === 1) {
            result += '\\'.repeat(count + 1);
            i = j;
            changed = true;
          } else {
            result += '\\'.repeat(count);
            i = j;
          }
        } else {
          result += '\\\\';
          i++;
          changed = true;
        }
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

// Test on letter-writing file
const c = fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', 'utf8');
console.log('Original length:', c.length);
try { JSON.parse(c); console.log('Original parses: OK'); } catch(e) { console.log('Original parses: FAIL -', e.message.substring(0, 80)); }

const { content: fixed, changed } = fixOnePass(c);
console.log('Changed:', changed);
console.log('Fixed length:', fixed.length);

// Check specific area around pos 6465
console.log('\nOriginal chars around 6460-6475:');
for (let i = 6460; i < 6475; i++) {
  const ch = c[i];
  console.log(`  ${i}: ${ch.charCodeAt(0)} '${ch === '\r' ? '\\r' : ch === '\n' ? '\\n' : ch}'`);
}
console.log('\nFixed chars around 6460-6475:');
for (let i = 6460; i < Math.min(6475, fixed.length); i++) {
  const ch = fixed[i];
  console.log(`  ${i}: ${ch.charCodeAt(0)} '${ch === '\r' ? '\\r' : ch === '\n' ? '\\n' : ch}'`);
}

try { JSON.parse(fixed); console.log('\nFixed parses: OK'); } catch(e) { console.log('\nFixed parses: FAIL -', e.message.substring(0, 80)); }
