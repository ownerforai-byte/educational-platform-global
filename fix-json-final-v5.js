const fs = require('fs');
const { globSync } = require('glob');

/**
 * State-machine JSON fixer.
 * Tracks: inString, prevInputWasBackslash
 */
function fixJSONContent(content) {
  // Strip BOM
  content = content.replace(/^\uFEFF/, '');

  // Fix HTML entities (UTF-8 bytes misread as separate chars)
  content = content
    .replace(/\u00e2\u0080\u009d/g, '\u201d')
    .replace(/\u00e2\u0080\u009c/g, '\u201c')
    .replace(/\u00e2\u0080\u0099/g, '\u2019')
    .replace(/\u00e2\u0080\u0093/g, '\u2013')
    .replace(/\u00e2\u0080\u0094/g, '\u2014')
    .replace(/\u00c2\u00a0/g, '\u00a0');

  // Single-pass state machine over the INPUT
  let result = '';
  let i = 0;
  let inString = false;
  let prevInputWasBackslash = false;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      // ---- OUTSIDE A STRING ----
      if (ch === '"') {
        inString = true;
        prevInputWasBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        // Check for broken triple-escaped property names: \"\"\"key\"\"\"
        // We're at the first \ of \"\"\"
        const next = content[i + 1];
        if (next === '"') {
          // Look ahead: \""" then key chars then \"\"\"
          let scan = i + 2; // skip \\"
          while (scan < content.length && content[scan] === '"') scan++;
          if (scan < content.length && content[scan] !== '\\') {
            // Found """ - now find the key
            let keyStart = scan;
            while (scan < content.length && content[scan] !== '\\') scan++;
            // Check for closing """
            if (scan + 3 <= content.length &&
                content[scan] === '"' && content[scan+1] === '"' && content[scan+2] === '"') {
              const key = content.substring(keyStart, scan);
              result += '"' + key + '"';
              i = scan + 3;
              prevInputWasBackslash = false;
              continue;
            }
          }
        }
        // Stray backslash outside string - keep it
        result += ch;
        prevInputWasBackslash = true;
      } else {
        result += ch;
        prevInputWasBackslash = false;
      }
      i++;
    } else {
      // ---- INSIDE A STRING ----
      if (prevInputWasBackslash) {
        // Previous input char was \ - this is the escaped char
        // Whether valid or not, just include it
        result += ch;
        prevInputWasBackslash = false;
        i++;
      } else if (ch === '\\') {
        // Start of escape sequence in input
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
            result += '\\u';
            i += 2;
          }
        } else if (next && next.charCodeAt(0) < 0x20) {
          result += '\\u00' + next.charCodeAt(0).toString(16).padStart(2, '0');
          i += 2;
        } else if (next === undefined) {
          result += '\\\\';
          i += 1;
        } else {
          // Invalid escape like \g - keep backslash, drop the bad char
          result += '\\';
          i += 1;
        }
        prevInputWasBackslash = false;
      } else if (ch === '"') {
        // End of string
        result += ch;
        inString = false;
        prevInputWasBackslash = false;
        i++;
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        // Control character inside string - must escape
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        prevInputWasBackslash = false;
        i++;
      } else if (ch === '"' && !prevInputWasBackslash) {
        // Unescaped quote inside string - ESCAPE IT
        result += '\\"';
        prevInputWasBackslash = false;
        i++;
      } else {
        result += ch;
        prevInputWasBackslash = false;
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
