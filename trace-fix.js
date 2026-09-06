const fs = require('fs');

// Test the fix logic step by step on the letter-writing file
const path = 'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json';
const c = fs.readFileSync(path, 'utf8');

console.log('=== ORIGINAL FILE ===');
try { JSON.parse(c); console.log('Parses OK'); } catch(e) { 
  const m = e.message.match(/position (\d+)/);
  console.log('Error:', e.message);
  if (m) { const p = parseInt(m[1]); console.log('Ctx:', JSON.stringify(c.substring(p-5, p+10))); }
}

// Run fix
let result = '';
let i = 0;
let inString = false;
let prevBackslash = false;

while (i < c.length) {
  const ch = c[i];
  const code = ch.charCodeAt(0);
  
  if (!inString) {
    if (ch === '"') { inString = true; prevBackslash = false; result += ch; }
    else if (ch === '\\') { prevBackslash = true; result += ch; }
    else { prevBackslash = false; result += ch; }
    i++;
  } else {
    if (prevBackslash) { result += ch; prevBackslash = false; i++; }
    else if (ch === '\\') { result += ch; prevBackslash = true; i++; }
    else if (ch === '"') {
      let j = i + 1;
      while (j < c.length && /\s/.test(c[j])) j++;
      if (j >= c.length || c[j] === ',' || c[j] === ']' || c[j] === '}' || c[j] === ':') {
        result += ch; inString = false; i++;
      } else {
        result += '\\"'; i++;
      }
    } else if (code < 0x20) {
      result += '\\u' + code.toString(16).padStart(4, '0'); i++;
    } else {
      result += ch; prevBackslash = false; i++;
    }
  }
}

console.log('\n=== FIXED FILE ===');
console.log('Fixed length:', result.length, 'Original:', c.length);
try { JSON.parse(result); console.log('Parses OK!'); } catch(e) {
  console.log('Still broken:', e.message);
  const m = e.message.match(/position (\d+)/);
  if (m) {
    const p = parseInt(m[1]);
    console.log('Fixed context:', JSON.stringify(result.substring(Math.max(0,p-20), p+20)));
    console.log('Fixed char codes:', Array.from(result.substring(Math.max(0,p-20), p+20)).map(x => x.charCodeAt(0)));
  }
}
