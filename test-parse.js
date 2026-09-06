const fs = require('fs');
const path = 'content/ravikishan/class-11-notes/physics/vectors/concepts/12-cross-product-component-form-and-area-of-parallelogram.json';

try {
  const content = fs.readFileSync(path, 'utf8');
  // Strip BOM \\uFEFF
  const cleanContent = content.replace(/^\\uFEFF/, '');
  JSON.parse(cleanContent);
  console.log('Parsed successfully!');
} catch (e) {
  console.error('Failed to parse:', e.message);
  // Show first 50 chars as hex
  const content = fs.readFileSync(path, 'utf8');
  console.log('First 50 chars hex:', Buffer.from(content.substring(0, 50)).toString('hex'));
}
