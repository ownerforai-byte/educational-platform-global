const fs = require('fs');

const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json'
];

for (const file of files) {
  const c = fs.readFileSync(file, 'utf8');
  try {
    JSON.parse(c);
    console.log(`OK: ${file.split('/').pop()}`);
  } catch (e) {
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const p = parseInt(m[1]);
      const ctx = c.substring(Math.max(0, p-30), p+30);
      console.log(`\nFAIL: ${file.split('/').pop()}`);
      console.log(`  Error: ${e.message.substring(0, 80)}`);
      console.log(`  Position: ${p}`);
      console.log(`  Context: ${JSON.stringify(ctx)}`);
    }
  }
}
