import fs from 'fs';
import path from 'path';

const dir = 'frontend/app';
let count = 0;

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      walk(p);
    } else if (f.endsWith('.tsx')) {
      const content = fs.readFileSync(p, 'utf8');
      if (content.includes('export const runtime = "edge";')) {
        fs.writeFileSync(p, content.replace(/export const runtime = "edge";\n?/g, ''));
        count++;
      }
    }
  }
}

walk(dir);
console.log('Updated', count, 'files');
