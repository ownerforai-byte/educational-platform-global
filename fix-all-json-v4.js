const fs = require('fs');
const { jsonrepair } = require('jsonrepair');

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

brokenFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.substring(1);
    }
    
    // Remove leading quote if present
    if (content.startsWith('"')) {
        content = content.substring(1);
    }
    
    // Multiple repair passes
    for (let pass = 0; pass < 5; pass++) {
        // Replace literal \\r\\n (backslash-r-backslash-n) with control chars
        content = content.replace(/\\r/g, '\r');
        content = content.replace(/\\n/g, '\n');
        
        // Replace \" with "
        content = content.replace(/\\"/g, '"');
        
        // Collapse multiple consecutive quotes
        content = content.replace(/""+/g, '"');
    }
    
    try {
        const parsed = jsonrepair(content);
        fs.writeFileSync(f, JSON.stringify(parsed, null, 2) + '\n');
        console.log('FIXED:', f.split('\\\\').pop());
    } catch (e) {
        console.log('FAILED:', f.split('\\\\').pop(), '-', e.message.substring(0, 80));
    }
});

// Check again
const stillBroken = findJsons(dir).filter(isBroken);
console.log('\nStill broken after fix:', stillBroken.length);
if (stillBroken.length > 0) {
    console.log('Remaining:');
    stillBroken.forEach(f => console.log('  -', f.split('\\\\').pop()));
}
