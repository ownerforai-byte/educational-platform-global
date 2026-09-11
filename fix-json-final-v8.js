const fs = require('fs');
const { globSync } = require('glob');

function fixJSONContent(content) {
  content = content.replace(/^\uFEFF/, '');
  content = content
    .replace(/\u00e2\u0080\u009d/g, '\u201d')
    .replace(/\u00e2\u0080\u009c/g, '\u201c')
    .replace(/\u00e2\u0080\u0099/g, '\u2019')
    .replace(/\u00e2\u0080\u0093/g, '\u2013')
    .replace(/\u00e2\u0080\u0094/g, '\u2014')
    .replace(/\u00c2\u00a0/g, '\u00a0');

  let result = '';
  let i = 0;
  let inString = false;
  let prevInputWasBackslash = false;

  function countLeadingBackslashes(str, pos) {
    let count = 0;
    while (pos > 0 && str[pos - 1] === '\\') {
      count++;
      pos--;
    }
    return count;
  }

  function isStringTerminator(str, pos) {
    let j = pos + 1;
    while (j < str.length && /\s/.test(str[j])) j++;
    return j >= str.length || str[j] === ',' || str[j] === ']' || str[j] === '}';
  }

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevInputWasBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        // Check for triple-escaped property: \"\"\"key\"\"\"
        const next = content[i + 1];
        if (next === '"') {
          let scan = i + 2;
          while (scan < content.length && content[scan] === '"') scan++;
          if (scan < content.length && content[scan] !== '\\') {
            let keyStart = scan;
            while (scan < content.length && content[scan] !== '\\') scan++;
            if (scan + 3 <= content.length &&
                content[scan] === '"' && content[scan+1] === '"' && content[scan+2] === '"') {
              result += '"' + content.substring(keyStart, scan) + '"';
              i = scan + 3;
              prevInputWasBackslash = false;
              continue;
            }
          }
        }
        result += ch;
        prevInputWasBackslash = true;
      } else {
        result += ch;
        prevInputWasBackslash = false;
      }
      i++;
    } else {
      // Inside a string
      if (prevInputWasBackslash) {
        // Previous input char was \ - this is the escaped char
        result += ch;
        prevInputWasBackslash = false;
        i++;
      } else if (ch === '\\') {
        const next = content[i + 1];
        if (next === '"' || next === '\\' || next === '/' ||
            next === 'b' || next === 'f' || next === 'n' ||
            next === 'r' || next === 't') {
          result += '\\' + next;
          i += 2;
          prevInputWasBackslash = false;
        } else if (next === 'u') {
          const hex = content.substring(i + 2, i + 6);
          if (/^[0-9a-fA-F]{4}$/.test(hex)) {
            result += '\\u' + hex;
            i += 6;
          } else {
            result += '\\u';
            i += 2;
          }
          prevInputWasBackslash = false;
        } else if (next && next.charCodeAt(0) < 0x20) {
          result += '\\u00' + next.charCodeAt(0).toString(16).padStart(2, '0');
          i += 2;
          prevInputWasBackslash = false;
        } else if (next === undefined) {
          result += '\\\\';
          i += 1;
          prevInputWasBackslash = false;
        } else {
          result += '\\';
          i += 1;
          prevInputWasBackslash = false;
        }
      } else if (ch === '"') {
        const backslashCount = countLeadingBackslashes(content, i);
        if (backslashCount % 2 === 1) {
          // Odd number of backslashes - this is an escaped quote (content)
          result += ch;
          prevInputWasBackslash = false;
          i++;
        } else if (isStringTerminator(content, i)) {
          // Even number of backslashes AND looks like terminator - end the string
          result += ch;
          inString = false;
          prevInputWasBackslash = false;
          i++;
        } else {
          // Even number of backslashes but NOT a terminator - unescaped quote, escape it
          result += '\\"';
          prevInputWasBackslash = false;
          i++;
        }
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        prevInputWasBackslash = false;
        i++;
      } else {
        result += ch;
        prevInputWasBackslash = false;
        i++;
      }
    }
  }

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
