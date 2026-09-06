const fs = require('fs');

// Read the current (partially fixed) file
const file = 'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json';
const content = fs.readFileSync(file, 'utf8');

console.log('Current content start:');
console.log(content.substring(0, 300));
console.log('\n---\n');

// Now apply the repair logic
function repair(content) {
  console.log('Step 1: Replacing \\" with "');
  let repaired = content.replace(/\\"/g, '"');
  console.log(`After step 1, length: ${repaired.length}`);
  
  console.log('Step 2: Fixing multiple quotes');
  repaired = repaired.replace(/""+/g, '"');
  console.log(`After step 2, length: ${repaired.length}`);
  
  console.log('Step 3: State machine');
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
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
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

const repaired = repair(content);
console.log('\nFinal result length:', repaired.length);
console.log('First 300 chars:');
console.log(repaired.substring(0, 300));

// Try to parse
try {
  JSON.parse(repaired);
  console.log('\nVALID JSON!');
} catch (e) {
  console.log('\nSTILL BROKEN:', e.message);
  const m = /position (\d+)/.exec(e.message);
  if (m) {
    const pos = parseInt(m[1]);
    console.log('Error at:', pos);
    console.log('Context:', JSON.stringify(repaired.substring(pos-30, pos+30)));
  }
}
