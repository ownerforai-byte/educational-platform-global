const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

// Fix the remaining two files
const files = [
    'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\english\\writing\\essay-writing\\notes\\introduction.json',
    'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\heat-and-temperature\\concepts\\temperature-scales.json'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.substring(1);
    }
    
    // Remove leading quote if present
    if (content.startsWith('"')) {
        content = content.substring(1);
    }
    
    // Remove trailing quote if present
    if (content.endsWith('"')) {
        content = content.substring(0, content.length - 1);
    }
    
    // Multiple repair passes
    for (let pass = 0; pass < 5; pass++) {
        content = content.replace(/\\r/g, '\r');
        content = content.replace(/\\n/g, '\n');
        content = content.replace(/\\"/g, '"');
        content = content.replace(/""+/g, '"');
    }
    
    try {
        const parsed = jsonrepair(content);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2) + '\n');
        console.log('FIXED:', f.split('\\\\').pop());
    } catch (e) {
        console.log('FAILED:', f.split('\\\\').pop(), '-', e.message);
    }
});

// Final verification
console.log('\nFinal verification...');
const dir = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan';
function findJsons(d, results = []) {
    fs.readdirSync(d).forEach(f => {
        const p = d + '\\\\' + f;
        if (fs.statSync(p).isDirectory()) findJsons(p, results);
        else if (f.endsWith('.json')) results.push(p);
    });
    return results;
}

function isBroken(f) {
    try {
        const c = fs.readFileSync(f, 'utf8');
        JSON.parse(c);
        return false;
    } catch (e) {
        return true;
    }
}

const allFiles = findJsons(dir);
const brokenFiles = allFiles.filter(isBroken);
console.log('Total JSON files:', allFiles.length);
console.log('Still broken:', brokenFiles.length);
