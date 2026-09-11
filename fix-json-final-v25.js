const fs = require('fs');
const { globSync } = require('glob');

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
      // Inside a string
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
        // Potential string terminator
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
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++; // Advance past the quote
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1; // Skip past the escaped char
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

const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  // ... other failed files
];

// Re-run on all files
const allFiles = globSync('content/ravikishan/**/*.json');
for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let fixed = fixJSON(content);
  fs.writeFileSync(file, fixed, 'utf8');
  try {
    JSON.parse(fixed);
  } catch (e) {
    console.log(`Failed: ${file}`);
  }
}
