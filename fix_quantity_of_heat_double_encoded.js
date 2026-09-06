// fix_quantity_of_heat_double_encoded.js
// These files are double-JSON-encoded: the raw content is a JSON string containing [{...}]
// Fix: parse outer string, then parse the inner JSON, then write the unwrapped object.
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';
const UNIT = 'quantity-of-heat/concepts';

const files = fs.readdirSync(path.join(__dirname, SRC, UNIT))
  .filter(f => f.endsWith('.json') && f !== 'plan.json');

let fixed = 0;
for (const f of files) {
  const fp = path.join(__dirname, SRC, UNIT, f);
  const raw = fs.readFileSync(fp, 'utf8');
  try {
    // First parse: the outer JSON string layer
    const outerStr = JSON.parse(raw);
    // outerStr should be the string '[{\n  "title": ...}]'
    if (typeof outerStr !== 'string') {
      console.log(`SKIP ${f}: not a string after first parse`);
      continue;
    }
    // Second parse: the inner JSON
    const inner = JSON.parse(outerStr);
    if (!Array.isArray(inner) || inner.length === 0 || typeof inner[0] !== 'object') {
      console.log(`SKIP ${f}: inner is not an array with object`);
      continue;
    }
    const obj = inner[0];
    // Ensure topicSlug
    if (!obj.topicSlug && obj.title) {
      obj.topicSlug = obj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (!obj.title && obj.topicTitle) {
      obj.title = obj.topicTitle;
    }
    fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
    console.log(`FIXED ${f}: title="${obj.title?.slice(0, 40)}"`);
    fixed++;
  } catch (e) {
    console.log(`ERROR ${f}: ${e.message.slice(0, 60)}`);
  }
}
console.log(`\nFixed ${fixed} files.`);
