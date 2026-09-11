const fs = require('fs');
const files = [
  'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json',
  'content/ravikishan/class-11-notes/physics/vectors/concepts/11-multiplication-of-vectors-vector-cross-product.json',
  'content/ravikishan/class-11-notes/physics/thermal-expansion/concepts/01-linear-expansion-and-its-measurement.json',
  'content/ravikishan/class-11-notes/physics/refraction-through-prisms/concepts/03-deviation-in-a-small-angle-prism.json',
  'content/ravikishan/class-11-notes/physics/refraction-through-prisms/concepts/01-minimum-deviation-condition.json',
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/03-lateral-shift.json',
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/02-relation-between-refractive-indices.json',
  'content/ravikishan/class-11-notes/physics/recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
  'content/ravikishan/class-11-notes/physics/rate-of-heat-flow/concepts/04-black-body-radiation.json',
  'content/ravikishan/class-11-notes/physics/rate-of-heat-flow/concepts/03-radiation-ideal-radiator.json',
  'content/ravikishan/class-11-notes/physics/rate-of-heat-flow/concepts/01-conduction-thermal-conductivity.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/10-newtons-law-exponential-solution.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/09-newtons-law-purpose-and-applications.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/08-newtons-law-identical-cooling-conditions.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/06-newtons-law-of-cooling-statement.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/05-principle-of-calorimetry.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/04-heat-capacity-thermal-capacity.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/03-specific-heat-units-and-dimensions.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/02-specific-heat-capacity-definition.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json',
  'content/ravikishan/class-11-notes/physics/heat-and-temperature/concepts/temperature-scales.json',
  'content/ravikishan/class-11-notes/nepali/bhasha-ra-vyakarana/concepts/shabda-srot.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/writing/essay-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/reading-and-comprehension/comprehension-skills/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/subject-verb-agreement/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/prepositions/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/parts-of-speech/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/modals/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/direct-indirect-speech/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/determiners/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/conjunctions/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/active-passive-voice/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/botany5-1.json',
  'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/03-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae.json',
  'content/ravikishan/class-11-notes/biology/floral-diversity/concepts/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-summary-and-note-making.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-story-writing.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-speech-writing.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-report-writing-and-summarisation.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-paragraph-writing.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-grammar-for-writing-sentences-clauses-punctuation.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-essay-writing-argumentative-descriptive-narrative-expository.json',
  'content/ravikishan/class-11/english/writing-and-composition/concepts/01-comprehension-and-unseen-passage.json'
];

let fixedCount = 0;
let failedCount = 0;

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Fix broken property names like \\\"\\\"\\\"title\\\"\\\"\\\"
    content = content.replace(/\\\"\\\"\\\"(.*?)\\\\\"\\\"\\\"/g, '"$1"');
    
    // 2. Fix unescaped internal quotes within strings (heuristic: look for a quote not preceded/followed by comma/bracket)
    // This is risky, but necessary for these specific files.
    content = content.replace(/([^\s,\[\]{}:])"([^\s,\[\]{}:])/g, '$1\\"$2');
    
    // 3. Fix unescaped control chars (already handled partially, but doing again)
    content = content.replace(/[\x00-\x1f]/g, '');

    // 4. Final repair pass
    // Remove trailing commas, double quotes
    content = content.replace(/,\s*([}\]])/g, '$1');
    content = content.replace(/"""/g, '"');

    JSON.parse(content);
    fs.writeFileSync(file, content);
    console.log('Fixed:', file);
    fixedCount++;
  } catch (e) {
    console.error('Failed:', file, e.message.substring(0, 50));
    failedCount++;
  }
}
console.log('Done:', fixedCount, 'fixed,', failedCount, 'failed');
