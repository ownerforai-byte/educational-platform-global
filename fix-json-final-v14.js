const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  // Step 1: Fix triple-escaped quotes (\"\"\"title\"\"\") -> ("title")
  // This fixes files where a previous script double/triple-escaped property names
  content = content.replace(/\\\"\\\"\\\"([^"]+)\\\"\\\"\\\"/g, '"$1"');
  
  // Step 2: Fix markdown-style bold markers that leaked outside strings (**text**)
  // These appear as "**..." inside notes arrays but sometimes the closing ** ends up outside
  // Actually, the real issue is the JSON structure itself is broken. 
  // Let's skip this step and handle each error type separately below.
  
  // Step 3: Fix raw control characters inside strings
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
        result += ch;
        prevBackslash = true;
        i++;
      } else if (ch === '"') {
        // Check if this quote terminates the string
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':') {
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++;
        }
      } else if (code < 0x20) {
        // Control character inside string - escape as \uXXXX
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        prevBackslash = false;
        i++;
      }
    }
  }
  
  return result;
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
