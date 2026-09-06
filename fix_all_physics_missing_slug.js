// fix_all_physics_missing_slug.js
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content', 'ravikishan', 'class-11-notes', 'physics');

// Find all concept JSON files missing topicSlug
function scan(dir) {
  const results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const fp = path.join(dir, d.name);
    if (d.isDirectory()) {
      results.push(...scan(fp));
    } else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
      const raw = fs.readFileSync(fp, 'utf8');
      try {
        const obj = JSON.parse(raw);
        // Check if it's missing topicSlug
        if (!obj.topicSlug) {
          results.push({
            file: path.relative(SRC, fp),
            obj,
            rawBytes: Buffer.from(raw)
          });
        }
      } catch (e) {
        results.push({ file: path.relative(SRC, fp), error: e.message.slice(0, 80) });
      }
    }
  });
  return results;
}

const issues = scan(SRC);
console.log(`Found ${issues.length} files missing topicSlug\n`);

for (const item of issues) {
  if (item.error) {
    console.log(`PARSE ERROR: ${item.file} — ${item.error}`);
    continue;
  }
  const { obj, file } = item;
  console.log(`\n${file}:`);
  console.log(`  type: ${typeof obj} isArray:${Array.isArray(obj)}`);
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    console.log(`  keys (first 10): ${keys.slice(0, 10).join(', ')}`);
    // Check for backslash-escaped keys
    const hasEscapedKeys = keys.some(k => k.startsWith('"') || k.includes('\\"'));
    console.log(`  has escaped keys: ${hasEscapedKeys}`);
    // Check first few key-value pairs
    for (const k of keys.slice(0, 5)) {
      console.log(`    "${k}": ${typeof obj[k] === 'string' ? JSON.stringify(obj[k]).slice(0, 60) : JSON.stringify(obj[k]).slice(0, 60)}`);
    }
  }
}
