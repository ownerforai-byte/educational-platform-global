const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const content = fs.readFileSync(path, 'utf8');

// Check what fixJSONContent produces
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
  let prevWasBackslash = false;

  while (i < content.length) {
    const ch = content[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevWasBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        const next = content[i + 1];
        if (next === '"') {
          let scan = i + 2;
          while (scan < content.length && content[scan] === '"') scan++;
          if (scan < content.length && content[scan] !== '\\') {
            let keyStart = scan;
            while (scan < content.length && content[scan] !== '\\') scan++;
            if (scan + 3 <= content.length && content.substring(scan, scan + 3) === '"""') {
              const key = content.substring(keyStart, scan);
              result += '"' + key + '"';
              i = scan + 3;
              prevWasBackslash = false;
              continue;
            }
          }
        }
        result += ch;
        prevWasBackslash = true;
      } else {
        result += ch;
        prevWasBackslash = false;
      }
      i++;
    } else {
      if (prevWasBackslash) {
        result += ch;
        prevWasBackslash = false;
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
        prevWasBackslash = false;
      } else if (ch === '"') {
        result += ch;
        inString = false;
        prevWasBackslash = false;
        i++;
      } else if (ch.charCodeAt(0) < 0x20 && ch !== '\t') {
        const hex = ch.charCodeAt(0).toString(16).padStart(2, '0');
        result += '\\u00' + hex;
        prevWasBackslash = false;
        i++;
      } else if (ch === '"') {
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

  result = result.replace(/,\s*([}\]])/g, '$1');
  return result;
}

const fixed = fixJSONContent(content);
console.log('Changed:', fixed !== content);
if (fixed !== content) {
  console.log('Original around 4675:', JSON.stringify(content.substring(4660, 4700)));
  console.log('Fixed around ~same pos:', JSON.stringify(fixed.substring(4660, 4700)));
  
  // Find where 2D quote is in fixed
  const idx = fixed.indexOf('2D');
  console.log('2D in fixed at:', idx);
  if (idx >= 0) console.log('Context in fixed:', JSON.stringify(fixed.substring(idx, idx + 40)));
  
  // Now test parse
  try {
    JSON.parse(fixed);
    console.log('PARSED OK!');
  } catch(e) {
    console.log('Parse failed:', e.message.substring(0, 100));
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const p = parseInt(m[1]);
      console.log('At pos', p, ':', JSON.stringify(fixed.substring(Math.max(0,p-10), p+20)));
      // Check if quote at p-1 is escaped
      let inStr = false, esc = false;
      for (let j = 0; j < p && j < fixed.length; j++) {
        if (esc) { esc = false; continue; }
        if (fixed[j] === '\\') { esc = true; continue; }
        if (fixed[j] === '"') inStr = !inStr;
      }
      console.log('In string at error pos:', inStr);
    }
  }
} else {
  console.log('No changes made by fixer');
  // Check if original parses
  try { JSON.parse(content); console.log('Original parses fine'); }
  catch(e) { console.log('Original fails:', e.message.substring(0, 80)); }
}
