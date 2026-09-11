const fs = require('fs');
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');

// Manual fix for TIR: just fix the specific unescaped quotes
// The content has literal " inside strings - we need to escape them as \"

// Find all instances of literal unescaped quotes inside notes/confusion/practice/universalFacts arrays
// The pattern is: "..."text with "quotes"...  ->  "..."text with \"quotes\"..."

// Strategy: Use a proper parser that tracks string state and escapes quotes
let result = '';
let i = 0;
let inString = false;
let prevBS = false;

while (i < c.length) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    result += ch;
    if (ch === '"') inString = true;
    prevBS = false;
    i++;
  } else {
    if (prevBS) {
      // Previous char was backslash - this is an escaped char
      result += ch;
      prevBS = false;
      i++;
    } else if (ch === '\\') {
      // Start of escape sequence
      result += ch;
      prevBS = true;
      i++;
    } else if (ch === '"') {
      // Potential string terminator - look ahead
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      const isTerminator = j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':';
      if (isTerminator) {
        result += ch;
        inString = false;
        i++;
      } else {
        // Unescaped quote inside string - escape it
        result += '\\"';
        i++;
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

// Write fixed content
fs.writeFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', result, 'utf8');

try {
  JSON.parse(result);
  console.log('FIXED: TIR file now parses OK');
} catch(e) {
  console.log('STILL BROKEN:', e.message);
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const p = parseInt(m[1]);
    console.log('Context:', JSON.stringify(result.substring(Math.max(0,p-20), p+20)));
  }
}
