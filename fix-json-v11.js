const fs = require('fs');
const { globSync } = require('glob');

function findUnescapedQuotes(content) {
  // Find all " that are inside strings but not preceded by \
  let i = 0;
  let inString = false;
  let prevBackslash = false;
  const issues = [];
  
  while (i < content.length) {
    const ch = content[i];
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevBackslash = false;
      } else if (ch === '\\') {
        prevBackslash = true;
      } else {
        prevBackslash = false;
      }
      i++;
    } else {
      if (prevBackslash) {
        // Previous char was \ - this char is escaped
        prevBackslash = false;
        i++;
      } else if (ch === '\\') {
        // Start of escape sequence
        prevBackslash = true;
        i++;
      } else if (ch === '"') {
        // Check if this is a string terminator or unescaped quote
        let j = i + 1;
        while (j < content.length && /[\s]/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}') {
          // Looks like a terminator - valid
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - ISSUE!
          issues.push({ pos: i, context: content.substring(Math.max(0, i-10), i+15) });
          // Escape it by inserting a backslash
          content = content.substring(0, i) + '\\' + content.substring(i);
          i += 2; // Skip past the escaped quote
        }
      } else {
        prevBackslash = false;
        i++;
      }
    }
  }
  
  return { content, issues };
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let iterations = 0;
  
  while (iterations < 100) {
    try {
      JSON.parse(content);
      // Valid JSON - write if changed
      if (iterations > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
      return { fixed: iterations > 0, unchanged: iterations === 0 };
    } catch (e) {
      const result = findUnescapedQuotes(content);
      if (result.issues.length === 0) {
        // No more unescaped quotes found, but still invalid
        // Try to fix control chars or other issues
        break;
      }
      content = result.content;
      iterations++;
    }
  }
  
  // If we get here, couldn't fix
  return { fixed: false, error: 'Could not auto-fix' };
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Checking ${files.length} files...`);

let fixed = 0, failed = 0;
for (const file of files) {
  const r = processFile(file);
  if (r.fixed) {
    console.log('Fixed:', file);
    fixed++;
  } else if (!r.unchanged) {
    console.log('Failed:', file, '-', r.error);
    failed++;
  }
}

// Verify
let remaining = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    remaining++;
  }
}
console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${remaining} still broken`);
