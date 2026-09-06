const fs = require('fs');
const { globSync } = require('glob');

// Fix one pass: escapes unescaped quotes, bad escapes, and control chars.
// Returns the fixed content and a boolean indicating if anything changed.
function fixOnePass(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let prevBackslash = false;
  let changed = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        result += ch;
        prevBackslash = true;
      } else {
        result += ch;
        prevBackslash = false;
      }
      i++;
    } else {
      if (prevBackslash) {
        // We just saw a backslash, check what follows
        const nextCh = content[i + 1];
        if (nextCh === undefined) {
          // Trailing backslash at end of string - invalid
          result += '\\';
          prevBackslash = false;
          i++;
          changed = true;
        } else if ('\"/bfnrtu'.includes(nextCh)) {
          // Valid escape sequence
          result += ch + nextCh;
          prevBackslash = false;
          i += 2;
        } else if (nextCh === '\\') {
          // Multiple backslashes - check if odd or even count
          // Count consecutive backslashes
          let j = i;
          while (j < content.length && content[j] === '\\') j++;
          const backslashRun = j - i;
          if (backslashRun % 2 === 1) {
            // Odd number of backslashes: last one escapes the next char
            // The char after the run is not a valid escape - this is bad
            // Fix: add one more backslash to make the run even
            result += content.substring(i, j) + '\\';
            i = j;
            prevBackslash = false;
            changed = true;
          } else {
            // Even number - they pair up as escaped backslashes
            result += content.substring(i, j);
            i = j;
            prevBackslash = false;
          }
        } else {
          // Invalid escape sequence like \g, \p, etc.
          // Fix: double the backslash
          result += '\\\\';
          i++;
          prevBackslash = false;
          changed = true;
        }
      } else if (ch === '\\') {
        result += ch;
        prevBackslash = true;
        i++;
      } else if (ch === '"') {
        // Check if this is a string terminator
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
      } else if (code < 0x20) {
        // Control character inside string - escape as \uXXXX
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
        changed = true;
      } else {
        result += ch;
        prevBackslash = false;
        i++;
      }
    }
  }
  
  return { content: result, changed };
}

function fixJSON(content) {
  // Step 1: Fix triple-escaped quotes in property names
  content = content.replace(/\\\"\\\"\\\"([^"]+)\\\"\\\"\\\"/g, '"$1"');
  
  // Iterative fix: keep applying until parse succeeds or no progress
  let iterations = 0;
  while (iterations < 200) {
    try {
      JSON.parse(content);
      return content;
    } catch (e) {
      const { content: fixed, changed } = fixOnePass(content);
      if (!changed) break;
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
