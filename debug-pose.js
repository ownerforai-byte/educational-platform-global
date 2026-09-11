const fs = require('fs');

// Check the exact bytes around position 1499 in TIR file
const c = fs.readFileSync('content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json', 'utf8');
console.log('Length:', c.length);
console.log('\nChars around 1498:');
for (let i = 1490; i <= 1515; i++) {
  const ch = c[i];
  console.log(`  ${i}: '${ch}' (code=${ch.charCodeAt(0)})`);
}

// Also check letter-writing intro
const c2 = fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json', 'utf8');
const m2 = /position (\d+)/.exec(fs.readFileSync('content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json','utf8') ? (() => { try { JSON.parse(c2); return null; } catch(e) { return e.message; } })() : null);

// Find error positions
const errors = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json'
];

for (const f of errors) {
  const cc = fs.readFileSync(f, 'utf8');
  try {
    JSON.parse(cc);
    console.log(`\nOK: ${f.split('/').pop()}`);
  } catch (e) {
    const m = /position (\d+)/.exec(e.message);
    if (m) {
      const p = parseInt(m[1]);
      console.log(`\nFAIL: ${f.split('/').pop()} at pos ${p}`);
      console.log('  Context:');
      for (let i = Math.max(0, p-15); i < Math.min(cc.length, p+15); i++) {
        const ch = cc[i];
        console.log(`    ${i}: '${ch}' (${ch.charCodeAt(0)})`);
      }
    }
  }
}
