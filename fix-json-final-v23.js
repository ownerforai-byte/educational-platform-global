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
      } else {
        result += ch;
        i++;
      }
    } else {
      // Inside a string
      if (code === 13) {
        // Literal \r -> escape as \r
        result += '\\r';
        i++;
      } else if (code === 10) {
        // Literal \n -> escape as \n  
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
          i++;
        }
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            // Valid escape sequence - output the backslashes and the escaped char
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1; // Skip past the escaped char
          } else {
            // Invalid escape - escape the final backslash
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          // Even count - all backslashes pair up
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

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Single pass fix
  content = fixJSON(content);
  
  // Write and verify
  fs.writeFileSync(filePath, content, 'utf8');
  
  try {
    JSON.parse(content);
    return true;
  } catch (e) {
    return false;
  }
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Processing ${files.length} files...`);

let fixed = 0, failed = 0, unchanged = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
    unchanged++;
  } catch (e) {
    if (processFile(file)) {
      fixed++;
      console.log(`Fixed: ${file.split('/').pop()}`);
    } else {
      failed++;
      console.log(`Failed: ${file.split('/').pop()}`);
    }
  }
}

// Final verification
console.log('\nFinal verification:');
let stillBroken = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    stillBroken++;
    console.log(`STILL BROKEN: ${file.split('/').pop()} - ${e.message.substring(0, 80)}`);
  }
}

console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${unchanged} unchanged, ${stillBroken} still broken`);
