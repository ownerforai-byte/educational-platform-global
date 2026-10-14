const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const files = [
  ...fs.readdirSync(path.join(root, 'play-store'))
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(root, 'play-store', file)),
  ...fs.readdirSync(path.join(root, 'play-store/host'))
    .filter((file) => file.endsWith('.html'))
    .map((file) => path.join(root, 'play-store/host', file)),
  'frontend/app/legal/privacy/page.tsx',
  'frontend/app/legal/terms/page.tsx',
  'frontend/app/legal/purchases/page.tsx',
  'frontend/app/legal/cookies/page.tsx',
  'frontend/app/legal/layout.tsx',
].map((file) => path.isAbsolute(file) ? file : path.join(root, file));

const replacements = [
  ['[NEPAL / YOUR CHOSEN JURISDICTION]', 'Nepal'],
  ['[NEPAL / YOUR JURISDICTION]', 'Nepal'],
  ['[JURISDICTION]', 'Nepal'],
  ['[YOUR_NAME_OR_ENTITY]', 'Ravikisan'],
  ['[YOUR_PHYSICAL_ADDRESS, NEPAL]', 'Kalaiya-25, Bara, Madhesh Province, Nepal'],
  ['[7]', '7'],
  ['ownerforai@gmail.com', 'ravikisan1814@gmail.com'],
];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  let replacementCount = 0;
  for (const [search, replacement] of replacements) {
    const count = updated.split(search).length - 1;
    if (count > 0) {
      updated = updated.split(search).join(replacement);
      replacementCount += count;
    }
  }
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    console.log(`UPDATED ${path.relative(root, file)} (${replacementCount} replacements)`);
  } else {
    console.log(`clean   ${path.relative(root, file)}`);
  }
}
