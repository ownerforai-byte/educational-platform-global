# moecdc-extraction

Extracts chapter content from the Nepal CDC **Physics Grade 11** textbook
(ऐच्छिक भौतिक विज्ञान कक्षा ११ — पृष्ठपोषण प्रति २०८१).

- Source page: https://moecdc.gov.np/content/600/physics-grade---11/
- Direct PDF: https://giwmscdnone.gov.np/media/pdf_upload/1.%20Reduced-%20Grde-11-Physics_ogc1tkt.pdf
- 521 pages, 26 chapters — see `chapters.json` for the extracted Table of Contents.

## Setup (once)

```bash
cd moecdc-extraction
npm install        # installs pdf-parse
node download_pdf.js   # downloads physics-grade-11.pdf (~30 MB)
```

## Extract chapters

```bash
node extract_chapters.js            # all 26 chapters -> out/*.md
node extract_chapters.js 2          # only chapter 2 (Vectors)
node extract_chapters.js 1 5 7      # chapters 1, 5 and 7
```

Each chapter is written to `out/chapter-NN-slug.md` as Markdown with a source
header, running-footer page artifacts removed, and the next chapter's heading
used as the boundary so chapters do not bleed into each other.

## Notes

- The PDF is text-based (not scanned), so `pdf-parse` extracts text directly.
- Equations/figures in the PDF extract imperfectly (vector arrows, superscripts);
  text like "tan-1" appears in place of formatted math. Chapters with heavy math
  (2, 6, 7, 14-18) will need light manual cleanup.
- `chapters.json` also records `startPage` (printed page number) for reference.
