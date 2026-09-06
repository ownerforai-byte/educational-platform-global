// test_clean_fix.js — use file-based test (no shell escaping issues)
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';

const files = [
  'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json',
  'vectors/concepts/11-multiplication-of-vectors-vector-cross-product.json',
  'quantity-of-heat/concepts/08-newtons-law-identical-cooling-conditions.json',
  'rate-of-heat-flow/concepts/01-conduction-thermal-conductivity.json',
  'refraction-at-plane-surfaces/concepts/02-relation-between-refractive-indices.json',
  'recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
];

// Strategy: remove ALL backslash characters from raw content
// These corrupted files have NO legitimate JSON escapes
function removeBackslashes(raw) {
  return raw.replace(/\\/g, '');
}

let ok = 0, fail = 0;
for (const rel of files) {
  const fp = path.join(SRC, rel);
  const raw = fs.readFileSync(fp, 'utf8');

  // Count backslashes
  let bsCount = 0;
  for (let i = 0; i < raw.length; i++) {
    if (raw.charCodeAt(i) === 92) bsCount++;
  }
  console.log(`${rel.split('/')[0].slice(0, 20)}: ${bsCount} backslashes`);

  const cleaned = removeBackslashes(raw);
  try {
    const obj = JSON.parse(cleaned);
    console.log(`  PARSE OK! topicSlug: ${obj.topicSlug} title: ${(obj.title || '').slice(0, 40)}`);
    ok++;
  } catch (e) {
    console.log(`  PARSE FAIL: ${e.message.slice(0, 60)}`);
    fail++;
  }
}
console.log(`\nResults: ${ok} OK, ${fail} FAIL`);
