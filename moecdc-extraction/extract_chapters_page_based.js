const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('biology-grade-11.pdf');
const chapters = JSON.parse(fs.readFileSync('chapters-biology.json', 'utf8')).chapters;

async function extract() {
    let pages = [];
    let options = {
        pagerender: function(pageData) {
            return pageData.getTextContent().then(function(textContent) {
                let lastY, text = '';
                for (let item of textContent.items) {
                    if (lastY === item.transform[5] || !lastY) {
                        text += item.str;
                    } else {
                        text += '\n' + item.str;
                    }
                    lastY = item.transform[5];
                }
                return text;
            });
        }
    };

    const data = await pdf(dataBuffer, options);
    // pdf-parse provides data.text as a single string, but if pagerender is used, 
    // it seems it doesn't automatically split by page in data.text.
    // Wait, check pdf-parse docs.
    // Actually, if pagerender is provided, it might not work as I expect for page splitting.
    
    // Let me rethink. How to get per-page text?
    // Maybe I should use a different PDF library if pdf-parse is limited?
    // No, I must use what's available.
    
    // According to some examples, pagerender is for rendering, not for full text extraction per page.
    // Actually, if I want per-page text, I might need to not use pdf-parse if it's too simple.
    // Wait, the prompt says "pdf-parse" is available.
}
extract();
