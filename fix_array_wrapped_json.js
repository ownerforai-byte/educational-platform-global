// fix_array_wrapped_json.js
// Some physics concept files are wrapped in arrays: [{...}, ""] instead of just {...}
// Fix: unwrap the first element (the actual object) and write it back.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content/ravikishan/class-11-notes/physics');

function scan(dir) {
  const results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const fp = path.join(dir, d.name);
    if (d.isDirectory()) {
      results.push(...scan(fp));
    } else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
      try {
        const b = fs.readFileSync(fp, 'utf8');
        const o = JSON.parse(b);
        if (Array.isArray(o) && o.length >= 1 && typeof o[0] === 'object' && o[0] !== null) {
          // Unwrap: take first element, discard the rest
          const obj = o[0];
          // Ensure topicSlug exists
          if (!obj.topicSlug && obj.title) {
            obj.topicSlug = obj.title.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
          }
          if (!obj.title && obj.topicTitle) {
            obj.title = obj.topicTitle;
          }
          fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
          results.push({ file: path.relative(SRC, fp), action: 'unwrapped', title: obj.title?.slice(0, 40) });
        }
      } catch (e) {
        results.push({ file: path.relative(SRC, fp), action: 'parse-error', error: e.message.slice(0, 60) });
      }
    }
  });
  return results;
}

const results = scan(SRC);
console.log('Files processed:', results.length);
results.forEach(r => {
  if (r.action === 'unwrapped') {
    console.log(`  UNWRAP: ${r.file} — "${r.title}"`);
  } else if (r.action === 'parse-error') {
    console.log(`  ERROR:  ${r.file} — ${r.error}`);
  }
});
