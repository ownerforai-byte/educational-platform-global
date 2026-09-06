const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Replace all \" with "
content = content.replace(/\\"/g, '"');

// Replace all multiple consecutive quotes with single quote
content = content.replace(/""+/g, '"');

// Now, manually find and fix internal quotes
// An internal quote is one that appears inside a string value (not at the start or end)
// We'll do this by looking for patterns like: "word"word or word"word"
// This is tricky with regex. Let's try a different approach:
// Use a JSON parser that can tolerate some errors.

// For now, let's just see what the content looks like around the error position.
console.log('Content around position 1499:');
console.log(content.substring(1480, 1520));
