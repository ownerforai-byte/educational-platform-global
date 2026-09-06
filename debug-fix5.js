const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');

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
  let changes = 0;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevInputWasBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        const next = content[i + 1];
        if (next === '"') {
          let scan = i + 2;
          while (scan < content.length && content[scan] === '"') scan++;
          if (scan < content.length && content[scan] !== '\\') {
            let keyStart = scan;
            while (scan < content.length && content[scan] !== '\\') scan++;
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
          result += '\\';
          i += 1;
        }
        prevInputWasBackslash = false;
      } else if (ch === '"') {
        result += ch;
        inString = false;
        prevInputWasBackslash = false;
        i++;
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        prevInputWasBackslash = false;
        i++;
      } else if (ch === '"' && !prevInputWasBackslash) {
        result += '\\"';
        changes++;
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
  console.log('Changes made:', changes);
  return result;
}

const fixed = fixJSONContent(c);
console.log('Changed:', fixed !== c);
if (fixed !== c) {
  // Find the diff point
  for (let i = 0; i < Math.min(fixed.length, c.length); i++) {
    if (fixed[i] !== c[i]) {
      console.log('First diff at', i, ':', JSON.stringify(c.substring(i-5,i+10)), '->', JSON.stringify(fixed.substring(i-5,i+10)));
      break;
    }
  }
  // Test parse
  try {
    JSON.parse(fixed);
    console.log('PARSED OK!');
  } catch(e) {
    console.log('Parse failed:', e.message.substring(0, 80));
  }
} else {
  console.log('No changes - output identical to input');
  try { JSON.parse(fixed); console.log('Input parses OK'); }
  catch(e) { console.log('Input fails:', e.message.substring(0, 80)); }
}
