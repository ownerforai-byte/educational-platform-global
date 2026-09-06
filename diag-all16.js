const fs = require('fs');

// Check all 16 broken files in detail
const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/physics/recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/writing/essay-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/subject-verb-agreement/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/prepositions/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/parts-of-speech/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/modals/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/direct-indirect-speech/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/conjunctions/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/active-passive-voice/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json'
];

for (const file of files) {
  const c = fs.readFileSync(file, 'utf8');
  try {
    JSON.parse(c);
    console.log('OK: ' + file.split('/').pop());
    continue;
  } catch (e) {
    const name = file.split('/').pop();
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const pos = parseInt(m[1]);
      console.log(`\n${name}: ${e.message.substring(0, 80)}`);
      console.log(`  pos=${pos} | ctx=${JSON.stringify(c.substring(Math.max(0,pos-15), pos+15))}`);
    } else {
      // Error without position - show a larger context
      console.log(`\n${name}: ${e.message.substring(0, 100)}`);
      // Try to find the problematic area by looking for structural issues
      const ctxMatch = e.message.match(/"[^"]*"/);
      if (ctxMatch) {
        const idx = c.indexOf(ctxMatch[0].substring(1, ctxMatch[0].length - 1));
        if (idx >= 0) {
          console.log(`  Found in context at ${idx}: ${JSON.stringify(c.substring(Math.max(0,idx-10), idx+50))}`);
        }
      }
    }
  }
}
