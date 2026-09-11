const fs = require('fs');
const { globSync } = require('glob');

// ============================================================
// State machine that correctly handles ALL edge cases
// ============================================================
function fixJSON(content) {
  let result = '';
  let i = 0;
  let inString = false;
  
  while (i < content.length) {
    const ch = content[i];
    
    if (!inString) {
      // Outside any string
      if (ch === '"') {
        inString = true;
        result += ch;
      } else {
        result += ch;
      }
      i++;
    } else {
      // Inside a string
      if (ch === '"') {
        // Check if this quote terminates the string
        // Look ahead past whitespace for a terminator
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        
        const isTerminator = j >= content.length ||
          content[j] === ',' || content[j] === ']' ||
          content[j] === '}' || content[j] === ':';
        
        if (isTerminator) {
          // Valid terminator - close the string
          result += ch;
          inString = false;
          i++;
        } else {
          // Not a terminator - this is an unescaped quote INSIDE the string
          // Escape it and stay in the string
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        // Count consecutive backslashes
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        
        if (count % 2 === 1) {
          // Odd count: last backslash escapes the next character
          if (j < content.length) {
            const next = content[j];
            if ('\"\\/bfnrtu'.includes(next)) {
              // Valid escape sequence - keep as-is
              result += '\\'.repeat(count);
              result += next;
              i = j + 1;
            } else {
              // Invalid escape - the backslash itself needs escaping
              // Escape the final backslash, keep the next char as literal
              result += '\\'.repeat(count + 1);
              result += next;
              i = j + 1;
            }
          } else {
            // Backslash at end of string - escape it
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          // Even count - all backslashes pair up
          result += '\\'.repeat(count);
          i = j;
        }
      } else if (ch.charCodeAt(0) < 0x20) {
        // Control character inside string - must escape
        result += '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  // If we ended inside a string, close it
  if (inString) {
    result += '"';
  }
  
  return result;
}

// ============================================================
// Fix literal control characters at end-of-string positions
// These appear as actual \r\n characters between the content
// and the closing quote
// ============================================================
function fixControlChars(content) {
  // Pattern: content then literal \r or \n then whitespace then ] or , or "
  // Replace literal \r and \n inside strings with escaped versions
  // We do this by replacing the pattern where control chars appear 
  // at boundaries between strings and structural chars
  
  // Approach: run the state machine on the content but also handle
  // literal control chars by escaping them
  
  // First pass: fix any literal control characters inside strings
  // by re-running with the state machine
  return fixJSON(content);
}

// ============================================================
// Structural fix for files with malformed escape sequences
// (missing backslash before quote, extra parens, etc.)
// ============================================================
function structuralFix(content, filePath) {
  // Try to parse and if we fail, look for common patterns
  
  // Fix 1: \"** pattern - missing backslash before quote
  // This creates: ...quote, then \"**, then content...
  // The \" is an escaped quote, so the string continues
  // We need to remove the backslash so it becomes a terminator
  content = content.replace(/\\"(\*\*|---|Answer)/g, '"$1');
  
  // Fix 2: Extra ) immediately after closing quote, before newline
  // Pattern: ") \r\n or ") ] or ") ,
  content = content.replace(/\)"(\r?\n|\s*[,\]])/g, '"$1');
  
  // Fix 3: Single quote inside string (not an escape issue, just content)
  // These are fine in JSON as-is. The error "Unexpected token '''" means
  // there's actually a structural issue. Let's check for unbalanced quotes.
  
  // Fix 4: Malformed array element - "content\r\n" -> "content"\r\n
  // When a control char appears right before the closing quote
  // Actually this is handled by the state machine now
  
  return content;
}

// ============================================================
// More aggressive fix: rebuild the JSON by parsing as text
// and fixing string boundaries
// ============================================================
function aggressiveFix(content) {
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
      } else if (code === 13) {
        // Literal \r outside string - skip (shouldn't happen but be safe)
        i++;
      } else if (code === 10) {
        // Literal \n outside string - keep
        result += ch;
        i++;
      } else {
        result += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        // Check terminator
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        const isTerm = j >= content.length || 
          content[j] === ',' || content[j] === ']' || 
          content[j] === '}' || content[j] === ':';
        if (isTerm) {
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string
          result += '\\"';
          i++;
        }
      } else if (code === 13) {
        // Literal \r inside string - escape it
        result += '\\r';
        i++;
      } else if (code === 10) {
        // Literal \n inside string - escape it  
        result += '\\n';
        i++;
      } else if (ch === '\\') {
        let j = i + 1;
        while (j < content.length && content[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < content.length && '\"\\/bfnrtu'.includes(content[j])) {
            result += '\\'.repeat(count);
            result += content[j];
            i = j + 1;
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

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Phase 1: Aggressive fix
  content = aggressiveFix(content);
  
  // Phase 2: Structural fixes
  content = structuralFix(content, filePath);
  
  // Phase 3: Iterative refinement
  for (let iter = 0; iter < 10; iter++) {
    try {
      JSON.parse(content);
      break; // Successfully parsed
    } catch (e) {
      const fixed = fixJSON(content);
      if (fixed === content) break;
      content = fixed;
    }
  }
  
  // Final write
  fs.writeFileSync(filePath, content, 'utf8');
  
  // Verify
  try {
    JSON.parse(content);
    return { success: true };
  } catch (e) {
    return { 
      success: false, 
      error: e.message.substring(0, 100),
      position: e.message.match(/position (\d+)/)?.[1] 
    };
  }
}

// ============================================================
// Main
// ============================================================
const files = globSync('content/ravikishan/**/*.json');
console.log(`Processing ${files.length} files...`);

let fixed = 0, failed = 0, unchanged = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
    unchanged++;
    continue;
  } catch (e) {
    // File is broken, process it
  }
  
  const result = processFile(file);
  if (result.success) {
    fixed++;
    console.log(`Fixed: ${file.split('/').pop()}`);
  } else {
    failed++;
    console.log(`Failed: ${file.split('/').pop()} - ${result.error}`);
  }
}

// Final verification
console.log(`\nFinal verification:`);
let stillBroken = 0;
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    stillBroken++;
    const m = /position (\d+)/.exec(e.message);
    console.log(`STILL BROKEN: ${file.split('/').pop()} pos=${m?.[1] ?? '?'}`);
  }
}

console.log(`\nDone: ${fixed} fixed, ${failed} failed, ${unchanged} unchanged, ${stillBroken} still broken`);
