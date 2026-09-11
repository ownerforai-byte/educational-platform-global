const fs = require('fs');

const tirPath = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(tirPath, 'utf8');

console.log('=== Detailed state machine trace for TIR ===');
console.log('File length:', content.length);

// Trace around position 1500-1560
let result = '';
let i = 0;
let inString = false;
let logDetail = [];

while (i < content.length) {
  const ch = content[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') {
      inString = true;
      result += ch;
      if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] OUT->IN: "${ch}"`);
    } else {
      result += ch;
      i++;
    }
  } else {
    if (code === 13) {
      result += '\\r';
      i++;
      if (i >= 1490 && i <= 1560) logDetail.push(`[${i-1}] IN: CR -> \\r`);
    } else if (code === 10) {
      result += '\\n';
      i++;
      if (i >= 1490 && i <= 1560) logDetail.push(`[${i-1}] IN: LF -> \\n`);
    } else if (ch === '"') {
      let j = i + 1;
      while (j < content.length && /\s/.test(content[j])) j++;
      const isTerminator = j >= content.length || 
        content[j] === ',' || content[j] === ']' || 
        content[j] === '}' || content[j] === ':';
      
      if (isTerminator) {
        result += ch;
        inString = false;
        if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] IN: TERM quote -> OUT`);
        i++;
      } else {
        result += '\\"';
        if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] IN: ESC quote -> \\"`);
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
          if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] IN: ESC seq (count=${count}, next='${content[j]}')`);
          i = j + 1;
        } else {
          result += '\\'.repeat(count + 1);
          if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] IN: BAD ESC (count=${count}, next='${content[j] || 'EOF'}')`);
          i = j;
        }
      } else {
        result += '\\'.repeat(count);
        if (i >= 1490 && i <= 1560) logDetail.push(`[${i}] IN: PAIR backslashes (count=${count})`);
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

console.log('\n=== Detail log (positions 1490-1560) ===');
for (const line of logDetail) console.log(line);

console.log('\n=== Comparing original vs result at position ~1530 ===');
for (let i = 1525; i < Math.min(1555, content.length); i++) {
  const oc = content[i];
  const rc = result[i] || '(end)';
  const note = oc !== rc ? ' *** DIFFERS ***' : '';
  console.log(`pos ${i}: orig='${oc}'(code ${oc.charCodeAt(0)}) result='${rc}'(code ${rc.charCodeAt(0)})${note}`);
}

console.log('\n=== Result around position 1530 ===');
console.log('Result substring:', JSON.stringify(result.substring(1525, 1555)));
console.log('Original substring:', JSON.stringify(content.substring(1525, 1555)));

// Check if result parses
try {
  JSON.parse(result);
  console.log('\nResult PARSES successfully!');
} catch (e) {
  console.log('\nResult still BROKEN:', e.message);
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at position', pos);
    console.log('Context:', JSON.stringify(result.substring(Math.max(0,pos-30), pos+30)));
  }
}
