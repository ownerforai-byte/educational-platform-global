const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  // Step 1: Fix triple-escaped quotes in property names
  content = content.replace(/\\\"\\\"\\\"([^"]+)\\\"\\\"\\\"/g, '"$1"');
  
  // Step 2: State machine fix for unescaped quotes and control characters
  let result = '';
  let i = 0;
  let inString = false;
  let prevBackslash = false;
  
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
        result += ch;
        prevBackslash = false;
        i++;
      } else if (ch === '\\') {
        // Handle consecutive backslashes
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          // Odd number of backslashes: last one escapes the next char
          // Check if the next char after the run is a valid escape
          if (j >= content.length || !'\"\\/bfnrtu'.includes(content[j])) {
            // Invalid escape - add one more backslash to make the pair even
            result += '\\'.repeat(count + 1);
            i = j;
            prevBackslash = false;
          } else {
            // Valid escape after odd backslashes - keep as-is
            result += '\\'.repeat(count);
            i = j;
            prevBackslash = false;
          }
        } else {
          // Even number of backslashes - they pair up
          result += '\\'.repeat(count);
          i = j;
          prevBackslash = false;
        }
      } else if (ch === '"') {
        // Check if this is a terminator by looking at what follows
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':') {
          // Valid terminator - the string ends here
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it AND close the string
          result += '\\"';
          inString = false;
          i++;
        }
      } else if (code < 0x20) {
        // Control char inside string - escape as \uXXXX
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
        prevBackslash = false;
      } else {
        result += ch;
        prevBackslash = false;
        i++;
      }
    }
  }
  
  return result;
}

// Iterative fix: keep applying until parse succeeds or no progress
function iterativeFix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let prevContent = '';
  let iterations = 0;
  
  while (iterations < 200) {
    try {
      JSON.parse(content);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (e) {
      const fixed = fixJSON(content);
      if (fixed === content) {
        // No change - can't fix automatically
        break;
      }
      content = fixed;
      iterations++;
    }
  }
  
  return false;
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Checking ${files.length} files...`);

let fixed = 0, failed = 0, unchanged = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
    unchanged++;
  } catch (e) {
    if (iterativeFix(file)) {
      fixed++;
      console.log('Fixed:', file.split('/').pop());
    } else {
      failed++;
      const c = fs.readFileSync(file, 'utf8');
      try { JSON.parse(c); } catch(e2) {
        console.log('Failed:', file.split('/').pop(), '-', e2.message.substring(0, 80));
      }
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
