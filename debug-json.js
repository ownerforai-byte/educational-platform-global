const fs = require('fs');
const { globSync } = require('glob');

// Get list of invalid files
const files = globSync('content/ravikishan/**/*.json');
const invalid = files.filter(f => {
  try { JSON.parse(fs.readFileSync(f, 'utf8')); return false; }
  catch(e) { return true; }
});
console.log('Invalid files:', invalid.length);

// Analyze each error type
const errors = {};
invalid.forEach(f => {
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch(e) {
    const msg = e.message;
    const match = msg.match(/in JSON at position (\d+)/);
    const pos = match ? parseInt(match[1]) : -1;
    const c = fs.readFileSync(f, 'utf8');
    let context = '';
    if (pos >= 0 && pos < c.length) {
      context = JSON.stringify(c.substring(Math.max(0, pos-20), pos+30));
    }
    errors[f] = { error: msg.substring(0, 120), pos, context };
  }
});

// Group by error type
Object.entries(errors).forEach(([file, info]) => {
  console.log(`\n${info.error}`);
  console.log(`  FILE: ${file}`);
  if (info.context) console.log(`  CONTEXT: ${info.context}`);
});
