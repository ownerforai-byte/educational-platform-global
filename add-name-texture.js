const fs = require('fs');
const f = 'frontend/components/lab/chemistry-lab.tsx';
let c = fs.readFileSync(f, 'utf8');

// Update sprite to use combined symbol+name texture
const oldSprite = 'map: createSymbolTexture(el.symbol), transparent: true, depthTest: false, opacity: visible ? 1 : 0.15 });\r\n        const sprite = new THREE.Sprite(spriteMaterial);\r\n        sprite.position.set(0, boxH / 2 + 0.4, 0);\r\n        sprite.scale.set(1.2, 0.6, 1);';
const newSprite = 'map: createElementLabelTexture(el.symbol, el.name), transparent: true, depthTest: false, opacity: visible ? 1 : 0.15 });\r\n        const sprite = new THREE.Sprite(spriteMaterial);\r\n        sprite.position.set(0, boxH / 2 + 0.5, 0);\r\n        sprite.scale.set(1.6, 0.8, 1);';

if (c.includes(oldSprite)) {
  c = c.replace(oldSprite, newSprite);
  console.log('Updated sprite to show symbol + name');
} else {
  console.log('FAILED to find sprite pattern');
  // Try with just \n
  const altSprite = 'map: createSymbolTexture(el.symbol), transparent: true, depthTest: false, opacity: visible ? 1 : 0.15 });\n        const sprite = new THREE.Sprite(spriteMaterial);\n        sprite.position.set(0, boxH / 2 + 0.4, 0);\n        sprite.scale.set(1.2, 0.6, 1);';
  if (c.includes(altSprite)) {
    c = c.replace(altSprite, newSprite.replace(/\r\n/g, '\n'));
    console.log('Updated sprite (alt pattern)');
  } else {
    console.log('Still failed - showing context');
    const idx = c.indexOf('createSymbolTexture(el.symbol)');
    console.log(JSON.stringify(c.substring(idx, idx + 200)));
  }
}

fs.writeFileSync(f, c, 'utf8');
console.log('Done');
console.log('Has createElementLabelTexture:', c.includes('createElementLabelTexture'));
