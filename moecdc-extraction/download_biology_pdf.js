const https = require('https');
const fs = require('fs');
const path = require('path');

const PDF_URL = 'https://giwmscdnone.gov.np/media/pdf_upload/3.%20Reduced-Biology_grade_11_ck4uozj.pdf';
const OUT_FILE = path.join(__dirname, 'biology-grade-11.pdf');

function download(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
        if (total) process.stdout.write(`\rDownloading... ${(received / 1048576).toFixed(1)} / ${(total / 1048576).toFixed(1)} MB`);
      });
      res.on('end', () => { console.log(''); resolve(Buffer.concat(chunks)); });
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  if (fs.existsSync(OUT_FILE)) {
    console.log('PDF exists:', OUT_FILE, `(${(fs.statSync(OUT_FILE).size / 1048576).toFixed(1)} MB)`);
    return;
  }
  console.log('Downloading biology PDF...');
  const buf = await download(PDF_URL);
  fs.writeFileSync(OUT_FILE, buf);
  console.log('Saved:', OUT_FILE, `(${(buf.length / 1048576).toFixed(1)} MB)`);
  if (buf.subarray(0, 5).toString() !== '%PDF-') console.warn('NOT a PDF!');
  else console.log('PDF OK.');
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
