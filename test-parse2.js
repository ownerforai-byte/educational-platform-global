const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const content = fs.readFileSync(path, 'utf8');

console.log('Total length:', content.length);
console.log('Char at 4675:', JSON.stringify(content[4675]));
console.log('Surrounding context (hex):', Buffer.from(content.substring(4660, 4700)).toString('hex'));
console.log('Surrounding context (str):', JSON.stringify(content.substring(4660, 4700)));

// Try to parse and show error
try {
  JSON.parse(content);
} catch (e) {
  const pos = e.message.match(/position (\d+)/);
  if (pos) {
    console.log('\nError at position:', pos[1]);
    console.log('Before error:', JSON.stringify(content.substring(parseInt(pos[1])-10, parseInt(pos[1]))));
    console.log('At error:', JSON.stringify(content[parseInt(pos[1])]));
    console.log('After error:', JSON.stringify(content.substring(parseInt(pos[1]), parseInt(pos[1])+10)));
  }
}