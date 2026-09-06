const fs = require('fs');

const files = [
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\06-newtons-law-of-cooling-statement.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\05-principle-of-calorimetry.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\04-heat-capacity-thermal-capacity.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\03-specific-heat-units-and-dimensions.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\02-specific-heat-capacity-definition.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\01-heat-mass-and-temperature-dependency.json",
  "C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\heat-and-temperature\\concepts\\temperature-scales.json",
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // The corruption pattern in these files seems to be multiple quotes: `""""`
    // And also potentially escaped quotes that are not needed: `\"`
    
    // 1. Remove systemic multiple quotes
    let repaired = content.replace(/""+/g, '"');
    
    // 2. Also replace all escaped quotes \" with "
    repaired = repaired.replace(/\\"/g, '"');
    
    // 3. And then replace systemic multiple quotes again just to be sure
    repaired = repaired.replace(/""+/g, '"');

    try {
        const parsed = JSON.parse(repaired);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2) + '\n');
        console.log(`Fixed: ${f.split('\\').pop()}`);
    } catch (e) {
        console.log(`Still failed: ${f.split('\\').pop()}`);
    }
});
