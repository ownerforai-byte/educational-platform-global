const fs = require('fs');

// Read original files from git
const files = [
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
];

for (const file of files) {
  // Get the original from git
  const { execSync } = require('child_process');
  const content = execSync(`git show HEAD:${file}`).toString('utf8');
  
  console.log(`\n=== ${file.split('/').pop()} ===`);
  console.log('Original length:', content.length);
  
  // Find the error positions mentioned
  let i = 0;
  let inString = false;
  let errors = [];
  
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
        // Control character inside string - this is an error in the ORIGINAL
        errors.push(`Control char at ${i}: ${JSON.stringify(ch)}`);
        i++;
      } else if (ch === '"') {
        // Check if properly escaped
        if (i > 0 && content[i-1] === '\\') {
          // This is an escaped quote, fine
          i++;
        } else {
          // Potential unescaped quote
          let j = i + 1;
          while (j < content.length && /\s/.test(content[j])) j++;
          const isTerminator = j >= content.length ||
            content[j] === ',' || content[j] === ']' ||
            content[j] === '}' || content[j] === ':';
          
          if (!isTerminator) {
            errors.push(`Unescaped quote at ${i}: ${JSON.stringify(content.substring(Math.max(0,i-15), i+15))}`);
          }
          inString = false;
          i++;
        }
      } else if (ch === '\\') {
        // Escaped character
        i += 2;
      } else {
        i++;
      }
    }
  }
  
  console.log(`Found ${errors.length} potential issues:`);
  errors.slice(0, 10).forEach(e => console.log('  ' + e));
}
