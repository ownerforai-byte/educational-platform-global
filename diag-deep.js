const fs = require('fs');

// Diagnostic: show byte-by-byte what's at the error position
const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
];

for (const file of files) {
  const c = fs.readFileSync(file, 'utf8');
  try {
    JSON.parse(c);
    console.log(file.split('/').pop() + ': PARSES OK');
    continue;
  } catch (e) {
    const m = e.message.match(/position (\d+)/);
    if (!m) {
      console.log(file.split('/').pop() + ': ERROR (no pos): ' + e.message.substring(0, 100));
      continue;
    }
    const pos = parseInt(m[1]);
    console.log('\n=== ' + file.split('/').pop() + ' ===');
    console.log('Error: ' + e.message);
    console.log('Position: ' + pos);
    
    // Show 30 chars before and after as individual char codes
    const start = Math.max(0, pos - 30);
    const end = Math.min(c.length, pos + 30);
    const substr = c.substring(start, end);
    console.log('Raw context: ' + JSON.stringify(substr));
    
    console.log('Char codes:');
    for (let i = start; i < end; i++) {
      const ch = c[i];
      const code = ch.charCodeAt(0);
      const marker = i === pos ? ' <<<' : '';
      console.log(`  ${i}: ${code} '${ch}'${marker}`);
    }
  }
}
