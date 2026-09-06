const fs = require('fs');
const path = require('path');

const brokenFiles = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/physics/recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/06-newtons-law-of-cooling-statement.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/05-principle-of-calorimetry.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/04-heat-capacity-thermal-capacity.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/03-specific-heat-units-and-dimensions.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/02-specific-heat-capacity-definition.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json',
  'content/ravikishan/class-11-notes/physics/heat-and-temperature/concepts/temperature-scales.json',
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

for (const f of brokenFiles) {
  const c = fs.readFileSync(f, 'utf8');
  console.log('\n=== ' + path.basename(f) + ' ===');
  
  // Show first 20 chars
  console.log('First 20:', JSON.stringify(c.substring(0, 20)));
  
  try {
    JSON.parse(c);
    console.log('PARSES OK');
  } catch (e) {
    console.log('Error:', e.message);
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const p = parseInt(m[1]);
      console.log('Context:', JSON.stringify(c.substring(Math.max(0, p - 20), p + 20)));
      // Show char codes around position
      console.log('Char codes:', Array.from(c.substring(Math.max(0, p - 10), p + 10)).map(ch => ch.charCodeAt(0)));
    }
  }
}
