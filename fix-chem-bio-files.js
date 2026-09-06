const fs = require('fs');

// Chemistry and Biology files seem to have different corruption patterns
// Let's analyze and fix them

const files = [
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\chemistry\\chemical-bonding-and-shapes-of-molecules\\concepts\\09-bond-characteristics-bond-length-ionic-character-dipole-moment.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\chemistry\\bio-inorganic-chemistry\\concepts\\02-ion-pumps-and-metal-toxicity.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\biology\\faunal-diversity\\concepts\\03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\biology\\faunal-diversity\\concepts\\01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json",
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Analyze the corruption pattern
    console.log(`\n=== ${f.split('\\').pop()} ===`);
    console.log('First 200 chars:', content.substring(0, 200));
    
    // 1. Remove systemic multiple quotes
    let repaired = content.replace(/""+/g, '"');
    
    // 2. Replace all escaped quotes \" with "
    repaired = repaired.replace(/\\"/g, '"');
    
    // 3. Replace multiple quotes again
    repaired = repaired.replace(/""+/g, '"');
    
    console.log('After cleanup:', repaired.substring(0, 200));
    
    try {
        const parsed = JSON.parse(repaired);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2) + '\n');
        console.log('Fixed!');
    } catch (e) {
        console.log(`Failed: ${e.message}`);
        
        // For very corrupted files, let's try to create a minimal valid structure
        // Extract just the key names and values we can
        const m = /position (\d+)/.exec(e.message);
        if (m) {
            const pos = parseInt(m[1]);
            console.log('Error at position:', pos);
            console.log('Context:', repaired.substring(pos - 30, pos + 30));
        }
    }
});
