const fs = require('fs');

// Test on ORIGINAL TIR file (from git)
const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const content = fs.readFileSync(file, 'utf8');

console.log('Original length:', content.length);
console.log('First 200 chars:', JSON.stringify(content.substring(0, 200)));

// Step 1: Replace \" with "
let step1 = content.replace(/\\"/g, '"');
console.log('\nAfter step 1 (replace \\" with "), length:', step1.length);
console.log('First 200 chars:', JSON.stringify(step1.substring(0, 200)));

// Step 2: Fix multiple quotes
let step2 = step1.replace(/""+/g, '"');
console.log('\nAfter step 2 (fix multiple quotes), length:', step2.length);
console.log('First 200 chars:', JSON.stringify(step2.substring(0, 200)));

// Now trace through state machine
let i = 0;
let inString = false;
let result = '';

for (; i < step2.length; i++) {
  const ch = step2[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') {
      inString = true;
      result += ch;
    } else {
      result += ch;
    }
  } else {
    if (code === 13) {
      result += '\\r';
    } else if (code === 10) {
      result += '\\n';
    } else if (ch === '"') {
      let j = i + 1;
      while (j < step2.length && /\s/.test(step2[j])) j++;
      const isTerm = j >= step2.length || step2[j] === ',' || step2[j] === ']' || step2[j] === '}' || step2[j] === ':';
      
      if (isTerm) {
        result += ch;
        inString = false;
      } else {
        // Unescaped quote inside string - escape it
        result += '\\"';
      }
    } else if (ch === '\\') {
      let j = i + 1;
      while (j < step2.length && step2[j] === '\\') j++;
      const count = j - i;
      if (count % 2 === 1) {
        if (j < step2.length && '\"\\/bfnrtu'.includes(step2[j])) {
          result += '\\'.repeat(count);
          result += step2[j];
          i = j;
        } else {
          result += '\\'.repeat(count + 1);
          i = j - 1;
        }
      } else {
        result += '\\'.repeat(count);
        i = j - 1;
      }
    } else if (code < 0x20) {
      result += '\\u' + code.toString(16).padStart(4, '0');
    } else {
      result += ch;
    }
  }
}

if (inString) result += '"';

console.log('\nResult length:', result.length);
console.log('Result first 200:', JSON.stringify(result.substring(0, 200)));
console.log('Result around 1500:', JSON.stringify(result.substring(1490, 1520)));

// Try to parse
try {
  JSON.parse(result);
  console.log('\nResult is VALID!');
} catch (e) {
  console.log('\nResult is BROKEN:', e.message);
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at:', pos);
    console.log('Context:', JSON.stringify(result.substring(pos - 30, pos + 30)));
  }
}