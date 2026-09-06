const fs = require('fs');
const { globSync } = require('glob');

// Run the fix logic from v13 on just the remaining broken files
function fixJSON(content) {
  let result = '';
  let i = 0;
  let inString = false;
  let prevBackslash = false;
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        prevBackslash = false;
        result += ch;
      } else if (ch === '\\') {
        result += ch;
        prevBackslash = true;
      } else {
        result += ch;
        prevBackslash = false;
      }
      i++;
    } else {
      if (prevBackslash) {
        result += ch;
        prevBackslash = false;
        i++;
      } else if (ch === '\\') {
        result += ch;
        prevBackslash = true;
        i++;
      } else if (ch === '"') {
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (j >= content.length || content[j] === ',' || content[j] === ']' || content[j] === '}' || content[j] === ':') {
          result += ch;
          inString = false;
          i++;
        } else {
          result += '\\"';
          i++;
        }
      } else if (code < 0x20) {
        result += '\\u' + code.toString(16).padStart(4, '0');
        i++;
      } else {
        result += ch;
        prevBackslash = false;
        i++;
      }
    }
  }
  return result;
}

const brokenFiles = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/physics/recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/05-principle-of-calorimetry.json',
  'content/ravikishan/class-11-notes/physics/heat-and-temperature/concepts/temperature-scales.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/writing/essay-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json'
];

for (const f of brokenFiles) {
  const c = fs.readFileSync(f, 'utf8');
  try {
    JSON.parse(c);
    console.log(f.split('/').pop(), ': ALREADY OK');
    continue;
  } catch(e) {}
  
  const fixed = fixJSON(c);
  try {
    JSON.parse(fixed);
    fs.writeFileSync(f, fixed, 'utf8');
    console.log(f.split('/').pop(), ': FIXED');
  } catch(e) {
    console.log(f.split('/').pop(), ': STILL BROKEN');
    console.log('  Original error:', e.message.substring(0, 80));
    const m = e.message.match(/position (\d+)/);
    if (m) {
      const p = parseInt(m[1]);
      console.log('  Fixed context:', JSON.stringify(fixed.substring(Math.max(0,p-20), p+20)));
    }
  }
}
