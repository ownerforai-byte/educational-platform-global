const fs = require('fs');
const { globSync } = require('glob');

// Collect the 23 broken files from the previous run
const brokenFiles = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
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
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json',
];

function repair(content) {
  // Step 1: Replace all \"/ backslash-quote with just "
  let repaired = content.replace(/\\"/g, '"');
  
  // Step 2: Fix any multiple consecutive quotes (e.g., """" -> "")
  // This handles the quantity-of-heat files where we had """"title""""
  repaired = repaired.replace(/""+/g, '"');
  
  // Step 3: Fix unescaped quotes inside strings by using a state machine
  // Now that all \" are resolved, we need to handle any remaining bare quotes
  // inside strings that aren't terminated properly.
  let result = '';
  let i = 0;
  let inString = false;
  
  while (i < repaired.length) {
    const ch = repaired[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        result += ch;
        i++;
      } else {
        result += ch;
        i++;
      }
    } else {
      if (code === 13) {
        result += '\\r';
        i++;
      } else if (code === 10) {
        result += '\\n';
        i++;
      } else if (ch === '"') {
        // Potential string terminator - look ahead to check
        let j = i + 1;
        while (j < repaired.length && /\s/.test(repaired[j])) j++;
        const isTerminator = j >= repaired.length ||
          repaired[j] === ',' || repaired[j] === ']' ||
          repaired[j] === '}' || repaired[j] === ':';
        
        if (isTerminator) {
          result += ch;
          inString = false;
          i++;
        } else {
          // Unescaped quote inside string - escape it
          result += '\\"';
          i++;
        }
      } else if (ch === '\\') {
        // Handle existing backslash escapes
        let j = i + 1;
        while (j < repaired.length && repaired[j] === '\\') j++;
        const count = j - i;
        if (count % 2 === 1) {
          if (j < repaired.length && '\"\\/bfnrtu'.includes(repaired[j])) {
            result += '\\'.repeat(count);
            result += repaired[j];
            i = j + 1;
          } else {
            result += '\\'.repeat(count + 1);
            i = j;
          }
        } else {
          result += '\\'.repeat(count);
          i = j;
        }
      } else if (code < 0x20) {
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        i++;
      }
    }
  }
  
  if (inString) result += '"';
  return result;
}

let fixed = 0;
let stillBroken = 0;

for (const file of brokenFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const repaired = repair(content);
    JSON.parse(repaired);
    
    // Write the repaired version
    fs.writeFileSync(file, repaired, 'utf8');
    console.log(`Fixed: ${file.split('/').pop()}`);
    fixed++;
  } catch (e) {
    console.log(`STILL BROKEN: ${file}`);
    console.log(`  Error: ${e.message.substring(0, 60)}`);
    stillBroken++;
  }
}

console.log(`\nRepair complete: ${fixed} fixed, ${stillBroken} still broken`);
