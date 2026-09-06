const fs = require('fs');

function findIssues(content, filename) {
  console.log(`\n=== ${filename.split('/').pop()} ===`);
  console.log(`Length: ${content.length}`);
  
  let i = 0;
  let inString = false;
  const issues = [];
  
  while (i < content.length) {
    const ch = content[i];
    const code = ch.charCodeAt(0);
    
    if (!inString) {
      if (ch === '"') {
        inString = true;
        i++;
      } else {
        i++;
      }
    } else {
      if (code === 13 || code === 10) {
        issues.push(`Control char at ${i}: ${JSON.stringify(ch)}`);
        i++;
      } else if (ch === '"') {
        // Check if this is a terminator
        let j = i + 1;
        while (j < content.length && /\s/.test(content[j])) j++;
        const isTerminator = j >= content.length ||
          content[j] === ',' || content[j] === ']' ||
          content[j] === '}' || content[j] === ':';
        
        if (!isTerminator) {
          issues.push(`Unescaped quote at ${i}: ${JSON.stringify(content.substring(Math.max(0,i-15), i+15))}`);
        }
        i++;
      } else if (ch === '\\') {
        // Check for escaped quote
        if (i + 1 < content.length && content[i + 1] === '"') {
          // This is \", which after our repair should be just "
          // But if it's still there, it might cause issues
        }
        i++;
      } else {
        i++;
      }
    }
  }
  
  if (issues.length === 0) {
    console.log('No issues found');
  } else {
    console.log(`Found ${issues.length} issues:`);
    issues.slice(0, 5).forEach(issue => console.log('  ' + issue));
  }
}

const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json',
  'content/ravikishan/class-11-notes/biology/faunal-diversity/concepts/03-earthworm-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion.json',
];

for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    findIssues(content, f);
  } catch (e) {
    console.log(`Error reading ${f}: ${e.message}`);
  }
}
