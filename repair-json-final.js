const fs = require('fs');
const { globSync } = require('glob');

const files = globSync('content/ravikishan/**/*.json', { absolute: true });

function fixContent(content) {
    // 1. Replace all \" at the start of strings (keys and values)
    // Looking for " followed by \" -> "
    // The pattern is: " followed by \"something
    // Let's use a regex to find all \" that are NOT escaped already.
    // This is hard to do with regex alone.
    
    // Let's try: replace \" followed by a character
    content = content.replace(/\\"/g, '"');
    
    // Now the JSON is likely broken again because internal quotes are unescaped.
    // Let's try to parse it and see where it fails.
    
    return content;
}

// For now, let's just try to read and write with basic JSON.stringify/parse for the files that are fixable this way.
// For the others, we need a more surgical approach.

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Basic repair attempt:
    // Remove all extra backslashes before quotes: \" -> "
    // This will likely break the JSON if there were already \" that were correct.
    
    let repaired = content.replace(/\\"/g, '"');
    
    // Now try to parse:
    try {
        JSON.parse(repaired);
        fs.writeFileSync(file, JSON.stringify(JSON.parse(repaired), null, 2));
    } catch (e) {
        // If it still fails, it needs manual repair or is a different error type.
        console.log(`Failed to fix: ${file}`);
    }
}
