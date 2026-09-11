const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  let result = '';
  let i = 0;
  let inString = false;
  
  while (i < content.length) {
    const ch = content[i];
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        result += ch;
      } else {
        result += ch;
      }
      i++;
    } else {
      if (ch === '"') {
        // Check if this quote terminates the string
        let j = i + 1;
        // Skip whitespace
        while (j < content.length && /\s/.test(content[j])) j++;
        
        // Potential terminators: , ] } : or end of file
        const isTerminator = j >= content.length || 
          content[j] === ',' || content[j] === ']' || 
          content[j] === '}' || content[j] === ':';
          
        if (isTerminator) {
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - ESCAPE IT but STAY in string
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        // Count consecutive backslashes
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        
        // Even number of backslashes (all escaped), or odd (last one escapes next)
        if (count % 2 === 1) {
          // Odd: check the next character
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            // Valid escape
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1;
          } else {
            // Invalid escape - escape the final backslash
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          // Even - all pair up, keep as is
          result += '\\'.repeat(count);
          i = j;
        }
      } else if (ch.charCodeAt(0) < 0x20) {
        // Control character inside string
        result += '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  return result;
}

function iterativeFix(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let iterations = 0;
  
  while (iterations < 5) {
    try {
      JSON.parse(content);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (e) {
      const fixed = fixJSON(content);
      if (fixed === content) break;
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
      console.log('Fixed:', file);
    } else {
      failed++;
      console.log('Failed:', file);
    }
  }
}

// Final verification
console.log(`\nVerification:`);
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.log('STILL BROKEN:', file);
  }
}
console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${unchanged} unchanged`);
