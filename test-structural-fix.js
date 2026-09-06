const fs = require('fs');

const file = 'C:\\Users\\ASUS\\Desktop\\rn\\content\\ravikishan\\class-11-notes\\physics\\quantity-of-heat\\concepts\\07-newtons-law-rate-of-fall-of-temperature.json';
let content = fs.readFileSync(file, 'utf8');

// The file format uses \"\"\" for string quotes, which is NOT valid JSON.
// It should be ".
// And it uses \r\n as literal chars.

// 1. Convert literal \r and \n to control characters
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// 2. Replace the triple quotes \"\"\" with a single valid JSON quote "
// The file has some keys as \"\"\"\"title\"\"\"\" and some values as \"\"\"value\"\"\"
// If I replace ALL \"\"\" with ", it might work.
// Let's test the replacement:
content = content.replace(/\\"/g, '"');

// 3. Now we have lots of consecutive quotes, e.g. ""title"" or """value""".
// The valid structure should be "title" or "value".
// We need to reduce any sequence of 2+ quotes to a single quote.
// WAIT: A string like "value" might have internal escaped quotes like "2-hour rule".
// The working file shows: \"\"\"2-hour rule\"\"\"
// This implies the structure is:
// \"\"\" = "
// So \"\"\"2-hour rule\"\"\" becomes "2-hour rule".
// This is actually valid IF it's inside a JSON string.
// JSON: "key": "value with \"escaped\" quote"
// The file seems to have triple quotes instead of single quotes for ALL strings.

// Let's replace ALL sequences of quotes with a single quote.
// EXCEPT: If it's a structural quote vs an internal quote.
// This seems to be the core problem.

// Looking at the working file:
// "universalFacts": [ "The cooling constant...", ... ]
// The quotes are clearly single quotes.
// The broken file has: \"\"\"\"title\"\"\"\"
// My replacement \"\"\" -> " should make it "title".
// Let's try to just replace ALL occurrences of \" with ".
// And then reduce all sequences of "" to "

content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// Replace all \" with "
content = content.replace(/\\"/g, '"');

// Now collapse all ""+ to "
content = content.replace(/""+/g, '"');

// This still broke the internal \"2-hour rule\" which became "2-hour rule"
// and caused parsing error because the JSON string was interrupted.

// To fix this, I need to know if the quote is structural or not.
// Or, I can just replace \" with \" (i.e. fix the escape) 
// but ONLY if it's NOT an internal one.

// Actually, looking at the broken file:
// \"\"\"\"title\"\"\"\"
// If I replace ALL \" with " then \"title\" -> "title". This is correct.
// The problem is \"2-hour rule\" -> "2-hour rule".
// This breaks the JSON string:
// "key": "value with "2-hour rule" inside" -> Syntax error!

// The fix is: Internal quotes MUST be escaped: \"2-hour rule\"
// The structural quotes must NOT be escaped.
// \"\"\"\"title\"\"\"\" -> "title"

// This means I need to:
// 1. Replace ALL \" with "
// 2. Then, escape all quotes that are inside JSON strings!
// This is hard with regex.
// Alternative: JSON.parse can handle some stuff? No.

// Let's try replacing \"\"\"\" with " first (structural), 
// then replace remaining \" with \" (internal).

content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\r/g, '\r');
content = content.replace(/\\n/g, '\n');

// 1. Replace structural quotes: 3 or 4 backslash-quotes -> "
content = content.replace(/(\\"|"){3,}/g, '"');

// 2. Replace remaining \" -> \" (internal escaped quotes)
// Wait, the file has \"2-hour rule\". If I leave it as \"2-hour rule\", JSON.parse should work.
// Let's test this strategy.

try {
    const parsed = JSON.parse(content);
    console.log('Parsing successful!');
} catch (e) {
    console.log('Parsing failed:', e.message);
}
