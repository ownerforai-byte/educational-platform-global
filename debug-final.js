const fs = require('fs');

const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/physics/quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
  'content/ravikishan/class-11-notes/physics/heat-and-temperature/concepts/temperature-scales.json',
  'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json',
  'content/ravikishan/class-11-notes/chemistry/chemical-bonding-and-shapes-of-molecules/concepts/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json',
  'content/ravikishan/class-11-notes/chemistry/bio-inorganic-chemistry/concepts/02-ion-pumps-and-metal-toxicity.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json',
];

for (const f of files) {
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
    console.log(`OK: ${f.split('/').pop()}`);
    continue;
  } catch (e) {
    const match = /position (\d+)/.exec(e.message);
    const pos = match ? parseInt(match[1]) : 0;
    const content = fs.readFileSync(f, 'utf8');
    
    console.log(`\n=== ${f.split('/').pop()} ===`);
    console.log(`Error: ${e.message.substring(0, 100)}`);
    console.log(`Position: ${pos}`);
    
    // Show context around error position
    const start = Math.max(0, pos - 50);
    const end = Math.min(content.length, pos + 50);
    const ctx = content.substring(start, end);
    const lines = ctx.split('\n');
    
    console.log(`Context (${lines.length} lines):`);
    lines.forEach((l, i) => {
      const absPos = start + ctx.substring(0, ctx.split('\n').slice(0, i + 1).join('\n').length) - l.length;
      const marker = absPos + l.length <= pos + 50 ? ' <--' : '';
      console.log(`  ${i}: ${JSON.stringify(l)}${marker}`);
    });
    
    // Also show byte-level context
    const bytes = [];
    for (let i = start; i < end && i < pos + 30; i++) {
      bytes.push(content.charCodeAt(i));
    }
    console.log(`Bytes: ${bytes.map(b => b < 32 ? `\\x${b.toString(16).padStart(2,'0')}` : String.fromCharCode(b)).join('')}`);
  }
}
