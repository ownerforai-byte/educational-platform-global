const fs = require('fs');

// Check TIR file raw bytes around position 1538
const tirPath = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
const tirContent = fs.readFileSync(tirPath, 'utf8');

console.log('=== TIR FILE RAW ANALYSIS ===');
console.log('Error at position 1538');

// Show bytes around position 1538
const start = Math.max(0, 1530);
const end = Math.min(tirContent.length, 1560);
const ctx = tirContent.substring(start, end);

console.log('\nRaw string context:');
for (let i = 0; i < ctx.length; i++) {
  const code = ctx.charCodeAt(i);
  const absPos = start + i;
  if (code < 32 || code > 126) {
    console.log(`  pos ${absPos}: [${code}] = \\x${code.toString(16)} (${code === 13 ? 'CR' : code === 10 ? 'LF' : 'CONTROL'})`);
  } else {
    console.log(`  pos ${absPos}: '${ctx[i]}' (code ${code})`);
  }
}

// Check quantity-of-heat file
console.log('\n\n=== QUANTITY OF HEAT FILE RAW ANALYSIS ===');
const qohPath = 'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json';
const qohContent = fs.readFileSync(qohPath, 'utf8');

console.log('First 100 bytes:');
for (let i = 0; i < Math.min(100, qohContent.length); i++) {
  const code = qohContent.charCodeAt(i);
  if (code < 32 || code > 126) {
    console.log(`  pos ${i}: [${code}] = \\x${code.toString(16)}`);
  } else {
    console.log(`  pos ${i}: '${qohContent[i]}'`);
  }
}

// Check english file
console.log('\n\n=== ENGLISH TENSES FILE RAW ANALYSIS ===');
const engPath = 'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json';
const engContent = fs.readFileSync(engPath, 'utf8');

console.log('Around position 12151:');
const ep = 12151;
for (let i = Math.max(0, ep-30); i < Math.min(engContent.length, ep+30); i++) {
  const code = engContent.charCodeAt(i);
  if (code < 32 || code > 126) {
    console.log(`  pos ${i}: [${code}] = \\x${code.toString(16)} (${code === 13 ? 'CR' : code === 10 ? 'LF' : 'CTRL'})`);
  } else {
    console.log(`  pos ${i}: '${engContent[i]}'`);
  }
}

// Check ion-pumps file
console.log('\n\n=== ION-PUMPS FILE RAW ANALYSIS ===');
const ionPath = 'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json';
const ionContent = fs.readFileSync(ionPath, 'utf8');

console.log('First 100 bytes:');
for (let i = 0; i < Math.min(100, ionContent.length); i++) {
  const code = ionContent.charCodeAt(i);
  if (code < 32 || code > 126) {
    console.log(`  pos ${i}: [${code}] = \\x${code.toString(16)}`);
  } else {
    console.log(`  pos ${i}: '${ionContent[i]}'`);
  }
}
