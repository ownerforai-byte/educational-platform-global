const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json');
const broken = [];
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    broken.push({ file, error: e.message });
  }
}

console.log(`Total broken: ${broken.length}\n`);

for (const { file, error } of broken) {
  const c = fs.readFileSync(file, 'utf8');
  const m = /position (\d+)/.exec(error);
  if (!m) {
    console.log(`ERROR: ${file.split('/').pop()}: ${error.substring(0, 100)}`);
    continue;
  }
  const pos = parseInt(m[1]);
  const start = Math.max(0, pos - 40);
  const end = Math.min(c.length, pos + 40);
  const ctx = c.substring(start, end);
  const ctxEscaped = JSON.stringify(ctx);
  console.log(`FAIL: ${file.split('/').pop()}`);
  console.log(`  Error: ${error.substring(0, 80)}`);
  console.log(`  Pos: ${pos}`);
  console.log(`  Context[${start}-${end}]: ${ctxEscaped}`);
  console.log();
}
