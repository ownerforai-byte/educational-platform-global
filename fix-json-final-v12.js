const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  // Fix 1: control characters inside strings (raw newlines, etc.)
  // We need to find raw control chars that are not allowed in JSON strings
  // Allowed in JSON strings: \t (9), \n (10), \r (13) — wait, those ARE bad in JSON strings!
  // Actually JSON spec says control chars (0x00-0x1F) must be escaped.
  // So even \n (10), \r (13), \t (9) inside a JSON string literal are errors.
  // They must appear as \n, \r, \t in the JSON source.
  
  // Strategy: use a state machine to find control chars inside strings and escape them
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
      } else {
        result += ch;
        prevBackslash = false;
      }
      i++;
    } else {
      if (prevBackslash) {
        // This char is escaped - just include it
        result += ch;
        prevBackslash = false;
        i++;
      } else if (ch === '\\') {
        result += ch;
        prevBackslash = true;
        i++;
      } else if (ch === '"') {
        // Check if this is a terminator or unescaped quote
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}') {
          // String terminator
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++;
        }
      } else if (code < 0x20) {
        // Control character inside string - must be escaped
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
    console.log('Still broken:', filePath, '-', e.message);
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
      console.log('Fixed:', file);
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
  }
}
console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${unchanged} unchanged, ${remaining} still broken`);
