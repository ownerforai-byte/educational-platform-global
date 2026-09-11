const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const DATA = require('./chapters-biology.json');
const PDF_FILE = path.join(__dirname, 'biology-grade-11.pdf');
const OUT_DIR = path.join(__dirname, 'out-biology');

function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * The PDF repeats "Biology, Grade 11 | N" on each page as a running footer.
 * We use these markers to establish real page boundaries.
 */
const PAGE_FOOTER_RE = /Biology,\s*Grade\s*11\s*\|\s*(\d+)/g;

function cleanPageArtifacts(text) {
    return text
        .replace(/Biology,\s*Grade\s*11\s*\|\s*\d+/g, '\n---PAGE_BREAK---\n')
        .replace(/\n{3,}/g, '\n\n');
}

async function extract() {
    console.log('Parsing PDF...');
    const buf = fs.readFileSync(PDF_FILE);
    const data = await pdfParse(buf);
    const rawText = data.text;
    console.log(`Parsed ${data.numpages} pages, ${rawText.length.toLocaleString()} chars.`);

    // Find all page-footer occurrences
    const footerPositions = [];
    let m;
    PAGE_FOOTER_RE.lastIndex = 0;
    while ((m = PAGE_FOOTER_RE.exec(rawText)) !== null) {
        footerPositions.push({ offset: m.index, pageNum: parseInt(m[1], 10), match: m[0] });
    }
    console.log(`Found ${footerPositions.length} page footers.`);

    // Build pages array: each entry is { pageNum, start, end }
    const pages = [];
    for (let i = 0; i < footerPositions.length; i++) {
        const curr = footerPositions[i];
        const next = footerPositions[i + 1];
        pages.push({
            pageNum: curr.pageNum,
            start: curr.offset + curr.match.length,
            end: next ? next.offset : rawText.length
        });
    }
    console.log(`Built ${pages.length} page ranges.`);

    // For each chapter, collect pages whose pageNum falls in [startPage, nextStartPage)
    const result = {};
    for (let ci = 0; ci < DATA.chapters.length; ci++) {
        const ch = DATA.chapters[ci];
        const nextCh = DATA.chapters[ci + 1];
        const endPage = nextCh ? nextCh.startPage - 1 : 9999;

        const chPages = pages.filter(p => p.pageNum >= ch.startPage && p.pageNum <= endPage);
        let chapterText = '';
        for (const p of chPages) {
            chapterText += rawText.slice(p.start, p.end) + '\n';
        }
        chapterText = chapterText.trim();
        result[ch.no] = chapterText;
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    for (const ch of DATA.chapters) {
        const content = result[ch.no];
        if (!content || content.length === 0) {
            console.warn(`Chapter ${ch.no} ("${ch.title}") - no content found`);
            continue;
        }
        const fileName = `chapter-${String(ch.no).padStart(2, '0')}-${slugify(ch.title)}.md`;
        const outPath = path.join(OUT_DIR, fileName);
        const md = `# Chapter ${ch.no}: ${ch.title}\n\n> Source: ${DATA.book} — ${DATA.publisher}\n> PDF: ${DATA.pdfUrl}\n\n${content}\n`;
        fs.writeFileSync(outPath, md, 'utf8');
        console.log(`Wrote ${outPath} (${content.length.toLocaleString()} chars)`);
    }

    console.log('Done.');
}

extract().catch(e => {
    console.error('FAILED:', e);
    process.exit(1);
});
