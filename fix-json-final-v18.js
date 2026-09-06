const fs = require('fs');
const { globSync } = require('glob');

function fixOnePass(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let changed = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      // Outside strings: just copy
      result += ch;
      i++;
    } else {
      // Inside a string
      if (ch === '"') {
        // Potential string terminator - check what follows
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':') {
          // Valid terminator
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++;
          changed = true;
        }
      } else if (ch === '\\') {
        // Look ahead at the next char after this backslash
        const nextCh = content[i + 1];
        if (nextCh === undefined) {
          // Trailing backslash at end of string - invalid
          result += '\\\\';
          i++;
          changed = true;
        } else if ('\"\\/bfnrtu'.includes(nextCh)) {
          // Valid escape sequence - copy as-is
          result += ch + nextCh;
          i += 2;
        } else if (nextCh === '\\') {
          // Multiple consecutive backslashes - count them
          let j = i;
          while (j < content.length && content[j] === '\\') j++;
          const count = j - i;
          if (count % 2 === 1) {
            // Odd number: last backslash tries to escape the next char
            // This next char is not a valid JSON escape (checked above)
            // Fix: add one more backslash to make the pair even
            result += '\\'.repeat(count + 1);
            i = j;
            changed = true;
          } else {
            // Even number: all pair up as escaped backslashes
            result += '\\'.repeat(count);
            i = j;
          }
        } else {
          // Invalid escape like \g, \p etc. - double the backslash
          result += '\\\\';
          i++;
          changed = true;
        }
      } else if (code < 0x20) {
        // Control character - escape as \uXXXX
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

function fixJSON(content) {
  // Step 1: Fix triple-escaped quotes in property names
  content = content.replace(/\\\"\\\"\\\"([^"]+)\\\"\\\"\\\"/g, '"$1"');
  
  // Iterative fix
  let iterations = 0;
  while (iterations < 200) {
    try {
      JSON.parse(content);
      return content;
    } catch (e) {
      const { content: fixed, changed } = fixOnePass(content);
      if (!changed) {
        // No progress made - can't fix automatically
        break;
      }
      content = fixed;
      iterations++;
    }
  }
  
  return content;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixed = fixJSON(content);
  
  try {
    JSON.parse(fixed);
    fs.writeFileSync(filePath, fixed, 'utf8');
    return true;
  } catch (e) {
    console.log('Still broken:', filePath.split('/').pop(), '-', e.message.substring(0, 80));
    return false;
  }
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Checking ${files.length} files...`);

let fixed = 0, failed = 0, unchanged = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
    unchanged++;
  } catch (e) {
    if (processFile(file)) {
      fixed++;
      console.log('Fixed:', file.split('/').pop());
    } else {
      failed++;
    }
  }
}

// Final verification
let remaining = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    remaining++;
    console.log('STILL BROKEN:', file.split('/').pop(), '-', e.message.substring(0, 60));
  }
}
console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${unchanged} unchanged, ${remaining} still broken`);
