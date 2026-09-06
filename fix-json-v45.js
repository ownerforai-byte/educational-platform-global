const fs = require('fs');
const glob = require('glob');

const files = glob.sync('content/ravikishan/**/*.json');
let fixedCount = 0;
let failedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix invalid backslash escapes by doubling the backslash
    // Replace \x (where x is not a valid JSON escape) with \\x
    const fixedContent = content.replace(/\\([^"\/bfnrtu])/g, '\\\\$1');

    try {
        JSON.parse(fixedContent);
        if (content !== fixedContent) {
            fs.writeFileSync(file, fixedContent, 'utf8');
            console.log('Fixed:', file);
            fixedCount++;
        }
    } catch (e) {
        console.log('FAILED:', file, e.message.substring(0, 100));
        failedCount++;
    }
});

console.log(`\nDone: ${fixedCount} fixed, ${failedCount} failed`);
