// Let's understand the exact pattern
const test = '\\"\\\\"title\\"\\\\"';
console.log('Test string:', JSON.stringify(test));
console.log('Test string length:', test.length);
console.log('Characters:');
for (let i = 0; i < test.length; i++) {
    console.log(`  [${i}]: ${test.charCodeAt(i)} = ${JSON.stringify(test[i])}`);
}

// What we want to match: backslash-backslash-quote-quote
// In regex: /\\\\"/g
const result = test.replace(/\\\\"/g, '"');
console.log('\nAfter replacement:', JSON.stringify(result));
