const fs = require('fs');

// Test the fix function with the TIR file
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

// Manual trace through positions 1510-1545
console.log('=== Manual trace of fix function ===\n');
let result = '';
let i = 0;
let inString = false;
let traceLog = [];

while (i < content.length) {
  const ch = content[i];
  const code = ch.charCodeAt(0);
  const chr = code < 32 ? `\\x${code.toString(16)}` : ch;
  
  if (!inString) {
    if (ch === '"') {
      inString = true;
      result += ch;
      if (i >= 1508 && i <= 1545) traceLog.push(`[${i}] OUT->IN char=${chr} result_len=${result.length}`);
    } else {
      result += ch;
      i++;
    }
  } else {
    if (code === 13) {
      result += '\\r'; i++;
      if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:CR->\\r result_len=${result.length}`);
    } else if (code === 10) {
      result += '\\n'; i++;
      if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:LF->\\n result_len=${result.length}`);
    } else if (ch === '"') {
      let j = i + 1;
      while (j < content.length && /\s/.test(content[j])) j++;
      const isTerm = j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':';
      if (isTerm) {
        result += ch; inString = false; i++;
        if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:TERM result_len=${result.length}`);
      } else {
        result += '\\"'; i++;
        if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:ESC_QUOTE result_len=${result.length}`);
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
          if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:ESC_SEQ(${content[j]}) result_len=${result.length}`);
        } else {
          result += '\\'.repeat(count + 1);
          i = j;
          if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:BAD_ESC result_len=${result.length}`);
        }
      } else {
        result += '\\'.repeat(count);
        i = j;
        if (i-1 >= 1508 && i-1 <= 1545) traceLog.push(`[${i-1}] IN:PAIR_BS(${count}) result_len=${result.length}`);
      }
    } else if (code < 0x20) {
      result += '\\u' + code.toString(16).padStart(4, '0'); i++;
    } else {
      result += ch; i++;
    }
  }
}

console.log('Trace log:');
for (const line of traceLog) console.log(line);

console.log('\n--- Comparing result around pos 1525-1550 ---');
const origSub = content.substring(1525, 1550);
const resSub = result.substring(1525, 1550);
console.log('Original:', JSON.stringify(origSub));
console.log('Result:  ', JSON.stringify(resSub));
console.log('Result bytes:', [...resSub].map(c => c.charCodeAt(0)).join(' '));

// Test if result parses
try {
  JSON.parse(result);
  console.log('\nResult: VALID JSON');
} catch (e) {
  console.log('\nResult: BROKEN');
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at position', pos);
    console.log('Result context:', JSON.stringify(result.substring(Math.max(0,pos-30), pos+30)));
  }
}
