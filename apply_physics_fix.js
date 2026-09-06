const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'content/ravikishan/class-11-notes/physics');
const targetPattern = /"\\"/g;

function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const fp = path.join(dir, d.name);
    if (d.isDirectory()) {
      walk(fp);
    } else if (d.name.endsWith('.json') && d.name !== 'plan.json') {
      try {
        const raw = fs.readFileSync(fp, 'utf8');
        // Only fix if it contains the corrupted pattern
        if (raw.includes('\\"')) {
          const fixed = raw.replace(targetPattern, '"');
          const obj = JSON.parse(fixed);
          
          // Ensure topicSlug exists (same logic as build script)
          if (!obj.topicSlug && obj.title) {
            obj.topicSlug = obj.title.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
          }
          
          fs.writeFileSync(fp, JSON.stringify(obj, null, 2), 'utf8');
          console.log(`FIXED: ${path.relative(SRC, fp)}`);
        }
      } catch (e) {
        console.log(`SKIP/FAIL: ${path.relative(SRC, fp)} - ${e.message.slice(0,50)}`);
      }
    }
  });
}

walk(SRC);
