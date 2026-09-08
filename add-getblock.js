const fs = require('fs');
const f = 'frontend/components/lab/chemistry-lab.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Find line with "export type Element" and insert getBlock after the closing };
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'export type Element = {') {
    // Find the closing };
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].trim() === '}') {
        insertIdx = j + 1;
        break;
      }
    }
    break;
  }
}

if (insertIdx > 0) {
  const blockFn = `
/** Derive the s/p/d/f block from an element's electron configuration. */
export function getBlock(el: Element): "s" | "p" | "d" | "f" {
  const config = el.electronConfig ?? "";
  const match = config.match(/([spdf])[\\d⁰¹²³⁴⁵⁶⁷⁸⁹]+$/);
  if (match) return match[1] as "s" | "p" | "d" | "f";
  if (el.row === 9 || el.row === 10) return "f";
  if (el.col >= 3 && el.col <= 12) return "d";
  if (el.col >= 13 && el.col <= 18) return "p";
  return "s";
}`;
  lines.splice(insertIdx, 0, blockFn);
  console.log('Inserted getBlock at line', insertIdx + 1);
} else {
  console.log('FAILED to find insertion point');
}

fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Done');
console.log('getBlock exists:', fs.readFileSync(f, 'utf8').includes('export function getBlock'));
