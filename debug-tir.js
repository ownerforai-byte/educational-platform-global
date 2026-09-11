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

// Test on TIR file
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');
console.log('Original length:', c.length);
console.log('Try parsing:', (() => { try { JSON.parse(c); return 'OK'; } catch(e) { return 'FAIL: ' + e.message; } })());

const { content: fixed, changed } = fixOnePass(c);
console.log('Changed:', changed);
console.log('Fixed length:', fixed.length);
console.log('Diff at position 1490-1510:');
for (let i = 1490; i < Math.min(1510, c.length) && i < fixed.length; i++) {
  const orig = c[i] || '(END)';
  const fixd = fixed[i] || '(END)';
  const marker = orig !== fixd ? ' ***' : '';
  console.log(`  ${i}: orig='${orig}' fixd='${fixd}'${marker}`);
}

// Check if fixed parses
try { JSON.parse(fixed); console.log('Fixed parses: OK'); } catch(e) { console.log('Fixed parses: FAIL -', e.message); }
