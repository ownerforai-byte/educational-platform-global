const fs = require('fs');

const files = [
  'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json',
  'content/ravikishan/class-11-notes/english/grammar/tenses/notes/introduction.json',
  'content/ravikishan/class-11-notes/english/writing/letter-writing/notes/introduction.json',
];

for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    JSON.parse(content);
    console.log(`OK: ${f.split('/').pop()}`);
  } catch (e) {
    const match = /position (\d+)/.exec(e.message);
    const pos = match ? parseInt(match[1]) : 0;
    const content = fs.readFileSync(f, 'utf8');
    
    console.log(`\n=== ${f.split('/').pop()} ===`);
    console.log(`Error: ${e.message.substring(0, 100)}`);
    console.log(`Position: ${pos}`);
    
    // Show context
    const start = Math.max(0, pos - 100);
    const end = Math.min(content.length, pos + 100);
    const ctx = content.substring(start, end);
    console.log(`Context: ${JSON.stringify(ctx)}`);
    
    // Show raw bytes
    console.log(`Bytes: ${ctx.split('').map(c => {
      const code = c.charCodeAt(0);
      if (code < 32) return `\\x${code.toString(16).padStart(2, '0')}`;
      return c;
    }).join('')}`);
  }
}
