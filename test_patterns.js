// test_patterns.js
const fs = require('fs');
const path = require('path');

const SRC = 'content/ravikishan/class-11-notes/physics';

function inspect(rel) {
  const fp = path.join(SRC, rel);
  const raw = fs.readFileSync(fp, 'utf8');
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    console.log(`PARSE FAIL: ${rel} — ${e.message.slice(0, 60)}`);
    return;
  }
  console.log(`\n${rel}:`);
  console.log(`  typeof parsed: ${typeof obj} isArray:${Array.isArray(obj)}`);
  if (typeof obj === 'string') {
    console.log(`  CONTENT (first 80): ${obj.slice(0, 80)}`);
    try {
      const inner = JSON.parse(obj);
      console.log(`  inner type: ${typeof inner} isArray:${Array.isArray(inner)}`);
      if (typeof inner === 'object' && inner !== null && !Array.isArray(inner)) {
        console.log(`  INNER keys: ${Object.keys(inner).slice(0, 5).join(', ')}`);
        console.log(`  INNER topicSlug: ${inner.topicSlug}`);
      }
    } catch (e2) {
      console.log(`  inner parse fail: ${e2.message.slice(0, 60)}`);
    }
    return;
  }
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    console.log(`  keys (first 5): ${keys.slice(0, 5).join(', ')}`);
    // Check for escaped-quote keys
    const firstKey = keys[0];
    console.log(`  key[0]: ${JSON.stringify(firstKey)} charCodes: ${[...firstKey].map(c => c.charCodeAt(0)).join(',')}`);
    // Check if raw has backslash-quote sequence
    const hasBsQuote = raw.includes('\\"');
    const hasDoubleBs = raw.includes('\\\\');
    console.log(`  raw has \\" : ${hasBsQuote}`);
    console.log(`  raw has \\\\ : ${hasDoubleBs}`);
    // Try removing all backslashes from raw
    const noBs = raw.replace(/[\\]/g, '');
    try {
      const fixed = JSON.parse(noBs);
      console.log(`  FIX via remove-all-bs: topicSlug=${fixed.topicSlug} title=${(fixed.title||'').slice(0,30)}`);
    } catch (e3) {
      console.log(`  FIX via remove-all-bs FAIL: ${e3.message.slice(0, 60)}`);
    }
    // Check if keys start with quote
    const hasQuoteKeys = keys.some(k => k.startsWith('"'));
    console.log(`  keys start with quote: ${hasQuoteKeys}`);
  }
}

const files = [
  'thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json',
  'vectors/concepts/11-multiplication-of-vectors-vector-cross-product.json',
  'quantity-of-heat/concepts/08-newtons-law-identical-cooling-conditions.json',
  'quantity-of-heat/concepts/09-newtons-law-purpose-and-applications.json',
  'quantity-of-heat/concepts/10-newtons-law-exponential-solution.json',
  'rate-of-heat-flow/concepts/01-conduction-thermal-conductivity.json',
  'rate-of-heat-flow/concepts/03-radiation-ideal-radiator.json',
  'rate-of-heat-flow/concepts/04-black-body-radiation.json',
  'refraction-at-plane-surfaces/concepts/02-relation-between-refractive-indices.json',
  'refraction-at-plane-surfaces/concepts/03-lateral-shift.json',
  'refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'refraction-through-prisms/concepts/01-minimum-deviation-condition.json',
  'refraction-through-prisms/concepts/03-deviation-in-a-small-angle-prism.json',
  'recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
  'quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
];

for (const f of files) inspect(f);
