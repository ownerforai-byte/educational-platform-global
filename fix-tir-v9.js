const fs = require('fs');

const file = 'content/ravikishan/class-11-notes/physics/refraction-at-plane-surfaces/concepts/04-total-internal-reflection.json';
let content = fs.readFileSync(file, 'utf8');

// Replace all \" with " globally first
let clean = content.replace(/\\"/g, '"');

// Now, the internal quotes are structural quotes.
// The structural quotes are also structural quotes.
// This is the problem.

// Let's try to fix the internal ones specifically.
// The internal quote is around "total".
// It looks like: ... is "total":** ...
// It is NOT followed by a comma or colon.

// Let's look for quotes that are NOT followed by structural characters.
// This is the definition of an internal quote in this file.

let repaired = '';
let inString = false;
let stringContent = [];

// A quote is internal if it's NOT a terminator.
// Terminator characters: , : } ] 

// This is still hard to do with a simple state machine.

// What if I just use the existing JSON parser to find the error and fix it?
// That's what I've been doing.

// Let's try a completely different approach for the TIR file:
// Since it has only one internal quote issue (the one around "total"),
// can I just fix that and then rely on a JSON parser to tell me if it's valid?

// Try this:
clean = clean.replace(/"total"/g, '\\"total\\"');

try {
    const parsed = JSON.parse(clean);
    console.log('Parsing successful!');
    fs.writeFileSync(file, JSON.stringify(parsed, null, 2) + '\n');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
