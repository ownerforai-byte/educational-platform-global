const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  // Step 1: Fix triple-escaped quotes in property names (\"\"\"key\"\"\")
  // A previous fix script over-escaped property names.
  // Pattern: \""" ... """ -> " ... "
  content = content.replace(/\\\"\\\"\\\"([^"]+)\\\"\\\"\\\"/g, '"$1"');
  
  // Step 2: Fix markdown bold markers that leaked outside strings (**text**)
  // These appear as standalone **text** outside of proper JSON string context.
  // We need to find where the notes array closes but bold markers remain.
  // This is tricky, so we'll use a different approach: rebuild the JSON.
  
  // Step 3: Use state machine to escape unescaped quotes and control chars inside strings
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
        // Check if this is a terminator
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
        // Control character inside string
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

// More aggressive fix: parse what we can and repair structure
function aggressiveFix(content) {
  // First try the state machine fix
  let fixed = fixJSON(content);
  
  try {
    JSON.parse(fixed);
    return fixed;
  } catch (e) {
    // If that fails, try iterative position-based fixing
    for (let attempt = 0; attempt < 200; attempt++) {
      try {
        JSON.parse(fixed);
        return fixed;
      } catch (parseErr) {
        const match = parseErr.message.match(/position (\d+)/);
        if (!match) return fixed; // Can't fix
        
        const pos = parseInt(match[1], 10);
        
        // Try different fixes at this position
        const ch = fixed[pos];
        const code = ch ? ch.charCodeAt(0) : 0;
        
        if (code >= 0x20 && code !== '"' && code !== '\\') {
          // Not a quote or backslash - this might be a structural issue
          // Look backwards for the nearest quote
          let back = pos - 1;
          while (back >= 0 && fixed[back] !== '"') back--;
          if (back >= 0) {
            // Found a quote before - maybe we need to close the string and add a comma
            // This handles cases like: "...text**bold**"..."
            // Insert comma before the next quote
            fixed = fixed.substring(0, back + 1) + ',' + fixed.substring(back + 1);
          } else {
            // No quote found - can't fix
            break;
          }
        } else if (ch === '"') {
          // There's a quote at the error position - it might be an unterminated string
          // Look backwards to find the start
          let back = pos - 1;
          while (back >= 0 && fixed[back] !== '"') back--;
          if (back < 0) {
            // Quote at start of string but no closing quote - add one
            fixed = fixed.substring(0, pos) + '"' + fixed.substring(pos);
          } else {
            // String starts and ends with quotes but has issues inside
            // Look for unmatched quotes between back and pos
            let nestedQuotes = 0;
            for (let k = back + 1; k < pos; k++) {
              if (fixed[k] === '"') nestedQuotes++;
            }
            if (nestedQuotes > 0) {
              // There are quotes inside - need to escape them or handle specially
              // For now, just try adding a closing quote
              fixed = fixed.substring(0, pos) + '"' + fixed.substring(pos);
            } else {
              // No inner quotes - should be valid, try something else
              break;
            }
          }
        } else if (ch === '\\') {
          // Backslash at error position - might need to escape the next char
          if (pos + 1 < fixed.length) {
            const next = fixed[pos + 1];
            if (!'\"/bfnrtu'.includes(next) && next.charCodeAt(0) >= 0x20) {
              // Invalid escape - add another backslash
              fixed = fixed.substring(0, pos + 1) + '\\' + fixed.substring(pos + 1);
            } else {
              break;
            }
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
    return fixed;
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixed = aggressiveFix(content);
  
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
