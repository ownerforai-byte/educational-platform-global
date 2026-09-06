const fs = require('fs');
const { globSync } = require('glob');

function fixJSON(content) {
  content = content.replace(/^\uFEFF/, '');
  content = content
    .replace(/\u00e2\u0080\u009d/g, '\u201d')
    .replace(/\u00e2\u0080\u009c/g, '\u201c')
    .replace(/\u00e2\u0080\u0099/g, '\u2019')
    .replace(/\u00e2\u0080\u0093/g, '\u2013')
    .replace(/\u00e2\u0080\u0094/g, '\u2014')
    .replace(/\u00c2\u00a0/g, '\u00a0');
  
  // Pass 1: escape unescaped control chars (< 0x20 except tab, newline, carriage return)
  content = content.replace(/([\x00-\x08\x0b\x0c\x0e-\x1f])/g, '\\u00$1'.replace('$1', (m) => m.charCodeAt(0).toString(16).padStart(2,'0')));
  
  // Pass 2: find unescaped quotes inside strings by state machine
  let result = '';
  let i = 0;
  let inString = false;
  let prevBackslash = false;
  
  while (i < content.length) {
    const ch = content[i];
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevBackslash = false;
        result += ch;
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
        // Could be terminator or unescaped quote - check context
        // Look ahead: is this a terminator?
        let j = i + 1;
        while (j < content.length && /[\s]/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}') {
          // Looks like terminator - end string
          result += ch;
          inString = false;
          i++;
        } else {
          // Not terminator - unescaped quote inside string
          result += '\\"';
          i++;
        }
      } else {
        result += ch;
        prevBackslash = false;
        i++;
      }
    }
  }
  
  // Fix trailing commas
  result = result.replace(/,\s*([}\]])/g, '$1');
  return result;
}

// Test on broken file
const file = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(file, 'utf8');
console.log('Before:', c.length);
const fixed = fixJSON(c);
console.log('After:', fixed.length);
try {
  JSON.parse(fixed);
  console.log('PARSE OK!');
  fs.writeFileSync(file, fixed, 'utf8');
} catch(e) {
  console.log('FAIL:', e.message);
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const p = parseInt(m[1]);
    console.log('Context:', JSON.stringify(fixed.substring(p-20, p+20)));
  }
}
