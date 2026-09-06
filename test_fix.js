// test_fix.js - test the remove-all-backslashes fix
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

for (const rel of files) {
  const fp = path.join(SRC, rel);
  const raw = fs.readFileSync(fp, 'utf8');

  // Strategy: remove ALL backslash characters from raw bytes
  // These files have no real JSON escapes (\n, \t) — the backslashes are corruption
  const cleaned = raw.replace(/\\/g, '');

  let obj;
  try {
    obj = JSON.parse(cleaned);
  } catch (e) {
    console.log(`FAIL ${rel}: ${e.message.slice(0, 80)}`);
    console.log(`  cleaned sample: ${cleaned.slice(0, 120)}`);
    continue;
  }

  // Re-key: strip leading quote from keys, strip quotes from values
  const fixed = {};
  for (const [k, v] of Object.entries(obj)) {
    const newKey = k.replace(/^"/, '').replace(/"$/, '');
    let newVal = v;
    if (typeof v === 'string') {
      newVal = v.replace(/^"/, '').replace(/"$/, '');
    }
    fixed[newKey] = newVal;
  }

  if (!fixed.topicSlug && fixed.title) {
    fixed.topicSlug = fixed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (!fixed.title && fixed.topicTitle) {
    fixed.title = fixed.topicTitle;
  }

  console.log(`OK ${rel}`);
  console.log(`  topicSlug: ${fixed.topicSlug}`);
  console.log(`  title: ${(fixed.title || '').slice(0, 50)}`);
}
