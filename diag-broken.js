const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';
const c = fs.readFileSync(path, 'utf8');
console.log('Around error pos 4675:');
console.log('Full context (4660-4700):', JSON.stringify(c.substring(4660, 4700)));
console.log('Raw chars:');
for (let i = 4660; i < 4700; i++) {
  console.log(i, JSON.stringify(c[i]), c.charCodeAt(i));
}
console.log('\nTotal length:', c.length);
