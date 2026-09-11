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

// Test on TIR file
const path = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(path, 'utf8');

console.log('Testing fixJSON on TIR file...\n');

// Test with detailed logging
let result = '';
let i = 0;
let inString = false;
let errors = [];

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

// Check for issues
try {
  JSON.parse(result);
  console.log('Result is VALID JSON');
} catch (e) {
  console.log('Result is BROKEN');
  console.log(e.message);
  
  // Find the error position
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('\nError at position', pos);
    console.log('Result around error:', JSON.stringify(result.substring(Math.max(0, pos-50), pos+50)));
    
    // Check what's different from original
    console.log('\nComparing result vs original around error:');
    for (let k = Math.max(0, pos-10); k < Math.min(result.length, pos+10); k++) {
      const rc = result[k] || '(end)';
      const oc = content[k] || '(end)';
      const diff = rc !== oc ? ' *** DIFFER' : '';
      console.log(`  pos ${k}: result='${rc}'(code ${rc.charCodeAt(0)}) orig='${oc}'(code ${oc.charCodeAt(0)})${diff}`);
    }
  }
}
