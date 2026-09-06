const fs = require('fs');
const path = 'content/ravikishan/class-11/chemistry/theory/stoichiometry.json';
const content = fs.readFileSync(path, 'utf8');

console.log('=== Original content (first 200 chars) ===');
console.log(JSON.stringify(content.substring(0, 200)));

// Check if there are any backslashes in the content
let backslashCount = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '\\') backslashCount++;
}
console.log('\nTotal backslashes:', backslashCount);

// Trace the state machine
let result = '';
let i = 0;
let inString = false;
let prevInputWasBackslash = false;
let changeCount = 0;

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
    if (prevInputWasBackslash) {
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
      result += '\\"';
      prevInputWasBackslash = false;
      i++;
      changeCount++;
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

console.log('\n=== Changes made:', changeCount, '===');
console.log('=== Output length:', result.length, 'vs input:', content.length, '===');

if (changeCount > 0) {
  console.log('\n=== Finding differences ===');
  for (let i = 0; i < Math.min(result.length, content.length); i++) {
    if (result[i] !== content[i]) {
      console.log('First diff at', i, ':', JSON.stringify(content.substring(i-5, i+20)), '->', JSON.stringify(result.substring(i-5, i+20)));
      break;
    }
  }
  if (result.length !== content.length) {
    console.log('Length changed from', content.length, 'to', result.length);
  }
}

try {
  JSON.parse(result);
  console.log('\n=== PARSE OK ===');
} catch(e) {
  console.log('\n=== PARSE FAIL:', e.message, '===');
  // Find where it fails
  const msg = e.message.match(/position (\d+)/);
  if (msg) {
    const pos = parseInt(msg[1]);
    console.log('Around failure position', pos, ':', JSON.stringify(result.substring(pos-20, pos+20)));
  }
}

// Also check: does the original parse?
try {
  JSON.parse(content);
  console.log('\n=== Original PARSES OK ===');
} catch(e) {
  console.log('\n=== Original FAILS:', e.message, '===');
}
