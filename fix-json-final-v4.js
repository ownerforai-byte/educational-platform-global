const fs = require('fs');
const { globSync } = require('glob');

function fixJSONContent(content) {
  // Strip BOM
  content = content.replace(/^\uFEFF/, '');

  // Fix HTML entities (UTF-8 bytes misread as separate chars)
  content = content
    .replace(/\u00e2\u0080\u009d/g, '\u201d')   // â€" -> "
    .replace(/\u00e2\u0080\u009c/g, '\u201c')   // â€œ -> "
    .replace(/\u00e2\u0080\u0099/g, '\u2019')   // â€™ -> '
    .replace(/\u00e2\u0080\u0093/g, '\u2013')   // â€“ -> –
    .replace(/\u00e2\u0080\u0094/g, '\u2014')   // — -> —
    .replace(/\u00c2\u00a0/g, '\u00a0');         // Â -> nbsp

  // Single-pass state machine
  let result = '';
  let i = 0;
  let inString = false;
  let prevWasBackslash = false;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      // ---- OUTSIDE A STRING ----
      if (ch === '"') {
        inString = true;
        prevWasBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        // Outside string - could be broken triple-escape start
        // Check for \"\"\" pattern (triple-escaped property name start)
        const next = content[i + 1];
        if (next === '"') {
          // Look ahead for \"\"\"pattern\"\"\" 
          // We're at first \ of \"\"\"
          // Scan ahead to find the full pattern
          let scan = i + 2; // skip \\"
          // Expect """ then key chars then """
          while (scan < content.length && content[scan] === '"') scan++;
          if (scan < content.length && content[scan] !== '\\') {
            // We have """ followed by non-backslash - this is a triple-quoted key
            let keyStart = scan;
            while (scan < content.length && content[scan] !== '\\') scan++;
            if (scan + 3 <= content.length && content.substring(scan, scan + 3) === '"""') {
              // Found: \"\"\"key\"\"\" - replace with "key"
              const key = content.substring(keyStart, scan);
              result += '"' + key + '"';
              i = scan + 3;
              prevWasBackslash = false;
              continue;
            }
          }
        }
        // Just a stray backslash outside string
        result += ch;
        prevWasBackslash = true;
      } else {
        result += ch;
        prevWasBackslash = false;
      }
      i++;
    } else {
      // ---- INSIDE A STRING ----
      if (prevWasBackslash) {
        // Previous char was \, this is the escaped character
        result += ch;
        prevWasBackslash = false;
        i++;
      } else if (ch === '\\') {
        // Start of escape sequence
        const next = content[i + 1];
        if (next === '"' || next === '\\' || next === '/' ||
            next === 'b' || next === 'f' || next === 'n' ||
            next === 'r' || next === 't') {
          result += '\\' + next;
          i += 2;
        } else if (next === 'u') {
          const hex = content.substring(i + 2, i + 6);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            result += '\\u' + hex;
            i += 6;
          } else {
            // Invalid unicode escape - output as literal \u
            result += '\\u';
            i += 2;
          }
        } else if (next && next.charCodeAt(0) < 0x20) {
          // Control char after backslash
          result += '\\u00' + next.charCodeAt(0).toString(16).padStart(2, '0');
          i += 2;
        } else if (next === undefined) {
          // Trailing backslash
          result += '\\\\';
          i += 1;
        } else {
          // Invalid escape like \g - keep the backslash, drop invalid char
          result += '\\';
          i += 1;
        }
        prevWasBackslash = false;
      } else if (ch === '"') {
        // End of string
        result += ch;
        inString = false;
        prevWasBackslash = false;
        i++;
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        // Control character inside string - must escape
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        prevWasBackslash = false;
        i++;
      } else if (ch === '"') {
        // This shouldn't happen since we checked above, but safety net
        result += ch;
        inString = false;
        prevWasBackslash = false;
        i++;
      } else {
        result += ch;
        prevWasBackslash = false;
        i++;
      }
    }
  }

  // Fix trailing commas
  result = result.replace(/,\s*([}\]])/g, '$1');

  return result;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixJSONContent(content);
    JSON.parse(fixed);
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      return { success: true, changes: true };
    }
    return { success: true, changes: false };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

const files = globSync('content/ravikishan/**/*.json');
console.log(`Found ${files.length} files to check.`);

let fixed = 0, failed = 0;
const failures = [];

for (const file of files) {
  const r = processFile(file);
  if (r.success) {
    if (r.changes) { console.log('Fixed:', file); fixed++; }
  } else {
    console.error('Failed:', file, '-', r.error.substring(0, 80));
    failures.push({ file, error: r.error });
    failed++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${failed} still failed`);
if (failures.length > 0) {
  console.log('\nRemaining:');
  failures.forEach(f => console.log(' ', f.file, ':', f.error.substring(0, 60)));
}
