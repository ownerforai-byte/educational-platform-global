const fs = require('fs');

function repair(content) {
  // Step 1: Replace all \"/ backslash-quote with just "
  let repaired = content.replace(/\\"/g, '"');

  // Step 2: Fix any multiple consecutive quotes (e.g., """" -> "")
  repaired = repaired.replace(/""+/g, '"');

  // Step 3: Full state machine to fix any remaining issues
  let result = '';
  let i = 0;
  let inString = false;

  while (i < repaired.length) {
    const ch = repaired[i];
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
      // Inside a string
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
        // Potential string terminator - look ahead
        let j = i + 1;
        while (j < repaired.length && /\s/.test(repaired[j])) j++;
        const isTerminator = j >= repaired.length ||
          repaired[j] === ',' || repaired[j] === ']' ||
          repaired[j] === '}' || repaired[j] === ':';

        if (isTerminator) {
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < repaired.length && repaired[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < repaired.length && '\"\\/bfnrtu'.includes(repaired[j])) {
            result += '\\'.repeat(count);
            result += repaired[j];
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
        // Control character - escape it
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
const file = 'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json';
let content = fs.readFileSync(file, 'utf8');
console.log('Original length:', content.length);

// Show what step 1 does
let step1 = content.replace(/\\"/g, '"');
console.log('After step 1:', step1.length);
console.log('Change:', content.length - step1.length, 'chars removed');

// Show what step 2 does
let step2 = step1.replace(/""+/g, '"');
console.log('After step 2:', step2.length);
console.log('Change:', step1.length - step2.length, 'chars removed');

// Now run full repair
const repaired = repair(content);
console.log('After repair:', repaired.length);

// Check around position 6491
console.log('\nContext in repaired:', JSON.stringify(repaired.substring(6475, 6510)));

// Try to parse
try {
  JSON.parse(repaired);
  console.log('\nVALID!');
} catch (e) {
  console.log('\nBROKEN:', e.message);
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at:', pos);
    console.log('Context:', JSON.stringify(repaired.substring(pos-30, pos+30)));
  }
}