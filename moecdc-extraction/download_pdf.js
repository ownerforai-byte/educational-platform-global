/**
 * download_pdf.js
 * Downloads the CDC "Physics Grade 11" textbook PDF into this folder.
 *
 * Usage:  node download_pdf.js
 * No external dependencies.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA = require('./chapters.json');
const PDF_URL = DATA.pdfUrl;
const OUT_FILE = path.join(__dirname, 'physics-grade-11.pdf');

function download(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsLeft > 0) {
          const next = new URL(res.headers.location, url).href;
          res.resume();
          return resolve(download(next, redirectsLeft - 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const total = Number(res.headers['content-length']) || 0;
        const chunks = [];
        let received = 0;
        res.on('data', (c) => {
          chunks.push(c);
          received += c.length;
          if (total) {
            process.stdout.write(`\rDownloading... ${(received / 1048576).toFixed(1)} / ${(total / 1048576).toFixed(1)} MB`);
          }
        });
        res.on('end', () => {
          console.log('');
          resolve(Buffer.concat(chunks));
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

(async () => {
  if (fs.existsSync(OUT_FILE)) {
    console.log('PDF already exists:', OUT_FILE, `(${(fs.statSync(OUT_FILE).size / 1048576).toFixed(1)} MB)`);
    console.log('Delete it first if you want a fresh download.');
    return;
  }
  console.log('Fetching:', PDF_URL);
  const buf = await download(PDF_URL);
  fs.writeFileSync(OUT_FILE, buf);
  console.log('Saved to:', OUT_FILE, `(${(buf.length / 1048576).toFixed(1)} MB)`);
  if (buf.subarray(0, 5).toString() !== '%PDF-') {
    console.warn('WARNING: downloaded file does not look like a PDF!');
  } else {
    console.log('PDF signature OK.');
  }
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
