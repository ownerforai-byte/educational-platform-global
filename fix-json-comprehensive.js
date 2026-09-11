const fs = require('fs');

// Comprehensive JSON fixer that understands string context
function fixJSON(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let escapeNext = false;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      // Outside string
      if (ch === '"') {
        inString = true;
        escapeNext = false;
        result += ch;
      } else if (ch === '\\') {
        // Could be starting an escape in a string? No, we're outside.
        // But wait - if we're outside a string and see \, it's likely invalid.
        // However, this shouldn't happen in valid JSON structure.
        result += ch;
      } else {
        result += ch;
      }
      i++;
    } else {
      // Inside string
      if (escapeNext) {
        // Previous char was backslash, this is the escaped char
        result += ch;
        escapeNext = false;
        i++;
      } else if (ch === '\\') {
        // Start of escape sequence
        result += ch;
        escapeNext = true;
        i++;
      } else if (ch === '"') {
        // End of string
        result += ch;
        inString = false;
        i++;
      } else if (ch === '\r' || ch === '\n') {
        // Newlines inside strings must be escaped
        if (ch === '\r') {
          result += '\\r';
        } else {
          result += '\\n';
        }
        i++;
      } else if (ch.charCodeAt(0) < 0x20) {
        // Other control characters - escape them
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += `\\u00${hex}`;
        i++;
      } else if (ch === '"' && i > 0 && result[result.length - 1] !== '\\') {
        // Unescaped quote inside string - this is the bug!
        // It should be escaped as \"
        result += '\\"';
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }

  return result;
}

function cleanJSON(content) {
  // Fix triple-quoted keys/values: """key""" -> "key"
  content = content.replace(/"""/g, '"');

  // Fix broken unicode sequences like â€" (E2 80 9D misread)
  content = content.replace(/\u00e2\u0080\u009d/g, '\u201d');
  content = content.replace(/\u00e2\u0080\u009c/g, '\u201c');
  content = content.replace(/\u00e2\u0080\u0099/g, '\u2019');
  content = content.replace(/\u00e2\u0080\u0093/g, '\u2013');
  content = content.replace(/\u00e2\u0080\u0094/g, '\u2014');

  // Remove BOM if present
  content = content.replace(/^\uFEFF/, '');

  // Fix invalid escape sequences: \X where X is not a valid JSON escape
  // We do this character by character
  let fixed = '';
  let esc = false;
  for (let i = 0; i < content.length; i++) {
    if (esc) {
      const next = content[i];
      if (['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u'].includes(next)) {
        fixed += '\\' + next;
      } else {
        // Invalid escape - keep the backslash and the char
        fixed += '\\\\' + next;
      }
      esc = false;
    } else if (content[i] === '\\') {
      esc = true;
      fixed += '\\';
    } else {
      fixed += content[i];
    }
  }
  content = fixed;

  // Fix trailing commas before } or ]
  content = content.replace(/,\s*([}\]])/g, '$1');

  return content;
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // First clean up structural issues
    content = cleanJSON(content);

    // Then fix unescaped quotes inside strings
    content = fixJSON(content);

    // Verify
    JSON.parse(content);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { success: true, changes: true };
    }
    return { success: true, changes: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Run on all ravikishan JSON files
const { globSync } = require('glob');
const files = globSync('content/ravikishan/**/*.json');
console.log(`Found ${files.length} files to check.`);

let fixed = 0;
let failed = 0;
const failures = [];

for (const file of files) {
  const result = processFile(file);
  if (result.success) {
    if (result.changes) {
      console.log(`Fixed: ${file}`);
      fixed++;
    }
  } else {
    console.error(`Failed: ${file} - ${result.error.substring(0, 80)}`);
    failures.push({ file, error: result.error });
    failed++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${failed} still failed`);
if (failures.length > 0) {
  console.log('\nRemaining failures:');
  failures.forEach(f => console.log(`  ${f.file}: ${f.error.substring(0, 60)}`));
}
