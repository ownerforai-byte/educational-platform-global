const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json');
const invalid = files.filter(f => {
  try { JSON.parse(fs.readFileSync(f, 'utf8')); return false; }
  catch(e) { return true; }
});
console.log('Invalid:', invalid.length);

invalid.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  let e;
  try { JSON.parse(c); }
  catch(err) { e = err; }
  if (!e) return;
  const m = e.message.match(/position (\d+)/);
  const pos = m ? parseInt(m[1]) : -1;
  console.log(`\n${e.message.substring(0,100)}`);
  console.log(`  FILE: ${f}`);
  if (pos >= 0 && pos < c.length) {
    // Show hex around the error position
    const start = Math.max(0, pos - 15);
    const end = Math.min(c.length, pos + 20);
    console.log(`  HEX: ${Buffer.from(c.substring(start, end)).toString('hex')}`);
    console.log(`  STR: ${JSON.stringify(c.substring(start, end))}`);
    // Check if position is inside a string
    let inStr = false, esc = false;
    for (let i = 0; i < pos && i < c.length; i++) {
      if (esc) { esc = false; continue; }
      if (c[i] === '\\') { esc = true; continue; }
      if (c[i] === '"') inStr = !inStr;
    }
    console.log(`  AT_POS: char=${JSON.stringify(c[pos])} inString=${inStr}`);
  }
});
