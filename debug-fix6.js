const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');

// Check what the HTML entity replacement does
const before = c;
let after = c.replace(/\u00e2\u0080\u009d/g, '\u201d');
after = after.replace(/\u00e2\u0080\u009c/g, '\u201c');
after = after.replace(/\u00e2\u0080\u0099/g, '\u2019');
after = after.replace(/\u00e2\u0080\u0093/g, '\u2013');
after = after.replace(/\u00e2\u0080\u0094/g, '\u2014');
after = after.replace(/\u00c2\u00a0/g, '\u00a0');
console.log('HTML entity changes:', after !== before ? 'YES' : 'NO');
if (after !== before) {
  for (let i = 0; i < Math.min(after.length, before.length); i++) {
    if (after[i] !== before[i]) {
      console.log('First diff at', i, ':', JSON.stringify(before.substring(i-5,i+10)), '->', JSON.stringify(after.substring(i-5,i+10)));
      break;
    }
  }
}

// Now trace the state machine
let result = '';
let i = 0;
let inString = false;
let prevInputWasBackslash = false;
let changes = 0;

while (i < after.length) {
  const ch = after[i];

  if (!inString) {
    if (ch === '"') {
      inString = true;
      prevInputWasBackslash = false;
      result += ch;
    } else if (ch === '\\') {
      const next = after[i + 1];
      if (next === '"') {
        let scan = i + 2;
        while (scan < after.length && after[scan] === '"') scan++;
        if (scan < after.length && after[scan] !== '\\') {
          let keyStart = scan;
          while (scan < after.length && after[scan] !== '\\') scan++;
          if (scan + 3 <= after.length &&
              after[scan] === '"' && after[scan+1] === '"' && after[scan+2] === '"') {
            const key = after.substring(keyStart, scan);
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
      const next = after[i + 1];
      if (next === '"' || next === '\\' || next === '/' ||
          next === 'b' || next === 'f' || next === 'n' ||
          next === 'r' || next === 't') {
        result += '\\' + next;
        i += 2;
      } else if (next === 'u') {
        const hex = after.substring(i + 2, i + 6);
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
      console.log('ESCAPED QUOTE at i=' + i + ', char=' + JSON.stringify(ch) + ', inString before=' + inString);
      prevInputWasBackslash = false;
      i++;
    } else {
      result += ch;
      prevInputWasBackslash = false;
      i++;
    }
  }
}

console.log('\nTotal changes:', changes);
console.log('Output length:', result.length, 'Input length:', after.length);
if (changes === 0) {
  console.log('\nLooking for unescaped quotes in input...');
  // Manual check: find all " chars and see if they should be escaped
  inString = false;
  prevInputWasBackslash = false;
  for (let j = 0; j < after.length; j++) {
    const ch = after[j];
    if (prevInputWasBackslash) { prevInputWasBackslash = false; continue; }
    if (ch === '\\') { prevInputWasBackslash = true; continue; }
    if (ch === '"') {
      if (inString) {
        inString = false;
      } else {
        inString = true;
      }
    }
  }
  console.log('Final inString:', inString);
  
  // Now check specifically around position 4675
  console.log('\nAround pos 4675:');
  console.log('Char at 4674:', JSON.stringify(after[4674]));
  console.log('Char at 4675:', JSON.stringify(after[4675]));
  console.log('Is 4674 a backslash?', after[4674] === '\\');
  
  // Check if position 4674 is preceded by backslash
  let at4674Escaped = false;
  if (4674 > 0 && after[4673] === '\\') {
    at4674Escaped = true;
  }
  console.log('Quote at 4674 is escaped?', at4674Escaped);
  
  // Trace state just before position 4674
  inString = false;
  let esc = false;
  for (let j = 0; j < 4674; j++) {
    if (esc) { esc = false; continue; }
    if (after[j] === '\\') { esc = true; continue; }
    if (after[j] === '"') inString = !inString;
  }
  console.log('inString just before 4674:', inString);
}
